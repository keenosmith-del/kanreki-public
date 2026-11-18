# kanreki | final corrections and deployment readiness | 18 November 2026

Completed locally in `/Users/keenosmith/Programming/kanreki-public`, preserving the pre-existing uncommitted predeployment work. Branch remains `main` at `3b5d0fb63f9e535eca7f5c635f37ea7c9603da35`. Nothing was staged, committed, pushed, merged or deployed. No kailor source, account configuration, template, subscription, DNS or deployment was changed.

Local website: **http://127.0.0.1:4175/**. Contact: **http://127.0.0.1:4175/contact**. Moving delivery comparison: **http://127.0.0.1:4176/** (select a film, then play both; pause, scrub and native looping are available).

## Corrected contact modal | production comparison

The exact `SurfaceDialog.css` and `ConversationModal.css` declarations were reused from kailor. The missing parts were the *actual global cascade*: kailor's final `outline: none !important` for form focus, its inherited 1.5 line height, zero-width solid preflight borders, and the global pill-button override affecting the close button. Kanreki now retains the same pale focus background and **one-pixel shadow**, without the additional visible outline. Keyboard indicators on buttons remain intact. Initial focus matches kailor's close control, and the added exit animation and extra modal paragraphs were removed. The close/send SVG strokes, round caps and geometry also match the reference. The kanreki enquiry wording remains appropriate to this publication.

The live production modal at `https://kailor.co.za/?enquiry=contact` was compared with the actual local kanreki modal at identical **1440, 768, 390 and 320 px × 900 px** viewports. Initial, name-focus, email-focus, textarea-focus and validation states were captured on both sites. **No computed-style differences remain across the captured selectors/properties/states.** This includes input dimensions, outlines/shadows, colours, spacing, typography, buttons and surface geometry. Pointer focus was compared directly; keyboard focus is covered by the production-reference regression tests. Viewport dimensions were checked from each actual page.

Evidence under `docs/verification/contact-match/`:

- `computed-styles.json` and `style-differences.json` (empty differences).
- Actual `kailor-*` and `kanreki-*` screenshots at all four widths and five states.
- `comparison-1440-name.png` and the other 19 side-by-side comparisons, composed from those unchanged screenshots. Cropping only removes equal surrounding page margins; the modal pixels are not retouched.
- `kanreki-sending.png` and `kailor-source-sending.png`. Sending uses a test-only reference fixture with the exact copied source CSS and disabled controls, plus a deliberately pending mocked request in kanreki. No real email is sent by these tests.
- Twenty committed Playwright modal snapshots under `tests/browser/contact-visual.spec.ts-snapshots/` protect the corrected initial/focus/validation appearance. Relevant reference CSS is cached in `tests/fixtures/kailor-contact/` with source hashes, so browser tests do not require another repository.

Focus trapping/restoration, Escape, backdrop/close/cancel dismissal, scroll locking, reduced motion, field validation, duplicate prevention, loading, failure feedback and the success toast remain covered. All contact actions open the same dialog; `/contact` remains useful on direct navigation. No personal recipient address is embedded in public content.

## Shared EmailJS | real delivery completed

The owner-approved existing kailor **service, template, public key and fixed recipient** are reused. Only the three intentionally browser-public values were copied privately into ignored `.env.local`; no values are recorded in source, documentation, screenshots or test fixtures. Their variable names are `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. No private API secret was imported, and no `.env` file is staged.

Signed-in inspection verified the existing template:

- Subject: `Portfolio Contact — {{subject}}`; kanreki passes **`kanreki website enquiry`**.
- Fixed existing recipient; address omitted here and from the public site.
- Reply-To: `{{reply_to}}`.
- Body uses `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`.
- Sender label and some body wording are statically branded for kailor/portfolio contact.

Kanreki retains kailor's original five API parameters (`from_name`, `reply_to`, `form_type`, `subject`, `message`) and adds **`name` and `email` aliases**, because the actual shared template requires them. This avoids blank name/email fields without editing the shared template or changing kailor's caller. Tests verify all seven names and the exact kanreki subject.

**One actual live provider request succeeded.** EmailJS history shows **OK**, Zoho, **18:38:42 SAST on 18 November 2026**, 1.328 s processing, the local kanreki referrer, expected subject and all seven parameters. The owner confirmed inbox receipt in this chat. The initial pre-send check encountered the old local server's cached `connect-src 'none'`; it made no provider request. Restarting the static server loaded the newly generated, narrowly scoped EmailJS CSP before the one successful send. No second email was sent. Missing configuration and genuine provider failures continue to show honest errors.

Safe evidence is in `docs/verification/emailjs-verification.json`; it omits recipient, keys, request identifiers and IP information. Privacy copy now also describes the browser/device, IP-related, country and referring-page metadata actually visible in the provider history.

The shared template was **not modified**. The smallest optional branding change is neutral shared sender/body wording while retaining the dynamic subject and fixed recipient. That would affect kailor too and requires owner approval; no second template is needed.

## Cloudflare-compatible WebM delivery | size blocker resolved

Only the three explicitly authorized WebM delivery encodes changed. **Every MP4, poster, Remotion composition, approved frame sequence, timing, camera move, colours and media mapping is preserved.** Original oversized WebMs are retained separately under `media-originals/webm-2026-11-18/`, outside `public/` and the deployment build.

| Delivery | Original MiB | Optimized MiB | Duration | Frames | Mean SSIM |
| --- | ---: | ---: | ---: | ---: | ---: |
| `kanreki-drafting.webm` | 30.74 | 20.51 | 46 s | 2,760 | 0.997625 |
| `kanreki-search.webm` | 28.57 | 19.72 | 36 s | 2,160 | 0.996449 |
| `kanreki-profiles-r03.webm` | 26.52 | 20.28 | 38 s | 2,280 | 0.996465 |

All are **VP9, 1920 × 1080, 60 fps, silent**. Every original/delivery presentation timestamp matches, frame counts and durations match exactly, complete decoding passes, and the full-frame black-frame checks found no inserted black frames. Per-frame SSIM compares the entire decoded sequence, not just selected stills. First/last and representative frames were exported. Real side-by-side browser playback and native loop transitions were reviewed; the delivery preserves the approved loop rather than adding a new transition. No external media host was introduced.

Reproduce with `python3 scripts/optimize-webm.py`; validate with `python3 scripts/validate-webm.py`. The final encoder is a bounded two-thread VP9 constrained-bitrate/quality workflow. An earlier heavier parallel attempt was stopped and its incomplete files were never activated. Only completed, validated deliveries were copied to `public/media/`.

Detailed metadata, original/optimized hashes and validation results: `docs/verification/webm-deliveries.json`. Full decode/SSIM logs, per-frame measurements and representative original/optimized PNGs: `docs/verification/webm/`. The initial approved inventory stays unchanged at `docs/verification/approved-film-hashes.json`; build checks permit only the three explicitly recorded delivery substitutions and verify the retained originals against that inventory.

Both `check:build` and `check:release` now **fail** if *any* output file exceeds Pages' 25 MiB limit. The final recursive output audit covers **43 files**, all passing; the largest is the unchanged `media/kanreki-community.webm` at **21.30 MiB**. Exact bytes for every file are recorded in `docs/verification/production-asset-sizes.json`. A negative test verifies nested/unrelated oversized files are rejected and an exactly-at-limit asset is accepted.

## Website, metadata and security verification

The previous iteration's approved homepage layout, six sections, account-access lifecycle, LinkedIn URL, public wording, independent About positioning, official social preview and restricted account forms are retained. All eight routes plus the genuine HTTP 404 remain covered. Titles, OG and Twitter titles use `|`. No kailor LinkedIn destination, numeric/admin company URL or personal email link is served.

Preview builds remain noindex, with no invented canonical origin and an empty sitemap. An isolated production-mode build using reserved `https://example.test` as a **local test fixture only** verifies exactly three indexable sitemap routes (`/`, `/about`, `/contact`) and matching canonicals, OG URLs, robots metadata and response headers. Accounts/legal drafts remain noindex; unknown routes remain HTTP 404. The retained website build is the safe preview configuration. No unpurchased custom domain or per-commit canonical hostname is used.

CSP allows only `https://api.emailjs.com` for the configured contact integration. JSON-LD hashes, security headers, source-map exclusion, external-link safety, asset caching and image dimensions pass the output audit. The modal reference fixtures exist only in the ignored browser-test output, never in normal `dist/`. No new tracking, account backend or persistent browser storage was added.

## Commands actually executed | final results

| Command/check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm test` | **107 passed**, 17 files |
| `npm run build` | Passed; eight static routes plus custom 404 |
| `npm run check:build` | Passed; full asset-size audit and media preservation checks included |
| `npm run test:browser -- --workers=1` | **32 passed**, including visual regressions, actual hero loop/CTA lifecycle and complete native WebM playback/loop checks for all three deliveries |
| Production-mode build and output audit | Passed; verified-origin policy exercised with reserved local fixture |
| `npm run check:release` | Fails **only** for the external gates below; live local delivery and asset sizes pass |
| Full WebM validation | All three decode completely; codec/resolution/fps/duration/frame count/timestamps/black-frame/SSIM checks pass |
| `npm audit --omit=dev` | Zero known production vulnerabilities |
| Full dependency audit / compatible patch inspection | Same five development-only reports stemming from picomatch; current latest is 4.0.7 and no compatible patched release is available. No forced major upgrade/downgrade applied |
| `git diff --check` | Passed |

The new visual test initially exposed a non-unique label selector and a reference entrance-animation timing issue; both test defects were corrected. The output-size test's dynamic module import was changed to a normal typed import for the jsdom test environment. Final results above are from passing runs after those corrections. React Router's existing non-fatal `use client` bundler warning remains.

## Exact external release gates

1. **Cloudflare authorization:** read-only Wrangler inspection found an OAuth session, but Pages project listing failed with authentication error **10000** and a missing-scope warning. Refresh authorization with Pages permissions in the intended account before authorized project creation/deployment. No project/hostname can be conclusively verified through that failed listing.
2. **Real production origin:** after an authorized independent noindex Pages deployment exists, verify its actual stable HTTPS hostname and set `SITE_URL`, `SITE_ORIGIN_VERIFIED=true`, and `DEPLOYMENT_ENV=production` for the production environment. Never use a per-commit preview or invent a hostname.
3. **Shared provider origin controls:** the signed-in Domains panel displayed no configured origins and locked input/save controls under the current plan. The owner must authorize the appropriate account-plan/configuration decision. Once supported, retain `https://kailor.co.za` and add the verified kanreki origin plus only approved local test origins. No restriction was removed, setting saved, subscription changed or CAPTCHA/private-key requirement altered.
4. **Owner/legal review:** the visible legal-review notice and noindex policy remain. Confirm the legal drafts and actual provider/hosting processing before public launch.

Optional template branding is documented above for owner review; it does not prevent the verified shared delivery. Local EmailJS configuration, template-variable compatibility, actual inbox delivery, modal fidelity and oversized delivery assets are resolved.

`wrangler.jsonc` prepares only project name `kanreki-public` and output `dist`. Repository `keenosmith-del/kanreki-public`, branch `main`, root `/`, build `npm run build`, output `dist`, Node 24 are documented in `docs/deployment.md`. No push, deployment, domain purchase or existing external account change was performed.

## Modified-file groups

- Contact components/CSS, shared EmailJS service, `.env.example`, privacy disclosure and associated unit/browser/visual tests.
- `scripts/asset-sizes.mjs`/declaration, strict build/release checks, delivery encode/validation/review scripts, comparison generator and test-only source-reference fixture generator.
- The three delivery WebMs plus their separately retained originals; no other cinematic media or film source changes.
- `wrangler.jsonc`, README, deployment/verification documentation and safe audit/evidence artifacts.
- All previous predeployment edits remain present. No existing work was reset, cleaned or stashed, and `.env.local` remains ignored.
