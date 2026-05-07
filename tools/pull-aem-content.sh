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
  slug="index"
else
  fetch_path="${normalized_path}.plain.html"
  slug="$(echo "${normalized_path#/}" | tr '/' '_')"
fi

url="https://${host}${fetch_path}?v=$(date +%s)"
out_dir="synced-content/${target}"
out_file="${out_dir}/${slug}.plain.html"

mkdir -p "$out_dir"
curl -fsSL "$url" -o "$out_file"

echo "Pulled ${url}"
echo "Saved to ${out_file}"
