import { Link } from 'react-router';
import {ContactLink} from '../components/contact/ContactProvider';
export function About() {
  return <article className="information-page"><h1>A place for<br />more perspectives.</h1><div className="information-copy"><p>Established in 2020, kanreki is an independent publishing and social platform for articles, images and perspectives on any subject. Its editorial scope extends beyond AI and technology.</p><p>It is being developed independently as a publishing platform: somewhere to read, write, share and find a conversation worth joining.</p><h2>One team. A distinct purpose.</h2><p>The team and ownership behind kanreki are shared with <a href="https://kailor.co.za/" target="_blank" rel="noopener noreferrer">kailor</a>, the technology consultancy. The publication has its own editorial purpose, separate from consultancy services. Contributors’ opinions do not necessarily represent kailor.</p><h2>Preparing to open.</h2><p>The publishing application is not yet open for public sign-in or registration. This website introduces the platform as it develops.</p><ContactLink className="text-link">get in touch</ContactLink></div></article>;
}
export function Contact() {
  return <article className="information-page"><h1>Let’s talk.</h1><div className="information-copy"><p>Contact the kanreki team about the publication, articles, images, the public website or future publishing-platform access.</p><p>Use the enquiry form for general questions, feedback and privacy requests. Include enough detail for the team to understand your request; avoid passwords or sensitive account information.</p><ContactLink className="button">open enquiry form</ContactLink><p className="contact-disclosure">The form asks for your name, email address and message. Delivery is handled by EmailJS when configured. This public website does not provide account support for an operational publishing platform.</p></div></article>;
}
const policies = {
  privacy: { title: 'privacy', sections: [
    ['This public website', 'This site introduces kanreki. It has no account backend and does not accept or store credentials. Both account forms are disabled. No analytics, advertising scripts or tracking pixels are included in this version.'],
    ['When you contact us', 'The enquiry form asks for your name, email address and message. When you press send and delivery is configured, these details are transmitted to EmailJS and the connected email service so the team can receive and respond to your enquiry. EmailJS also records request metadata such as browser and device information, IP-related information, approximate country and the referring page. Do not include passwords or sensitive information. The form does not save your message in browser storage; an unsent draft exists only in memory while the dialog is open.'],
    ['Hosting and external services', 'Cloudflare Pages hosts this public website and may process request information, including IP addresses and browser details, to deliver and secure it. EmailJS and the connected email provider process submitted enquiries under their own terms and practices. LinkedIn and kailor links open external services; their privacy practices apply there. No social embeds or analytics scripts are included.'],
    ['Before application access opens', 'The publishing application will need its own reviewed information covering accounts, published content, retention, moderation and any AI processing. This draft does not cover that future service. Use the contact form for questions or privacy requests. The responsible entity, enquiry retention and any international transfers must be confirmed with the owner and providers before public launch.'],
  ] },
  terms: { title: 'terms', sections: [
    ['Scope', 'This public website describes kanreki, a publishing platform being developed by the team behind kailor. It does not provide access to the publishing application. Sign-in and registration remain restricted.'],
    ['Information and availability', 'Feature descriptions explain the intended platform experience, not a promise that public access or every capability is available. Writing assistance is planned. No launch date, service availability or commercial agreement is offered by browsing this website.'],
    ['Editorial independence', 'kanreki has a publication purpose distinct from kailor’s consultancy services. A contributor’s views do not necessarily represent the team or kailor.'],
    ['Future participation', 'Publishing, content rights, moderation, account rules and any commercial terms must be reviewed and supplied before public application access opens. These draft notes are not a complete agreement for that future application. Use the contact form for questions about these draft terms. The public site does not create a publishing-platform account or contract for a future service.'],
  ] },
  cookies: { title: 'cookies', sections: [
    ['Current site behaviour', 'The public-site application does not set cookies or write to localStorage or sessionStorage. Contact-field values are held in memory, not persisted by this application. It includes no analytics, advertising or embedded social tracking. Disabled account forms do not create a session.'],
    ['Hosting infrastructure', 'Hosting and security services may have their own request handling or cookies depending on deployment configuration. That configuration must be audited before publication; no specific infrastructure cookie inventory has been verified yet.'],
    ['External links and future changes', 'The contact form connects to EmailJS only when a visitor submits an enquiry. It uses an in-memory duplicate-submission guard and cooldown, not tracking cookies or persistent browser storage. LinkedIn and kailor links open external services; their practices apply there. Any later analytics, account access, embedded media or other storage must be assessed and this notice updated before being enabled.'],
  ] },
} as const;
export type Policy = keyof typeof policies;
export function Legal({ page }: { page: Policy }) {
  const policy = policies[page];
  return <article className="legal-document"><h1>{policy.title}</h1><p className="review-notice">Working draft | awaiting owner and legal review before publication.</p>{policy.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<ContactLink>contact the team</ContactLink></article>;
}
export function NotFound() {
  return <article className="information-page not-found"><h1>This page isn’t here.</h1><p>The address may have changed, or the page may not exist.</p><Link className="button" to="/">back to home</Link></article>;
}
