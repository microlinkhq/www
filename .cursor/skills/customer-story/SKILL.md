---
name: customer-story
description: Scaffold a customer use-case page under src/pages/customers/ from CustomerStory module.
---

# Customer Story

Build a customer page at `src/pages/customers/<slug>.js`.

## Read first

1. `src/components/patterns/CustomerStory/index.js` — barrel exports.
2. `src/pages/customers/luckynote.js` — reference page. Mirror its structure.
3. `.cursor/skills/customer-story/references/template.md` — template with `{{TOKEN}}` placeholders.
4. `.cursor/skills/customer-story/references/cta-routing.md` — use-case → CTA href mapping.

## Shared module

All primitives live in `src/components/patterns/CustomerStory/`. Import by name. Never re-declare locally.

| Export | Notes |
|---|---|
| `ACCENT` | Shared accent object (`text: 'link'`). Imported, never defined locally. |
| `CUSTOMERS` | Registry of all customer metadata (slug, name, blurb, icon, quote, author, role, avatar, initials). |
| `Section`, `SectionInner`, `Caption`, `Figure`, `FigureImage` | Layout primitives. |
| `DashedGridOverlay` | Decorative background. |
| `Eyebrow` | Accent-aware label. Pass `accent={ACCENT}`. |
| `Testimonial` | Props: `accent`, `quote`, `author`, `role`, `company`, `initials`, optional `avatar`, `maxWidth`. |
| `MoreCustomers` | Filters out `currentSlug`. Self-omits when < 2 siblings. |
| `CtaSection` | CTA panel. Uses `colors.link` for background tint internally. Props: `accent`, `headlinePrefix`, `headlineAccent`, `body`, `href`, `label`, optional `mt`. |
| `WhyCard` | Props: `accent`, `number`, `kicker`, `title`, `body`. |
| `FlowDiagram` | Props: `accent`, `nodes` array (`{ label, sub, active? }`). |

## Typography

- Paragraphs: `<Text as='p'>` — uses `Text` defaults (fontSize: [1,1,2,2], lineHeight: 3).
- Section headings: `<Text as='h2'>` — same base component.
- No `BodyText`, no `SubheadBase`. Just `Text` with the appropriate `as` prop.

## Hero structure

The hero shows logo + company name (not a "Customer story" tag):

```jsx
<Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
  <img src='/images/clients/{{ICON}}' alt='' width='40' height='40'
    css={theme({ display: 'block', borderRadius: 2, width: '40px', height: '40px' })}
    style={{ objectFit: 'cover' }} decoding='async' />
  <Text css={theme({ color: 'black', fontSize: 2, fontWeight: 'bold', lineHeight: 1 })}>
    {{CUSTOMER_NAME}}
  </Text>
</Flex>
```

## Section order

```
Hero (logo + name, h1, intro paragraph, ArrowLink CTA)
AboutCustomer (Eyebrow, h2, paragraphs, external link, Testimonial)
HowTheyUseIt (Eyebrow, h2, paragraphs, FlowDiagram or image)
WhyMicrolink (Eyebrow, h2, lead paragraph, 3× WhyCard)
CtaSection (shared)
MoreCustomers (shared)
ThanksSection (logo + acknowledgement)
```

## CUSTOMERS registry

When adding a customer, append to `src/components/patterns/CustomerStory/customers.js`:

```js
{
  slug: '<slug>',
  name: '<name>',
  blurb: '<~10 words, period>',
  icon: '/images/clients/<icon>',
  category: '<product> API',
  quote: '<short quote for index page>',
  author: '<name>',
  role: '<role>',
  avatar: '/images/clients/<avatar>.jpeg',
  initials: '<XX>'
}
```

## Hard rules

- Never invent customer claims, metrics, or features. If the website doesn't say it, ask.
- Never use `pink`/`secondary`/`pinky`/`pinkest` accent — reserved for feature pages.
- External links to customer sites: use `<Text as='a' target='_blank' rel='noopener'>`, NOT the repo `Link` component (which adds `noreferrer`, killing SEO backlink value).
- Hero CTA label format: `See how to integrate <product>`. Must differ from bottom CTA label.
- `<h1>` must include `scrollMarginTop: 4`.
- Head title format: `<name>: <use case>` (no brand suffix — `Meta` appends ` — Microlink`).
- Head image must be absolute URL: `cdnUrl('banner/screenshot.jpeg')`.
- Never run prettier. Lint with `npx standard src/pages/customers/<slug>.js`.

## Workflow

Ask one question at a time:

1. **Customer name** — compute slug, verify no collision in `src/pages/customers/`.
2. **Website URL** — WebFetch homepage + key pages. Build factual notes.
3. **How they use Microlink** — which products, where in stack. Feeds How/Why sections + CTA routing.
4. **Testimonial** — real quote (author + role + avatar), placeholder, or none.
5. **Screenshots** — primary screenshot, diagram style (flow/image/placeholder), optional hero image.
6. **Customer logo** — SVG for ThanksSection, or text-only fallback.
7. **CTA routing** — infer from use case per `references/cta-routing.md`. Propose and confirm.
8. **Registry** — append entry to `customers.js`.
9. **Summary** — show all values, wait for explicit confirmation before writing.

## Verification

1. `npx standard src/pages/customers/<slug>.js` — fix until clean.
2. Grep for `{{` — no placeholders remaining.
3. Verify section order matches canonical list.
4. Verify Hero CTA ≠ Bottom CTA label.
5. Verify entry added to `customers.js`.

## Updating existing pages

Read the file, identify what needs changing, run only relevant steps, re-lint.
