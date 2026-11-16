# Cloudflare Pages deployment

Prepared configuration: a separate Pages project connected to `keenosmith-del/kailor-insider-public`. Do not reuse kailor's existing Pages project. No deployment or resource provisioning has been performed.

## Build

| Setting | Value |
| --- | --- |
| Framework | Vite / static frontend |
| Repository root | `/` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node | 24; minimum 22.12 |
| Runtime environment variables | None |

`npm ci` installs the lockfile. The build prerenders eight route documents and the custom 404, generates sitemap.xml from indexable routes, and replaces the JSON-LD CSP hash in emitted `_headers`. Upload the entire `dist` directory if using direct upload. Never upload the source tree or node_modules. No Worker, Pages Function, database or API is needed.

## Preview before public launch

1. Run `npm ci`, `npm test`, `npm run build`, `npm run check:build`, and `npm run test:browser` in an environment with Chromium and loopback access.
2. Review draft privacy, terms and cookie notices with the owner/legal reviewer. Confirm the actual hosting request logs, security cookies, retention and contact handling. Remove review labels and change indexing only once approved, through a separate source change.
3. Authorise and create a separate Pages project. Verify its preview at the Pages-provided address. Preview deployments should be excluded from indexing using Cloudflare deployment settings or access controls. Canonicals intentionally target the final domain.
4. Test direct requests and reloads to all eight routes, unknown URLs, `/api/users`, `/.env`, and `/src/main.tsx`. Unknown/private-looking URLs must return the custom 404 with HTTP 404. Do not add `/* /index.html 200`.
5. Inspect response headers. Confirm CSP, nosniff, Permissions-Policy and Referrer-Policy. Check no CSP errors, missing assets or credential POST requests. HTML revalidates; only fingerprinted `/assets/*` is immutable.
6. Check 1440, 1280, 768, 390 and 320px widths, menu keyboard handling, account switches, short desktop height, mailto fallback and legal links. Test reduced motion and a no-JavaScript load.

## Domain and HTTPS — separate owner authorisation required

1. Attach only `insider.kailor.co.za` to the new Pages project after approval. Use Cloudflare's displayed domain instructions and verify any existing record before changing it.
2. Do not change apex `kailor.co.za`, existing Pages settings, Zoho/mail records, the consultancy backend, or Insider application resources. Do not attach or link the future `app.insider.kailor.co.za` yet.
3. Verify TLS certificate issuance, HTTPS response, redirect behaviour, all route canonicals, favicon and sitemap. Confirm no mixed content.
4. Submit `https://insider.kailor.co.za/sitemap.xml` after owner launch approval. It contains home, About and contact only. Do not promise any particular Google relationship panel.

## Rollback

Record the approved source commit and Pages deployment ID. Roll back to the preceding known-good deployment in the **new Insider public** Pages project if checks fail. Recheck domain, TLS, routes and headers after rollback. Do not change another project's deployment or DNS as part of rollback.

## Future reciprocal relationship link

A future approved change on kailor.co.za could add a natural `kailor insider` link to this site's About page or homepage. It should describe a publishing platform from the same team, without treating the two brands as `sameAs` or asserting subsidiary status. No change has been made to kailor.
