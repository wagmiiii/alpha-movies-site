# Site Copy

This file is the single source of truth for all site text.
Edit copy here first and review before pasting it into Framer.

## Global / Site Settings

Values for the Phase 0 preview are drafted in `content/demo-dataset.md` section 3, bracketed. Replace a bracket here only once it has a dated line in `content/verification-log.md`, then paste it into the Framer CMS.
- **Base City:** `[Base City]`
- **Starting Price:** `[Starting Price]`
- **Response Time:** `[Response Time]`

## Home Page
### Hero
- **Headline:** 
- **Subheadline:** 
- **CTA Primary:** 
- **CTA Secondary:** 

### Enquiry form
Source of truth for `framer/EnquiryForm.tsx`. The component carries these strings inline,
so change here first and then the component, in one commit (P-12, P-13).
Wording still needs Ademola's review before the pitch demo goes out.

- **Heading:** Check a date
- **Price line:** Packages start from `[Starting Price]`
- **Fields, in this order:** Event date, Second date or end date (optional), Project type,
  Venue (optional), City, Country, Duration, Deliverables, Reference video, Name,
  Company or agency (optional), WhatsApp number, Email, Notes (optional), Consent
- **Date help (short notice):** Short notice, we will confirm availability
- **Date checkbox:** Dates are flexible
- **Phone help:** A local number starting with 0 works, so does one with the country code.
- **Reference escape:** I will describe it instead
- **Consent:** I agree to be contacted about this enquiry
- **Submit:** Send brief
- **Direct link:** Already booked with us? Message directly

Validation messages, one per rule:

| Field | Message |
|---|---|
| Event date, empty | Choose the date you need us. |
| Event date, not a picked date | Use the date picker. |
| Event date, in the past | That date has passed. |
| Event date, over 24 months out | We only take briefs up to two years ahead. |
| Second date, before the first | The second date is after the first. |
| Second date, over 24 months out | That is more than two years ahead. |
| Project type | Pick the closest type. |
| City | Which city? |
| Duration | Half day, full day or longer? |
| Deliverables | Choose at least one. |
| Reference, bad link | Paste a full link starting with http or https. |
| Reference, empty and no escape | Add a link, or tick the box and describe it in Notes. |
| Notes, empty with the escape ticked | Tell us what you want instead of a link. |
| Name | Who are we speaking to? |
| Contact, neither number nor email | Give us a WhatsApp number or an email, either is enough. |
| Consent | We need your OK to reply. |

Confirmation screen, after submit:

- **Title:** Brief received
- **Lead:** Send it to us now and we will pick up the date straight away. WhatsApp will not
  open by itself, so press the button.
- **Button:** Open WhatsApp
- **Message label:** The message you are sending
- **Copy button:** Copy message, then Copied
- **No number set:** The WhatsApp number is not set on this page yet. Copy the brief below
  and send it to us, or mail `[Enquiry Email]`.
- **Footnote (Phase 0 only):** Nothing is saved until you send it. This demo stores no
  enquiry and sends no email.
- **Direct link opening line:** Hello Alpha Movies, I have a brief to send.

### WhatsApp brief format
Fixed by PRD section 7. Built in `shared/whatsapp.ts`. Do not reword it in Framer.

```
Hello Alpha Movies, I just submitted a brief (Ref AM-7K3Q5).
Project: Wedding or event
Date: 14 Feb 2027 (flexible: no)
Location: Lagos Island, Lagos, Nigeria
Duration: Full day
Deliverables: Highlight reel, Drone coverage
Reference: https://www.youtube.com/watch?v=...
Name: Ada and Tunde
```

The Ref line is absent in Phase 0. Company and Email lines appear only when filled in.
Notes is the only line cut when the message nears the 1000 character limit.
The brand name in the greeting is open item Q12 in DESIGN.md section 2.

### Services
- **Service 1:**
- **Service 2:**

### Process
- **Step 1:**
- **Step 2:**
- **Step 3:**

### FAQ
- **Q:**
- **A:**

## Privacy notice (page)

Drafted against the ten items the Act requires of a controller, listed in
`docs/research/ndpa-2023-notes.md` section 4. No lawyer has read it and L-4 stays open until one
does. Every bracket is a client fact or an open decision, and none of it publishes until the
notice is signed off.

- **Page title:** Privacy notice
- **Intro:** You sent us a brief, we use it to answer you, and you can ask us to delete it whenever you like. Nothing here is written to be hard to find.
- **Who we are:** Alpha Movies Ltd, registered in Nigeria, RC `[RC number]`. We work out of `[Base City]`. `[Confirm the trading name]` if the business trades under another name.
- **Why we have your details:** You sent us a brief. We use it to answer you and to quote for the job. Not for anything else, and not for marketing unless you say yes to that separately.
- **The lawful reason:** We are answering an enquiry you started. Where we need your permission we ask for it, and you can take it back at any time.
- **What we collect:** The fields on the booking form, in the order the form asks them. Event dates, project type, venue, city and country, how long you need us, what you want delivered, an optional reference link, your name, your WhatsApp number, your email if you give one, and your notes. We do not ask what your budget is.
- **What happens when you press send:** The brief is handed to us on WhatsApp. This preview page stores nothing and sends no email.
- **Who else touches it:** Framer hosts this site and holds what is on it. `[Phase 1 processor list]` That line is written after gate G1, once we know which tools hold an enquiry and what each one does with it.
- **Where your details are held:** Some of the tools that run this site keep data outside Nigeria. `[Cross-border basis]` The ground we rely on comes from task L-8.
- **How long we keep it:** An enquiry that did not turn into a job is deleted within `[Retention period]`. A booked job keeps what the job needs and what the accounts need. Ask us and we delete it sooner.
- **Your rights:** You can ask to see what we hold, correct it, delete it, stop us using it, or have a copy. Say which one and we do it.
- **Who to ask:** `[Data request contact]`. We answer a data request within `[Days to answer a data request]`.
- **If you are not satisfied:** You can complain to the Nigeria Data Protection Commission, ndpc.gov.ng.
- **Children:** Under 18, a parent or guardian agrees first.
- **Changes:** We may update this page. Last updated `[Last updated]`.

### Cookie notice

A tracker does not run until the visitor says yes. The banner shows on load and gives Accept and
Reject as equal choices. It does not go in the page footer, where it can be ignored. See
`docs/research/ndpa-2023-notes.md` section 3.

- **Heading:** Cookies and tracking
- **Body:** We use a small amount of tracking to see which films and pages people open. You can say no. The site works either way.
- **Accept:** Accept tracking
- **Reject:** No thanks
- **Link:** Privacy notice

## Footer
- **Copyright:** © 2026 Alpha Movies Ltd
- **Privacy:** Privacy notice
