# PRD: Alpha Movies Booking and Showcase Site

Status: Draft v0.2 (stress-tested, see section 13) | Date: 2026-10-06 | Builder: Ademola | Client: Boy Concept (operating as Alpha Movies Ltd, led by Emmanuel Feranmi Odeyale)

Living docs: progress is tracked in `ROADMAP.md` and files are mapped in `PROJECT_STRUCTURE.md`. Both are updated on every contribution (see `AGENTS.md`).

Items in [brackets] are unverified or unknown. Never ship a bracketed value to a live page.

## 1. Summary

A fast, dark-mode website for Boy Concept that does three jobs:

1. Turns Instagram DM price-checks into structured, date-first enquiries before they reach WhatsApp.
2. Presents past work in a categorized showcase that holds video quality better than a social feed.
3. Gives corporate and diaspora clients verifiable proof of legitimacy before they commit.

This is not a generic portfolio template. The enquiry flow and the credibility layer are the product. The showcase is supporting content.

## 2. Problem

- Enquiries arrive as unstructured DMs and WhatsApp messages. Many are price checks ("how much for 1 video?") from people who cannot book at his rates. [Assumption A1]
- Past work sits in compressed, hard-to-browse social grids with no categorized place to send a prospect. [A2]
- International brands and diaspora couples want proof beyond an Instagram bio before sending money. [A3]

A1 to A3 come from desk research, not from Emmanuel. Validate them in the first conversation.

## 3. Users

| User | Needs | What they must see before acting |
|---|---|---|
| Event and wedding clients (local) | A fast way to check a date and share scope | Real past work in their category, availability, a starting price |
| Corporate and brand clients | Confidence in a registered, professional vendor | Registration details, equipment, brand collaborations, press |
| Diaspora wedding clients | Trust before sending a deposit from abroad | Same proof as corporate, plus a clear process and response time |
| Owner and team (internal) | Receive complete briefs, keep the site current without a developer | Complete brief per enquiry, simple tools to edit content and block dates |

## 4. Goals and success metrics

| Metric | Target | Baseline |
|---|---|---|
| Enquiries that arrive with date, location and scope | at least 80% [agree with owner] | [ask owner] |
| Price-check DMs per week | down [agree after baseline] | [ask owner] |
| Mobile LCP on 4G | 2.5s or better | n/a |
| Form completion (start to submit) | [set after 30 days of data] | n/a |
| WhatsApp handoff (submit to tap) | [set after 30 days of data] | n/a |

## 5. Scope

In v1:
- Showcase: hero, showreel, categorized portfolio, project pages.
- Credibility: credentials section with a verification gate.
- Enquiry: date-first form with a WhatsApp handoff. Storage and owner email arrive in Phase 1 (section 11).
- Rollout: Instagram bio link, DM saved reply and a direct path for existing clients. Without these the site changes nothing (FR-25).
- Privacy: a notice page reachable from the home page, and a cookie choice before any tracker runs. Section 9 makes this a duty, and ROADMAP L-4, L-6 and P-24 carry the work.

Parked, each with a trigger:

| Item | Build only when |
|---|---|
| Availability picker and blocked dates | The owner commits to updating dates at least weekly, and enquiries for booked dates are a real cost |
| Vertical short-form row | The core showcase is done and he has vertical exports |
| Booking deposit (Phase 2) | v1 has been live for 60 days and the owner asks for it |
| Event-tracking endpoint | GA4 proves insufficient |
| Service and FAQ as CMS collections | That text changes more than quarterly |

Out of scope:
- Budget-tier dropdown or any budget field (decided).
- Client proofing and delivery portal.
- WhatsApp Business API bot or auto-replies.
- Automatic lead scoring.
- Multi-language support.

## 6. Functional requirements

Priority: M = must, S = should, C = could.

### Showcase

| ID | Requirement | P |
|---|---|---|
| FR-1 | Hero with brand statement, primary CTA "Check a date" (scrolls to form), secondary CTA "View showreel" | M |
| FR-2 | Showreel in 16:9. Poster image first, video loads only on tap | M |
| FR-3 | Portfolio grid filterable by Commercial, Cultural Festivals, Weddings, Documentaries. Cards show category tag, title, poster | M |
| FR-4 | Project page: video, client, event, year, location, deliverables, short story | M |
| FR-5 | Vertical short-form row for reels (parked) | C |
| FR-19 | Services section with tag chips, five-step process and FAQ. Written in the page, not in the CMS | S |
| FR-20 | Footer: Instagram, YouTube, WhatsApp, base city, copyright | M |
| FR-26 | Empty states: hide a category chip with no verified projects, and hide the credentials section while it has fewer than [N, agree with owner] verified items | M |

### Credibility and consent

| ID | Requirement | P |
|---|---|---|
| FR-6 | Credentials section: registration details, equipment list, brand collaborations, press mentions. Each item has a verified flag and only verified items render | M |
| FR-7 | Any stat (views, clients, years) renders only with a recorded source and a verified flag | M |
| FR-27 | A project renders only if the owner has marked client permission to show it publicly | M |

### Enquiry

| ID | Requirement | P |
|---|---|---|
| FR-8 | Enquiry form per section 7, date field first | M |
| FR-10 | Visible line "Packages start from ₦[amount]" next to the form, editable by the owner | M |
| FR-11 | No budget field anywhere | M |
| FR-12 | On submit: validate, show a confirmation with reference code and a visible "Open WhatsApp" button carrying the prefilled brief. Phase 1 also stores the enquiry and emails the owner | M |
| FR-13 | Always offer a copyable message beside the button, in case WhatsApp does not open | M |
| FR-14 | Spam protection: honeypot, bot challenge, rate limit by contact (not by IP alone) | M |
| FR-15 | Response-time copy next to submit. Promise only a time someone will actually keep | S |
| FR-21 | Two analytics events: form_submit and whatsapp_tap | S |
| FR-24 | A plain "Already booked with us? Message directly" WhatsApp link, always visible, which works without JavaScript | M |
| FR-28 | Resubmitting the same form (double tap, retry) never creates a second enquiry (Phase 1) | M |

### Owner operations

| ID | Requirement | P |
|---|---|---|
| FR-16 | Owner edits projects, credentials and site settings in the Framer CMS | M |
| FR-17 | Owner marks enquiries handled or spam (Phase 1) | S |
| FR-18 | New-enquiry email within one minute, with the full brief and a reply link. Goes to the owner and, for the first 30 days, to the builder as well (Phase 1) | M |

### Launch

| ID | Requirement | P |
|---|---|---|
| FR-25 | Rollout kit: new Instagram bio link, a DM saved reply pointing to the form, a pinned highlight with the link, and a short script for staff who answer DMs | M |

### Parked or Phase 2

| ID | Requirement | P |
|---|---|---|
| FR-9 | Availability picker with soft conflict warning | C |
| FR-22 | Optional priority booking deposit through Paystack or Flutterwave | C |
| FR-23 | Payment confirmed server-side by webhook, never by the browser redirect alone | C |

## 7. Enquiry form specification

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Event date | date | yes | From today (Africa/Lagos) to 24 months out. Within 7 days sets a short-notice flag and shows "short notice, we will confirm availability". "Dates are flexible" checkbox beside it |
| 2 | Second date or end date | date | no | For multi-day events or a second event, such as traditional and white weddings |
| 3 | Project type | select | yes | Festival, Wedding or event, Commercial or brand, Documentary, Other |
| 4 | Venue, city, country | text x3 | city yes | Country defaults to Nigeria, editable for diaspora events |
| 5 | Duration | select | yes | Half day, Full day, Multiple days, Not sure |
| 6 | Deliverables | multi-select | at least 1 | Highlight reel, Full film, Same-day edit, Drone coverage, Social cuts, Other |
| 7 | Reference video | URL | yes | One video they like. Checkbox "I will describe it instead" makes Notes required |
| 8 | Name | text | yes | Unicode safe |
| 9 | Company or agency | text | no | For brands and agencies booking on behalf of someone |
| 10 | WhatsApp number | phone | one of 10 or 11 | Country selector, default Nigeria. Accepts local format with a leading 0 or international format. Stored in E.164 |
| 11 | Email | email | one of 10 or 11 | |
| 12 | Notes | text | no | Max 1000 characters |
| 13 | Consent | checkbox | yes | Agrees to be contacted about this enquiry |

Why one of WhatsApp or email: when the visitor sends the prefilled message, the owner sees their number anyway. The contact field only matters when they do not send, and some diaspora visitors do not use WhatsApp.

The form is 8 required fields. That is a lot for a mobile visitor. If completion is low after 30 days, cut the reference video first, then second date and duration.

Prefilled WhatsApp message:

```
Hello Alpha Movies, I just submitted a brief (Ref AM-7K3Q5).
Project: Wedding or event
Date: 14 Feb 2027 (flexible: no)
Location: Lagos Island, Lagos, Nigeria
Duration: Full day
Deliverables: Highlight reel, Drone coverage
Reference: https://www.youtube.com/watch?v=...
Name: Ada and Tunde
```

Phase 0 has no ref. The Ref line is omitted when there is none.

## 8. Content and verification rules

- Every credential and stat has a source and a verified flag.
- The RC number is checked against the CAC public search before it is displayed. [verify]
- A project is shown only with the client's permission, recorded in the CMS. Private weddings default to hidden.
- Music in public videos must be cleared for the embed platform. Tracks that trigger blocks in some regions break the embed for exactly the diaspora visitors we want.
- Placeholder content stays in brackets in the CMS and the publish checklist blocks launch while any remain.
- Template copy from reference sites is never reused. Every sentence is written for this client.

## 9. Non-functional requirements

- Mobile first. Most visitors arrive from Instagram on phones over mobile data.
- Performance: LCP 2.5s or better on 4G. No autoplaying video iframes. Poster-first everywhere.
- Accessibility: WCAG AA contrast on the dark theme, keyboard-operable form, labels on all fields.
- Privacy: collect only the form fields above. Consent recorded. Align with the Nigeria Data Protection Act 2023. The obligations are researched in `docs/research/ndpa-2023-notes.md` (that file is a research note, never read as fact, and has not had a professional read). Open duties: cookie and tracking consent before analytics fires (ROADMAP L-6), the retention period in ARCHITECTURE section 8 against the 2025 directive's six-month default (L-7), the processor inventory (L-8), and whether the business crosses the controller-of-major-importance thresholds (L-9, blocked on Q14). The notice and consent copy are drafted in `content/copy.md` and build as P-24
- Resilience: if the API is down, the form falls back to a direct WhatsApp link with the brief in the message. A backend failure must never lose a lead.
- Browsers: latest two versions of Chrome, Safari, Samsung Internet and Firefox.

## 10. Design direction

Intent only. The values themselves live in `docs/DESIGN.md`, which is the single source for every color, font and spacing number on the site (decision D12). This section does not restate a hex or a font name, and where the two disagree DESIGN.md wins and this section gets corrected in the same change.

- Pure dark page, black, so video thumbnails and the logo carry the light. Value in DESIGN section 1.
- Quiet, high-contrast body type with one distinct display face for headings. Accent drawn from Boy Concept's own brand once confirmed. Choices in DESIGN sections 3 and 4.
- DESIGN section 4 gives the display role a serif, which supersedes the "bold, clean sans-serif" first written here. The change is real and visible, so it needs sign-off (ROADMAP F-11, and DESIGN section 13 item 4 for the Framer check).
- Lesson from the reference site: category-tagged project cards, numbered services with chips and a named process work well. Avoid its placeholder stats, duplicated step copy and stacked autoplaying embeds.

## 11. Phases

| Phase | Deliverable | Notes |
|---|---|---|
| 0 | Pitch demo on a Framer preview link. Full form UI. Submit builds the WhatsApp message in the browser and stores nothing | Placeholders marked. The cheapest way to learn whether he cares |
| 1 | Production site on the client's domain, with every account in the client's name | Add the backend (Worker, Airtable, email) only if Framer's native form handling cannot meet FR-12, FR-14 and FR-18. [Verify] |
| 1.5 | Parked items, pulled in one at a time by their triggers | Section 5 |
| 2 | Optional deposit | Only if the owner asks |

Task-level status for every phase is in `ROADMAP.md`.

## 12. Assumptions and open questions

| # | Question | Needed for | Owner |
|---|---|---|---|
| Q1 | Does he already have a website or booking link? | Whether to pitch the whole site or only the booking flow | Ademola to ask |
| Q2 | Starting price for event coverage | FR-10 | Emmanuel |
| Q3 | Verified RC number, base city, equipment list | FR-6, footer | Emmanuel, CAC search |
| Q4 | Verifiable view counts and client names | FR-7 | Emmanuel |
| Q5 | Which WhatsApp number receives briefs, who watches it, and who reads the email | FR-12, FR-15, FR-18 | Emmanuel |
| Q6 | Roughly how many enquiries per week, and what share are price checks | Baselines, and whether a backend is worth building | Emmanuel |
| Q7 | Do his best videos exist as source files, or only on Instagram | FR-2, FR-4 | Emmanuel |
| Q8 | Which clients allow public showing, and are tracks cleared for YouTube | FR-27 | Emmanuel |
| Q9 | Will he and his team change the Instagram bio and DM replies | FR-25 | Emmanuel |
| Q10 | Domain ownership, brand colors, and who holds each service account | Launch, handover | Emmanuel |

## 13. Stress test (product level)

### 13.1 What would break

Ranked by likelihood times damage.

| # | Failure | Why it is likely | Fix in this version |
|---|---|---|---|
| 1 | Nothing changes in how people contact him | The site is only an option. DMs stay easier unless the bio link and saved replies point to it | FR-25 rollout kit, FR-24 direct link kept visible so the funnel does not feel like a wall |
| 2 | The owner stops reading enquiries, or the promised reply time is missed | A late reply after a "within 24 hours" promise is worse than no promise | FR-15 wording rule, FR-18 sends a copy to the builder for 30 days, Q5 answered before launch |
| 3 | Content arrives late or unverified and the site launches thin | The credibility layer, the strongest part of the pitch, depends most on his documents | FR-6, FR-7, FR-26 hide empty sections, launch checklist sets a minimum content bar |
| 4 | The form costs legitimate leads | 8 required fields on a phone, a mandatory reference link, diaspora visitors without WhatsApp | Contact field is WhatsApp or email, reference escape, direct link, review at 30 days with a cut order |
| 5 | A client's private video is shown, or the track gets blocked | Weddings are private, music licences vary by platform | FR-27 and the section 8 rules |
| 6 | The builder is the single point of failure | Accounts and DNS held by one person | Every account in the client's name, handover checklist (ARCHITECTURE.md section 10) |

### 13.2 Edge cases

- **Repeat clients and referrals** do not need a form. FR-24 gives them a direct path.
- **Agencies** book on behalf of brands. The company field and notes carry it.
- **Multi-day events and two events for one couple** use the second-date field and notes.
- **Short notice and far-future dates** are handled by the 7-day flag and the 24-month window.
- **Diaspora visitors** may use a foreign number, no WhatsApp, or a venue in Nigeria while living abroad.
- **No reference video**: the escape checkbox turns Notes into a required field.
- **Fake or competitor submissions**: enquiries never block dates, so a fake brief costs a click and nothing else.
- **A client who returns months later** starts a new enquiry. Nothing merges.
- **Polite decline**: the owner marks the enquiry handled and replies by message. No automated rejection.

### 13.3 What is overengineered

| Item | Verdict | Action |
|---|---|---|
| Availability picker and blocked dates | The owner is unlikely to keep dates current, and a stale calendar is worse than none | Parked with a trigger |
| Backend, database and email for the pitch demo | Not needed to prove the idea | Phase 0 has none. Phase 1 adds it only if Framer's native form falls short |
| Vertical short-form row, hero loop video | Polish before proof | Row parked, hero loop cut |
| Service and FAQ as CMS collections | Text that rarely changes | Written in the page |
| Deposit design in detail | Unrequested by the owner | Stub only |
| Detailed requirements before one conversation with the client | These documents themselves | Answer Q1, Q2 and Q6 first, then trim the PRD to what he cares about |
