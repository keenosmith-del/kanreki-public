import {writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const paths=['/','/about','/contact','/sign-in','/create-account','/privacy','/terms','/cookies'];
const indexed=['/','/about','/contact'];
const titles=['kanreki | read. write. everything.','about | kanreki','contact | kanreki','sign in | kanreki','create account | kanreki','privacy | kanreki','terms | kanreki','cookies | kanreki'];
async function request(url,options){const result=await fetch(url,{...options,signal:AbortSignal.timeout(25000),headers:{'Cache-Control':'no-cache',...options?.headers}});return result;}
export async function verifyLive(origin,{mode='preview'}={}){
 const base=new URL(origin);assert.equal(base.protocol,'https:');assert.equal(base.origin,origin);
 const report={checkedAt:new Date().toISOString(),origin,mode,httpsVerified:false,routesPassed:false,assetsPassed:false,indexingPassed:false,routes:[],assets:[]};
 for(const [index,path] of paths.entries()){
  const response=await request(origin+path);assert.equal(response.status,200,path);assert.equal(new URL(response.url).origin,origin);const html=await response.text();
  assert.ok(html.includes(`<title>${titles[index]}</title>`),path+' title');
  const robots=mode==='production'&&indexed.includes(path)?'index, follow':'noindex, follow';
  assert.ok(html.includes(`name="robots" content="${robots}"`),path+' robots metadata');
  const robotHeader=response.headers.get('x-robots-tag')||'';assert.ok(robotHeader.includes(robots.split(',')[0]),path+' response robots');if(mode==='production'&&indexed.includes(path))assert.ok(!robotHeader.includes('noindex'));
  assert.equal(response.headers.get('x-content-type-options'),'nosniff');assert.ok(response.headers.get('content-security-policy')?.includes("frame-ancestors 'none'"));assert.ok(response.headers.get('referrer-policy'));assert.ok(response.headers.get('permissions-policy'));
  if(mode==='production'){assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`));assert.equal((html.match(/rel="canonical"/g)||[]).length,1);assert.ok(html.includes(`property="og:url" content="${origin}${path}"`));}else assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!/mailto:|keenosmith@|company\/kailor|company\/145305573/.test(html));
  if(path==='/'){assert.equal((html.match(/data-media-slot=/g)||[]).length,6);assert.ok(html.includes('https://www.linkedin.com/company/kanreki-publishing/'));}
  report.routes.push({path,status:response.status,title:titles[index],robots,robotHeader});
 }
 const missing=await request(origin+'/kanreki-unknown-route-check');assert.equal(missing.status,404);assert.ok((await missing.text()).includes('name="robots" content="noindex"'));
 const sitemap=await (await request(origin+'/sitemap.xml')).text();const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);assert.deepEqual(urls,mode==='production'?indexed.map(path=>origin+path):[]);
 const robots=await (await request(origin+'/robots.txt')).text();assert.equal(robots.includes('Sitemap:'),mode==='production');
 for(const asset of ['/social-preview.png','/url-icon.png','/media/kanreki-hero.mp4','/media/kanreki-profiles-r03.mp4','/media/kanreki-drafting.mp4','/media/kanreki-reading.mp4','/media/kanreki-search.mp4','/media/kanreki-community.mp4','/media/kanreki-drafting.webm','/media/kanreki-search.webm','/media/kanreki-profiles-r03.webm']){
  const response=await request(origin+asset,{method:'HEAD'});assert.equal(response.status,200,asset);const bytes=Number(response.headers.get('content-length'));assert.ok(bytes>0&&bytes<=25*1024*1024,asset+' size');report.assets.push({path:asset,bytes,type:response.headers.get('content-type')});
 }
 report.build=await (await request(origin+'/build-info.json')).json();
 const github=await request('https://api.github.com/repos/keenosmith-del/kanreki-public/commits/main',{headers:{Accept:'application/vnd.github+json'}});assert.equal(github.status,200);report.remoteMainCommit=(await github.json()).sha;
 assert.equal(report.build.sourceCommit,report.remoteMainCommit,'Live build must match GitHub main');
 assert.equal(report.build.contactConfigured,true,'Live EmailJS configuration');
 report.httpsVerified=true;report.routesPassed=true;report.assetsPassed=true;report.indexingPassed=mode==='production';report.sitemapUrls=urls;return report;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const origin=process.argv[2];assert.ok(origin,'Usage: node scripts/verify-live.mjs <verified HTTPS origin> [preview|production]');const report=await verifyLive(origin,{mode:process.argv[3]||'preview'});await writeFile('docs/verification/live-site.json',JSON.stringify(report,null,2)+'\n');console.log(`Verified ${report.routes.length} live routes, HTTP 404, metadata, headers, ${report.assets.length} assets and source commit ${report.build.sourceCommit}.`);}
