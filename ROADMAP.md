# ROADMAP

Single source of truth for project status and for the path to 100% readiness.

| | |
|---|---|
| Last updated | 2026-10-10 |
| Current phase | Phase 0 build (P). Foundations F is complete. The form code is written, draft CMS content exists so the pages can be built without the client's answers, and the pages themselves, the spike and all of Phase 1 are not |
| Readiness | 17% (12 of 70 Must tasks done). The denominator grew from 64 on 2026-10-10: reading the data protection directive found five Must duties nobody had written down (L-6 to L-9, P-24), and the Framer decision added one setup task (S-0). No task was un-done |
| Gates passed | none |
| Backend decision (G1) | not yet made. Worker tasks (B) are excluded from the score until G1 chooses a Worker |
| Critical path now | Two things, in parallel. D-5 then G0: nothing in C, L, B or R can start until Emmanuel answers Q1, and `pitch/emmanuel-question-sheet.md` Part 4 is the message to send for it. And S-0: every Framer task needs a project to exist, decision D13 chose the builder-owned Free plan for that, and section 1 to 3 of `ops/framer-setup-checklist.md` is the setup |

## Update rule (mandatory, applies to humans and agents)

Every contribution updates this file before it counts as done. A contribution is any change to code, content, docs, config or process.

1. Set the status of every task you touched. Add tasks you discovered, with a size, an owner and dependencies.
2. Recalculate the scorecard and the Readiness line above.
3. Add one line to the Progress log: date, who, what, task IDs, files. One line per PR or work session is enough.
4. If you added, moved, renamed or deleted a file or folder, update `PROJECT_STRUCTURE.md` as well.
5. Say in your final report that you updated this file. CI fails a PR that does not touch it (task F-7).

Status symbols: `[ ]` todo, `[~]` in progress, `[x]` done, `[!]` blocked (say why in Blockers), `[-]` not applicable (say why in the log).

Owner values: Ademola, Agent (a coding agent), Emmanuel (the client). Sizes are guesses: S is under half a day, M is about a day, L is several days [Guessing].

## Definition of 100% readiness

The project is 100% ready when every Must task in sections F, D, S, P, C, L and R is `[x]`, and B is `[x]` or `[-]` according to gate G1, and gates G0 to G4 have passed. Should tasks are tracked but do not block 100%. Section X happens after launch and is not counted.

Score = Must tasks done divided by Must tasks in the counted sections. If G1 chooses a Worker, the B tasks become Must, the denominator grows and the score drops. That is correct.

## Scorecard

Recalculate on every update.

| Section | Must done | Should done | Conditional |
|---|---|---|---|
| F Foundations | 8 of 8 | 1 of 3 | n/a |
| D Discovery and pitch | 1 of 8 | 2 of 2 | n/a |
| S Framer capability spike | 0 of 6 | 0 of 0 | n/a |
| P Phase 0 | 3 of 19 | 1 of 5 | n/a |
| C Phase 1 | 0 of 11 | 0 of 0 | n/a |
| L Phase 1 | 0 of 8 | 0 of 1 | n/a |
| B Phase 1 (conditional) | n/a | n/a | 0 of 16 |
| R Phase 1 | 0 of 10 | 0 of 0 | n/a |
| X Post-launch | not counted | not counted | n/a |
| **Total counted** | **12 of 70** | **4 of 11** | |

## Gates

| Gate | Condition | Decided by tasks | Status |
|---|---|---|---|
| G0 | Emmanuel agrees to proceed and answers Q1 | D-7, D-8 | open |
| G1 | Backend decision: is Framer's native form enough, or do we build the Worker? | S-5 | open |
| G2 | Content bar met: minimum verified, permitted content is in the CMS | C-9, C-11 | open |
| G3 | Launch checklist signed off by Emmanuel | R-6 | open |
| G4 | Handover accepted: every account is in the client's name | R-10 | open |

## Critical path and schedule risks

- The longest delays are the client-dependent C tasks, mainly C-2, C-3 and C-5. Start asking at D-5, not after launch of the demo [Likely].
- The build no longer waits on Emmanuel. `content/demo-dataset.md` holds bracketed draft rows for every CMS-backed section, so P-2, P-5, P-6, P-7, P-8 and P-10 can be laid out now. What still waits on him is anything a visitor could believe, which is all of C, and the pitch itself. P-23 is the one decision the dataset needs before the grid is built.
- Videos come from Emmanuel's own YouTube channel or source files, per Q7, not from his Instagram feed. ARCHITECTURE section 3 chose YouTube nocookie, and the per-project permission and the music clearance both come from him and nobody else. See demo-dataset.md section 7.
- The Phase 0 form code (P-11 to P-13) is written, typechecked and exercised in a DOM, but has never run inside Framer. P-17, P-18 and S-2 are the checks that can still fail it, and they need a Framer account and two phones [Certain that they need those, Likely that they will pass].
- G1 decides whether 16 backend tasks exist. Run the S tasks early. If native forms are enough, most of the backend work disappears.
- Phase 1 cannot start before G0. If Emmanuel declines or already has a site (Q1), re-scope the whole roadmap.
- Verified content is the credibility layer, which is the strongest part of the pitch. A thin content set is a schedule risk and a product risk.
- Nothing here has dates. Add dates only after G0, once Emmanuel's response time is known.

## Tasks

Priority: M is Must, S is Should, C is conditional on G1. Refs point to requirement IDs (FR-n), PRD sections, ARCHITECTURE sections or ESSENTIALS rules.

### F. Foundations: docs, repo and process

| Status | ID | Task | Owner | Size | Depends on | Refs | P |
|---|---|---|---|---|---|---|---|
| [x] | F-1 | PRD v0.2 written and stress-tested | Agent | S | none | PRD | M |
| [x] | F-2 | ARCHITECTURE v0.2 written and stress-tested | Agent | S | none | ARCH | M |
| [x] | F-3 | ARCHITECTURE_ESSENTIALS v0.2 | Agent | S | F-2 | ESSENTIALS | M |
| [x] | F-4 | AGENTS.md and CLAUDE.md | Agent | S | F-3 | none | M |
| [x] | F-5 | ROADMAP.md and PROJECT_STRUCTURE.md written; contribution protocol added to every instruction file and doc | Agent | M | F-4 | none | M |
| [x] | F-6 | Create the repo, scaffold folders per PROJECT_STRUCTURE.md, move docs into /docs, add README.md and .gitignore | Ademola | S | F-5 | none | M |
| [x] | F-7 | Add PR template and a CI check that fails any PR not touching ROADMAP.md | Ademola | S | F-6 | none | M |
| [x] | F-8 | Create skeletons for content/PLACEHOLDERS.md, content/verification-log.md and content/copy.md | Agent | S | F-6 | none | M |
| [x] | F-9 | Reconcile the page background: PRD section 10 said #0A0A0A, DESIGN.md section 1 says #000000. Resolved by ownership rather than by picking a hex: DESIGN.md is the single source for visual values (ARCHITECTURE decision D12), PRD section 10 now states intent and carries no token, and the form code already used DESIGN's black | Agent | S | none | ESSENTIALS rule on doc precedence | S |
| [ ] | F-10 | The logo files DESIGN.md section 2 measures (`assets/brand/*`) are not in the repo, and `assets/` is not in PROJECT_STRUCTURE.md. Add both, or correct the measured claims | Ademola | S | none | DESIGN 2 | S |
| [ ] | F-11 | Sign off the display type direction. Found while reconciling F-9: PRD section 10 originally said "bold, clean sans-serif", DESIGN.md section 4 puts a serif in the display role, and that is a visible change of direction, not a token. Confirm it or correct DESIGN. DESIGN section 13 item 4 is the Framer check | Ademola | S | F-9 | DESIGN 4, 13 | S |

### D. Discovery and pitch

| Status | ID | Task | Owner | Size | Depends on | Refs | P |
|---|---|---|---|---|---|---|---|
| [ ] | D-1 | Verify public facts about Boy Concept: RC on CAC search, registered name, IG and YouTube figures | Ademola | S | none | PRD Q3, Q4 | M |
| [x] | D-2 | Pitch proposal deck generated (Canva-editable .pptx) | Agent | S | none | none | M |
| [ ] | D-3 | Fill the proposal placeholders, import into Canva, review. Audited 2026-10-10: three runs asserted unverified client facts and one feature the architecture rejects, now bracketed. Re-audit after any deck edit | Ademola | S | D-1, D-2, D-10 | none | M |
| [x] | D-4 | Reference site review (directorengineer.framer.media) | Agent | S | none | none | S |
| [ ] | D-5 | Ask Emmanuel Q1, Q2 and Q6: existing site, starting price, enquiry volume. The wording is in `pitch/emmanuel-question-sheet.md` Part 4 | Ademola | S | none | PRD Q1, Q2, Q6 | M |
| [ ] | D-6 | Write the pitch message and walkthrough script, calling out the date-first form | Ademola | S | D-3 | none | M |
| [ ] | D-7 | Send the pitch with the preview link and walkthrough | Ademola | S | D-6, P-20 | none | M |
| [ ] | D-8 | Record Emmanuel's answers to the open questions in this file | Ademola | S | D-7 | PRD section 12 | M |
| [ ] | D-9 | Confirm the supplied logo is the current official one, get a vector or flat file, and decide whether Alpha Movies or Boy Concept leads publicly | Ademola, Emmanuel | S | none | DESIGN 2, Q11, Q12 | M |
| [x] | D-10 | Question sheet for Emmanuel: every open question in the order that unblocks the most work (fourteen, after Q14 was added on 2026-10-10), the per-video permission table, and what counts as evidence for each credential | Agent | S | F-8 | PRD 12, Q1-Q14 | S |

### S. Framer capability spike

| Status | ID | Task | Owner | Size | Depends on | Refs | P |
|---|---|---|---|---|---|---|---|
| [~] | S-0 | A Framer account and one project exist on the Free plan in the builder's name (decision D13: a sandbox, never the shipped site), with the four CMS collections created using the ARCHITECTURE section 5 field names verbatim, so the spike has something to test in. Steps 1 to 3 of `ops/framer-setup-checklist.md`. Part done 2026-10-10: the four collections exist with every field read back from the account and correct, and SiteSettings holds one empty row. Open: the eight demo rows and four credential rows, the four answers in dataset section 9, and section 3, the component paste. Building it found three Framer limits the docs had wrong, now decision D14 | Ademola | S | none | ops/framer-setup-checklist.md 1, 2, 3, ARCH 5, D13, D14 | M |
| [ ] | S-1 | Confirm a code component can fetch an external endpoint in preview and on a published page | Ademola, Agent | S | S-0, F-6 | ARCH Verify 1 | M |
| [ ] | S-2 | Confirm Turnstile renders in the Framer runtime and in the Instagram in-app browser (iOS and Android) | Ademola, Agent | S | S-1 | ARCH Verify 1 | M |
| [ ] | S-3 | Check Framer native forms: owner notification, durable storage, export, spam protection, rate limiting | Ademola | S | S-0, F-6 | ARCH Verify 2 | M |
| [ ] | S-4 | Check Framer plan limits (CMS items, custom code) and the free domain suffix | Ademola | S | S-0, F-6 | ARCH Verify 3, 4 | M |
| [ ] | S-5 | Write docs/spikes/framer-capability-spike.md; update the Verify list and decision D4 | Agent | S | S-1, S-2, S-3, S-4 | none | M |

### P. Phase 0: Framer pitch demo (no backend)

Every task below happens inside the Framer project, so S-0 is an implicit dependency of all of them and is not repeated in each Depends on cell. `ops/framer-setup-checklist.md` is the setup path and section 7 is what not to do while building these.

| Status | ID | Task | Owner | Size | Depends on | Refs | P |
|---|---|---|---|---|---|---|---|
| [ ] | P-1 | Design tokens in Framer, taken from docs/DESIGN.md section 3, the type pair from section 4 and spacing from section 5. Do not copy values out of PRD section 10, it carries none | Ademola | S | F-6, F-9 | DESIGN 3, 4, 5 | M |
| [ ] | P-2 | Page skeleton and section order: nav, hero, showreel, portfolio, credentials, services, process, FAQ, form, footer | Ademola | S | P-1 | none | M |
| [ ] | P-3 | Hero with both CTAs | Ademola | S | P-2 | FR-1 | M |
| [ ] | P-4 | Showreel: poster first, video created on tap | Ademola | S | P-2 | FR-2 | M |
| [ ] | P-5 | CMS Project collection with verified and publish_ok; demo items marked as placeholders | Ademola | S | P-2 | FR-3, FR-27 | M |
| [ ] | P-6 | Portfolio grid, category filter, hide empty categories | Ademola | M | P-5 | FR-3, FR-26 | M |
| [ ] | P-7 | Project page template | Ademola | S | P-5 | FR-4 | M |
| [ ] | P-8 | CMS Credential collection and credentials section with the hide rule | Ademola | M | P-2 | FR-6, FR-7, FR-26 | M |
| [ ] | P-9 | Services, process and FAQ in the page, from content/copy.md | Ademola | S | F-8, P-2 | FR-19 | S |
| [ ] | P-10 | SiteSettings (WhatsApp digits, from-price text, response text, base city, links) and footer | Ademola | S | P-2 | FR-20 | M |
| [x] | P-11 | shared/whatsapp.ts: message builder and wa.me URL builder, digits only, with unit tests | Agent | S | F-6 | FR-12, ESSENTIALS rule 4 | M |
| [x] | P-12 | EnquiryForm.tsx: fields per PRD section 7, native validation, clientRequestId, local message build, confirmation screen with visible button and copy fallback | Agent | L | P-11 | FR-8, FR-11, FR-12, FR-13 | M |
| [x] | P-13 | Form rules: date window and short-notice flag, second date, country-aware phone input, WhatsApp-or-email rule, reference-video escape | Agent | M | P-12 | PRD 7 | M |
| [~] | P-14 | From-price line and response-time copy bound to SiteSettings | Agent | S | P-10, P-12 | FR-10, FR-15 | M |
| [ ] | P-15 | Direct WhatsApp link that works without JavaScript | Ademola | S | P-10 | FR-24 | M |
| [ ] | P-16 | GA4 events: form_submit and whatsapp_tap | Ademola | S | P-12 | FR-21 | S |
| [ ] | P-17 | Mobile pass: LCP on throttled 4G, contrast and keyboard checks, no autoplay iframes | Ademola | M | P-3 to P-15 | PRD 9 | M |
| [ ] | P-18 | Handoff test matrix: iOS Safari, Android Chrome, Instagram in-app on both; log in ops/test-matrix.md | Ademola | M | P-12, S-2 | ARCH 11 | M |
| [~] | P-19 | Placeholder register complete; every demo placeholder is bracketed. The register is now diffed against every bracket in `content/` (39 distinct, across copy.md, demo-dataset.md and verification-log.md) and lists exact tokens, so R-4's grep has a usable input. It stays open until the real CMS rows from P-5 and P-8 exist, because those placeholders are not in this repo yet | Agent | S | P-5, P-8 | PRD 8 | M |
| [ ] | P-20 | Publish the preview link (not the production domain) | Ademola | S | P-17, P-18, P-19 | none | M |
| [ ] | P-21 | Flat one-color wordmark, favicon mark and a 1200 x 630 social image | Ademola, Agent | S | C-1, DESIGN 2 | FR-20, L-3 | S |
| [x] | P-22 | Draft CMS rows with every client fact bracketed, so the grid, the filter, the credentials rule and the footer can be built before the answers arrive. No C task closes from it | Agent | S | F-8 | PRD 8, PRD 12 | S |
| [ ] | P-23 | Decide how demo rows render in the preview without weakening rule 8: a filter on the preview environment, or a second Framer project holding only demo rows. Recommendation and tradeoffs in demo-dataset.md section 9 | Ademola | S | P-22 | ESSENTIALS 8, FR-26, FR-27 | S |
| [ ] | P-24 | Put the privacy notice and the cookie choice in Framer: a real page at /privacy, linked from the footer so it is reachable from the home page as the directive requires, a link beside the form's consent line, and the banner from L-6 on load. The copy is drafted in content/copy.md and carries brackets, so the page can be built now but cannot publish until C-11 clears them | Ademola, Agent | M | L-4, C-10 | PRD 9, copy.md Privacy notice, ESSENTIALS 8 | M |

### G. Gates

See the Gates table above. Update it when a gate is decided.

### C. Phase 1: content and verification (client-dependent)

| Status | ID | Task | Owner | Size | Depends on | Refs | P |
|---|---|---|---|---|---|---|---|
| [ ] | C-1 | Brand assets: logo, colors, fonts | Emmanuel | M | G0 | PRD Q10 | M |
| [ ] | C-2 | Video links or source files and poster images for the agreed minimum | Emmanuel | L | G0 | PRD Q7 | M |
| [ ] | C-3 | Per-project client permission and music clearance check | Emmanuel | M | C-2 | PRD Q8, FR-27 | M |
| [ ] | C-4 | Verified registration details, RC checked on CAC | Ademola, Emmanuel | S | D-1 | PRD Q3 | M |
| [ ] | C-5 | Equipment list, collaborations and press, each with a source | Emmanuel | M | G0 | PRD Q3, Q4 | M |
| [ ] | C-6 | Verified stats with sources, or a decision to show none | Emmanuel | S | C-5 | FR-7 | M |
| [ ] | C-7 | Starting price and a response-time promise someone will keep | Emmanuel | S | G0 | PRD Q2, Q5 | M |
| [ ] | C-8 | WhatsApp number, who monitors it, who reads the email | Emmanuel | S | G0 | PRD Q5 | M |
| [ ] | C-9 | Agree the minimum content bar (projects per category, credentials count) | Ademola, Emmanuel | S | C-2, C-5 | FR-26 | M |
| [ ] | C-10 | Final site copy written from his answers into content/copy.md and approved | Agent, Emmanuel | M | C-7 | none | M |
| [ ] | C-11 | Enter content into the CMS with verified and publish_ok set; clear every placeholder | Ademola | M | C-1 to C-10 | PRD 8 | M |

### L. Phase 1: platform

| Status | ID | Task | Owner | Size | Depends on | Refs | P |
|---|---|---|---|---|---|---|---|
| [ ] | L-1 | Accounts in the client's name: domain, Framer (his project, the builder invited as editor, the subscription on his card, and the D13 sandbox project moved into it per `ops/framer-setup-checklist.md` section 8), GA4 (plus Cloudflare, Airtable, Resend if a backend is built) | Ademola, Emmanuel | M | G0 | ARCH 10, D13, Q10 | M |
| [ ] | L-2 | Connect the domain, SSL, www redirect | Ademola | S | L-1 | none | M |
| [ ] | L-3 | Titles, meta, OG image, favicon; check link previews in WhatsApp and Instagram | Ademola | S | C-1 | none | M |
| [~] | L-4 | Privacy notice page and consent text; check NDPA 2023 duties. The duties are read and written up in `docs/research/ndpa-2023-notes.md`, and the notice plus the cookie banner are drafted in `content/copy.md`. It stays open until someone qualified answers that note's section 13, the four tasks it spawned close, and the page exists in Framer (P-24) | Ademola | M | none | ARCH Verify 9 | M |
| [ ] | L-5 | GA4 on the production domain; confirm both events fire | Ademola | S | L-2, L-6, P-16 | FR-21 | S |
| [ ] | L-6 | Cookie and tracking consent before any analytics fires: an accept and a reject of equal weight, shown on load and not buried in the footer. The 2025 directive says a banner that only sits at the bottom of a page is treated as no consent at all, and this site plans GA4 (FR-21, P-16, ARCHITECTURE section 3) with no consent step in any doc. Draft copy and the component belong to P-24; the decision to add it as a duty is an ask-first rule change | Ademola | M | L-4 | docs/research/ndpa-2023-notes.md 3, 5, FR-21 | M |
| [ ] | L-7 | Reconcile ARCHITECTURE section 8 with the 2025 directive. It currently keeps an enquiry 24 months and spam 30 days; the directive's default is six calendar months, and it names the enquiry-that-did-not-become-a-contract case for destruction inside six months. Section 8 also has no breach path, where the Act requires notice to the Commission within 72 hours and to the affected people immediately, so the path belongs there even though Phase 0 stores nothing. A data model and retention change, so it needs the owner's sign-off, not an agent edit | Ademola, Agent | M | L-4 | ARCH 8, docs/research/ndpa-2023-notes.md 6, 8 | M |
| [ ] | L-8 | Processor inventory and written terms: Framer and the host now, plus Airtable, Resend and GA4 if G1 chooses a Worker. Confirm each one's own data terms and whether any transfer leaves Nigeria, then record the basis. Grows when the backend grows | Ademola | M | L-1, L-4 | docs/research/ndpa-2023-notes.md 9, ARCH 10 | M |
| [ ] | L-9 | Count the data subjects and decide the tier. Over 1,000 people in six months, or over 200 whose sensitive data is processed for commercial purposes, makes the business a controller of major importance: registration, a named officer and an annual audit return become duties, and the CAR deadline is 31 March. Blocked on the two counts in Q6 and Q14, now both in Part 4 of the question sheet, and on a professional read of the note | Ademola, Emmanuel | M | Q6, Q14 | docs/research/ndpa-2023-notes.md 2, 13 | M |

### B. Phase 1: backend (conditional on gate G1 choosing a Worker)

| Status | ID | Task | Owner | Size | Depends on | Refs | P |
|---|---|---|---|---|---|---|---|
| [ ] | B-1 | Scaffold /worker: Hono, Zod, Wrangler, Vitest, ESLint, strict tsconfig | Agent | S | G1 | ARCH 3 | C |
| [ ] | B-2 | config.ts: typed environment access | Agent | S | B-1 | none | C |
| [ ] | B-3 | schema.ts, phone.ts (libphonenumber-js) and unit tests | Agent | M | B-1 | PRD 7 | C |
| [ ] | B-4 | ref.ts and unit tests | Agent | S | B-1 | none | C |
| [ ] | B-5 | turnstile.ts and the honeypot | Agent | S | B-1 | FR-14 | C |
| [ ] | B-6 | ratelimit.ts: per contact plus loose IP backstop | Agent | M | B-1 | ARCH Verify 8 | C |
| [ ] | B-7 | Airtable test and prod bases with the Enquiry fields and an owner view | Ademola | S | L-1 | ARCH 5 | C |
| [ ] | B-8 | airtable.ts: insert, lookup by client_request_id, ref uniqueness check | Agent | M | B-7, B-2 | none | C |
| [ ] | B-9 | notify.ts via Resend to OWNER_EMAILS | Agent | S | B-2 | FR-18 | C |
| [ ] | B-10 | routes/enquiries.ts with dedupe and every failure row in ARCH 7 | Agent | L | B-3 to B-9 | FR-12, FR-28 | C |
| [ ] | B-11 | CORS from ALLOWED_ORIGINS; confirm the Framer preview origins | Agent | S | B-10 | ARCH 6 | C |
| [ ] | B-12 | Wire EnquiryForm to the API with the three fallbacks: Turnstile twice, 429, API down | Agent | M | B-10 | ARCH 7 | C |
| [ ] | B-13 | Deploy to test and exercise every failure row end to end | Ademola, Agent | M | B-12 | none | C |
| [ ] | B-14 | Resend domain verification (SPF, DKIM) and a Gmail inbox placement test | Ademola | S | L-1 | ARCH Verify 6 | C |
| [ ] | B-15 | Prod Worker on the api subdomain, secrets set, smoke test | Ademola | S | B-13, B-14 | none | C |
| [ ] | B-16 | CI: lint, typecheck and test on every PR | Agent | S | B-1, F-7 | none | C |

### R. Phase 1: rollout and launch

| Status | ID | Task | Owner | Size | Depends on | Refs | P |
|---|---|---|---|---|---|---|---|
| [ ] | R-1 | Rollout kit written: bio link, DM saved reply, highlight, staff script | Agent | S | C-7 | FR-25 | M |
| [ ] | R-2 | Owner guide: CMS, Airtable if built, deleting data on request | Agent | M | C-11 | ARCH 10 | M |
| [ ] | R-3 | Pre-launch test matrix passes on production | Ademola | M | C-11, L-2 | ARCH 11 | M |
| [ ] | R-4 | Content gate: no placeholders, nothing unverified or unpermitted visible, empty sections hide | Ademola | S | C-11 | FR-26, FR-27 | M |
| [ ] | R-5 | Performance and accessibility checks on production | Ademola | S | C-11 | PRD 9 | M |
| [ ] | R-6 | Launch checklist reviewed with Emmanuel and signed off (gate G3) | Ademola, Emmanuel | S | R-1 to R-5 | none | M |
| [ ] | R-7 | Publish the production site | Ademola | S | R-6 | none | M |
| [ ] | R-8 | Post-launch smoke test: a real submission end to end, with the correct WhatsApp message | Ademola | S | R-7 | none | M |
| [ ] | R-9 | Owner updates the Instagram bio link, saved reply and highlight | Emmanuel | S | R-7 | FR-25 | M |
| [ ] | R-10 | Handover checklist: accounts, both WhatsApp number locations, secret rotation, deletion process (gate G4) | Ademola, Emmanuel | M | R-8 | ARCH 10 | M |

### X. Post-launch (not counted in readiness)

| Status | ID | Task | Owner | Size | Depends on | Refs | P |
|---|---|---|---|---|---|---|---|
| [ ] | X-1 | 30-day review: metrics against PRD targets, decide form field cuts | Ademola | M | R-9 | PRD 4, 7 | S |
| [ ] | X-2 | Remove the builder from OWNER_EMAILS if deliverability is clean | Ademola | S | X-1 | ARCH 10 | S |
| [ ] | X-3 | Review the parked-feature triggers | Ademola | S | X-1 | PRD 5 | S |
| [ ] | X-4 | Phase 2 deposit, only if the owner asks | Ademola | L | X-1 | FR-22, FR-23 | S |

## Open questions tracker

Fill the Answer column as soon as Emmanuel responds, then update the PRD if an answer changes scope.

| # | Question | Status | Answer |
|---|---|---|---|
| Q1 | Does he already have a website or booking link? | open | |
| Q2 | Starting price for event coverage | open | |
| Q3 | Verified RC number, base city, equipment list | open | |
| Q4 | Verifiable view counts and client names | open | |
| Q5 | Which WhatsApp number receives briefs, who watches it, who reads the email | open | |
| Q6 | Roughly how many enquiries per week, and what share are price checks | open | |
| Q7 | Do his best videos exist as source files, or only on Instagram | open | |
| Q8 | Which clients allow public showing, and are tracks cleared for YouTube | open | |
| Q9 | Will he and his team change the Instagram bio and DM replies | open | |
| Q10 | Domain ownership, brand colors, and who holds each service account | open | |
| Q11 | Is the logo in the repo the current one, and is there a vector or flat version | open | |
| Q12 | Which name leads publicly, Alpha Movies or Boy Concept. The greeting in the WhatsApp brief depends on it | open | |
| Q13 | Added 2026-10-10 from the deck audit. Is Alpha Movies Ltd the registered name, was there a former trading name, and which Instagram and YouTube accounts are his. The deck asserted "formerly Tue Tue Concept" and two handles as fact, from a file labelled UNVERIFIED | open | |
| Q14 | Added 2026-10-10 from the data protection reading (L-4). How many people's details does the business actually hold, and how much of the published footage is at a religious or cultural event where faith or ethnicity shows. These two numbers decide whether Alpha Movies is a controller of major importance, which is where registration, a named data protection officer and annual audit returns become duties | open | |

## Blockers

None recorded. Add a row when a task is marked `[!]`.

| Task | Blocked by | Since | Next action |
|---|---|---|---|

## Progress log

Newest first. One line per PR or work session.

| Date | Who | What | Tasks | Files |
|---|---|---|---|---|
| 2026-10-10 | Agent (Qoder) with Ademola in the account | S-0 moved from paper to a real Framer project, and the CMS came back with three findings the docs had wrong. Recorded as decision D14 and reconciled in ARCHITECTURE 5 rather than left as a rumour: the count is **4 collections, not 3**, because a Framer Enum cannot hold multiple values so `deliverables` is a Reference to a new `Deliverable` collection carrying the six keys (`highlight_reel`, `full_film`, `same_day_edit`, `drone`, `social_cuts`, `other`, held as items and read back exact); `slug` is Framer's built-in and `title` is a real Text field, because Framer gave `Project` no built-in Name, so the checklist instruction to type every ARCHITECTURE 5 name "verbatim" would have produced a duplicate `slug`; and Framer cannot cap a collection at one row, which means the `SiteSettings` singleton is a convention the owner guide has to state, not a property of the tool. The URL and digits fields are Text on purpose, since a Link or Number field rejects `[Video URL]` and can eat a leading zero, which is ESSENTIALS rule 4 by another route. Verified by reading the four collections back out of the account and diffing field by field against section 5: Project 15 fields, Credential 5 with its lowercase Enum, SiteSettings 6 with one empty row, Deliverable 6 items, no camelCase renames, no extra fields, no invented values. S-0 goes to `[~]`, not `[x]`: the eight demo rows, the four credential rows, the four open answers in dataset section 9 and the section 3 component paste are still outstanding, so P-5 and P-8 are now the items and the section rather than the schema, and P-10 and P-14 are unblocked because a SiteSettings row now exists to bind to. The Basic tier is short by two collections, which strengthens D13 instead of denting it. Checks run: no em dash in any changed file, `node --test` 18 pass, placeholder diff still 39 distinct brackets in `content/` with none unregistered and `[Deliverables]` now annotated as a token that never enters Framer, scorecard recomputed by the parser (Must **12 of 70** unchanged, because `[~]` is not done, Should 4 of 11, all task rows eight cells, no bad priority value), and every new cross-reference (D14, ARCH 5, Verify 3, checklist 2 and 4, ESSENTIALS breakpoints, C-11, R-2, P-23, P-5, P-8, P-10, P-14) resolved against the files. Not run: anything about code components or the free domain suffix, which stay open at Verify 1, 3 and 4 and need section 3 and S-4 | S-0 to [~], D14, P-23 note | docs/ARCHITECTURE.md, docs/ARCHITECTURE_ESSENTIALS.md, ops/framer-setup-checklist.md, content/demo-dataset.md, content/PLACEHOLDERS.md, ROADMAP.md |
| 2026-10-10 | Agent (Qoder) | Decided the Framer account question instead of leaving it implicit, after Ademola chose option A. Read framer.com/pricing directly rather than a third-party guide (the guide contradicted Framer's own table on the free tier) and found the constraint nobody had written down: this site needs 3 CMS collections and Basic holds 2, so Basic cannot host it and the launch plan is Pro. Recorded as decision D13: build the spike and Phase 0 in a builder-owned Free project, move it into Emmanuel's project before go-live, so D10 (every account held by the client) stays intact rather than quietly bent. Wrote `ops/framer-setup-checklist.md` as the executable path, which also created the `/ops` folder on disk. The file deliberately points at ARCHITECTURE 5 for field names and at `framer/README.md` for prop mapping instead of copying either, because a second list drifts; it keeps a do-not-do section (never publish, no real client data, no guesses inside brackets, no budget field, date first, no Worker code) and names five things it cannot close: code-component plan gating, the free domain suffix, password protection per plan, who pays the monthly subscription, and whether a second demo project fits the Free limits. Added S-0 so the setup has a task and every later Framer task has a dependency to hang on (S-1, S-3, S-4 now depend on it); rewrote L-1, which previously just said "Framer" and let the next agent assume Basic; put the plan numbers into ARCHITECTURE 13 item 3 with the observation that the pricing page says nothing about code components, so S-1 and S-4 must observe rather than assume; added the fit constraint to ESSENTIALS Known breakpoints; and added the subscription cost to Q10 in the question sheet, since the day the client's domain connects is the day a card has to be attached. Must denominator 69 to 70, so readiness stays 17% (12 of 70). Checks run: scorecard recomputed by the parser from the priority column of every row (F 8/8, D 1/8, S 0/6, P 3/19, C 0/11, L 0/8, R 0/10, total 12 of 70, Should 4 of 11, B 16 rows all conditional and excluded), all task rows exactly eight cells with no bad priority value, no em dash in any changed or new file, `node --test` 18 pass, the placeholder diff unchanged at 39 distinct brackets in `content/` with none unregistered, the four CMS field names the checklist claims (verified, publish_ok, source, the SiteSettings pair) confirmed present in ARCHITECTURE 5, the four category enum values confirmed against `content/demo-dataset.md` section 4, S-0's section range aligned to the checklist's own header after they disagreed, and every new cross-reference (D13, S-0, `ops/framer-setup-checklist.md` sections 1 to 3, 4 and 8, ARCH 5, 10, 13 item 3, ESSENTIALS breakpoint, Q10) resolved against the files. Not run: anything inside Framer. Sections 8 and 9 of the checklist are the unverified mechanics, and only the real account can settle them | S-0, D13, L-1, Q10 | ops/framer-setup-checklist.md, docs/ARCHITECTURE.md, docs/ARCHITECTURE_ESSENTIALS.md, pitch/emmanuel-question-sheet.md, PROJECT_STRUCTURE.md, ROADMAP.md |
| 2026-10-10 | Agent (Qoder) | Diffed the placeholder register against the files it is supposed to cover, because R-4 is a grep against that table and a table with paraphrases in it is a gate that fails silently. Found three real mismatches, all in `content/demo-dataset.md`: the register listed `[One sentence...]` with an ellipsis while the rows actually carry `[One sentence]` and `[One sentence: what was made and for whom]`, and `[Wedding name]` was missing entirely (the wedding rows use it where the festival rows use `[Event name]`). All three are now exact tokens, since an ellipsis matches nothing in a grep. Registered `[Example Claim: Registered Company]` from `content/verification-log.md` the same way the register already registers its own `[Example Placeholder]`: it is a worked example inside a template, not a gap in the site, and R-4 should not stop for it. Wrote the check method and its scope at the top of the register, including the one thing it deliberately does not cover: bracketed scaffolding inside `/docs` (`[verify]`, `[agree with owner]`) is an open item in a document, not a placeholder in site copy. Result: all 39 distinct brackets across copy.md, demo-dataset.md and verification-log.md now resolve against the table. P-19 stays `[~]` rather than closing, and correctly so: its dependencies P-5 and P-8 are the real CMS rows in Framer, and a placeholder that exists only in the CMS is invisible from this repo. Checks run: the diff re-run after the fix returns zero unregistered tokens in `content/`, `[Poster: <title>]` confirmed literal before I trusted it, the register's own self-list excluded from the claim, no em dash in either changed file, `node --test` 18 pass unchanged, scorecard unchanged at 12 of 69 | P-19 note | content/PLACEHOLDERS.md, ROADMAP.md |
| 2026-10-10 | Agent (Qoder) | After L-4 merged, the question sheet was the only remaining lever an agent can pull without a Framer account or an answer, so it got fixed rather than admired. Two problems: Part 4, the message actually copied into WhatsApp, did not contain Q6 even though D-5 points at it for the wording, and it did not contain the new Q14, so the two counts L-9 needs would have waited for a call that has not happened. Part 4 now asks seven questions instead of five, adds the records count, the weekly enquiry count and the sensitive-footage question in plain phone language with no technical words, and D-5's pointer is now true. L-9 depends on Q6 and Q14, the first row in this file to be blocked on tracker questions rather than task IDs, because those two counts are the whole input. Nothing was invented and no answer was assumed. Checks run: the message block re-read for all seven questions matching Part 1 rows by Q number (Q1, Q2, Q5, Q7, Q8, Q6, Q14), the answer map still keys on the same Q numbers, no em dash anywhere in the changed files, and `node --test` unchanged at 18 pass | D-5 pointer, L-9, Q6 and Q14 into Part 4 | pitch/emmanuel-question-sheet.md, ROADMAP.md |
| 2026-10-10 | Agent (Qoder) | Worked L-4 as far as an agent can and stopped at the legal line. Read the operative instrument rather than the blog summaries: the Commission's Nigeria Data Protection (Nigeria Data Protection Act) General Application and Implementation Directive 2025, 117 pages. Getting its text took three detours worth recording, because the obvious routes all failed: `pdftoppm` is not installed here and installing tooling is an ask-first dependency, the Act PDF at placng.gov.ng is a scanned image with no text layer, cert.gov.ng sits behind a Cloudflare challenge, and the GAID PDF uses a custom font encoding that prints as shifted glyphs. Downloaded it whole and decoded it with two throwaway scripts in /tmp (stream inflate, then a uniform +0x1D shift scored line by line against /usr/share/dict/words). The note is `docs/research/ndpa-2023-notes.md`, which is a research note and not fact, still needs a professional read, and cites articles by name where the decoded digits came out mangled. Two live conflicts with this repo's own docs, both registered as tasks and neither silently fixed: ARCHITECTURE section 8 keeps an enquiry 24 months and spam 30 days, where the directive's default is six calendar months and its destruction rule names exactly the enquiry-that-did-not-become-a-contract case (L-7); and FR-21, P-16 and L-5 all plan GA4 with no cookie consent step anywhere in any doc, where the directive treats a bottom-only banner as no consent at all and requires an obstructed middle, left or right placement (L-6, which needs an ESSENTIALS rule and so needs Ademola). A third finding got no task of its own: section 8 carries no breach notification path, where the Act wants notice to the Commission inside 72 hours and to the affected people immediately, and since Phase 0 stores nothing the handling is conditional B section work; writing the obligation is folded into L-7 and the owner's side into R-2. ARCHITECTURE section 8 is otherwise untouched, because a data model change is ask-first; only its verify list, section 13 item 9, now records the reading and points at both conflicts. Drafted the privacy notice, the cookie notice and a footer link in content/copy.md with nine brackets, six of them new and all six registered in PLACEHOLDERS.md, and left the form's existing consent string alone because copy.md is declared the source of truth for framer/EnquiryForm.tsx. PRD section 9's `[verify obligations]` marker now points at the note and the four tasks instead of sitting unanswered, and section 5's In v1 list gained the notice page it never listed, which is documentation of a duty rather than a new decision. Added Q14 to the tracker and to the question sheet (records held, and how much footage reveals faith or ethnicity: the 200 and 1,000 thresholds decide whether the business is a controller of major importance, which is where registration, a named officer and an annual audit return land). Five Must tasks added (L-6 to L-9, P-24), so the Must denominator grows 64 to 69 and readiness drops 19% to 17%. That is the correct direction: nothing was un-done, five duties were written down. Checks run: `node --test` still 18 pass, and the change set is markdown only, so no code path was touched; scorecard recomputed from the priority column of every row with the parser (F 8/8, D 1/8, S 0/5, P 3/19, C 0/11, L 0/8, R 0/10, B 0/16 conditional, total 12 of 69 and Should 4 of 11), every task row in F, D, S, P, C, L and R parsed to exactly eight cells with no bad priority value, all twelve distinct brackets in content/copy.md confirmed present in the register and each register row that claims copy.md confirmed against it, and each cross-reference (L-6 to L-9, P-24, Q14, D-10 at fourteen, FR-21, FR-27, P-10, P-16, R-2, R-4, R-10, ESSENTIALS 8, PRD 9, ARCH 3, 8, 10, C-10, C-11) resolved against the files. Not run: any legal verification, and the note's own section 13 lists the seven decisions that need it | L-4 to [~], L-6, L-7, L-8, L-9, P-24 added, Q14, D-10 | docs/research/ndpa-2023-notes.md, content/copy.md, content/PLACEHOLDERS.md, pitch/emmanuel-question-sheet.md, docs/PRD.md, docs/ARCHITECTURE.md, ROADMAP.md, PROJECT_STRUCTURE.md |
| 2026-10-10 | Agent (Qoder) | Closed the design-doc ownership conflict instead of picking a hex. `docs/DESIGN.md` is now the single source for visual values (ARCHITECTURE decision D12, ESSENTIALS header line, PRD section 10 carries no token and points there). The black was never the real disagreement: PRD section 10 also said "bold, clean sans-serif" while DESIGN section 4 puts a serif in the display role, which is a visible change of direction and is not an agent's to sign off, so F-11 is added for Ademola. P-1 no longer tells anyone to read a hex out of the PRD. Fixed D-10, whose row still said twelve open questions after Q13 landed on 2026-10-10 (tracker verified at thirteen), and added the design-token copy to PROJECT_STRUCTURE Known duplication, which framer/README.md already claimed was listed there but was not. Checks run: scorecard recomputed from the tables with a parser that reads the priority column of every row (`12 of 64` Must unchanged, Should `4 of 11`, readiness still 19%), every task row re-counted to eight cells (95 rows, none malformed), no `#0A0A0A` left anywhere except `docs/research` (never read as fact) and the F-9 row that records the resolution, and every new cross-reference (D12, F-11, DESIGN 13 item 4) confirmed to exist | F-9, F-11 added, P-1, D-10 | docs/PRD.md, docs/DESIGN.md, docs/ARCHITECTURE.md, docs/ARCHITECTURE_ESSENTIALS.md, PROJECT_STRUCTURE.md, ROADMAP.md |
| 2026-10-10 | Agent (Qoder) | Audited the pitch deck against the rule that pitch material carries no unverified facts, after the question sheet made the deck's sources checkable. Three runs on slides 4 and 6 stated client facts sourced only from `docs/research/boy-concept-brief.md`, whose own header forbids copying names into pitch material: "formerly Tue Tue Concept", `@alpha.movies_`, YouTube `@Boy-concept`. All three now read `[Confirm ...]`. Slide 6 also promised "silent hover previews", which ARCHITECTURE 9 (video created on tap) and DESIGN 8 (no autoplaying iframes) reject, and which most visitors cannot do on a phone: changed to poster-first cards. Added Q13 for the name and handle confirmation, registered the deck's own brackets in the new Pitch material section of PLACEHOLDERS.md, and recorded how to edit this deck because the Presentations office engine can read it but refuses to save it. Fixed the question sheet, where a failed edit had left Part 1 without the Q column while the answer map below it keyed on Q numbers, so the two disagreed on main. Checks run: CRC and entry-count comparison against a copy of the original deck (67 entries, only the two intended parts changed), every XML part parsed, an unzip integrity test, and a re-read through the office engine showing the new text in the same boxes with an empty audit array. Not checked: opening it in PowerPoint or Canva, which no tool here can do [Likely fine]. No invented value was added to the deck, and no C task moved | D-3 note, Q13, D-10 fix | pitch/Alpha_Movies_Proposal.pptx, pitch/emmanuel-question-sheet.md, content/PLACEHOLDERS.md, ROADMAP.md, PROJECT_STRUCTURE.md |
| 2026-10-10 | Agent (Qoder) | Placeholder-backed content so the build stops waiting on the client. `content/demo-dataset.md`: SiteSettings, eight draft Project rows (two per FR-3 category) and four Credential rows, 31 bracketed tokens across 77 fields, every row `verified: false` and `publish_ok: false`, a DEMO badge spec, an empty-poster treatment that obeys DESIGN 9, and a seven-step flip-to-live. `pitch/emmanuel-question-sheet.md`: all twelve open questions ordered by how much they unblock, a per-video permission and music table, and what counts as evidence per claim. Declined to scrape the client's Instagram, with the reasons and the cheaper path in dataset section 7 and sheet Part 2 notes: his own channel is the source, per-project permission is his to grant, and ARCHITECTURE 3 already chose YouTube nocookie. Checks run: no em dashes in either file, every bracket in both files registered in PLACEHOLDERS.md, and the register's `[Example Placeholder]` row confirmed absent from copy.md and relabelled as an example. No C task is marked done and the Must denominator stays 64. `framer/EnquiryForm.tsx` and `shared/whatsapp.ts` were not touched, so no code was re-tested | P-22, D-10, and P-23 added | content/demo-dataset.md, pitch/emmanuel-question-sheet.md, content/PLACEHOLDERS.md, content/copy.md, ROADMAP.md, PROJECT_STRUCTURE.md |
| 2026-10-10 | Agent (Qoder) | Phase 0 form code. WhatsApp message and wa.me builders with 18 unit tests, EnquiryForm with the PRD section 7 fields plus the P-13 rules, and Framer handoff notes. Checks run: `tsc --strict` clean, 18 unit tests green on the Node built-in runner, and 22 assertions driving the rendered form in a jsdom harness (date first, no budget field, no auto-open, digits-only link, contact rule, reference escape, copy fallback, both number-unset paths). Nothing was installed in the repo. Still not run inside Framer, which is what P-17, P-18 and S-2 are for. Added F-9, F-10, D-9, P-21 and Q11, Q12: all referenced by docs/DESIGN.md but missing from this file | P-11, P-12, P-13, P-14 partial, P-19 partial, F-9, F-10, D-9, P-21 | shared/whatsapp.ts, shared/whatsapp.test.ts, framer/EnquiryForm.tsx, framer/README.md, content/copy.md, content/PLACEHOLDERS.md, ROADMAP.md, PROJECT_STRUCTURE.md |
| 2026-10-10 | Agent (Antigravity) | Added missing documents from unzipped folder and DESIGN.md | none | docs/DESIGN.md, pitch/Alpha_Movies_Proposal.pptx, docs/research/reference-site-notes.md, docs/research/boy-concept-brief.md, .github/CODEOWNERS, ROADMAP.md, PROJECT_STRUCTURE.md |
| 2026-10-10 | Agent (Antigravity) | Created content skeletons | F-8 | content/PLACEHOLDERS.md, content/verification-log.md, content/copy.md, ROADMAP.md |
| 2026-10-10 | Agent (Antigravity) | Added PR template and CI check for ROADMAP.md | F-7 | .github/pull_request_template.md, .github/workflows/ci.yml, ROADMAP.md |
| 2026-10-10 | Agent (Antigravity) | Scaffolded folders per PROJECT_STRUCTURE.md, moved docs, added README.md and .gitignore | F-6 | ROADMAP.md, README.md, .gitignore |
| 2026-10-06 | Agent (Claude) | Created ROADMAP.md and PROJECT_STRUCTURE.md. Added the contribution protocol to AGENTS.md, CLAUDE.md, PRD, ARCHITECTURE and ESSENTIALS. Replaced the manual phase line in AGENTS.md with this file | F-5 | ROADMAP.md, PROJECT_STRUCTURE.md, AGENTS.md, CLAUDE.md, PRD.md, ARCHITECTURE.md, ARCHITECTURE_ESSENTIALS.md |
| 2026-10-06 | Agent (Claude) | Wrote AGENTS.md and CLAUDE.md | F-4 | AGENTS.md, CLAUDE.md |
| 2026-10-06 | Agent (Claude) | Stress-tested the PRD and ARCHITECTURE and cut overbuilt items (v0.2) | F-1, F-2, F-3 | PRD.md, ARCHITECTURE.md, ARCHITECTURE_ESSENTIALS.md |
| 2026-10-05 | Agent (Claude) | First drafts of PRD, ARCHITECTURE and ESSENTIALS (v0.1) | F-1, F-2, F-3 | PRD.md, ARCHITECTURE.md, ARCHITECTURE_ESSENTIALS.md |
| 2026-10-05 | Agent (Claude) | Reviewed the reference site and generated the Canva-editable proposal deck | D-2, D-4 | Alpha_Movies_Proposal.pptx |
