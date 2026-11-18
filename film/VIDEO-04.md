# Video 4 — Reading articles and discussions

The owner authorised Section 4 integration, staging, commit and push, accepting this version provisionally. The film plays on the right with the exact approved heading and description on the left. `/#reading` opens the section. Videos 1–3 retain their existing source and exports.

The 42-second, 1920 × 1080, 60 fps composition uses the existing kanreki floating workspace, navigation rail, primary avatar, wordmark, icons, post actions, cursor, layered panels and shape-preserving cinematic camera helpers. Source is in `film/src/video4/`.

All twelve supplied files are retained byte-for-byte in `film/assets/`. Their actual codec is JPEG despite `.png` extensions; the local renderer detects the data signature. `film/video-04-assets.json` centrally maps the four post images, their four corresponding authors and four commenter portraits. Fictional display names are consistent across the feed and article. The first three commenter portraits belong to existing comments; the fourth belongs to an existing reply. No location, portrait identity or artwork provenance is asserted.

The third feed post opens into the matching full article about the supplied calling-chicken illustration and rounded lettering. Its editorial image retains its intrinsic 736:917 ratio. Feed images and all avatars remain circular. The article is already published, so its text does not type in. The reading column scrolls through five substantive paragraphs and a subheading into the discussion.

Deterministic state tracks two independent comment likes, the article like, one reshare and its compact `post reshared` toast. A fast typed comment inserts exactly once, retains the primary user's avatar, and increments the article's response count from nine to ten without replacing existing comments or resetting reactions. Returning to the feed first restores its prior scroll position, then follows a smooth reset to the original composition. Source frames at the loop boundary align exactly.

Render: `node film/render-video-04.mjs proof` for the internal full moving proof, `node film/render-video-04.mjs return-proof` for a targeted final-eight-second check, and `node film/render-video-04.mjs all` for the master. Export and validate with `node film/export-video-04.mjs`.

Ignored `film/output/video-04/` contains internal proofs, the complete master, MP4, WebM, desktop/mobile PNG posters, asset/decode/loop verification and `preview.html`. The standalone review includes a proposed Section 4 text-left/video-right layout with the owner's exact heading and description. The reviewed exports are copied to `public/media/kanreki-reading*` by `node film/integrate-video-04.mjs` after owner authorisation.

## Revision 02 — rendering stability and return motion

The original encoded MP4 contains isolated frames tiled with repeated workspace content, notably at 15.0167 seconds. Their neighbours return to the correct picture. This is capture corruption, independent of the scene's deterministic timeline. The rasterization-only workaround did not fully resolve it. Revision 02 disables GPU compositing as well as GPU rasterization during capture, through `film/chrome-stable-render.sh`. The focused 14–20.5-second moving proof no longer contains the repeated tiles observed in the original.

The article entrance now has a restrained opacity envelope, and the return-to-feed camera no longer performs a rapid deep zoom reversal. The cursor gets more travel time to the back control, and the two adjacent content panes share a one-second return transition. Duration, content, identities and interactions remain 42 seconds / 1080p60.

Current source is isolated in `film/src/video4revision02/`; original `film/src/video4/` stays unchanged because Videos 5 and 6 import it. Reproduce with `node film/render-video-04-r02.mjs all`, `node film/export-video-04-r02.mjs`, and `node film/integrate-video-04-r02.mjs`. Original public media and source were preserved under ignored `film/output/video-04-r02/original/`.

The master workflow now audits every capture before export. If it finds an isolated corrupted capture, it renders that exact source frame again as a full-resolution PNG and replaces only that frame, preserving timing; it never invents or interpolates frames. The final master required one such recapture at frame 54. The full 2,520-frame audit then passed with peak consecutive-frame mean difference 6.748, compared with 26.728 in the original export. The export workflow checks every decoded delivery frame, records the largest differences for focused visual inspection, and fails on unexpected corruption before local integration. Full motion review, final validation and website playback checks are recorded under `film/output/video-04-r02/`.

Rendering reference: [Remotion Chromium flags](https://www.remotion.dev/docs/options/chromium-flags).


### Final Revision 02 verification

Both delivery files decode completely: 42.000 seconds, 2,520 frames, 1920 × 1080 at 60 fps, video only. Their full-frame corruption scans pass, with no black frames or isolated capture spikes. Native looping matches the opening composition. The complete final MP4 was played in the browser through its natural loop; discussion likes, new comment, and the softened return were reviewed in moving footage. The updated local Section 4 plays the verified MP4 muted with native looping and retains its correct title and description.

All 80 tests, website/film typechecks, production build and build verification pass. The previous export and original source remain preserved. Videos 2, 3, 5 and 6 and the original shared Video 4 source remain unchanged; the already completed Video 1 Revision 05 is included in this owner-authorised commit/push. Footer cleanup removes the registration note and attribution sentence, removes the kailor connect link, and adds the matching Lucide cookie icon with its license retained.
