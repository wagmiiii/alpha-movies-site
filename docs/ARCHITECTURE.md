# ARCHITECTURE: Alpha Movies Booking and Showcase Site

Status: Draft v0.2 (stress-tested, see section 14) | Date: 2026-10-06 | Pairs with PRD.md. Requirement IDs (FR-n) refer to the PRD.

Items marked "Verify" are technical assumptions to confirm before depending on them (section 13).

Living docs: `ROADMAP.md` tracks status and `PROJECT_STRUCTURE.md` maps the files. Both are updated on every contribution (section 16).

## 1. Build order

The thinnest thing that proves the pitch comes first.

| Phase | What exists | Backend |
|---|---|---|
| 0 | Framer pages, CMS, `EnquiryForm` component. Submit builds the WhatsApp message in the browser | None |
| 1 | Same site on the client's domain. Add the Worker only if Framer's native form handling cannot meet FR-12, FR-14 and FR-18 [Verify] | Worker, Airtable, email |
| 1.5 | Parked features, each pulled in by its trigger (section 12) | As needed |
| 2 | Optional deposit | Worker plus payment provider |

Everything below describes the Phase 1 backend. Do not build it for Phase 0.

## 2. Overview (Phase 1)

```
Visitor (mobile, often inside the Instagram in-app browser)
   |
   v
Framer site: static pages, CMS (Project, Credential, SiteSettings)
   |  POST /api/enquiries
   v
Cloudflare Worker (Hono, Zod)
   |-- honeypot + Turnstile verify + rate limit
   |-- dedupe on clientRequestId
   |-- write Enquiry to Airtable
   |-- email owner (+ builder for 30 days) via Resend
   '-- returns { ref, whatsappUrl }

Confirmation screen: visible "Open WhatsApp" button + copyable message
```

The Framer site owns presentation and content. The Worker owns validation, storage, notification and the WhatsApp message. The browser never talks to Airtable or Resend directly.

## 3. Stack decisions

| Layer | Choice | Why | Rejected |
|---|---|---|---|
| Site | Framer | Fast to design, hosts the site, owner edits CMS content himself | Custom Next.js: owner needs a developer for every change |
| Custom UI | One Framer code component (React, TypeScript): `EnquiryForm` | The only custom UI v1 needs | Third-party form tool: cannot format the WhatsApp message |
| API | Cloudflare Workers, Hono, Zod | Small, cheap, one deploy target | Zapier or Make only: weak validation and dedupe. Vercel functions: workable, no advantage here |
| Data store | Airtable, accessed through one module `airtable.ts` | Owner gets a spreadsheet-style view | Google Sheets: awkward API. Supabase: better long term, no owner UI. Move when volume or payments demand it |
| Email | Resend | One API call per enquiry | SMTP: more setup for no gain |
| Bot protection | Turnstile, honeypot field, rate limit per contact | Free, low friction | Image CAPTCHA: hurts conversion |
| Phone parsing | libphonenumber-js (minimal metadata) in the Worker | Local numbers with a leading 0, foreign numbers, E.164 output | Regex: wrong for most countries |
| Video | YouTube nocookie or Vimeo embed, created on tap | His channel is on YouTube | Autoplaying embeds, self-hosted hero loop |
| Analytics | GA4, two events: form_submit, whatsapp_tap | Free, enough | A custom tracking endpoint |
| Tooling | TypeScript, Vitest, Wrangler, ESLint, GitHub | | |

Validation lives on the server in Zod. The client uses native HTML validation only. No shared schema.

## 4. Components and boundaries

| Component | Responsibility | Must not |
|---|---|---|
| Framer pages | Layout, copy, CMS rendering, SEO, hosting | Hold secrets or business rules |
| `EnquiryForm` | Field UI, light validation, submit, confirmation screen with the WhatsApp button and copy fallback, local fallback link | Auto-open WhatsApp after an async call |
| Worker | Validate, normalize phone, verify Turnstile, rate limit, dedupe, store, notify, build the WhatsApp URL | Block the WhatsApp handoff on a downstream failure |
| `airtable.ts` | Insert enquiry, look up by `client_request_id` | Leak vendor types outside its module |
| `notify.ts` | Send the owner email | Throw into the request path |

## 5. Data models

### Framer CMS (content, edited by owner)

| Collection | Fields |
|---|---|
| Project | slug, title, category (enum), client_name, event_name, year, location, video_url, poster_image, hero_reel (bool), deliverables (tags), summary, publish_ok (bool, client permission), verified (bool), sort_order |
| Credential | type (registration, equipment, collaboration, press), label, value, source (text), verified (bool) |
| SiteSettings (single) | whatsapp_number_digits, from_price_text, response_time_text, base_city, instagram_url, youtube_url |

Render rules: a Project shows only if `verified` and `publish_ok` are both true. A Credential shows only if `verified` is true. A category chip with zero shown projects is hidden. The credentials section is hidden while it has fewer than [N] shown items.

The owner's WhatsApp number lives in two places: SiteSettings (footer and direct links) and the Worker variable `OWNER_WHATSAPP_DIGITS` (the handoff). Changing it means updating both. Handover checklist item.

### Airtable: Enquiry

| Field | Type | Notes |
|---|---|---|
| ref | text | `AM-` plus 5 Crockford base32 characters. Not sequential. Airtable does not enforce uniqueness [Verify], so the code checks |
| client_request_id | text | UUID generated by the form instance, used for dedupe |
| created_at | datetime (UTC) | |
| status | single select | new, handled, spam |
| name | text | |
| company | text, nullable | |
| whatsapp_e164 | text, nullable | One of this or email is required |
| email | text, nullable | |
| project_type | single select | festival, wedding_event, commercial, documentary, other |
| event_date | date | Date only, interpreted in Africa/Lagos |
| event_end_date | date, nullable | Multi-day or second event |
| date_flexible | checkbox | |
| short_notice | checkbox | Event within 7 days of submission |
| venue, city, country | text | |
| duration | single select | half_day, full_day, multi_day, unsure |
| deliverables | multi-select | highlight_reel, full_film, same_day_edit, drone, social_cuts, other |
| reference_url | text, nullable | http or https only |
| notes | text, nullable | Max 1000 characters |
| consent_at | datetime | |
| source | text, nullable | UTM source, if present |

No IP address is stored.

## 6. API contract

Base: `https://api.<client-domain>`. Before the domain exists, use the `workers.dev` address and add it to the allowed origins.

CORS allows only the production origin, the staging origin and the Framer preview origins. [Verify the preview origins]

### POST /api/enquiries

Request: the PRD section 7 fields plus `clientRequestId`, `turnstileToken` and a honeypot field `website` that must be empty.

Response 201:
```json
{
  "ref": "AM-7K3Q5",
  "whatsappUrl": "https://wa.me/2348012345678?text=<urlencoded brief>"
}
```

`whatsappUrl` format: digits only, with the country code, no plus sign and no leading zeros. The owner number comes from `OWNER_WHATSAPP_DIGITS`.

Errors use one shape: `{ "error": { "code": "VALIDATION" | "BOT" | "RATE_LIMIT" | "INTERNAL", "fields": { "city": "Required" } } }`.

If the same `clientRequestId` arrives again, return the original `ref` and `whatsappUrl` with 200 and write nothing.

If Airtable or the email call fails after validation passes, still return 201 with `ref: null` and a valid `whatsappUrl`. Log the failure. The message omits the Ref line.

Deferred endpoints (availability, events, deposits, webhooks) are listed in section 12.

## 7. Key flows

### Enquiry submission

1. Visitor completes the form. The component generates a `clientRequestId` once per form instance.
2. Browser posts to `/api/enquiries`. The submit button is disabled while the request is in flight.
3. Worker checks the honeypot, verifies Turnstile, applies rate limits.
4. Worker validates with Zod, normalizes the phone number to E.164, computes `short_notice`.
5. Worker looks up `client_request_id`. If found, return the stored result.
6. Worker writes the Enquiry, then sends the owner email with `waitUntil`.
7. Worker returns `{ ref, whatsappUrl }`.
8. Component shows the confirmation screen: reference code, a visible "Open WhatsApp" button that is a plain link, and the copyable message. No automatic redirect, because popups opened after an async call are commonly blocked on iOS Safari and in in-app browsers. [Likely]

### Failure handling

| Failure | Behaviour |
|---|---|
| Turnstile fails or cannot load | Show "Verify you are human" retry. After two failures show the direct WhatsApp link |
| Rate limit hit | 429, show the direct WhatsApp link |
| Airtable down | 201 with `ref: null`, log, handoff proceeds |
| Email down | Enquiry is saved, log. Owner sees it in Airtable |
| API unreachable | Component builds a WhatsApp link locally from the form values |
| Visitor never taps Send | The stored enquiry and owner email still carry the lead, if Phase 1 is on |

A lead is lost only if the backend failed and the visitor did not send the message. Accepted.

## 8. Security and privacy

- Secrets live only in Worker environment variables. Nothing sensitive in Framer.
- Input caps on every field. Strip control characters. URLs must be http or https.
- Rate limits: 3 submissions per hour per phone number or email, plus Turnstile. A loose per-IP backstop of about 30 per hour. Do not rely on IP alone, because mobile carriers in Nigeria commonly put many users behind one address [Likely]. Implementation: Workers rate limiting binding or a KV counter [Verify].
- Logs hold the ref and error code only. No names, numbers or emails.
- No IP addresses are stored.
- Consent is stored with a timestamp. Retention: spam deleted after 30 days, other enquiries after 24 months unless the owner chooses otherwise. Deletion on request is a manual Airtable delete, documented for the owner. [Verify against NDPA 2023]

## 9. Performance plan

- Poster images everywhere. Video iframes are created on tap.
- No hero video loop.
- Responsive images from Framer, WebP or AVIF where supported.
- `EnquiryForm` and the Turnstile script load below the fold, on interaction with the form section.
- Budget: LCP 2.5s or better on 4G, checked with PageSpeed Insights and a throttled Chrome profile before launch.

## 10. Environments, ownership and deployment

| Env | Site | API | Data |
|---|---|---|---|
| test | Framer preview link | Worker test | test Airtable base |
| prod | client domain | Worker prod | prod Airtable base |

Variables: `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `TURNSTILE_SECRET`, `RESEND_API_KEY`, `OWNER_EMAILS` (comma separated, owner plus builder for the first 30 days), `OWNER_WHATSAPP_DIGITS`, `ALLOWED_ORIGINS`.

Account ownership at launch:

| Account | Held by |
|---|---|
| Domain and DNS | Client |
| Framer project | Client, builder invited as editor |
| Cloudflare (Worker, Turnstile) | Client, builder invited |
| Airtable base | Client |
| Resend | Client, with the sending domain verified (SPF and DKIM) |
| GA4 | Client |

Until gate G0 passes, the spike and the Phase 0 build run in a project held by the builder on the Free plan (decision D13). That project is a sandbox: no real enquiry, no client phone number, no published page, and it is never the site that goes live. `ops/framer-setup-checklist.md` section 8 is the move into the client's account.

Handover checklist: all accounts above, the two places the WhatsApp number lives, how to rotate each secret, how to delete an enquiry on request, and a one-page owner guide to the CMS.
Deploy with `wrangler deploy --env <name>`. Publishing the Framer site is manual until handover.

## 11. Observability and testing

- Cloudflare Worker logs. Alert on a spike in INTERNAL errors. [Verify]
- First 30 days: every enquiry email also goes to the builder, so a silently failing owner inbox is noticed.
- Unit tests only: phone normalization, WhatsApp message builder (encoding and length), ref generator, the Zod schema.
- Manual pre-launch matrix: iOS Safari, Android Chrome, and the Instagram in-app browser on both. Check the WhatsApp button, the copy fallback, slow 3G throttle and a keyboard-only submit.
- Content gate: a launch checklist lists any CMS item that is unverified, lacks permission or still contains a bracketed placeholder.

## 12. Parked features and triggers

| Feature | Design sketch | Build only when |
|---|---|---|
| Availability picker | `BlockedDate` table (date, status, private note). `GET /api/availability?month=YYYY-MM` returns dates only. Soft conflict: warn, still accept, set `date_conflict`. Enquiries never auto-block dates | The owner commits to updating dates at least weekly |
| Event tracking | `POST /api/events`, `wa_tapped` field | GA4 proves insufficient |
| Store interface | Abstraction over Airtable | A second backend is real |
| Supabase | Postgres replaces Airtable | Volume or payments outgrow Airtable |
| Deposit (Phase 2) | `POST /api/deposits/initiate`, `POST /api/webhooks/<provider>`, `Payment` table with integer kobo, idempotent on webhook event id, only a verified webhook marks paid | v1 live 60 days and the owner asks. Verify the provider's signature scheme before building |

## 13. Verify before building

1. Framer code components can call an external API and render the Turnstile widget in the Framer runtime, in preview and in the Instagram in-app browser. Blocks the design. Test first.
2. Whether Framer's native form handling already meets FR-12, FR-14 and FR-18. If yes, skip the Worker.
3. The Framer plan supports CMS and custom code at the limits needed. Read from Framer's own pricing page on 2026-10-10: Free gives 10 collections and 1,000 items but publishes only on a free Framer domain, Basic gives **2** collections where this site needs 3, Pro gives 10 collections, up to 40,000 items and a staging environment. That is why decision D13 launches on Pro. The page says nothing about whether code components are gated by plan, so S-1 and S-4 have to observe it rather than assume it.
4. The free Framer domain suffix on this account (the reference site used `framer.media`).
5. Airtable free-tier record and request limits against expected volume, and that it has no unique-field constraint.
6. Resend sending-domain verification for the client domain, and Gmail inbox placement.
7. `wa.me` links on iOS, Android and inside Instagram's browser. Keep the encoded message under about 1000 characters.
8. Workers rate limiting binding availability and behaviour.
9. NDPA 2023 obligations for names, phone numbers and email addresses. Read against the regulator's own 2025 implementation directive and written up in `docs/research/ndpa-2023-notes.md` (ROADMAP L-4). That note is not verified by a lawyer, so this item is not closed, and it found two open conflicts with this file: the retention periods in section 8 (task L-7) and the absence of any cookie consent step for the GA4 choice in section 3 (task L-6).

## 14. Stress test (technical)

### 14.1 What would break

Ranked by likelihood times damage. "Fixed" means this version already changed.

| # | Failure | Status |
|---|---|---|
| 1 | The owner does not maintain Airtable or blocked dates, so the calendar goes stale | Fixed: availability parked, email is the owner's interface |
| 2 | Auto-opening WhatsApp after an async call is blocked by popup rules and in-app browsers | Fixed: visible button is the handoff |
| 3 | The v0.1 spec built the `wa.me` link from E.164 with a plus sign, which does not work | Fixed: digits only |
| 4 | IP-based rate limiting blocks real users behind shared mobile addresses | Fixed: limit per contact, IP is a loose backstop |
| 5 | Turnstile or the form fails inside the Framer runtime or in-app browsers | Open: Verify item 1, with a WhatsApp link fallback after two failures |
| 6 | Owner emails land in spam or the sending domain is not verified | Open: domain setup in the launch checklist, builder copied for 30 days |
| 7 | Double taps and retries create duplicate enquiries | Fixed: `clientRequestId` dedupe |
| 8 | Airtable has no unique constraint and has request limits | Mitigated: uniqueness checked in code, volume is low, Supabase is the exit |
| 9 | The WhatsApp number differs between SiteSettings and the Worker variable | Open: documented in the handover checklist |
| 10 | The credentials section looks empty because little is verified | Fixed: section hides below a threshold |
| 11 | Source video files do not exist, only Instagram uploads | Open: PRD Q7 |
| 12 | Accounts sit in the builder's name and the site breaks when he steps away | Fixed: client-owned accounts and a handover checklist |
| 13 | Framer preview origins change and CORS rejects them | Open: confirm the preview origins (section 6), keep origins in a variable |

### 14.2 Edge cases handled

- Local phone formats with a leading 0, international numbers, and numbers not on WhatsApp (an email fallback exists).
- Multi-day events and two events for one couple (second date field).
- Past, same-day, short-notice and far-future dates. The window is today in Africa/Lagos to 24 months out, and the device clock is never trusted.
- Unicode names, emoji, over-long text, and URLs that are not http or https.
- An agency booking for a brand (company field).
- Existing clients bypassing the form (direct link, no JavaScript needed).
- Empty categories and empty credentials (hidden).
- The owner changing their WhatsApp number (two places, checklist).
- A request to delete personal data (manual process).
- Bots (honeypot, Turnstile, rate limit) and fake submissions (they block nothing).

### 14.3 What was overengineered, and what changed

| v0.1 item | Verdict | Change |
|---|---|---|
| Worker, Airtable and Resend for the pitch | Not needed to prove the idea | Phase 0 has no backend. Phase 1 backend only if Framer's native form falls short |
| Availability picker, BlockedDate, `date_conflict` | Needs an owner habit nobody has promised | Parked |
| `Store` and `Notifier` interfaces | Abstraction for a second backend that does not exist | `Store` removed, one `airtable.ts` module |
| `/api/events` and `wa_tapped` | Duplicates GA4, and a tap is not a sent message | Removed |
| `ip_hash` and salt | Stores data to solve a problem Turnstile already covers | Removed |
| Service and FAQ CMS collections | Text that rarely changes | Written in the page |
| Self-hosted hero loop | Weight for little proof | Cut |
| Shared Zod schema in the browser | Extra bundle weight, duplicate logic | Server only, native validation in the browser |
| Three environments | One more base and Worker to maintain | Two: test and prod |
| Six-state status enum | The owner will not run a CRM in Airtable | new, handled, spam |
| `verified_on` and `source_url` | Fields nobody reads | One `source` text field |
| Route tests with fake stores | Test scaffolding larger than the logic | Unit tests for the four pure functions |
| Detailed Phase 2 design | Unrequested | A row in section 12 |

What stays because it earns its place: the verification gate, the handoff fallbacks, the direct link, idempotent submit and client-owned accounts.

## 15. Decision log

| # | Decision | Date |
|---|---|---|
| D1 | No budget field. Filter on effort and a public "from" price | 2026-10 |
| D2 | Availability check is parked. If built later: warn, still accept, never auto-block | 2026-10-06 |
| D3 | A backend failure never blocks the WhatsApp handoff | 2026-10 |
| D4 | Phase 0 has no backend. Phase 1 adds a Worker only if Framer's native form falls short | 2026-10-06 |
| D5 | Unverified or non-permitted content never renders | 2026-10-06 |
| D6 | Deposit is Phase 2, optional, and a stub until requested | 2026-10 |
| D7 | The handoff is a visible button, not an automatic redirect | 2026-10-06 |
| D8 | Rate limit by contact, not by IP alone | 2026-10-06 |
| D9 | No IP storage, no custom event endpoint | 2026-10-06 |
| D10 | Every account is held by the client | 2026-10-06 |
| D11 | Every contribution updates ROADMAP.md, and PROJECT_STRUCTURE.md when files change. CI enforces the ROADMAP part | 2026-10-06 |
| D12 | DESIGN.md is the single source for visual values. PRD section 10 states intent only and repeats no token, so the background no longer has two owners (F-9) | 2026-10-10 |
| D13 | Framer: build the spike and Phase 0 in a builder-owned project on the Free plan, then move it into the client's project before go-live. D10 and L-1 are not weakened: the builder project is a sandbox, never the shipped site. The launch plan is Pro, not Basic, because this site needs 3 CMS collections and Framer's Basic tier holds 2. Setup and move steps in `ops/framer-setup-checklist.md` | 2026-10-10 |

## 16. Contribution protocol

Every contribution, by a human or an agent, updates the living docs before it counts as done.

1. `ROADMAP.md`: set the status of every task you touched, add tasks you discovered, recalculate the scorecard, and add one Progress log line (date, who, what, task IDs, files). This file changes on every contribution without exception.
2. `PROJECT_STRUCTURE.md`: if you added, moved, renamed or deleted a file or folder, or changed its purpose, update the tree, the file table and the Structure change log.
3. `ARCHITECTURE.md` decision log and `ARCHITECTURE_ESSENTIALS.md`: if a decision or rule changed.
4. In your final report, say which of these you updated. A contribution is not done until they are.

Enforcement: a CI check fails any PR that does not change `ROADMAP.md` (task F-7). The structure update relies on the PR template checklist, because CI cannot reliably tell when a structure change was needed.
