# Kanreki hero production

The corrected Revision 04 film is fully rendered and integrated into Section 1 locally. It is 60 seconds, 1920 × 1080, 60 fps, silent, with H.264 MP4 and VP9 WebM delivery exports plus desktop/mobile PNG posters.

The opening has seven additional seconds, a named returning-user welcome and a coordinated camera/ avatar transition into the existing publishing workspace. Camera and typing pans now use continuous paths. The publishing sequence adds supplied-image selection, bold formatting, an embedded link and the referenced feed controls. A white edge matte and localized modal shadows remove the rectangular video boundary.

The hero exposes one “account access” CTA after the first playback loop. It uses the existing restricted `/create-account` route. Reduced motion, static mobile presentation and failed autoplay expose the CTA immediately.

The source lives in `film/src`; reproducible Remotion rendering and integration commands are documented in `film/REVISION-04.md`. All supplied assets and prior film outputs remain preserved. The current delivery files live in `public/media`, while masters and internal review material remain ignored under `film/output`.

The public Vite configuration deduplicates React and limits dependency crawling to the website entry. Film authoring retains its own isolated rendering dependencies. The prerenderer uses a separate cache so building does not invalidate a running development preview.

No Section 2 film, push or deployment is included in this revision.
