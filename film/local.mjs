import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
const out=fileURLToPath(new URL('./output/revision-04/',import.meta.url));
try {await readFile(out+'preview-validation.json');await readFile(out+'preview.html');}
catch {throw Error('Revision 04 has not been rendered and verified yet. The rejected 72-second video will not be opened as a substitute.');}
console.log('Standalone revision 04 preview: '+out+'preview.html');
console.log('MP4: '+out+'kanreki-hero-revision-04.mp4');
console.log('Opening the standalone preview does not change the homepage.');
spawn(process.platform==='darwin'?'open':process.platform==='win32'?'explorer':'xdg-open',[out+'preview.html'],{stdio:'inherit'}).on('error',()=>console.log('Open the preview.html file above in your browser.'));
