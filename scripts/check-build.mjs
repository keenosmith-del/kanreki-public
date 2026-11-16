import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const origin = (process.env.SITE_URL || process.env.CF_PAGES_URL) ? new URL(process.env.SITE_URL || process.env.CF_PAGES_URL).origin : '';
const routes = ['', 'about', 'contact', 'sign-in', 'create-account', 'privacy', 'terms', 'cookies'];
for (const route of routes) {
  const html=await readFile(`dist/${route ? route+'/' : ''}index.html`,'utf8');
  assert.match(html, /<main/); assert.match(html, /<h1/); assert.match(html, /<title>/);
  if (origin) assert.ok(html.includes(`rel="canonical" href="${origin}/${route}"`));
  else assert.ok(!html.includes('rel="canonical"'));
  assert.match(html, /<title>[^<]*kanreki/);
  assert.match(html, /rel="icon" href="\/url-icon.png" type="image\/png"/);
  assert.ok(!html.includes('<!--app-html-->') && !html.includes('<!--page-head-->'));
  assert.match(html, /content="noindex, follow"/);
}
const home=await readFile('dist/index.html','utf8');
assert.equal((home.match(/data-media-slot=/g)||[]).length,6);
assert.equal((home.match(/<section/g)||[]).length,6);
const jsonld=home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1];
assert.equal(JSON.parse(jsonld)['@graph'][0].publisher['@id'],`${origin}/#organization`);
assert.equal(JSON.parse(jsonld)['@graph'][1].foundingDate, '2020');
const headers=await readFile('dist/_headers','utf8');
assert.ok(headers.includes(createHash('sha256').update(jsonld).digest('base64')));
assert.ok(!headers.includes('JSONLD_HASH'));
const sitemap=await readFile('dist/sitemap.xml','utf8');
assert.equal((sitemap.match(/<url>/g)||[]).length,0);
assert.ok(!/sign-in|create-account|privacy|terms|cookies/.test(sitemap));
assert.match(await readFile('dist/404.html','utf8'),/This page isn’t here/);
async function scan(dir) {
  for(const file of await readdir(dir,{withFileTypes:true})) {
    const path=`${dir}/${file.name}`;
    if(file.isDirectory()) await scan(path);
    else if(/\.(html|js|css|json|txt|xml)$/.test(path)) {
      const text=await readFile(path,'utf8');
      assert.ok(!/kailor[ .-]insider|insider\.kailor\.co\.za|favicon\.svg|kailor-head|DATABASE_URL|postgres(?:ql)?:\/\/|localhost:5195|app\.insider\.kailor\.co\.za|VITE_.*SECRET/.test(text),`Private/deferred reference in ${path}`);
      assert.ok(!/sourceMappingURL/.test(text));
    }
  }
}
await scan('dist');
assert.match(headers, /X-Robots-Tag: noindex, follow/);
assert.deepEqual(await readFile('dist/url-icon.png'), await readFile('public/url-icon.png'));
console.log('Build checks passed: 8 prerendered routes, 6 sections/slots, 404, SEO, sitemap, CSP hash, private-reference scan.');
