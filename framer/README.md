# Framer components

This folder holds the code for the one custom component on the site. Framer does not read
this repository, so these files are a source you paste from, not a build input.

## EnquiryForm.tsx

What it is: the date-first enquiry form and the WhatsApp handoff (ROADMAP P-12 and P-13,
PRD section 7). Phase 0 only. It calls no API, stores nothing and sends no email. Wiring it
to a backend is B-12, which waits on gate G1.

### Paste into Framer

1. In the Framer project add a code component and name it `EnquiryForm`.
2. Copy the whole file into the code editor, including the `import * as React from "react"` line.
3. Publish to a preview link, not to the production domain.

Only `react` is imported. Nothing from the `framer` package is used, so the component has no
explicit property panel controls and Framer infers them from the props. If you want labelled
controls in the CMS picker, add `Component.properties` using Framer's own docs and keep this
file free of the `framer` import so it still typechecks here.

### Props the owner must set

| Prop | Source | If left empty |
|---|---|---|
| `whatsappDigits` | CMS SiteSettings `whatsapp_number_digits`. International digits, no plus | No WhatsApp button. The form still validates and still shows the copyable brief |
| `fromPriceText` | SiteSettings `from_price_text` (FR-10) | The line hides. Default is the `[Starting Price]` placeholder |
| `responseTimeText` | SiteSettings `response_time_text` (FR-15) | The line hides. Default is the `[Response Time]` placeholder |
| `heading` | Section heading | Defaults to "Check a date" |

Never put a local number such as `08012345678` in `whatsappDigits`. The builder refuses a
number with no country code rather than guessing one, because a wrong guess sends a lead to
the wrong subscriber.

### Two things that are deliberately not here

- The always-visible direct WhatsApp link that works with JavaScript off (FR-24, ROADMAP P-15)
  has to be a plain Framer text link in the page and the footer. A code component cannot
  render without JavaScript. The component does show the same link while JS is running.
- Spam protection (FR-14: honeypot, Turnstile, rate limit) is server-side and belongs to the
  Worker. There is no bot defence in a Phase 0 form that submits to nowhere.

## Keeping the two copies in sync

`framer/EnquiryForm.tsx` contains a hand-copied block of `shared/whatsapp.ts` between the
`COPY OF shared/whatsapp.ts` and `END COPY OF` markers, plus a copy of the design tokens it
uses from `docs/DESIGN.md`. PROJECT_STRUCTURE.md calls this out under Known duplication.

- Edit `shared/whatsapp.ts`, then paste the same change into the marked block.
- Edit `docs/DESIGN.md`, then update the token object `t` in the component.
- Both copies must be in one change, never two.

To check nothing has drifted, extract the block and diff its output against the source:

```sh
node -e 'const fs=require("fs");const s=fs.readFileSync("framer/EnquiryForm.tsx","utf8");
fs.writeFileSync("/tmp/copy.ts",s.slice(s.indexOf("// COPY OF shared"),s.indexOf("// END COPY OF"))+
"\nexport { buildWhatsAppMessage, buildWhatsAppUrl };\n")'
```

Then import both `/tmp/copy.ts` and `shared/whatsapp.ts` and compare `buildWhatsAppMessage`
over the same fixtures. Run `npm`-free with `node --test shared/whatsapp.test.ts`.

## Checks that still need a real device

The component was driven in a jsdom harness (submit with empty fields, the golden path to the
handoff, the short-notice flag, the reference escape, the contact rule, and both cases where no
owner number is set). No harness is committed, because running it needs react, react-dom and
jsdom, and this repo holds no dependencies. Rebuild it in a temp folder outside the repo if you
need to run it again.

These are the ROADMAP P-17, P-18 and S-2 items and cannot be done from a repo:

- Does the `wa.me` link open WhatsApp, and does the prefilled text survive, in iOS Safari,
  Android Chrome, and the Instagram in-app browser on both?
- Is the encoded message short enough on a real device (the cap is 1000 characters, measured
  against ARCHITECTURE section 13 item 7)?
- Does the "Open WhatsApp" button still work when the in-app browser blocks `target="_blank"`?
- 16px inputs so iOS does not zoom, keyboard-only submit, focus landing on the confirmation
  heading, contrast on the dark theme.

Log the results in `ops/test-matrix.md` when it is created.
