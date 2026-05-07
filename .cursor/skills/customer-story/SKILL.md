---
name: customer-story
description: Create a new customer use-case landing page under `src/pages/customers/` from `example.js`, asking the user step-by-step for every placeholder (customer name, accent color, website to research, how they use Microlink, optional testimonial, diagram style, screenshots, CTA target, customer logo). Use when the user says "new customer story", "add a customer page", "customer landing", "[Customer] use case", "customer use case", or asks to scaffold a `customers/<slug>.js` page.
---

# Customer Story

Build a new customer use-case landing page at `src/pages/customers/<slug>.js`.

The goal is not generic "story" copy. The goal is a repo-native page that:

- mirrors the structure of `src/pages/customers/example.js` exactly
- swaps the default teal accent for a customer-specific accent only when the user asks
- researches the customer honestly from their website (no invented metrics, no invented features)
- automatically links the new page into the existing customer-stories carousel when 2+ siblings exist
- routes the CTA to the most relevant Microlink product page based on the use case
- closes with a customer logo + thank-you note acknowledging the customer

## Read First

Before planning or editing, read these in order:

1. `src/pages/customers/example.js` — the canonical structural reference. It is kept in sync with this skill.
2. `.cursor/skills/customer-story/references/template.md` — the literal template with `{{TOKEN}}` placeholders.
3. `.cursor/skills/customer-story/references/accent-colors.md` — allowed ramps, the `ACCENT` shape, and the `ACCENT_RGB` triplet table for the CTA background tint.
4. `.cursor/skills/customer-story/references/cta-routing.md` — use-case → product href mapping.
5. `src/pages/feature/proxy.js` — only when the user picks the **flow** diagram style; copy `Node` / `NodeActive` / `NodeLabel` / `NodeSub` / `Arrow` primitives from lines 484–693.
6. `AGENTS.md` — repo-wide style rules (`theme({...})`, design tokens, accessibility).

## Canonical section order

Every customer page renders exactly these sections in this order:

```
Hero
AboutCustomer
  ├─ Eyebrow + Subhead
  ├─ Body paragraph 1
  ├─ Primary screenshot (between paragraphs)
  ├─ Body paragraph 2
  ├─ External link to customer website (Visit <domain>)
  └─ Testimonial card (nested inside AboutCustomer)
HowTheyUseIt
  ├─ Eyebrow + Subhead
  ├─ Body paragraph 1
  ├─ Diagram (flow / image / placeholder)
  └─ Body paragraph 2
WhyMicrolink (3 numbered cards)
MoreCustomers (only when ≥2 sibling pages exist; otherwise omitted)
CtaSection (full-width soft accent panel)
ThanksSection (logo + acknowledgement; last block on the page)
```

`Testimonial` is nested at the END of `AboutCustomer`, NOT rendered as a top-level page section. `ThanksSection` is the LAST visual block on the page, AFTER the CTA.

## Hard Rules

These are non-negotiable.

- Never write the file before completing all steps below and getting explicit user confirmation in the final summary step.
- Never invent customer claims, metrics, headcount, funding, scale, or product features. If the customer's website doesn't say it, ask the user.
- Never ship placeholder-only copy in `Hero`, `AboutCustomer`, `HowTheyUseIt`, `WhyMicrolink`, `CtaSection`, or `ThanksSection`. By the end, every `{{TOKEN}}` in those sections MUST be replaced with concrete content (or the corresponding section MUST be removed if the rules below allow it).
- **Testimonial placeholder is allowed under strict conditions** (see "Testimonial rules" below). Other sections are NOT allowed to ship as placeholders.
- Never use a slug of `example`, an empty slug, or a slug that already exists in `src/pages/customers/`. If the user requests a slug that collides, stop and ask.
- Never use the `pink` / `secondary` / `pinky` / `pinkest` accent — those are reserved for `src/pages/feature/*.js`. Customer pages MUST use one of the ramps in `references/accent-colors.md`.
- Never inline accent token strings (`'teal7'` etc.) outside the `ACCENT` constant. All consumers read from `ACCENT.text` / `ACCENT.bgSoft` / `ACCENT.bgEdge` / `ACCENT.highlight`.
- Never leave dead code. If the user says "no testimonial", remove the entire `Testimonial` component, all its styled components, the comment block, AND the `<Testimonial />` render line. Same rule for `MoreCustomers` when fewer than 2 sibling pages exist.
- Never add or modify FAQ structured data. Customer pages do not have FAQ sections.
- Never run prettier, prettier-standard, or any repo-level formatter. This repo's formatter can rewrite unrelated files. Verification is `npx standard src/pages/customers/<slug>.js` (the project uses JavaScript Standard Style — see `package.json` `"lint": "standard"`). Bare `npx eslint` may pass even when `standard` reports errors, because they use different rule sets.
- Never edit `.cursor/skills/customer-story/references/*.md` as part of running the skill. Only the SKILL author maintains those.
- Hero CTA label and Bottom CTA label MUST be different strings. The Hero invites action specific to the product the customer integrated and ALWAYS follows the format `See how to integrate <product noun>` (e.g. "See how to integrate metadata", "See how to integrate screenshots", "See how to integrate PDFs"). The bottom CTA is broader and uses the action-oriented label from the cta-routing table (e.g. "Start extracting metadata", "Start capturing screenshots"). Identical labels are rejected.
- Animation rule: customer pages MUST NOT add motion/animation that ignores `prefers-reduced-motion`. The current template has no animation; if a future change adds one, it MUST honor reduced-motion or be reverted.
- The `<h1>` in `Hero` MUST set `scrollMarginTop` so deep-linking and skip-to-content land cleanly.
- Do NOT override the `<main>` landmark. `<Layout>` already wraps content in `<main id='main-content'>` and provides a Skip-to-content link.
- The `StoryTag` text is locked to `Customer story`. Do NOT change to "Case study" / "Success story" / etc. — visual consistency across customer pages.
- **External links to the customer's website MUST preserve backlink value.** Do NOT use the repo `<Link>` component for external links to the customer's site. The repo `Link` HOC unconditionally appends `rel='noopener noreferrer'` to all external links — and `noreferrer` is treated by Google as `nofollow` for SEO purposes, killing the link-equity benefit for the customer. Customer pages instead use a plain anchor: `<Text as='a' href='https://<domain>' target='_blank' rel='noopener'>`. This keeps the security benefit of `noopener` (prevents tab-nabbing) while preserving referrer + follow signals so the customer's site receives the SEO backlink. This rule applies to BOTH the About-section "Visit <domain>" link AND the ThanksSection logo/name link.

## Testimonial rules

Default: real quote from a real person at the customer.

A **placeholder testimonial** is allowed only under ALL of these conditions:

1. The user explicitly asks for a placeholder (e.g. "leave a placeholder", "I'll add the quote later").
2. The author name MUST NOT be a real, identifiable person from the customer's team. Use generic placeholders like `[Author Name]`, `[Role]`, `[Company]` — never invent words attributed to a real CTO/founder/employee.
3. The quote text is obviously placeholder copy in square brackets, e.g. `[Customer testimonial — pull-quote about why Microlink works for them.]`
4. A code comment is added directly above the `<Testimonial />` render line:

   ```jsx
   {/* TODO: replace placeholder testimonial before publishing */}
   <Testimonial />
   ```

If the user wants to attribute a real person (real name + role) but doesn't have a quote yet, the skill MUST refuse and offer two options instead: (a) wait for the real quote, or (b) draft a quote in the person's voice using only verifiable facts already on the page, marked `DRAFT — pending approval` in a code comment, to be sent to that person for sign-off before merging.

## Workflow

The skill is a strict, single-question-at-a-time conversation. Do NOT ask multi-part questions. Do NOT proceed to the next step until the current step's answer is captured.

```mermaid
flowchart TD
    Q1[1. Customer name + slug] --> Q2[2. Accent color]
    Q2 --> Q3[3. Customer website URL]
    Q3 --> R1["Research site via WebFetch"]
    R1 --> Q4[4. How they use Microlink]
    Q4 --> Q5["5. Testimonial?"]
    Q5 -->|real quote| Q5a[Quote + author + role + company]
    Q5 -->|placeholder| Q5b[Confirm placeholder rules]
    Q5 -->|no| Q6
    Q5a --> Q6
    Q5b --> Q6
    Q6[6a. Primary screenshot] --> Q6b[6b. Diagram style for HowTheyUseIt]
    Q6b -->|flow| Q6c[Ask for nodes + active node]
    Q6b -->|image| Q6d[Ask for image path]
    Q6b -->|placeholder| Q6e
    Q6c --> Q6e[6c. Optional second hero image]
    Q6d --> Q6e
    Q6e --> Q7[7. CTA target inference]
    Q7 --> Q7b[7b. Customer logo for ThanksSection]
    Q7b --> R2[Auto-detect sibling customer pages]
    R2 --> Q8[8. Final summary + confirm]
    Q8 -->|confirmed| W[Write file]
    W --> V[Run standard, verify, report]
```

### Step 1 — Customer name + slug

Ask: "What's the customer's name?"

After the user answers:

- Compute the default slug as `kebab-case(customer.toLowerCase())`. Strip non-alphanumeric characters except `-`. Collapse multiple dashes.
- Read `src/pages/customers/` to verify the slug is not already taken.
- If `<slug>.js` already exists OR `<slug>` is `example`, propose a different slug (e.g. `<slug>-2`) and ask the user to confirm or override.
- Echo back: "Slug will be `customers/<slug>`. Confirm or provide an alternative."

Wait for confirmation before moving on.

### Step 2 — Accent color

Ask: "What accent color? (default: teal — also available: blue, cyan, green, orange, yellow). Skip pink/red — those are reserved for feature pages."

If the user gives a brand name or hex, map it to the closest allowed ramp using `references/accent-colors.md`. If the user requests a custom hex, refuse politely (the design system requires token-backed values) and propose the closest allowed ramp.

Resolve to:

```js
const ACCENT = {
  text: '<ramp>7',
  bgSoft: '<ramp>0',
  bgEdge: '<ramp>1',
  highlight: '<ramp>5'
}
```

Also resolve the `ACCENT_RGB` triplet from the table in `references/accent-colors.md` (used in the CTA background tint).

### Step 3 — Customer website

Ask: "What's the customer's website URL?"

After the user answers:

- Use `WebFetch` to read the homepage.
- If accessible, also `WebFetch` `/about`, `/product`, `/customers`, `/pricing` (only the ones that exist; don't 404-spam).
- Build a small notes ledger of: what they do (one line), who their users are (one line), 2–3 verifiable facts.
- Save the **domain** (e.g. `mymahi.com`, `vercel.com`) — this is `{{CUSTOMER_DOMAIN}}` and drives both the About-section external link and the ThanksSection logo path.
- Do NOT use this ledger to invent claims. It's the source for `{{ABOUT_*}}` paragraphs.
- If the site is paywalled, JS-heavy, or returns no extractable content, stop and ask the user for a 2-paragraph "about" description directly.

### Step 4 — How they use Microlink

Ask: "Briefly describe how they use Microlink. (Which products: screenshot / metadata / pdf / markdown / logo / insights? Where in their stack? What does it replace?)"

The user's answer feeds:

- `{{HOW_SUBHEAD}}` — propose one short headline. Confirm with the user before locking it.
- `{{HOW_PARA_1}}` — paragraph before the diagram, describing the integration in flowing prose.
- `{{HOW_PARA_2}}` — paragraph after the diagram, describing operational impact.
- `{{WHY_SUBHEAD}}` — short headline framing the three reasons.
- `{{WHY_LEAD}}` — lead-in paragraph.
- The three numbered cards `{{WHY_CARD_1_*}}` / `{{WHY_CARD_2_*}}` / `{{WHY_CARD_3_*}}` — propose kicker (one or two words like `Reliability`, `Performance`, `Cost`, `Stack simplicity`), title (a short sentence), and body (2–3 sentences each). Show all three together and ask the user to confirm or edit.

The keywords are also used in step 7 for CTA inference, and in the ThanksSection acknowledgement copy. Save them.

### Step 5 — Testimonial

Ask: "Do you have a testimonial / quote from someone at the customer? (yes / placeholder / no)"

**If `no`:** mark `{{TESTIMONIAL_SECTION}}` and `{{TESTIMONIAL_RENDER}}` as empty strings. The whole testimonial block is removed.

**If `placeholder`:** apply the testimonial placeholder rules above. Render the section with bracketed placeholder text and a `{/* TODO: replace placeholder testimonial before publishing */}` comment above the render line. Do NOT use a real person's name.

**If `yes`:** ask in this single message:

```
Provide:
- Quote (1–3 sentences, the exact text)
- Author name
- Role / job title
- Company (defaults to <CUSTOMER_NAME>)
```

Use straight ASCII for everything except the leading `“` smart quote (the template renders it via `<QuoteMark>` so the quote text itself does NOT include curly quotes). Trim whitespace. If the quote ends with `."`, strip the trailing quote. The quote uses the page's default sans (Inter) with `fontStyle: 'italic'` — do NOT use a serif font. The `AuthorAvatar` displays the author's initials (first letter of first + last name) in `fontFamily: 'mono'`, `color: ACCENT.text`, centered via flex; keep `aria-hidden='true'` so screen readers don't double-read the name.

### Step 6 — Visual assets

This step has three sub-questions, asked one at a time.

#### 6a. Primary screenshot (About / How sections)

Ask: "Do you have a screenshot of the customer using Microlink (a UI screenshot showing the Microlink-rendered output)? (image path / no)"

- If image path: validate the file exists at `static/<path>` (or `public/<path>`). Read its actual pixel dimensions with `sips -g pixelWidth -g pixelHeight <file>` so the `width`/`height` attributes are accurate (CLS-safe per AGENTS.md). The image is rendered between paragraphs 1 and 2 of `AboutCustomer` (canonical slot). Default `loading='lazy'`, `decoding='async'`. The styled `FigureImage` already applies `borderRadius: 3` and `boxShadow: 1`.
- If `no`: render a `FigurePlaceholder` labelled `[Screenshot of <CustomerName> using Microlink]`.

#### 6b. How-they-use diagram

Ask: "How should we visualize the integration? (flow / image / placeholder)"

- **flow** — Ask, in one message: "Provide 3–4 nodes left-to-right (e.g. `Their backend → Microlink → Target site → Their UI`). Mark which one is the highlighted Microlink node (default: the one labeled `Microlink`)." Optionally ask: "Each node may have a one-line caption — provide them or skip."

  Build the diagram block per `references/template.md` Variant A. Add the `Node`, `NodeActive`, `NodeLabel`, `NodeSub`, `Arrow` styled components ABOVE the `HowTheyUseIt` definition, after `FigurePlaceholder`. These are ported from `src/pages/feature/proxy.js` lines 484–554, with `secondary` swapped for `ACCENT.text` and `pinkest` swapped for `ACCENT.bgSoft`. Do NOT port `ResponseCard`, `ResponseLine`, or `ShieldChip` — proxy-specific.

- **image** — Ask: "Image path?". Use Variant B with `alt={{HOW_IMAGE_ALT}}` proposed from the use-case headline. Read intrinsic dimensions with `sips`.

- **placeholder** — Use Variant C with text `[<CustomerName> integration diagram]`.

#### 6c. Optional second hero image

Ask: "Do you have a wider hero/website shot of the customer's product to show above the About section? (image path / no — optional)"

- If image path: render with `maxWidth: '800px'` (override the default 600px), `loading='eager'` (LCP-friendly because it's near the top), placed as the FIRST child of `AboutCustomer`'s `SectionInner` (before the Eyebrow). Read intrinsic dimensions with `sips`.
- If `no`: skip — `AboutCustomer` starts directly with the Eyebrow.

### Step 7 — CTA target inference

Read `references/cta-routing.md` and apply the keyword table to the use-case description from step 4. First match wins.

Propose to the user, in one message:

```
CTA targets:
- Hero (specific product): <HERO_CTA_HREF> with label "See how to integrate <product noun>"
- Bottom (broad invite):   <CTA_HREF>   with label "<CTA_LABEL>"

CTA headline: "Ready to ship with <accent>Microlink</accent>?"
(or, if a single product dominates: "Ready to ship <accent>screenshots</accent>?")

Confirm or override.
```

The Hero label MUST follow the `See how to integrate <product noun>` template — the `<product noun>` is the same noun used in the bottom CTA's action label (e.g. `metadata`, `screenshots`, `PDFs`, `markdown`, `brand logos`, `performance audits`). The user MAY override either href, the headline accent word, or the bottom label. Hero label and Bottom label MUST be different strings.

If the customer uses two or more Microlink products, route the Hero CTA to the primary one and use `/pricing` for the bottom CTA. Mention the secondary product in `{{CTA_BODY}}`.

### Step 7b — Customer logo for ThanksSection

Ask: "Do you have an SVG logo for the customer at `static/images/clients/<domain>.svg`? (yes / no)"

- If `yes`: use `/images/clients/<CUSTOMER_DOMAIN>.svg` as the `ThanksLogo` source. Read its intrinsic dimensions for `width`/`height` attributes. The logo is rendered FIRST inside the ThanksSection, above the acknowledgement paragraph.
- If `no`: ask whether to (a) ship a text-only ThanksSection — render the customer name as a styled `<Link>` in the same slot the logo would occupy (still FIRST, above the paragraph) — or (b) omit the ThanksSection entirely. Default: (a) — the thank-you note is the more important part, and the slot ordering stays consistent.

### Step 8 — Auto-detect sibling customer pages

This runs without a user question.

- Glob `src/pages/customers/*.js`.
- Filter out `example.js` and `<slug>.js` (the file being created).
- For each remaining file:
  - Read the file.
  - Extract the customer name with a regex against the H1 span: `<span css={theme\(\{ color: ACCENT\.text \}\)\}>([^<]+):</span>`. Strip the trailing colon.
  - Extract a one-line blurb. Prefer the `Head`'s `description` attribute, truncated to ~80 chars at a word boundary. Fallback: the first BodyText paragraph in `AboutCustomer`.
  - Use the filename (without `.js`) as the `slug`.
- Build the `MORE_CUSTOMERS` array entries:

  ```js
  { slug: 'vercel', name: 'Vercel', blurb: 'Open Graph images for every deployment.' }
  ```

- If 0 or 1 entries result, set both `{{MORE_CUSTOMERS_SECTION}}` and `{{MORE_CUSTOMERS_RENDER}}` to empty strings — the entire carousel section is removed.
- If 2+ entries, fill `{{MORE_CUSTOMERS_ENTRIES}}` and `{{MORE_CUSTOMERS_RENDER}}` becomes `<MoreCustomers />`. It renders BETWEEN `<WhyMicrolink />` and `<CtaSection />`.

### Step 9 — Final summary + confirmation

Show the user a summary and stop. Do NOT write the file yet.

```
Ready to write src/pages/customers/<slug>.js:
  Customer:    <CUSTOMER_NAME>
  Domain:      <CUSTOMER_DOMAIN>
  Slug:        /customers/<slug>
  Accent:      <ramp> (text=<ramp>7, bgSoft=<ramp>0, bgEdge=<ramp>1, highlight=<ramp>5; rgb=<R,G,B>)
  Testimonial: real / placeholder / no
  Primary screenshot: yes (<path>) / no
  Diagram:     flow / image / placeholder
  Second hero image: yes (<path>) / no
  Customer logo: yes (<path>) / no (text-only thanks) / omitted
  Hero CTA:    <HERO_CTA_LABEL> → <HERO_CTA_HREF>
  Bottom CTA:  <CTA_LABEL> → <CTA_HREF>
  Sibling stories linked in carousel: <count> (or "section omitted")

Confirm to write?
```

Only after explicit "yes" / "go" / "ship it" / equivalent: substitute every `{{TOKEN}}` in `references/template.md` and write the file.

## Writing Rules

When materializing the template:

- Preserve every `theme({...})` call exactly as in the template. Do not introduce raw CSS where the template uses tokens.
- Preserve the canonical section order documented above.

### Pruning rules (proactive — apply during materialization, before the file is written)

The template is the **maximal** form, declaring every styled component the canonical structure can use. A real customer page picks one variant per conditional block and consequently ends up with some declarations unused. The skill MUST prune these BEFORE writing the file — `standard` will reject any unused declaration with `no-unused-vars`. Do NOT use `// eslint-disable-next-line` to silence these in generated customer pages; the directive itself is allowed only in `example.js` (the live reference template, which intentionally keeps the full surface for documentation).

Apply this matrix when materializing:

| Declaration | Drop when… |
|---|---|
| `FigureImage` (styled `<img>`) | `{{ABOUT_HERO_IMAGE_BLOCK}}` is empty AND `{{ABOUT_SCREENSHOT_BLOCK}}` is Variant B (placeholder) AND `{{HOW_DIAGRAM_BLOCK}}` is NOT Variant B (image). I.e. no real image is rendered anywhere. |
| `FigurePlaceholder` (styled `<Box>`) | All three slots use real images, OR `{{HOW_DIAGRAM_BLOCK}}` is Variant A (flow). I.e. no `[bracketed placeholder]` figure is rendered anywhere. |
| `Figure` (styled `<figure>`) | NEVER drop — every non-trivial customer page uses `<Figure>` at least once (always wraps the screenshot or diagram). |
| `Node`, `NodeActive`, `NodeLabel`, `NodeSub`, `Arrow` (flow-diagram primitives) | `{{HOW_DIAGRAM_BLOCK}}` is NOT Variant A (flow). Drop ALL FIVE together — they form a single block. |
| `breakpoints` import | `{{HOW_DIAGRAM_BLOCK}}` is NOT Variant A (no `Arrow` to use it) AND `{{MORE_CUSTOMERS_SECTION}}` is empty (no `CarouselTrack` to use it). |
| `Link` import | All three of: `{{MORE_CUSTOMERS_SECTION}}` is empty, the About-section external link uses `<Text as='a'>` (always, per the external-link rule), and the ThanksSection logo/name link uses `<Text as='a'>` (always). In the canonical structure with the new external-link rule, `Link` is ONLY needed when `MoreCustomers` is rendered. **Drop the import if MoreCustomers is omitted.** |
| `cdnUrl` import | The user replaced the `Head`'s `image` prop with a non-CDN absolute URL (e.g. `https://microlink.io/images/clients/<slug>-web.png`) instead of the default `cdnUrl('banner/screenshot.jpeg')`. **Drop the import.** Conversely, if the default or any `cdnUrl(...)` form is kept, `cdnUrl` MUST stay. |
| `TestimonialCard`, `Quote`, `QuoteMark`, `Author`, `AuthorAvatar`, `AuthorName`, `AuthorRole`, `Testimonial` | The user said "no testimonial" in step 5. Drop ALL EIGHT together. |
| `CarouselTrack`, `CarouselCard`, `LogoPlaceholder`, `CarouselCardName`, `CarouselCardBlurb`, `CarouselCardLink`, `MORE_CUSTOMERS`, `MoreCustomers` | <2 sibling pages exist. Drop ALL EIGHT together. |
| `ThanksLogo` (styled `<img>`) | The customer logo SVG is unavailable AND ThanksSection falls back to text-only mode. Drop the styled component AND its declaration. |
| `ThanksSection` component + render line | The user explicitly opted to omit ThanksSection in step 7b. |

After pruning, run `npx standard` to catch any case the matrix missed. Common slip: dropping a styled component but leaving its supporting import (e.g. dropping `Arrow` but leaving `breakpoints`).
- The `<h1>` in `Hero` MUST include `scrollMarginTop: 4` (or equivalent `scroll-margin-top` token) so deep-links land cleanly.
- The CTA `<Section>` background uses the `ACCENT_RGB` triplet at 6% opacity, AND the section MUST include `mt: 5` to create breathing room from the preceding `WhyMicrolink` (or `MoreCustomers`) section. Without this top margin, the soft accent panel sits flush against the previous section and looks visually cramped.
  ```jsx
  <Section
    css={`
      background-color: rgba({{ACCENT_RGB}}, 0.06);
      ${theme({ borderTop: 1, borderTopColor: ACCENT.bgEdge, borderBottom: 1, borderBottomColor: ACCENT.bgEdge, mt: 5 })}
    `}
  >
  ```
  This is the ONLY raw `background-color` allowed on a customer page (no equivalent token exists for translucent accent tints).
- The CTA inner `<Flex>` wrapping the ArrowLink uses `pt: [3, 4, 4, 4]` (NOT `py`). The `Section` primitive's own `py: SECTION_PY` already provides bottom padding; using `py` here would double up the bottom and break top/bottom symmetry.
- The `Testimonial` component MUST NOT render its own `<Section>` or `<SectionInner>` wrappers. It is nested directly inside `AboutCustomer`'s `<SectionInner>` and inherits that section's padding + max-width. The component renders ONLY `<TestimonialCard as='figure' css={theme({ my: [4, 4, 5, 5] })}>` as its outer element. Adding `<Section>`/`<SectionInner>` wrappers would double horizontal padding (the parent `SectionInner` already constrains width) and double vertical padding (the parent `Section` already provides `py: SECTION_PY`), breaking the card's alignment with the rest of the About-section content. Use `my` (vertical margin top AND bottom) at the responsive scale `[4, 4, 5, 5]` — this gives the card breathing room both above (from the external website link) and below (from the next section, since `AboutCustomer` typically uses `pb: 0` to let the card carry the trailing space). Never use `mt` only — the card needs symmetric vertical spacing to read as its own block. This matches the established pattern in `mymahi.js`.
- The `Testimonial` component's `Quote` uses `fontStyle: 'italic'` but the page default sans (Inter) — do NOT add `fontFamily: 'serif'`. The `QuoteMark` similarly stays on the default sans. The `AuthorAvatar` renders the author's initials (e.g. `SC` for Stefan Charsley), styled `fontFamily: 'mono'`, `color: ACCENT.text`, centered via flex, with `aria-hidden='true'`.
- The About-section external link uses a plain anchor (`<Text as='a' target='_blank' rel='noopener'>`, NOT the repo `Link` component — see external-link rule above), label `Visit <CUSTOMER_DOMAIN>`, color `ACCENT.text`, `textDecoration: 'underline'`, and sits between body paragraph 2 and the Testimonial.
- The `ThanksSection` is the LAST top-level section in the page composition, after `<CtaSection />`. Inside it: centered logo FIRST (wrapped in `<Text as='a' href='https://<CUSTOMER_DOMAIN>' target='_blank' rel='noopener'>` per the external-link rule above; height capped at 32px), then the acknowledgement paragraph (with `<b>Thank you to the <CUSTOMER_NAME> team</b>` as bold opening clause, smaller `fontSize: [0, 1]`). The section uses `pt: 5` for generous breathing room below the CTA panel; the logo wrapper Box uses `pt: [3, 3, 4, 4]` and `pb: [2, 2, 3, 3]` to space it cleanly between the section top and the paragraph below.
- The `Head` `<title>` uses the format: `<CUSTOMER_NAME>: <one-line use case>`. Example: `MyMahi: rich link previews for Newsfeed posts`. This is more distinct in browser tabs and search results than `How <CUSTOMER_NAME> uses Microlink`. **Do NOT append ` · Microlink` or any brand-suffix variant to the title** — the `Meta` component automatically appends ` — Microlink` (em-dash + site name from metadata, see `src/components/elements/Meta/Meta.js` line 111: `${title} — ${name}`). Adding the brand manually duplicates it in the rendered `<title>`, Open Graph title, Twitter card, and JSON-LD. The end-user-visible result MUST be `<CUSTOMER_NAME>: <one-line use case> — Microlink` rendered by `Meta`, not authored.
- The `Head` `image` stays as `cdnUrl('banner/screenshot.jpeg')` unless the user supplies a customer-specific OG banner.
- The `Head` `image` value MUST be a fully-qualified absolute URL. The `Meta` component writes `image` directly into `og:image`, `twitter:image`, and `itemProp='image'` tags with no transformation (see `src/components/elements/Meta/Meta.js` lines 153/160/169/179). Open Graph and Twitter Card scrapers reject relative URLs and the social preview will fail. Acceptable forms: (a) `cdnUrl('path/to/asset.png')` for assets hosted on `https://cdn.microlink.io` (preferred — matches every other repo page), or (b) a literal `https://microlink.io/images/...` URL for assets in `static/images/` that haven't been uploaded to the CDN. NEVER use a bare `/images/...` relative path.

## Verification

After writing:

1. Run `npx standard src/pages/customers/<slug>.js`. (The project's lint script is `npm run lint` → `standard`. Bare `npx eslint` is NOT sufficient — `standard` enforces JavaScript Standard Style rules that bare eslint won't catch.)
2. If standard reports errors, fix them in-place. Common errors:
   - Unused imports / unused styled components — see the **Pruning rules** matrix in Writing Rules. Most `no-unused-vars` errors mean the matrix wasn't applied during materialization. Fix by removing the declaration, NOT by adding `// eslint-disable-next-line` (that escape hatch is only allowed in `example.js`, which intentionally keeps the full template surface).
   - Missing `key` props in any list rendering
   - Unused parameters in callback signatures
3. Re-run `standard` until clean.
4. Verify NO `{{TOKEN}}` placeholders remain in the output (grep for `{{`).
5. Verify the page composition includes (in order, modulo conditional sections): `<Hero />`, `<AboutCustomer />`, `<HowTheyUseIt />`, `<WhyMicrolink />`, optional `<MoreCustomers />`, `<CtaSection />`, `<ThanksSection />`.
6. Verify Hero CTA label ≠ Bottom CTA label.
7. Do NOT run prettier or any other formatter.

## Output Back to the User

After writing successfully, report:

- Filename: `src/pages/customers/<slug>.js`
- Route: `/customers/<slug>`
- Sections rendered (Hero, About w/ Testimonial?, How, Why, MoreCustomers?, CTA, Thanks)
- Accent color used (incl. RGB triplet)
- CTA targets (Hero + Bottom, confirmed different)
- Sibling stories linked (count + slugs)
- Anything still flagged as `[brackets]` in the file (should be zero outside an approved Testimonial placeholder)
- Suggested next steps (e.g. "add a real banner image to `Head`'s `image` prop", "supply a screenshot for the About section", "schedule a follow-up to refresh sibling carousel when a new story is added")

## Improving an Existing Customer Story

If the user asks to update an existing `src/pages/customers/<slug>.js`:

1. Read the existing file.
2. Identify which sections are present and which are placeholders.
3. Run only the steps that target the user's request (e.g. "swap the accent" → step 2 only; "add a testimonial" → step 5 only).
4. For step 8, re-run the sibling auto-detection — sibling pages may have been added since the original write.
5. Apply changes via `StrReplace`. Never rewrite the whole file unless the user explicitly asks for a full regeneration.
6. Run `npx standard src/pages/customers/<slug>.js` after edits — same verification as a fresh write (see the Verification section above).

## Final Guardrails

- Do not pretend to know what a customer does. If the website doesn't say it, ask.
- Do not ship "[Customer] does X at scale" without a verifiable source.
- Do not use the `pink/secondary` accent on a customer page, ever.
- Do not split a single customer story into multiple pages.
- Do not add a `customers/index.js` listing page as part of this skill — that is a separate task.
- Do not edit the toolbar or footer to add a `/customers` link as part of this skill.
- Do not run any formatter. Verification is `npx standard` on the single new file (see the Verification section).
- Do not attribute invented words to a real, named person from the customer's team. The placeholder testimonial rules forbid this; refuse and offer a draft-for-approval flow instead.
