# PROJECT_STRUCTURE

Where everything lives and why. Read this before creating, moving or deleting a file.

| | |
|---|---|
| Last updated | 2026-10-06 |
| Structure version | 0.1 |
| Status | Planned layout. Only the files marked "exists" are real today. Everything else is created when its ROADMAP task is started |

## Update rule (mandatory, applies to humans and agents)

Update this file in the same change whenever you add, move, rename or delete a file or folder, or change what a file is for.

1. Edit the tree and the file table below.
2. Add a row to the Structure change log at the bottom.
3. Add a Progress log line in `ROADMAP.md` (that file is updated on every contribution, this one only when the structure changes).

## Principles

1. One source of truth per fact. If a fact is written in two places, this file says which one wins.
2. Docs describe decisions. Code and CMS hold behavior and content. Do not restate code in docs.
3. Anything unverified lives in `/content` or `/docs/research`, labeled as unverified, never in the CMS or in site copy.
4. Do not create folders or files that are not in this file. If you need one, add it here first, and explain why.
5. Parked features have a design sketch in ARCHITECTURE.md section 12 and no code. Do not scaffold them.

## Conventions

| Thing | Convention |
|---|---|
| Living docs at the repo root | UPPERCASE.md (AGENTS.md, ROADMAP.md) |
| Design docs in `/docs` | UPPERCASE.md (PRD.md, ARCHITECTURE.md) |
| Other docs and notes | kebab-case.md |
| React components | PascalCase.tsx |
| Other source files | kebab-case.ts or short lowercase names (`phone.ts`) |
| Tests | `<name>.test.ts`, beside the matching area's `test` folder |
| Task IDs | Defined in ROADMAP.md (F-1, P-12, B-10). Use them in commits and log lines |
| Commit messages | `<task id>: what changed`, for example `P-12: confirmation screen` |

## Tree

Markers: (exists) is a real file today, (F-6) means created by that ROADMAP task, (P) Phase 0, (1) Phase 1, (1*) Phase 1 only if gate G1 chooses a Worker.

```
/
├── README.md                          (F-6) what this is, how to start, links to the docs
├── AGENTS.md                          (exists) instructions for any coding agent
├── CLAUDE.md                          (exists) Claude Code additions, imports AGENTS.md
├── ROADMAP.md                         (exists) status, tasks, gates, progress log. Updated on every contribution
├── PROJECT_STRUCTURE.md               (exists) this file
├── .gitignore                         (F-6)
├── .dev.vars.example                  (1*) names of Worker variables, no values
│
├── .github/
│   ├── pull_request_template.md       (F-7) checklist including the ROADMAP update
│   └── workflows/
│       └── ci.yml                     (F-7) fails a PR that does not touch ROADMAP.md; (B-16) adds lint, typecheck, test
│
├── docs/
│   ├── PRD.md                         (exists) what and for whom
│   ├── ARCHITECTURE.md                (exists) design, data models, decisions
│   ├── ARCHITECTURE_ESSENTIALS.md     (exists) short outline for agents
│   ├── spikes/
│   │   └── framer-capability-spike.md (S-5) results of the Framer checks
│   └── research/                      inputs that are NOT verified
│       ├── boy-concept-brief.md       (F-6) the original research brief, labeled unverified
│       └── reference-site-notes.md    (F-6) notes on directorengineer.framer.media
│
├── pitch/
│   ├── Alpha_Movies_Proposal.pptx     (exists) Canva-editable proposal deck
│   └── pitch-script.md                (D-6) message and walkthrough script
│
├── content/                           single place for words and proof
│   ├── copy.md                        (F-8) all site copy, reviewed before it goes into Framer
│   ├── PLACEHOLDERS.md                (F-8) register of every bracketed placeholder
│   └── verification-log.md            (F-8) claim, source, date, who verified
│
├── framer/
│   ├── README.md                      (P) how components are pasted into Framer, sync notes
│   └── EnquiryForm.tsx                (P-12) the only custom Framer component
│
├── shared/
│   ├── whatsapp.ts                    (P-11) message and wa.me URL builders, pure functions
│   └── whatsapp.test.ts               (P-11)
│
├── worker/                            (1*) created only after gate G1 chooses a Worker
│   ├── package.json
│   ├── tsconfig.json
│   ├── wrangler.toml
│   ├── vitest.config.ts
│   ├── eslint.config.js
│   ├── src/
│   │   ├── index.ts                   Hono app, route wiring
│   │   ├── config.ts                  typed env access
│   │   ├── schema.ts                  Zod schema for POST /api/enquiries
│   │   ├── routes/
│   │   │   └── enquiries.ts
│   │   └── lib/
│   │       ├── airtable.ts            the only file that knows Airtable
│   │       ├── notify.ts              Resend email
│   │       ├── phone.ts               libphonenumber-js wrapper
│   │       ├── ref.ts                 reference code generator
│   │       ├── ratelimit.ts
│   │       └── turnstile.ts
│   └── test/
│       ├── phone.test.ts
│       ├── ref.test.ts
│       └── schema.test.ts
│
└── ops/
    ├── launch-checklist.md            (R-6)
    ├── handover-checklist.md          (R-10)
    ├── owner-guide.md                 (R-2)
    ├── rollout-kit.md                 (R-1) bio link text, DM saved reply, staff script
    └── test-matrix.md                 (P-18, R-3) device and browser results
```

Today the delivered files are flat. Task F-6 places them as shown.

## File table

| Path | Purpose | Phase | Update when |
|---|---|---|---|
| README.md | Orientation for a new person or agent | F-6 | Setup or links change |
| AGENTS.md | Rules for coding agents | exists | A working rule changes or an agent breaks a rule |
| CLAUDE.md | Claude Code specifics | exists | Claude Code workflow changes |
| ROADMAP.md | Status and progress log | exists | Every contribution |
| PROJECT_STRUCTURE.md | This map | exists | A file or folder is added, moved, renamed, deleted or repurposed |
| docs/DESIGN.md | Design system tokens and styles | exists | A style token changes |
| docs/PRD.md | Product requirements | exists | A requirement, scope item or open question changes |
| docs/ARCHITECTURE.md | Design and decision log | exists | A technical decision changes |
| docs/ARCHITECTURE_ESSENTIALS.md | Agent outline | exists | ARCHITECTURE.md changes a rule, endpoint or data name |
| docs/spikes/framer-capability-spike.md | Results of the Framer checks | S-5 | Spike results change |
| docs/research/* | Unverified inputs, kept for reference | F-6 | Rarely. Never promote content from here without a verification-log entry |
| pitch/* | Material for the pitch | D | The pitch changes |
| content/copy.md | Source for all site text | F-8 | Copy changes. Edit here first, then Framer |
| content/PLACEHOLDERS.md | Every `[bracketed]` placeholder: where it is, who owns it, status | F-8 | A placeholder is added or resolved |
| content/verification-log.md | Evidence for every shown credential or stat | F-8 | A fact is verified or withdrawn |
| framer/EnquiryForm.tsx | Enquiry form component | P-12 | Form behavior changes |
| shared/whatsapp.ts | WhatsApp message and URL builders | P-11 | The message format changes |
| worker/** | Enquiry API | 1* | Per ARCHITECTURE.md |
| ops/* | Checklists, guides and test logs | R | Process or results change |

## Where does X live

| Thing | Source of truth | Also appears in |
|---|---|---|
| Task status | ROADMAP.md | nowhere else |
| Current phase | ROADMAP.md header | nowhere else |
| Site copy | content/copy.md | Framer pages (copied) |
| Projects and credentials | Framer CMS | content/verification-log.md holds the evidence |
| Owner WhatsApp number | Framer SiteSettings and the Worker variable `OWNER_WHATSAPP_DIGITS` | Two places by design. Change both. Listed in the handover checklist |
| Hard rules | docs/ARCHITECTURE_ESSENTIALS.md | AGENTS.md lists the most-broken ones and points here |
| Decisions | docs/ARCHITECTURE.md decision log | ESSENTIALS where it is a rule |
| Secrets | Worker environment variables, `.dev.vars` locally (gitignored) | nowhere else, ever |
| Enquiries | Airtable (Phase 1 backend) | email to owner |
| Placeholders | content/PLACEHOLDERS.md | the places they appear |
| Open questions | ROADMAP.md tracker | PRD section 12 holds the original wording |

## Known duplication

- The WhatsApp message builder is needed in the Worker and in the browser (the fallback when the API is unreachable and all of Phase 0). `shared/whatsapp.ts` is the source. A copy is inlined in `framer/EnquiryForm.tsx` with a comment `COPY OF shared/whatsapp.ts`. Framer components cannot import from this repo, so keep the copy in sync by hand and edit both in the same change.
- Phone parsing exists as light checks in the browser and as full parsing in the Worker. The Worker is authoritative.

## Directory rules

- `/framer` holds only code components and their notes. No site content.
- `/shared` holds pure functions with no imports from Worker or Framer code.
- `/worker/src/lib/airtable.ts` is the only file allowed to import or know Airtable types.
- `/content` is the only place where unverified claims may exist, and they must be bracketed.
- `/docs/research` is never read as fact by an agent.
- Do not commit: secrets, `.dev.vars`, `node_modules`, build output, Framer exports, personal data from real enquiries.

## Structure change log

Newest first.

| Date | Who | Change | Task |
|---|---|---|---|
| 2026-10-06 | Agent (Claude) | Initial structure defined | F-5 |
