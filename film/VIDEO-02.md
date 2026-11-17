> Current revision: [Revision 03](VIDEO-02-REVISION-03.md), with separate image sets, a left-aligned gallery and the revised Section 2 copy.

> Current correction: [Revision 02](VIDEO-02-REVISION-02.md). Prior verification notes below describe the first delivered version and do not supersede the owner’s glitch report.

# Video 2 — profiles, posts and conversations

The separate 38-second / 1920 × 1080 / 60 fps composition is `film/src/video2/Entry.tsx`. It imports the approved Video 1 primitives, navigation rail, interaction toolbar, motion interpolation and post styling without editing any Video 1 source or media.

`video-02-assets.json` centrally maps the five supplied new images and the profile reference. Existing avatars and article images retain their original mapping in `assets.json`. Reference screenshots guide structure only and are not embedded in the film. Profile and post statistics are deterministic demonstration data.

The Home gallery has three square image tiles and separate timed 150ms hover overlays. Profile Posts uses circular thumbnails. The main feed has nine unique posts; its nonconstant scroll pauses for a like, save, compact typed reply and repost. Actions persist on their corresponding articles. The profile return shares its initial camera, avatar and UI state for looping.

## Rendering and review

- `npm run film:video2:proof` renders the complete internal moving proof.
- `npm run film:video2` renders representative review frames and the complete master.
- `npm run film:video2:export` creates MP4, WebM, PNG posters, full decode/frame/loop validation and a standalone review page.

Outputs remain under ignored `film/output/video-02/`. The preview includes a cinema view and a separate editorial-layout review with the requested HTML title and description. Section 2's media manifest remains unchanged until explicit owner approval. No Video 3, staging, commit, push or deployment is included.

## Reference inspection

The actual kailor hero (58 seconds), workspace (32 seconds) and conversation (56 seconds) exports were sampled into timestamped 4-second storyboard sheets and 60 fps moving excerpts for internal inspection. Their Remotion camera, cubic easing, cursor, typography and workspace source were read. The approved local kanreki Revision 04 film and components are the visual authority.

## Internal moving review

The entire 38-second moving proof was rendered and inspected. Review covered all three gallery overlays, the Posts transition, rail navigation, social actions and profile return. A comment-field occlusion found in that review was corrected by expanding its own post while typing; the corrected five-second moving segment was rendered and reviewed before the full master.

A separate six-second moving gallery check confirmed that the cursor stays above the centred counts on each tile. Build checks and 38 tests passed. The Section 2 HTML copy is updated, while its existing media placeholder remains active.

## Complete export validation

Both delivery files run for exactly 38 seconds and contain 2,280 frames at 1920 × 1080 / 60 fps with no audio stream. H.264 MP4 and VP9 WebM fully decoded without error. First/last decoded frame mean channel differences are 0.181/255 for both exports; the corresponding source review PNGs have identical checksums. The delivery MP4 is 21,688,365 bytes. PNG desktop and intentionally cropped static mobile posters are included.

The full-resolution master and delivery MP4 were reviewed in browser playback, alongside the encoded motion sheets. The standalone preview's editorial mode uses the existing section proportions, spacing, typography and 16:10 media container. Film source, assets and requested Section 2 copy remain uncommitted pending owner approval; Section 2 media and all Video 1 source, media and timing remain unchanged.

## Local integration

The owner requested local integration following preview review. The validated MP4/WebM and posters are copied into `public/media/`; Section 2 now uses muted native looping playback in its existing 16:10 container. The requested HTML title and description remain on the left. `/#profiles` opens the section directly. Narrow screens and reduced motion use the intentionally cropped static poster through the existing media component. Video 1 and Sections 3–6 are unchanged.

Local integration verification: the desktop title and description sit to the left of the playing 38-second MP4 in the 16:10 slot. Muted/native-loop flags and absence of horizontal overflow were verified in the browser. All 38 tests, production build and build checks pass. Changes are staged for local review; no remote push or deployment was performed.
