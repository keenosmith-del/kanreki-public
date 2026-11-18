import { Link, useLocation } from 'react-router';
import { useState, useCallback, useEffect } from 'react';
import { Brand } from '../components/Brand';
import { MediaSlot } from '../components/MediaSlot';
import { media } from '../media';

const features = [
  { spec: media.feed, title: 'profiles and feed interactions', description: 'View user profiles, browse published photographs and articles, and navigate between personal posts and the main feed. Interact with content through likes, comments, reposts and saved posts.' },
  { spec: media.social, title: 'ai-assisted drafting and editing', description: 'Describe what you want to write and generate a draft. Revise selected passages with AI suggestions, format your content, add images and review the finished article before publishing.', cta: 'try it out' },
  { spec: media.profile, title: 'reading articles and discussions', description: 'Open articles from the feed to read the full content, view responses from other readers, like comments, reshare posts and contribute to the discussion.' },
  { spec: media.writing, title: 'search and saved content', description: 'Search articles, photographs and people, filter results by content type, and save posts to return to later.' },
];
export function Home() {
  const {hash}=useLocation();
  useEffect(()=>{
    if(!['#profiles','#drafting','#reading','#search-saved','#closing'].includes(hash))return;
    const timer=window.setTimeout(()=>document.getElementById(hash.slice(1))?.scrollIntoView({block:'start'}),150);
    return()=>window.clearTimeout(timer);
  },[hash]);
  const [accountReady,setAccountReady]=useState(false);
  const revealAccounts=useCallback(()=>setAccountReady(true),[]);
  const [closingReady,setClosingReady]=useState(false);
  const revealClosing=useCallback(()=>setClosingReady(true),[]);
  return <div className="cinema-home">
    <section className="introduction" aria-labelledby="intro-title">
      <h1 id="intro-title" className="cinema-sr">kanreki.</h1>
      <MediaSlot spec={media.introduction} className="hero-media" onFirstCycle={revealAccounts} onFallback={revealAccounts}><div className="hero-static-lockup"><Brand /><p>read. write. everything.</p><span>Publish articles, share photographs and join conversations around what interests you.</span></div></MediaSlot>
      <div className={`hero-account-actions${accountReady?' is-visible':''}`} aria-hidden={!accountReady}>
        <Link className="button" to="/create-account" tabIndex={accountReady?0:-1}>account access</Link>
      </div>
    </section>
    {features.map(f => <section key={f.spec.id} id={f.spec.id==='feed'?'profiles':f.spec.id==='social'?'drafting':f.spec.id==='profile'?'reading':f.spec.id==='writing'?'search-saved':undefined} className={`cinema-editorial${['social','writing'].includes(f.spec.id)?' cinema-editorial--media-left':''}`} aria-labelledby={`${f.spec.id}-title`}><div className="cinema-copy"><h2 id={`${f.spec.id}-title`}>{f.title}</h2><p>{f.description}</p>{f.cta && <Link className="button feature-cta" to="/create-account">{f.cta}</Link>}</div><MediaSlot key={'src' in f.spec&&typeof f.spec.src==='string'?f.spec.src:f.spec.id} spec={f.spec} /></section>)}
    <section id="closing" className="persistent-closing" aria-labelledby="closing-title">
      <h2 id="closing-title" className="cinema-sr">kanreki. read. write. everything.</h2>
      <MediaSlot spec={media.closing} className="closing-media" requireFullPlayback onFirstCycle={revealClosing} onFallback={revealClosing}>
        <div className="persistent-closing-content"><Brand /><p>read. write. everything.</p></div>
      </MediaSlot>
      <div className="closing-access">
        <div className={`closing-account-actions${closingReady?' is-visible':''}`} aria-hidden={!closingReady}>
          <Link className="button" to="/sign-in" tabIndex={closingReady?0:-1}>sign in</Link>
          <Link className="button" to="/create-account" tabIndex={closingReady?0:-1}>create account</Link>
        </div>
        <span className="access-note">Public registration is not yet open.</span>
      </div>
    </section>
  </div>;
}
