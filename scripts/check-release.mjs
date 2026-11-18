import {readFile} from 'node:fs/promises';
import {auditAssetSizes} from './asset-sizes.mjs';
import {sourceFingerprint} from '../config/source-fingerprint.mjs';
import {releaseGates} from '../config/release.mjs';
import {verifyLive} from './verify-live.mjs';
const readJson=async(path,fallback={})=>{try{return JSON.parse(await readFile(path,'utf8'));}catch(error){if(error.code==='ENOENT')return fallback;throw error;}};
const root=process.env.STATIC_ROOT||'dist';
const build=await readJson(root+'/build-info.json');
const cloudflare=await readJson('docs/verification/deployment.json');
const email=await readJson('docs/verification/emailjs-production.json');
const approvals=await readJson('docs/verification/release-approvals.json');
const checks=await readJson('docs/verification/deployment-tests.json');
let live={};
if(cloudflare.project?.origin){try{live=await verifyLive(cloudflare.project.origin,{mode:build.production?'production':'preview'});}catch(error){console.error('Live verification failed:',error.message);}}
const gates=releaseGates({build,cloudflare,live,email,approvals,checks,fingerprint:await sourceFingerprint(),oversized:(await auditAssetSizes(root)).oversized});
if(gates.length){console.error('Deployment/release gates:\n'+gates.map(gate=>`- [${gate.code}] ${gate.message}`).join('\n'));process.exitCode=1;}else console.log('Production launched and verified: all automated checks and recorded owner approvals pass.');
