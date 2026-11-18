# kanreki | current verification

See [final corrections and evidence](predeployment.md) and [deployment configuration](deployment.md).

Final checks: **107 unit tests** and **32 browser tests** pass. Typecheck, normal build, production-mode local fixture build, output verification and the complete static-asset audit pass. The audit covers 43 files, all below 25 MiB. The three authorized VP9 deliveries are each below 24 MiB, retain 1080p60 and exact frame/timestamp sequences, and decode completely. Their original files remain outside the public deployment output; MP4s, posters and Remotion source are unchanged.

Actual kailor/kanreki modal screenshots and computed values match at 1440, 768, 390 and 320 px. Visual regressions protect initial, focused and validation states; source-reference sending-state comparisons use mocked requests. One actual shared EmailJS request was verified OK in provider history, including subject and parameter mapping, and the owner confirmed inbox receipt.

Release checks intentionally fail for actual external gates only: refreshed Cloudflare Pages authorization, a real verified production hostname, the shared account's locked production-origin controls and owner/legal review. Nothing was pushed or deployed. Full evidence, exact sizes, hashes and command results are linked from `docs/predeployment.md`.
