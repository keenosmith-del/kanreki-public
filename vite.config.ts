import { defineConfig } from 'vite';

import {siteConfig} from './config/site.mjs';
const site=siteConfig();
export default defineConfig({
  // Film authoring has its own dependencies; the public app uses one React runtime.
  resolve: { dedupe: ['react', 'react-dom'] },
  optimizeDeps: { entries: ['index.html'] },
  define: { 'import.meta.env.VITE_SITE_ORIGIN': JSON.stringify(site.origin), 'import.meta.env.VITE_IS_PRODUCTION': JSON.stringify(String(site.production)) },
  oxc: { jsx: { runtime: 'automatic' } },
  build: { sourcemap: false, outDir: process.env.BROWSER_TEST_BUILD==='true'?'dist-browser-test':'dist' },
});
