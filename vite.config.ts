import { defineConfig } from 'vite';

const configuredUrl = process.env.SITE_URL || process.env.CF_PAGES_URL;
let origin = '';
if (configuredUrl) {
  const url = new URL(configuredUrl);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL / CF_PAGES_URL must be an HTTPS origin without a path, credentials, query or fragment.');
  }
  origin = url.origin;
}
export default defineConfig({
  define: { 'import.meta.env.VITE_SITE_ORIGIN': JSON.stringify(origin) },
  oxc: { jsx: { runtime: 'automatic' } },
  build: { sourcemap: false },
});
