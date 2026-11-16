import {readFile,writeFile} from 'node:fs/promises';
const [gate,...words]=process.argv.slice(2);
const files={opening:'opening-proof.json',interface:'interface-proof.json',motion:'motion-proof.json'};
if(!files[gate]||words.join(' ').length<20)throw Error('Use opening, interface or motion followed by actual visual findings. Record a review only after inspecting its moving evidence.');
const out=new URL('./output/revision-02/',import.meta.url);
const proof=JSON.parse(await readFile(new URL(files[gate],out),'utf8'));
await writeFile(new URL(`review-${gate}.json`,out),JSON.stringify({accepted:true,fingerprint:proof.fingerprint,findings:words.join(' ')},null,2)+'\n');
console.log(`Recorded ${gate} findings for source ${proof.fingerprint.slice(0,12)}. This is internal verification, not owner approval.`);
