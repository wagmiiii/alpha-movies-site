# Placeholder Register

This file tracks every `[bracketed]` placeholder used in the site copy or CMS.
No placeholder should be published to production unless explicitly signed off as a known gap.

| Placeholder | Location | Owner | Status | Notes |
|---|---|---|---|---|
| `[Starting Price]` | `content/copy.md`, `framer/EnquiryForm.tsx` default prop `fromPriceText` | Emmanuel | open | PRD Q2. Blocks FR-10. Set it in CMS SiteSettings `from_price_text` |
| `[Response Time]` | `content/copy.md`, `framer/EnquiryForm.tsx` default prop `responseTimeText` | Emmanuel | open | PRD Q5. Blocks FR-15. Only promise a time someone will keep |
| `[Enquiry Email]` | `framer/EnquiryForm.tsx` confirmation, shown only when the WhatsApp number is unset | Emmanuel | open | PRD Q5. Shown when `whatsappDigits` is empty so the lead still has a route out |
| `[Owner WhatsApp digits]` | CMS SiteSettings `whatsapp_number_digits`, and the Worker variable `OWNER_WHATSAPP_DIGITS` | Emmanuel | open | PRD Q5. International digits, no plus. Two places by design, change both |
| `[Base City]` | `content/copy.md` | Emmanuel | open | PRD Q3. Footer and FR-20 |
| `[N]` minimum verified credentials | `docs/ARCHITECTURE.md` section 5, FR-26 hide rule | Ademola, Emmanuel | open | Needed before P-8. Until then the credentials section cannot be built |
| `[Example Placeholder]` | `content/copy.md` (Hero) | Emmanuel | open | Needs the actual value from the client |
| `[RC number]` | CAC registration, FR-6 | Emmanuel | open | PRD Q3. Verify on the CAC public search before it displays anywhere |
| `[Amount]` years, views, clients | FR-7 stats, credentials | Emmanuel | open | Nothing renders without a source in `content/verification-log.md` |
