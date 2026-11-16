import {execFileSync} from 'node:child_process';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const out=fileURLToPath(new URL('./output/revision-02/',import.meta.url));
const master=out+'kanreki-hero-revision-02-master.mp4';
for(const format of (process.argv.includes('--validate-only')?[]:['mp4','webm'])){
 const args=format==='mp4'?['-c:v','libx264','-crf','20','-preset','fast','-movflags','+faststart']:['-c:v','libvpx-vp9','-crf','33','-b:v','0','-deadline','good','-cpu-used','6','-row-mt','1'];
 execFileSync('ffmpeg',['-v','error','-y','-i',master,'-an',...args,'-pix_fmt','yuv420p',out+`kanreki-hero-revision-02.${format}`],{stdio:'inherit'});
 console.log(`Exported full ${format}`);
}
execFileSync('ffmpeg',['-v','error','-y','-ss','50.8','-i',master,'-frames:v','1',out+'poster.png']);
const validation=[];
for(const file of ['kanreki-hero-revision-02.mp4','kanreki-hero-revision-02.webm']){
 const meta=JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate,nb_read_frames','-of','json',out+file],{encoding:'utf8'}));
 assert.equal(meta.streams.length,1);const v=meta.streams[0];assert.equal(v.width,1920);assert.equal(v.height,1080);assert.equal(v.r_frame_rate,'60/1');assert.equal(Number(v.nb_read_frames),3180);assert(Math.abs(Number(meta.format.duration)-53)<.02);
 execFileSync('ffmpeg',['-v','error','-i',out+file,'-f','null','-'],{stdio:'pipe'});
 const raw=execFileSync('ffmpeg',['-v','error','-i',out+file,'-vf',"select='eq(n,0)+eq(n,3179)',scale=480:270",'-fps_mode','passthrough','-pix_fmt','rgb24','-f','rawvideo','-'],{maxBuffer:2000000});
 const bytes=480*270*3;assert.equal(raw.length,bytes*2);let difference=0;for(let i=0;i<bytes;i++)difference+=Math.abs(raw[i]-raw[i+bytes]);const mean=difference/bytes;assert(mean<.2);
 validation.push({file,...meta,fullDecode:'passed',loopMeanChannelDifference:mean});console.log(`${file}: 53s / 1080p60 / 3180 frames / decode and loop passed`);
}
await writeFile(out+'preview-validation.json',JSON.stringify({files:validation,homepageActivated:false,ownerApproval:false},null,2));
await writeFile(out+'preview.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>kanreki — revised hero preview</title><style>*{box-sizing:border-box}body{margin:0;background:#fff;color:#151517;font:15px -apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif}main{max-width:1600px;margin:auto;padding:24px}header{display:flex;align-items:baseline;justify-content:space-between;gap:20px;margin-bottom:20px}h1{font-size:19px;font-weight:500;letter-spacing:-.5px;margin:0}p{color:#77777c;margin:0;font-size:13px}video{display:block;width:100%;aspect-ratio:16/9;background:#fff}button{border:0;border-radius:40px;background:#151517;color:white;padding:12px 20px;font:inherit;cursor:pointer}footer{display:flex;gap:20px;align-items:center;margin-top:20px}output{color:#77777c;font-size:13px}</style><main><header><h1>kanreki. — revised hero</h1><p>53 seconds · 1080p · 60 fps · standalone review</p></header><video id="review-film" controls autoplay muted loop playsinline poster="poster.png"><source src="kanreki-hero-revision-02.mp4" type="video/mp4"><source src="kanreki-hero-revision-02.webm" type="video/webm"></video><footer><button id="replay" type="button">replay from beginning</button><output id="playback" aria-live="off"></output></footer></main><script>const video=document.querySelector('video');document.querySelector('#replay').onclick=()=>{video.currentTime=0;video.play()};video.ontimeupdate=()=>{document.querySelector('output').textContent=video.currentTime.toFixed(1)+' / 53 seconds'};</script></html>`);
console.log('Full standalone preview ready. Homepage manifests have not been changed.');
