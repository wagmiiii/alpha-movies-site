# NDPA 2023 duties, read against this site

| | |
|---|---|
| Status | Research note. **Not verified by a lawyer.** Task L-4 stops here until Ademola gets a professional read |
| Date of retrieval | 2026-10-10 |
| Primary source read | Nigeria Data Protection Commission, *NDP Act General Application and Implementation Directive (GAID)*, 2025, 117 pages, retrieved from ndpc.gov.ng |
| Secondary sources | DLA Piper Data Protection Laws of the World, Nigeria (page dated 2026-03-17); Future of Privacy Forums explainer of the Act (2023-06-28). Full list in section 12 |
| Read for | L-4. Two flagged lines in this repo: PRD section 9's "Align with the Nigeria Data Protection Act 2023. [verify obligations]", which now points here and at tasks L-6 to L-9, and ARCHITECTURE section 8's retention line with its `[Verify against NDPA 2023]` marker, which stays exactly as it is until task L-7 decides it. ARCHITECTURE section 13 item 9 now records that this reading happened |

Per `PROJECT_STRUCTURE.md`, `/docs/research` is an input, not a fact base. Nothing in this file may be published on the site or pasted into a pitch. It is a map of what the rules appear to require, with the paragraph to check.

## 1. What is in force

- The Act: Nigeria Data Protection Act 2023. Cited throughout the note as "the Act" with its section numbers.
- The instrument that implements it: GAID 2025, which **repeals the NDPR 2019 and the NDPRIF 2019** and replaces them. GAID states it "will become fully effective on 19 September 2025". [Certain: read in the GAID text]
- Consequence for us: every older checklist, blog post or vendor "NDPR 2019 compliance" page predates the operative rules. Any advice written against NDPR 2019 needs re-checking, including the reference site's assumptions. [Likely]
- Registration classes and fees sit in GAID **Schedule 7** (Guidance Notice on Registration of Data Controllers and Processors of Major Importance), reproduced inside the directive, "until such a time that the Commission amends or replaces" it. [Certain]

## 2. The threshold that decides which duties apply

"Data controller or processor of major importance" is defined in Act s.65 by a data-subject count the Commission prescribes. GAID Article 8 sets three levels and Schedule 7 puts numbers on them.

| Level | Count trigger in Schedule 7 | Registration |
|---|---|---|
| Ultra High Level (UHL) | over **5,000** data subjects in six months, or listed sectors (banks, telecoms, insurers, multinationals, DISCOs, oil and gas, public social media and email app developers, fintechs) | register once, file Compliance Audit Returns (CAR) annually |
| Extra High Level (EHL) | over **1,000** but fewer than 5,000 within six months, or listed classes (government MDAs, micro finance banks, higher institutions, secondary and tertiary hospitals, mortgage banks) | register once, file CAR annually |
| Ordinary High Level (OHL) | listed classes (primary and secondary schools, corporate training providers, primary health centres, independent medical labs, hotels under fifty suites) **and** "processors who process sensitive personal data of more than **Two Hundred (200)** data subjects for commercial purposes" | renew registration **annually**, no separate CAR needed when renewing |

Two things follow. A controller in any of these three levels is a "major importance" controller, and the heavier duties (DPO designation, CAR through a licensed compliance organisation, semi-annual reports) attach to that status. Anyone below them still owes the duties in section 3. [Certain that GAID says this; Likely that below-threshold processing is not exempt from the Act itself]

Any body that changes category must notify the Commission of significant registration changes within **60 days**.

For this site the count is not yet knowable: it is Q6 (enquiries a week) plus the client records Emmanuel already keeps plus every guest filmed at an event. See section 11 and Q14.

## 3. Duties GAID Article 7 puts on a controller of any size

Quoted as a list, with the ones that touch this project marked.

- Conduct an Act compliance audit within **15 months of commencement of business** and annually after that. *[ours: Alpha Movies Ltd is an existing company, so this needs a date, not a guess]*
- Identify all obligations under the Act and prepare schedules of compliance.
- Prepare and keep semi-annual data protection reports (a detailed analysis of processing over six months).
- Prepare and follow schedules on monitoring, evaluation and maintenance of the data security system.
- Designate a Data Protection Officer **where the controller is of major importance** (Article 11 cites Act s.32), publish the DPO's contact details and communicate them to the Commission.
- Develop or review an organisational privacy policy that complies with the Act.
- Publish it on the organisation's platforms.
- **"Provide privacy and cookie notices at the homepage of its website."** The cookie notice must give a real accept or decline, and must be displayed so that it "significantly obstructs the middle, the left or the right side of the home page". GAID adds that placing a cookie notice at the bottom of a page where it may be ignored "is tantamount to lack of transparency in data processing".
- Related articles behind that list: the data security schedule article (training, certifications, software updates, vulnerability tests, hardware assessment, authentication checks, encryption reviews, QA), and the internal sensitisation and training schedule.

## 4. What a privacy notice has to say

GAID's article on information to data subjects implements Act s.27. It says the list "includes but is not limited to":

1. The name of the data controller or processor.
2. The lawful basis of the processing.
3. The types of personal data collected.
4. The purpose of the processing.
5. The means of processing.
6. Access to personal data by authorised third parties.
7. The purpose of that third-party access.
8. The data subject's rights.
9. Access to prompt internal remediation through a contact the controller supplies.
10. The right to lodge a complaint with the NDPC.

Two rules in the same article matter for us. Information to data subjects **is not** consent: consent must be asked for separately, and the notice must be given *before* processing. And where a controller cannot hand people a policy, GAID names "exclusive physical events, interviews or interactions" as exactly that case, and requires the information "in the form that the data subject can understand". A wedding videographer is squarely in that clause. [Certain that the text says this; Guessing at how a regulator would apply it to a film crew]

## 5. Consent

- Lawful bases are the six in Act s.25: consent, contract, legal obligation, vital interest, public interest, legitimate interest. GAID Article 16 carries the list and one article covers each basis (Article 17 consent, Article 21 contract, and articles for legal obligation, vital interest, public interest and legitimate interest). It requires the controller to choose deliberately, with a Legitimate Interest Assessment template in Schedule 8.
- GAID Article 17 treats consent as the preferred basis where it works: "it is prudent for a data controller to prioritise the interest of the data subject".
- Article 18 lists where consent is **required**: direct marketing; sensitive personal data; further processing incompatible with the original purpose; **a child's personal data**; **transfer to a country the Commission has not made an adequacy decision on**; solely automated decision-making with legal or significant effect.
- Article 19: cookies and other tracking tools require consent that is "freely given, informed and specific". Only "necessary cookies" (security, network stability, accessibility) are exempt from a tick box. Everything else needs an explicit yes or no. All trackers must be disclosed at the point on the page where they appear.

Our enquiry consent line ("I agree to be contacted about this enquiry") satisfies the shape of Article 18 only if the notice in section 4 is reachable at the same moment. It does not cover marketing, does not cover analytics, and does not cover sending anything abroad. [Certain on the gap, Likely on the fix]

## 6. Retention, where our own doc is probably wrong

- Act s.24 principles include storage limitation. GAID's storage-limitation article says that where no law sets a time, and the original purpose is done, "the storage time for the purpose of data processing shall lapse **not later than six (6) calendar months** when the original purpose of the processing has been accomplished". Longer storage is allowed for defence of a legal claim or due diligence, with the controller's own retention policy and technical measures.
- The article on reliance on contract (21) is closer to our case: at the preliminary stage a controller may process for due diligence, and **"where the contract did not materialise, any personal data collected relating to the data subject shall be destroyed within six (6) months unless there is a justifiable ground to archive the data for the purposes of any future legal claim."**
- A lost enquiry is precisely a contract that did not materialise. `docs/ARCHITECTURE.md` section 8 currently keeps non-spam enquiries for **24 months**. That is a stated position with no recorded justification, and it now has to be either justified or changed. This is task L-7. I have not edited section 8: a data model change is an ask-first item under AGENTS.md.
- GAID also requires the controller to *have* a retention policy, keep it consistent with other laws, minimise what is kept for record purposes, destroy or irreversibly de-identify the residue, and **communicate the policy** to data subjects.

## 7. Rights and grievances

GAID has separate articles on rectification, portability, erasure ("right to be forgotten") and complaining to the Commission, plus Schedule 9 (Data Subject's Standard Notice to Address Grievance) and Schedule 6 (Data Subject's Vulnerability Indexes).

- A complaint goes to the NDPC, which acknowledges receipt within **7 days** and communicates its decision to the parties within **7 days** of determining a violation.
- The Act's own list of rights (secondary sources) includes access, information about the source, objection, rectification, erasure, restriction, portability, withdrawal of consent and not being subject to solely automated decisions.
- **I did not find a fixed number of days for a controller to answer a subject request** in the GAID text I read. The Act is cited by secondary sources as omitting one too. Anyone who tells us "30 days" is probably quoting the repealed NDPR 2019. [Likely that no statutory day-count applies, Guessing about what a regulator would expect in practice]
- Practical consequence: the deletion-on-request process already planned for the owner guide (R-2) and the handover checklist (R-10) is a legal duty, not a courtesy. It needs a named contact and a stated turnaround.

## 8. Breach

Act s.40(2), quoted in GAID's breach-notification article: notify the **Commission within 72 hours** of becoming aware of a breach likely to risk the rights and freedoms of individuals, describing the nature, the categories and the approximate numbers of data subjects and records; and notify **affected data subjects immediately**. A breach is high risk where the data subject could become a victim of fraud, identity theft or exposure of sensitive data. [Certain: the GAID text recites s.40(2)]

Our current design has no breach path at all, because Phase 0 stores nothing and the Worker is not built. Whoever builds the Worker (B-10, B-13) needs this in the design, and ARCHITECTURE section 8 should carry it. It is flagged in section 11 and has no task of its own, because a handling task would be a duty for a system that may not exist: gate G1 decides the Worker, so the handling belongs to the conditional B section. Writing the obligation into section 8 is folded into task L-7, which owns that file section, and the owner's side of it belongs in R-2 either way.

## 9. Processors, contracts and cross-border

- Act s.29(2) and GAID's DPA article: processing by a processor must rest on a Data Processing Agreement. GAID lists what the DPA must contain, including the parties, the purpose, **the location of the processing** (with cross-border in view), scope, lawful basis, responsibilities, technical and organisational measures, DPIA outcome, risks, evidence of registration, confidentiality, tenure, restrictions, indemnity, insurance, force majeure and dispute resolution. Each party must take reasonable measures to ensure the other complies.
- Cross-border: Part VIII of the Act is the overriding provision (s.63). Pending a dedicated instrument from the Commission, GAID says use the explanatory note in **Schedule 5** to evaluate a country's adequacy. Consent is required before transferring to a country with no adequacy decision (Article 18(e)).
- Read together: Framer (hosting and CMS), Cloudflare, Airtable and Resend are processors, most of them foreign, and the site's data would sit with them. We have no DPAs reviewed and no adequacy position. This is task L-8.
- GAID also voids any contract term that tries to take disputes out of Nigerian courts or out of the Commission's reach (it cites Act s.34(1)(a)(vi)). [Certain that the text says this]

## 10. Definitions worth having

From the Act, via secondary sources, to be confirmed against the Act text (the copy I could download was a scanned image with no text layer):

- **Sensitive personal data**: race or ethnic origin, religious or similar beliefs, health status, sex life, political opinions or affiliations, trade union membership, plus anything else the Commission designates. Contact details, event dates and a venue are **not** on that list. [Likely, secondary source]
- **Child**: a person under **18**. Consent for a child's data needs a guardian, with feasible identity checks. [Likely, secondary source. This is a high bar and it matters: school events, confirmations, birthdays and a same-sex wedding shot in a state with a same-sex marriage prohibition law are all foreseeable jobs for this business]
- **Penalties** (Act s.43, secondary sources): up to **2% of annual gross revenue or ₦10,000,000**, whichever is higher, for the higher-risk tier; up to **2% of revenue or ₦2,000,000** for others; late CAR filing adds an administrative penalty of **50% of the filing fee** (that one is certain, it is in GAID). Jail of up to a year on conviction is cited by DLA Piper. [Likely, verify against the Act before repeating this to the client]

## 11. What this changes for this site

| # | Finding | State | What it touches |
|---|---|---|---|
| 1 | A privacy notice is not optional and has a 10-item content list (s.27 via GAID) | Certain | L-4, `content/copy.md`, P-10, footer, R-4 |
| 2 | The notice must come before processing, and consent must be asked separately | Certain | the consent line next to the form, P-12, C-10 |
| 3 | Cookies and analytics need a conspicuous accept/reject banner, not a bottom strip | Certain | L-6, and it puts P-16 (GA4 in Phase 0) in question |
| 4 | Default retention is 6 calendar months after the purpose is done; a lost enquiry must be destroyed inside 6 months unless there is a legal-claim reason | Certain that GAID says it, Likely that it binds us | L-7, ARCHITECTURE section 8, B-10, R-2 |
| 5 | A retention policy must exist and must be communicated | Certain | L-4, L-7 |
| 6 | Below 1,000 data subjects in six months, and outside the listed classes, the heavy duties (registration, DPO, CAR) do not apply. Above 200 subjects of sensitive data for commercial purposes, OHL applies and registration is annual | Certain as written, depends on facts we do not have | L-9, Q6, Q14, C-8 |
| 7 | Vendor DPAs and a cross-border basis are required and we have neither | Certain that the requirement exists | L-8, L-1, B-7, B-9 |
| 8 | 72-hour breach notice to the Commission, immediate notice to subjects | Certain | L-7, ARCHITECTURE section 8, B tasks, R-2 |
| 9 | Footage of guests at a religious or cultural event can reveal beliefs and ethnic origin, which is sensitive data, and the site publishes that footage | Likely, and the sharpest exposure in the whole project | FR-27 permission rule, C-3, P-8, L-9 |
| 10 | Event filming is the named "exclusive physical events" case where the notice must be given in a form people can understand | Certain that the clause exists | R-1 rollout kit, owner guide R-2 |
| 11 | Children under 18 need guardian consent with age verification | Likely, secondary source | C-3 permissions, the per-project permission table in the question sheet |
| 12 | Deleting an enquiry on request is a duty with a named contact, not a favour | Certain | R-2, R-10, already planned |

## 12. Sources

| Source | What it gave | Retrieved |
|---|---|---|
| [NDPC, NDP Act GAID 2025 (PDF, 117 pages)](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf) | everything marked Certain above: Articles 7 to 21, Schedules 5, 6, 7, 9, 10, the 6-month retention rule, the tier thresholds, the cookie rules, s.40(2) breach text, s.27 notice list | 2026-10-10 |
| [Aluko & Oyebode, GAID effective 19 September](https://aluko-oyebode.com/insights/ndpc-gaid-takes-effect-on-19-september-is-your-organisation-prepared/) | that GAID repeals NDPR 2019 and NDPRIF and its effective date | 2026-10-10 |
| [DLA Piper, Data protection laws in Nigeria](https://www.dlapiperdataprotection.com/index.html?t=law&c=NG) | sensitive data list, child under 18, penalty amounts, cross-border grounds, DPO and registration summary | 2026-10-10 |
| [Future of Privacy Forums, Nigeria's new data protection act explained](https://fpf.org/blog/nigerias-new-data-protection-act-explained/) | second read on the six bases, consent standard, child rule, penalties | 2026-10-10 |
| [Templars, NDPC registration deadline extension](https://www.templars-law.com/knowledge-centre/nigerian-data-protection-commission-extends-data-controllers-and-processors-of-major-importance-registration-deadline-and-imposes-new-restrictions/) | the 2% of revenue ceiling and the DPCO gatekeeping for filings | 2026-10-10 |
| [Nigeria Data Protection Act 2023, PLAC copy](https://placng.org/i/wp-content/uploads/2023/06/Nigeria-Data-Protection-Act-2023.pdf) | the Act itself, **but it is a scanned image with no text layer, so nothing was read out of it**. The cert.gov.ng copy is behind a Cloudflare challenge. Section 10 and the penalty figures still need the Act text | 2026-10-10 |

## 13. What a lawyer or Ademola must decide

1. Is the 24-month retention in ARCHITECTURE section 8 justified as a legal-claim archive, or does it change to 6 months, and what does the section's missing breach path say once that is settled (L-7)?
2. Does Phase 0 run GA4 at all, given the banner it would require (L-6)?
3. Count the data subjects honestly: enquiries in six months, plus client records, plus guests in published footage. Which tier is Alpha Movies in (L-9, Q14)?
4. Does published event footage make the business a processor of sensitive personal data for commercial purposes? If yes, the 200-subject OHL trigger is live and registration is annual.
5. Who signs the notice as the controller: Alpha Movies Ltd, and is the builder a processor acting on its instructions (D10 already says every account is held by the client)?
6. Are the vendor terms (Framer, Cloudflare, Airtable, Resend, Google) acceptable as the DPA (L-8)?
7. Who is the named contact for a subject request, given there may be no DPO (Q5 already asks who reads the WhatsApp number)?

Nothing in this note is a claim the site may make about itself. "NDPA compliant" is not a sentence for the pitch or the footer unless section 13 items 1 to 7 are answered and someone qualified signs it off.
