import {readFile,copyFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url)),out=root+'film/output/video-04-r02/';
const report=JSON.parse(await readFile(out+'validation.json','utf8'));
assert.equal(report.files.length,2);
await mkdir(root+'public/media',{recursive:true});
const hash=b=>createHash('sha256').update(b).digest('hex');
for(const item of report.files){
 assert.equal(item.fullDecode,'passed');assert.equal(+item.streams[0].nb_read_frames,2520);assert.equal(+item.format.duration,42);assert.equal(item.streams[0].width,1920);assert.equal(item.streams[0].height,1080);assert.equal(item.streams[0].r_frame_rate,'60/1');
 const src=out+item.file,target=root+'public/media/'+item.file;await copyFile(src,target);assert.equal(hash(await readFile(src)),hash(await readFile(target)));
}
for(const [source,target] of [['poster.png','kanreki-reading-poster.png'],['mobile-poster.png','kanreki-reading-mobile.png']])await copyFile(out+source,root+'public/media/'+target);
console.log('Copied owner-authorised Video 4 exports and posters. Videos 1–3 unchanged.');
