---
name: alternative-landing
description: Create or improve competitor alternative pages under src/pages/alternative/.
---

# Alternative Landing Pages

Build or refresh landing pages at `src/pages/alternative/[slug].js`.

The goal is not generic comparison copy. The goal is a repo-native page that:

- matches the existing alternative landing architecture for its **category**
- uses benchmark data only from `src/pages/benchmarks/screenshot-api.js` (screenshot pages only)
- researches the competitor honestly from real sources
- avoids SEO cannibalization with existing alternative pages
- improves the page when a competitor-specific angle is stronger than a boilerplate comparison

## Category Selection — Ask First

Before any research or editing, **ask the user which Microlink product the competitor competes with**:

- **Screenshot API** — competitor offers headless-browser screenshots / PDFs as their primary product. Examples already in the repo: ScreenshotOne, ApiFlash, Urlbox, Url2Png, Thum.io, ScreenshotAPI, ScreenshotLayer, ScreenshotMachine.
- **Embed API** — competitor offers URL → card / oEmbed / link preview as their primary product. Example already in the repo: Iframely.

If you can identify the category confidently from the competitor's homepage, confirm with the user before proceeding instead of asking blindly. Phrasing example: "I see [Competitor] leads with [rich-media embeds / headless screenshots]. I'll use the [embed / screenshot] template — confirm?"

If a competitor straddles both, pick the **dominant** product. Lead with embeds → embed template. Lead with screenshots → screenshot template. Never mix templates.

The category choice changes:

- which reference doc you follow (`template-structure.md` vs `embed-template.md`)
- which existing page you use as a primary example (`screenshotone.js` vs `iframely.js`)
- whether you include `SpeedSection` (screenshot only — no embed benchmark exists)
- which hero visual you use (`RaceContainer` vs `<InteractiveExample flat hideFooter />`)
- which TryIt visual you use (`MultiCodeEditorInteractive` vs `<PreviewVariantsShowcase />`)
- which CTA URLs you target (`/screenshot` vs `/embed`)

## Read First

Before planning or editing, read these in order:

1. If present, `.claude/product-marketing-context.md`
2. `.cursor/skills/alternative-landing/references/microlink-features.md`
3. `AGENTS.md`

Then, **depending on the category**:

### Screenshot category

4. `src/pages/alternative/screenshotone.js` — primary structural reference
5. `src/pages/alternative/screenshotapi.js` — secondary reference for a different angle
6. All other `src/pages/alternative/*.js` files — required for anti-cannibalization
7. `src/pages/benchmarks/screenshot-api.js` — only source of truth for benchmark numbers
8. `.cursor/skills/alternative-landing/references/template-structure.md`

### Embed category

4. `src/pages/alternative/iframely.js` — canonical structural reference (the only embed alternative page so far)
5. `src/pages/embed.js` — source of the `InteractiveExample` and `PreviewVariantsShowcase` exports you'll import
6. All other `src/pages/alternative/*.js` files — required for anti-cannibalization (even though they're screenshot pages, FAQ wording and SEO titles can still clash)
7. `src/pages/feature/proxy.js` — source of truth for proxy / antibot / CAPTCHA claims
8. `.cursor/skills/alternative-landing/references/embed-template.md`

## Core Rules

These are non-negotiable:

- Never guess the competitor URL. Ask if it is missing.
- Never invent competitor features, pricing, SLA, rate limits, integrations, or infrastructure claims.
- Never invent benchmark numbers or extrapolate them to unbenchmarked competitors.
- Never round speed claims up. Use conservative wording and round down.
- Never claim a competitor feature unless it is verified on the competitor website or docs.
- Never claim a Microlink feature unless it exists in `references/microlink-features.md`.
- Never ship a placeholder comparison page full of assumptions.
- Never repeat the same hero angle, title angle, or FAQ phrasing used by another alternative page if it risks cannibalization.
- Never run Prettier or any formatter as part of this skill. This includes `prettier`, `prettier-standard`, repo-wide format commands, or any command that may rewrite unrelated files.

## Source Hierarchy

Use sources in this order:

1. Competitor website and official docs
2. `src/pages/benchmarks/screenshot-api.js`
3. `.cursor/skills/alternative-landing/references/microlink-features.md`
4. Third-party sources and review sites

Use third-party sources only for:

- understanding market positioning
- identifying likely objections or limitations to verify
- finding missing official pages

Do not use third-party sources as proof for hard claims if the competitor site does not confirm them.

## Workflow

### 1. Gather Inputs

Before editing:

1. **Confirm the category — screenshot vs embed** (see "Category Selection — Ask First" above). Every subsequent step depends on this choice.
2. Confirm the competitor name.
3. Confirm the competitor URL.
4. Confirm the target slug if the user gave one.

**Screenshot-only step**: map the competitor to a benchmark key in `BENCHMARK_DATA.results`.

If the competitor is **screenshot-category** but not benchmarked in `src/pages/benchmarks/screenshot-api.js`, stop and ask how to proceed. Do not fabricate a speed section.

Recommended options:

- wait until benchmark data exists
- create only an improvement report
- create a non-speed draft only if the user explicitly accepts a deviation from the existing structure

If the competitor is **embed-category**, skip the benchmark mapping — there is no embed benchmark. Follow `embed-template.md` which deliberately omits `SpeedSection`.

### 2. Research the Competitor

This phase is mandatory.

Use `WebFetch` to fetch and inspect, at minimum:

- homepage
- features or product page
- pricing page
- API docs or docs home
- any page covering integrations, storage, or automation if relevant

Use `WebSearch` to discover missing official pages and to understand positioning:

- `"[Competitor] pricing [year]"`
- `"[Competitor] [category] api features"` — swap `[category]` for `screenshot` or `embed`
- `"[Competitor] docs"`
- `"[Competitor] alternatives"`
- `"[Competitor] review limitations"`

For **embed-category** competitors, also confirm:

- their pricing unit (per-request, per-hit, per-domain, etc.) and any documented rate limits
- whether they ship a proxy / antibot / CAPTCHA layer (most embed APIs do not — that is the Microlink Pro differentiator)
- their publisher catalog size if they publish one
- their CMS / framework integrations (WordPress plugin, AMP, React component, etc.)

From research, build a working ledger of:

- verified features
- verified missing features
- pricing tiers, quotas, rate limits, and overages
- integrations and workflow tooling
- notable strengths where the competitor is genuinely better
- limitations or tradeoffs worth mentioning
- open questions that remain unverified

If the site is too JS-heavy to verify a claim via fetchable content, treat that claim as unverified and ask the user before using it.

### 3. Anti-Cannibalization Pass

Every alternative page needs a distinct search and messaging angle.

Read every existing file in `src/pages/alternative/*.js` and compare:

- `<Meta title>`
- `<Meta description>`
- hero heading
- speed-section subhead
- CTA heading
- FAQ questions

Current angle map:

Screenshot category:

- `screenshotone.js`: speed-first angle ("The fastest ScreenshotOne alternative")
- `screenshotapi.js`: breadth / "does more" angle ("broader browser workflows")
- `urlbox.js`: cost per render angle ("better cost per render")
- `screenshotmachine.js`: upgrade path angle ("richer browser workflows")
- `apiflash.js`: production workloads angle ("for production workloads")
- `url2png.js`: modernization angle ("a more modern screenshot API")
- `screenshotlayer.js`: throughput / overage angle
- `thumio.js`: final-screenshot vs streamed-thumbnail angle

Embed category:

- `iframely.js`: developer-first angle ("The developer-first Iframely alternative") — emphasizes per-request pricing vs hit-based pricing, no rate-limit ceiling, and the Pro proxy bundle

Pick a primary angle and a secondary angle for the new page. Examples:

- fastest
- more complete platform
- cheaper at scale
- open-source / auditable
- better for AI agents
- better for metadata + screenshot in one API
- better migration path

Avoid collisions such as:

- two pages both leading with "fastest [Competitor] alternative"
- reusing near-identical FAQ wording
- repeating the same title pattern across pages

If the best angle clearly collides with an existing page, change the angle or ask the user which angle to prioritize.

### 4. Build the Page Data

### `BENCHMARK_DATA` *(screenshot category only)*

Skip this whole subsection on embed pages. Embed alternatives have no benchmark and no `SpeedSection`.

For screenshot pages, copy only:

- `microlink`
- the target competitor

Keep the same `testUrls` array from `src/pages/benchmarks/screenshot-api.js`.
Inline the values exactly. Do not reference helper constants from the benchmark page.

### `SERVICE_COLORS` *(screenshot category only)*

Embed pages do not render a benchmark race and do not need a `SERVICE_COLORS` map. Skip.

For screenshot pages, use:

- `microlink: colors.red6`
- competitor: a color not already used by another alternative page

Currently used:

- `screenshotone`: `colors.pink6`
- `screenshotapi`: `colors.grape7`
- `urlbox`: `colors.teal6`
- `screenshotmachine`: `colors.blue6`
- `apiflash`: `colors.orange6`

### Speed claim math *(screenshot category only)*

Embed pages do not have speed claims. Skip this subsection.

For screenshot pages, compute conservatively:

- average speed advantage: `((competitorAvg - microlinkAvg) / microlinkAvg) * 100`
- per-URL multiplier: `competitorUrl / microlinkUrl`

For marketing copy:

- floor percentages instead of rounding up
- floor multipliers instead of rounding up
- prefer `"up to 2× faster"` over `"up to 2.4× faster"` unless the decimal precision is important and still conservative

If the benchmark result is directionally mixed or too small to support a strong claim, soften the copy.

### `COMPARISON_DATA`

Build the comparison table from:

- Microlink capabilities in `references/microlink-features.md`
- verified competitor capabilities from official sources

Allowed values:

- `true`
- `false`
- `'partial'`
- `'on demand'`
- short literal strings only when a boolean would be misleading

Ordering:

1. shared capabilities
2. Microlink-only capabilities
3. competitor-only capabilities

Highlighting:

- set `highlight: true` only when Microlink clearly has the advantage
- do not highlight every differentiator just because it exists

Notes:

- add a short `note` only when nuance materially helps interpretation
- do not use the table to smuggle in unverified claims

**Embed pages**: always include three Pro-bundle rows with `highlight: true` — `Rotating residential proxy (Pro)`, `Antibot detection & bypass (Pro)`, `CAPTCHA handling (Pro)`. The provider lists go in the `note` field. See `references/embed-template.md` → "Comparison table — Pro proxy rows" for the canonical wording and provider names. Flip the competitor column to `true` only if their docs explicitly document the same capabilities — verify on their site before doing so.

### Pricing comparison

Use the competitor pricing page as the source of truth.

For Microlink, choose the most relevant tier from `references/microlink-features.md`.

Prefer apples-to-apples based on:

- comparable request volume
- comparable buyer intent
- comparable recommended plan

Include pricing source URLs in code comments near the pricing copy or pricing constants.

If there is no honest apples-to-apples tier, say so in the copy or ask the user before forcing a comparison.

### 5. Write the Page

Follow the right reference for the category:

- **Screenshot category** → `references/template-structure.md`. Primary live example: `src/pages/alternative/screenshotone.js`. Secondary: `src/pages/alternative/screenshotapi.js`.
- **Embed category** → `references/embed-template.md`. Canonical live example: `src/pages/alternative/iframely.js`.

Default rule:

- keep the same overall architecture and section order as the existing alternative pages **in the same category**

#### Screenshot section order

1. `Hero` (with `<RaceContainer>` from the benchmark)
2. `SpeedSection`
3. `WhySwitchSection`
4. `PricingSection`
5. `CTASection`
6. `ComparisonSection`
7. `HonestySection`
8. `TryItSection` (with `MultiCodeEditorInteractive`)
9. `FAQSection`

#### Embed section order

1. `Hero` (with `<InteractiveExample flat hideFooter />` imported from `pages/embed`)
2. `WhySwitchSection`
3. `PricingSection`
4. `CTASection`
5. `ComparisonSection`
6. `HonestySection`
7. `TryItSection` (with `<PreviewVariantsShowcase />` imported from `pages/embed` — link first, preview after)
8. `FAQSection`

No `SpeedSection`. No `RaceContainer`. No `MultiCodeEditorInteractive`.

Do not run automatic formatting after editing. If verification is needed, prefer targeted linting or manual fixes inside the landing file only.

### Page-writing rules

- Match the repo's import style and styled primitive layout.
- Use `theme({...})` for styled-system-supported properties per `AGENTS.md`.
- Keep prose unique to the competitor and the chosen angle.
- Keep the page honest even when Microlink wins.
- The `HonestySection` must contain real competitor strengths (3–6 items; Iframely currently ships 3).
- The FAQ must contain 7–9 questions and avoid near-duplicates from existing alternative pages.
- The FAQ schema must mirror the visible FAQ content as plain text.
- The `Head` export must use a unique title, unique description, correct canonical URL, and FAQ schema.
- Use the `FAQ_ITEMS` array pattern (with `{ question, answer, text }`) for every new page — this is now the standard, shared by `urlbox.js`, `screenshotmachine.js`, `apiflash.js`, and `iframely.js`. The `text` field holds the plain-text version for schema; `answer` holds the JSX for rendering.
- Never use `<code css={theme({...})}>` — this repo's `css` prop transform fails on `<code>` and throws "Element type is invalid". Use `<b>` or a styled component instead.
- For embed pages, the WhySwitch list must include one item dedicated to the Pro proxy / antibot / CAPTCHA bundle with a `<Link href='/feature/proxy'>` reference. See `embed-template.md` for canonical wording.
- For embed pages, the Microlink pricing card bullets must include the proxy/antibot/CAPTCHA line.
- For embed pages, the FAQ list must include one proxy-focused question linking to `/feature/proxy` and mentioning `is-antibot` (the open-source detection library).
- Add the new page to `src/components/patterns/Footer/Footer.js` Comparisons list in alphabetical order (`{ label: 'vs [Competitor]', href: '/alternative/[slug]' }`).

### Custom sections or custom angles

The skill should think about whether a competitor-specific section would improve the page.

Examples:

- migration complexity
- SDK or API ergonomics
- storage and webhook workflow
- AI-agent fit
- no-code automation
- anti-bot / proxy depth

Only add a custom section if all are true:

- it is strongly supported by research
- it makes the page materially more useful
- it does not create cannibalization with other alternative pages
- it does not break the core structure without good reason

If unsure, propose the new section to the user instead of silently changing the architecture.

### 6. Improve Existing Landings

When updating an existing page:

1. Read the current file. Identify its category from the section list (screenshot pages render `SpeedSection`; embed pages do not).
2. Re-research the competitor's homepage, docs, features, pricing, and relevant workflow pages.
3. Re-read the category source-of-truth:
   - Screenshot pages → `src/pages/benchmarks/screenshot-api.js`.
   - Embed pages → `src/pages/feature/proxy.js` (for current Pro proxy claims) and `src/pages/embed.js` (for the imported components).
4. Check for stale benchmark numbers (screenshot only), stale pricing, stale feature claims, stale FAQ answers, and stale honest-strength cards.
5. Re-run the anti-cannibalization pass against all other alternative pages.
6. Compare the file against the category's primary reference:
   - Screenshot pages → `screenshotone.js` for structural drift.
   - Embed pages → `iframely.js` for structural drift.
7. Fix inaccuracies first, then improve positioning, then improve SEO uniqueness.

### 7. Output Back to the User

After drafting or improving a page, always report:

- chosen primary angle
- sources used
- anything still unverified
- SEO or cannibalization risks
- suggested next improvements

Suggestions should focus on:

- missing differentiators worth adding
- sections worth adding or removing
- weak copy or repeated messaging
- SEO opportunities
- research gaps that need the user's help

## SEO Pass

If the user asks for an SEO pass, or if title/meta/FAQ/cannibalization choices are unclear, read and follow:

- `~/.claude/skills/seo-audit/SKILL.md`

Use it mainly to validate:

- keyword targeting
- title and meta uniqueness
- internal cannibalization risk
- heading structure
- schema completeness

## Final Guardrails

- Do not pretend to know a competitor feature because it is common in the category.
- Do not write "fastest" or "best" unless the benchmark or source actually supports it.
- Do not add `TODO` claims into production copy. If a claim is important but unverified, stop and ask.
- Do not copy FAQ wording from one alternative page to another.
- Do not let benchmark copy dominate the page if the real differentiation is elsewhere.
- Do not let a stronger competitor-specific angle go unused just because the first template you read was speed-first.
- Do not mix templates. Embed competitors get the embed template; screenshot competitors get the screenshot template. Picking the wrong one and patching it produces a Frankenstein page.
- Do not fabricate a `SpeedSection` for embed competitors. There is no embed benchmark in this repo.
- Do not duplicate `HERO_DEMOS`, `PREVIEW_VARIANTS`, or `InteractiveExample` internals on embed pages — import from `pages/embed`.
- Do not run `prettier`, `prettier-standard`, or any repo-level formatter while using this skill, even on a single file, because this repository's formatter can touch unrelated files.
