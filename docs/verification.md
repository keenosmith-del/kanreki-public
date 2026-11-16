# kanreki rebrand verification — 16 November 2026

| Command / check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm test` | Passed: 21 tests |
| `npm run build` | Passed: eight static routes plus custom 404 |
| `npm run check:build` | Passed: six sections/slots, brand, icon bytes, metadata, empty sitemap, publisher/year, CSP and private/stale-reference scan |
| `CF_PAGES_URL=https://kanreki-preview-check.pages.dev npm run build` and matching build audit | Passed; test hostname only, no deployment or DNS action |
| `npm run test:browser` | Blocked before browser tests: sandbox `listen EPERM: operation not permitted 127.0.0.1:4173` |
| Supplied icon | Exact original copied; production bytes match public asset; PNG declaration and MIME type configured |
| Reference source | Read-only inspection of neighbouring kailor public wordmark/navigation styles |

A pre-existing React Router module-level `use client` bundler warning remains non-fatal. No browser screenshots or rendered visual/console results are claimed. Browser tests cover 1440, 1280, 768, 390 and 320px layouts, disabled account forms, menus/focus, route refreshes, noindex, optional canonicals, PNG response, storage, 404s and reduced motion. A short 1280 × 650 account layout is also covered.

Run `npm run build`, `npm run check:build` and `npm run test:browser` in a normal terminal with loopback access and Chromium installed (`npx playwright install chromium` if needed). Inspect the screenshots written under docs/verification before calling mobile/desktop layout and console behaviour verified. These QA captures are separate from future platform-media assets.

With no configured deployment origin, no canonical or Open Graph URL is emitted. SITE_URL or CF_PAGES_URL configures the actual deployment origin without enabling indexing. All routes stay noindex and the sitemap stays empty. The future domains are not configured or presumed live. No deployment, DNS, commit or push was performed.
