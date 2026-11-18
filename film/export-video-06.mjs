import {execFileSync} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const out=fileURLToPath(new URL('./output/video-06/',import.meta.url)),master=out+'kanreki-community-master.mp4';
for(const ext of process.argv.includes('--validate-only')?[]:['mp4','webm']){
 const options=ext==='mp4'?['-c:v','libx264','-preset','fast','-crf','21','-movflags','+faststart']:['-c:v','libvpx-vp9','-b:v','0','-crf','36','-deadline','good','-cpu-used','6','-row-mt','1'];
 execFileSync('ffmpeg',['-v','error','-y','-i',master,'-an',...options,'-pix_fmt','yuv420p',out+'kanreki-community.'+ext],{stdio:'inherit'});console.log('Exported complete '+ext);
}
execFileSync('ffmpeg',['-v','error','-y','-ss','49.5','-i',master,'-frames:v','1',out+'poster.png']);
const checks=[];
for(const file of ['kanreki-community.mp4','kanreki-community.webm']){
 const info=JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate,nb_read_frames','-of','json',out+file],{encoding:'utf8'}));
 assert.equal(info.streams.length,1);const v=info.streams[0];assert.equal(v.width,1920);assert.equal(v.height,1080);assert.equal(v.r_frame_rate,'60/1');assert.equal(+v.nb_read_frames,3120);assert(Math.abs(+info.format.duration-52)<.02);assert.equal(v.codec_name,file.endsWith('.mp4')?'h264':'vp9');
 execFileSync('ffmpeg',['-v','error','-i',out+file,'-f','null','-'],{stdio:'pipe'});
 const edges=execFileSync('ffmpeg',['-v','error','-i',out+file,'-vf',"select='eq(n,0)+eq(n,3119)',scale=480:270",'-fps_mode','passthrough','-pix_fmt','rgb24','-f','rawvideo','-'],{maxBuffer:2000000});
 const n=480*270*3;assert.equal(edges.length,2*n);let delta=0;for(let i=0;i<n;i++)delta+=Math.abs(edges[i]-edges[i+n]);const mean=delta/n;assert(mean<.5,'Loop mismatch');
 checks.push({file,...info,fullDecode:'passed',loopMeanChannelDifference:mean});console.log(file+': 52 seconds, 1080p60, 3120 frames, full decode and loop passed');
}
await writeFile(out+'validation.json',JSON.stringify({files:checks,homepageMediaActivated:false,approved:false},null,2));

execFileSync('ffmpeg',['-v','error','-y','-ss','49.5','-i',master,'-vf','crop=1080:1080:420:0,scale=1080:1080','-frames:v','1',out+'mobile-poster.png']);
await writeFile(out+'preview.html',await readFile(new URL('./video-06-review.html',import.meta.url),'utf8'));
console.log('Complete Video 6 standalone preview ready. Homepage unchanged.');
