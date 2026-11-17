import type { MediaSpec } from './components/MediaSlot';
import hero from './hero-production.json';
import preview from './hero-preview.json';
const heroSources = hero.ready ? {src:hero.src,webm:hero.webm,poster:hero.poster,mobilePoster:hero.mobilePoster}
  : import.meta.env.DEV && import.meta.env.VITE_HERO_PREVIEW === 'true' && preview.ready ? {src:preview.src,poster:preview.poster} : {};
// Activated only after rendered-media validation and visual review gates.
export const media = {
  introduction: { id: 'introduction', label: 'introduction / film pending', kind: 'video', ratio: '16 / 9', alt: 'kanreki. read. write. everything.', loop: true, ...heroSources },
  feed: { id: 'feed', label: 'profiles and feed interactions', kind: 'video', ratio: '16 / 10', alt: 'Exploring Keeno Smith’s profile, photographic posts, published articles and feed conversations', src: '/media/kanreki-profiles-r03.mp4', webm: '/media/kanreki-profiles-r03.webm', poster: '/media/kanreki-profiles-r03-poster.png', mobilePoster: '/media/kanreki-profiles-r03-mobile.png', loop: true },
  social: { id: 'social', label: 'ai-assisted drafting and editing', kind: 'video', ratio: '16 / 10', alt: 'Drafting an article with AI, revising selected passages, adding an image and publishing to the feed', src: '/media/kanreki-drafting.mp4', webm: '/media/kanreki-drafting.webm', poster: '/media/kanreki-drafting-poster.png', loop: true },
  profile: { id: 'profile', label: 'reading articles and discussions', kind: 'video', ratio: '16 / 10', alt: 'Opening an article from the feed, reading it, liking comments, resharing and joining the discussion', src: '/media/kanreki-reading.mp4', webm: '/media/kanreki-reading.webm', poster: '/media/kanreki-reading-poster.png', mobilePoster: '/media/kanreki-reading-mobile.png', loop: true },
  writing: { id: 'writing', label: 'search and saved content', kind: 'video', ratio: '16 / 10', alt: 'Searching articles, images and people, saving an article and reopening it from saved posts', src: '/media/kanreki-search.mp4', webm: '/media/kanreki-search.webm', poster: '/media/kanreki-search-poster.png', mobilePoster: '/media/kanreki-search-mobile.png', loop: true },
  closing: { id: 'closing', label: 'closing / film pending', kind: 'video', ratio: '16 / 9', alt: 'Read something new. Write something of your own.', loop: true },
} satisfies Record<string, MediaSpec>;
