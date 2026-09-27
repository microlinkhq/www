---
name: use-case-landing
description: Create or improve use-case landing pages under src/pages/use-cases/ from the UseCaseStory module.
---

# Use Case Landing Pages

Build an individual use-case page at `src/pages/use-cases/<slug>.js` and register it so it
shows up on the `/use-cases` listing.

A use case is **not** a testimonial and **not** a competitor comparison. It is a practical,
copy-pasteable recipe for getting more out of Microlink — usually **paired with another API**
(Magnific, an LLM, a storage provider, etc.). The first one shipped is
`src/pages/use-cases/upscale-extracted-images.js` (Microlink + Magnific). Mirror it.

The goal is a repo-native page that:

- reuses the `UseCaseStory` module so it stays visually identical to the listing and to other
  use-case pages
- is named after the **topic**, never the partner brand
- shows **real, verified** partner API code (no invented field names)
- uses the **real** partner logo, not a placeholder
- stays honest about *when the use case makes sense and when it doesn't*

## Two kinds of use case

- **Partner recipe** (this document): a hand-composed page such as
  `upscale-extracted-images.js`, pairing Microlink with another API.
- **Intent landing**: a data-driven page under a vertical hub
  (`/use-cases/website-screenshot/<intent>`) that solves one search intent with one
  Microlink product. Author those from `references/intent-landing.md`; they share the
  registry, the hub grid and the `MoreUseCases` carousel with partner recipes.

## Architecture — read this first

Customer stories and use cases now share the `/use-cases` route and folder. A use case is still a
recipe (no testimonial); a customer story is a testimonial-led page built with the separate
`customer-story` skill. They render together on the one listing — a "Customer stories" grid
followed by a "Use cases" grid. The old `/customers` URLs 301-redirect to `/use-cases`.

- **Shared module:** `src/components/patterns/UseCaseStory/` is a barrel that re-exports the
  accent-agnostic primitives from `CustomerStory` (`Section`, `SectionInner`, `Caption`,
  `Figure`, `FigureImage`, `DashedGridOverlay`, `Eyebrow`, `StoryTag`, `CtaSection`, `WhyCard`)
  plus the use-case-only pieces (`ACCENT`, `USE_CASES`, `MoreUseCases`). **Import everything
  from `components/patterns/UseCaseStory`. Never redefine these locally. Never edit the
  `CustomerStory` files.**
- **The listing is data-driven.** `src/pages/use-cases/index.js` renders the customer hero +
  logo bar + "Customer stories" grid (from `CUSTOMERS`), then maps over the `USE_CASES` registry
  for the "Use cases" grid. Adding a use case = appending one registry entry + creating one page
  file. **You do not edit `index.js` per use case.**
- **`MoreUseCases`** self-omits when there are fewer than 2 entries, so it renders nothing
  until a second use case exists. That is expected.

## Read First

Before planning or editing, read in order:

1. `src/components/patterns/UseCaseStory/index.js` — barrel exports (what you may import).
2. `src/pages/use-cases/upscale-extracted-images.js` — the canonical reference page. Mirror it.
3. `src/pages/use-cases/index.js` — the unified listing (customer-stories grid + use-cases grid) to see which `USE_CASES` fields the use-case grid consumes.
4. `.cursor/skills/use-case-landing/references/page-template.md` — the page template with `{{TOKEN}}` placeholders.
5. `.cursor/skills/use-case-landing/references/module-and-registry.md` — the `UseCaseStory` module map + the `USE_CASES` registry shape.
6. `.cursor/skills/use-case-landing/references/partner-api-verification.md` — how to verify a partner API before writing any code block.
7. `.cursor/skills/use-case-landing/references/intent-landing.md` — the data-driven intent landings (registry per vertical, content schema, tests).
7. `AGENTS.md` — repo conventions (`theme({...})`, import style).

## Naming — topic, not brand

The slug and page must describe **what the developer accomplishes**, never the partner's brand.

- Good: `upscale-extracted-images`, `summarize-any-url`, `archive-pages-to-storage`.
- Bad: `magnific`, `openai`, `s3`.

The partner brand still appears in the **content** (the combo name `Microlink + <Partner>`, the
logo, the inline link) and in the **asset filename** (`/images/use-cases/<partner>.svg`) — just
not in the slug, the route, the component name, or the `Head` title.

Compute the slug from the topic, then verify no collision in `src/pages/use-cases/`.

## Core Rules

Non-negotiable:

- **Accent is always blue.** Import `ACCENT` from the module; never define it locally, never pass
  a different accent. `CtaSection` hardcodes `colors.link` for its background, so a different
  accent would look broken.
- **No testimonial, no quote, no person.** Use cases are recipes, not endorsements. There is no
  `Testimonial` on these pages.
- **Code blocks, not a flow diagram.** Replace the customer-story `FlowDiagram` with
  `CodeEditor` blocks (see template). Snippets must reflect the **real** partner API.
- **Verify the partner API before writing code.** Never invent endpoints, auth headers, request
  fields, response shapes, or status values. Follow `references/partner-api-verification.md`.
- **Use the real partner logo.** Never ship a hand-drawn placeholder. See "Partner logo" below.
- **Set real image dimensions** (`width`/`height`) on `FigureImage` to avoid layout shift.
- **Inline partner link goes in the top "What it does" paragraph** (anchor text = the partner
  name), using the `InlineLink` styled anchor with `target='_blank' rel='noopener'` — not the
  repo `Link` component.
- **"Learn more" lists Microlink links first, partner links after.** Internal Microlink links
  (e.g. `/metadata`, `/docs`) stay in-tab; external partner links open in a new tab. The
  `ResourceLink` helper handles this via `href.startsWith('http')`.
- **Never run Prettier or any formatter.** Lint only with `npx standard src/pages/use-cases/<slug>.js`.
- **Never add a `TODO` to production copy.** If a fact is important but unverified, stop and ask.

## Partner logo

Get the genuine brand mark, then clean it:

1. Fetch the partner homepage and read the `<link rel="icon" ... type="image/svg+xml">` href
   (brands usually host an SVG favicon on their CDN, e.g. `media.<partner>.com/.../favicon.svg`).
2. Download that SVG.
3. Strip any generator `<metadata>` block; keep only the real `<rect>`/`<path>` shapes. Add
   `role="img" aria-label="<Partner>"`.
4. Save to `static/images/use-cases/<partner>.svg` and reference it as
   `/images/use-cases/<partner>.svg`.

If no SVG mark exists, ask the user for the asset instead of inventing one.

## Section order (individual page)

```text
Hero        (partner logo + "Microlink + <Partner>", h1 = topic, intro paragraph, ArrowLink CTA to a Microlink product)
WhatItDoes  (FigureImage screenshot, Eyebrow "What it does", h2, paragraphs WITH the inline partner link)
WhyItWorks  (Eyebrow "Why it works", h2, lead paragraph, then 3× WhyCard each followed by a prose UseCaseItem — box/text/box/text/box/text)
HowItWorks  (Eyebrow "How it works", h2, intro, Figure with 1–2 CodeBlock components)
LearnMore   (Eyebrow "Learn more", h2 "Docs and resources", ResourceLink list: Microlink links first, partner links after)
CtaSection  (shared; headlinePrefix, headlineAccent, body, href to a Microlink product, label)
MoreUseCases (shared; accent + currentSlug === this page's slug)
```

There is **no** `ThanksSection` (that is customer-story only). The individual page hero is
left-aligned (logo + name). The **listing** hero is centered text — do not confuse the two.

## CTA routing

The hero CTA, the bottom `CtaSection`, and the first "Learn more" link should point at the
Microlink product the use case actually uses:

- extracts the page's image / metadata → `/metadata`
- screenshots / renders the page → `/screenshot`
- PDF of the page → `/pdf`
- link preview / oEmbed card → `/embed`

The Magnific reference page uses `/metadata` because it extracts the main image. Pick the
product that matches the recipe and confirm with the user.

## USE_CASES registry

Append one entry to `src/components/patterns/UseCaseStory/use-cases.js`:

```js
{
  slug: '<topic-slug>',                 // NOT the brand. Matches the page filename.
  name: 'Microlink + <Partner>',        // combo name shown in cards + page hero
  partner: '<Partner>',                 // partner tool name, shown in the (hidden) logo bar
  partnerUrl: 'https://<partner>.com',  // optional, handy reference
  blurb: '<one sentence, what the dev gets>',
  icon: '/images/use-cases/<partner>.svg',
  category: '<Microlink product> + <partner capability>'  // e.g. 'Metadata + AI Upscaling'
}
```

Fields consumed today: the use-cases grid uses `slug, name, blurb, icon, category`;
`MoreUseCases` uses `slug, name, blurb, icon`. `partner`/`partnerUrl` are reference-only now —
the partner brand still appears in the page content (combo name, logo, inline link), but the
"Pairs well with…" logo bar that rendered `partner` was removed during unification.

## Listing layout

The unified listing leads with the customer-story hero and the "Trusted by innovative companies"
logo bar (both driven by `CUSTOMERS`), then the "Customer stories" grid, then the "Use cases"
grid (driven by `USE_CASES`). The old use-case-only "Pairs well with the tools you already use"
logo bar and its `SHOW_LOGO_BAR` flag were removed during unification — there is no logo bar to
toggle anymore. Appending a `USE_CASES` entry surfaces it in the use-cases grid automatically.

## Footer & nav

`/use-cases` is already linked from the footer's **Resources** column and the top-nav
**Resources** menu (one-time, global). The old "Customers" footer link was removed in the
unification. Individual use-case pages do **not** get their own footer or nav entries.

## Workflow

Ask one question at a time, like the customer-story skill:

1. **Topic + partner** — derive a topic-based slug; verify no collision in `src/pages/use-cases/`.
2. **Partner URL + Microlink product used** — drives CTA routing and the Microlink "Learn more"
   links. WebFetch the partner homepage for positioning and the logo.
3. **Partner API verification** — if the page shows code, follow
   `references/partner-api-verification.md`. Confirm endpoint, auth header, request fields,
   response shape, status values, and the output field. Adjust the snippets to the real schema.
4. **Assets** — download + clean the real partner logo; get the screenshot
   (`/images/use-cases/<name>.png`) and record its pixel dimensions for `FigureImage`.
5. **Content** — hero copy, "What it does" (with the inline partner link + an honest *when it
   makes sense / when it doesn't* angle woven through "Why it works"), the 1–2 code blocks, and
   the "Learn more" links.
6. **Registry** — append the entry to `use-cases.js`.
7. **Summary** — show every value and wait for explicit confirmation before writing.
8. **Write** — generate the page from `references/page-template.md`, replacing all `{{TOKENS}}`.

## Verification

1. `npx standard src/pages/use-cases/<slug>.js src/components/patterns/UseCaseStory/use-cases.js` — fix until clean.
2. Grep for `{{` — no placeholders left.
3. `node --check` the code snippets (write them to a temp `.mjs`) — confirm valid JS.
4. Confirm the section order matches the canonical list.
5. Confirm `MoreUseCases currentSlug` equals the page slug, and the registry slug matches the filename.
6. Confirm the partner logo file exists at `static/images/use-cases/<partner>.svg` and the
   screenshot exists with matching `width`/`height`.
7. Confirm the slug/route/component name/`Head` title contain **no** partner brand.

## Lint style notes

- `standard` enforces `jsx-quotes` as prefer-single: use single quotes for JSX string
  attributes **unless** the string contains an apostrophe (then use double quotes).
- The `CodeEditor` runs snippets through the repo's runtime `prettier` (no semicolons, single
  quotes) and through `template()` (a no-op unless the code literally contains `demolinks.`), so
  write valid JS and it renders fine. Never run a formatter on the source file yourself.
- Never use `<code css={theme({...})}>` — the repo's `css` transform throws on `<code>`. Use
  `<b>` or a styled component.

## Updating an existing use-case page

Read the file, re-verify the partner API and pricing/positioning, fix inaccuracies first, then
improve copy. Re-lint. Do not restructure without a reason.
