import {execFileSync} from 'node:child_process';
import {readFile,writeFile,stat,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {presentationAt} from './src/revision05/timeline.ts';
const out=fileURLToPath(new URL('./output/revision-05/',import.meta.url));
const master=out+'kanreki-hero-revision-05-master.mp4';
for(const format of (process.argv.includes('--validate-only')?[]:process.argv.includes('--webm-only')?['webm']:['mp4','webm'])){
 const args=format==='mp4'?['-c:v','libx264','-crf','20','-preset','fast','-movflags','+faststart']:['-c:v','libvpx-vp9','-crf','34','-b:v','2600k','-maxrate','3000k','-bufsize','6000k','-deadline','good','-cpu-used','6','-row-mt','1'];
 execFileSync('ffmpeg',['-v','error','-y','-i',master,'-an',...args,'-pix_fmt','yuv420p',out+`kanreki-hero-revision-05.${format}`],{stdio:'inherit'});
 console.log(`Exported full ${format}`);
}
execFileSync('ffmpeg',['-v','error','-y','-ss','57.8','-i',master,'-frames:v','1',out+'poster.png']);
execFileSync('ffmpeg',['-v','error','-y','-i',out+'poster.png','-vf','crop=1080:1080:(iw-1080)/2:0,scale=780:780','-frames:v','1',out+'mobile-poster.png']);
const reviewFrames=[['create-post-icon',19.7],['image-selection',26.65],['published-post',40],['like-count-close-up',42.8],['three-comments',46.5]];
for(const [name,time] of reviewFrames)execFileSync('ffmpeg',['-v','error','-y','-ss',String(presentationAt(time)),'-i',master,'-frames:v','1',out+'frames/'+name+'.png']);
await writeFile(out+'frames.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Revision 05 — representative frames</title><style>body{max-width:1400px;margin:24px auto;padding:0 24px;font:16px Helvetica;color:#151517;background:white}img{width:100%;display:block}h2{font-size:20px;font-weight:500;margin-top:40px}a{color:inherit}</style><a href="preview.html">back to moving film</a>${reviewFrames.map(([name])=>`<h2>${name.replaceAll('-',' ')}</h2><a href="frames/${name}.png"><img src="frames/${name}.png" alt="${name.replaceAll('-',' ')}"></a>`).join('')}</html>`);
const validation=[];
for(const file of ['kanreki-hero-revision-05.mp4','kanreki-hero-revision-05.webm']){
 const meta=JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate,nb_read_frames','-of','json',out+file],{encoding:'utf8'}));
 assert.equal(meta.streams.length,1);const v=meta.streams[0];assert.equal(v.width,1920);assert.equal(v.height,1080);assert.equal(v.r_frame_rate,'60/1');assert.equal(Number(v.nb_read_frames),3600);assert(Math.abs(Number(meta.format.duration)-60)<.02);
 execFileSync('ffmpeg',['-v','error','-i',out+file,'-f','null','-'],{stdio:'pipe'});
 const raw=execFileSync('ffmpeg',['-v','error','-i',out+file,'-vf',"select='eq(n,0)+eq(n,3599)',scale=480:270",'-fps_mode','passthrough','-pix_fmt','rgb24','-f','rawvideo','-'],{maxBuffer:2000000});
 const bytes=480*270*3;assert.equal(raw.length,bytes*2);let difference=0;for(let i=0;i<bytes;i++)difference+=Math.abs(raw[i]-raw[i+bytes]);const mean=difference/bytes;assert(mean<.2);
 const border=execFileSync('ffmpeg',['-v','error','-ss','33.7','-i',out+file,'-frames:v','1','-pix_fmt','rgb24','-f','rawvideo','-'],{maxBuffer:8000000});
 let edgeMinimum=255;
 for(let x=0;x<1920;x++)for(const y of [0,1079])for(let c=0;c<3;c++)edgeMinimum=Math.min(edgeMinimum,border[(y*1920+x)*3+c]);
 for(let y=0;y<1080;y++)for(const x of [0,1919])for(let c=0;c<3;c++)edgeMinimum=Math.min(edgeMinimum,border[(y*1920+x)*3+c]);
 assert(edgeMinimum>=248,'Film perimeter must blend into the white page canvas');
 const sequence=execFileSync('ffmpeg',['-v','error','-i',out+file,'-vf','scale=160:90','-pix_fmt','rgb24','-f','rawvideo','-'],{maxBuffer:180000000});
 const frameBytes=160*90*3;assert.equal(sequence.length,frameBytes*3600);
 let peakFrameDifference=0,peakFrame=0,blackFrames=0;
 for(let f=0;f<3600;f++){
  let luminance=0,delta=0;const offset=f*frameBytes;
  for(let i=0;i<frameBytes;i++){luminance+=sequence[offset+i];if(f)delta+=Math.abs(sequence[offset+i]-sequence[offset-frameBytes+i]);}
  if(luminance/frameBytes<2)blackFrames++;
  if(f&&delta/frameBytes>peakFrameDifference){peakFrameDifference=delta/frameBytes;peakFrame=f;}
 }
 assert.equal(blackFrames,0);assert(peakFrameDifference<10,'Unexpected full-frame discontinuity requires motion review');
 validation.push({file,blackFrames,peakFrameDifference,peakFrame,...meta,fullDecode:'passed',loopMeanChannelDifference:mean,whiteCanvasEdgeMinimum:edgeMinimum});console.log(`${file}: 60s / 1080p60 / 3600 frames / decode and loop passed`);
}
const sourceRoot=fileURLToPath(new URL('./src/revision05/',import.meta.url));
const sourceHash=createHash('sha256');for(const name of (await readdir(sourceRoot)).sort())sourceHash.update(name).update(await readFile(sourceRoot+name));sourceHash.update(await readFile(new URL('./assets-revision-05.json',import.meta.url)));
await writeFile(out+'preview-validation.json',JSON.stringify({sourceSha256:sourceHash.digest('hex'),files:validation,homepageActivated:false,ownerApproval:false},null,2));
await writeFile(out+'preview.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>kanreki — Revision 05 hero preview</title><style>*{box-sizing:border-box}body{margin:0;background:#fff;color:#151517;font:15px -apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif}main{max-width:1600px;margin:auto;padding:24px}header{display:flex;align-items:baseline;justify-content:space-between;gap:20px;margin-bottom:20px}h1{font-size:19px;font-weight:500;letter-spacing:-.5px;margin:0}p{color:#77777c;margin:0;font-size:13px}video{display:block;width:100%;aspect-ratio:16/9;background:#fff}button{border:0;border-radius:40px;background:#151517;color:white;padding:12px 20px;font:inherit;cursor:pointer}footer{display:flex;gap:20px;align-items:center;margin-top:20px}output{color:#77777c;font-size:13px}</style><main><header><h1>kanreki. — Revision 05 hero</h1><p>60 seconds · 1080p · 60 fps · standalone review</p></header><video id="review-film" controls autoplay muted loop playsinline poster="poster.png"><source src="kanreki-hero-revision-05.mp4" type="video/mp4"><source src="kanreki-hero-revision-05.webm" type="video/webm"></video><footer><button id="replay" type="button">replay from beginning</button><output id="playback" aria-live="off"></output></footer><p style="margin-top:20px"><a href="kanreki-hero-revision-05.mp4">MP4</a> · <a href="kanreki-hero-revision-05.webm">WebM</a> · <a href="frames.html">representative frames</a> · <a href="/">local homepage</a></p></main><script>const video=document.querySelector('video');document.querySelector('#replay').onclick=()=>{video.currentTime=0;video.play()};video.ontimeupdate=()=>{document.querySelector('output').textContent=video.currentTime.toFixed(1)+' / 60 seconds'};</script></html>`);
console.log('Full standalone preview ready. Homepage manifests have not been changed.');
