import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('dist/lunaas/browser');
const { routes } = JSON.parse(
  await readFile(resolve('dist/lunaas/prerendered-routes.json'), 'utf8'),
);
const domain = 'https://lunaas.site';
const publicPaths = [];
for (const path of Object.keys(routes).sort()) {
  const html = await readFile(resolve(output, `.${path}`, 'index.html'), 'utf8');
  if (!/<meta[^>]+name="robots"[^>]+content="noindex/i.test(html)) publicPaths.push(path);
}
await copyFile(resolve(output, '404/index.html'), resolve(output, '404.html'));
await writeFile(
  resolve(output, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPaths.map((path) => `  <url><loc>${new URL(path, domain).href}</loc></url>`).join('\n')}\n</urlset>\n`,
);
await writeFile(
  resolve(output, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`,
);
console.log(`Static delivery finalized: ${publicPaths.length} sitemap URLs and a custom 404.html.`);
