import {it,expect} from 'vitest';
import {mkdtemp,writeFile,truncate,rm,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {auditAssetSizes,PAGES_ASSET_LIMIT} from '../scripts/asset-sizes.mjs';
it('audits nested and unrelated output files against the exact Pages size limit',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'kanreki-size-'));
 try{await mkdir(dir+'/nested');await writeFile(dir+'/nested/unrelated.bin','');await truncate(dir+'/nested/unrelated.bin',PAGES_ASSET_LIMIT+1);await writeFile(dir+'/limit.webm','');await truncate(dir+'/limit.webm',PAGES_ASSET_LIMIT);const result=await auditAssetSizes(dir);expect(result.files).toHaveLength(2);expect(result.oversized.map((f:{path:string})=>f.path)).toEqual([dir+'/nested/unrelated.bin']);}finally{await rm(dir,{recursive:true,force:true})}
});
