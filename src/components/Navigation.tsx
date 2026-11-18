import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import {CookieIcon} from './CookieIcon';
import { Brand } from './Brand';

export const mainLinks = [
  { to: '/', label: 'home' }, { to: '/about', label: 'about' },
  { to: '/contact', label: 'contact' },
  { to: 'https://www.linkedin.com/company/kailor/', label: 'linkedin' },
] as const;
export function SiteLink({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) {
  return to.startsWith('https:') ? <a className={className} href={to} target="_blank" rel="noopener noreferrer">{children}</a>
    : <NavLink end className={className} to={to}>{children}</NavLink>;
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 8);
    const query = matchMedia('(max-width: 760px)');
    const close = () => setOpen(false);
    scroll(); window.addEventListener('scroll', scroll, { passive: true }); query.addEventListener('change', close);
    return () => { window.removeEventListener('scroll', scroll); query.removeEventListener('change', close); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); toggle.current?.focus(); }
    };
    const outside = (e: PointerEvent) => { if (!header.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('keydown', escape); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  function menuKeys(e: KeyboardEvent<HTMLElement>) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>('a'));
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    links[e.key === 'Home' ? 0 : e.key === 'End' ? links.length - 1 : (index + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length]?.focus();
  }
  return <header ref={header} className={`site-header${scrolled ? ' is-scrolled' : ''}`}
    onBlur={e => { if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
    <div className="site-header-row">
      <Brand linked className="site-header-brand" />
      <nav className="site-desktop-navigation" aria-label="main navigation">{mainLinks.map(l => <SiteLink key={l.to} to={l.to}>{l.label}</SiteLink>)}</nav>
      <div className="site-account-actions">
        <Link to="/sign-in" className="site-sign-in">sign in</Link><Link to="/create-account" className="site-sign-up">sign up</Link>
        <button ref={toggle} className="site-mobile-toggle" aria-label={open ? 'close menu' : 'open menu'} aria-expanded={open} aria-controls="site-mobile-panel"
          onClick={() => setOpen(!open)} onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); requestAnimationFrame(() => header.current?.querySelector<HTMLAnchorElement>('#site-mobile-panel a')?.focus()); } }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 8h16M4 16h16" />}</svg>
        </button>
      </div>
    </div>
    {open && <nav id="site-mobile-panel" className="site-mobile-panel" aria-label="mobile navigation" onKeyDown={menuKeys} onClick={() => setOpen(false)}>
      {mainLinks.map(l => <SiteLink key={l.to} to={l.to}>{l.label}</SiteLink>)}<Link to="/sign-in">sign in</Link><Link to="/create-account">sign up</Link>
    </nav>}
  </header>;
}
export function LegalRow() {
  return <div className="site-footer-bottom"><span>© {new Date().getFullYear()} kanreki</span><nav className="site-footer-legal" aria-label="legal">{['privacy', 'terms', 'cookies'].map(p => <Link key={p} to={`/${p}`}>{p==='cookies'&&<CookieIcon/>}{p}</Link>)}</nav></div>;
}
export function Footer({ auth = false }: { auth?: boolean }) {
  if (auth) return <footer className="site-footer auth-footer"><div className="site-footer-inner"><LegalRow /></div></footer>;
  const groups = [
    { title: 'publication', links: mainLinks.slice(0, 2) },
    { title: 'account', links: [{ to: '/sign-in', label: 'sign in' }, { to: '/create-account', label: 'sign up' }] },
    { title: 'connect', links: mainLinks.slice(2) },
  ];
  return <footer className="site-footer cinema-footer"><div className="site-footer-inner"><div className="site-footer-groups">{groups.map(g => <nav key={g.title} aria-label={`${g.title} footer`} className="site-footer-group"><h2>{g.title}</h2>{g.links.map(l => <SiteLink key={l.to} to={l.to}>{l.label}</SiteLink>)}</nav>)}</div>
    <LegalRow /></div></footer>;
}
