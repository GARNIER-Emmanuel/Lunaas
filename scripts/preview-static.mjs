import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('dist/lunaas/browser');
const port = Number(process.env.PORT || 4300);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    let status = 200;
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      if (!(await stat(file)).isFile()) throw new Error('Not a file');
    } catch {
      file = resolve(root, '404.html');
      status = 404;
    }
    const body = await readFile(file);
    response.writeHead(status, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(400);
    response.end('Invalid request');
  }
}).listen(port, '127.0.0.1', () => console.log(`Static preview: http://localhost:${port}`));
