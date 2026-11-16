import { readFile, access, mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
export async function validateAssets() {
  const manifest=JSON.parse(await readFile(root+'film/assets.json','utf8'));
  const errors=[],assets=[];
  for(const [key,entry] of Object.entries(manifest)) {
    const path=root+'film/assets/'+entry.file;
    try {
      await access(path);
      const bytes=await readFile(path);
      const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=width,height,codec_name','-of','json',path],{encoding:'utf8'}));
      const info=probe.streams[0];
      if(!info||info.width<entry.minWidth||info.height<entry.minHeight)throw Error(`expected at least ${entry.minWidth} × ${entry.minHeight}, found ${info?.width} × ${info?.height}`);
      // Decode as well as read the header. Damaged originals fail before any render.
      execFileSync('ffmpeg',['-v','error','-i',path,'-frames:v','1','-f','null','-'],{stdio:'pipe'});
      assets.push({key,file:entry.file,...info,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
    }catch(e){errors.push(`${entry.file}: ${e.code==='ENOENT'?'missing or unreadable':e.message}`);}
  }
  await mkdir(root+'film/output',{recursive:true});
  await writeFile(root+'film/output/asset-validation.json',JSON.stringify({valid:!errors.length,assets,errors},null,2));
  if(errors.length)throw Error('Film rendering blocked. Required supplied assets:\n'+errors.map(e=>'  - '+e).join('\n'));
  return assets;
}
if(process.argv[1]===fileURLToPath(import.meta.url))validateAssets().then(a=>console.log(`Validated ${a.length} supplied assets.`)).catch(e=>{console.error(e.message);process.exitCode=1;});
