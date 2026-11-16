import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,extname} from 'node:path';
import {validateAssets} from './validate-assets.mjs';
const root=fileURLToPath(new URL('./',import.meta.url)),output=root+'output/revision-04/';
import {presentationAt as present} from './src/timeline.ts';
const mode=process.argv[2]||'all';
await validateAssets();await mkdir(output+'frames',{recursive:true});
const bundled=await bundle({entryPoint:root+'src/Remotion.tsx'});
const server=createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=pathname.startsWith('/film/assets/')?join(root+'assets',pathname.slice('/film/assets/'.length)):join(bundled,pathname);
  const data=await readFile(file);res.writeHead(200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.png':'image/png','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream'});res.end(data);
 }catch{res.writeHead(404);res.end()}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browserExecutable='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await openBrowser('chrome',{browserExecutable});
try{
 const base={serveUrl:`http://127.0.0.1:${server.address().port}/index.html`,browserExecutable,puppeteerInstance:browser};
 const composition=await selectComposition({...base,id:'KanrekiHeroRevision04'});
 if(mode==='stills'||mode==='all')for(const time of [0,1.7,4.5,8.8,12.7,14.5,17,23,24.5,26.65,27.1,28.5,33.8,34.6,35,35.9,36.6,37.3,38,40,46.5,50.5,52.983333]){
  await renderStill({...base,composition,frame:Math.min(3599,Math.round(present(time)*60)),scale:.5,output:output+`frames/${time}.png`});
 }
 if(mode!=='stills'){
  let last=-1;const started=Date.now();
  await renderMedia({...base,composition,codec:'h264',crf:16,x264Preset:'fast',concurrency:2,outputLocation:output+'kanreki-hero-revision-04-master.mp4',onProgress:({progress})=>{const n=Math.floor(progress*20);if(n!==last){last=n;console.log(`Full hero: ${n*5}% · ${Math.round((Date.now()-started)/1000)}s`)}}});
  await writeFile(output+'render.json',JSON.stringify({id:composition.id,frames:composition.durationInFrames,width:composition.width,height:composition.height,fps:composition.fps,seconds:composition.durationInFrames/composition.fps,renderSeconds:(Date.now()-started)/1000},null,2));
 }
}finally{await browser.close({silent:true});server.close()}
