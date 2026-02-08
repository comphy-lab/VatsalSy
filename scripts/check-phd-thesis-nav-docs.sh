#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LAYOUT_FILE="${REPO_ROOT}/_layouts/default.html"
DOC_FILE="${REPO_ROOT}/AGENTS.md"

NAV_LINK='href="{{ site.baseurl }}/phd-thesis/"'
DOC_PHRASE="This page is included in the main navigation menu"

if [[ ! -f "${LAYOUT_FILE}" ]]; then
  echo "Missing layout file: ${LAYOUT_FILE}"
  exit 1
fi

if [[ ! -f "${DOC_FILE}" ]]; then
  echo "Missing docs file: ${DOC_FILE}"
  exit 1
fi

nav_present=0
doc_phrase_present=0

if grep -Fq "${NAV_LINK}" "${LAYOUT_FILE}"; then
  nav_present=1
fi

if grep -Fq "${DOC_PHRASE}" "${DOC_FILE}"; then
  doc_phrase_present=1
fi

if [[ ${nav_present} -eq 1 && ${doc_phrase_present} -eq 0 ]]; then
  echo "PhD thesis nav link exists but docs are stale."
  echo "Update AGENTS.md to mention thesis page is in main navigation."
  exit 1
fi

if [[ ${nav_present} -eq 0 && ${doc_phrase_present} -eq 1 ]]; then
  echo "Docs mention thesis page in main navigation but nav link is missing."
  echo "Update AGENTS.md or restore nav link in _layouts/default.html."
  exit 1
fi

echo "PhD thesis nav/docs check passed."
