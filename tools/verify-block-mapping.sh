#!/usr/bin/env bash

set -euo pipefail

index_file="index.html"

if [[ ! -f "$index_file" ]]; then
  echo "Missing ${index_file}" >&2
  exit 1
fi

mapfile -t block_names < <(
  sed -n 's/.*class="\([^"]*\)".*/\1/p' "$index_file" \
    | tr ' ' '\n' \
    | tr -d '\r' \
    | awk 'NF' \
    | sort -u \
    | grep -Ev '^(section|block|header|footer|button-wrapper|default-content-wrapper|section-metadata|icon.*)$' || true
)

missing=0

for name in "${block_names[@]}"; do
  # keep only likely block names (letters, numbers, and dashes)
  if [[ ! "$name" =~ ^[a-z0-9-]+$ ]]; then
    continue
  fi

  js_path="blocks/${name}/${name}.js"
  css_path="blocks/${name}/${name}.css"

  if [[ -d "blocks/${name}" ]]; then
    if [[ ! -f "$js_path" ]]; then
      echo "Missing block JS: ${js_path}" >&2
      missing=1
    fi
    if [[ ! -f "$css_path" ]]; then
      echo "Missing block CSS: ${css_path}" >&2
      missing=1
    fi
  fi
done

if [[ "$missing" -ne 0 ]]; then
  exit 1
fi

echo "Block mapping check passed for ${index_file}."
