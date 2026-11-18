// Isolated preview build. Public test identifiers are used only with intercepted HTTP mocks.
import {spawnSync} from 'node:child_process';
Object.assign(process.env,{BROWSER_TEST_BUILD:'true',DEPLOYMENT_ENV:'preview',SITE_URL:'',SITE_ORIGIN_VERIFIED:'false',VITE_EMAILJS_SERVICE_ID:'mock-service',VITE_EMAILJS_TEMPLATE_ID:'mock-template',VITE_EMAILJS_PUBLIC_KEY:'mock-public-key',STATIC_ROOT:'dist-browser-test'});
const build=spawnSync(process.execPath,['--import','tsx','scripts/build.ts'],{stdio:'inherit',env:process.env});
if(build.status!==0)process.exit(build.status??1);
const {createContactReference}=await import(new URL('./create-contact-reference.mjs',import.meta.url).href);
await createContactReference('dist-browser-test');
const {writeFile}=await import('node:fs/promises');
await writeFile('dist-browser-test/webm-playback.html','<!doctype html><html><head><title>Native WebM playback verification</title></head><body><video muted loop playsinline controls style="width:100%"></video></body></html>');
await import(new URL('./serve.mjs',import.meta.url).href);
