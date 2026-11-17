# Video 2 — correction revision 02

This revision corrects the delivered film rather than treating its previous checks as evidence of visual polish.

The five new JPEGs are preserved byte-for-byte in `film/assets`. Their central asset mapping supplies the three square Home gallery posts and every circular thumbnail in the published-post and main-feed views. Supplied profile photographs remain unchanged.

The prior gallery/Posts, profile/feed and return transitions faded text-heavy screens over each other. They now use opaque, clipped horizontal pages. The sidebar and wordmark remain stable outside the moving viewport, page edges stay aligned, and camera magnification is reduced around navigation. Profile tabs have fixed widths, so an active-weight change cannot shift the other tabs. The tab row is 44 source pixels lower than before, leaving separation below the follower information. The comment field and submitted reply are mutually exclusive, and click feedback no longer scales the whole action toolbar.

The complete internal moving proof and separate transition clips were rendered. Gallery/Posts, feed navigation and profile return were inspected in playback, including slow review. Forty-one tests pass, including regression checks for opaque view surfaces, aligned page edges and mutually exclusive comment states.

New output files live in `film/output/video-02-r02/`. The public MP4, WebM and posters use `kanreki-profiles-r02` filenames, and the Section 2 media component is keyed by its source so a source change replaces the old playing element during local hot updates. Previous exports are preserved for comparison. Video 1 is unchanged. No public deployment or remote push is included.

## Render and local verification

The complete 38-second revision was rendered at 1920 × 1080 / 60 fps. Both 2,280-frame delivery exports passed full decoding and loop checks. The encoded MP4 was played through all 38 seconds in the browser and the three view transitions were checked in slow moving clips. The actual homepage was then verified playing `/media/kanreki-profiles-r02.mp4`, muted and looping, beside its existing HTML title and description. No horizontal overflow was present. All 41 tests, film and website type checks, production build and build checks pass. Earlier public delivery files are archived under `film/output/video-02/previous-local-media/`. Corrected work is staged locally; no commit, remote push or public deployment is included.
