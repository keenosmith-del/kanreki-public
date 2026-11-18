import { useEffect, useRef } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router';
import { Header, Footer } from './components/Navigation';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { About, Contact, Legal, NotFound } from './pages/Information';
import {ContactProvider} from './components/contact/ContactProvider';
import { canonical, pageMetadata, robotsFor, socialImage, socialImageAlt, origin } from './seo';

function PageEffects() {
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);
  useEffect(() => {
    const metadata = pageMetadata(pathname);
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="robots"]')?.setAttribute('content', robotsFor(pathname));
    const url = canonical(pathname);
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (url) {
      if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.append(link); }
      link.href = url;
    } else link?.remove();
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (url) {
      if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property', 'og:url'); document.head.append(ogUrl); }
      ogUrl.content = url;
    } else ogUrl?.remove();
    for (const [property, value] of Object.entries({ 'og:title': metadata.title, 'og:description': metadata.description, 'twitter:title': metadata.title, 'twitter:description': metadata.description, 'og:image': origin?origin+socialImage:socialImage, 'twitter:image':origin?origin+socialImage:socialImage, 'og:image:alt':socialImageAlt, 'twitter:image:alt':socialImageAlt })) document.querySelector(`meta[property="${property}"],meta[name="${property}"]`)?.setAttribute('content', value);
    if (lastPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true });
    }
    lastPath.current = pathname;
  }, [pathname]);
  return null;
}
function PublicLayout() {
  return <><Header /><main id="main-content" tabIndex={-1}><Outlet /></main><Footer /></>;
}
export function App() {
  return <ContactProvider><a className="public-skip" href="#main-content">skip to content</a><PageEffects /><Routes>
    <Route element={<PublicLayout />}><Route index element={<Home />} /><Route path="about" element={<About />} /><Route path="contact" element={<Contact />} />
      <Route path="privacy" element={<Legal page="privacy" />} /><Route path="terms" element={<Legal page="terms" />} /><Route path="cookies" element={<Legal page="cookies" />} /><Route path="*" element={<NotFound />} /></Route>
    <Route path="sign-in" element={<Auth />} /><Route path="create-account" element={<Auth signup />} />
  </Routes></ContactProvider>;
}
