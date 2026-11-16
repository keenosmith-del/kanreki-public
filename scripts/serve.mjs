// Local production-output QA server. Mirrors static routing, CSP and 404 behaviour.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root = resolve('dist');
const headers = await readFile('dist/_headers', 'utf8');
const csp = headers.match(/Content-Security-Policy: (.+)/)?.[1];
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.svg':'image/svg+xml', '.txt':'text/plain', '.xml':'application/xml', '.woff2':'font/woff2' };
http.createServer(async (req,res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + path);
    if (!file.startsWith(root + '/') && file !== root) throw new Error('outside root');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const bytes = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Content-Security-Policy': csp, 'X-Content-Type-Options':'nosniff', 'X-Robots-Tag':'noindex, follow' }); res.end(bytes);
  } catch {
    res.writeHead(404, { 'Content-Type':'text/html; charset=utf-8', 'Content-Security-Policy':csp, 'X-Robots-Tag':'noindex' }); res.end(await readFile(resolve(root,'404.html')));
  }
}).listen(4173,'127.0.0.1',()=>console.log('Static preview: http://127.0.0.1:4173'));
