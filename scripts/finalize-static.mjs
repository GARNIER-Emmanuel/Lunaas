import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { JSDOM } from 'jsdom';

const output = resolve('dist/lunaas/browser');
const { routes } = JSON.parse(
  await readFile(resolve('dist/lunaas/prerendered-routes.json'), 'utf8'),
);
const homeHtml = await readFile(resolve(output, 'index.html'), 'utf8');
const homeCanonical = homeHtml.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
if (!homeCanonical) throw new Error('Missing homepage canonical for sitemap generation');
const domain = new URL(homeCanonical).origin;
const publicPaths = [];
const inlineScriptHashes = new Set();
for (const path of Object.keys(routes).sort()) {
  const html = await readFile(resolve(output, `.${path}`, 'index.html'), 'utf8');
  if (!/<meta[^>]+name="robots"[^>]+content="noindex/i.test(html)) publicPaths.push(path);
  const document = new JSDOM(html).window.document;
  for (const script of document.querySelectorAll('script:not([src])')) {
    if (!['', 'module', 'text/javascript', 'application/javascript'].includes(script.type)) continue;
    const hash = createHash('sha256').update(script.textContent, 'utf8').digest('base64');
    inlineScriptHashes.add(`'sha256-${hash}'`);
  }
}
// Les scripts de prérendu changent avec le build : ne pas figer leurs empreintes dans public/.
const headerPath = resolve(output, '_headers');
const headerSource = await readFile(headerPath, 'utf8');
let policyFound = false;
const headers = headerSource.replace(
  /^(\s*Content-Security-Policy: *)([^\r\n]+)$/gim,
  (_, prefix, policy) => {
    policyFound = true;
    if (!/(?:^|;\s*)script-src\s/.test(policy)) throw new Error('Missing CSP script-src');
    const completed = policy.replace(/(^|;\s*)script-src\s+([^;]+)/, (_, separator, sources) => {
      const baseSources = sources.trim().split(/\s+/).filter((source) => !source.startsWith("'sha256-"));
      return `${separator}script-src ${[...baseSources, ...[...inlineScriptHashes].sort()].join(' ')}`;
    });
    const line = `${prefix}${completed}`;
    if (line.length > 2000) throw new Error('CSP exceeds the Cloudflare Pages header line limit');
    return line;
  },
);
if (!policyFound) throw new Error('Missing enforcing CSP header');
await writeFile(headerPath, headers);
// Un chemin inconnu affiche la même landing ; Angular le ramène ensuite à la racine.
await copyFile(resolve(output, 'index.html'), resolve(output, '404.html'));
await writeFile(
  resolve(output, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPaths.map((path) => `  <url><loc>${new URL(path, domain).href}</loc></url>`).join('\n')}\n</urlset>\n`,
);
await writeFile(
  resolve(output, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`,
);
console.log(`Static delivery finalized: ${publicPaths.length} sitemap URLs and a landing fallback.`);
console.log(`Enforcing CSP prepared with ${inlineScriptHashes.size} inline script hashes.`);
