import {createHash} from 'node:crypto';
import {readdir,readFile} from 'node:fs/promises';
import {join} from 'node:path';
// Bind test evidence to deployable code/assets, independently of documentation-only commits.
export async function sourceFingerprint(root=process.cwd()){
 const files=[];
 async function walk(relative){for(const entry of await readdir(join(root,relative),{withFileTypes:true})){if(['.DS_Store','__pycache__','node_modules'].includes(entry.name))continue;const path=relative+'/'+entry.name;if(entry.isDirectory())await walk(path);else if(entry.isFile())files.push(path);}}
 for(const directory of ['src','config','scripts','public','tests'])await walk(directory);
 files.push('package.json','package-lock.json','index.html','vite.config.ts','vitest.config.ts','playwright.config.ts','playwright.live.config.ts','wrangler.jsonc','.node-version');
 const hash=createHash('sha256');for(const file of files.sort()){hash.update(file+'\0');hash.update(await readFile(join(root,file)));hash.update('\0');}return hash.digest('hex');
}
