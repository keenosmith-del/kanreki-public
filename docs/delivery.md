# Iteration 001 implementation delivery

## Outcome

Implemented the independent static public website. Six permanent homepage sections reserve the final media, while the hero and closing use complete static typographic compositions. Eight routes, restricted account pages, publication-specific draft legal information and a custom 404 are present. React Router provides client navigation; the production build also emits meaningful route HTML without JavaScript.

Shared presentational code lives under `src/components`; route content under `src/pages`; styling under `src/styles`; future asset configuration in `src/media.ts`; canonical identity in `src/seo.ts`. Build/deployment concerns remain in `scripts` and `public`. There are no imports from either reference project and no backend.

## Exact source file inventory

Modified: `README.md`.

Created:

```text
.gitignore
.node-version
index.html
package.json
package-lock.json
tsconfig.json
vite.config.ts
vitest.config.ts
playwright.config.ts
src/App.tsx
src/main.tsx
src/entry-server.tsx
src/media.ts
src/seo.ts
src/components/Brand.tsx
src/components/Navigation.tsx
src/components/MediaSlot.tsx
src/pages/Home.tsx
src/pages/Auth.tsx
src/pages/Information.tsx
src/styles/global.css
src/styles/navigation.css
src/styles/auth.css
public/_headers
public/robots.txt
public/favicon.svg
public/fonts/inter.woff2
public/fonts/LICENSE.txt
scripts/build.ts
scripts/check-build.mjs
scripts/serve.mjs
tests/setup.ts
tests/app.test.tsx
tests/browser/site.spec.ts
docs/deployment.md
docs/media.md
docs/reference-audit.md
docs/verification.md
docs/delivery.md
```

Generated, ignored output: `dist/` (eight HTML route documents, `404.html`, sitemap, security headers, favicon/font and fingerprinted CSS/JS). Installed dependencies and browser failure artifacts are ignored.

## Parity and remaining differences

Source values for navigation, footer, typography, spacing and account layouts were retained/adapted. The current GitHub main homepage matched the local reference inspected. Live pixel comparison could not be completed. Intentional differences and exact source measurements are in `reference-audit.md`.

No final films/screenshots are included. Longer-wordmark mobile sizing and compact short-desktop account styles are implemented but require rendered verification. All four editorial sections keep text left/media right as specified. Review-pending legal content uses document routes. Static copy remains visible rather than scroll-fading without media.

## Validation and deployment

Clean installation, TypeScript, 19 component tests, production build and build audit passed. Browser tests were blocked by sandbox refusal to listen on loopback; screenshots, rendered responsiveness and HTTP refresh/status checks remain unverified. The build's React Router `use client` directive warning is non-fatal in this client-only frontend.

The static build is prepared for a separate Cloudflare Pages project using `npm run build` and output `dist`. See `deployment.md`. Full iteration acceptance remains pending browser/visual verification. Changes remain uncommitted and unpushed.

Before public release: run/inspect browser verification, obtain owner/legal approval of notices, and obtain separate owner authorisation for hosting resources and domain activation. No existing kailor/Insider resources or DNS were changed.

## Next iteration

After visual acceptance, create only the introduction film from the real platform interface; supply the approved static fallback; bind the introduction media source with `loop:false`; verify one play, final-frame hold, static/error fallbacks and no replay on unrelated renders. The detailed sequence and media dimensions are in `media.md`. Keep all other media slots deferred.
