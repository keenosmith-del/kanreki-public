import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser', fullyParallel:true,
  use:{baseURL:'http://127.0.0.1:4173', browserName:'chromium'},
  webServer:{command:'node --import tsx scripts/browser-server.ts',url:'http://127.0.0.1:4173',reuseExistingServer:false,timeout:120000},
  reporter:'list',
});
