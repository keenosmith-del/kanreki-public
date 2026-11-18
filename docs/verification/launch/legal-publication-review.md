# Public-site legal publication review | 18 November 2026

Scope: the public marketing website only; no account backend, subscription, publishing agreement or operational application terms. Owner authorization permits publication once factual gaps are resolved. No independent lawyer review is claimed.

## Facts requiring owner confirmation

- Responsible operator/legal name and public service/postal address. The brand and shared ownership description do not establish a legal entity or address.
- Actual enquiry mailbox retention/deletion practice and any retention duties. No automatic deletion schedule is implemented in the public frontend.
- Separate acceptance of shared EmailJS residual abuse/quota risk without a provider origin allowlist.

## Verified implementation

- Cloudflare Pages serves the site. CSP permits only self-hosted scripts/assets plus api.emailjs.com for enquiries.
- Contact fields: name (100 characters), email (254), message (3,000). EmailJS forwards the existing fixed template through Zoho; request history includes fields and technical metadata. There is no separate kanreki contact database.
- Contact submission has validation, a hidden honeypot, an in-memory pending guard and ten-second cooldown. These client controls are bypassable. Fixed recipient and template are unchanged.
- EmailJS signed-in dashboard: 3/200 requests used, 197 remaining; Domains Save control locked, no origins listed, non-browser API unchecked. No settings were changed.
- Fresh browser audit across home, legal and contact routes, including an unsent draft: no cookies, localStorage or sessionStorage entries; only same-origin requests. No application analytics, advertising or social embeds. SDK rate-storage path is inactive because throttle is not configured; the application cooldown is in memory.
- Cloudflare security cookies are conditional on its protections/challenges and must not be categorically ruled out. Ordinary tested requests did not set them.
- Enquiries can be processed internationally. Exact mailbox location and retention cannot be inferred from the frontend.

## Proposed terms content

This website introduces the developing kanreki publishing and social platform, established in 2020. Demonstrations show intended features; public accounts and registration remain restricted. Browsing or sending an enquiry does not create an account, publishing agreement, subscription or paid engagement.

Visitors may browse, link to and use the website for lawful personal or business information. Do not disrupt the website, evade security controls, send spam, misuse the enquiry form or attempt unauthorized access.

The website's identity, original text and original interface demonstrations belong to their respective rights holders. Third-party photographs, artwork, marks and linked materials remain subject to their owners' rights. No general licence to reuse them is granted. Rights permitted by law are unaffected.

External links lead to independently operated websites whose terms and privacy practices apply. A link does not guarantee their content, safety or availability.

We aim to keep information accurate, but features and availability may change. The public material is general information, not professional advice or a guarantee of future access. We do not promise uninterrupted or error-free availability. Nothing excludes rights, duties or liability that applicable law does not permit us to exclude; no exclusion is claimed for fraud or deliberate unlawful conduct.

Use the enquiry form for website questions and privacy requests. Provide accurate contact details and avoid confidential credentials or sensitive information. Delivery depends on EmailJS and the connected provider; an on-screen confirmation records provider acceptance, not a promise of response time.

Future publishing application accounts, content rights, moderation and services will require separate terms. These public website terms do not replace those terms. South African law and jurisdiction wording awaits confirmation of the actual operator's location.

## Source references checked

- POPIA, sections 14, 18, 19 and 72: https://www.treasury.gov.za/POPIA/POPI%20Act%204%20of%202013.pdf
- EmailJS privacy and request metadata: https://www.emailjs.com/legal/privacy-policy/
- EmailJS public API send limit: https://www.emailjs.com/docs/rest-api/send/
- Shared quota and plan capabilities: https://www.emailjs.com/pricing/
- Cloudflare end-user handling: https://www.cloudflare.com/privacypolicy/
- Conditional security cookies: https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/
- Zoho privacy: https://www.zoho.com/privacy.html

This record preserves unresolved facts explicitly; it is not an approval or compliance certification.
