import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const routes = ['', 'about', 'contact', 'sign-in', 'create-account', 'privacy', 'terms', 'cookies'];
for (const route of routes) {
  const html=await readFile(`dist/${route ? route+'/' : ''}index.html`,'utf8');
  assert.match(html, /<main/); assert.match(html, /<h1/); assert.match(html, /<title>/);
  assert.ok(html.includes(`href="https://insider.kailor.co.za/${route}"`));
  assert.ok(!html.includes('<!--app-html-->') && !html.includes('<!--page-head-->'));
  assert.match(html, ['','about','contact'].includes(route) ? /content="index, follow"/ : /content="noindex, follow"/);
}
const home=await readFile('dist/index.html','utf8');
assert.equal((home.match(/data-media-slot=/g)||[]).length,6);
assert.equal((home.match(/<section/g)||[]).length,6);
const jsonld=home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1];
assert.equal(JSON.parse(jsonld)['@graph'][0].publisher['@id'],'https://kailor.co.za/#organization');
const headers=await readFile('dist/_headers','utf8');
assert.ok(headers.includes(createHash('sha256').update(jsonld).digest('base64')));
assert.ok(!headers.includes('JSONLD_HASH'));
const sitemap=await readFile('dist/sitemap.xml','utf8');
assert.equal((sitemap.match(/<url>/g)||[]).length,3);
assert.ok(!/sign-in|create-account|privacy|terms|cookies/.test(sitemap));
assert.match(await readFile('dist/404.html','utf8'),/This page isn’t here/);
async function scan(dir) {
  for(const file of await readdir(dir,{withFileTypes:true})) {
    const path=`${dir}/${file.name}`;
    if(file.isDirectory()) await scan(path);
    else if(/\.(html|js|css|json|txt|xml)$/.test(path)) {
      const text=await readFile(path,'utf8');
      assert.ok(!/kailor-head|DATABASE_URL|postgres(?:ql)?:\/\/|localhost:5195|app\.insider\.kailor\.co\.za|VITE_.*SECRET/.test(text),`Private/deferred reference in ${path}`);
      assert.ok(!/sourceMappingURL/.test(text));
    }
  }
}
await scan('dist');
console.log('Build checks passed: 8 prerendered routes, 6 sections/slots, 404, SEO, sitemap, CSP hash, private-reference scan.');
