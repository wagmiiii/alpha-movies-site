# Site Copy

This file is the single source of truth for all site text.
Edit copy here first and review before pasting it into Framer.

## Global / Site Settings
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

## Footer
- **Copyright:** © 2026 Alpha Movies Ltd
