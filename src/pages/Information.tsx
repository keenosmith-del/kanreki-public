import { Link } from 'react-router';
export function About() {
  return <article className="information-page"><h1>A place for<br />more perspectives.</h1><div className="information-copy"><p>kailor insider began with an editorial focus on AI and emerging technology. Today, it welcomes posts, articles and viewpoints on any subject.</p><p>It is being developed independently as a publishing platform: somewhere to read, write, share and find a conversation worth joining.</p><h2>One team. A distinct purpose.</h2><p>The team and ownership behind insider are shared with <a href="https://kailor.co.za/">kailor</a>, the technology consultancy. The publication has its own editorial purpose, separate from consultancy services. Contributors’ opinions do not necessarily represent kailor.</p><h2>Preparing to open.</h2><p>The publishing application is not yet open for public sign-in or registration. This website introduces the platform as it develops.</p><Link className="text-link" to="/contact">get in touch</Link></div></article>;
}
export function Contact() {
  return <article className="information-page"><h1>Let’s talk.</h1><div className="information-copy"><p>For questions about kailor insider, the publication or future access, email the team.</p><a className="contact-email" href="mailto:keenosmith@kailor.co.za?subject=kailor%20insider%20enquiry">keenosmith@kailor.co.za</a><p className="contact-disclosure">This is the team’s existing kailor contact address, used here for insider enquiries. This link opens your email application.</p></div></article>;
}
const policies = {
  privacy: { title: 'privacy', sections: [
    ['This public website', 'This site introduces kailor insider. It has no account backend and does not accept or store credentials. Both account forms are disabled. No analytics, advertising scripts or tracking pixels are included in this version.'],
    ['When you contact us', 'An email link opens your own email service. Any message you choose to send may contain your name, email address and enquiry. The team uses it to respond. This website does not submit a contact form or retain a copy in browser storage.'],
    ['Hosting and external services', 'The hosting provider may process request information such as IP addresses and browser details to deliver and secure the site. Links to LinkedIn and kailor take you to services with their own privacy practices. No social embeds are loaded here.'],
    ['Before application access opens', 'The publishing application will need its own reviewed information covering accounts, published content, retention, moderation and any AI processing. This draft does not cover that future service. Questions or privacy requests can be sent to keenosmith@kailor.co.za.'],
  ] },
  terms: { title: 'terms', sections: [
    ['Scope', 'This public website describes kailor insider, a publishing platform being developed by the team behind kailor. It does not provide access to the publishing application. Sign-in and registration remain restricted.'],
    ['Information and availability', 'Feature descriptions explain the intended platform experience, not a promise that public access or every capability is available. Writing assistance is planned. No launch date, service availability or commercial agreement is offered by browsing this website.'],
    ['Editorial independence', 'Insider has a publication purpose distinct from kailor’s consultancy services. A contributor’s views do not necessarily represent the team or kailor.'],
    ['Future participation', 'Publishing, content rights, moderation, account rules and any commercial terms must be reviewed and supplied before public application access opens. These draft notes are not a complete agreement for that future application. Contact keenosmith@kailor.co.za with questions.'],
  ] },
  cookies: { title: 'cookies', sections: [
    ['Current site behaviour', 'This version does not set application cookies or use localStorage or sessionStorage. It includes no analytics, advertising or embedded social tracking. Disabled account forms do not create a session.'],
    ['Hosting infrastructure', 'Hosting and security services may have their own request handling or cookies depending on deployment configuration. That configuration must be audited before publication; no specific infrastructure cookie inventory has been verified yet.'],
    ['External links and future changes', 'Email, LinkedIn and kailor links open other services. Their practices apply when you use them. Any later analytics, account access, embedded media or other storage must be assessed and this notice updated before being enabled.'],
  ] },
} as const;
export type Policy = keyof typeof policies;
export function Legal({ page }: { page: Policy }) {
  const policy = policies[page];
  return <article className="legal-document"><h1>{policy.title}</h1><p className="review-notice">Draft — awaiting owner and legal review before publication.</p>{policy.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<Link to="/contact">contact the team</Link></article>;
}
export function NotFound() {
  return <article className="information-page not-found"><h1>This page isn’t here.</h1><p>The address may have changed, or the page may not exist.</p><Link className="button" to="/">back to home</Link></article>;
}
