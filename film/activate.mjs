import {readFile,writeFile,access} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const report=JSON.parse(await readFile(new URL('film/output/production-validation.json',root),'utf8'));
const review=JSON.parse(await readFile(new URL('film/output/review-export.json',root),'utf8'));
if(!review.accepted||report.fingerprint!==review.fingerprint)throw Error('Inspect actual exported frames and record the export review before activating.');
const path=new URL('src/hero-production.json',root),manifest=JSON.parse(await readFile(path,'utf8'));
for(const key of ['src','webm','poster','mobilePoster'])await access(new URL('public'+manifest[key],root));
await writeFile(path,JSON.stringify({...manifest,ready:true},null,2)+'\n');
console.log('Section 1 production paths activated. Run the build and browser checks.');
