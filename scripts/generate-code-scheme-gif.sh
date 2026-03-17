#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
THEMES_FILE="$ROOT_DIR/src/components/markdown/CodeSchemeThemePreview.js"

URL="${1:-https://api.microlink.io/}"
OUT_GIF_REL="${2:-static/images/code-scheme.gif}"
FRAMES_DIR_REL="${3:-static/images/code-scheme/frames}"
FRAME_LIMIT="${4:-10}"
FRAME_FORMAT="${5:-png}"

OUT_GIF="$ROOT_DIR/$OUT_GIF_REL"
FRAMES_DIR="$ROOT_DIR/$FRAMES_DIR_REL"

if ! command -v browserless >/dev/null 2>&1; then
  echo "error: browserless CLI is required (pnpm add -g browserless)." >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "error: ffmpeg is required to generate the GIF." >&2
  exit 1
fi

if [ ! -f "$THEMES_FILE" ]; then
  echo "error: themes file not found: $THEMES_FILE" >&2
  exit 1
fi

if ! [[ "$FRAME_LIMIT" =~ ^[0-9]+$ ]]; then
  echo "error: frame limit must be a non-negative integer (received: $FRAME_LIMIT)" >&2
  exit 1
fi

FRAME_FORMAT="$(printf '%s' "$FRAME_FORMAT" | tr '[:upper:]' '[:lower:]')"
if [ "$FRAME_FORMAT" = "jpg" ]; then
  FRAME_FORMAT="jpeg"
fi

if [ "$FRAME_FORMAT" != "jpeg" ] && [ "$FRAME_FORMAT" != "png" ]; then
  echo "error: frame format must be one of: jpeg, png (received: $FRAME_FORMAT)" >&2
  exit 1
fi

mkdir -p "$FRAMES_DIR"
find "$FRAMES_DIR" -maxdepth 1 -type f -name "*.$FRAME_FORMAT" -delete

THEMES="$({
  node - "$THEMES_FILE" <<'NODE'
const fs = require('fs')
const file = process.argv[2]
const source = fs.readFileSync(file, 'utf8')
const match = source.match(/const THEMES = \[(.*?)\]\n\nconst COMBO_THEMES/s)
if (!match) {
  console.error('error: THEMES array not found')
  process.exit(1)
}
for (const item of match[1].matchAll(/'([^']+)'/g)) {
  console.log(item[1].replace(/^prism-/, ''))
}
NODE
} | sed '/^$/d')"

if [ "$FRAME_LIMIT" -gt 0 ]; then
  THEMES="$(printf '%s\n' "$THEMES" | head -n "$FRAME_LIMIT")"
fi

TOTAL="$(printf '%s\n' "$THEMES" | sed '/^$/d' | wc -l | tr -d ' ')"
COUNT=0

while IFS= read -r theme; do
  [ -z "$theme" ] && continue
  COUNT=$((COUNT + 1))
  echo "[$COUNT/$TOTAL] screenshot: $theme"
  browserless screenshot "$URL" --codeScheme "$theme" --path "$FRAMES_DIR/$theme.$FRAME_FORMAT" --no-verbose
done <<< "$THEMES"

ACTUAL="$(find "$FRAMES_DIR" -maxdepth 1 -type f -name "*.$FRAME_FORMAT" | wc -l | tr -d ' ')"
if [ "$ACTUAL" -ne "$TOTAL" ]; then
  echo "error: expected $TOTAL frames, found $ACTUAL" >&2
  exit 1
fi

LIST_FILE="$(mktemp)"
PALETTE_FILE="$(mktemp -t code-scheme-palette).png"

cleanup() {
  rm -f "$LIST_FILE" "$PALETTE_FILE"
}
trap cleanup EXIT

LAST_THEME=''
while IFS= read -r theme; do
  [ -z "$theme" ] && continue
  printf "file '%s'\n" "$FRAMES_DIR/$theme.$FRAME_FORMAT" >> "$LIST_FILE"
  printf "duration 1\n" >> "$LIST_FILE"
  LAST_THEME="$theme"
done <<< "$THEMES"

printf "file '%s'\n" "$FRAMES_DIR/$LAST_THEME.$FRAME_FORMAT" >> "$LIST_FILE"

mkdir -p "$(dirname "$OUT_GIF")"

ffmpeg -hide_banner -loglevel error -y \
  -f concat -safe 0 -i "$LIST_FILE" \
  -vf "palettegen" \
  "$PALETTE_FILE"

ffmpeg -hide_banner -loglevel error -y \
  -f concat -safe 0 -i "$LIST_FILE" \
  -i "$PALETTE_FILE" \
  -lavfi "paletteuse" \
  "$OUT_GIF"

SIZE="$(du -h "$OUT_GIF" | awk '{print $1}')"
echo "done: $OUT_GIF ($SIZE)"
