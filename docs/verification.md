# Iteration 001 verification

## Executed

| Check | Result |
| --- | --- |
| Dependency installation | Passed using a writable copy of the existing npm cache; clean `npm ci --offline` also passed |
| TypeScript | `npm run typecheck` passed |
| Component/integration tests | `npm test`: 19 passed |
| Production build | `npm run build` passed; static HTML generated for eight routes plus 404 |
| Build audit | `npm run check:build` passed: sections/slots, route HTML, canonicals, indexing, sitemap, JSON-LD publisher, CSP hash, private-reference/source-map scan |
| Responsive browser suite | Attempted; blocked before tests by sandbox `listen EPERM: operation not permitted 127.0.0.1:4173` |
| Live reference view | Browser creation failed; web retrieval unavailable. GitHub main Home.tsx matched the inspected local source |

No browser screenshots were captured. No pixel-level comparison, direct HTTP refresh/status check, rendered overflow assertion or actual browser keyboard/short-height check is claimed. Browser test definitions cover these checks at 1440, 1280, 768, 390 and 320px, plus 1280 × 650 and reduced motion. Source inspection is not a substitute for those checks.

The first unit run found one test-isolation problem: restoring the matchMedia spy removed its implementation for the following test. A beforeEach reset fixed it. The initial tsx CLI invocation attempted a prohibited IPC listener; the build now uses `node --import tsx` and disables Vite's middleware WebSocket listener, so production builds need no open listening port.

## Remaining verification

Run after `npm ci` in a normal terminal with loopback access:

```sh
npm test
npm run build
npm run check:build
npx playwright install chromium
npm run test:browser
```

Screenshots will be written under `docs/verification/`. They are evidence of this public website, not the six future platform-media assets. Inspect the screenshots and correct any visible issue before calling the iteration visually verified. Compare header, footer, typography, whitespace and account layouts against live kailor.

## Readiness and approvals

The implementation and static build are prepared for an independent Cloudflare Pages deployment. Full iteration acceptance remains pending actual browser/visual verification. No commit, push, deployment, resource provisioning or DNS change was performed. Legal content is visibly marked draft and excluded from indexing. Public launch needs owner/legal review and separately authorised hosting/domain setup, as requested in the brief.

Future media assets and live application authentication are intentionally deferred. See `docs/media.md` for the exact Section 1 workflow for Iteration 002.
