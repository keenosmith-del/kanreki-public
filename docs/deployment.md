# kanreki Cloudflare Pages deployment

This repository remains the independent static public site. The existing GitHub repository is still `keenosmith-del/kailor-insider-public`; renaming it is a separate owner action. No deployment, repository rename or DNS change has been made.

| Setting | Value |
| --- | --- |
| Framework | Vite / static frontend |
| Repository root | `/` |
| Build command | `npm run build` |
| Output | `dist` |
| Node | 24; minimum 22.12 |
| Build URL | `SITE_URL`, otherwise Cloudflare’s `CF_PAGES_URL` |
| Runtime services | None |

`SITE_URL` is an optional explicit deployed HTTPS origin. `CF_PAGES_URL` automatically uses the current Pages deployment hostname when available; leave `SITE_URL` unset for per-deployment canonicals. Both reject paths, queries, fragments and credentials. If neither is supplied, the build omits canonical and Open Graph URL tags rather than inventing a live hostname. The same origin is compiled into client routing metadata and prerendered HTML/JSON-LD.

All routes stay `noindex, follow` in HTML and `X-Robots-Tag`. robots.txt permits crawling so engines can see noindex; no sitemap is advertised, and sitemap.xml intentionally contains zero URLs. Setting a hostname never enables indexing. Removing indexing restrictions requires a separate reviewed source change when the final domain strategy is ready.

## Independent preview after separate deployment authorisation

1. Run `npm ci`, `npm run typecheck`, `npm test`, `npm run build`, `npm run check:build` and `npm run test:browser`. Browser checks require Chromium and permission to open a loopback port.
2. Use a separate Pages project; do not reuse kailor’s project or the publishing application’s project. Upload only `dist` for direct uploads.
3. Verify all eight routes, direct refreshes, the custom HTTP 404, `/url-icon.png`, response headers and noindex. There is no API or authentication service. Never add a catch-all SPA rewrite.
4. Inspect desktop/mobile screenshots, keyboard navigation, disabled forms, console errors and reduced motion. Review legal drafts and actual hosting behaviour before launch.

## Future domains

`https://kanreki.co.za` is planned but is not owned or connected. `https://app.kanreki.co.za` is the intended application address and is likewise unconnected. Do not attach either, create DNS records, publish live application links or enable indexing as part of this rebrand. No changes to kailor.co.za, mail records or either other repository are authorised.

When separately authorised and actually connected, set `SITE_URL` to the verified public origin and review canonical tags, structured data, redirects and sitemap/indexing policy. The application remains separately deployed; public account forms stay disabled until it is ready.

For rollback, record the approved source commit and deployment ID and restore only this public site’s previous deployment. Never change another project or DNS as part of rollback.
