#!/usr/bin/env bash

set -euo pipefail

target="${1:-preview}"   # preview|live
page_path="${2:-/}"      # e.g. /, /about-us

remote_url="$(git remote get-url origin)"
branch="$(git rev-parse --abbrev-ref HEAD | tr '[:upper:]' '[:lower:]')"

if [[ "$remote_url" =~ github\.com[:/]([^/]+)/([^/.]+)(\.git)?$ ]]; then
  owner="$(echo "${BASH_REMATCH[1]}" | tr '[:upper:]' '[:lower:]')"
  repo="$(echo "${BASH_REMATCH[2]}" | tr '[:upper:]' '[:lower:]')"
else
  echo "Could not parse GitHub owner/repo from origin remote: $remote_url" >&2
  exit 1
fi

if [[ "$page_path" != /* ]]; then
  page_path="/${page_path}"
fi

if [[ "$target" == "preview" ]]; then
  host="${branch}--${repo}--${owner}.aem.page"
elif [[ "$target" == "live" ]]; then
  host="main--${repo}--${owner}.aem.live"
else
  echo "Invalid target '$target'. Use 'preview' or 'live'." >&2
  exit 1
fi

normalized_path="${page_path%/}"
if [[ -z "$normalized_path" ]]; then
  normalized_path="/"
fi

if [[ "$normalized_path" == "/" ]]; then
  fetch_path="/index.plain.html"
else
  fetch_path="${normalized_path}.plain.html"
fi

url="https://${host}${fetch_path}?v=$(date +%s)"
content="$(curl -fsSL "$url")"

if echo "$content" | rg -q "Congrats, Welcome to AEM!"; then
  echo "Placeholder content detected at ${url}" >&2
  exit 1
fi

echo "No default placeholder content detected at ${url}"
