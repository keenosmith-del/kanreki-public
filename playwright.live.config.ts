import {defineConfig} from '@playwright/test';
const origin=process.env.KANREKI_LIVE_URL;
if(!origin||new URL(origin).protocol!=='https:')throw Error('KANREKI_LIVE_URL must be the actual verified HTTPS deployment origin.');
export default defineConfig({testDir:'./tests',testMatch:['browser/site.spec.ts','browser/hero.spec.ts','live/*.spec.ts'],workers:1,timeout:60000,expect:{timeout:15000},use:{baseURL:origin,browserName:'chromium'},reporter:'list'});
