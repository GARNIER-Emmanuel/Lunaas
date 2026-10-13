import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const output = resolve('dist/lunaas/browser');
const { routes } = JSON.parse(
  await readFile(resolve('dist/lunaas/prerendered-routes.json'), 'utf8'),
);
const homeDocument = new JSDOM(await readFile(resolve(output, 'index.html'), 'utf8')).window
  .document;
const homeCanonical = homeDocument.querySelector('link[rel="canonical"]')?.href;
if (!homeCanonical) throw new Error('Missing homepage canonical');
const origin = new URL(homeCanonical).origin;
const pages = new Map();
const errors = [];
const expectedRoutes = ['/', '/mentions-legales', '/confidentialite'];
if (Object.keys(routes).length !== expectedRoutes.length || !expectedRoutes.every((path) => routes[path]))
  errors.push('Expected the landing and the two legal pages in the static output');
const titles = new Set();
const descriptions = new Set();
for (const path of Object.keys(routes)) {
  const html = await readFile(resolve(output, `.${path}`, 'index.html'), 'utf8');
  const dom = new JSDOM(html, { url: new URL(path, origin).href });
  pages.set(path, dom.window.document);
}
for (const [path, document] of pages) {
  const fail = (message) => errors.push(`${path}: ${message}`);
  const isHome = path === '/';
  if (isHome) {
    if (document.querySelectorAll('form').length !== 1 || !document.querySelector('#contact app-contact-form'))
      fail('expected a single contact form in the contact section');
  } else if (document.querySelector('form')) {
    fail('legal pages must not duplicate the contact form');
  }
  if (document.querySelector('dialog')) fail('legal dialogs must be replaced by pages');
  for (const link of document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]')) {
    if (!link.closest('#mentions-legales, #confidentialite'))
      fail('contact details must remain inside legal information, not in the landing presentation');
  }
  if (isHome) {
    const legal = pages.get('/mentions-legales');
    for (const selector of ['a[href^="mailto:"]', 'a[href^="tel:"]', '.editor-address']) {
      const value = legal?.querySelector(selector)?.textContent.trim();
      if (value && document.body.textContent.includes(value))
        fail('legal contact details are visible on the landing');
    }
  } else {
    const legalPage = document.getElementById(path.slice(1));
    if (!legalPage || document.defaultView.getComputedStyle(legalPage).display === 'none')
      fail('legal information must be visible in the prerendered page without JavaScript');
    if (!document.querySelector('main a[href="/"]')) fail('legal page needs a return link to the homepage');
    if (path === '/confidentialite' && !document.querySelector('a[href="https://www.cnil.fr/fr/adresser-une-plainte"]'))
      fail('missing data-rights complaint information');
  }
  const description = document.querySelector('meta[name="description"]')?.content;
  if (document.documentElement.lang !== 'fr') fail('document language');
  if (document.querySelectorAll('h1').length !== 1) fail('expected one H1');
  if (!document.title || titles.has(document.title)) fail('missing or duplicate title');
  titles.add(document.title);
  if (!description || descriptions.has(description)) fail('missing or duplicate description');
  descriptions.add(description);
  if (document.querySelectorAll('link[rel="canonical"]').length !== 1)
    fail('expected one canonical');
  if (document.querySelector('link[rel="canonical"]')?.href !== new URL(path, origin).href)
    fail('incorrect canonical');
  if (!document.querySelector('meta[property="og:image"]')) fail('missing social image');
  if (!document.querySelector('meta[name="robots"]')) fail('missing robots metadata');
  try {
    JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent);
  } catch {
    fail('invalid structured data');
  }
  const ids = new Set();
  for (const element of document.querySelectorAll('[id]')) {
    if (ids.has(element.id)) fail(`duplicate id ${element.id}`);
    ids.add(element.id);
  }
  for (const control of document.querySelectorAll('input,select,textarea')) {
    if (!control.labels?.length && !control.getAttribute('aria-label'))
      fail('form control without label');
  }
  for (const image of document.querySelectorAll('img')) {
    if (!image.hasAttribute('alt')) fail('image without alt');
    const url = new URL(image.src);
    if (url.origin === origin) {
      try {
        await access(resolve(output, `.${url.pathname}`));
      } catch {
        fail(`missing image ${url.pathname}`);
      }
    }
  }
  for (const link of document.querySelectorAll('a[href]')) {
    const url = new URL(link.href);
    if (url.origin !== origin) continue;
    if (link.textContent.includes('Parlons') && url.hash !== '#contact')
      fail('project CTA must target the main contact form');
    const destination = url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
    const target = pages.get(destination);
    if (!target) {
      fail(`unknown internal link ${url.pathname}`);
      continue;
    }
    if (url.hash && !target.getElementById(decodeURIComponent(url.hash.slice(1))))
      fail(`missing anchor ${url.hash}`);
  }
  for (const asset of document.querySelectorAll(
    'script[src],link[rel="stylesheet"],link[rel="icon"]',
  )) {
    const url = new URL(asset.src || asset.href);
    if (url.origin !== origin) {
      fail(`unexpected external script or stylesheet ${url.origin}`);
      continue;
    }
    try {
      await access(resolve(output, `.${url.pathname}`));
    } catch {
      fail(`missing asset ${url.pathname}`);
    }
  }
}
const fontCss = await readFile(resolve(output, 'fonts/fonts.css'), 'utf8');
for (const match of fontCss.matchAll(/url\(([^)]+)\)/g)) {
  const url = new URL(match[1], origin);
  if (url.origin !== origin) errors.push('Fonts must be hosted locally');
  else await access(resolve(output, `.${url.pathname}`));
}
const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const indexable = [...pages]
  .filter(([, doc]) => !doc.querySelector('meta[name="robots"]').content.includes('noindex'))
  .map(([path]) => new URL(path, origin).href);
if (sitemapUrls.length !== indexable.length || !indexable.every((url) => sitemapUrls.includes(url)))
  errors.push('Sitemap does not match indexable pages');
await access(resolve(output, '404.html'));
if ((await readFile(resolve(output, '404.html'), 'utf8')) !== (await readFile(resolve(output, 'index.html'), 'utf8')))
  errors.push('Fallback must contain the same landing, not another page');
await access(resolve(output, 'images/share.png'));
await access(resolve(output, 'images/hero-background.jpg'));
for (const image of [
  'contact-mars.avif',
  'contact-mars.webp',
  'contact-mars-960.avif',
  'contact-mars-960.webp',
]) {
  await access(resolve(output, 'images', image));
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(
  `Static QA passed: ${pages.size} pages, unique metadata, internal links, anchors, labels, assets and ${sitemapUrls.length} sitemap URLs.`,
);
