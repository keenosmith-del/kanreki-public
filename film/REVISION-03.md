# Revision 03 — opening pacing and returning-user sign-in

The film is 60 seconds at 1080p60. Seven additional seconds are reserved for the identity, descriptions and returning-user welcome; all later publishing actions retain their Revision 02 pace.

The opening presents the supplied avatar followed by “welcome back”, the supplied account name “Keeno Smith”, then sign-in. The camera completes its push before avatar travel and shrink begin; the following pull-back and avatar movement progress together into the rail above Home.

The homepage has one charcoal “account access” link to the existing `/create-account` destination. It appears after the first native video loop and stays available afterward. Static/reduced-motion or failed playback exposes the link immediately. A played-range check handles browsers that dispatch loop `seeked` before `timeupdate`, while retaining protection against manual backward seeking.

Production commands: `npm run film:revision03`, `npm run film:export:revision03`, and `npm run film:integrate:revision03`. These are repeatable source workflows; the final delivery and verification results are recorded below after completion. Revision 02 and the rejected 72-second export remain preserved under ignored output paths.

Only Section 1 is integrated. No Section 2 production, remote push or deployment is authorized by this revision.

## Completed verification

- Full MP4 and WebM: 60 seconds, 1920 × 1080, 60 fps, 3,600 frames, no audio; complete decoding and loop endpoint checks passed.
- Named welcome and synchronized avatar/rail transition checked in the moving master and encoded frames.
- Later publishing scenes were compared with Revision 02 at corresponding times; differences are limited to normal encoding variation.
- Public TypeScript and isolated film TypeScript compilation passed. Production build and eight-route artifact checks passed. All 27 unit tests passed.
- Actual homepage playback at 1440 × 900 began with the CTA hidden. After the natural first 60-second loop, one “account access” CTA became visible while the same video continued playing. Its destination is `/create-account`. There was no horizontal overflow.
- Six homepage sections remain present; the other five media configurations are unchanged.

Local homepage preview: http://127.0.0.1:5173/. Standalone corrected video: http://127.0.0.1:5173/film/output/revision-03/preview.html.

Film dependencies and type checking are isolated under `film/` so the public build does not require authoring packages. Vite deduplicates React and crawls only the public entry; prerendering uses its own cache to keep a running development preview stable.

The user explicitly authorized staging and a local commit for this corrected iteration. No push or deployment is included.
