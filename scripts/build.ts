import {build,createServer} from 'vite';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {siteConfig} from '../config/site.mjs';
const site=siteConfig(),dist=process.env.BROWSER_TEST_BUILD==='true'?'dist-browser-test':'dist';
await build();
const server=await createServer({cacheDir:'node_modules/.vite-ssr',server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
try{
 const {pages,pageMetadata,canonical,structuredData,socialImage,socialImageAlt}=await server.ssrLoadModule('/src/seo.ts') as typeof import('../src/seo');
 const {contactConfigured}=await server.ssrLoadModule('/src/services/enquiries.ts');
 const {render}=await server.ssrLoadModule('/src/entry-server.tsx');
 const template=await readFile(dist+'/index.html','utf8'),jsonld=JSON.stringify(structuredData).replace(/</g,'\\u003c'),hash=createHash('sha256').update(jsonld).digest('base64');
 let headers=(await readFile('public/_headers','utf8')).replace('JSONLD_HASH',hash).replace('EMAILJS_CONNECT',contactConfigured?'https://api.emailjs.com':"'none'");
 if(!site.production)headers+='\n/*\n  X-Robots-Tag: noindex, follow\n';
 for(const route of [...Object.keys(pages),'/404.html','/404']){
  const m=pageMetadata(route),robots=route.startsWith('/404')?'noindex':m.index?'index, follow':'noindex, follow';
  for(const path of route==='/'?['/']:[route,route+'/',...(route.endsWith('.html')?[]:[route+'/index.html'])])headers+=`\n${path}\n  X-Robots-Tag: ${robots}\n`;
 }
 await writeFile(dist+'/_headers',headers);
 for(const route of [...Object.keys(pages),'/404']){
  const m=pageMetadata(route),url=route==='/404'?'':canonical(route),image=site.origin?site.origin+socialImage:socialImage;
  const head=`<title>${escape(m.title)}</title><meta name="description" content="${escape(m.description)}"/><meta name="robots" content="${route==='/404'?'noindex':m.index?'index, follow':'noindex, follow'}"/>
${url?`<link rel="canonical" href="${url}"/>`:''}<meta property="og:type" content="website"/><meta property="og:site_name" content="kanreki"/><meta property="og:title" content="${escape(m.title)}"/><meta property="og:description" content="${escape(m.description)}"/>${url?`<meta property="og:url" content="${url}"/>`:''}<meta property="og:image" content="${image}"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="${escape(socialImageAlt)}"/>
<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(m.title)}"/><meta name="twitter:description" content="${escape(m.description)}"/><meta name="twitter:image" content="${image}"/><meta name="twitter:image:alt" content="${escape(socialImageAlt)}"/>${route==='/'?`<script type="application/ld+json">${jsonld}</script>`:''}`;
  const file=route==='/'?dist+'/index.html':route==='/404'?dist+'/404.html':`${dist}${route}/index.html`;
  await mkdir(dirname(file),{recursive:true});await writeFile(file,template.replace('<!--page-head-->',head).replace('<!--app-html-->',render(route)));
 }
 const indexable=Object.keys(pages).filter(path=>pageMetadata(path).index&&canonical(path));
 await writeFile(dist+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map(path=>`  <url><loc>${canonical(path)}</loc></url>`).join('\n')}\n</urlset>\n`);
 await writeFile(dist+'/robots.txt',`User-agent: *\nAllow: /\n${site.production?`\nSitemap: ${site.origin}/sitemap.xml\n`:'# Preview: indexing is disabled in HTML and response headers.\n'}`);
 await writeFile(dist+'/build-info.json',JSON.stringify({...site,contactConfigured,indexable},null,2));
 console.log(`Prerendered 8 routes and HTTP 404; ${site.environment}; ${indexable.length} sitemap URLs.`);
}finally{await server.close()}
