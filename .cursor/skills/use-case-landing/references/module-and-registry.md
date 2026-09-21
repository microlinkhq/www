# UseCaseStory module & registry

Use cases and customer stories now share the `/use-cases` route, folder, and listing, but a use
case stays testimonial-free. Everything a use-case page may import comes from one barrel:
`components/patterns/UseCaseStory`.

## Barrel: `src/components/patterns/UseCaseStory/index.js`

```js
export { ACCENT, USE_CASES } from './use-cases'
export {
  SECTION_PX, SECTION_PY, SECTION_MAX_WIDTH,
  Section, SectionInner, Caption, Figure, FigureImage
} from 'components/patterns/CustomerStory/primitives'
export { DashedGridOverlay } from 'components/patterns/DashedGridOverlay'
export { Eyebrow, StoryTag } from 'components/patterns/CustomerStory/chrome'
export { CtaSection } from 'components/patterns/CustomerStory/CtaSection'
export { WhyCard } from 'components/patterns/CustomerStory/WhyCards'
export { MoreUseCases } from './MoreUseCases'
```

Rules:

- Import these by name. **Never redefine them locally.**
- **Never edit the `CustomerStory` files** — the use-cases section borrows their accent-agnostic
  primitives. Customer-story *pages* now live alongside use-case pages under
  `src/pages/use-cases/`, but they are authored with the separate `customer-story` skill and the
  `CustomerStory` module is still off-limits to use-case work.
- The only use-case-specific files are `use-cases.js` (data) and `MoreUseCases.js` (the
  "More use cases" carousel, a mirror of `MoreCustomers`).

## Export reference

| Export | Notes |
|---|---|
| `ACCENT` | `{ text: 'link', bgSoft: 'blue0', bgEdge: 'blue1', highlight: 'blue5' }`. Always blue. Pass `accent={ACCENT}` to accent-aware components. |
| `USE_CASES` | The registry array. Drives the "Use cases" grid on the listing and `MoreUseCases`. |
| `Section`, `SectionInner` | Page section wrapper + max-width container. |
| `Caption`, `Figure`, `FigureImage` | Layout primitives. `FigureImage` = rounded, shadowed, centered, `maxWidth: 600px` default. |
| `DashedGridOverlay` | Decorative background; render once per page inside `<Layout>`. |
| `Eyebrow` | Accent label. `<Eyebrow accent={ACCENT}>`. |
| `StoryTag` | Pill tag. `<StoryTag accent={ACCENT}>`. Used on the listing (hero tag + card category). |
| `CtaSection` | Shared CTA panel. Props: `accent, headlinePrefix, headlineAccent, body, href, label`, optional `mt`. Background is hardcoded `colors.link` → keep ACCENT blue. |
| `WhyCard` | Props: `accent, number, kicker, title, body`. One boxed card. |
| `MoreUseCases` | Props: `accent, currentSlug`. Filters out `currentSlug`; **self-omits when < 2 entries.** |

Note there is **no** `Testimonial` and **no** `FlowDiagram` in use-cases pages — that is
deliberate. Use code blocks (`CodeEditor`) instead of a flow diagram.

## Registry: `src/components/patterns/UseCaseStory/use-cases.js`

```js
export const ACCENT = {
  text: 'link',
  bgSoft: 'blue0',
  bgEdge: 'blue1',
  highlight: 'blue5'
}

export const USE_CASES = [
  {
    slug: 'upscale-extracted-images',
    name: 'Microlink + Magnific',
    partner: 'Magnific',
    partnerUrl: 'https://magnific.com',
    blurb:
      'Extract the main image from any URL and upscale it to print-ready resolution with AI.',
    icon: '/images/use-cases/magnific.svg',
    category: 'Metadata + AI Upscaling',
    summary:
      "Microlink pulls the main image — and its real dimensions — out of any web page. When it isn't sharp enough, Magnific upscales it with AI, straight from the hosted URL."
  }
]
```

Append a new object per use case. Field usage:

- **grid card** (`index.js`, "Use cases" grid) → `slug, name, blurb, icon, category`
- **`MoreUseCases`** → `slug, name, blurb, icon`
- `partner` / `partnerUrl` — reference-only now. The partner brand still appears in the page
  content (combo `name`, logo, inline link), but the "Pairs well with…" logo bar that rendered
  `partner` was removed during unification, so the listing no longer reads these fields.
- `summary` — optional/legacy (the old featured hero card used it; that card was removed). New
  entries can omit `summary`.

`slug` MUST equal the page filename (`src/pages/use-cases/<slug>.js`) and the
`MoreUseCases currentSlug` on that page.

## The listing page — you don't edit it per use case

`src/pages/use-cases/index.js` is the unified, data-driven listing. In order it renders:

- **Hero** — the customer-story rotating featured card over `CUSTOMERS` (links to
  `/use-cases/<slug>`). Customer-flavored; owned by the `customer-story` flow, not use-case work.
- **LogoBar** — "Trusted by innovative companies", driven by `CUSTOMERS`. (The old use-case-only
  "Pairs well with the tools you already use" bar and its `SHOW_LOGO_BAR` flag were removed.)
- **Customer stories grid** — driven by `CUSTOMERS`.
- **Use cases grid** — driven by `USE_CASES`. Centered grid:
  `grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 560px)); justify-content: center;`
  One card → ~560px centered; two → side-by-side; mobile → one column. Each card: logo + name,
  blurb, category `StoryTag`, "View use case →" link to `/use-cases/<slug>`.

Appending a `USE_CASES` registry entry makes it appear in the use-cases grid automatically.

## Intent landings share the registry

`use-cases.js` now concatenates the partner recipes with four per-vertical arrays from
`registry/<vertical>.js` (`WEBSITE_SCREENSHOT`, `WEBSITE_TO_PDF`, `WEBSITE_TO_MARKDOWN`,
`WEBSITE_METADATA`) and exports `VERTICALS`, `getUseCase`, `getVertical`,
`verticalUseCases`, `partnerUseCases` and `pathToUseCase`. The listing groups landings
by vertical (`UseCaseGroups`) and keeps partner recipes in their own block. `MoreUseCases`
accepts an explicit `slugs` list (used by intent landings for their curated `related`
set) and falls back to same-vertical siblings, then to every other entry. See
`intent-landing.md` for the full contract.
