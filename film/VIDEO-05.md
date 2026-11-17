# Video 5 — Search and saved content

Owner-approved production integrated into Section 5, the `media.writing` slot. The owner authorised integration, staging, commit and push. `/#search-saved` opens this section, with video on the left and the exact approved heading and description on the right. Videos 1–4, including their deferred polish work, remain unchanged.

The 36-second 1080p60 deterministic composition uses the existing kanreki shell, primary avatar, navigation rail, wordmark, typography, icons, post controls, cursor and smooth camera helpers. Existing Video 4 feed cards populate Home without modifying their source. `film/src/video5/` holds editable source; `film/video-05-assets.json` centrally maps all twelve supplied files.

The supplied images show brand identities, illustration and packaging, so the query is `brand identity`. All actual files are JPEG data despite their `.png` extensions and retain their original bytes. Four article images, all four gallery images, and three creator portraits appear in the relevant result views; the fourth supplied portrait belongs to the fourth article's author. Fictional names and descriptive copy do not assert real identities, locations or artwork provenance.

The thin search field and application shell remain fixed. All, Posts, Images and People have distinct content; category transitions keep their tab row stationary. Adjacent opaque pages fill a single clipped content aperture and never occupy the same pixels, avoiding transparent overlap of incompatible screens. Text widths, typography and image geometry remain fixed during camera movement. The camera uses the approved shape-preserving interpolation and symmetric filtering with no rotations or perspective.

The first article has a stable ID, title, author, category, excerpt and photograph across results, reader and Saved. A bookmark click activates the existing saved control and shows `post saved`. Saved contains that article above two distinct previously approved posts. The collection scrolls to reveal its older entries, returns to the top, reopens the new item and retains its saved state. Home returns to its original unrelated feed so the saved change does not create a visible loop discontinuity.

Internal moving proofs use `node film/render-video-05.mjs proof` or targeted `search`, `article` and `saved` modes. Render the master with `node film/render-video-05.mjs all`, then run `node film/export-video-05.mjs`. Outputs, validation, desktop/mobile PNG posters and the standalone review are under ignored `film/output/video-05/`. The review offers native playback controls and the video-left/text-right Section 5 review layout with the owner's exact heading and description.

The first proof exposed overly tight bookmark framing and an offset cursor. These are corrected in the targeted article proof before the full-resolution master. Existing tracked-file hashes are stored in the output folder to verify the homepage and previous productions remain unchanged.

The verified MP4, WebM and desktop/mobile PNG posters are copied to `public/media/kanreki-search*` by `node film/integrate-video-05.mjs`. The existing media component provides muted autoplay and native looping on desktop, with static mobile/reduced-motion fallbacks. No additional CTA is introduced.
