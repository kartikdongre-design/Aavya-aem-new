#!/usr/bin/env bash
# Build all React apps for AEM static hosting (shop, admin suite, urbannest).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "[build-aem-apps] Installing dependencies if needed..."
npm install --prefix ecommerce-react --no-fund --no-audit
npm install --prefix shopping-admin-suite --no-fund --no-audit
npm install --prefix urbannest-realty --no-fund --no-audit

echo "[build-aem-apps] Building Velvora shop..."
npm run build --prefix ecommerce-react

echo "[build-aem-apps] Building Shopping Admin Suite..."
npm run build --prefix shopping-admin-suite

echo "[build-aem-apps] Building UrbanNest Realty..."
npm run build --prefix urbannest-realty

echo ""
echo "AEM entry pages (commit and push these):"
echo "  index-shopping.html"
echo "  index-shopping-admin-suite.html"
echo "  index-urbannest-realty.html"
echo ""
echo "Asset folders:"
echo "  shop/"
echo "  shopping-admin/"
echo "  urbannest/"
echo ""
echo "Preview URLs (after push):"
echo "  https://main--aavya-aem-new--kartikdongre-design.aem.page/index-shopping.html#/"
echo "  https://main--aavya-aem-new--kartikdongre-design.aem.page/index-shopping-admin-suite.html#/"
echo "  https://main--aavya-aem-new--kartikdongre-design.aem.page/index-urbannest-realty.html#/"
