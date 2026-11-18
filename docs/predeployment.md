## Final Google verification result

Google’s own live inspection successfully fetched https://kanreki-public.pages.dev/sitemap.xml at **23:18:43 SAST on 18 November 2026**. Crawl allowed: Yes; Page fetch: Successful; the tested SOURCE panel displays the exact XML containing the three intended URLs. Screenshots preserve both the successful fetch and fetched source. All three discovery pages also passed Google live eligibility tests. The separate Sitemaps report still shows **Couldn’t fetch / Unknown / 0 discovered pages** after one resubmission; that reporting/processing state is unresolved despite verified retrieval. No further speculative sitemap changes or repeated submissions were made. Manual homepage indexing request returned daily quota exceeded; no accepted manual request or actual indexing is claimed. There are no remaining owner publication or provider-risk approvals pending. Technical production release checks pass; outstanding Google processing and quotas are recorded transparently.

# Production launched and verified | 18 November 2026

**Live indexable website: https://kanreki-public.pages.dev/**. Functional deployment `91ea58017225a429f8567c3a34bfbab31d211222` succeeded through the independent GitHub-connected Pages project. Production build output identifies branch main, verified HTTPS origin, configured EmailJS delivery and the same tested source fingerprint. A final documentation-only deployment may follow without changing that source/assets fingerprint; the live build-info.json identifies its exact commit.

## Published disclosures and owner decisions

Privacy, terms and cookies are published with **effective date 18 November 2026** and no draft notice. The owner confirmed personal operation by Keeno Smith, no separate legal entity or dedicated business/postal address, and newly adopted manual enquiry retention: 12 months after last relevant correspondence, quarterly review and mailbox deletion when no longer required, subject to applicable obligations. No automatic deletion or historical practice is claimed. The owner separately accepted the unchanged shared EmailJS setup without domain allowlisting and its abuse/quota risk. Provider settings, recipient, template and kailor services were not modified.

POPIA section 18(1)(b) calls for responsible-party name and address. No dedicated public service address exists and residential disclosure was expressly prohibited. This remains a documented disclosure limitation, not certification of full compliance or an additional technical deployment gate. Publication was authorized by the owner; no independent legal review is claimed. Previous gates came from the earlier brief’s explicit release conditions, not Cloudflare or Google technical requirements. The owner’s later factual confirmations and explicit publication/risk decisions satisfy those recorded gates consistently within this website’s scope.

## Verified production behaviour

Home, About and Contact serve index/follow in both HTML and Cloudflare headers, one exact HTTPS canonical each and consistent Open Graph/Twitter metadata. Legal and account pages remain noindex by indexing policy. The live sitemap returns HTTP 200, parses as XML and contains exactly the three approved discovery URLs; robots.txt advertises it. CSP, nosniff, referrer policy, permissions policy and caching remain present; unknown routes return HTTP 404. The prior Wrangler build-variable conflict was corrected using source-controlled non-sensitive production variables with explicit safe preview overrides. Secrets remain in project settings.

All required local commands passed: npm ci, typecheck, **122 unit tests**, build, build verification, browser tests with one worker and production dependency audit (**zero vulnerabilities**). **16 live production browser tests passed** at 1440, 1280, 768, 390 and 320 px. An additional actual moving-playback audit verified advancing currentTime for every film and finalized legal pages without overflow at all five widths. All six films, approved MP4s, posters and Remotion sources are unchanged. Every build asset meets the Pages size limit. **npm run check:release passed** against the live indexable deployment and real recorded owner approvals.

Production enquiry delivery previously succeeded at this exact live origin, with owner inbox receipt confirmed on the same date; the enquiry code, shared identifiers, fixed recipient and CSP connection permission remain intact. No unnecessary second test email was sent during this iteration.

## Google Search Console

URL-prefix ownership is verified using Google’s issued HTML file, which remains deployed. Google’s own live tests for **home, About and Contact** each report **URL is available to Google / Page can be indexed**. The sitemap submission was accepted, but Google initially reported **Couldn’t fetch** despite valid HTTP 200 XML; one resubmission was requested after successful page live tests. Manual homepage indexing request was blocked by **daily quota exceeded**, so no accepted manual indexing request is claimed. Initial inspections showed all three URLs unknown/not indexed. Submission, eligibility and actual indexing are distinct. See docs/verification/launch/search-console.json and screenshots for the final observed processing status.

No owner publication/security approvals remain pending. Google processing and request quotas are external outcomes; the site stays indexable. Sitemap retrieval must not be reported as successful unless its actual Search Console status changes. Earlier records below are preserved history.

---

## Production build configuration correction

The first authorized production build still generated preview HTML. Its actual Cloudflare build log reported no build variables loaded from the existing Wrangler file, even though the project API stored production values. Because Pages treats that file as its configuration source, the verified non-sensitive origin/indexing settings now live in wrangler.jsonc, with explicit safe preview overrides. EmailJS identifiers remain private project settings, absent from the repository. The build records its actual CF_PAGES_BRANCH for diagnosis. Production and preview configuration are covered by a regression test; no branch-preview guard was removed. A fresh GitHub deployment and live verification follow this correction.

# Authorized production launch | 18 November 2026

The owner confirmed personal-capacity operation by Keeno Smith, no separately registered entity or dedicated business/postal address, and a newly adopted manual enquiry retention policy: 12 months after the last relevant correspondence, quarterly review and deletion from the shared mailbox when no longer required, subject to legal obligations. The owner explicitly accepted the residual abuse/quota risk of shared EmailJS identifiers without domain allowlisting and instructed publication and production indexing. The legal pages now carry an effective date of 18 November 2026 and no draft banner. No automated deletion, company registration, corporate address or independent legal review is claimed.

POPIA section 18(1)(b) calls for the responsible party’s name and address. The absence of a dedicated public service address remains documented; no residential address was published. Following the owner’s explicit direction, this is a disclosure limitation rather than an additional technical deployment gate. It is not represented as complete legal compliance. The contact form remains the privacy-request route.

The production environment has been configured for the verified origin, preserving the shared EmailJS identifiers and preview-branch noindex settings. A fresh GitHub build will activate index/follow only for home, About and Contact. Legal and restricted account routes remain noindex. Google URL-prefix ownership is already verified; sitemap submission and indexing requests follow live indexability verification. Actual deployment/test/Search Console outcomes are recorded under docs/verification/launch/.

All six films, homepage layouts, contact modal, account restrictions and kailor resources remain unchanged. Earlier stages below are historical records, not current approval status.

---

# Search Console and legal-publication review | 18 November 2026

Google verified the URL-prefix property **https://kanreki-public.pages.dev/** using its issued HTML file, now preserved under public/. Cloudflare redirects the .html path to the same-origin extensionless resource; its exact content returns HTTP 200 and Google accepted the verification. The property overview is processing data. **No sitemap was submitted and no indexing was requested**, because the actual site remains noindex while material owner decisions are pending.

The legal disclosures were expanded from verified implementation and provider documentation, retaining their draft notice. A fresh live browser storage audit found no cookies, localStorage or sessionStorage across home, legal and contact routes, including an unsent enquiry. Conditional Cloudflare challenge/security cookies are described separately; no optional tracking or cookie banner was added. Contact copy now states actual configured delivery rather than suggesting that delivery is unconfigured.

Owner confirmation remains necessary for the responsible operator name and public service/postal address, the actual mailbox retention/deletion practice and relevant international-processing details. No registered business, address, fixed retention duration, Information Officer or lawyer review was invented. The owner was separately presented with the precise risk of public EmailJS identifiers without a domain allowlist: direct reuse can consume the shared quota or cause spam despite client-side controls and site CSP. No provider-risk acceptance has been fabricated. Current provider controls remain unchanged (3/200 requests used, locked Domains Save, no listed origins, non-browser API disabled).

All seven required local commands passed for the current source fingerprint: npm ci, typecheck, 118 unit tests, build, build verification, browser tests with one worker and production audit (zero vulnerabilities). Preview and production live-browser assertions are now supported without weakening route/canonical expectations. The full release checker must still remain gated until real approvals and the fresh indexable deployment exist. See docs/verification/launch/ for actual storage, provider and Google verification evidence and the concrete legal review text.

The existing live noindex configuration and all six films are preserved. Legal finalization, the effective publication date, production sitemap submission and indexing requests follow the outstanding owner facts and decision. This is not a declaration of legal compliance or Google indexing.

---

# Deployment status | 18 November 2026

**Deployment live, release gated:** [https://kanreki-public.pages.dev/](https://kanreki-public.pages.dev/).

Cloudflare OAuth access was refreshed through its official authorization flow. The account was verified against the existing kailor zone and Pages project before creating the independent **GitHub-backed** `kanreki-public` project. GitHub pushes to `keenosmith-del/kanreki-public`, branch `main`, trigger builds automatically. Build: `npm run build`; output: `dist`; root: `/`; Node: **24**. No Direct Upload project, custom domain or DNS change was made. A before/after configuration digest confirms the existing kailor Pages configuration was unchanged.

The first deployment served approved commit `16177fd83fe8df79fa31a34a842ef9abe46f2cc6`. Subsequent deployment corrections bind `build-info.json` to the Git commit and a hash of the tested source/assets. A duplicate global preview-header rule was corrected after actual Cloudflare responses revealed that it suppressed the CSP and Permissions-Policy. Live responses now retain both headers. Asset verification measures full downloaded bytes when Cloudflare omits Content-Length rather than assuming missing headers mean empty assets.

Production project settings contain the verified `SITE_URL=https://kanreki-public.pages.dev` and `SITE_ORIGIN_VERIFIED=true`. **DEPLOYMENT_ENV remains preview intentionally** until owner/legal and provider-security decisions are recorded. Preview branches retain blank origins and noindex. Thus the deployed site has no canonical links, an empty sitemap and noindex response/meta directives. The prepared three-route indexable sitemap and production canonicals are not claimed as live. Legal pages remain visible working drafts; sign-in and registration remain restricted.

**Verification:** all seven required local commands passed: npm ci, typecheck, **118 unit tests**, build, build verification, **32 local browser tests** and production dependency audit (**zero vulnerabilities**). **16 additional browser tests passed against the actual HTTPS site**, including 1440, 1280, 768, 390 and 320 px layouts, all eight routes, genuine unknown-route HTTP 404, hero first-cycle CTA/lifecycle, mobile navigation, all six film deliveries, exact contact focus styling and legal draft notices. All deployed files are within the Pages limit; original backups stay outside dist. Approved MP4s, posters and Remotion sources are preserved. Live route/security/metadata/asset evidence is in `docs/verification/live-site.json`; local results are bound to the source fingerprint in `deployment-tests.json`. Browser screenshots are `live-film-*.png` and `live-contact-*.png`.

**Actual production enquiry:** one controlled message was sent through the deployed website. EmailJS history records **OK at 19:53:09 SAST**, referrer `https://kanreki-public.pages.dev/`, subject `kanreki website enquiry`, and all seven supported parameters. The shared service, template and fixed recipient were unchanged. The owner separately confirmed receipt of this production message in this chat; this is distinct from the earlier local test.

**Remaining owner decisions:** review the legal drafts and confirm the responsible entity and processing terms; decide whether to accept the current shared EmailJS plan's unavailable domain allowlist or arrange supported protection separately. The authenticated Domains Save control is locked and no origins are configured. Non-browser API access remains disabled. No upgrade or provider security change was made. Only after these gates are satisfied should DEPLOYMENT_ENV switch to production and a fresh GitHub build be verified for indexability. `npm run check:release` now evaluates real live evidence and separate owner approvals; it intentionally remains unsuccessful while those gates are unresolved.

The historical local predeployment record below is preserved. Statements there about absent hosting or unresolved authorization describe the earlier stage.

---

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
