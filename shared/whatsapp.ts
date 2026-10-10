// Source of truth for the WhatsApp handoff text and link (ESSENTIALS rules 4 and 5).
// Pure functions only, no imports: this file must be usable from the browser in Phase 0
// and from the Worker in Phase 1. framer/EnquiryForm.tsx carries a hand-inlined copy.

export interface EnquiryBrief {
  name: string;
  company?: string;
  /** Visitor contact. Only the email is written into the message: the owner reads the
   *  visitor's number off WhatsApp itself when they send from it (PRD section 7). */
  email?: string;
  projectType: string;
  /** ISO date, `YYYY-MM-DD`, interpreted in Africa/Lagos. */
  eventDate: string;
  eventEndDate?: string;
  dateFlexible: boolean;
  venue?: string;
  city: string;
  country: string;
  duration: string;
  deliverables: string[];
  referenceUrl?: string;
  /** Set when the visitor chose "I will describe it instead", which moves the
   *  reference into Notes. */
  referenceDescribedInNotes?: boolean;
  notes?: string;
}

/** wa.me links stop working past roughly this many encoded characters.
 *  ARCHITECTURE.md section 13 item 7, still to be measured on real devices. */
export const MAX_MESSAGE_CHARS = 1000;

/** Open item in DESIGN.md section 2: whether Alpha Movies or Boy Concept leads publicly.
 *  Change it here and in the site copy together. */
const GREETING = "Hello Alpha Movies, I just submitted a brief";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function digitsOnly(value: string): string {
  return value.replace(/\D+/g, "");
}

/**
 * Digits only, with the country code, no plus sign, no leading zeros.
 *
 * A leading 0 in the local part is a trunk prefix, so it is replaced by the country
 * code rather than kept. `00` is an international prefix and is dropped, which leaves
 * the country code already in place. The Worker does the authoritative parse with
 * libphonenumber-js; this is the light browser check ESSENTIALS rule 4 describes.
 */
export function toE164Digits(value: string, countryDialCode = "234"): string {
  const digits = digitsOnly(value);
  if (digits === "") return "";

  const dial = digitsOnly(countryDialCode);

  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) {
    const national = digits.replace(/^0+/, "");
    return dial + national;
  }
  if (dial !== "" && nationalAfter(dial, digits) !== "") return dial + nationalAfter(dial, digits);
  return digits;
}

/** A national number that happens to begin with the same digits as the country code,
 *  such as a Nigerian 801... number against a 234 dial code, must not be prefixed twice. */
function nationalAfter(dial: string, digits: string): string {
  return digits.startsWith(dial) && digits.length > dial.length + 6 ? "" : digits;
}

/**
 * A usable `wa.me` number: country code included, so at least 11 digits, never a
 * leading zero. A 10 digit entry is a national number with no country code, and the
 * link would open a chat with the wrong subscriber, so it is rejected rather than guessed at.
 */
export function isValidWhatsAppDigits(digits: string): boolean {
  return /^[1-9]\d{10,14}$/.test(digits);
}

export function formatEventDate(isoDate: string): string {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (parts === null) return isoDate.trim();
  const month = Number(parts[2]);
  if (month < 1 || month > 12) return isoDate.trim();
  return `${Number(parts[3])} ${MONTHS[month - 1]} ${parts[1]}`;
}

function dateLine(brief: EnquiryBrief): string {
  const start = formatEventDate(brief.eventDate);
  const end = brief.eventEndDate ? formatEventDate(brief.eventEndDate) : "";
  const span = end === "" || end === start ? start : `${start} to ${end}`;
  return `Date: ${span} (flexible: ${brief.dateFlexible ? "yes" : "no"})`;
}

function locationLine(brief: EnquiryBrief): string {
  const place = [brief.venue, brief.city, brief.country]
    .map((part) => trimmed(part))
    .filter((part) => part !== "");
  return `Location: ${place.join(", ")}`;
}

function trimmed(value: string | undefined): string {
  return value === undefined ? "" : value.trim();
}

function referenceLine(brief: EnquiryBrief): string {
  const url = trimmed(brief.referenceUrl);
  if (url !== "") return `Reference: ${url}`;
  if (brief.referenceDescribedInNotes) return "Reference: described in Notes";
  return "";
}

function coreLines(brief: EnquiryBrief, ref?: string | null): string[] {
  const greeting =
    ref === undefined || ref === null || ref === ""
      ? `${GREETING}.`
      : `${GREETING} (Ref ${ref}).`;

  const lines = [
    greeting,
    `Project: ${brief.projectType}`,
    dateLine(brief),
    locationLine(brief),
    `Duration: ${brief.duration}`,
    `Deliverables: ${brief.deliverables.join(", ")}`,
  ];

  const reference = referenceLine(brief);
  if (reference !== "") lines.push(reference);

  lines.push(`Name: ${brief.name}`);
  const company = trimmed(brief.company);
  if (company !== "") lines.push(`Company: ${company}`);

  // Only when there is no WhatsApp number to read the reply from.
  const email = trimmed(brief.email);
  if (email !== "") lines.push(`Email: ${email}`);

  return lines;
}

/**
 * The prefilled brief, PRD section 7. The Ref line is omitted when there is no ref,
 * which is every submission in Phase 0.
 *
 * Notes are the only field long enough to push the link past what wa.me accepts, so
 * Notes absorb the cut. They are dropped entirely rather than half-written if the
 * required lines have already used the ceiling.
 */
export function buildWhatsAppMessage(brief: EnquiryBrief, ref?: string | null): string {
  const lines = coreLines(brief, ref);
  const base = lines.join("\n");

  const notes = trimmed(brief.notes);
  if (notes === "") return base.length <= MAX_MESSAGE_CHARS ? base : base.slice(0, MAX_MESSAGE_CHARS);

  const room = MAX_MESSAGE_CHARS - base.length - 8;
  if (room < 40) return base.length <= MAX_MESSAGE_CHARS ? base : base.slice(0, MAX_MESSAGE_CHARS);

  // room covers the ellipsis too, so the total never passes the ceiling.
  const shown = notes.length > room ? `${notes.slice(0, room - 3)}...` : notes;
  return `${base}\nNotes: ${shown}`;
}

/**
 * `https://wa.me/<digits>?text=<encoded>`. Returns "" for a number that cannot form a
 * valid link, so the caller falls back to the copyable message instead of a broken button.
 *
 * No country code is inferred here: this is the owner's number from SiteSettings
 * (`whatsapp_number_digits`), which is stored in international form. Guessing a country
 * would silently redirect a diaspora owner's enquiries.
 */
export function buildWhatsAppUrl(ownerDigits: string, message: string): string {
  const digits = digitsOnly(ownerDigits).replace(/^0+/, "");
  if (!isValidWhatsAppDigits(digits)) return "";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
