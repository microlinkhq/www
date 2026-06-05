# Accent colors

All customer pages share a single `ACCENT` object exported from `src/components/patterns/CustomerStory/customers.js`:

```js
export const ACCENT = {
  text: 'link',
  bgSoft: 'blue0',
  bgEdge: 'blue1',
  highlight: 'blue5'
}
```

Pages import it: `import { ACCENT } from 'components/patterns/CustomerStory'`. Never define locally.

The `CtaSection` background tint uses `${colors.link}0F` (hex alpha) directly — no RGB lookup map needed.

## Forbidden

- `pink` / `secondary` / `pinky` / `pinkest` — reserved for `src/pages/feature/*.js`.
