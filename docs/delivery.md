# kanreki rebrand delivery — 16 November 2026

The standalone public site now uses `kanreki` and the `kanreki.` wordmark throughout. All six homepage sections, their placeholder assets, dimensions and playback implementation remain. No films were created. Account forms remain disabled. About and structured data record establishment in 2020; publication copy covers articles, images and social participation beyond AI and technology. Writing assistance remains explicitly planned.

The period uses the kailor reference’s circular geometry, with existing typography, responsive sizing, monochrome colours and interface layouts retained. The original supplied Downloads/url-icon.png was copied byte-for-byte to public/url-icon.png; the old SVG was removed. No generated substitute or image conversion was used.

## Modified files

| Files | Change |
| --- | --- |
| `src/components/Brand.tsx` | Shared kanreki wordmark and accessible home label |
| `src/components/Navigation.tsx` | Footer copyright identity; consultancy links retained |
| `src/pages/Home.tsx` | Publishing/social messaging and public access disclosure |
| `src/pages/Information.tsx` | About, 2020 establishment, contact subject/disclosure and legal brand references |
| `src/pages/Auth.tsx` | Brand/access labels; both forms remain disabled |
| `src/media.ts` | Introduction accessibility description only |
| `src/styles/global.css` | Circular terminal period matching the reference |
| `src/styles/navigation.css` | Brand name in internal comment |
| `src/seo.ts` | Titles, descriptions, kanreki publisher, 2020 founding date, configurable origin and noindex |
| `src/App.tsx` | Canonical/Open Graph URL lifecycle, including absent origins and unknown routes |
| `vite.config.ts` | Validate and share SITE_URL / CF_PAGES_URL between SSR and client |
| `scripts/build.ts` | Prerendered brand metadata, optional URLs, empty sitemap while indexing is disabled |
| `scripts/check-build.mjs` | Brand, icon, publisher/year, URL, indexing and stale-reference checks |
| `scripts/serve.mjs` | PNG MIME type and preview noindex header |
| `index.html` | PNG favicon declaration |
| `public/_headers`, `public/robots.txt` | Global noindex response header; crawl allowed to read it; no advertised sitemap |
| `public/url-icon.png` (added), `public/favicon.svg` (removed) | Exact supplied icon replaces old favicon |
| `package.json`, `package-lock.json` | Local package identity kanreki-public; no dependency changes |
| `tests/app.test.tsx`, `tests/browser/site.spec.ts` | Brand, publisher, founding year, noindex, configured/absent canonicals, icon and console checks |
| `README.md`, `docs/deployment.md` | Current brand, deployment configuration and future domain boundaries |
| `docs/reference-audit.md`, `docs/media.md` | Reference check and future introduction instructions updated |
| `docs/verification.md`, `docs/delivery.md` | Current results, complete file inventory and outstanding checks |

## Remaining references and boundaries

No previous publishing name remains in production output. The old repository slug remains in deployment documentation solely to identify the unchanged GitHub repository; stale-name rejection patterns remain in the build verifier. Historical Git data and the local checkout path naturally retain the previous repository name. References to kailor’s consultancy, LinkedIn company page and existing contact email remain intentionally.

No other repository was modified, and no publishing backend, auth, credentials or database were imported. There was no commit, push, deployment, repository rename or DNS change. Planned kanreki.co.za and app.kanreki.co.za domains remain unconnected and do not appear as live canonical or application links.

## Next step

The rebrand implementation is ready for Section 1 development. Before declaring visual acceptance, run the browser suite outside the restricted execution sandbox and inspect its desktop/mobile screenshots. Keep all six media slots until the first approved introduction film and poster are supplied. See verification.md and media.md.
