# kanreki | independent Cloudflare Pages deployment

Repository: `keenosmith-del/kanreki-public`. No Pages project, deployment, DNS record or domain has been created in this iteration. The actual stable Pages hostname is **not yet known**. `kanreki.co.za` is not purchased and must not be used in configuration or redirects yet.

## Project settings after owner authorization

| Setting | Value |
| --- | --- |
| Independent project (recommended name, not an asserted hostname) | `kanreki-public` |
| GitHub repository | `keenosmith-del/kanreki-public` |
| Production branch | `main` |
| Framework | Vite / static frontend |
| Repository root | `/` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | `24` (`.node-version` and `NODE_VERSION=24`) |

These settings follow [Cloudflare's Vite build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) and [build-image configuration](https://developers.cloudflare.com/pages/configuration/build-image/). Use a new kanreki project only. Do not modify kailor's Pages project, domains, environment, mail records or the future kanreki application.

## Deployment origin and indexing

The safe default is `DEPLOYMENT_ENV=preview`, empty `SITE_URL`, `SITE_ORIGIN_VERIFIED=false`. Every preview HTML page and response is noindex; the sitemap is empty and robots.txt does not advertise one. Crawling is allowed so engines can read noindex. There is no SPA catch-all rewrite: a top-level `404.html` preserves Cloudflare's HTTP 404 handling.

After separate deployment authorization, first create and inspect a noindex preview, obtain the actual **stable project** HTTPS hostname and confirm that it belongs to this project and serves successfully. Then set production-only environment variables:

- `DEPLOYMENT_ENV=production`
- `SITE_URL=` the actual verified stable HTTPS origin, without path, credentials, query or fragment
- `SITE_ORIGIN_VERIFIED=true`
- `NODE_VERSION=24`

The build refuses production mode without an explicitly verified origin. It never uses `CF_PAGES_URL` as a canonical fallback. A Cloudflare branch deployment (`CF_PAGES=1` and `CF_PAGES_BRANCH` other than `main`) forces preview mode even if production flags were inherited. Keep preview environment settings separate. See [Cloudflare preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

Production HTML, generated response headers, client navigation and sitemap share one policy:

| Routes | Robots | Sitemap |
| --- | --- | --- |
| `/`, `/about`, `/contact` | `index, follow` | Included, absolute stable origin |
| `/sign-in`, `/create-account` | `noindex, follow` | Excluded |
| `/privacy`, `/terms`, `/cookies` | `noindex, follow` pending legal review | Excluded |
| Unknown URLs | HTTP 404, HTML `noindex` | Excluded |

The build adds exact route, trailing-slash and `index.html` header rules. Unknown paths receive the custom 404's noindex HTML. There is no global production noindex header. robots.txt advertises only the production sitemap. Titles, canonicals, OG URLs and image URLs use the same origin at build time and after client navigation. A reserved `example.test` origin may be used in local configuration tests only; it is never a deployment address.

## Owner-approved shared EmailJS delivery

Use the **existing kailor service, template, public key and fixed recipient**. Do not create another account, service or template. The recipient stays private in EmailJS and is never a browser parameter. Set the same three intentionally browser-public identifiers in this independent Pages project's environment:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Copy their existing values privately from the authorized local kailor configuration or provider account. Do not put values in documentation, commits, screenshots or logs; do not commit `.env.local`. No private API key is required or imported. The client sends `from_name`, `reply_to`, `form_type`, `subject`, `message` and the dashboard-verified legacy body aliases `name`, `email`. The subject parameter is exactly `kanreki website enquiry`.

The actual shared template was inspected while signed in. It has a fixed recipient, Reply-To `{{reply_to}}`, subject `Portfolio Contact — {{subject}}`, body `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`, and static sender label `kailor website`. These settings remain unchanged. The optional smallest branding refinement would use neutral shared sender/body wording while retaining the dynamic subject and fixed recipient; it requires explicit owner approval because it affects kailor's emails too. Do not add a second template as a workaround.

**Live delivery is verified locally:** one request from `http://127.0.0.1:4175/` was marked OK by EmailJS/Zoho at 18:38:42 SAST on 18 November 2026; history confirmed all seven parameter names and the kanreki subject. The owner confirmed inbox receipt. No message content, recipient address, request IP, service identifier or key is stored in the verification report. Browser tests always intercept their requests and send no real mail.

The current account's Domains panel has no configured origins displayed and its input/save controls are locked. Origin allowlisting is an account-plan/configuration decision; see [EmailJS allowlist documentation](https://www.emailjs.com/docs/faq/can-i-add-my-domain-to-allowlist/) and [plan capabilities](https://www.emailjs.com/pricing/). No settings, subscription or existing access were changed. After the actual kanreki production hostname exists and the owner authorizes the account change, retain `https://kailor.co.za` and add the verified stable kanreki origin plus only explicitly approved test origins. Do not revoke kailor, enable wildcard origins or change API/private-key requirements. Do not enable CAPTCHA on the shared template without updating and authorizing both callers.

Input limits, honeypot, pending guard and an in-memory cooldown remain active; these supplement provider rate/quota controls and do not replace provider-side origin restrictions. The browser CSP permits only `https://api.emailjs.com` for contact connections when configuration exists. Success requires a genuine 2xx receipt. Missing configuration or a failed request retains honest failure feedback. Restart the local static server after rebuilding configuration, because it loads the generated response headers at startup.

## Security, content and release checklist

- Run `npm ci`, `npm run typecheck`, `npm test`, `npm run build`, `npm run check:build`, `npm run test:browser` against the final reviewed source. Browser tests build an isolated preview with fake public identifiers and intercepted HTTP responses; no live email is sent.
- Inspect the deployment's actual CSP, route-specific robots, `nosniff`, referrer and permissions headers. The generated JSON-LD hash is included in CSP; inline application scripts, arbitrary connections, form actions, framing and objects remain blocked. Styles retain the existing inline-style allowance used by the media layout. See [Cloudflare headers](https://developers.cloudflare.com/pages/configuration/headers/).
- No source maps or private credentials are published. Hashed application assets cache immutably; stable film filenames revalidate after one hour. Both validation commands recursively audit **every** output file and fail above Pages' [25 MiB asset limit](https://developers.cloudflare.com/pages/platform/limits/). The three authorized optimized VP9 deliveries are 20.51, 19.72 and 20.28 MiB, with the exact original frame/timestamp sequences. Originals are retained outside `public/`; they must not be included in the Pages upload. All MP4s, posters and film source remain unchanged.
- Verify direct routes, true unknown-route 404 responses, keyboard/focus behavior, mobile navigation, poster fallbacks, native loop/hero CTA lifecycle and no console errors. Check 1440, 1280, 768, 390 and 320 px widths.
- The owner-confirmed public LinkedIn URL is `https://www.linkedin.com/company/kanreki-publishing/`. It is used by header, mobile navigation, footer and kanreki structured data. No admin or numeric-ID destination is published.
- Privacy, terms and cookies are working drafts and visibly retain their legal-review notice. Confirm responsible entity, retention, international processing, actual hosting/provider behavior and any legal requirements with the owner/legal reviewer. They are not represented as approved legal advice or final terms.
- Public account access remains disabled. Do not add an authentication service, database, tracking or advertising as part of deployment.
- Recheck dependency audit before launch. Do not force a toolchain downgrade to silence a transitive development-only advisory.

Run `npm run check:release` to list the unresolved launch gates; it deliberately fails until the external verification requirements are resolved and the gate updated with recorded evidence. Structural `check:build` now fails for any oversized output asset.

Release gates now concern actual external authorization: a stable project hostname and HTTPS verification, refreshed Cloudflare Pages authorization, the shared provider's production-origin controls and legal review. Shared local EmailJS delivery and static-asset sizes are resolved.

Read-only CLI inspection found an OAuth session, but `wrangler pages project list` failed with Cloudflare authentication error **10000** and a missing-scope warning. The owner must refresh Wrangler authorization with Pages access in the intended account before authorized project creation/deployment. No account/token identifiers are recorded. `wrangler.jsonc` names only `kanreki-public` and `dist`; it cannot change kailor's project unless an operator deliberately runs elsewhere. No deployment command was run.


## Later domain migration | separate authorization

1. Purchase `kanreki.co.za`.
2. Add it to the correct Cloudflare account.
3. Configure DNS and this Pages project's custom domain.
4. Verify HTTPS and successful site delivery.
5. Set `SITE_URL` to the verified purchased-domain origin and retain production verification flags.
6. Rebuild metadata, sitemap and structured data; update EmailJS origin restrictions.
7. Only after the domain works, redirect the original production Pages hostname to the final domain, preserving paths.
8. Validate redirects, canonical URLs and search indexing; submit the final sitemap in Search Console.

Do not configure redirects before the purchased domain is connected and serving. Roll back only this independent public-site deployment using its recorded deployment ID and source commit; never change kailor or the publishing application.
