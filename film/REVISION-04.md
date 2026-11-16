# Revision 04 — smooth motion, editorial controls and canvas integration

The complete 60-second composition keeps the slower opening, returning-user welcome, avatar-to-rail transition and closing. Source and delivery outputs for the previous revision remain preserved.

## Changes

- Camera movement uses shape-preserving cubic interpolation with continuous velocity and deterministic temporal filtering. Closely spaced zoom reversals were simplified, and the publish-button push starts after link editing has finished.
- Caret tracking blends continuously between line endpoints over a measured wrap interval. The old seven-sample average could jump as individual samples crossed a wrap; it is replaced by a continuous path. The slowed opening now joins the normal-speed timeline without a velocity discontinuity.
- Promotional sentence periods use circular inline elements rather than the font's punctuation glyph.
- Feed controls follow the supplied reference: heart, dislike, comment, repost and the separate connected-node share icon; bookmark/count and horizontal ellipses sit on the right.
- The editor shows image selection from the supplied assets, attachment confirmation, body typing, text selection, bold formatting, URL entry and applying the embedded link. The resulting post retains its rich text and circular supplied image in the feed above earlier posts.
- “main action” and “Nothing dramatic changed” receive bold emphasis; “easier to understand” links to the W3C WAI design guidance at https://www.w3.org/WAI/tips/designing/.
- The full-frame grey modal backdrop is replaced by a local radial shadow and a gently blurred workspace. Workspace shadows are softer, and a white perimeter matte makes close-up imagery fade into the surrounding page canvas rather than exposing a rectangular video boundary.

The first-loop HTML “account access” CTA and all other homepage sections retain their existing behavior. No new publishing application or Section 2 film is introduced.

## Repeatable workflow

`npm run film:revision04`, `npm run film:export:revision04`, `npm run film:integrate:revision04`. The default still, master, export, activation and local-review commands now target this revision. Rendering dependencies remain isolated under `film/`.

## Validation and delivery

Both complete exports contain 3,600 decoded frames at 1920 × 1080 / 60 fps and run for 60 seconds. Full decoding and first/last-frame loop checks passed. The sampled workspace perimeter has minimum RGB channels of 255 (MP4) and 254 (WebM), matching the white surrounding canvas. The moving master and encoded film were reviewed, including image selection, formatting, link insertion, published feed and closing.

Production media is integrated locally at `public/media/kanreki-hero.mp4` and `.webm`, with desktop and mobile posters. The full master, standalone preview, representative frames and validation evidence remain under ignored `film/output/revision-04/`.

Website and film type checks passed. All 33 tests passed across five files; the production build and its eight-route, six-section checks passed.

Local homepage playback was verified in the browser with the revised MP4. After its first natural loop, the account-access CTA became visible and the video continued playing. No horizontal overflow was present.
