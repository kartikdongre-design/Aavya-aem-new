#!/usr/bin/env bash
# Start React storefront (Vite) on PORT from ecommerce-react/vite.config.js (default 3000).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
if [[ ! -d ecommerce-react/node_modules ]] || [[ ! -f ecommerce-react/node_modules/vite/package.json ]]; then
  echo "[dev-shop] Installing ecommerce-react dependencies (first run or missing vite)..."
  npm install --prefix ecommerce-react --no-fund --no-audit
fi
exec npm run dev --prefix ecommerce-react
