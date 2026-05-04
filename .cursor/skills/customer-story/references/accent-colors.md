# Accent colors

Customer pages use a 4-token `ACCENT` object. Every value MUST resolve to a token defined in `src/theme/index.js`. Never invent or extend the ramp.

## Allowed ramps

| User-facing name | text     | bgSoft   | bgEdge   | highlight |
| ---------------- | -------- | -------- | -------- | --------- |
| teal (default)   | `teal7`  | `teal0`  | `teal1`  | `teal5`   |
| blue             | `blue7`  | `blue0`  | `blue1`  | `blue5`   |
| cyan             | `cyan7`  | `cyan0`  | `cyan1`  | `cyan5`   |
| green            | `green7` | `green0` | `green1` | `green5`  |
| orange           | `orange7`| `orange0`| `orange1`| `orange5` |
| yellow           | `yellow7`| `yellow0`| `yellow1`| `yellow5` |

## Forbidden

- `pink` / `secondary` / `pinky` / `pinkest` — reserved for `src/pages/feature/*.js` so customer pages stay visually distinct from product feature pages.
- Any token outside the table above (e.g. `red`, `grape`, `indigo`, `lime`, custom hex values).

## Output shape

After the user picks a name, render the `ACCENT` constant exactly like this:

```js
const ACCENT = {
  text: 'teal7',
  bgSoft: 'teal0',
  bgEdge: 'teal1',
  highlight: 'teal5'
}
```

The four properties MUST appear in this order. Never inline the values elsewhere in the file — every consumer reads from `ACCENT.text`, `ACCENT.bgSoft`, `ACCENT.bgEdge`, or `ACCENT.highlight`.

## Default

If the user does not specify a brand color, use `teal`. This matches the live template at `src/pages/customers/example.js` and is the established default for customer stories.

## Picking by brand

If the user gives a brand color (e.g. "our brand is mint green"), map it to the closest ramp from the table above. Examples:

- mint, emerald, forest → `green`
- sky, navy, royal → `blue`
- aqua, turquoise → `teal` or `cyan` (ask if unclear)
- amber, gold → `yellow`
- coral, rust → `orange`

If the user's brand is in the pink/red family, do NOT use `pink`. Offer `orange` as the closest non-reserved ramp and ask the user to confirm.
