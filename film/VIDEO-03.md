# Video 3 — AI-assisted drafting, editing and publishing

Owner-approved production integrated into the third homepage position, the `social` media slot. `/#drafting` opens the section directly. The film appears on the left, with the approved heading, description, “try it out” account-access link on the right. The other sections retain their approved media and content.

Editable source lives in `film/src/video3/`. It imports the approved navigation rail, avatars, wordmark, icons, cursor, panel surfaces, editorial author/action components and smooth motion/typing helpers from Videos 1 and 2 without modifying their files. Three supplied JPEG-encoded images retain their supplied `.png` filenames and original bytes; validation records their actual formats and the render server serves the detected image type.

The 46-second deterministic composition follows one article from a thin conversational input through generation, selected-sentence rewriting, suggestion regeneration, acceptance, shortening, bold formatting, image selection, preview, publication and a three-post feed. The smile illustration motivates an article about simple visual communication. No photograph location, identity or provenance is invented.

Accepted edits update only their selected sentences. The exact title, final body, bold phrase and new image persist into the reader preview, while the published feed uses an appropriate excerpt and the same supplied image. Two older articles have distinct contributor avatars and the other supplied images as circular thumbnails. View transitions use opaque clipped pages rather than overlapping paragraph crossfades.

Render with `node film/render-video-03.mjs proof`, then `node film/render-video-03.mjs all` and `node film/export-video-03.mjs`. Internal frames, moving proofs, complete master, exports, validation and the standalone local review page are under ignored `film/output/video-03/`. The review page includes the proposed video-left/text-right Section 3 layout and an unobtrusive planned-feature disclosure.

The owner approved the complete playable preview and authorised homepage integration, staging, commit and push. The approved MP4, WebM and PNG poster are served from `public/media/kanreki-drafting*`. The CTA uses the existing `/create-account` route, which retains restricted access while the feature is planned. No backend service or deployment is activated by this integration.
