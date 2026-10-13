# Demo Dataset: placeholder CMS content for the Phase 0 preview

Status: Draft v0.1 | Date: 2026-10-10 | Owner: Agent, awaiting Ademola's review | Pairs with: `docs/PRD.md` section 8 and section 11, `docs/ARCHITECTURE.md` section 5, `content/PLACEHOLDERS.md`, `content/verification-log.md`

PRD section 11 authorizes this file: the Phase 0 row says the pitch demo ships with "placeholders marked". Every value that belongs to the client is bracketed and replaceable. Nothing here is a claim about Alpha Movies.

## 1. What this is for

P-2, P-5, P-6, P-7, P-8 and P-10 need content rows to build against. Without them the portfolio grid, the category filter, the project template, the credentials hide rule and the footer cannot be laid out or tested, and the design work stalls behind the client's answers.

This file unblocks the build side. It does not unblock the content gate. C-1 to C-11, G2 and R-4 still need Emmanuel's real answers, and no row here may go live as written.

## 2. How to tell demo content from real content

Three signs, all deliberate:

1. Every slug starts with `demo-`.
2. Every field that holds a client fact contains brackets. A row with no brackets left in it has been invented, and must be deleted.
3. Each card and each credential shows a visible DEMO badge in the preview (see section 6).

`content/verification-log.md` is the only thing that turns a row real. A row is live when the claim behind it has a dated entry there, `verified` is true, and for a Project `publish_ok` is also true (FR-27, ESSENTIALS rule 8).

`PROJECT_STRUCTURE.md` principle 3 says unverified material lives in `/content`, labelled, and never in the CMS. This file is that labelled material. It is a draft of CMS rows, not CMS rows. Entering them is C-11's job, and only after section 8.

## 3. SiteSettings

Single record, fields per ARCHITECTURE section 5.

| Field | Value for the preview | Real value comes from |
|---|---|---|
| `whatsapp_number_digits` | `[Owner WhatsApp digits]` | Q5, C-8. International digits, no plus, no leading zeros |
| `from_price_text` | `[Starting Price]` | Q2, C-7 |
| `response_time_text` | `[Response Time]` | Q5, C-7. Only a time someone will actually keep |
| `base_city` | `[Base City]` | Q3, C-4 |
| `instagram_url` | `[Instagram URL]` | Q10. Unconfirmed handle, see section 7 |
| `youtube_url` | `[YouTube URL]` | Q7, Q10, C-2 |

Leave a field empty rather than filling it with a guess. `EnquiryForm` treats empty `whatsappDigits` as "no handoff button, show the copyable brief and the `[Enquiry Email]` line instead", which is the designed behaviour, not an error state.

## 4. Project rows

Eight rows, two per FR-3 category. The categories themselves are not placeholders; PRD FR-3 fixes them as Commercial, Cultural Festivals, Weddings, Documentaries. Everything inside a row is.

| slug | title | category | client_name | event_name | year | location | video_url | poster_image | hero_reel | deliverables | summary | publish_ok | verified | sort_order |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `demo-commercial-1` | `[Project title]` | Commercial | `[Client name]` | | `[Year]` | `[City]` | `[Video URL]` | (empty) | false | `[Deliverables]` | `[One sentence: what was made and for whom]` | false | false | 1 |
| `demo-commercial-2` | `[Project title]` | Commercial | `[Client name]` | | `[Year]` | `[City]` | `[Video URL]` | (empty) | false | `[Deliverables]` | `[One sentence]` | false | false | 2 |
| `demo-festival-1` | `[Project title]` | Cultural Festivals | `[Organiser name]` | `[Event name]` | `[Year]` | `[City]` | `[Video URL]` | (empty) | true | `[Deliverables]` | `[One sentence]` | false | false | 3 |
| `demo-festival-2` | `[Project title]` | Cultural Festivals | `[Organiser name]` | `[Event name]` | `[Year]` | `[City]` | `[Video URL]` | (empty) | false | `[Deliverables]` | `[One sentence]` | false | false | 4 |
| `demo-wedding-1` | `[Project title]` | Weddings | `[Couple or family name]` | `[Wedding name]` | `[Year]` | `[City]` | `[Video URL]` | (empty) | false | `[Deliverables]` | `[One sentence]` | false | false | 5 |
| `demo-wedding-2` | `[Project title]` | Weddings | `[Couple or family name]` | `[Wedding name]` | `[Year]` | `[City]` | `[Video URL]` | (empty) | false | `[Deliverables]` | `[One sentence]` | false | false | 6 |
| `demo-documentary-1` | `[Project title]` | Documentaries | `[Subject or commissioner]` | | `[Year]` | `[Location]` | `[Video URL]` | (empty) | false | `[Deliverables]` | `[One sentence]` | false | false | 7 |
| `demo-documentary-2` | `[Project title]` | Documentaries | `[Subject or commissioner]` | | `[Year]` | `[Location]` | `[Video URL]` | (empty) | false | `[Deliverables]` | `[One sentence]` | false | false | 8 |

`deliverables` values come from the `Deliverable` collection (ARCHITECTURE section 5, decision D14): highlight_reel, full_film, same_day_edit, drone, social_cuts, other. `deliverables` on a Project is a Reference to it and allows multiple.

### What does not go into Framer

Three columns in the table above cannot hold their own bracket, because of the field type the account ended up with (decision D14). They are the columns whose bracket stays in this file and does not become a field value:

- `year` is a **Number** field. Leave it empty on every demo row. A Number field has nowhere to
  put `[Year]`, and it will not take the bracket as text; `PLACEHOLDERS.md` already registers it
  as one of the three tokens that never enter Framer. The real years arrive with C-1.
- `deliverables` is a **Reference** field. Leave it empty on every demo row. If you need the reference binding tested, pick `other` on one row, which tests the link without claiming anything was delivered.
- `poster_image` is an **Image** field. See "Posters" below; it stays empty too.

Everything else in a row goes in as written, including `[Video URL]`, because `video_url` is a Text field and not a Link field.

Two rows per category so the filter, the grid and the empty-category rule (FR-26) are all testable. Eight is not a content bar. C-9 still has to agree the real minimum.

Deliberate gaps for testing the hide rules:
- Delete one whole category before P-6 to see the chip disappear.
- Set both `demo-wedding-*` rows to `publish_ok: false` to confirm a permitted-but-unverified project still does not render.

### Posters

`poster_image` stays empty in every demo row. Do not fill it.

DESIGN section 9 forbids stock footage and AI stand-ins for client work, and an Instagram frame scraped by an agent is both a rights question and a ToS question (section 7). An empty poster is the honest demo state.

For the layout, an empty poster renders as a 16:9 `--surface-2` block with the sparkle motif at 16 px in `--gold` and the caption `[Poster: <title>]` in `--text-muted` at 14 px. That is a placeholder you can look at, not a hole in the grid. DESIGN section 5 fixes the aspect ratio, so the block holds the grid geometry.

## 5. Credential rows

Fields per ARCHITECTURE section 5. `type` in the account is an Enum whose stored values are lowercase: `registration`, `equipment`, `collaboration`, `press` (decision D14, and Framer Enums are case sensitive). The words in the table below are the four DESIGN section 7 display labels, so pick the matching option from the dropdown rather than typing one.

| type | label | value | source | verified |
|---|---|---|---|---|
| Registration | Company registration | `Alpha Movies Ltd, RC [RC number]` | `[CAC search link or certificate]` | false |
| Equipment | Camera and support | `[Equipment list as the owner words it]` | `[Owner statement, or a dated photo or invoice]` | false |
| Collaboration | Collaborations | `[Names he cites, each one checked with that person]` | `[Named collaborator confirms]` | false |
| Press | Press | `[Outlet and headline]` | `[Article link]` | false |

The company name is not invented: `docs/PRD.md` line 3 and AGENTS.md both record "Boy Concept (operating as Alpha Movies Ltd)". The RC number is, and stays bracketed.

The research brief at `docs/research/boy-concept-brief.md` lists "10M+ Collective Digital Views", "RC 9388573" and a gear workflow. That file is titled UNVERIFIED and says so. Those values are not in this dataset and must not be added until each has a dated row in `content/verification-log.md`. Copying them from a doc in the repo is still an invented stat.

Stats (FR-7) get no demo row at all. A bracketed `[Amount] views` on a card reads as a lie with a gap in it. Either C-6 supplies a sourced number or the section shows none.

## 6. DEMO badge

Preview only. One line of code, one style, deleted at C-11.

- Portfolio card: small pill top right, text "DEMO", `--surface-3` background, `--text-2` text, 1 px `--line` border. Not gold. Gold means this matters or this is clickable (DESIGN section 1), and a warning badge is neither.
- Credential card: same pill before the value.
- Hero and page title: leave them bracketed in copy, which is already visible proof.

## 7. Videos and the Instagram question

Ademola asked whether we can source videos from the client's Instagram. Answer: the content is legitimate, the method is not, and there is a cheaper path.

What is fine:
- Emmanuel's own work is real work, so it satisfies DESIGN section 9 the moment he grants `publish_ok` per project (FR-27). His feed is the right place to look for what to feature.
- A list of links to his own posts is not a rights problem for him.

What is not fine, and why:
1. Scraping the feed. Downloading Instagram media violates their terms and the files are their CDN's, so the links break and the assets are not ours to ship into a pitch. Q7 already asks the same question in a clean way: does he have source files.
2. Embedding Instagram directly. ARCHITECTURE section 3 chose YouTube nocookie or Vimeo, created on tap, because his channel is on YouTube and because Instagram embeds inside a Framer component in an in-app browser is a fourth unverified runtime (section 13 verify item 1 adds one more).
3. Weddings are private (PRD risk 5). Even a permitted festival cut can carry a track that gets blocked on replay.

The cheap path, which needs no tooling and no scraping: Emmanuel posts the four to six cuts he wants featured to his own YouTube channel, unlisted if he prefers, and pastes the links into `pitch/emmanuel-question-sheet.md`. That gives source-of-truth files, stable embed URLs, and he is the one granting permission, so C-2 and C-3 close in one conversation. Q7 and Q8 exist to get exactly this answer.

Until then the showreel (P-4) builds against an empty `video_url`: poster block, the 72 px play control from DESIGN section 7, and a click that does nothing in the preview. The layout and the on-tap behaviour are what P-4 has to prove, and neither needs a real video.

## 8. Flip to live

Per row, in this order. C-11 and R-4 are the gates.

1. Get the value from Emmanuel, in writing, with a source.
2. Add a dated line to `content/verification-log.md`: claim, source, date, verified by.
3. Replace every bracket in the row. If a bracket survives, stop.
4. Set `verified: true`. For a Project also set `publish_ok: true` only if the client named in it has agreed to be shown.
5. Remove the DEMO badge.
6. Remove the placeholder from `content/PLACEHOLDERS.md`.
7. When the last bracket in the whole dataset is gone, C-11 is done and R-4 can be checked.

A row with brackets can be published to the preview link. It cannot reach the production domain (P-20 and R-4 both gate on the register being clear).

## 9. Decisions this file needs from Ademola

1. The render rule for demo rows. ARCHITECTURE section 5 says a Project shows only when `verified` and `publish_ok` are both true, and those booleans have no third state. Two options:
   - A. Put demo rows in the real collection with `verified: false`, and switch the preview's filter to "show everything on the preview environment". Cheap, one toggle, but it bends the rule that ESSENTIALS rule 8 calls a hard one.
   - B. Build the preview against a second Framer project whose CMS holds only demo rows. The rule stays intact where it matters, and the real project starts empty. Costs a rebuild of the grid bindings at C-11.
   - I did not pick, because the data model and the hard rule are both "ask first" items in AGENTS.md. My lean is B, and the rows above are paste-ready either way.
2. Whether the DEMO badge is on the cards or only on the section headings.
3. Section 7's YouTube path: ask it in the question sheet, or wait for Q7's answer first.
4. The empty-poster treatment in section 4 borrows the sparkle glyph, and DESIGN section 9 documents that glyph only as a bullet or a section marker. DESIGN's own rule is that anything not in it needs asking first. Either approve the new use at P-1 or pick another placeholder, for example the title alone centered in `--text-muted`.
