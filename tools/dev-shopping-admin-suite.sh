#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[admin-suite] starting API on :3001"
node "$ROOT/ecommerce-react/server/index.js" &
API_PID=$!

cleanup() {
  kill "$API_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "[admin-suite] starting Shopping Admin Suite on :3100"
npm --prefix "$ROOT/shopping-admin-suite" run dev
