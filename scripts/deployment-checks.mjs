import {spawnSync} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
import {sourceFingerprint} from '../config/source-fingerprint.mjs';
import {requiredChecks} from '../config/release.mjs';
const proof={checkedAt:new Date().toISOString(),sourceFingerprint:await sourceFingerprint(),commands:[]};
for(const command of requiredChecks){
 console.log('Checking:',command);const result=spawnSync(command,{shell:true,encoding:'utf8',maxBuffer:8*1024*1024});
 const output=(result.stdout||'')+(result.stderr||'');const summary=output.match(/(?:Tests\s+\d+ passed[^\n]*|\d+ passed \([\d.]+s\)|found 0 vulnerabilities|Build checks passed:[^\n]*)/g)||[];
 proof.commands.push({command,exitCode:result.status??1,summary});
 if(result.status!==0){await writeFile('docs/verification/deployment-tests.json',JSON.stringify(proof,null,2)+'\n');console.error('Check failed:',command);console.error(output.slice(-4500));process.exit(1);}
}
if(await sourceFingerprint()!==proof.sourceFingerprint)throw Error('Source changed during verification; rerun checks.');
await writeFile('docs/verification/deployment-tests.json',JSON.stringify(proof,null,2)+'\n');console.log('Complete required local verification passed for source fingerprint',proof.sourceFingerprint);
