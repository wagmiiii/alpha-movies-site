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
| `[Example Placeholder]` | none | | example row | From the F-8 skeleton. No such bracket exists in `content/copy.md`, checked on 2026-10-10. Keep the format, delete this row before R-4 greps the register |
| `[RC number]` | CAC registration, FR-6. `content/demo-dataset.md` section 5 | Emmanuel | open | PRD Q3. Verify on the CAC public search before it displays anywhere |
| `[Amount]` years, views, clients | FR-7 stats, credentials | Emmanuel | open | Nothing renders without a source in `content/verification-log.md`. No demo row exists for stats on purpose |
| `[Instagram URL]`, `[YouTube URL]` | `content/demo-dataset.md` section 3 SiteSettings, footer | Emmanuel | open | PRD Q10. Two candidate handles are on file and neither is confirmed, see `pitch/emmanuel-question-sheet.md` Part 2 notes |
| Project field brackets: `[Project title]`, `[Client name]`, `[Organiser name]`, `[Couple or family name]`, `[Subject or commissioner]`, `[Event name]`, `[Year]`, `[City]`, `[Location]`, `[Video URL]`, `[Deliverables]`, `[Poster: <title>]`, `[One sentence...]` | `content/demo-dataset.md` section 4, all eight `demo-*` rows | Emmanuel | open | PRD Q7 and Q8, C-2 and C-3. Each row flips only with a verification-log entry plus his per-project permission |
| Credential source brackets: `[CAC search link or certificate]`, `[Owner statement, or a dated photo or invoice]`, `[Named collaborator confirms]`, `[Equipment list as the owner words it]`, `[Names he cites, each one checked with that person]`, `[Outlet and headline]`, `[Article link]` | `content/demo-dataset.md` section 5 | Emmanuel | open | PRD Q3 and Q4, C-4 and C-5. The source column is the evidence, so a blank source means the card stays hidden |
