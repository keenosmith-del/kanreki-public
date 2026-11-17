# Public media slots

Section 1 includes the corrected 60-second cinematic hero at 1920 × 1080 / 60 fps, with MP4, WebM and PNG posters. Section 2 includes the 38-second profiles film; Section 3 includes the approved 46-second drafting film; the remaining three slots stay deferred. All slots live in `src/media.ts`.

| Slot | Path / proposed path | Suggested size | Ratio | Playback |
| --- | --- | --- | --- | --- |
| introduction | `/media/kanreki-hero.mp4` | 1920 × 1080 | 16:9; viewport-contained hero | Native continuous loop |
| feed | `/media/kanreki-profiles-r03.mp4` | 1920 × 1080 | 16:10; contained | Muted inline loop |
| social | `/media/kanreki-drafting.mp4` | 1920 × 1080 | 16:10; contained | Muted inline loop |
| profile | `/media/profile.webp` | 1600 × 1000 | 16:10 | Actual application screenshot |
| writing | `/media/writing.mp4` | 1600 × 1000 | 16:10 | Muted inline loop, only after features exist |
| closing | `/media/closing.mp4` | 1920 × 1080 | 16:9; viewport-contained closing | Muted inline loop |

For videos, supply an approved final-frame or suitable static poster at `/media/<slot>-poster.webp`. Add `src` and optional `poster` only after files are present. All assets are served from this site's origin. Images and video use contain-fit to preserve the full interface. Preserve the existing slot dimensions and copy placement when replacing media.

The video component requests `play()` once on loaded data, sets muted/playsInline, defaults loop to false, has no controls, does not seek or remove an ended hero and guards repeated loaded events/rerenders. Reduced motion leaves static content/poster, autoplay rejection or decoding failure returns to static fallback, and failed images leave the quiet placeholder. Preference changes never force an automatic replay. Production video requests remain disabled until reviewed files exist.

## Section 1 cinematic hero implementation

The introduction now has editable React film source and rendering tools in `film/`. See `film/REVISION-04.md` for the current production and verification. Its intended production paths are `public/media/kanreki-hero.mp4`, `kanreki-hero.webm`, `kanreki-hero-poster.png` and `kanreki-hero-mobile.png`.

The introduction uses `loop: true`. The profiles film is also integrated into Section 2; the drafting film is integrated into Section 3; the other three media manifests retain their existing values. Production paths are activated in `src/hero-production.json` after successful full-render validation. No broken production URLs are emitted while files are absent.

The accessible heading and text fallback stay available. The single native “account access” CTA is outside the film, occupies reserved space, and reveals after the first observed playback wrap. It links to the existing `/create-account` route and stays visible on later loops. Reduced motion, mobile static fallback, missing/failed media and rejected autoplay expose account actions immediately. A startup timeout handles a source that never starts. Header account links remain immediately available and the account pages remain restricted.

The source and supplied assets pass local validation. The rendering restriction was resolved using the current unrestricted execution session and the proven Remotion/Chrome workflow. The rejected 72-second film and the earlier 53-second render remain preserved outside production assets. Revision 04 preserves the slower opening and named welcome, smooths camera and line-wrap tracking, adds the referenced feed controls and richer post editing, and blends the video perimeter into the white page canvas.

## Section 2 profiles film

The verified 38-second Video 2 plays on the right of the existing editorial layout, beside the HTML title “profiles and feed interactions” and the approved description. MP4, WebM and PNG posters are served from `/media/kanreki-profiles-r03*`. The existing media component provides muted autoplay, native looping, and static fallback for narrow screens or reduced motion. `/#profiles` opens this section directly. See `film/VIDEO-02.md` for editable source and render commands.

## Section 3 drafting film

The owner-approved 46-second, 1080p60 film plays on the left, with the HTML heading “ai-assisted drafting and editing”, approved description, “try it out” link on the right. The CTA opens the existing restricted `/create-account` route. `/#drafting` opens this section. The approved MP4, WebM and PNG poster are served from `/media/kanreki-drafting*`; reduced motion and failed playback use the poster. Source, supplied assets and rendering workflow are described in `film/VIDEO-03.md`.
