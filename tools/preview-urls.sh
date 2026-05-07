#!/usr/bin/env bash

set -euo pipefail

remote_url="$(git remote get-url origin)"
branch="$(git rev-parse --abbrev-ref HEAD)"

owner=""
repo=""

if [[ "$remote_url" =~ github\.com[:/]([^/]+)/([^/.]+)(\.git)?$ ]]; then
  owner="${BASH_REMATCH[1]}"
  repo="${BASH_REMATCH[2]}"
else
  echo "Could not parse GitHub owner/repo from origin remote: $remote_url" >&2
  exit 1
fi

owner="$(echo "$owner" | tr '[:upper:]' '[:lower:]')"
repo="$(echo "$repo" | tr '[:upper:]' '[:lower:]')"
branch="$(echo "$branch" | tr '[:upper:]' '[:lower:]')"

prod_preview="https://main--${repo}--${owner}.aem.page/"
prod_live="https://main--${repo}--${owner}.aem.live/"
feature_preview="https://${branch}--${repo}--${owner}.aem.page/"
cache_bust="${feature_preview}?v=$(date +%s)"

echo "Production Preview: ${prod_preview}"
echo "Production Live:    ${prod_live}"
echo "Feature Preview:    ${feature_preview}"
echo "Feature (cache-bust): ${cache_bust}"
echo
echo "Tip: after pushing branch changes, test sections/blocks on Feature Preview."
