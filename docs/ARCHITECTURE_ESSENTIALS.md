# ARCHITECTURE_ESSENTIALS

Quick reference for agents. If this file and ARCHITECTURE.md disagree, ARCHITECTURE.md wins and this file needs fixing. Product intent is in PRD.md. Visual values (color, type, spacing) are owned by DESIGN.md, and PRD.md section 10 states intent only. Version 0.2.

## What this is
- Booking and showcase site for Boy Concept (Alpha Movies Ltd). The enquiry flow and the credibility layer are the product.

## Build order
- Status, tasks and the current phase live in `ROADMAP.md`, not here.
- Phase 0: Framer only. `EnquiryForm` builds the WhatsApp message in the browser. No backend.
- Phase 1: add the Worker only if Framer's native form cannot meet notify, spam and storage needs. Test this first.
- Parked until triggered: availability picker, event tracking, deposits, Supabase.

## Stack
- Site: Framer (pages, CMS, hosting). One code component: `EnquiryForm`.
- Phase 1 API: Cloudflare Worker, Hono, Zod, TypeScript, libphonenumber-js.
- Data: Airtable via one module. Email: Resend. Bot check: Turnstile plus honeypot.

## Boundaries
- Browser talks only to the Worker. Never to Airtable or Resend.
- Worker is the source of truth for validation, storage, notification and the WhatsApp URL.
- Content lives in the Framer CMS. Operational data lives in Airtable.

## Data (names only)
- CMS: Project (verified, publish_ok), Credential (verified, source), SiteSettings.
- Airtable: Enquiry (ref, client_request_id, status new/handled/spam, event_date, event_end_date, short_notice, whatsapp_e164 or email, company, project_type, duration, deliverables, reference_url, consent_at).

## API (Phase 1)
- Only `POST /api/enquiries`. Returns `{ ref, whatsappUrl }`. Same `clientRequestId` returns the original result.
- One error shape: `{ error: { code, fields? } }`.

## Hard rules
1. No budget field anywhere.
2. Date comes first in the form.
3. The WhatsApp handoff is a visible button (plain link). Never auto-open after an async call.
4. `wa.me` numbers are digits only: no plus, no leading zeros.
5. A backend failure never blocks the handoff. Return a valid `whatsappUrl` regardless.
6. Rate limit per phone or email plus Turnstile. Never by IP alone.
7. Submit is idempotent on `clientRequestId`.
8. Content renders only if verified and permitted. Empty sections and categories hide. No bracketed placeholders ship.
9. Always show a direct WhatsApp link that works without JavaScript.
10. No autoplaying video iframes. Poster first, load on tap.
11. No PII in logs. No IP storage.
12. Secrets only in Worker env vars. Every account is held by the client.
13. Every contribution updates `ROADMAP.md` (always) and `PROJECT_STRUCTURE.md` (when files or folders change) before it counts as done. State what you updated in your report.

## Env vars
`AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `TURNSTILE_SECRET`, `RESEND_API_KEY`, `OWNER_EMAILS`, `OWNER_WHATSAPP_DIGITS`, `ALLOWED_ORIGINS`.

## Known breakpoints
- Framer runtime plus Turnstile (untested, blocks the design).
- Instagram in-app browser and `wa.me`.
- Email deliverability from a new domain.
- WhatsApp number lives in two places: SiteSettings and `OWNER_WHATSAPP_DIGITS`.
- Airtable has no unique constraint. Check refs in code.
- Framer plan fit: this site needs 3 CMS collections (Project, Credential, SiteSettings) and Framer's Basic tier holds 2, so the launch plan is Pro. Build on Free now, move to the client's account before go-live (decision D13, `ops/framer-setup-checklist.md`).

## Cut or parked (do not build unprompted)
- Availability picker, BlockedDate, date_conflict.
- Store interface, `/api/events`, `wa_tapped`, `ip_hash`.
- Service and FAQ collections, hero loop video, short-form row.
- Shared client-side Zod schema, a third environment, Phase 2 payments.

## Layout
- Full map in `PROJECT_STRUCTURE.md`: `/framer`, `/shared`, `/worker` (conditional), `/docs`, `/content`, `/ops`, `/pitch`.
