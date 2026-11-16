import { useEffect, useRef } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router';
import { Header, Footer } from './components/Navigation';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { About, Contact, Legal, NotFound } from './pages/Information';
import { canonical, pageMetadata } from './seo';

function PageEffects() {
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);
  useEffect(() => {
    const metadata = pageMetadata(pathname);
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="robots"]')?.setAttribute('content', metadata.index ? 'index, follow' : 'noindex, follow');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical(pathname));
    for (const [property, value] of Object.entries({ 'og:title': metadata.title, 'og:description': metadata.description, 'og:url': canonical(pathname), 'twitter:title': metadata.title, 'twitter:description': metadata.description })) document.querySelector(`meta[property="${property}"],meta[name="${property}"]`)?.setAttribute('content', value);
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
  return <><a className="public-skip" href="#main-content">skip to content</a><PageEffects /><Routes>
    <Route element={<PublicLayout />}><Route index element={<Home />} /><Route path="about" element={<About />} /><Route path="contact" element={<Contact />} />
      <Route path="privacy" element={<Legal page="privacy" />} /><Route path="terms" element={<Legal page="terms" />} /><Route path="cookies" element={<Legal page="cookies" />} /><Route path="*" element={<NotFound />} /></Route>
    <Route path="sign-in" element={<Auth />} /><Route path="create-account" element={<Auth signup />} />
  </Routes></>;
}
