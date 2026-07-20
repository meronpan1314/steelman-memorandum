#!/usr/bin/env bash
set -euo pipefail

: "${GH_REPO:?GH_REPO is required}"
: "${BRANCH_NAME:?BRANCH_NAME is required}"

DRY_RUN="${DRY_RUN:-false}"
ISSUE_NUMBER="${BRANCH_NAME#output-}"

if ! printf '%s' "$ISSUE_NUMBER" | grep -Eq '^[0-9]+$'; then
  echo "Branch name must be output-<issue-number>: $BRANCH_NAME" >&2
  exit 1
fi

OWNER="${GH_REPO%%/*}"

PR_JSON="$(
  gh api \
    --method GET \
    "repos/$GH_REPO/pulls" \
    -f "head=$OWNER:$BRANCH_NAME" \
    -f state=all \
    --jq '.[0] // empty'
)"

if [ -z "$PR_JSON" ]; then
  echo "No PR found for $BRANCH_NAME" >&2
  exit 1
fi

PR_NUMBER="$(printf '%s' "$PR_JSON" | jq -r '.number')"
PR_MERGED_AT="$(printf '%s' "$PR_JSON" | jq -r '.merged_at // ""')"

if [ -z "$PR_NUMBER" ] || [ "$PR_NUMBER" = "null" ]; then
  echo "No PR number found for $BRANCH_NAME" >&2
  exit 1
fi

if [ -z "$PR_MERGED_AT" ]; then
  if [ "$DRY_RUN" = "true" ]; then
    echo "DRY_RUN: would merge PR #$PR_NUMBER"
  else
    gh api \
      --method PUT \
      "repos/$GH_REPO/pulls/$PR_NUMBER/merge" \
      -f merge_method=merge
  fi
else
  echo "PR #$PR_NUMBER is already merged"
fi

if gh api --method GET "repos/$GH_REPO/git/ref/heads/$BRANCH_NAME" >/dev/null 2>&1; then
  if [ "$DRY_RUN" = "true" ]; then
    echo "DRY_RUN: would delete branch $BRANCH_NAME"
  else
    gh api --method DELETE "repos/$GH_REPO/git/refs/heads/$BRANCH_NAME"
  fi
else
  echo "Branch $BRANCH_NAME is already deleted"
fi

ISSUE_JSON="$(
  gh api \
    --method GET \
    "repos/$GH_REPO/issues/$ISSUE_NUMBER" \
    --jq '{state: .state, state_reason: .state_reason}'
)"
ISSUE_STATE="$(printf '%s' "$ISSUE_JSON" | jq -r '.state')"

if [ "$ISSUE_STATE" != "closed" ]; then
  if [ "$DRY_RUN" = "true" ]; then
    echo "DRY_RUN: would close issue #$ISSUE_NUMBER"
  else
    gh api \
      --method PATCH \
      "repos/$GH_REPO/issues/$ISSUE_NUMBER" \
      -f state=closed \
      -f state_reason=completed
  fi
else
  echo "Issue #$ISSUE_NUMBER is already closed"
fi
