# kanreki | public website

Independent React, TypeScript and Vite public website for [keenosmith-del/kanreki-public](https://github.com/keenosmith-del/kanreki-public). kanreki is an independent publishing and social platform established in 2020. The publishing application is separate; public sign-in and registration stay disabled.

Six approved cinematic films are integrated. This iteration preserves their source and MP4 exports; only three authorized WebM delivery encodes change. Lower-page films load near the viewport; mobile and reduced-motion users receive the existing static posters. The hero retains its first-completed-playback account actions.

Use Node 24 (`.node-version`).

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

For the prerendered local website, including security headers, media byte ranges and genuine HTTP 404 responses:

```sh
node scripts/serve.mjs
```

Open [local preview](http://127.0.0.1:4173). The Vite development server is intended for editing; it does not model static-host 404 handling. Browser tests create a separate ignored `dist-browser-test/` preview and intercept all EmailJS requests with test responses. They never send a live enquiry or change the normal build's configuration.

Contact actions open one accessible native enquiry dialog matched against kailor's live production modal. `/contact` remains a standalone route. The owner-approved **shared kailor EmailJS service, template and recipient** are used unchanged. The same three `VITE_EMAILJS_*` browser-public identifiers belong in ignored `.env.local` or this Pages project's private environment settings; see `.env.example`. No recipient address or private provider credential belongs in the client. The subject is `kanreki website enquiry`. The existing template additionally needs `name`/`email` aliases; both aliases and kailor's original five parameter names are sent. One live request was confirmed OK in provider history and received by the owner. Provider account settings and kailor code were not changed.

The contact focus cascade, dimensions and buttons are checked against captured production computed styles at 1440, 768, 390 and 320 px. Visual regression tests cover initial, focused, validation and mocked sending states. Reference CSS fixtures make these tests independent of a neighbouring kailor checkout.

Three WebM delivery files were optimized below 24 MiB without changing content, resolution, fps, frame count or timestamps. The approved originals remain under `media-originals/webm-2026-11-18/`; all MP4s, posters and Remotion source remain unchanged. Reproduce with `python3 scripts/optimize-webm.py` and validate using `python3 scripts/validate-webm.py`. `npm run check:build` and `npm run check:release` reject **any** output file above Pages' 25 MiB limit.

Preview builds default to `noindex`. Production indexing requires `DEPLOYMENT_ENV=production`, a real verified HTTPS `SITE_URL`, and `SITE_ORIGIN_VERIFIED=true`. Only home, About and Contact enter the production sitemap. Restricted account pages and legal drafts remain `noindex, follow`; unknown routes return HTTP 404 and `noindex`. Per-commit Pages URLs are never used as canonical origins. No unpurchased domain is configured.

Key files: `src/seo.ts` and `config/site.mjs` control metadata; `src/social.ts` holds the owner-confirmed LinkedIn URL; `src/components/contact/` and `src/services/enquiries.ts` implement enquiries; `scripts/build.ts` prerenders all eight routes and custom 404. The official-identity 1200 × 630 social preview is `public/social-preview.png`; regenerate with `node scripts/render-social-preview.mjs` using Helvetica Neue installed locally.

See [deployment and provider setup](docs/deployment.md) and [predeployment verification](docs/predeployment.md). No repository push, hosting deployment, DNS change, kailor configuration change or publishing-platform modification is part of this iteration.
