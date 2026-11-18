import assert from 'node:assert/strict';
import {readFile,readdir,stat,writeFile} from 'node:fs/promises';
import {auditAssetSizes} from './asset-sizes.mjs';
import {createHash} from 'node:crypto';
const root=process.env.STATIC_ROOT||'dist';
const read=path=>readFile(`${root}/${path}`,'utf8');
const info=JSON.parse(await read('build-info.json'));
assert.match(info.sourceCommit,/^[a-f0-9]{40}$/i);
assert.match(info.sourceFingerprint,/^[a-f0-9]{64}$/i);
const titles={'/':'kanreki | read. write. everything.','/about':'about | kanreki','/contact':'contact | kanreki','/sign-in':'sign in | kanreki','/create-account':'create account | kanreki','/privacy':'privacy | kanreki','/terms':'terms | kanreki','/cookies':'cookies | kanreki','/404':'page not found | kanreki'};
const indexable=['/','/about','/contact'];
const headers=await read('_headers');
for(const [route,title] of Object.entries(titles)){
 const html=await read(route==='/404'?'404.html':route==='/'?'index.html':route.slice(1)+'/index.html');
 assert.ok(html.includes(`<title>${title}</title>`),route+' title');
 assert.ok(html.includes(`property="og:title" content="${title}"`));
 assert.ok(html.includes(`name="twitter:title" content="${title}"`));
 assert.match(html,/<main/);assert.match(html,/<h1/);assert.ok(!html.includes('<!--app-html-->'));
 const robots=route==='/404'?'noindex':info.production&&indexable.includes(route)?'index, follow':'noindex, follow';
 assert.ok(html.includes(`name="robots" content="${robots}"`));
 if(info.origin&&route!=='/404')assert.ok(html.includes(`rel="canonical" href="${info.origin}${route}"`));else assert.ok(!html.includes('rel="canonical"'));
 assert.ok(html.includes(`property="og:image" content="${info.origin}/social-preview.png"`));
 assert.match(html,/name="twitter:card" content="summary_large_image"/);
 assert.match(html,/property="og:image:alt" content="kanreki/);
 assert.ok(headers.includes(`\n${route==='/404'?'/404.html':route}\n  X-Robots-Tag: ${robots}`));
 assert.ok(!/mailto:|keenosmith@|company\/145305573|company\/kailor|\/admin\/dashboard/.test(html));
}
const home=await read('index.html');
assert.equal((home.match(/data-media-slot=/g)||[]).length,6);
assert.equal((home.match(/<section/g)||[]).length,6);
assert.ok(!/photographs/.test(home));
const jsonld=home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],graph=JSON.parse(jsonld)['@graph'];
assert.equal(graph[0].publisher['@id'],`${info.origin?info.origin+'/':''}#organization`);
assert.equal(graph[1].name,'kanreki');assert.equal(graph[1].foundingDate,'2020');
assert.deepEqual(graph[1].sameAs,['https://www.linkedin.com/company/kanreki-publishing/']);
assert.ok(headers.includes(createHash('sha256').update(jsonld).digest('base64')));
assert.ok(!/JSONLD_HASH|EMAILJS_CONNECT/.test(headers));
assert.ok(headers.includes(`connect-src ${info.contactConfigured?'https://api.emailjs.com':"'none'"}`));
assert.equal((headers.match(/^\/\*$/gm)||[]).length,1,'A single global header rule preserves security headers on Cloudflare');
if(info.production)assert.ok(!headers.split('\n\n')[0].includes('X-Robots-Tag:'),'No global production robots restriction');
else assert.match(headers,/^\/\*\n  X-Robots-Tag: noindex, follow/m);
const sitemap=await read('sitemap.xml');
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]),info.production?indexable.map(path=>info.origin+path):[]);
const robots=await read('robots.txt');assert.ok(!robots.includes('Disallow: /'));
assert.equal(robots.includes('Sitemap:'),info.production);
if(info.production)assert.ok(robots.includes(`Sitemap: ${info.origin}/sitemap.xml`));
const png=await readFile(`${root}/social-preview.png`);assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
const assetAudit=await auditAssetSizes(root);
assert.deepEqual(assetAudit.oversized,[],'Every output file must meet the Cloudflare Pages 25 MiB asset limit');
await writeFile('docs/verification/production-asset-sizes.json',JSON.stringify({root,limitBytes:25*1024*1024,allFilesPassed:true,files:assetAudit.files.map(file=>({path:file.path.slice(root.length+1),bytes:file.bytes})).sort((a,b)=>a.path.localeCompare(b.path))},null,2)+'\n');
async function scan(dir){for(const file of await readdir(dir,{withFileTypes:true})){const path=`${dir}/${file.name}`;if(file.isDirectory())await scan(path);else{

 assert.ok(!path.endsWith('.map'),'Source maps must not be published');
 if(/\.(html|js|css|json|txt|xml)$/.test(path)){const text=await readFile(path,'utf8');assert.ok(!/kailor[ .-]insider|insider\.kailor\.co\.za|DATABASE_URL|postgres(?:ql)?:\/\/|VITE_.*SECRET|keenosmith@|mailto:|company\/145305573|company\/kailor|sourceMappingURL/.test(text),`Private/outdated reference in ${path}`);}
}}}
await scan(root);
const hashes=JSON.parse(await readFile('docs/verification/approved-film-hashes.json','utf8'));
const deliveries=JSON.parse(await readFile('docs/verification/webm-deliveries.json','utf8'));
for(const [path,expected] of Object.entries(hashes)){
 const delivery=deliveries.find(item=>item.path===path);
 assert.equal(createHash('sha256').update(await readFile(path)).digest('hex'),delivery?delivery.sha256:expected,`Unauthorized approved-media change: ${path}`);
 if(delivery){assert.equal(delivery.originalSha256,expected);assert.equal(createHash('sha256').update(await readFile(delivery.originalPath)).digest('hex'),expected,'Original WebM backup must be retained');}
}
console.log(`Build checks passed: ${info.environment}, 8 routes + 404, ${info.indexable.length} sitemap URLs, titles, social image, LinkedIn, CSP, privacy and approved-film hashes.`);
