# Placeholder Register

This file tracks every `[bracketed]` placeholder used in the site copy or CMS.
No placeholder should be published to production unless explicitly signed off as a known gap.

The deck is pitch material, not the site, but it carries brackets too, and AGENTS.md asks for every placeholder to be listed. The pitch section is at the bottom.

| Placeholder | Location | Owner | Status | Notes |
|---|---|---|---|---|
| `[Starting Price]` | `content/copy.md`, `framer/EnquiryForm.tsx` default prop `fromPriceText` | Emmanuel | open | PRD Q2. Blocks FR-10. Set it in CMS SiteSettings `from_price_text` |
| `[Response Time]` | `content/copy.md`, `framer/EnquiryForm.tsx` default prop `responseTimeText` | Emmanuel | open | PRD Q5. Blocks FR-15. Only promise a time someone will keep |
| `[Enquiry Email]` | `framer/EnquiryForm.tsx` confirmation, shown only when the WhatsApp number is unset | Emmanuel | open | PRD Q5. Shown when `whatsappDigits` is empty so the lead still has a route out |
| `[Owner WhatsApp digits]` | CMS SiteSettings `whatsapp_number_digits`, and the Worker variable `OWNER_WHATSAPP_DIGITS` | Emmanuel | open | PRD Q5. International digits, no plus. Two places by design, change both |
| `[Base City]` | `content/copy.md` | Emmanuel | open | PRD Q3. Footer and FR-20 |
| `[N]` minimum verified credentials | `docs/ARCHITECTURE.md` section 5, FR-26 hide rule | Ademola, Emmanuel | open | Needed before P-8. Until then the credentials section cannot be built |
| `[Example Placeholder]` | none | | example row | From the F-8 skeleton. No such bracket exists in `content/copy.md`, checked on 2026-10-10. Keep the format, delete this row before R-4 greps the register |
| `[RC number]` | CAC registration, FR-6. `content/demo-dataset.md` section 5, and the privacy notice in `content/copy.md` | Emmanuel | open | PRD Q3. Verify on the CAC public search before it displays anywhere |
| `[Amount]` years, views, clients | FR-7 stats, credentials | Emmanuel | open | Nothing renders without a source in `content/verification-log.md`. No demo row exists for stats on purpose |
| `[Instagram URL]`, `[YouTube URL]` | `content/demo-dataset.md` section 3 SiteSettings, footer | Emmanuel | open | PRD Q10. Two candidate handles are on file and neither is confirmed, see `pitch/emmanuel-question-sheet.md` Part 2 notes |
| Project field brackets: `[Project title]`, `[Client name]`, `[Organiser name]`, `[Couple or family name]`, `[Subject or commissioner]`, `[Event name]`, `[Year]`, `[City]`, `[Location]`, `[Video URL]`, `[Deliverables]`, `[Poster: <title>]`, `[One sentence...]` | `content/demo-dataset.md` section 4, all eight `demo-*` rows | Emmanuel | open | PRD Q7 and Q8, C-2 and C-3. Each row flips only with a verification-log entry plus his per-project permission |
| Credential source brackets: `[CAC search link or certificate]`, `[Owner statement, or a dated photo or invoice]`, `[Named collaborator confirms]`, `[Equipment list as the owner words it]`, `[Names he cites, each one checked with that person]`, `[Outlet and headline]`, `[Article link]` | `content/demo-dataset.md` section 5 | Emmanuel | open | PRD Q3 and Q4, C-4 and C-5. The source column is the evidence, so a blank source means the card stays hidden |
| `[Confirm the trading name]` | `content/copy.md` privacy notice | Emmanuel | open | Q13. The same fact the deck carries as a slide 4 token, asked here in site copy, so it is registered in both places. No trading name publishes until the CAC search confirms it |
| `[Retention period]` | `content/copy.md` privacy notice | Ademola, Emmanuel | open | Task L-7. The directive's default is six calendar months once the purpose is done, and a lost enquiry must be destroyed inside six months. `docs/ARCHITECTURE.md` section 8 says 24 months. One of the two moves before this publishes, see `docs/research/ndpa-2023-notes.md` section 6 |
| `[Data request contact]` | `content/copy.md` privacy notice | Emmanuel | open | The notice must give a route for a subject request (NDPA s.27 via the research note section 4). Q5 says who reads the WhatsApp number, which may be the same person. A DPO is only required at 1,000-plus data subjects in six months |
| `[Days to answer a data request]` | `content/copy.md` privacy notice | Ademola | open | No statutory day count found in the GAID text. Promise a turnaround someone will actually keep, same rule as `[Response Time]` |
| `[Phase 1 processor list]` | `content/copy.md` privacy notice | Ademola | open | Names every tool that holds an enquiry. Written after gate G1, and after the vendor agreements in L-8 |
| `[Cross-border basis]` | `content/copy.md` privacy notice | Ademola | open | Task L-8. Framer, Cloudflare, Airtable, Resend and any analytics are outside Nigeria. Part VIII of the Act plus Schedule 5 of the directive, research note section 9 |
| `[Last updated]` | `content/copy.md` privacy notice | Ademola | open | Fill in at publish, not before |

## Pitch material

`pitch/Alpha_Movies_Proposal.pptx` is what Emmanuel reads first, so its gaps are as dangerous as the site's. Text tokens in the deck use the `[Confirm ...]` form. Audited 2026-10-10 against the rule that pitch material must not carry unverified facts.

| Token in the deck | Slide | Owner | Status | Notes |
|---|---|---|---|---|
| `[YOUR NAME]` | 1 | Ademola | open | Your name and the date, not the client's |
| `[amount]` (x5: per line and total), `[X]%` deposit, `[X] weeks` | 3, 6, 8 | Ademola | open | Your price and timeline. PRD has no budget field for the client, and this is your fee, so it stays |
| `[Confirm on CAC public search]` | 4 | Emmanuel | open | Same fact as `[RC number]`. D-1 then C-4 |
| `[Confirm city]` | 4 | Emmanuel | open | Same fact as `[Base City]`. PRD Q3 |
| `[Confirm the trading name]` | 4 | Emmanuel | open | The deck used to assert "formerly Tue Tue Concept", taken from `docs/research/boy-concept-brief.md`, whose own header forbids copying names into pitch material. Now Q13 |
| `[Confirm both handles]` | 4 | Emmanuel | open | The deck used to assert `@alpha.movies_` and YouTube `@Boy-concept` as fact. Two IG candidates are on file and neither is confirmed. Now Q13 |
| "Replace with a still from the Boy Concept reel" | 4 | Ademola | open | An image slot, written as an instruction rather than a bracket. Needs a client-permitted still, C-2 |
