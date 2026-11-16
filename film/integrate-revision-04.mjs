import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url)),out=root+'film/output/revision-04/';
const validation=JSON.parse(await readFile(out+'preview-validation.json','utf8'));
assert.equal(validation.files.length,2);
for(const file of validation.files){assert.equal(file.fullDecode,'passed');assert.equal(Number(file.streams[0].nb_read_frames),3600);assert.equal(Number(file.format.duration),60)}
await mkdir(root+'public/media',{recursive:true});
for(const extension of ['mp4','webm']){
 const source=out+`kanreki-hero-revision-04.${extension}`,target=root+`public/media/kanreki-hero.${extension}`;
 await copyFile(source,target);
 const hash=bytes=>createHash('sha256').update(bytes).digest('hex');assert.equal(hash(await readFile(source)),hash(await readFile(target)));
}
await copyFile(out+'poster.png',root+'public/media/kanreki-hero-poster.png');
execFileSync('ffmpeg',['-v','error','-y','-i',out+'poster.png','-vf','crop=1080:1080:(iw-1080)/2:0,scale=780:780','-frames:v','1',root+'public/media/kanreki-hero-mobile.png']);
await writeFile(root+'src/hero-production.json',JSON.stringify({ready:true,src:'/media/kanreki-hero.mp4',webm:'/media/kanreki-hero.webm',poster:'/media/kanreki-hero-poster.png',mobilePoster:'/media/kanreki-hero-mobile.png',revision:'04',seconds:60},null,2)+'\n');
console.log('Revision 04 integrated into Section 1. All other media manifests preserved.');
