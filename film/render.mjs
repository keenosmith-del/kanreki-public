import {createServer} from 'vite';
import {chromium} from '@playwright/test';
import {readFile,writeFile,mkdir,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync,spawn} from 'node:child_process';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';
import {validateAssets} from './validate-assets.mjs';
import {FPS,SECONDS,FRAMES,proofTimes} from './src/timeline.ts';
const root=fileURLToPath(new URL('../',import.meta.url));
const mode=process.argv[2]||'opening';
const out=root+'film/output/revision-02/';
if(!['opening','interface','stills','proof','local','master'].includes(mode))throw Error('Revision 02 is preview-only. Use opening, interface, stills, proof or local. Production activation requires owner approval.');
const assets=await validateAssets();
const hash=createHash('sha256').update(JSON.stringify(assets));
for(const name of (await readdir(root+'film/src')).sort())hash.update(await readFile(root+'film/src/'+name));
hash.update(await readFile(fileURLToPath(import.meta.url)));
const fingerprint=hash.digest('hex');
await mkdir(out+'stills',{recursive:true});
async function gate(name) {
  const review=JSON.parse(await readFile(out+`review-${name}.json`,'utf8').catch(()=>'{"accepted":false}'));
  if(!review.accepted||review.fingerprint!==fingerprint)throw Error(`Internal ${name} visual verification is still required for current source/assets. Do not perform an expensive full-resolution render yet.`);
}
if(mode==='proof'||mode==='local'||mode==='master'){await gate('opening');await gate('interface');}
if(mode==='local'||mode==='master')await gate('motion');
const server=await createServer({root,server:{host:'127.0.0.1',port:4188,strictPort:true},logLevel:'error'});
let browser;
try {
  await server.listen();
  browser=await chromium.launch({channel:'chrome'});
  const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4188/film/index.html');await page.waitForFunction(()=>Boolean(window.film));
  const meta=await page.evaluate(()=>({fps:window.film.fps,frames:window.film.frames,seconds:window.film.seconds}));
  if(meta.frames!==FRAMES||meta.seconds!==SECONDS||meta.fps!==FPS)throw Error('Render surface and source timeline disagree.');
  async function seek(frame){await page.evaluate(n=>window.film.seek(n),frame);if(errors.length)throw Error(errors.join('\n'));}
  async function stills(times,prefix='') {
    await page.setViewportSize({width:1920,height:1080});
    await page.addStyleTag({content:'#film-frame{transform:none!important}'});
    for(const t of times){await seek(Math.min(FRAMES-1,Math.round(t*FPS)));await page.screenshot({path:out+`stills/${prefix}${t.toFixed(3)}.png`});}
  }
  async function renderVideo(name,{fps=30,width=960,height=540,crf=22,start=0,end=SECONDS}={}) {
    await page.setViewportSize({width,height});
    await page.addStyleTag({content:`#film-frame{transform:scale(${width/1920})!important;transform-origin:0 0}`});
    const encoder=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-vcodec','png','-framerate',String(fps),'-i','pipe:0','-an','-c:v','libx264','-crf',String(crf),'-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',out+name],{stdio:['pipe','inherit','inherit']});
    let encoderError;encoder.on('error',e=>{encoderError=e;});encoder.stdin.on('error',e=>{encoderError=e;});
    const done=once(encoder,'close'),count=Math.round((end-start)*fps);
    try {
      for(let i=0;i<count;i++) {
        if(encoderError)throw encoderError;
        await seek(Math.min(FRAMES-1,Math.round((start+i/fps)*FPS)));
        const bytes=await page.screenshot({type:'png',clip:{x:0,y:0,width,height}});
        if(!encoder.stdin.write(bytes))await once(encoder.stdin,'drain');
        if(i%(fps*4)===0)console.log(`${mode}: ${(i/fps).toFixed(0)} / ${end-start} seconds`);
      }
      encoder.stdin.end();const [code]=await done;if(code!==0)throw Error(`FFmpeg failed: ${code}`);
    }catch(e){encoder.kill();throw e;}
    const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',out+name],{encoding:'utf8'}));
    const v=probe.streams.find(s=>s.codec_type==='video');
    if(v.width!==width||v.height!==height||Math.abs(Number(probe.format.duration)-(end-start))>.05||v.avg_frame_rate!==`${fps}/1`||Number(v.nb_frames)!==count||probe.streams.some(s=>s.codec_type==='audio'))throw Error('Video encoding validation failed.');
    execFileSync('ffmpeg',['-v','error','-i',out+name,'-f','null','-'],{stdio:'inherit'});
    return {fingerprint,name,bytes:(await stat(out+name)).size,probe,start,end,frames:count,decode:'passed',visualApproval:false};
  }
  async function record(name,data){await writeFile(out+name+'.json',JSON.stringify(data,null,2)+'\n');}
  if(mode==='opening') {
    const result=await renderVideo('opening-proof.mp4',{end:16});
    await stills([0,.8,1.6,2.5,3.2,4.3,5.5,6.5,7.4,8.6,9.7,10.6,11.6,12.7,13.4,14.3,15.4,16],'opening-');
    await record('opening-proof',result);
  }
  if(mode==='interface') {
    const result=await renderVideo('interface-proof.mp4',{start:23,end:49});
    await stills([17,24.2,26.4,31,35.8,38.7,39.8,42,43.8,45.5,47],'interface-');
    await record('interface-proof',result);
  }
  if(mode==='stills') {
    await stills(proofTimes);await record('layout-proof',{fingerprint,times:proofTimes});
  }
  if(mode==='proof')await record('motion-proof',await renderVideo('motion-proof.mp4'));
  if(mode==='local'||mode==='master') {
    const result=await renderVideo('kanreki-hero-revision-02.mp4',{fps:FPS,width:1920,height:1080,crf:18});
    // PNG is universally supported; optional WebP must never discard a finished video.
    execFileSync('ffmpeg',['-v','error','-y','-ss','50.8','-i',out+'kanreki-hero-revision-02.mp4','-frames:v','1',out+'poster.png']);
    for(const t of [0,4.3,9.5,16,24.2,35.8,40,46.5,50.8,(FRAMES-1)/FPS])execFileSync('ffmpeg',['-v','error','-y','-ss',String(t),'-i',out+'kanreki-hero-revision-02.mp4','-frames:v','1',out+`stills/export-${t.toFixed(3)}.png`]);
    await record('preview-validation',result);
    await writeFile(out+'preview.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>kanreki — revision 02 preview</title><style>body{margin:0;background:white;color:#151517;font:16px Helvetica,Arial}main{max-width:1440px;padding:24px;margin:auto}h1{font-size:22px;font-weight:500}p{color:#77777c}video{width:100%;display:block}</style><main><h1>kanreki — revision 02 preview for approval</h1><p>${SECONDS} seconds · 1920 × 1080 · ${FPS} fps. Not applied to the homepage.</p><video src="kanreki-hero-revision-02.mp4" poster="poster.png" controls autoplay muted loop playsinline></video></main></html>`);
    console.log('Preview: '+out+'preview.html');console.log('MP4: '+out+'kanreki-hero-revision-02.mp4');
  }
}finally{await browser?.close();await server.close();}
