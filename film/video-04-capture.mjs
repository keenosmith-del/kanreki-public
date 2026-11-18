import {execFileSync} from 'node:child_process';
import {copyFile,rename,writeFile} from 'node:fs/promises';
import {renderStill} from '@remotion/renderer';
/** Detect isolated capture corruption; always replace with a fresh source render, never interpolation. */
export function auditCapture(file){
 const bytes=execFileSync('ffmpeg',['-v','error','-i',file,'-vf','scale=160:90','-pix_fmt','rgb24','-f','rawvideo','-'],{maxBuffer:120000000}),size=43200,deltas=[0];
 for(let frame=1;frame<bytes.length/size;frame++){let sum=0;for(let i=0;i<size;i++)sum+=Math.abs(bytes[frame*size+i]-bytes[(frame-1)*size+i]);deltas.push(sum/size)}
 const isolated=[];for(let frame=1;frame<deltas.length-2;frame++)if(deltas[frame]>10&&deltas[frame+1]>10&&Math.max(deltas[frame-1],deltas[frame+2])<Math.min(deltas[frame],deltas[frame+1])*.65)isolated.push(frame);
 return {frames:deltas.length,peak:Math.max(...deltas),isolated};
}
export async function verifyCapture({base,composition,out}){
 const master=out+'kanreki-reading-master.mp4',before=auditCapture(master);if(before.frames!==2520)throw Error('Incomplete Video 4 master');
 if(before.isolated.length>12)throw Error('Too many capture defects; investigate the renderer');
 if(before.isolated.length){
  const files=[];for(const frame of before.isolated){const path=out+`frames/recaptured-${frame}.png`;await renderStill({...base,composition,frame,imageFormat:'png',output:path});files.push(path)}
  await copyFile(master,out+'capture-before-repair.mp4');
  let previous='0:v';const filters=before.isolated.map((frame,i)=>{const label=`repair${i}`;const filter=`[${previous}][${i+1}:v]overlay=0:0:enable='eq(n,${frame})'[${label}]`;previous=label;return filter});
  const repaired=out+'master-verified.mp4';execFileSync('ffmpeg',['-v','error','-y','-i',master,...files.flatMap(file=>['-i',file]),'-filter_complex',filters.join(';'),'-map',`[${previous}]`,'-an','-c:v','libx264','-crf','16','-preset','fast','-pix_fmt','yuv420p',repaired],{stdio:'inherit'});
  await rename(repaired,master);
 }
 const after=auditCapture(master);await writeFile(out+'capture-validation.json',JSON.stringify({before,after,repairedFrames:before.isolated,method:'Fresh deterministic PNG render of the exact source frame; no timing change or synthesized motion.'},null,2));
 if(after.frames!==2520||after.peak>=10||after.isolated.length)throw Error('Capture integrity check failed');
 console.log(`Capture integrity passed: ${after.frames} frames; ${before.isolated.length} source frames recaptured; peak difference ${after.peak.toFixed(3)}`);
}
