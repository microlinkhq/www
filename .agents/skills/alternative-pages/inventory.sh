#!/usr/bin/env bash
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

for page in src/pages/alternative/*.js; do
  slug=$(basename "$page" .js)
  [ "$slug" = index ] && continue
  dir="src/components/pages/$slug"
  checked=$(grep -ho "CHECKED_AT = '[0-9-]*'" "$dir"/*.js 2>/dev/null | head -1 | grep -o "[0-9-]\{10\}" || true)
  dated=$(grep -hoE "(January|February|March|April|May|June|July|August|September|October|November|December) 20[0-9]{2}" "$dir"/*.js 2>/dev/null | sort -u | paste -sd ',' - || true)
  sources=$(grep -hoE "source: '[^']+'" "$dir"/*.js 2>/dev/null | sed "s/source: //; s/'//g" | sort -u | paste -sd ' ' - || true)
  pricing_links=$(grep -hoE "https?://[^'\" )}]+" "$dir"/*.js 2>/dev/null | grep -v microlink | grep -iE "pric|plan|credit|cost|billing" | sort -u | paste -sd ' ' - || true)
  family=$(grep -q "PRICE_COMPARISON" "$dir/shared.js" 2>/dev/null && echo price-card || echo reference)
  printf '%s\t%s\tchecked=%s\tdates=%s\tsources=%s\tpricing_links=%s\n' "$slug" "$family" "${checked:--}" "${dated:--}" "${sources:--}" "${pricing_links:--}"
done
