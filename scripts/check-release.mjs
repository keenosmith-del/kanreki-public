// Deliberately stricter than structural checks: missing external setup must block launch.
import {readFile} from 'node:fs/promises';
import {auditAssetSizes} from './asset-sizes.mjs';
const root=process.env.STATIC_ROOT||'dist',info=JSON.parse(await readFile(root+'/build-info.json','utf8'));
const blockers=[];
if(!info.production||!info.origin)blockers.push('No verified stable HTTPS production origin has been configured.');
if(!info.contactConfigured)blockers.push('Owner-approved shared EmailJS public identifiers are missing.');
const {oversized}=await auditAssetSizes(root);
for(const file of oversized)blockers.push('Cloudflare Pages asset exceeds 25 MiB: '+file.path);
// External evidence is explicit; a mocked success never satisfies the live-delivery gate.
const delivery=JSON.parse(await readFile('docs/verification/emailjs-verification.json','utf8'));
if(delivery.liveRequest?.status!=='OK'||delivery.liveRequest?.inboxConfirmed!==true)blockers.push('Live EmailJS provider success and owner inbox confirmation are required.');
blockers.push('The production origin must be authorized in the shared EmailJS account; the current Domains controls are locked. Owner configuration/plan decision is required.');
blockers.push('Cloudflare Pages authorization must be refreshed: read-only project listing returned authentication error 10000.');
blockers.push('Legal drafts and actual hosting/provider processing require owner/legal review.');
if(blockers.length){console.error('Release is blocked:\n'+blockers.map(item=>'- '+item).join('\n'));process.exitCode=1;}else console.log('Release checks passed.');
