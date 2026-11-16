# Six deferred media slots

No final platform screenshots, films, mock platform graphics, stock media or copied consultancy films are included. Current filename suggestions are documentation only; no broken URLs are emitted. All slots live in `src/media.ts`.

| Slot | Future path | Suggested size | Ratio | Playback |
| --- | --- | --- | --- | --- |
| introduction | `/media/introduction.mp4` | 1920 × 1080 | 16:9; viewport-contained hero | Play once, hold final decoded frame |
| feed | `/media/feed.webp` | 1600 × 1000 | 16:10 | Actual application screenshot |
| social | `/media/social.mp4` | 1600 × 1000 | 16:10 | Muted inline loop |
| profile | `/media/profile.webp` | 1600 × 1000 | 16:10 | Actual application screenshot |
| writing | `/media/writing.mp4` | 1600 × 1000 | 16:10 | Muted inline loop, only after features exist |
| closing | `/media/closing.mp4` | 1920 × 1080 | 16:9; viewport-contained closing | Muted inline loop |

For videos, supply an approved final-frame or suitable static poster at `/media/<slot>-poster.webp`. Add `src` and optional `poster` only after files are present. All assets are served from this site's origin. Images and video use contain-fit to preserve the full interface. Preserve the existing slot dimensions and copy placement when replacing media.

The video component requests `play()` once on loaded data, sets muted/playsInline, defaults loop to false, has no controls, does not seek or remove an ended hero and guards repeated loaded events/rerenders. Reduced motion leaves static content/poster, autoplay rejection or decoding failure returns to static fallback, and failed images leave the quiet placeholder. Preference changes never force an automatic replay. No video network requests occur in this iteration.

## Iteration 002 — introduction only

1. Reinspect the real Insider interface and confirm the approved opening story; use real code-rendered platform views and neutral demonstration content. Do not claim public availability.
2. Build only Section 1's cinematic sequence, matching kailor's camera movement, zooms and monochrome typography. Keep the final message readable on mobile. No consultancy claims, mascot, decorative arrows or fabricated interactions.
3. Encode the approved film and static fallback. Supply actual assets and check sizes/duration/decoding before adding manifest paths.
4. Set `src`, `poster`, `loop:false` for introduction. Preserve six sections and retain a semantic introduction heading when the visual fallback is replaced.
5. Verify first play, final-frame hold, unrelated rerenders, route navigation, autoplay blocking, decoding errors, reduced motion and mobile cropping. Visiting a new route and returning creates a new page visit; unrelated local renders must not restart playback.
6. Capture website QA screenshots separately from final platform media. Leave the other five media slots unchanged.
