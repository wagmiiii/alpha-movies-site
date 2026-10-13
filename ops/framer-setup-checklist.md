# Framer setup checklist

| | |
|---|---|
| For | Ademola, and any agent helping him |
| Decision it follows | ARCHITECTURE decision D13: build now in a builder-owned project on the Free plan, copy into the client's project before go-live (L-1), upgrade to Pro at launch |
| Tasks it serves | S-0 (this file's sections 1 to 3), then S-1 to S-5, then P-1 to P-15 |
| Written | 2026-10-10, after the pricing page was read directly |
| Updated | 2026-10-13: section 1 ticked against what the 2026-10-10 read-back actually proved, the project name settled, the CMS creation method written down, and one section 9 line corrected that still claimed the subscription was unasked |
| Not verified here | Whether code components are limited by plan, the free domain suffix, and how a project moves between accounts. Sections 8 and 9 keep those open instead of guessing |
| Progress | Section 1 is part done (the account and the one project exist; the name, the workspace note and the plan confirmation are open). Section 2 is done except the demo rows and the four dataset answers, verified by reading the CMS back out of the account on 2026-10-10. Section 3 is open. What section 2 taught us is decision D14 in ARCHITECTURE |

## 0. The shape, so nobody has to re-decide it

- Today: **your own Framer account, Free plan, one project.** Nothing public, nothing billed to the client, no real client data in it.
- At launch: the site lives in **Emmanuel's** account and his project, per ARCHITECTURE decision D10 (every account is held by the client) and section 10's ownership table. That is task L-1.
- The plan that ships is **Pro**, not Basic, for the reason in section 4.

The reason the two-account shape is allowed at all: the spike can change the design (S-1 and S-2 test whether Turnstile and an outbound fetch even work inside the Framer runtime), and there is no version of that work worth doing inside a client account before gate G0 has passed.

## 1. Account, today (S-0)

- [x] Signed up, no card added. Done on or before 2026-10-10, which is when the CMS in that account
  was first read back. The reason the box said "the email you want attached to this work" is that
  the login email becomes the owner's email at L-1 (decision D10), so if the account is on an email
  nobody intends to hand over, say so now rather than at launch.
- [ ] Name the project **Boy Concept**. That is the name a visitor sees in the browser tab and in
  the Framer share preview. Whether it also becomes part of the free Framer address is one of the
  S-4 checks, so do not assume it. It does not rename this repository: `alpha-movies-site` stays,
  because the folder holds the docs, the content and the Phase 1 Worker plan as well as the site,
  and ROADMAP and PROJECT_STRUCTURE paths are written against it. If the project already exists
  under another name, rename it in the project settings rather than creating a second one, because
  S-0 is one project.
- [ ] Note the workspace name, and write it into the Progress log line in `ROADMAP.md` when you
  open the spike results (S-5). The project name is settled by the row above; the workspace name is
  whatever the account made. If a future agent cannot tell which project is the real one, that is a
  defect.
- [x] **One project** exists for this site, not a copy per page. Observed on 2026-10-10 when the
  four collections and their fields were read back out of it.
- [ ] Do not connect a domain. Do not publish. See section 7. Not re-checked: the 2026-10-10
  read-back covered the CMS, not the domain or visibility settings. Look at both once in project
  settings and tick this only after you have looked. The wish for "boy concept" in the
  address people type is asked of Emmanuel at Q10 in `pitch/emmanuel-question-sheet.md`, and what
  the free Framer address actually looks like is one of the S-4 checks, so neither half of it is
  settled here.
- [ ] Confirm the plan you landed on really is Free, and screenshot the limits page for this project into the spike file. The free-tier numbers below came from Framer's pricing page on 2026-10-10 and Framer changes them.

## 2. CMS collections (S-0, and it is P-5 and P-8 first)

Four collections, no more. The count went from three to four when the real project was
built, because Framer cannot hold multiple values in an Enum (decision D14):

1. `Project`
2. `Credential`
3. `SiteSettings` (one row by convention; Framer cannot enforce it)
4. `Deliverable` (holds the six deliverable keys as items)

- [x] Created all four with the field names in `docs/ARCHITECTURE.md` section 5, verbatim,
  including `verified` and `publish_ok` on Project and `source` on Credential. Read back from
  the account on 2026-10-10: Project 15 fields, Credential 5, SiteSettings 6, Deliverable 6
  items. `slug` is Framer's built-in rather than a field, and `title` is a real field because
  Project has no built-in Name.
- [x] `category` set to the four values used in `content/demo-dataset.md` section 4
  (Commercial, Cultural Festivals, Weddings, Documentaries). `Credential.type` set to
  registration, equipment, collaboration, press. Enum values are case sensitive.
- [ ] Paste the eight `demo-*` rows from `content/demo-dataset.md` section 4 and the credential
  rows from its section 5, and keep `verified` and `publish_ok` **false** on all of them, which is
  what makes rule 8 hold while the demo content is in there. Type every bracket in as written
  **except** the three columns listed under "What does not go into Framer" in that section: `year`
  is a Number field, `deliverables` is a Reference and `poster_image` is an Image, so none of them
  can hold a bracket and each stays empty. On the credential rows pick `type` from the dropdown
  (the stored values are lowercase) rather than typing the display label.
  Not done as of 2026-10-10: Project and Credential both report 0 items.
- [x] One empty row exists in `SiteSettings`, and `whatsapp_number_digits` is **empty** in it.
  With it empty the form shows the copyable-brief fallback instead of an Open WhatsApp button
  that goes nowhere, and that fallback is the thing we want visible in the preview. Add no
  second row, ever, because nothing stops you.
- [ ] Read `content/demo-dataset.md` section 9 and answer its four open items while you are in
  the CMS: the demo-row render rule (P-23), the DEMO badge placement, the YouTube path at
  section 7, and the sparkle glyph approval.

**How those boxes got ticked, if anyone has to do it again** (2026-10-10, Certain because we hit all
of it): this account would not take hand-typed field definitions, so the collections were built
through Framer's own AI agent. Three things mattered. Tell it to finish every step in one run,
because the first run created the four collection shells and skipped almost every field. Tell it to
leave an existing field unchanged rather than substitute its own idea of a better type. And make it
read the schema back at the end, because the read-back is the only reason we noticed the gaps, and
that read-back is what decision D14 is written from. Trust the read-back, not the agent's summary of
what it did.

Three field types are deliberate and a future agent must not "fix" them (D14): `video_url`,
`instagram_url` and `youtube_url` are Text so a `[bracket]` survives, `whatsapp_number_digits`
is Text so nobody can lose a leading digit or type a plus, and `summary` is Text rather than
Rich Text so the card cannot inherit formatting DESIGN does not own. `deliverables` is a
Reference to `Deliverable`, multi-select, left **empty** on every demo row, because a Reference
field cannot hold a bracket, and `year` is empty for the same reason: it is a Number field, so
`[Year]` does not type in. Both are paste traps rather than mistakes. A Number or Reference field
has nowhere to put a bracket, so those two fields stay empty and the rest of the row is still
correct.
See "What does not go into Framer" in `content/demo-dataset.md` section 4.

## 3. Component

- [ ] Paste `framer/EnquiryForm.tsx` as a code component. Its own `framer/README.md` covers the paste and the props.
- [ ] Set the props from the "Props the owner must set" table in `framer/README.md`, bound to the SiteSettings row. That table is the source for prop-to-field mapping; do not restate it here either.
- [ ] Add the no-JavaScript direct WhatsApp link as a plain Framer text link (FR-24, P-15). A code component cannot render without JavaScript, so this link cannot live inside the component.
- [ ] Do not add any bot defence to the form yet. Honeypot, Turnstile and rate limiting are Worker-side and Phase 0 submits to nowhere (ESSENTIALS, phase guard).

## 4. Why Basic is not enough, and Pro is the launch plan

Read from framer.com/pricing on 2026-10-10 [Certain that the page says this today]:

| Plan | Price | CMS collections | Items | Custom domain |
|---|---|---|---|---|
| Free | $0 | 10 | 1,000 | no, free Framer domain only |
| Basic | $10/mo | **2** | 2,500 | yes |
| Pro | $30/mo | 10 | up to 40,000 | yes, plus a staging environment |

- This site needs **4** collections (ARCHITECTURE section 5, decision D14). **Basic caps at 2**, so Basic is short by two and cannot hold this site. That is the trap: the cheap plan with a custom domain is the one plan that does not fit.
- Free gives 10 collections, 1,000 items and up to 3 editors, which covers all of Phase 0 except a custom domain, and Phase 0 does not want a custom domain (P-20 is the preview link).
- So: **Free now, Pro at launch.** Pro also brings a staging environment, which is what you want if P-23 ends up being a second project for demo rows rather than a filter.
- Free has a 5 MB file upload limit. Posters only, because video comes from YouTube by URL (`video_url`), so this constrains poster image size, not the films. Check the real behaviour when you upload the first poster and write the number into the spike file.

## 5. Visual setup (P-1, and it is where F-9 lands)

- [ ] Set the colours, type and spacing from `docs/DESIGN.md` sections 3, 4 and 5. **DESIGN.md is the single source for every visual value** (decision D12). `docs/PRD.md` section 10 states intent and carries no hex and no font name, so read nothing out of it.
- [ ] Note that DESIGN section 4 puts a **serif** in the display role while the PRD once said bold sans. F-11 is the open sign-off on that direction. If you build the type before F-11 is answered, build it so the display face is one change away.
- [ ] Check Marcellus against the supplied logo (DESIGN section 13 item 4, P-1's own note) and record what you see. That is the only part of the visual system an agent cannot judge.
- [ ] Keep gold under roughly 10% of a viewport (DESIGN 13 item 5).

## 6. Then run the spike, in this order

The point of the account is not the build, it is these four answers, and two of them can invalidate the design:

- [ ] S-1: can a code component fetch an external endpoint, in a draft and on a published page.
- [ ] S-2: does Turnstile render in the Framer runtime, and inside the Instagram in-app browser on iOS and Android.
- [ ] S-3: does Framer's native form already give owner notification, durable storage, export and any spam protection. If it does, decision D4 and possibly the whole Worker (task B section) are unnecessary, and that changes the roadmap more than anything else in this file.
- [ ] S-4: the plan limits for this project, and the free domain suffix (ARCHITECTURE Verify 3 and 4). Section 4 above is the paper answer; S-4 is the observed one.
- [ ] S-5: write all of it into `docs/spikes/framer-capability-spike.md`, update the Verify list and decision D4, and record what changed in `ROADMAP.md`.

## 7. Do not do these

- Do not publish the site. `AGENTS.md` forbids it, and a published page is indexable and shareable beyond the pitch. Share the draft or preview link only (P-20).
- Do not put a real enquiry, a real phone number or a real client name into this project. It is a builder-owned sandbox until section 8 moves it.
- Do not fill a bracket with a guess to make a page look finished. Brackets stay until they have a dated line in `content/verification-log.md` (rule 8, and C-11 clears them).
- Do not add a budget field anywhere, and keep the date field first (ESSENTIALS hard rules).
- Do not write Worker, Airtable, Resend, Turnstile-on-the-server or availability code. Gate G0 has not passed and G1 has not been decided.
- Do not deploy anything, even to test, without asking.

## 8. Moving it into the client's account at launch (L-1)

Unverified mechanics: Framer supports copying or transferring a project between accounts [Likely, not confirmed, and it is the first thing to test]. Confirm it before you rely on it, and prefer this order:

1. Emmanuel creates his own Framer account and his own project. He holds the login and the card.
2. You are invited as **editor**, not owner (ARCHITECTURE section 10 ownership table).
3. Try a project copy or transfer from the builder project into his. If it works, re-check CMS fields, props and the two render rules by eye, because a copy is where silent losses happen.
4. If a copy is not available, rebuild in his project and re-enter the CMS rows from `content/demo-dataset.md` and the copy from `content/copy.md`. That is the expensive branch, and it is cheaper the earlier we know about it, so test it once during the spike rather than at launch.
5. Upgrade to Pro, connect the domain (L-2), and only then run the pre-launch gates R-3 to R-6.

The two places the WhatsApp number must match at handover: SiteSettings and the Worker variable `OWNER_WHATSAPP_DIGITS` (R-10, ESSENTIALS).

## 9. Open, and this file cannot close them

- Does a paid plan gate code components. Framer's pricing page names no code-component limit either way [Certain: the page is silent. Guessing: therefore they are not gated. S-1 and S-4 settle it by observation, not by reading].
- The free domain suffix (ARCHITECTURE Verify 4). The reference site used `framer.media`; your account may differ.
- Whether password protection is available on Free. Worth knowing, because a pitch preview that anyone with the link can find is a different exposure from one that is also indexed.
- Who pays the $30 a month at launch, and whose name goes in the address. Both are asked now: row
  12 of `pitch/emmanuel-question-sheet.md` carries the subscription and the card, and the same row
  asks which name the URL should say. What is still open is the answer, which is D-5's job.
- Whether a second project (P-23's other branch) fits the plan limits, or whether Free counts collections and items across the account rather than per project. The pricing page does not say [Not verified. S-4 observes it by creating the second project and reading what the account reports].
