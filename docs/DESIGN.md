# DESIGN: Alpha Movies Booking and Showcase Site

Status: Draft v0.1 | Date: 2026-10-10 | Source: the supplied logo (`assets/brand/alpha-movies-logo-original.png`) | Pairs with PRD.md section 10.

Everything visual in the site comes from here. If a value is not in this file, ask before inventing one. Colors were sampled from the logo file, not from a brand guide, so they are provisional until Emmanuel confirms the logo is current (ROADMAP D-9).

## 1. Direction

A black screening room with gold on it. The page recedes so the work and the logo carry the light. Gold is rare and means "this matters or this is clickable". Nothing is decorated for its own sake.

- Page background is black, `#000000`. This replaces the `#0A0A0A` in the earlier PRD.
- Gold covers at most about 10% of any viewport. If everything is gold, nothing is.
- Video posters and the logo are the brightest things on the page. Text and UI stay quieter.
- Sparkle is a motif, used sparingly. The logo's own flares are the main instance.

## 2. The logo

Supplied file facts, measured:

| Item | Value |
|---|---|
| Original | 4000 x 2667 px, RGBA, transparent background, 2.4 MB |
| Wordmark | Gold 3D bevel lettering "ALPHA MOVIES" with four sparkle flares |
| Web asset | `assets/brand/alpha-movies-logo.webp`, trimmed, 1600 x 760 px, about 160 KB |
| Wordmark proportions | About 96% of the image width and 21% of its height, sitting in the lower middle. The flares occupy the space above and around it |

I composited the original on black and the flares and soft shadow blend cleanly. There is no visible halo box. [Certain]

Rules:

1. Use the logo only on black or very dark surfaces. Gold on white measures about 1.6:1 contrast, which is unreadable. [Certain]
2. On photos or video, place it only over a dark overlay of at least 70% black.
3. Clear space on all sides is 10% of the logo's width (about one cap height of the lettering).
4. Minimum width for the 3D logo is 220 px. Below that the bevel turns to mud. [Guessing] Use the flat wordmark instead (task P-21, not yet produced). Until it exists, nav and footer use the 3D logo at 220 px or wider.
5. Never recolor, stretch, outline, add a glow, crop the flares, animate the letters or place it on gold.
6. The hero shows the full logo, large, with its flares. The nav shows the compact version.
7. Never load the 2.4 MB original on the site. Use the WebP. Display it at 800 px wide or less, and the 1600 px file already covers 2x screens.
8. Alt text is "Alpha Movies".

Open: which name leads publicly, Alpha Movies or Boy Concept (ROADMAP Q12). The logo says Alpha Movies, the research brief says Boy Concept. Decide before writing the hero and the page title.

## 3. Color

Sampled from opaque gold pixels in the logo. The lettering shifts from lemon yellow on "ALPHA" to amber on "MOVIES", so the ramp has both ends.

### Tokens

```css
:root {
  /* surfaces */
  --bg:            #000000;  /* page */
  --surface-1:     #0B0B0B;  /* alternate sections */
  --surface-2:     #141414;  /* cards, panels */
  --surface-3:     #1C1C1C;  /* hover, raised */

  /* lines */
  --line:          #2A2A2A;  /* dividers, card edges (decorative) */
  --line-input:    #77736A;  /* input and control boundaries */

  /* text */
  --text:          #F5F1E6;  /* primary, warm off-white */
  --text-2:        #B8B2A3;  /* secondary */
  --text-muted:    #8A8578;  /* captions, 14px and up only */

  /* gold ramp, from the logo */
  --gold-bright:   #FFEF00;  /* highlights, focus ring, hover */
  --gold:          #FBC300;  /* primary brand gold, buttons, links, eyebrows */
  --gold-deep:     #D29A00;  /* "MOVIES" body tone, pressed states */
  --gold-shadow:   #9F6A00;  /* decorative only, never text */
  --bronze:        #491700;  /* bevel edge, decorative only */

  /* flare */
  --flare-core:    #FFFEFB;
  --flare-glow:    #D29600;

  /* gradient and glow */
  --gradient-gold: linear-gradient(100deg, #FFE100 0%, #FFEC00 25%, #F5C500 50%, #D19900 70%, #DBA200 100%);
  --glow-gold:     0 0 32px rgba(251, 195, 0, 0.20);

  /* semantic */
  --error:         #FF6B6B;
  --success:       #3DDC97;
}
```

### Contrast (WCAG), measured

| Pair | Ratio | Use |
|---|---|---|
| `--gold-bright` on black | 17.6 | Passes AAA |
| `--gold` on black | 12.9 | Passes AAA. Primary text color for gold |
| `--gold-deep` on black | 8.4 | Passes AAA |
| `--gold-shadow` on black | 4.5 | Borderline. Decorative only, never text |
| `--text` on black | 18.6 | Body and headings |
| `--text-2` on black | 9.9 | Secondary text |
| `--text-muted` on black | 5.7 | Captions. On `--surface-2` it is 5.0, still passes AA |
| black on `--gold` | 12.9 | Button label |
| black on `--gold-deep` | 8.4 | Pressed button label |
| `--error` on black | 7.6 | Error text |
| `--line-input` on black | 4.4 | Meets the 3:1 needed to identify a control. On `--surface-2` it is 3.9, still passes |
| `--line` on black | 1.5 | Fails 3:1. Decorative dividers only, never a control boundary |

Rules: gold text and buttons only on `--bg`, `--surface-1` or `--surface-2`. Never put gold text on a photo without the overlay. Never convey state by color alone: errors also get an icon and a message.

### Where gold is allowed

- Primary buttons and text links.
- Eyebrow labels above section headings.
- The focus ring.
- Active filter chips and the credentials type label.
- The reference code on the confirmation screen.
- Sparkle motif and hairlines.

Gold is not used for body text, for whole-section backgrounds or for card fills. The gradient appears only on the logo, on primary button hover and on 1 to 2 px hairlines. Never on text.

## 4. Typography

Two families.

| Role | Family | Why | Fallback stack |
|---|---|---|---|
| Display (headings, hero) | Marcellus, 400 | Flared, inscriptional letterforms that echo the logo's flared caps without copying them | `Optima, Candara, Georgia, serif` |
| Interface and body | Inter, 400 / 600 | Neutral, readable on mobile at small sizes | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` |

I could not render these against the logo. Check Marcellus in Framer's type picker at hero size on black. If its thin strokes look weak at small heading sizes, switch the display role to Syne 700 and record it in the decision log. [Guessing on how it looks]

I did not identify the logo's own typeface. Do not claim a match.

Scale (fluid, mobile first):

| Style | Size | Line height | Notes |
|---|---|---|---|
| Display | `clamp(2.5rem, 6vw + 1rem, 5rem)` | 1.05 | Marcellus. Hero only |
| H2 | `clamp(2rem, 4vw, 3rem)` | 1.1 | Marcellus |
| H3 | `1.5rem` | 1.2 | Marcellus |
| Body large | `1.125rem` | 1.6 | Intro lines |
| Body | `1rem` | 1.6 | Inter 400 |
| Small | `0.875rem` | 1.5 | Inter 400, captions |
| Eyebrow | `0.8125rem` | 1.2 | Inter 600, uppercase, tracking `0.18em`, `--gold` |
| Button | `0.9375rem` | 1 | Inter 600, sentence case |

Rules: form fields are 16 px minimum so iOS does not zoom on focus. [Certain] Body line length stays under 70 characters. Do not set long text in all caps. No gold gradient text.

## 5. Layout and spacing

- Base unit 4 px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Design at 390 px first. Breakpoints: 768, 1200, 1440.
- Container max width 1200 px. Side gutters 20 px mobile, 32 px tablet, 40 px desktop.
- Section vertical padding 72 px mobile, 120 px desktop.
- Portfolio grid: 1 column on mobile, 2 on tablet, 3 on desktop. Posters are 16:9.
- Radii: buttons 4 px, inputs 6 px, cards 8 px, chips full.
- Tap targets are at least 44 x 44 px.

## 6. Surfaces and depth

Shadows do not show on black, so depth is made with lightness and borders.

- Stack: `--bg` page, `--surface-2` cards, `--surface-3` hover.
- Cards get a 1 px `--line` border. On hover the border becomes `--gold` and the card lifts 2 px. No scaling.
- Glow (`--glow-gold`) only on the primary button hover and the active focus target. Never on text.
- Posters get a bottom gradient `linear-gradient(to top, #000 0%, transparent 60%)` so text stays readable.

## 7. Components

### Buttons

| Variant | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| Primary | bg `--gold`, text black | `--gradient-gold` plus `--glow-gold` | bg `--gold-deep` | bg `--line`, text `--text-muted` |
| Secondary | transparent, 1.5 px `--gold` border, text `--gold` | bg gold at 12% | bg gold at 20% | border `--line`, text `--text-muted` |
| Text link | `--gold`, underline offset 4 px | `--gold-bright` | `--gold-deep` | `--text-muted` |

Height 52 px on mobile, 48 px on desktop. Label sentence case: "Check a date", "Open WhatsApp".

### Navigation

Height 64 px mobile, 72 px desktop. Background black at 60% opacity with a 12 px blur, falling back to solid black where blur is unsupported. 1 px `--line` bottom border. Logo left, links center on desktop, primary button "Check a date" right. Mobile shows the logo and the button, with the rest in a menu.

### Hero

Full logo with flares, large, centered or left-aligned over a quiet black field. One headline, one line of supporting text, two buttons: "Check a date" and "View showreel". No autoplay video iframes. If a background loop is used it is poster-first and short, and never behind the logo without the 70% overlay.

### Showreel

16:9 container, poster first, a centered play control, video created on tap. The play control is a 72 px circle with a 1.5 px `--gold` ring and a gold triangle.

### Portfolio card

16:9 poster, category chip top left, title below in H3. The chip is an outlined pill (`--gold` text, 1 px `--gold` border at 60% opacity). Hover per section 6. No auto-playing previews on touch devices.

### Category filter

Chips in a row that scrolls horizontally on mobile. Active chip: bg `--gold`, text black. Inactive: outlined. Hide a chip with no verified projects.

### Credentials

Cards on `--surface-2`. Eyebrow type label in `--gold` (Registration, Equipment, Collaboration, Press). Value in `--text`. The source note, if shown, is `--text-muted` at 14 px. Only verified items render. If the section has fewer than the agreed minimum, hide it entirely.

### Enquiry form

- Labels sit above fields in `--text-2`. Inputs are 52 px high, bg `--surface-2`, 1 px `--line-input` border, 6 px radius, 16 px text.
- Focus: border `--gold-bright` plus a 2 px outer ring of `--gold-bright` with a 2 px offset.
- Error: border `--error`, an icon and a message below in `--error`.
- The date field is first. The short-notice message uses an info icon and `--text-2`, not red.
- The "packages start from" line sits above the submit button in `--text-2`, with the amount in `--gold`.
- Submit is the primary button, full width on mobile.

### Confirmation screen

Replaces the form. Shows "Brief received" in H3, the reference code in `--gold` with letter spacing, a primary "Open WhatsApp" button with the WhatsApp icon, and the copyable message in a `--surface-2` card with a Copy button. This is the handoff, so it must be unmissable. Also show the direct WhatsApp link.

### Footer

`--surface-1`, 1 px `--line` top border. Logo, Instagram, YouTube, WhatsApp, base city, copyright. The direct "Already booked with us? Message directly" link lives here and in the form section.

## 8. Motion

| Token | Value |
|---|---|
| Fast | 150 ms |
| Base | 250 ms |
| Slow | 400 ms |
| Easing | `cubic-bezier(0.2, 0.7, 0.2, 1)` |

- Scroll reveal: fade up 16 px, once per element, Base duration.
- Sparkle twinkle: opacity 0.55 to 1 and scale 0.95 to 1.05 over 3 to 4 seconds, at most three flares in view, decorative only. Static on mobile.
- Honor `prefers-reduced-motion`: no reveal, no twinkle, no hover lift.
- No autoplaying video iframes anywhere.

## 9. Imagery and iconography

- Posters and stills are the color on the page. Do not tint them gold.
- Icons are 1.5 px stroke line icons, 24 px grid, currentColor. The sparkle star (four-point) is the only filled glyph, used as a bullet or section marker at 12 to 16 px in `--gold`.
- Real work only. No stock footage and no AI-generated stand-ins for client work.
- Every project image needs the client's permission (CMS `publish_ok`).

## 10. Voice

Confident and plain. Short sentences. Say what a visitor can do next. No superlatives such as "elite" or "world-class" unless backed by a verified fact. Buttons are verbs: "Check a date", "Open WhatsApp", "View showreel". Copy lives in `content/copy.md`.

## 11. Accessibility

- All text pairs in the section 3 table pass WCAG AA or better. Check any new pair before using it.
- Visible focus ring on every interactive element.
- Form fields have labels, not placeholders alone. Errors name the field.
- Logo and posters have alt text. Decorative sparkles are `aria-hidden`.
- Keyboard-only submit works and the confirmation button receives focus.

## 12. Implementation notes

- Create Framer color styles and text styles named exactly as the tokens (for example `gold`, `surface-2`, `text-2`).
- Framer components cannot import from this repo, so `framer/EnquiryForm.tsx` carries a copy of the tokens it uses. Keep it in sync by hand, in the same change as any token edit (see PROJECT_STRUCTURE known duplication).
- Never hardcode a hex value outside the token set.
- Self-host nothing for fonts unless Framer requires it. Use the Framer type picker for Marcellus and Inter.

## 13. Open items

| # | Item | Owner | Tracked as |
|---|---|---|---|
| 1 | Confirm the supplied logo is the current official one. Ask for a vector or flat version | Ademola, Emmanuel | D-9, Q11 |
| 2 | Decide which name leads publicly | Emmanuel | D-9, Q12 |
| 3 | Produce a flat one-color wordmark, a favicon mark and a 1200 x 630 social image | Ademola, Agent | P-21 |
| 4 | Check Marcellus against the logo in Framer | Ademola | P-1 |
| 5 | Validate that gold stays under about 10% of a viewport on the built pages | Ademola | P-17 |
