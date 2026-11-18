export const requiredChecks=['npm ci','npm run typecheck','npm test','npm run build','npm run check:build','npm run test:browser -- --workers=1','npm audit --omit=dev'];
function approved(record,origin){return record?.status==='approved'&&record.actor==='owner'&&record.origin===origin&&Number.isFinite(Date.parse(record.approvedAt))&&typeof record.evidence==='string'&&record.evidence.trim().length>15;}
export function releaseGates({build,cloudflare,live,email,approvals,checks,fingerprint,oversized=[],now=Date.now()}){
 const gates=[];const add=(code,message)=>gates.push({code,message});
 const origin=cloudflare?.project?.origin;
 if(oversized.length)add('asset-size','One or more output assets exceed Cloudflare Pages’ 25 MiB limit.');
 if(!cloudflare?.account?.pagesProjectListingSucceeded||!cloudflare.account.verifiedAgainstKailor)add('account','Verified Pages account access is missing.');
 if(!cloudflare?.checkedAt||!Number.isFinite(Date.parse(cloudflare.checkedAt))||now-Date.parse(cloudflare.checkedAt)>86400000||Date.parse(cloudflare.checkedAt)>now+300000)add('cloudflare-evidence','Cloudflare account/project evidence must be current (within 24 hours).');
 const p=cloudflare?.project;
 if(p?.name!=='kanreki-public'||p.sourceProvider!=='github'||p.repository!=='keenosmith-del/kanreki-public'||p.productionBranch!=='main')add('git-project','The independent GitHub-backed Pages project has not been verified.');
 if(p?.buildCommand!=='npm run build'||p.outputDirectory!=='dist'||p.rootDirectory!=='/'||p.nodeVersion!=='24')add('build-configuration','The required Pages build configuration has not been verified.');
 if(!p?.emailjsIdentifiersPresent||!build.contactConfigured)add('emailjs-configuration','The shared EmailJS identifiers must be present at build time.');
 if(!origin||!origin.startsWith('https://')||live?.origin!==origin||live?.httpsVerified!==true)add('https-origin','A real project-owned HTTPS origin has not been verified.');
 if(live?.routesPassed!==true||live?.assetsPassed!==true)add('live-routes','Live routes, security headers and assets have not passed verification.');
 if(!live?.build?.sourceCommit||live.build.sourceCommit!==live.remoteMainCommit||live.build.sourceFingerprint!==fingerprint)add('deployed-source','The live build must match current GitHub main and the locally tested source/assets.');
 if(checks?.sourceFingerprint!==fingerprint||requiredChecks.some(command=>!checks?.commands?.some(result=>result.command===command&&result.exitCode===0)))add('local-checks','The complete required local checks must pass for this exact code/assets.');
 if(email?.origin!==origin||email?.providerStatus!=='OK'||email?.subject!=='kanreki website enquiry'||email?.inbox?.confirmed!==true||email.inbox.actor!=='owner'||!email.inbox.evidence)add('live-email','One successful live-site enquiry and owner inbox confirmation are required.');
 if(!approved(approvals?.providerSecurity,origin))add('provider-security','The owner must approve the production-origin security decision supported by the shared EmailJS account.');
 if(!approved(approvals?.legal,origin))add('legal','Owner/legal review of the public-site legal drafts remains outstanding.');
 if(!build.production||build.origin!==origin||live?.build?.production!==true||live.build.origin!==origin||live?.indexingPassed!==true)add('indexable-production','The final indexable build must be freshly deployed with the verified origin after approvals.');
 return gates;
}
