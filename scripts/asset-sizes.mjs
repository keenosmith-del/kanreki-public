import {readdir,stat} from 'node:fs/promises';
export const PAGES_ASSET_LIMIT=25*1024*1024;
export async function auditAssetSizes(root){const files=[];async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+entry.name;if(entry.isDirectory())await walk(path);else files.push({path,bytes:(await stat(path)).size});}}await walk(root);return {files,oversized:files.filter(file=>file.bytes>PAGES_ASSET_LIMIT)};}
