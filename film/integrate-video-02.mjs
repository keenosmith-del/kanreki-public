import {readFile,copyFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url)),out=root+'film/output/video-02-r03/';
const report=JSON.parse(await readFile(out+'validation.json','utf8'));
assert.equal(report.files.length,2);
await mkdir(root+'public/media',{recursive:true});
for(const item of report.files){
 assert.equal(item.fullDecode,'passed');assert.equal(+item.streams[0].nb_read_frames,2280);assert.equal(+item.format.duration,38);
 const src=out+item.file,target=root+'public/media/'+item.file;await copyFile(src,target);
 const hash=b=>createHash('sha256').update(b).digest('hex');assert.equal(hash(await readFile(src)),hash(await readFile(target)));
}
await copyFile(out+'poster.png',root+'public/media/kanreki-profiles-r03-poster.png');
await copyFile(out+'mobile-poster.png',root+'public/media/kanreki-profiles-r03-mobile.png');
console.log('Copied verified Video 2 delivery assets. Video 1 remains unchanged.');
