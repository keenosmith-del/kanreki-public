> Current production: [Revision 04](REVISION-04.md), with smoother camera tracking, richer post editing and a white canvas blend. Earlier workflows below are historical.




# kanreki hero film — Section 1

Status: **editable implementation; production media not rendered or visually approved**.

## Standalone preview for approval

Run `npm run film:local` to open the existing rendered video in a standalone browser preview. If no video exists, it first renders the 72-second 1080p60 review copy. It does not apply the video to the homepage. The video is `film/output/kanreki-hero-local.mp4`. Homepage integration waits for explicit user approval.

The source uses React, a deterministic 60 fps timeline, Playwright frame capture, and FFmpeg encoding. It uses no production APIs or authentication. It imports no runtime source from kailor. Every rendered frame is derived from its requested frame number. The target is 4,320 frames / 72 seconds at 1920 × 1080. Chrome and FFmpeg/FFprobe must be installed.

## Assets

Place originals under `film/assets/` using the names in `film/assets.json`. All nine supplied files were locally validated on November 16, 2026: dimensions, image decoding, and SHA-256 checksums are recorded in `film/output/asset-validation.json`. Some supplied `.png` files contain JPEG bytes; FFmpeg correctly identifies and decodes them. Files are used unchanged. Contributor display names are fictional demonstration labels.

The reference screenshots are validation inputs only; the film never embeds them. The workspace is reconstructed from React components. Film assets and rendering source stay outside the public deployment bundle.

## Repeatable render and review

Run from the repository root:

```bash
npm run film:assets
npm run film:stills
```

Inspect all `film/output/stills/*.png` and `film/output/contact-sheet.png`. The layout proof includes opening, wordmark, description, avatar transition, workspace, composer, typing, published post, replies, notification transition, closing, and the last frame.

Record a review only after inspecting the corresponding rendered evidence. Replace the quoted example with actual findings:

```bash
npm run film:review -- layout "Actual visual findings from the high definition stills"
npm run film:proof
```

Watch the complete `film/output/kanreki-hero-motion-proof.mp4`, including the loop boundary and every interaction. Revise and regenerate earlier gates if any problems remain.

```bash
npm run film:review -- motion "Actual findings from watching the complete motion proof"
npm run film:master
npm run film:export
```

Inspect the **actual exported** frames in `film/output/stills/export-*.png`, the MP4/WebM playback, and the mobile poster. Re-render if needed. The export also validates encoding/duration/frame rate, fully decodes both files, and writes `film/output/production-validation.json`.

```bash
npm run film:review -- export "Actual findings from exported frames, video playback and mobile still"
npm run film:activate
npm run typecheck
npm test
npm run build
npm run check:build
npm run test:browser
```

The review records are bound to a source/asset fingerprint. Changing the film source or originals invalidates previous proof gates. Review commands do not perform visual inspection themselves and must never be used to manufacture an approval.

## Outputs

| File | Purpose |
| --- | --- |
| `film/output/kanreki-hero-master.mp4` | 1080p60 H.264 CRF 16 master |
| `film/output/kanreki-hero-motion-proof.mp4` | Complete 960 × 540 / 15 fps proof |
| `film/output/contact-sheet.png` | Timestamped layout contact sheet |
| `film/output/stills/*.png` | 1080p layout and decoded production stills |
| `public/media/kanreki-hero.mp4` | Browser H.264, silent, faststart |
| `public/media/kanreki-hero.webm` | VP9 alternative, silent |
| `public/media/kanreki-hero-poster.webp` | Desktop closing identity still |
| `public/media/kanreki-hero-reduced-motion.webp` | Separate copy of static desktop fallback |
| `public/media/kanreki-hero-mobile.webp` | Intentional identity composition at 1170 × 1560 |

Temporary frames and the master are ignored by git and never copied into the public bundle. Encoding streams PNG frames directly to FFmpeg without storing thousands of intermediate frames.

## Website integration

`src/hero-production.json` reserves production paths. Its `ready` flag remains **false** until export review and activation succeed. This prevents broken video/poster requests and preserves a working native text fallback. Only the introduction manifest changes; Sections 2–6 keep their existing content and media placeholders.

The production hero uses a native muted inline looping video. HTML account links occupy reserved space and reveal on the first observed playback wrap, then stay visible. They reveal immediately for reduced motion, mobile stills, absent/failed media, or rejected autoplay. A startup timeout prevents a source that never loads from withholding account access. Header account navigation remains available. Neither account route gains authentication functionality.

Mobile uses the dedicated still; a reframed mobile video remains future work. Preview individual source frames with `npm run dev`, then open `/film/index.html?frame=1440` for 24 seconds. The preview is a render surface, not a production web page.

## Current verification limitations

This environment denied listening on localhost (`EPERM` at ports 4173 and 4188) and terminated a separate headless Chrome launch. Consequently the still render and browser suite could not run. No layout gate, motion gate, production export, loop-seam comparison, or exported-frame review has passed. No output size or actual duration can be reported until files exist.

The mandatory local kailor source files and renderer/export scripts were inspected read-only. The live homepage was not successfully visually inspected. The supplied reference images were visible in the conversation; a rendered comparison against them remains outstanding. Camera framing, typing legibility, editor-to-feed continuity, notification-to-period geometry, and exact loop continuity require the rendered review gates and may need revision.

Nothing has been committed, pushed, or deployed.
