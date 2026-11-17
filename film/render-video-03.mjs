import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,extname} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {validateAssets} from './validate-assets.mjs';
const root=fileURLToPath(new URL('./',import.meta.url)),out=root+'output/video-03/',mode=process.argv[2]||'all';
await mkdir(out+'frames',{recursive:true});
const originals=await validateAssets(),manifest=JSON.parse(await readFile(root+'video-03-assets.json'));
const added=[];
for(const [key,item] of Object.entries(manifest)){
 const path=root+'assets/'+item.file,bytes=await readFile(path);
 const {streams:[info]}=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','stream=codec_name,width,height','-of','json',path]));
 if(info.width<item.minWidth||info.height<item.minHeight)throw Error('Invalid supplied asset dimensions: '+item.file);
 execFileSync('ffmpeg',['-v','error','-i',path,'-frames:v','1','-f','null','-']);
 added.push({key,...item,...info,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
await writeFile(out+'asset-validation.json',JSON.stringify({valid:true,assets:[...originals,...added]},null,2));
const bundled=await bundle({entryPoint:root+'src/video3/Entry.tsx'});
const server=createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.startsWith('/film/assets/')?join(root+'assets',path.slice('/film/assets/'.length)):join(bundled,path);const bytes=await readFile(file);const type=bytes[0]===255&&bytes[1]===216?'image/jpeg':({'.html':'text/html','.js':'text/javascript','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg'})[extname(file)]||'application/octet-stream';res.writeHead(200,{'Content-Type':type});res.end(bytes)}catch{res.writeHead(404);res.end()}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browserExecutable='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',browser=await openBrowser('chrome',{browserExecutable});
try{
 const base={serveUrl:`http://127.0.0.1:${server.address().port}/index.html`,browserExecutable,puppeteerInstance:browser},composition=await selectComposition({...base,id:'KanrekiDraftingFilm'});
 if(['all','stills','proof'].includes(mode))for(const t of [0,3.7,7.5,10.5,12.5,15.7,16.6,18.5,20.8,22.6,23.6,24.6,26.4,28.8,30.15,30.8,31.9,33.5,35.8,37.7,40.2,42.7,44.3,45.983333])await renderStill({...base,composition,frame:Math.round(t*60),scale:.5,output:out+`frames/${t}.png`});
 if(mode!=='stills'){
 const proof=mode==='proof'||mode==='editing-proof',slice=mode==='editing-proof'?[Math.round(14.8*60),34*60-1]:undefined;let last=-1;const start=Date.now();
 await renderMedia({...base,composition,scale:proof?.5:1,...(slice?{frameRange:slice}:{}),codec:'h264',crf:proof?22:16,x264Preset:'fast',concurrency:2,outputLocation:out+(slice?'editing-proof.mp4':proof?'motion-proof.mp4':'kanreki-drafting-master.mp4'),onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`${proof?'Internal moving proof':'Complete Video 3 master'}: ${n*10}% (${Math.round((Date.now()-start)/1000)}s)`)}}});
 const frames=slice?slice[1]-slice[0]+1:composition.durationInFrames;
 await writeFile(out+(slice?'editing-proof-render.json':proof?'proof-render.json':'master-render.json'),JSON.stringify({id:composition.id,frames,fps:composition.fps,width:proof?960:1920,height:proof?540:1080,seconds:frames/composition.fps,renderSeconds:(Date.now()-start)/1000},null,2));
 }
}finally{await browser.close({silent:true});server.close()}
