import {createServer} from 'node:http';
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,extname,resolve} from 'node:path';
const revision=process.argv[2]||'04';
const root=fileURLToPath(new URL(`./output/revision-${revision}/`,import.meta.url));
const server=createServer(async(req,res)=>{
 try{
  const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=name==='/reference-kailor.mp4'?'/Users/keenosmith/Programming/kailor/frontend/public/film/cinematic/kailor-hero.mp4':join(root,name==='/'?'preview.html':name);
  if(!resolve(file).startsWith(root)&&name!=='/reference-kailor.mp4'){res.writeHead(403);res.end();return}
  const {size}=await stat(file);const type=({'.html':'text/html','.mp4':'video/mp4','.webm':'video/webm','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg'})[extname(file)]||'application/octet-stream';
  const range=req.headers.range;
  if(range){const [a,b]=range.replace('bytes=','').split('-');const start=Number(a),end=b?Math.min(Number(b),size-1):size-1;res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1,'Content-Type':type});createReadStream(file,{start,end}).pipe(res)}else{res.writeHead(200,{'Content-Type':type,'Content-Length':size,'Accept-Ranges':'bytes'});createReadStream(file).pipe(res)}
 }catch{res.writeHead(404);res.end('Not found')}
});server.listen(5198,'127.0.0.1',()=>console.log('Standalone film review: http://127.0.0.1:5198/'));
