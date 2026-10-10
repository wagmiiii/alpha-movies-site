import test from "node:test";
import assert from "node:assert/strict";

import {
  MAX_MESSAGE_CHARS,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  digitsOnly,
  formatEventDate,
  isValidWhatsAppDigits,
  toE164Digits,
  type EnquiryBrief,
} from "./whatsapp.ts";

const base: EnquiryBrief = {
  name: "Ada and Tunde",
  projectType: "Wedding or event",
  eventDate: "2027-02-14",
  dateFlexible: false,
  venue: "Lagos Island",
  city: "Lagos",
  country: "Nigeria",
  duration: "Full day",
  deliverables: ["Highlight reel", "Drone coverage"],
  referenceUrl: "https://www.youtube.com/watch?v=abc",
};

test("digits only, no plus, no leading zeros", () => {
  assert.equal(toE164Digits("+234 801 234 5678"), "2348012345678");
  assert.equal(toE164Digits("+2348012345678"), "2348012345678");
  assert.equal(toE164Digits("234-801-234-5678"), "2348012345678");
  assert.equal(toE164Digits("  +234 (801) 234 5678  "), "2348012345678");
});

test("a local number with a trunk 0 takes the country code in its place", () => {
  assert.equal(toE164Digits("08012345678"), "2348012345678");
  assert.equal(toE164Digits("07911 123456", "44"), "447911123456");
  assert.equal(toE164Digits("002348012345678"), "2348012345678");
});

test("a national number with no prefix gets the country code once, never twice", () => {
  assert.equal(toE164Digits("8012345678"), "2348012345678");
  assert.equal(toE164Digits("2348012345678"), "2348012345678");
  assert.equal(toE164Digits("447911123456", "44"), "447911123456");
});

test("unusable input yields no digits rather than a broken number", () => {
  assert.equal(toE164Digits(""), "");
  assert.equal(toE164Digits("   "), "");
  assert.equal(toE164Digits("not a number"), "");
  assert.equal(digitsOnly("a1b2c3"), "123");
});

test("the output never keeps a plus or a leading zero", () => {
  for (const raw of ["+234 801 234 5678", "08012345678", "00234 801 234 5678", "+23408012345678"]) {
    const out = toE164Digits(raw);
    assert.ok(!out.includes("+"), out);
    assert.ok(!out.startsWith("0"), out);
    assert.match(out, /^\d+$/);
  }
});

test("number length decides validity", () => {
  assert.ok(isValidWhatsAppDigits("2348012345678"));
  assert.ok(isValidWhatsAppDigits("447911123456"));
  assert.ok(!isValidWhatsAppDigits(""));
  assert.ok(!isValidWhatsAppDigits("23480"));
  assert.ok(!isValidWhatsAppDigits("02348012345678"));
  assert.ok(!isValidWhatsAppDigits("1234567890123456"));
});

test("the PRD section 7 example reproduces exactly", () => {
  assert.equal(
    buildWhatsAppMessage(base, "AM-7K3Q5"),
    [
      "Hello Alpha Movies, I just submitted a brief (Ref AM-7K3Q5).",
      "Project: Wedding or event",
      "Date: 14 Feb 2027 (flexible: no)",
      "Location: Lagos Island, Lagos, Nigeria",
      "Duration: Full day",
      "Deliverables: Highlight reel, Drone coverage",
      "Reference: https://www.youtube.com/watch?v=abc",
      "Name: Ada and Tunde",
    ].join("\n"),
  );
});

test("Phase 0 has no ref, so the ref is absent and nothing is left dangling", () => {
  const message = buildWhatsAppMessage(base);
  assert.ok(!message.includes("(Ref "), message);
  assert.equal(message.split("\n")[0], "Hello Alpha Movies, I just submitted a brief.");
});

test("dates format from the ISO parts, so no timezone can shift the day", () => {
  assert.equal(formatEventDate("2027-02-14"), "14 Feb 2027");
  assert.equal(formatEventDate("2027-01-01"), "1 Jan 2027");
  assert.equal(formatEventDate("2026-12-31"), "31 Dec 2026");
  assert.equal(formatEventDate("2027-13-01"), "2027-13-01");
  assert.equal(formatEventDate("when the moon is full"), "when the moon is full");
});

test("a second date becomes a span, and repeating the first date does not", () => {
  const multiDay = buildWhatsAppMessage({ ...base, eventEndDate: "2027-02-16" });
  assert.match(multiDay, /Date: 14 Feb 2027 to 16 Feb 2027 \(flexible: no\)/);

  const sameDay = buildWhatsAppMessage({ ...base, eventEndDate: "2027-02-14" });
  assert.match(sameDay, /Date: 14 Feb 2027 \(flexible: no\)/);

  const flexible = buildWhatsAppMessage({ ...base, dateFlexible: true });
  assert.match(flexible, /Date: 14 Feb 2027 \(flexible: yes\)/);
});

test("an empty venue drops out of the location line instead of leaving a comma", () => {
  const message = buildWhatsAppMessage({ ...base, venue: "  " });
  assert.match(message, /^Location: Lagos, Nigeria$/m);
});

test("the reference field has three states", () => {
  assert.match(buildWhatsAppMessage(base), /^Reference: https:\/\/www\.youtube\.com/m);

  const described = buildWhatsAppMessage({
    ...base,
    referenceUrl: "",
    referenceDescribedInNotes: true,
    notes: "Warm, handheld, no talking heads.",
  });
  assert.match(described, /^Reference: described in Notes$/m);
  assert.match(described, /^Notes: Warm, handheld, no talking heads\.$/m);

  const none = buildWhatsAppMessage({ ...base, referenceUrl: "" });
  assert.ok(!none.includes("Reference:"), none);
});

test("company and email appear only when the visitor gave them", () => {
  const plain = buildWhatsAppMessage(base);
  assert.ok(!plain.includes("Company:"), plain);
  assert.ok(!plain.includes("Email:"), plain);

  const full = buildWhatsAppMessage({ ...base, company: "Koto Agency", email: "ada@example.com" });
  assert.match(full, /^Company: Koto Agency$/m);
  assert.match(full, /^Email: ada@example\.com$/m);
});

test("a 1000 character note keeps the whole message inside the wa.me limit", () => {
  const message = buildWhatsAppMessage({ ...base, notes: "x".repeat(1000) });
  assert.ok(message.length <= MAX_MESSAGE_CHARS, `${message.length} chars`);
  assert.match(message, /^Notes: x/m);
});

test("a short note is passed through untouched", () => {
  const message = buildWhatsAppMessage({ ...base, notes: "Two cameras, one drone." });
  assert.match(message, /^Notes: Two cameras, one drone\.$/m);
});

test("Notes are dropped whole when there is no room for them, never cut mid-word", () => {
  const longBase: EnquiryBrief = {
    ...base,
    venue: "A".repeat(400),
    city: "B".repeat(400),
    country: "C".repeat(200),
    deliverables: ["Highlight reel", "Full film", "Same-day edit", "Drone coverage", "Social cuts", "Other"],
  };
  const message = buildWhatsAppMessage({ ...longBase, notes: "D".repeat(50) });
  assert.ok(message.length <= MAX_MESSAGE_CHARS, `${message.length} chars`);
  assert.ok(!message.includes("Notes:"), "Notes did not fit and were dropped");
});

test("a WhatsApp link is https, digits only, and fully percent encoded", () => {
  const message = buildWhatsAppMessage(base);
  const url = buildWhatsAppUrl("+234 801 234 5678", message);

  assert.ok(url.startsWith("https://wa.me/2348012345678?text="), url);
  assert.ok(!url.includes("+234"), url);
  assert.ok(!url.includes(" "), url);
  assert.ok(url.includes("%0A"), url);
  assert.equal(decodeURIComponent(url.split("text=")[1]), message);
});

test("a number that cannot form a link returns an empty string so the caller falls back", () => {
  assert.equal(buildWhatsAppUrl("", "hello"), "");
  assert.equal(buildWhatsAppUrl("12345", "hello"), "");
  // A national number with no country code is refused, not guessed at.
  assert.equal(buildWhatsAppUrl("08012345678", "hello"), "");
  assert.equal(buildWhatsAppUrl("+234 801 234 5678", "hello").slice(0, 30), "https://wa.me/2348012345678?te");
});
