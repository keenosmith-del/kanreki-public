# Video 2 — revision 03

Profile Home retains its current three images: Kili, web-sloth studio and the pink Aries image. The gallery is left-aligned with the profile content and tab margin, without its previous automatic side inset.

Profile Posts uses the earlier portrait and weather-interface assets. The main feed uses seven other supplied images. No image is shared across Home, Profile Posts or the main feed, and no main-feed image is repeated. The twelve files were checked by both path and SHA-256 hash. Profile articles are independent from the feed article list.

The feed remains populated through the final scroll. The repost action targets its sixth unique article at the original time, preserving all four interactions and the 38-second duration. Revision 02’s opaque clipped view transitions remain unchanged.

The Section 2 HTML copy is exactly:

**profiles and feed interactions**

View user profiles, browse published photographs and articles, and navigate between personal posts and the main feed. Interact with content through likes, comments, reposts and saved posts.

The complete film is rendered at 1920 × 1080 / 60 fps. Production filenames use `kanreki-profiles-r03` so the local browser cannot continue playing the previous revision under the same URL. Prior exports and staged changes are preserved under `film/output`. Video 1 is unchanged.

## Verification and local preview

MP4 and WebM contain 2,280 frames at 1920 × 1080 / 60 fps and run for 38 seconds. Both fully decode and pass first/last-frame continuity checks. The encoded film was reviewed in playback, including the separate Profile Posts imagery and the populated final feed/repost view. The actual local homepage was verified playing `/media/kanreki-profiles-r03.mp4`, muted and looping, beside the exact supplied title and description. All 43 tests, film type checking, production build and build checks pass. Earlier local R02 delivery assets are archived in `film/output/video-02-r02/previous-local-media/`. Updated work is staged, with no commit, remote push or deployment.
