import { build, createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createHash } from 'node:crypto';

await build();
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
const escape = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
try {
  const { pages, pageMetadata, canonical, structuredData } = await server.ssrLoadModule('/src/seo.ts') as typeof import('../src/seo');
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  const jsonld = JSON.stringify(structuredData).replace(/</g, '\\u003c');
  const hash = createHash('sha256').update(jsonld).digest('base64');
  const headers = await readFile('public/_headers', 'utf8');
  await writeFile('dist/_headers', headers.replace('JSONLD_HASH', hash));
  for (const route of [...Object.keys(pages), '/404']) {
    const m = pageMetadata(route);
    const head = `<title>${escape(m.title)}</title>
    <meta name="description" content="${escape(m.description)}" />
    <meta name="robots" content="${m.index ? 'index, follow' : 'noindex, follow'}" />
    ${route === '/404' || !canonical(route) ? '' : `<link rel="canonical" href="${canonical(route)}" />`}
    <meta property="og:type" content="website" /><meta property="og:site_name" content="kanreki" />
    <meta property="og:title" content="${escape(m.title)}" /><meta property="og:description" content="${escape(m.description)}" />${canonical(route) && route !== '/404' ? `<meta property="og:url" content="${canonical(route)}" />` : ''}
    <meta name="twitter:card" content="summary" /><meta name="twitter:title" content="${escape(m.title)}" /><meta name="twitter:description" content="${escape(m.description)}" />
    ${route === '/' ? `<script type="application/ld+json">${jsonld}</script>` : ''}`;
    const file = route === '/' ? 'dist/index.html' : route === '/404' ? 'dist/404.html' : `dist${route}/index.html`;
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, template.replace('<!--page-head-->', head).replace('<!--app-html-->', render(route)));
  }
  const urls = Object.entries(pages).filter(([path, m]) => m.index && canonical(path)).map(([path]) => `  <url><loc>${canonical(path)}</loc></url>`).join('\n');
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  console.log('Prerendered 8 routes and a custom 404.');
} finally { await server.close(); }
