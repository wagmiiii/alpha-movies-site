# Emmanuel Question Sheet

Status: Draft v0.1 | Date: 2026-10-10 | Owner: Ademola | For: Emmanuel Feranmi Odeyale (Boy Concept / Alpha Movies Ltd)

Ten minutes of answers from Emmanuel unblocks the client-dependent half of the roadmap. This sheet is built so he can answer it in WhatsApp notes or out loud on a call, one question at a time, with no technical words.

## How to use it

1. Ademola sends Part 1 and Part 2 as messages, or reads them on a call and types the answers.
2. Answers go into three places, in this order: the evidence line in `content/verification-log.md`, then the Answer column of the Open questions tracker in `ROADMAP.md`, then the CMS row in `content/demo-dataset.md`.
3. Anything he cannot answer today stays bracketed. A gap is fine. A guess is not, because a wrong RC number or an unpermitted wedding clip is a real problem, not a typo.

Part 1 is in order of what unblocks the most work. Do Part 1 first even if there is no time for the rest.

## Part 1: the blocking questions

| # | Ask him this | What we do with the answer | Unblocks |
|---|---|---|---|
| 1 | Do you already have a website, a booking page or a link you send people? If yes, send it. | Decides whether we build the whole site or only the booking page | The entire roadmap (gate G0, PRD Q1) |
| 2 | What is the lowest job you would take for event coverage? One number, the honest one. | It becomes the "packages start from" line above the form, and it filters out people who cannot afford you | C-7, FR-10, the price line in `content/copy.md` |
| 3 | Which WhatsApp number should briefs land on? Is that the one on your Instagram bio? Who reads it during a shoot? | It is the number the form hands off to. It has to be a number you actually check | C-8, FR-12, ESSENTIALS rule 4 |
| 4 | Roughly how many enquiries come in a week, and how many are just asking the price? | Tells us whether the form needs more questions or fewer | PRD section 4 targets, X-1 |
| 5 | Are your best videos only on Instagram, or do you have the source files? | Source files go to YouTube so they can be embedded properly. Instagram links alone break and are not ours to pull | C-2, P-4, FR-2, PRD Q7 |
| 6 | Which past clients are OK with us showing their work publicly? And is the music cleared, or will it get muted on replay? | This is per-video, Part 2. A wedding clip shown without the couple's OK is the worst thing this site could do | C-3, FR-27, PRD Q8 and risk 5 |
| 7 | Your CAC registration: what is the RC number, and can you send a screenshot of the public search showing it? | The number only shows on the site once we have checked it ourselves on the CAC search | C-4, FR-6, D-1 |
| 8 | What gear do you and your team bring? Say it the way you would tell a client. | Becomes the Equipment credential card. No source, no card | C-5, FR-7 |
| 9 | Is the logo you sent the current one? Do you have the vector or a flat one-color version? Is there a version that works small in a browser tab? | The site uses the logo everywhere. At small sizes the 3D version turns to mud | C-1, P-21, D-9, PRD Q11 |
| 10 | Which name leads in public: Alpha Movies or Boy Concept? | It sets the page title, the hero and the first line of the WhatsApp brief the form writes | D-9, Q12, `shared/whatsapp.ts` greeting |
| 11 | Which Instagram handle is the real one, and which YouTube channel is yours? | The footer links and every "see more work" link | C-1, L-3, the footer |
| 12 | How fast will you genuinely reply to a brief? Same day? Within 24 hours? | The response-time promise. We only print a number you will keep | C-7, FR-15 |
| 13 | Who owns the domain you want, and who holds the accounts for email and analytics? If anything is in my name now, we move it to yours. | Every account must be in your name before handover, or the site breaks when I step away | L-1, L-2, R-10, gate G4 |

## Part 2: one line per video

Ask him for the four to six cuts he would lead a pitch with. One row each. Nothing on the site until the permission and music columns say yes.

| # | Title or caption as posted | Category (Commercial, Cultural Festival, Wedding, Documentary) | Who the client was | Event | Year | City | YouTube or source-file link | Client OK to show publicly? | Music cleared for replay? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | yes / no | yes / no |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |
| 4 | | | | | | | | | |
| 5 | | | | | | | | | |
| 6 | | | | | | | | | |

Notes for Ademola on this table:

- "Client OK" needs his word for it, not an assumption from the fact that the client posted the video themselves. Screenshot the DM into `content/verification-log.md`.
- A "no" on music is not a dead end. It means that cut goes on the site as a poster with a "full film on our channel" line rather than an embed that gets blocked mid-play.
- Two rows per category is enough to build and test the filter (FR-3, FR-26). C-9 still sets the real content bar.
- The Instagram question is answered here, not by us. His own work is the right content and he is the right person to grant permission. We do not download his feed.
- The two handles on file do not match: `@alpha.movies_` in `docs/research/boy-concept-brief.md` (that file is labelled UNVERIFIED) and `alpha_movies_ltd`, which Ademola quoted on 2026-10-10. Confirm which is his, and whether the other is a competitor or an old account. Until then neither appears in the footer.

## Part 3: the evidence list

FR-6 and FR-7 only print what has a source. This is what counts as proof, so he can send it in one go:

| Claim we want to make | What counts as the source | What does not count |
|---|---|---|
| Registered company | CAC public search screenshot, or the certificate | "Yes it's registered" |
| Years working, projects shot, views | A dated post, an analytics screenshot, or a named client confirming | Numbers from the old research brief |
| Gear and workflow | His own written list, or dated set photos | Assumed from a genre |
| Collaborations | The collaborator or brand confirming, by name | A tag in a photo |
| Press | A link to the article | A logo on a deck |

The figures in `docs/research/boy-concept-brief.md` ("10M+ Collective Digital Views", RC 9388573, the gear workflow line) are in the repo but are labelled unverified, and the brief says so itself. They are not on the site and not in the demo dataset. If they are true, Part 3 makes them usable.

## Part 4: send it like this

Copy this into WhatsApp. It asks the five questions that block the most work and nothing else, so he can answer from his phone in two minutes. The rest of Part 1 waits for the call.

```
Hi Emmanuel, five quick things so I can keep building the site:

1. Do you already have a website or a booking link you send to clients?
2. What is the lowest price you would take for event coverage? I will put
   "packages start from" on the site so we filter out price-only enquiries.
3. Which WhatsApp number should the briefs come to, and who checks it when
   you are on a shoot?
4. Are your best videos only on Instagram, or do you have the source files?
   If you have them, can you put the 4 or 6 you want to show on your YouTube
   channel? I will embed them from there so they play properly on the site.
5. For each of those videos: which client was it for, and are they OK with
   it being public? Weddings especially, I do not want to show anyone's
   footage without their OK.

Answer in any order. Whatever you send, I log the source before it goes on
the site, so nothing appears that you did not approve.
```

Do not send Part 2 or Part 3 as a wall of text. Part 2 works better as a voice note he answers, with Ademola typing the table after.

## What each answer turns into

| Answer | File that changes | Task that closes or moves |
|---|---|---|
| Q1 existing site or link | `ROADMAP.md` gates and critical path, PRD section 11 | G0, and possibly a re-scope of everything |
| Q2 starting price | `content/PLACEHOLDERS.md`, `content/demo-dataset.md` section 3, `content/copy.md` | C-7, and P-14 from `[~]` to done |
| Q3 RC number, base city, gear | `content/verification-log.md`, then the Registration and Equipment credential rows | C-4, C-5, FR-6, FR-7, D-1 |
| Q4 view counts and client names | `content/verification-log.md`, then the stats decision | C-6, FR-7 |
| Q5 WhatsApp number and reply time | `demo-dataset.md` SiteSettings, `framer/EnquiryForm.tsx` `whatsappDigits`, later the Worker variable | C-7, C-8, P-14, P-15, FR-12, FR-15 |
| Q6 enquiry volume mix | PRD section 4 targets | X-1 baseline, possible field cuts |
| Q7 source files | `demo-dataset.md` section 7 and `video_url` per row, Part 2 rows | C-2, P-4 |
| Q8 client permission and music | `content/verification-log.md`, then `publish_ok` per row | C-3, C-11, FR-27 |
| Q9 bio link and DM replies | `ops/rollout-kit.md` | R-1, R-9, FR-25 |
| Q10 domain, brand, account holders | `ops/handover-checklist.md`, `docs/DESIGN.md` section 3 if colors change | L-1, L-2, R-10, gate G4 |
| Q11 logo current and vector | `docs/DESIGN.md` section 2, and `assets/brand/` once F-10 puts the files in the repo (they are measured by DESIGN but not committed) | D-9, C-1, P-21 |
| Q12 Alpha Movies or Boy Concept | The greeting string in `shared/whatsapp.ts` and its copy in `framer/EnquiryForm.tsx` in the same change, `content/copy.md` hero, page titles | D-9, L-3 |

If Q10's answer is "some accounts are in your name", that is a launch blocker, not a detail. ARCHITECTURE decision D10 says every account is held by the client.
