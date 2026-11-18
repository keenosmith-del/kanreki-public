# Video 1 — Revision 05

Targeted polish of the approved 60-second Revision 04 story. The previous source remains in `film/src/` and its rendering scripts are unchanged. Before local activation, the existing public exports and production manifest are copied byte-for-byte to `film/output/revision-05/original-revision-04/`.

Revision 05 is isolated in `film/src/revision05/` with its own asset manifest, so Videos 2–6 continue to use their approved components and assets. The three supplied new portraits are mapped to three fictional contributors; the primary account is unchanged. `post-01.png` through `post-03.png` form the existing feed. `create-post-image-01.png` is the sole image choice and remains attached to the published post. Additional supplied post-04/05 images are retained as reserves without adding scenes.

Typing retains the complete paragraph/title layout, revealing characters within that geometry. A zero-width caret cannot push words onto another line. Camera tracking is filtered on a continuous envelope; the icon anchor uses the same continuous cubic motion as the camera. The existing slower-opening remapping, scene sequence, article wording, rich formatting, embedded link and closing identity remain intact.

The publish-button push is shallower, avoiding the previously sharp zoom/pan reversal while retaining the same button target and timing. A brief scroll in the existing workspace reveal makes the third existing post visible. Publication establishes the new article before a restrained 1.65× close-up frames its heart and tabular increasing count. The camera then withdraws as three distinct comments appear, and the feed moves enough to reveal the final comment. Counts persist. The create-post button and rail use a thin plus symbol.

## Reproduce

- `node --experimental-strip-types film/render-revision-05.mjs stills` — representative frames.
- `node --experimental-strip-types film/render-revision-05.mjs proof` — complete half-resolution moving proof; `opening`, `editor` and `social` render focused segments.
- `node --experimental-strip-types film/render-revision-05.mjs all` — full 1080p60 master and frames.
- `node film/export-revision-05.mjs` — MP4, WebM, desktop/mobile PNG posters, standalone review and decode/loop/perimeter validation.
- `node film/integrate-revision-05.mjs` — validated local activation in Section 1 only.

Outputs and original-export comparison are under ignored `film/output/revision-05/`. The website retains native muted looping, its existing first-playback account CTA and mobile/reduced-motion fallbacks. The owner subsequently authorised staging, commit and push of all changes together with the Video 4 correction and footer cleanup. No deployment was requested.

## Final validation and local activation

Both final delivery files decode completely: 3,600 frames, 60.000 seconds, 1920 × 1080, 60 fps, one video stream and no audio. MP4 is H.264 (20.15 MB); WebM is VP9 (13.09 MB). No black frames were found. First/last-frame mean RGB difference is 0.0036 for MP4 and 0.0040 for WebM. The sampled perimeter remains white (minimum channel 255 / 254). The sharper publish pan was corrected in a separately rendered 181-frame segment; peak consecutive-frame mean difference reduced from about 11.97 to 8.59 (MP4). This check supplements moving review rather than replacing it.

The full MP4 was played through its natural loop. Short moving checks covered opening text, avatar handoff, workspace, image selection, typing and formatting, publishing, likes/comments and closing. The WebM close-up was inspected in the browser. The actual homepage uses Revision 05 and retains its HTML CTA: initially hidden, then visible after natural playback reached 60 seconds, with the playing element retaining its full played range. Mobile at 390px loads the new 780px poster, exposes account access immediately and has no horizontal overflow. The account link still opens the restricted create-account page.

All 74 tests, website/film typechecks, production build and build verification passed. Hash checks confirm 119 existing protected film source/assets/media files are unchanged, including Videos 2–6; the Revision 04 backups match the previous public exports exactly. At the initial local review no staging, commit, push, merge or deployment was performed; the subsequent owner request authorises staging, commit and push.

## Modified files

- `film/src/revision05/`: isolated composition, opening, workspace, timeline, camera, motion, text and UI source.
- `film/assets-revision-05.json`, nine supplied original asset files, and `film/validate-revision-05-assets.mjs`.
- `film/render-revision-05.mjs`, `film/export-revision-05.mjs`, `film/integrate-revision-05.mjs`, `film/local.mjs`, `film/serve-review.mjs`, and `package.json` for the reproducible workflow. Explicit Revision 04 scripts remain available.
- `public/media/kanreki-hero.{mp4,webm}`, desktop/mobile PNG posters and `src/hero-production.json`.
- `src/pages/Home.tsx`: only the Video 1 static fallback wording.
- `tests/hero-revision-five.test.tsx`, `docs/media.md` and this note.

Standalone preview: `http://127.0.0.1:5173/film/output/revision-05/preview.html`. Representative full-resolution frames: the adjacent `frames.html`. Validation and playback evidence remain in the same ignored output directory.
