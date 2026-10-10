import * as React from "react";

/**
 * EnquiryForm: the only custom Framer component on the site (P-12, P-13).
 *
 * Phase 0. It makes no network call. Submit builds the brief in the browser and hands
 * off on a visible link, which is the whole point of the demo and the rule in
 * ESSENTIALS 3 and 5. Wiring to the Worker is B-12, after gate G1.
 *
 * Pasting into Framer: see framer/README.md.
 */

// COPY OF shared/whatsapp.ts. Framer components cannot import from this repo, so this
// block is a hand-kept duplicate (PROJECT_STRUCTURE, Known duplication). Edit the
// source and this copy in the same change.
type EnquiryBrief = {
  name: string;
  company?: string;
  email?: string;
  projectType: string;
  eventDate: string;
  eventEndDate?: string;
  dateFlexible: boolean;
  venue?: string;
  city: string;
  country: string;
  duration: string;
  deliverables: string[];
  referenceUrl?: string;
  referenceDescribedInNotes?: boolean;
  notes?: string;
};

const MAX_MESSAGE_CHARS = 1000;
const GREETING = "Hello Alpha Movies, I just submitted a brief";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const digitsOnly = (value: string): string => value.replace(/\D+/g, "");

const trimmed = (value: string | undefined): string => (value === undefined ? "" : value.trim());

function toE164Digits(value: string, countryDialCode = "234"): string {
  const digits = digitsOnly(value);
  if (digits === "") return "";

  const dial = digitsOnly(countryDialCode);

  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return dial + digits.replace(/^0+/, "");
  if (dial !== "" && nationalAfter(dial, digits) !== "") return dial + nationalAfter(dial, digits);
  return digits;
}

function nationalAfter(dial: string, digits: string): string {
  return digits.startsWith(dial) && digits.length > dial.length + 6 ? "" : digits;
}

function isValidWhatsAppDigits(digits: string): boolean {
  return /^[1-9]\d{10,14}$/.test(digits);
}

function formatEventDate(isoDate: string): string {
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

  const email = trimmed(brief.email);
  if (email !== "") lines.push(`Email: ${email}`);

  return lines;
}

function buildWhatsAppMessage(brief: EnquiryBrief, ref?: string | null): string {
  const lines = coreLines(brief, ref);
  const base = lines.join("\n");

  const notes = trimmed(brief.notes);
  if (notes === "") return base.length <= MAX_MESSAGE_CHARS ? base : base.slice(0, MAX_MESSAGE_CHARS);

  const room = MAX_MESSAGE_CHARS - base.length - 8;
  if (room < 40) return base.length <= MAX_MESSAGE_CHARS ? base : base.slice(0, MAX_MESSAGE_CHARS);

  const shown = notes.length > room ? `${notes.slice(0, room - 3)}...` : notes;
  return `${base}\nNotes: ${shown}`;
}

function buildWhatsAppUrl(ownerDigits: string, message: string): string {
  const digits = digitsOnly(ownerDigits).replace(/^0+/, "");
  if (!isValidWhatsAppDigits(digits)) return "";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
// END COPY OF shared/whatsapp.ts

// COPY OF the tokens in docs/DESIGN.md that this component uses, for the same reason.
// Never add a hex value that is not in the DESIGN.md token set.
const t = {
  bg: "#000000",
  surface2: "#141414",
  surface3: "#1C1C1C",
  lineInput: "#77736A",
  text: "#F5F1E6",
  text2: "#B8B2A3",
  textMuted: "#8A8578",
  gold: "#FBC300",
  goldBright: "#FFEF00",
  error: "#FF6B6B",
  radiusInput: 6,
  radiusCard: 8,
  radiusChip: 999,
  controlHeight: 52,
  fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
} as const;

const PROJECT_TYPES = ["Festival", "Wedding or event", "Commercial or brand", "Documentary", "Other"];

const DURATIONS = ["Half day", "Full day", "Multiple days", "Not sure"];

const DELIVERABLES = ["Highlight reel", "Full film", "Same-day edit", "Drone coverage", "Social cuts", "Other"];

// Dial codes for the markets this site expects: Nigeria and the diaspora corridors in
// PRD section 3. libphonenumber-js in the Worker is the authority on the result.
const COUNTRIES: { name: string; dial: string }[] = [
  { name: "Nigeria", dial: "234" },
  { name: "Ghana", dial: "233" },
  { name: "Kenya", dial: "254" },
  { name: "South Africa", dial: "27" },
  { name: "United Kingdom", dial: "44" },
  { name: "Ireland", dial: "353" },
  { name: "United States", dial: "1" },
  { name: "Canada", dial: "1" },
  { name: "Germany", dial: "49" },
  { name: "Netherlands", dial: "31" },
  { name: "France", dial: "33" },
  { name: "Spain", dial: "34" },
  { name: "Italy", dial: "39" },
  { name: "United Arab Emirates", dial: "971" },
  { name: "Qatar", dial: "974" },
  { name: "Turkey", dial: "90" },
  { name: "Egypt", dial: "20" },
  { name: "India", dial: "91" },
  { name: "China", dial: "86" },
  { name: "Australia", dial: "61" },
];

const SHORT_NOTICE_DAYS = 7;
const WINDOW_MONTHS = 24;

interface FormValues {
  eventDate: string;
  dateFlexible: boolean;
  eventEndDate: string;
  projectType: string;
  venue: string;
  city: string;
  country: string;
  duration: string;
  deliverables: string[];
  referenceUrl: string;
  describeInstead: boolean;
  name: string;
  company: string;
  phone: string;
  phoneCountry: string;
  email: string;
  notes: string;
  consent: boolean;
}

const initialValues: FormValues = {
  eventDate: "",
  dateFlexible: false,
  eventEndDate: "",
  projectType: "",
  venue: "",
  city: "",
  country: "Nigeria",
  duration: "",
  deliverables: [],
  referenceUrl: "",
  describeInstead: false,
  name: "",
  company: "",
  phone: "",
  phoneCountry: "Nigeria",
  email: "",
  notes: "",
  consent: false,
};

function lagosToday(): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const read = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? "";
  return new Date(Number(read("year")), Number(read("month")) - 1, Number(read("day")));
}

const toIso = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

function windowStart(): string {
  return toIso(lagosToday());
}

function windowEnd(): string {
  const end = lagosToday();
  end.setMonth(end.getMonth() + WINDOW_MONTHS);
  return toIso(end);
}

/** Whole days from today in Lagos to the event date. Negative means the date has passed. */
function daysUntil(isoDate: string): number {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (parts === null) return Number.NaN;
  const target = new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
  const today = lagosToday();
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function makeClientRequestId(): string {
  // Random UUIDs need a secure context, and the Instagram in-app browser on older
  // Android webviews is not one. Losing the id is better than a form that throws.
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `cir-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export interface EnquiryFormProps {
  /** Owner number from CMS SiteSettings, `whatsapp_number_digits`, international digits. */
  whatsappDigits: string;
  /** FR-10. Bracketed until the owner gives a price (PRD Q2). Empty hides the line. */
  fromPriceText: string;
  /** FR-15. Only a time someone will actually keep (PRD Q5). Empty hides the line. */
  responseTimeText: string;
  heading: string;
}

const defaultProperties: EnquiryFormProps = {
  whatsappDigits: "",
  fromPriceText: "[Starting Price]",
  responseTimeText: "[Response Time]",
  heading: "Check a date",
};

export function EnquiryForm(props: Partial<EnquiryFormProps> = {}) {
  const { whatsappDigits, fromPriceText, responseTimeText, heading } = { ...defaultProperties, ...props };

  const [values, setValues] = React.useState<FormValues>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // One id per form instance, so a double tap cannot become two enquiries in Phase 1.
  const clientRequestId = React.useRef<string>(makeClientRequestId());
  const confirmationRef = React.useRef<HTMLHeadingElement>(null);

  const minimum = React.useMemo(windowStart, []);
  const maximum = React.useMemo(windowEnd, []);
  const daysToEvent = daysUntil(values.eventDate);
  const shortNotice = values.eventDate !== "" && daysToEvent >= 0 && daysToEvent <= SHORT_NOTICE_DAYS;

  function clearError(name: string): void {
    setErrors((current) => {
      if (current[name] === undefined) return current;
      const rest: Record<string, string> = { ...current };
      delete rest[name];
      return rest;
    });
  }

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]): void {
    setValues((current) => ({ ...current, [key]: value }));
    clearError(key);
    // The contact rule is one message across two fields.
    if (key === "phone" || key === "email") clearError("contact");
  }

  function toggleDeliverable(item: string): void {
    setValues((current) => ({
      ...current,
      deliverables: current.deliverables.includes(item)
        ? current.deliverables.filter((entry) => entry !== item)
        : [...current.deliverables, item],
    }));
    clearError("deliverables");
  }

  function validate(input: FormValues): Record<string, string> {
    const found: Record<string, string> = {};

    const span = daysUntil(input.eventDate);
    if (input.eventDate === "") {
      found.eventDate = "Choose the date you need us.";
    } else if (Number.isNaN(span)) {
      found.eventDate = "Use the date picker.";
    } else if (span < 0) {
      found.eventDate = "That date has passed.";
    } else if (input.eventDate > maximum) {
      found.eventDate = "We only take briefs up to two years ahead.";
    }

    if (input.eventEndDate !== "") {
      if (input.eventEndDate < input.eventDate) found.eventEndDate = "The second date is after the first.";
      else if (input.eventEndDate > maximum) found.eventEndDate = "That is more than two years ahead.";
    }

    if (input.projectType === "") found.projectType = "Pick the closest type.";
    if (input.city.trim() === "") found.city = "Which city?";
    if (input.duration === "") found.duration = "Half day, full day or longer?";
    if (input.deliverables.length === 0) found.deliverables = "Choose at least one.";

    if (input.referenceUrl.trim() !== "" && !/^https?:\/\//i.test(input.referenceUrl.trim())) {
      found.referenceUrl = "Paste a full link starting with http or https.";
    }
    if (input.referenceUrl.trim() === "" && !input.describeInstead) {
      found.referenceUrl = "Add a link, or tick the box and describe it in Notes.";
    }
    if (input.describeInstead && input.notes.trim() === "") {
      found.notes = "Tell us what you want instead of a link.";
    }

    if (input.name.trim() === "") found.name = "Who are we speaking to?";

    const phoneDigits = toE164Digits(input.phone, dialFor(input.phoneCountry));
    const hasPhone = phoneDigits !== "" && /^[1-9]\d{7,14}$/.test(phoneDigits);
    const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email.trim());
    if (!hasPhone && !hasEmail) {
      found.contact = "Give us a WhatsApp number or an email, either is enough.";
    }

    if (!input.consent) found.consent = "We need your OK to reply.";

    return found;
  }

  function dialFor(countryName: string): string {
    return COUNTRIES.find((entry) => entry.name === countryName)?.dial ?? "234";
  }

  const brief: EnquiryBrief = {
    name: values.name.trim(),
    company: values.company.trim(),
    email: values.email.trim(),
    projectType: values.projectType,
    eventDate: values.eventDate,
    eventEndDate: values.eventEndDate,
    dateFlexible: values.dateFlexible,
    venue: values.venue.trim(),
    city: values.city.trim(),
    country: values.country.trim(),
    duration: values.duration,
    deliverables: values.deliverables,
    referenceUrl: values.referenceUrl.trim(),
    referenceDescribedInNotes: values.describeInstead,
    notes: values.notes.trim(),
  };

  // Phase 0 stores nothing, so there is no ref and the Ref line is omitted (PRD section 7).
  const message = buildWhatsAppMessage(brief);
  const handoffUrl = buildWhatsAppUrl(whatsappDigits, message);

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.focus();
      return;
    }
    setCopied(false);
    setSubmitted(true);
  }

  React.useEffect(() => {
    if (submitted) confirmationRef.current?.focus();
  }, [submitted]);

  async function copyMessage(): Promise<void> {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (submitted) {
    return (
      <section className="am-confirmation" aria-live="polite">
        <h3 ref={confirmationRef} tabIndex={-1} className="am-title">
          Brief received
        </h3>
        <p className="am-lead">
          Send it to us now and we will pick up the date straight away. WhatsApp will not open by
          itself, so press the button.
        </p>

        {handoffUrl !== "" ? (
          <a className="am-button" href={handoffUrl} target="_blank" rel="noopener noreferrer">
            Open WhatsApp
          </a>
        ) : (
          <p className="am-warn">
            The WhatsApp number is not set on this page yet. Copy the brief below and send it to us,
            or mail <span className="am-muted">[Enquiry Email]</span>.
          </p>
        )}

        <label className="am-label" htmlFor="am-brief-text">
          The message you are sending
        </label>
        <textarea id="am-brief-text" readOnly rows={10} className="am-input am-message" value={message} />
        <button type="button" className="am-secondary" onClick={copyMessage}>
          {copied ? "Copied" : "Copy message"}
        </button>

        <p className="am-footnote">
          Nothing is saved until you send it. This demo stores no enquiry and sends no email.
        </p>
      </section>
    );
  }

  return (
    <section className="am-enquiry">
      <style>{styles}</style>
      <h3 className="am-title">{heading}</h3>

      {fromPriceText !== "" && (
        <p className="am-price">
          Packages start from <span className="am-gold">{fromPriceText}</span>
        </p>
      )}

      <form onSubmit={onSubmit} data-client-request-id={clientRequestId.current}>
        <div className="am-field">
          <label className="am-label" htmlFor="am-event-date">
            Event date
          </label>
          <input
            id="am-event-date"
            className="am-input"
            type="date"
            required
            data-invalid={errors.eventDate !== undefined}
            aria-invalid={errors.eventDate !== undefined}
            aria-describedby={errors.eventDate === undefined ? "am-date-help" : "am-date-help am-event-date-error"}
            min={minimum}
            max={maximum}
            value={values.eventDate}
            onChange={(event) => set("eventDate", event.target.value)}
          />
          <div className="am-help" id="am-date-help">
            {shortNotice && values.eventDate !== "" && (
              <span className="am-notice">
                <span aria-hidden="true" className="am-icon">
                  i
                </span>
                Short notice, we will confirm availability
              </span>
            )}
          </div>
          {errors.eventDate !== undefined && (
            <p className="am-error" id="am-event-date-error" role="alert">
              {errors.eventDate}
            </p>
          )}
          <label className="am-check">
            <input
              type="checkbox"
              checked={values.dateFlexible}
              onChange={(event) => set("dateFlexible", event.target.checked)}
            />
            Dates are flexible
          </label>
        </div>

        <div className="am-field">
          <label className="am-label" htmlFor="am-end-date">
            Second date or end date <span className="am-optional">optional</span>
          </label>
          <input
            id="am-end-date"
            className="am-input"
            type="date"
            data-invalid={errors.eventEndDate !== undefined}
            aria-invalid={errors.eventEndDate !== undefined}
            aria-describedby={errors.eventEndDate === undefined ? undefined : "am-end-date-error"}
            min={values.eventDate === "" ? minimum : values.eventDate}
            max={maximum}
            value={values.eventEndDate}
            onChange={(event) => set("eventEndDate", event.target.value)}
          />
          {errors.eventEndDate !== undefined && (
            <p className="am-error" id="am-end-date-error" role="alert">
              {errors.eventEndDate}
            </p>
          )}
        </div>

        <div className="am-field">
          <label className="am-label" htmlFor="am-project-type">
            Project type
          </label>
          <select
            id="am-project-type"
            className="am-input"
            required
            data-invalid={errors.projectType !== undefined}
            aria-invalid={errors.projectType !== undefined}
            aria-describedby={errors.projectType === undefined ? undefined : "am-project-type-error"}
            value={values.projectType}
            onChange={(event) => set("projectType", event.target.value)}
          >
            <option value="">Choose one</option>
            {PROJECT_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.projectType !== undefined && (
            <p className="am-error" id="am-project-type-error" role="alert">
              {errors.projectType}
            </p>
          )}
        </div>

        <div className="am-row">
          <div className="am-field">
            <label className="am-label" htmlFor="am-venue">
              Venue <span className="am-optional">optional</span>
            </label>
            <input
              id="am-venue"
              className="am-input"
              type="text"
              maxLength={120}
              value={values.venue}
              onChange={(event) => set("venue", event.target.value)}
            />
          </div>
          <div className="am-field">
            <label className="am-label" htmlFor="am-city">
              City
            </label>
            <input
              id="am-city"
              className="am-input"
              type="text"
              required
              maxLength={80}
              data-invalid={errors.city !== undefined}
              aria-invalid={errors.city !== undefined}
              aria-describedby={errors.city === undefined ? undefined : "am-city-error"}
              value={values.city}
              onChange={(event) => set("city", event.target.value)}
            />
            {errors.city !== undefined && (
              <p className="am-error" id="am-city-error" role="alert">
                {errors.city}
              </p>
            )}
          </div>
          <div className="am-field">
            <label className="am-label" htmlFor="am-country">
              Country
            </label>
            <input
              id="am-country"
              className="am-input"
              type="text"
              maxLength={60}
              value={values.country}
              onChange={(event) => set("country", event.target.value)}
            />
          </div>
        </div>

        <div className="am-field">
          <label className="am-label" htmlFor="am-duration">
            Duration
          </label>
          <select
            id="am-duration"
            className="am-input"
            required
            data-invalid={errors.duration !== undefined}
            aria-invalid={errors.duration !== undefined}
            aria-describedby={errors.duration === undefined ? undefined : "am-duration-error"}
            value={values.duration}
            onChange={(event) => set("duration", event.target.value)}
          >
            <option value="">Choose one</option>
            {DURATIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.duration !== undefined && (
            <p className="am-error" id="am-duration-error" role="alert">
              {errors.duration}
            </p>
          )}
        </div>

        <fieldset className="am-fieldset" data-invalid={errors.deliverables !== undefined}>
          <legend className="am-label">Deliverables</legend>
          <div className="am-chips">
            {DELIVERABLES.map((item) => (
              <label key={item} className={values.deliverables.includes(item) ? "am-chip am-chip-on" : "am-chip"}>
                <input
                  type="checkbox"
                  checked={values.deliverables.includes(item)}
                  onChange={() => toggleDeliverable(item)}
                />
                {item}
              </label>
            ))}
          </div>
          {errors.deliverables !== undefined && (
            <p className="am-error" role="alert">
              {errors.deliverables}
            </p>
          )}
        </fieldset>

        <div className="am-field">
          <label className="am-label" htmlFor="am-reference">
            Reference video
          </label>
          <input
            id="am-reference"
            className="am-input"
            type="url"
            inputMode="url"
            placeholder="https://"
            maxLength={300}
            disabled={values.describeInstead}
            data-invalid={errors.referenceUrl !== undefined}
            aria-invalid={errors.referenceUrl !== undefined}
            aria-describedby={errors.referenceUrl === undefined ? undefined : "am-reference-error"}
            value={values.referenceUrl}
            onChange={(event) => set("referenceUrl", event.target.value)}
          />
          {errors.referenceUrl !== undefined && (
            <p className="am-error" id="am-reference-error" role="alert">
              {errors.referenceUrl}
            </p>
          )}
          <label className="am-check">
            <input
              type="checkbox"
              checked={values.describeInstead}
              onChange={(event) => set("describeInstead", event.target.checked)}
            />
            I will describe it instead
          </label>
        </div>

        <div className="am-field">
          <label className="am-label" htmlFor="am-name">
            Name
          </label>
          <input
            id="am-name"
            className="am-input"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            data-invalid={errors.name !== undefined}
            aria-invalid={errors.name !== undefined}
            aria-describedby={errors.name === undefined ? undefined : "am-name-error"}
            value={values.name}
            onChange={(event) => set("name", event.target.value)}
          />
          {errors.name !== undefined && (
            <p className="am-error" id="am-name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="am-field">
          <label className="am-label" htmlFor="am-company">
            Company or agency <span className="am-optional">optional</span>
          </label>
          <input
            id="am-company"
            className="am-input"
            type="text"
            autoComplete="organization"
            maxLength={120}
            value={values.company}
            onChange={(event) => set("company", event.target.value)}
          />
        </div>

        <div className="am-field">
          <label className="am-label" htmlFor="am-phone">
            WhatsApp number
          </label>
          <div className="am-phone">
            <select
              className="am-input am-dial"
              aria-label="Country for the phone number"
              value={values.phoneCountry}
              onChange={(event) => set("phoneCountry", event.target.value)}
            >
              {COUNTRIES.map((entry) => (
                <option key={`${entry.name}-${entry.dial}`} value={entry.name}>
                  {entry.name} +{entry.dial}
                </option>
              ))}
            </select>
            <input
              id="am-phone"
              className="am-input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="801 234 5678"
              maxLength={20}
              data-invalid={errors.contact !== undefined}
              aria-invalid={errors.contact !== undefined}
              aria-describedby={errors.contact === undefined ? "am-contact-help" : "am-contact-help am-contact-error"}
              value={values.phone}
              onChange={(event) => set("phone", event.target.value)}
            />
          </div>
          <div className="am-help" id="am-contact-help">
            A local number starting with 0 works, so does one with the country code.
          </div>
        </div>

        <div className="am-field">
          <label className="am-label" htmlFor="am-email">
            Email
          </label>
          <input
            id="am-email"
            className="am-input"
            type="email"
            autoComplete="email"
            maxLength={160}
            data-invalid={errors.contact !== undefined}
            aria-invalid={errors.contact !== undefined}
            aria-describedby={errors.contact === undefined ? undefined : "am-contact-error"}
            value={values.email}
            onChange={(event) => set("email", event.target.value)}
          />
          {errors.contact !== undefined && (
            <p className="am-error" id="am-contact-error" role="alert">
              {errors.contact}
            </p>
          )}
        </div>

        <div className="am-field">
          <label className="am-label" htmlFor="am-notes">
            Notes <span className="am-optional">optional</span>
          </label>
          <textarea
            id="am-notes"
            className="am-input am-tall"
            maxLength={1000}
            required={values.describeInstead}
            data-invalid={errors.notes !== undefined}
            aria-invalid={errors.notes !== undefined}
            aria-describedby={errors.notes === undefined ? undefined : "am-notes-error"}
            value={values.notes}
            onChange={(event) => set("notes", event.target.value)}
          />
          {errors.notes !== undefined && (
            <p className="am-error" id="am-notes-error" role="alert">
              {errors.notes}
            </p>
          )}
        </div>

        <div className="am-field">
          <label className="am-check">
            <input
              type="checkbox"
              required
              checked={values.consent}
              data-invalid={errors.consent !== undefined}
              aria-invalid={errors.consent !== undefined}
              aria-describedby={errors.consent === undefined ? undefined : "am-consent-error"}
              onChange={(event) => set("consent", event.target.checked)}
            />
            I agree to be contacted about this enquiry
          </label>
          {errors.consent !== undefined && (
            <p className="am-error" id="am-consent-error" role="alert">
              {errors.consent}
            </p>
          )}
        </div>

        {responseTimeText !== "" && <p className="am-help">{responseTimeText}</p>}

        <button type="submit" className="am-button">
          Send brief
        </button>

        {handoffUrl !== "" && (
          <p className="am-direct">
            <a href={buildWhatsAppUrl(whatsappDigits, "Hello Alpha Movies, I have a brief to send.")}>
              Already booked with us? Message directly
            </a>
          </p>
        )}
      </form>
    </section>
  );
}

const styles = `
.am-enquiry, .am-confirmation {
  color: ${t.text};
  font-family: ${t.fontFamily};
  font-size: 16px;
  line-height: 1.6;
  max-width: 620px;
}
.am-title { font-size: 24px; line-height: 1.2; margin: 0 0 8px; outline: none; }
.am-lead, .am-price, .am-footnote { color: ${t.text2}; margin: 0 0 16px; }
.am-gold { color: ${t.gold}; }
.am-muted { color: ${t.textMuted}; }
.am-field { margin: 0 0 20px; }
.am-fieldset { border: 0; margin: 0 0 20px; padding: 0; }
.am-label { display: block; color: ${t.text2}; margin: 0 0 6px; }
.am-optional { color: ${t.textMuted}; font-size: 13px; text-transform: lowercase; }
.am-input {
  background: ${t.surface2};
  border: 1px solid ${t.lineInput};
  border-radius: ${t.radiusInput}px;
  color: ${t.text};
  font-family: inherit;
  font-size: 16px;
  min-height: ${t.controlHeight}px;
  padding: 12px 14px;
  width: 100%;
  box-sizing: border-box;
}
.am-tall { min-height: 120px; resize: vertical; }
.am-message { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; }
.am-input[data-invalid="true"] { border-color: ${t.error}; }
.am-input:focus-visible { border-color: ${t.goldBright}; box-shadow: 0 0 0 2px ${t.bg}, 0 0 0 4px ${t.goldBright}; }
.am-row { display: grid; gap: 12px; grid-template-columns: 1fr; }
@media (min-width: 620px) { .am-row { grid-template-columns: 2fr 1fr 1fr; } }
.am-phone { display: grid; gap: 8px; grid-template-columns: minmax(150px, 1fr) 2fr; }
.am-dial { padding: 12px 8px; }
.am-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.am-chip {
  align-items: center; border: 1px solid ${t.lineInput}; border-radius: ${t.radiusChip}px;
  color: ${t.text}; cursor: pointer; display: inline-flex; gap: 8px; min-height: 44px;
  padding: 8px 14px;
}
.am-chip-on { border-color: ${t.gold}; color: ${t.gold}; }
.am-chip input { accent-color: ${t.gold}; margin: 0; }
.am-check { align-items: flex-start; color: ${t.text}; display: flex; gap: 10px; margin-top: 8px; }
.am-check input { accent-color: ${t.gold}; margin-top: 4px; min-width: 20px; }
.am-help { color: ${t.textMuted}; font-size: 14px; margin-top: 6px; }
.am-notice { align-items: center; color: ${t.text2}; display: inline-flex; gap: 8px; }
.am-icon {
  align-items: center; border: 1px solid ${t.gold}; border-radius: 50%; color: ${t.gold};
  display: inline-flex; font-size: 12px; height: 18px; justify-content: center; width: 18px;
}
.am-error { align-items: center; color: ${t.error}; display: flex; font-size: 14px; gap: 8px; margin: 6px 0 0; }
.am-error::before { content: "!"; border: 1px solid ${t.error}; border-radius: 50%; font-size: 11px; height: 16px; width: 16px; display: inline-flex; align-items: center; justify-content: center; }
.am-warn { color: ${t.text2}; margin: 0 0 16px; }
.am-button {
  background: ${t.gold}; border: 0; border-radius: 4px; color: ${t.bg}; cursor: pointer;
  display: block; font-family: inherit; font-size: 15px; font-weight: 600; min-height: ${t.controlHeight}px;
  padding: 12px 24px; text-align: center; text-decoration: none; transition: background 150ms;
  width: 100%; box-sizing: border-box;
}
.am-button:hover { background: ${t.goldBright}; }
.am-secondary {
  background: transparent; border: 1px solid ${t.gold}; border-radius: 4px; color: ${t.gold};
  cursor: pointer; font-family: inherit; font-size: 15px; font-weight: 600; margin-top: 8px;
  min-height: 44px; padding: 10px 16px;
}
.am-direct { margin-top: 20px; }
.am-direct a { color: ${t.gold}; text-decoration: none; }
.am-confirmation .am-button, .am-confirmation .am-secondary { display: inline-block; width: auto; }
@media (prefers-reduced-motion: reduce) { .am-button { transition: none; } }
`;
