import { Link } from 'react-router';
import { Brand } from '../components/Brand';
import { MediaSlot } from '../components/MediaSlot';
import { media } from '../media';

const features = [
  { spec: media.feed, title: 'everything in one feed', description: 'Browse posts and articles, explore different subjects, search for what interests you and keep the content you want to return to.' },
  { spec: media.social, title: 'more than reading', description: 'Like, comment on and share posts, follow people and join conversations around what you read.' },
  { spec: media.profile, title: 'your own space to publish', description: 'Create a profile, publish articles and images, and bring your writing together in one place.' },
  { spec: media.writing, title: 'a little assistance when you need it', description: 'Planned writing tools will help you refine wording, explore alternatives and improve a draft while keeping control of what you publish.', note: 'Writing assistance is planned. Public application access is not yet open.' },
];
export function Home() {
  return <div className="cinema-home">
    <section className="introduction" aria-labelledby="intro-title">
      <MediaSlot spec={media.introduction} className="hero-media"><div className="type-hero-lockup"><h1 id="intro-title"><Brand /></h1><p>A place to read, write and share perspectives on anything. Public application access is not yet open.</p></div></MediaSlot>
    </section>
    {features.map(f => <section key={f.spec.id} className="cinema-editorial" aria-labelledby={`${f.spec.id}-title`}><div className="cinema-copy"><h2 id={`${f.spec.id}-title`}>{f.title}</h2><p>{f.description}</p>{f.note && <p className="feature-note">{f.note}</p>}</div><MediaSlot spec={f.spec} /></section>)}
    <section className="persistent-closing" aria-labelledby="closing-title"><MediaSlot spec={media.closing} className="closing-media"><div className="persistent-closing-content"><h2 id="closing-title"><Brand /></h2><p>Read something new.<br className="mobile-break" /> Write something of your own.</p><Link className="button" to="/create-account">account access</Link><span className="access-note">Public registration is not yet open.</span></div></MediaSlot></section>
  </div>;
}
