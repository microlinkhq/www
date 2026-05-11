# Accent colors

Customer pages use a 4-token `ACCENT` object plus an `ACCENT_RGB` triplet (for the CTA panel's translucent background tint). Every value MUST resolve to a token defined in `src/theme/index.js`. Never invent or extend the ramp.

## Allowed ramps

| User-facing name | text     | bgSoft   | bgEdge   | highlight | `*7` hex   | `ACCENT_RGB`        |
| ---------------- | -------- | -------- | -------- | --------- | ---------- | ------------------- |
| teal (default)   | `teal7`  | `teal0`  | `teal1`  | `teal5`   | `#0ca678`  | `12, 166, 120`      |
| blue             | `blue7`  | `blue0`  | `blue1`  | `blue5`   | `#1c7ed6`  | `28, 126, 214`      |
| cyan             | `cyan7`  | `cyan0`  | `cyan1`  | `cyan5`   | `#1098ad`  | `16, 152, 173`      |
| green            | `green7` | `green0` | `green1` | `green5`  | `#37b24d`  | `55, 178, 77`       |
| orange           | `orange7`| `orange0`| `orange1`| `orange5` | `#f76707`  | `247, 103, 7`       |
| yellow           | `yellow7`| `yellow0`| `yellow1`| `yellow5` | `#f59f00`  | `245, 159, 0`       |

The `*7` hex and `ACCENT_RGB` triplet are derived directly from `src/theme/index.js`. If the theme's color values change, this table MUST be updated to match. The triplet table is also mirrored in `src/components/patterns/CustomerStory/CtaSection.js` (used to render the CTA panel's translucent background tint). When a new ramp is added here, mirror it there too.

## Forbidden

- `pink` / `secondary` / `pinky` / `pinkest` — reserved for `src/pages/feature/*.js` so customer pages stay visually distinct from product feature pages.
- Any token outside the table above (e.g. `red`, `grape`, `indigo`, `lime`, custom hex values).

## Output shape

After the user picks a name, render the `ACCENT` constant exactly like this (orange shown as example):

```js
const ACCENT = {
  text: 'orange7',
  bgSoft: 'orange0',
  bgEdge: 'orange1',
  highlight: 'orange5'
}
```

The four properties MUST appear in this order. Never inline the values elsewhere in the file — every consumer reads from `ACCENT.text`, `ACCENT.bgSoft`, `ACCENT.bgEdge`, or `ACCENT.highlight`.

The `ACCENT_RGB` triplet is NOT part of the `ACCENT` constant. The shared `<CtaSection>` looks it up internally from `accent.text`, so customer pages never need to thread it through props.

## Default

If the user does not specify a brand color, use `teal`. This is the documented default for customer stories.

## Picking by brand

If the user gives a brand color (e.g. "our brand is mint green"), map it to the closest ramp from the table above. Examples:

- mint, emerald, forest → `green`
- sky, navy, royal → `blue`
- aqua, turquoise → `teal` or `cyan` (ask if unclear)
- amber, gold → `yellow`
- coral, rust → `orange`

If the user's brand is in the pink/red family, do NOT use `pink`. Offer `orange` as the closest non-reserved ramp and ask the user to confirm.

If the user provides a hex value (e.g. `#F66C06`), DO NOT inline it. Map the hue to the closest allowed ramp from the table above. Explain to the user that custom hex values aren't allowed (the design system requires token-backed values). The closest match is almost always within visual perception threshold of the brand color.
