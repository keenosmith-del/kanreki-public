# kanreki — public website

Independent React + TypeScript + Vite static frontend for kanreki, established in 2020. No database, API, live authentication, analytics or embedded third-party services. The publication application is separate and public access remains restricted.

Use Node 24 (minimum 22.12). From this repository:

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run check:build
npx playwright install chromium
npm run test:browser
```

Production output: `dist/`. For a production-like local preview with correct static 404 status and CSP:

```sh
node scripts/serve.mjs
```

Open `http://127.0.0.1:4173`. Vite's development server is for development; the production-like server and browser tests exercise prerendered output. `npm run preview` provides the usual Vite preview but does not model Cloudflare 404 status handling.

## Structure

- `src/components/`: shared wordmark, accessible header/footer and future media lifecycle.
- `src/pages/`: six-section homepage, restricted account screens, About/contact and review-pending legal pages.
- `src/styles/`: public navigation and auth geometry adapted from current kailor; publication layouts and tokens.
- `src/media.ts`: six asset-free slots; no nonexistent asset requests.
- `src/seo.ts`: canonical metadata and real publisher relationship.
- `scripts/build.ts`: Vite build, route prerendering, CSP hash and sitemap generation.
- `public/`: exact supplied `url-icon.png`, licensed Inter font, robots and security/cache headers.
- `tests/`: route/navigation/restriction/media tests and responsive production browser checks.
- `docs/`: source comparison, feature evidence, deferred media and deployment runbook.

Direct requests receive meaningful HTML without JavaScript. The build emits `/`, `/about`, `/contact`, `/sign-in`, `/create-account`, `/privacy`, `/terms`, `/cookies` and `404.html`. Cloudflare Pages uses the top-level `404.html` for unknown URLs; do not add a catch-all SPA rewrite. There is no `/api` service.

All routes are `noindex, follow` in HTML and response headers. The sitemap intentionally contains no URLs. Set build-time `SITE_URL` to the actual deployed HTTPS origin, or let Cloudflare’s `CF_PAGES_URL` supply the deployment hostname. Without either value, canonical and Open Graph URL tags are omitted. The planned `https://kanreki.co.za` and `https://app.kanreki.co.za` domains are not connected or linked as live services. Indexing requires a separate reviewed source change.

See [deployment](docs/deployment.md), [reference audit](docs/reference-audit.md), [media manifest](docs/media.md) and [verification](docs/verification.md). No hosting resources, DNS, existing kailor website or kanreki application are changed by this implementation.
