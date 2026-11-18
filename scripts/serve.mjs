// Static QA server: mirrors generated headers, direct routes, byte ranges and HTTP 404.
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {resolve,extname} from 'node:path';
const root=resolve(process.env.STATIC_ROOT||'dist'),port=Number(process.env.PORT||4173);
const rules=[];for(const line of (await readFile(resolve(root,'_headers'),'utf8')).split('\n')){if(!line.trim()||line.startsWith('#'))continue;if(!/^\s/.test(line))rules.push({pattern:line.trim(),headers:{}});else{const split=line.indexOf(':');if(split>0)rules.at(-1).headers[line.slice(0,split).trim()]=line.slice(split+1).trim();}}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.txt':'text/plain','.xml':'application/xml','.json':'application/json','.woff2':'font/woff2','.mp4':'video/mp4','.webm':'video/webm','.webp':'image/webp'};
http.createServer(async(req,res)=>{
 let path='/';const headers={};
 try{
  path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  for(const rule of rules)if(rule.pattern===path||rule.pattern.endsWith('*')&&path.startsWith(rule.pattern.slice(0,-1)))Object.assign(headers,rule.headers);
  let file=resolve(root,'.'+path);if((file!==root&&!file.startsWith(root+'/'))||path.split('/').some(p=>p.startsWith('.')))throw Error('invalid path');
  let meta=await stat(file);if(meta.isDirectory()){file=resolve(file,'index.html');meta=await stat(file);}
  headers['Content-Type']=types[extname(file)]||'application/octet-stream';headers['Accept-Ranges']='bytes';
  let start=0,end=meta.size-1,status=200;
  if(req.headers.range){const range=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);if(!range)throw Error('invalid range');if(!range[1])start=Math.max(0,meta.size-Number(range[2]));else{start=Number(range[1]);if(range[2])end=Math.min(end,Number(range[2]));}if(start>end||start>=meta.size){res.writeHead(416,{'Content-Range':`bytes */${meta.size}`});res.end();return;}status=206;headers['Content-Range']=`bytes ${start}-${end}/${meta.size}`;}
  headers['Content-Length']=String(end-start+1);res.writeHead(status,headers);if(req.method==='HEAD')res.end();else createReadStream(file,{start,end}).pipe(res);
 }catch{const bytes=await readFile(resolve(root,'404.html'));res.writeHead(404,{...headers,'Content-Type':'text/html; charset=utf-8','X-Robots-Tag':'noindex','Content-Length':bytes.length});res.end(req.method==='HEAD'?undefined:bytes);}
}).listen(port,'127.0.0.1',()=>console.log(`Static preview: http://127.0.0.1:${port}`));
