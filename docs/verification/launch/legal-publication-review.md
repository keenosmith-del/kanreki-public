# Public-site legal publication review | 18 November 2026

Scope: the public marketing website only; no account backend, subscription, publishing agreement or operational application terms. Owner authorization permits publication once factual gaps are resolved. No independent lawyer review is claimed.

## Owner-confirmed publication facts

The owner confirmed in this chat that Keeno Smith operates the brand personally, without a separate registered entity or business/postal address; residential disclosure is prohibited. The owner adopted a **new** manual policy of 12 months after last relevant correspondence, quarterly review and mailbox deletion when no longer required, subject to legal obligations. No historical or automated deletion practice is claimed. The owner expressly accepted the shared EmailJS configuration without allowlisting and directed publication and indexing.

POPIA section 18(1)(b) calls for name and address of the responsible party. No dedicated public service address exists. The owner requested that this limitation be identified without blocking technical deployment; the notice gives the confirmed operator name and contact form. This is a documented disclosure limitation, not certification that the statutory address disclosure has been fulfilled. No independent lawyer approval is claimed. The separate provider-risk and legal publication decisions are recorded in release-approvals.json.

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

Future publishing application accounts, content rights, moderation and services will require separate terms. These public website terms do not replace those terms. The finalized public terms apply South African law subject to mandatory rights.

## Source references checked

- POPIA, sections 14, 18, 19 and 72: https://www.treasury.gov.za/POPIA/POPI%20Act%204%20of%202013.pdf
- EmailJS privacy and request metadata: https://www.emailjs.com/legal/privacy-policy/
- EmailJS public API send limit: https://www.emailjs.com/docs/rest-api/send/
- Shared quota and plan capabilities: https://www.emailjs.com/pricing/
- Cloudflare end-user handling: https://www.cloudflare.com/privacypolicy/
- Conditional security cookies: https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/
- Zoho privacy: https://www.zoho.com/privacy.html

This record preserves the source of the owner’s publication decision and remaining address-disclosure limitation; it is not an independent legal review or compliance certification.
