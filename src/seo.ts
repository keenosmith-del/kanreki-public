// No hostname is invented for local builds or the unconnected future domain.
export const origin: string = import.meta.env.VITE_SITE_ORIGIN || '';
export const pages = {
  '/': { title: 'kanreki — read, write and share perspectives', description: 'An independent publishing platform for posts, articles and perspectives on any subject. From the team behind kailor. Public access is not yet open.', index: false },
  '/about': { title: 'about — kanreki', description: 'Established in 2020, kanreki is an independent publishing and social platform for articles, images and perspectives on any subject.', index: false },
  '/contact': { title: 'contact — kanreki', description: 'Contact the kanreki team about the publication and future access.', index: false },
  '/sign-in': { title: 'sign in — kanreki', description: 'Public sign-in to kanreki is currently restricted.', index: false },
  '/create-account': { title: 'create account — kanreki', description: 'Public registration for kanreki is currently restricted.', index: false },
  '/privacy': { title: 'privacy — kanreki', description: 'Draft privacy information for the kanreki public website, pending review.', index: false },
  '/terms': { title: 'terms — kanreki', description: 'Draft terms for the kanreki public website, pending review.', index: false },
  '/cookies': { title: 'cookies — kanreki', description: 'Current cookie and storage behaviour of the kanreki public website. Draft pending review.', index: false },
} as const;
export function pageMetadata(path: string) {
  const normalised = path.replace(/\/$/, '') || '/';
  return pages[normalised as keyof typeof pages] ?? { title: 'page not found — kanreki', description: 'This page could not be found.', index: false };
}
export function canonical(path: string) {
  const normalised = path.replace(/\/$/, '') || '/';
  return origin && Object.hasOwn(pages, normalised) ? origin + normalised : '';
}
export const structuredData = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': `${origin}/#website`, ...(origin ? { url: `${origin}/` } : {}), name: 'kanreki', alternateName: 'kanreki.', description: pages['/'].description, publisher: { '@id': `${origin}/#organization` } },
    { '@type': 'Organization', '@id': `${origin}/#organization`, name: 'kanreki', foundingDate: '2020', ...(origin ? { url: `${origin}/` } : {}), description: 'Independent publishing and social platform from the team behind kailor, the technology consultancy.' },
    { '@type': 'Organization', '@id': 'https://kailor.co.za/#organization', name: 'kailor', url: 'https://kailor.co.za/' },
  ],
};
