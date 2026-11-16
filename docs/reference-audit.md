# Reference and capability audit

## Visual reference

Read-only source: neighbouring `kailor` checkout, commit `825678a` (12 November 2026). Connected GitHub `main` Home.tsx content matched the local implementation during this run. A live request and an in-app browser visit were attempted; neither provided a usable live view. No claim of pixel-perfect live parity is made.

Inspected SiteHeader.tsx, SiteFooter.tsx, SiteNavigation.css, destinations.ts, PublicLayout.tsx/CSS, BrandWordmark.tsx/CSS, Home.tsx/CSS, TypographicHero.tsx/CSS, AuthLayout.tsx, Auth.tsx/CSS, ClosingVisual.tsx, ClosingExperience.tsx/CSS, Legal.tsx/CSS, tokens.css, docs/style/README.md, information-page styling and enquiry composer. Current public source takes precedence over older app-oriented style guidance.

| Element | Source values and adaptation |
| --- | --- |
| Header | 72px desktop / 68px mobile, 1800px maximum, three-column alignment, 760px menu breakpoint, scroll threshold 8px, white at 94% with 18px blur |
| Navigation | 14px system stack, 32px desktop gaps, 44px controls, charcoal registration pill, Escape/outside/blur dismissal and focus restoration |
| Wordmark | Helvetica Neue, negative tracking, adapted lowercase `kailor.insider`; smaller narrow-phone sizing prevents collisions |
| Homepage | CinemaInter from the actual reference (licensed local font), #151517 primary / #77777c secondary, 0.85:1.3 text/media grid and source spacing, stacked below 900px |
| Hero | Static final typographic lockup: 370px width, vertical divider, 46px wordmark / 18px copy; mobile 292px / 38px / 16px |
| Closing | Source full-height composition, large wordmark, muted supporting line, restrained pill CTA; adapted for the longer name and restricted access |
| Footer | 1280px maximum, three equal groups, 64px top padding, same legal-row geometry; publication/account/connect content |
| Account | #f7f7f7 shell, half-width desktop split, 440px white card, 30px corner radius, 46px pill fields, 800px split breakpoint; no mobile visual |

Intentional differences: all four feature sections keep copy on the left as explicitly requested (the reference reverses one). Placeholder media is a quiet soft-grey area, with stable aspect ratios. Static hero/closing replace cinematic motion until approved assets exist. Account access is disabled on **both** routes. Legal routes are actual documents rather than the reference's legal modals. The new icon is a monochrome brand monogram, not a legacy image. Scroll fade is omitted while no films exist, keeping all static copy readable.

## Publishing application capabilities

Read-only source: neighbouring `kailor-insider` frontend and docs. No hosted/public availability inferred from local functionality.

| Capability | Evidence | Public-site treatment |
| --- | --- | --- |
| Feed, search, saved/liked navigation | PublicationFeed.tsx, iteration 009 | Described as platform experience; public access notice remains explicit |
| Comments/replies and post interaction | Comments.tsx, Article.tsx and profile activity | No imaginary controls rendered on public site |
| Profile, photo, biography, posts, followers/following | Profile.tsx, iteration 007 | Described without fake counts or verification badges |
| Publishing/editorial workflows | Existing editorial frontend and iteration 008 | No live publishing/editor tools copied into this site |
| Contextual writing launcher / Enhance with AI | No corresponding user-facing implementation found in frontend search | Clearly labelled planned |
| Other AI | docs/AI.md: owner-controlled, reviewed AI persona workflow; local inference evidence, hosted adapters disabled/unverified | Not equated with a live writer assistant or public availability |

Only necessary presentational styles and a licensed font were adapted. Neither reference repository was modified. No application services, credentials, backend source or data are imported.
