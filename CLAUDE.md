@AGENTS.md

# Claude Code notes

Everything in AGENTS.md applies. The points below are specific to Claude Code.

## Workflow

- Before starting, read the `ROADMAP.md` header and the tasks you will touch.
- Before ending any task, run the contribution protocol in AGENTS.md: update `ROADMAP.md` (always), `PROJECT_STRUCTURE.md` (if files changed) and the decision docs (if a decision changed). Do not skip it for small changes, and say in your final message what you updated.
- Use plan mode for multi-file changes and present the plan before editing.
- Prefer targeted edits over rewriting whole files. Keep diffs small.
- After changing code, run typecheck and tests yourself instead of asking Ademola to.
- Do not spawn subagents for small edits. Use them for exploring large amounts of code or docs.

## Context hygiene

- Read `docs/ARCHITECTURE_ESSENTIALS.md`. Open the longer docs only when the task needs them.
- Use `/clear` between unrelated tasks.
- When compacting, keep the hard rules, the current phase and the task in progress.

## Permissions

Ask before running anything that deploys, publishes, deletes, installs global packages or touches git history. `wrangler deploy` is allowed only with `--env test` and only when asked.

## Framer

You cannot operate Framer. Write code components in `/framer`, say where they get pasted, and do not claim anything about Framer's runtime was tested. Items in the "Verify before building" list in `ARCHITECTURE.md` stay unverified until Ademola confirms them.

## Corrections

When Ademola corrects you on a project rule, propose the exact line to add to `AGENTS.md` instead of relying on memory.
