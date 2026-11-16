export const origin = 'https://insider.kailor.co.za';
export const pages = {
  '/': { title: 'kailor insider — read, write and share perspectives', description: 'An independent publishing platform for posts, articles and perspectives on any subject. From the team behind kailor. Public access is not yet open.', index: true },
  '/about': { title: 'about — kailor insider', description: 'From AI and emerging technology to perspectives on any subject. Meet kailor insider, an independent publishing platform from the team behind kailor.', index: true },
  '/contact': { title: 'contact — kailor insider', description: 'Contact the kailor insider team about the publication and future access.', index: true },
  '/sign-in': { title: 'sign in — kailor insider', description: 'Public sign-in to kailor insider is currently restricted.', index: false },
  '/create-account': { title: 'create account — kailor insider', description: 'Public registration for kailor insider is currently restricted.', index: false },
  '/privacy': { title: 'privacy — kailor insider', description: 'Draft privacy information for the kailor insider public website, pending review.', index: false },
  '/terms': { title: 'terms — kailor insider', description: 'Draft terms for the kailor insider public website, pending review.', index: false },
  '/cookies': { title: 'cookies — kailor insider', description: 'Current cookie and storage behaviour of the kailor insider public website. Draft pending review.', index: false },
} as const;
export function pageMetadata(path: string) {
  const normalised = path.replace(/\/$/, '') || '/';
  return pages[normalised as keyof typeof pages] ?? { title: 'page not found — kailor insider', description: 'This page could not be found.', index: false };
}
export function canonical(path: string) { return origin + (path === '/' ? '/' : path.replace(/\/$/, '')); }
export const structuredData = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: 'kailor insider', alternateName: 'kailor.insider', description: pages['/'].description, publisher: { '@id': 'https://kailor.co.za/#organization' } },
    { '@type': 'Organization', '@id': 'https://kailor.co.za/#organization', name: 'kailor', url: 'https://kailor.co.za/' },
  ],
};
