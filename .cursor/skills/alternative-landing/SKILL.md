---
name: alternative-landing
description: Create or improve competitor alternative landing pages under `src/pages/alternative/` using the same repo-specific structure as `screenshotone.js` and `screenshotapi.js`. Use when the user mentions "alternative landing", "competitor page", "[Competitor] alternative", improving an existing alternative page, benchmark-based comparison copy, or anti-cannibalization for alternative pages.
---

# Alternative Landing Pages

Build or refresh landing pages at `src/pages/alternative/[slug].js`.

The goal is not generic comparison copy. The goal is a repo-native page that:

- matches the existing alternative landing architecture
- uses benchmark data only from `src/pages/benchmarks/screenshot-api.js`
- researches the competitor honestly from real sources
- avoids SEO cannibalization with existing alternative pages
- improves the page when a competitor-specific angle is stronger than a boilerplate comparison

## Read First

Before planning or editing, read these in order:

1. If present, `.claude/product-marketing-context.md`
2. `src/pages/alternative/screenshotone.js` — primary structural reference
3. `src/pages/alternative/screenshotapi.js` — secondary reference for a different angle
4. All other `src/pages/alternative/*.js` files — required for anti-cannibalization
5. `src/pages/benchmarks/screenshot-api.js` — only source of truth for benchmark numbers
6. `.cursor/skills/alternative-landing/references/template-structure.md`
7. `.cursor/skills/alternative-landing/references/microlink-features.md`
8. `AGENTS.md`

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

1. Confirm the competitor name.
2. Confirm the competitor URL.
3. Confirm the target slug if the user gave one.
4. Map the competitor to a benchmark key in `BENCHMARK_DATA.results`.

If the competitor is not benchmarked in `src/pages/benchmarks/screenshot-api.js`, stop and ask how to proceed. Do not fabricate a speed section.

Recommended options:

- wait until benchmark data exists
- create only an improvement report
- create a non-speed draft only if the user explicitly accepts a deviation from the existing structure

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
- `"[Competitor] screenshot api features"`
- `"[Competitor] docs"`
- `"[Competitor] alternatives"`
- `"[Competitor] review limitations"`

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

- `screenshotone.js`: speed-first angle ("The fastest ScreenshotOne alternative")
- `screenshotapi.js`: breadth / "does more" angle ("broader browser workflows")
- `urlbox.js`: cost per render angle ("better cost per render")
- `screenshotmachine.js`: upgrade path angle ("richer browser workflows")
- `apiflash.js`: production workloads angle ("for production workloads")

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

### `BENCHMARK_DATA`

Copy only:

- `microlink`
- the target competitor

Keep the same `testUrls` array from `src/pages/benchmarks/screenshot-api.js`.
Inline the values exactly. Do not reference helper constants from the benchmark page.

### `SERVICE_COLORS`

Use:

- `microlink: colors.red6`
- competitor: a color not already used by another alternative page

Currently used:

- `screenshotone`: `colors.pink6`
- `screenshotapi`: `colors.grape7`
- `urlbox`: `colors.teal6`
- `screenshotmachine`: `colors.blue6`
- `apiflash`: `colors.orange6`

### Speed claim math

Compute conservatively:

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

Follow `references/template-structure.md` and the live pages closely.

Default rule:

- keep the same overall architecture and section order as the existing alternative pages

That means the page should normally render:

1. `Hero`
2. `SpeedSection`
3. `WhySwitchSection`
4. `PricingSection`
5. `CTASection`
6. `ComparisonSection`
7. `HonestySection`
8. `TryItSection`
9. `FAQSection`

Use `screenshotone.js` as the primary implementation template and `screenshotapi.js` as a reality check for how the angle can shift without breaking structure.

Do not run automatic formatting after editing. If verification is needed, prefer targeted linting or manual fixes inside the landing file only.

### Page-writing rules

- Match the repo's import style and styled primitive layout.
- Use `theme({...})` for styled-system-supported properties per `AGENTS.md`.
- Keep prose unique to the competitor and the chosen angle.
- Keep the page honest even when Microlink wins.
- The `HonestySection` must contain real competitor strengths (4–6 items).
- The FAQ must contain 7–9 questions and avoid near-duplicates from existing alternative pages.
- The FAQ schema must mirror the visible FAQ content as plain text.
- The `Head` export must use a unique title, unique description, correct canonical URL, and FAQ schema.
- For newer pages, prefer the `FAQ_ITEMS` array pattern (with `{ question, answer, text }`) used by `urlbox.js`, `screenshotmachine.js`, and `apiflash.js`. This avoids duplicating FAQ content between the rendered component and the schema. The `text` field holds the plain-text version for schema; `answer` holds the JSX for rendering.

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

1. Read the current file.
2. Re-research the competitor's homepage, docs, features, pricing, and relevant workflow pages.
3. Re-read `src/pages/benchmarks/screenshot-api.js`.
4. Check for stale benchmark numbers, stale pricing, stale feature claims, stale FAQ answers, and stale honest-strength cards.
5. Re-run the anti-cannibalization pass against all other alternative pages.
6. Compare the file against `screenshotone.js` for structural drift.
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
- Do not run `prettier`, `prettier-standard`, or any repo-level formatter while using this skill, even on a single file, because this repository's formatter can touch unrelated files.
