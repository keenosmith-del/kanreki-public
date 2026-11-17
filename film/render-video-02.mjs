import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,extname} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {validateAssets} from './validate-assets.mjs';
const root=fileURLToPath(new URL('./',import.meta.url)),out=root+'output/video-02-r03/',mode=process.argv[2]||'all';
await mkdir(out+'frames',{recursive:true});
const originals=await validateAssets(),manifest=JSON.parse(await readFile(root+'video-02-assets.json'));
const added=[];
for(const [key,item] of Object.entries(manifest)){
 const path=root+'assets/'+item.file,bytes=await readFile(path);
 const {streams:[info]}=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','stream=width,height','-of','json',path]));
 if(info.width<item.minWidth||info.height<item.minHeight)throw Error('Invalid supplied asset dimensions: '+item.file);
 execFileSync('ffmpeg',['-v','error','-i',path,'-frames:v','1','-f','null','-']);
 added.push({key,...item,...info,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
await writeFile(out+'asset-validation.json',JSON.stringify({valid:true,assets:[...originals,...added]},null,2));
const bundled=await bundle({entryPoint:root+'src/video2/Entry.tsx'});
const server=createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.startsWith('/film/assets/')?join(root+'assets',path.slice('/film/assets/'.length)):join(bundled,path);const bytes=await readFile(file);res.writeHead(200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg'})[extname(file)]||'application/octet-stream'});res.end(bytes)}catch{res.writeHead(404);res.end()}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browserExecutable='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',browser=await openBrowser('chrome',{browserExecutable});
try{
 const base={serveUrl:`http://127.0.0.1:${server.address().port}/index.html`,browserExecutable,puppeteerInstance:browser},composition=await selectComposition({...base,id:'KanrekiProfilesFilm'});
 if(mode==='all'||mode==='stills')for(const t of [0,2.4,4.4,5.8,7.7,9.5,11.6,13.5,16.7,19,21.3,23.8,26.6,28.6,29.1,31.9,34.9,36.3,37.983333])await renderStill({...base,composition,frame:Math.round(t*60),scale:.5,output:out+`frames/${t}.png`});
 if(mode!=='stills'){
 const slice=mode==='views-proof'?[648,1151]:mode==='return-proof'?[2064,2279]:undefined;const proof=Boolean(slice)||mode==='proof'||mode==='comment-proof'||mode==='gallery-proof';const commentProof=mode==='comment-proof',galleryProof=mode==='gallery-proof';let last=-1;const start=Date.now();
 await renderMedia({...base,composition,scale:proof?.5:1,...(slice?{frameRange:slice}:commentProof?{frameRange:[25*60,30*60-1]}:galleryProof?{frameRange:[5*60,11*60-1]}:{}),codec:'h264',crf:proof?22:16,x264Preset:'fast',concurrency:2,outputLocation:out+(slice?mode+'.mp4':commentProof?'comment-proof.mp4':galleryProof?'gallery-proof.mp4':proof?'motion-proof.mp4':'kanreki-profiles-r03-master.mp4'),onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`${proof?'Internal moving proof':'Complete Video 2 master'}: ${n*10}% (${Math.round((Date.now()-start)/1000)}s)`)}}});
 await writeFile(out+(proof?'proof-render.json':'master-render.json'),JSON.stringify({id:composition.id,frames:composition.durationInFrames,fps:composition.fps,width:proof?960:1920,height:proof?540:1080,seconds:38,renderSeconds:(Date.now()-start)/1000},null,2));
 }
}finally{await browser.close({silent:true});server.close()}
