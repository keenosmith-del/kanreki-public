import {linkedin} from './social';
// Only a deliberately verified production origin enables indexing.
export const origin: string = import.meta.env.VITE_SITE_ORIGIN || '';
export const production = import.meta.env.VITE_IS_PRODUCTION === 'true';
export const socialImage = '/social-preview.png';
export const socialImageAlt = 'kanreki. read. write. everything. — independent publishing and social platform';
export const pages = {
  '/': { title: 'kanreki | read. write. everything.', description: 'Independent publishing and social platform for articles, images and conversations. Established in 2020. read. write. everything.', index: true },
  '/about': { title: 'about | kanreki', description: 'Established in 2020, kanreki is an independent publishing and social platform for articles, images and perspectives on any subject.', index: true },
  '/contact': { title: 'contact | kanreki', description: 'Contact the kanreki team about the publication and future access.', index: true },
  '/sign-in': { title: 'sign in | kanreki', description: 'Public sign-in to kanreki is currently restricted.', index: false },
  '/create-account': { title: 'create account | kanreki', description: 'Public registration for kanreki is currently restricted.', index: false },
  '/privacy': { title: 'privacy | kanreki', description: 'Draft privacy information for the kanreki public website, pending review.', index: false },
  '/terms': { title: 'terms | kanreki', description: 'Draft terms for the kanreki public website, pending review.', index: false },
  '/cookies': { title: 'cookies | kanreki', description: 'Current cookie and storage behaviour of the kanreki public website. Draft pending review.', index: false },
} as const;
export function pageMetadata(path: string) {
  const normalised = path.replace(/\/$/, '') || '/';
  const page=pages[normalised as keyof typeof pages] ?? { title: 'page not found | kanreki', description: 'This page could not be found.', index: false };
  return {...page,index:production&&page.index};
}
export function robotsFor(path: string) {
  const normalised=path.replace(/\/$/, '') || '/';
  return Object.hasOwn(pages,normalised) ? (pageMetadata(normalised).index ? 'index, follow' : 'noindex, follow') : 'noindex';
}
export function canonical(path: string) {
  const normalised = path.replace(/\/$/, '') || '/';
  return origin && Object.hasOwn(pages, normalised) ? origin + normalised : '';
}
export const structuredData = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': `${origin ? origin+'/' : ''}#website`, ...(origin ? { url: `${origin}/` } : {}), name: 'kanreki', alternateName: 'kanreki.', description: pages['/'].description, publisher: { '@id': `${origin ? origin+'/' : ''}#organization` } },
    { '@type': 'Organization', '@id': `${origin ? origin+'/' : ''}#organization`, name: 'kanreki', foundingDate: '2020', ...(origin ? { url: `${origin}/` } : {}), description: 'Independent publishing and social platform, established in 2020. Its team and ownership are shared with kailor.', ...(linkedin.verified&&linkedin.url?{sameAs:[linkedin.url]}:{}) },
    { '@type': 'Organization', '@id': 'https://kailor.co.za/#organization', name: 'kailor', url: 'https://kailor.co.za/' },
  ],
};
