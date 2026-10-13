# Hosting and backend alternatives: Vercel plus Supabase, against Framer

**Status: an input, not a decision, and not a fact base.** Nothing here changes ARCHITECTURE
decision D13 (Framer, Free sandbox now and Pro at launch) or gate G1 (is Framer's native form
enough, or do we build the Worker?). Both stay open, and both are decided by tasks that have not
run yet: S-1 to S-5. Read it next to `docs/ARCHITECTURE.md` section 3, the stack decisions it
reviews, `docs/spikes/framer-capability-spike.md` for what the checks are, and section 15 for
where a switch would have to be recorded.

Why it exists: on 2026-10-13 Ademola asked whether we could drop Framer and host on Vercel with
Supabase as the backend. That question is worth writing down because it comes back at every price
reminder, and because the answer is different for the two halves of it.

`docs/ARCHITECTURE.md` section 3 already answers it in one line each, in its Rejected column:
Vercel functions are "workable, no advantage here", and Supabase is "better long term, no owner UI.
Move when volume or payments demand it". This file is the working behind those two lines, with
prices and dates, so the next time the question comes it gets answered from a record rather than
from a feeling.

## 1. The two layers are not one decision

Framer currently does two jobs at once, and the question mixes them:

| Layer | What it is for | Who uses it | If we left Framer |
|---|---|---|---|
| Authoring | pages, the CMS the owner edits, publishing | Ademola and later the client, in a visual editor | Replaced by code plus a separate admin surface. Nobody gets a visual editor back for free |
| Hosting and backend | serving the site, taking enquiries | Visitors and the form | Vercel can serve. The enquiry path is exactly what gate G1 is about, and it is not a Framer question |

Dropping Framer is an authoring decision. Supabase is a backend decision. Only the second one is
what G1 asks.

## 2. What the money actually says

Prices read from the vendors' own pricing pages on 2026-10-13. They change; the Framer numbers in
this repo were read on 2026-10-10 and are already stale in one respect (the collection count went
from 3 to 4 with decision D14).

| | Free tier | The tier this site would need |
|---|---|---|
| Framer | $0. 10 collections, 1,000 items, no custom domain [Certain: pricing page, 2026-10-10] | Pro $30 a month, which holds the 4 collections this site needs and a custom domain. Basic $10 holds 2 collections, so Basic cannot hold this site (D13, D14) |
| Vercel | Hobby $0: 1M function invocations, 100 GB data transfer, and it is restricted to a "personal project" [Certain: pricing page, 2026-10-13] | Pro $20 a month. The free tier is not available for a commercial site, and this is a business site that takes bookings [Certain wording, Likely application: Vercel defines Hobby as personal, non-commercial use] |
| Supabase | Free $0: 2 active projects, 500 MB database, 5 GB egress, and "Free projects are paused after 1 week of inactivity" [Certain: pricing page, 2026-10-13] | Pro $25 a month, 8 GB database, includes $10 a month of compute credit [Certain: same page] |

Two facts in that table decide the arithmetic on its own.

- Vercel's free tier excludes commercial use, so the cheapest honest Vercel number for this site
  is $20.
- Supabase pauses a free project after a week of nothing happening. A lead-capture site for a
  videographer is quiet for weeks at a time, and a paused project that holds enquiries is a
  storage risk on the exact thing the project exists for. So the cheapest honest Supabase number
  is $25.

$20 plus $25 is $45 a month for the two layers, against $30 for Framer Pro doing both of them,
including the CMS the owner edits. That is the whole comparison in one line, and it is why the
switch loses on price. [Certain: the prices above. Likely: the conclusion, given our usage shape.]

## 3. What switching would cost besides money

None of these are guesses. Each is work nobody has scoped:

- An admin surface. The whole credibility layer is `verified` and `publish_ok` flags the owner
  ticks in the CMS (ARCHITECTURE section 5, PRD FR-6, FR-7 and FR-27). Supabase gives rows and an
  API, not a screen. Someone builds and maintains that screen, or the owner stops being able to
  publish anything, and R-2 (the owner guide) becomes a developer guide.
- A frontend. Pages, the portfolio grid, the category filter with its empty-category rule (FR-26),
  the project template and every DESIGN.md token become code. DESIGN owns visual values (D12) and
  `framer/EnquiryForm.tsx` is written for Framer's props model, so the component moves too.
- Export is not a way out. Whether Framer lets you take the built site elsewhere is [Not
  verified. It belongs with the S-4 plan-limits check, which has not run]. Assume no for now,
  which means switching is a rebuild, not a migration.
- Client handover. D10 says every account ends in the client's name, and R-10 checks it. Three
  accounts to hand over, one of them with a credit card attached and a pause rule, is harder to
  hand over than one.
- Data protection. Supabase becomes a processor, so the L-8 processor inventory gains a name and
  written terms. NDPA notes are in `docs/research/ndpa-2023-notes.md`; nothing here claims the
  duty is discharged either way.

## 4. Where the question is still live

Two places, and neither is "ditch Framer":

1. **Gate G1, the enquiry backend.** If S-3 shows Framer's native forms do not give durable
   storage, export and spam protection, we need a backend whatever hosts the pages. The parked
   shape is the Cloudflare Worker in section 3 and the B tasks. A Worker's free plan covers
   "100,000 [requests] per day" (Cloudflare's Workers pricing docs, read 2026-10-13), which is far
   above this site's likely volume, and the volume is still unknown until Q6 is answered, which is
   D-5's job. So the backend question is about *where the Worker and the store live*, not about
   replacing the site builder. [Certain: the request figure, quoted from the docs page. Guessing:
   that our volume stays low. Not checked: whether that plan fits a commercial site's terms, which
   is the same question Vercel's Hobby tier raises.]
2. **The page host, after launch, if the price moves.** Framer Pro at $30 is the cheapest option
   that includes a visual CMS the owner can use. That only stops being true if Framer raises the
   price or a component limit bites. S-4 is the check that would notice.

## 5. What would have to be true to make a switch right

Written down so this file has a use later rather than being a mood:

- Ademola or the client stops wanting to edit content themselves. The CMS is the reason Framer
  wins, and it is the assumption that breaks the arithmetic.
- The site outgrows Framer's plan in a way S-1 to S-4 confirm is a hard limit, not a price.
- A second real feature lands from the parked list (availability calendar, client portal) where a
  codebase is genuinely cheaper than Framer workarounds.
- Someone is accountable for maintaining a frontend and an admin UI after handover. Right now
  that person is not in any doc.

## 6. Open items in this file

1. Vercel's commercial-use wording read in full from its terms, not inferred from the pricing
   page label. [Not verified]
2. Whether Framer exports a usable static build. [Not verified. Belongs to S-4]
3. Supabase's data residency and backup behaviour against NDPA, since this would store names and
   phone numbers. [Not verified. Belongs to L-8 once G1 chooses a backend]
4. Cloudflare Pages as a third shape (free, commercial allowed, same vendor as the Worker). Not
   priced here because the Worker question is already open at G1.

If any of those four changes the conclusion, the change belongs in a new decision row in
ARCHITECTURE section 15, not in an edit to this file.
