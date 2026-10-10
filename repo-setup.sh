#!/usr/bin/env bash
# One-time setup for the Alpha Movies site repo. Run from the root of the unzipped folder.
# Usage:  bash /path/to/repo-setup.sh          creates the GitHub repo and pushes
#         bash /path/to/repo-setup.sh protect  turns on branch protection (run after the first PR has run CI once)
# Keep this script OUTSIDE the repo folder. It is not part of the repo.
set -euo pipefail

OWNER="wagmiiii"
REPO="alpha-movies-site"
CHECK_NAME="roadmap-and-structure"

command -v git >/dev/null || { echo "git is not installed"; exit 1; }
command -v gh  >/dev/null || { echo "Install the GitHub CLI first: https://cli.github.com"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Run: gh auth login"; exit 1; }

if [ "${1:-}" = "protect" ]; then
  echo "Enabling branch protection on main..."
  if gh api -X PUT "repos/$OWNER/$REPO/branches/main/protection" --input - <<JSON
{
  "required_status_checks": { "strict": true, "contexts": ["$CHECK_NAME"] },
  "enforce_admins": false,
  "required_pull_request_reviews": { "required_approving_review_count": 0 },
  "restrictions": null
}
JSON
  then
    echo "Done. PRs into main now need the '$CHECK_NAME' check to pass."
  else
    echo "Branch protection failed. Private repos on the free GitHub plan may not support it."
    echo "Options: upgrade the plan, make the repo public (not recommended for client work), or rely on discipline and review."
  fi
  exit 0
fi

[ -f ROADMAP.md ] || { echo "Run this from the repo root (ROADMAP.md not found)"; exit 1; }

[ -d .git ] || git init -b main
git add -A
git commit -m "F-6: initial repo structure and docs" || echo "Nothing new to commit"

gh repo create "$OWNER/$REPO" --private --source=. --remote=origin --push

gh repo edit "$OWNER/$REPO" \
  --delete-branch-on-merge \
  --enable-squash-merge \
  --enable-merge-commit=false \
  --enable-rebase-merge=false \
  --enable-wiki=false \
  --enable-projects=false

cat <<MSG

Repo created: https://github.com/$OWNER/$REPO

Next:
  1. git switch -c task/F-7-verify-ci
  2. Add one line to the Progress log in ROADMAP.md, mark F-6 and F-7 as done, update the scorecard.
  3. git commit -am "F-7: verify CI" && git push -u origin HEAD
  4. gh pr create --fill   (the '$CHECK_NAME' check should pass)
  5. After it has run once: bash /path/to/repo-setup.sh protect
MSG
