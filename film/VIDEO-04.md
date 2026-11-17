# Video 4 — Reading articles and discussions

The owner authorised Section 4 integration, staging, commit and push, accepting this version provisionally. The film plays on the right with the exact approved heading and description on the left. `/#reading` opens the section. Videos 1–3 retain their existing source and exports.

The 42-second, 1920 × 1080, 60 fps composition uses the existing kanreki floating workspace, navigation rail, primary avatar, wordmark, icons, post actions, cursor, layered panels and shape-preserving cinematic camera helpers. Source is in `film/src/video4/`.

All twelve supplied files are retained byte-for-byte in `film/assets/`. Their actual codec is JPEG despite `.png` extensions; the local renderer detects the data signature. `film/video-04-assets.json` centrally maps the four post images, their four corresponding authors and four commenter portraits. Fictional display names are consistent across the feed and article. The first three commenter portraits belong to existing comments; the fourth belongs to an existing reply. No location, portrait identity or artwork provenance is asserted.

The third feed post opens into the matching full article about the supplied calling-chicken illustration and rounded lettering. Its editorial image retains its intrinsic 736:917 ratio. Feed images and all avatars remain circular. The article is already published, so its text does not type in. The reading column scrolls through five substantive paragraphs and a subheading into the discussion.

Deterministic state tracks two independent comment likes, the article like, one reshare and its compact `post reshared` toast. A fast typed comment inserts exactly once, retains the primary user's avatar, and increments the article's response count from nine to ten without replacing existing comments or resetting reactions. Returning to the feed first restores its prior scroll position, then follows a smooth reset to the original composition. Source frames at the loop boundary align exactly.

Render: `node film/render-video-04.mjs proof` for the internal full moving proof, `node film/render-video-04.mjs return-proof` for a targeted final-eight-second check, and `node film/render-video-04.mjs all` for the master. Export and validate with `node film/export-video-04.mjs`.

Ignored `film/output/video-04/` contains internal proofs, the complete master, MP4, WebM, desktop/mobile PNG posters, asset/decode/loop verification and `preview.html`. The standalone review includes a proposed Section 4 text-left/video-right layout with the owner's exact heading and description. The reviewed exports are copied to `public/media/kanreki-reading*` by `node film/integrate-video-04.mjs` after owner authorisation.

## Deferred motion corrections

The owner reported visible glitches in Video 4 and accepted the current export for integration only. Investigate and correct these transitions in a follow-up review; do not treat encode/loop validation as proof that motion defects are resolved. The owner also requested a later motion correction pass for Video 1. Neither film is re-rendered in this integration change.
