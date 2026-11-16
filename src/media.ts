import type { MediaSpec } from './components/MediaSlot';
// No src/poster until reviewed assets exist. Intended paths are documented in docs/media.md.
export const media = {
  introduction: { id: 'introduction', label: 'introduction / film pending', kind: 'video', ratio: '16 / 9', alt: 'An introduction to kailor insider', loop: false },
  feed: { id: 'feed', label: 'publication interface / visual pending', kind: 'image', ratio: '16 / 10', alt: 'The publication feed and search' },
  social: { id: 'social', label: 'social interactions / film pending', kind: 'video', ratio: '16 / 10', alt: 'Reading and responding to a post', loop: true },
  profile: { id: 'profile', label: 'profiles and publishing / visual pending', kind: 'image', ratio: '16 / 10', alt: 'A writer’s profile and published work' },
  writing: { id: 'writing', label: 'writing assistance / demonstration pending', kind: 'video', ratio: '16 / 10', alt: 'A planned writing assistance demonstration', loop: true },
  closing: { id: 'closing', label: 'closing / film pending', kind: 'video', ratio: '16 / 9', alt: 'Read something new. Write something of your own.', loop: true },
} satisfies Record<string, MediaSpec>;
