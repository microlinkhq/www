---
name: guide-authoring
description: Create and revise workflow-first Microlink docs guides under `src/content/docs/guides`, turning API reference parameters into practical guide sets with runnable MDX examples, guide index/sidebar updates, ProBadge usage, and consistency checks against the API reference. Use when adding a guide for a Microlink utility, reviewing guide structure/content, or converting parameter docs into step-by-step workflows.
---

# Microlink Guide Authoring

## Goal

Create guides like the current screenshot guide: practical, workflow-first, easy to scan, and strictly aligned with the API docs.

## When to Use

- The user wants to add a new guide for a Microlink utility under `src/content/docs/guides`.
- The user wants to turn API parameter docs into a guide set.
- The user wants feedback on guide structure, coverage, or sequencing before writing.
- The user wants an existing Microlink guide rewritten from parameter-by-parameter reference style into workflow-first documentation.

## Read first

When asked to create or revise a guide, read:

1. `src/content/docs/guides/index.md`
2. The target utility guide folder, if it exists.
3. `src/content/docs/guides/screenshot/*.md` as the house-style baseline.
4. All relevant `src/content/docs/api/parameters/**` pages for the utility.
5. Related shared docs when applicable:
   - basics: `authentication`, `cache`, `endpoint`, `error-codes`, `rate-limit`
   - shared params: `embed`, `filter`, `filename`, `force`, `headers`, `meta`, `proxy`, `retry`, `staleTtl`, `timeout`, `ttl`
6. **Common pattern pages** under `src/content/docs/guides/common/`:
   - `caching.md` — shared caching patterns (ttl, staleTtl, force)
   - `private-pages.md` — shared auth patterns (headers, x-api-header-*, endpoint, proxy)
   - `troubleshooting.md` — shared debug patterns (timeouts, blocked sites, error codes, debug headers)
   - `production-patterns.md` — best practices for production integrations
7. `src/components/patterns/Aside/constants.js` if the guide set changes.

The screenshot guide is the current benchmark for tone, depth, and cross-linking. Match its quality, not necessarily its exact file count.

## Core principles

- Guides explain user jobs, not parameter catalogs.
- The main `index.md` is a quickstart and hub, not a thin landing page.
- Explain the key mental model once early:
  - response shape
  - canonical syntax
  - important choice points such as JSON vs embed, viewport vs element, fresh vs cached
- Use one canonical syntax consistently across guide pages. For utility-specific options, prefer the nested object form in interactive examples when the API supports it.
- Compare related options directly with tables, checklists, or "choose X vs Y" sections.
- Use live `MultiCodeEditorInteractive` examples. If metadata is not the point, add `meta: false`.
- Prefer stable demo URLs and selectors. Default to `microlink.io`, `github.com/microlinkhq`, or other durable targets. Avoid deprecated third-party services (e.g., `source.unsplash.com` is deprecated).
- End each subguide with `## Next step`.
- Add a `## See also` section at the bottom of the `index.md` linking to related guides that solve adjacent problems.
- Mark Pro features with `ProBadge` only when the authoritative parameter page has `isPro: true` or the user explicitly confirms the plan gating.
- Do not document undocumented parameter shapes. If the type/examples do not show a boolean, object, string, array form, do not invent it.

## Shared content architecture

Caching, private pages, and troubleshooting contain patterns that are identical across all workflows. To avoid duplication and maintenance drift:

1. **Shared pattern pages** live under `src/content/docs/guides/common/`. They contain the universal advice: how `ttl`/`staleTtl`/`force` work, how `headers`/`x-api-header-*`/proxy work, and how to read debug headers.
2. **Per-guide pages** for caching, private pages, and troubleshooting are **slim** — they contain only the guide-specific advice (e.g., "set `meta: false` for screenshot-only requests") and link to the shared pattern page for the universal parts.
3. When creating a new guide, do NOT duplicate the shared content. Write the guide-specific tips and link to `common/`.

The pattern is:
- Guide-specific intro ("The biggest speedup for screenshot requests is…")
- Guide-specific checklist or examples
- Link to shared pattern page ("For cache controls that apply to all workflows, see caching patterns.")
- Next step link

## Pick the page set

Start with the smallest useful set. Do not copy the screenshot page list blindly.

| Page | Use when | Typical content |
|------|----------|-----------------|
| `index.md` | Always | Quickstart, response model, canonical syntax, key decision points, roadmap, "See also" |
| `customizing-output.md` | The utility has output-specific options | Output modes, formatting, visual differences, asset customization |
| `browser-settings.md` | Headless browser rendering changes the result | Device, viewport, color scheme, media type, JavaScript, rendering settings |
| `page-interaction.md` | Browser actions affect success | `waitUntil`, `waitForSelector`, `click`, `scroll`, `styles`, `scripts`, `function`, `adblock` |
| `embedding.md` | Users need to consume assets in markup or choose a delivery mode | JSON vs direct asset response, embed, response shaping, filenames |
| `caching-and-performance.md` | Freshness, cost, and speed matter | **Guide-specific speedups only**, then link to `common/caching` |
| `private-pages.md` | Auth, sessions, forwarded headers, or endpoint choice matter | **Guide-specific examples only**, then link to `common/private-pages` |
| `troubleshooting.md` | Failure modes are common or multi-causal | **Guide-specific issues only**, then link to `common/troubleshooting` |

Rename pages when the utility needs different language (e.g., the markdown guide uses `choosing-scope.md` instead of `defining-rules.md`), but keep the workflow-first grouping.

## Authoring workflow

1. Audit the utility surface.
   - Gather all utility-specific parameters.
   - Gather cross-cutting parameters that materially change user success.
   - Note response fields, defaults, plan gating, and common failure modes.

2. Design the information architecture.
   - Group by user decisions and workflows.
   - Separate output, delivery, auth/private pages, and troubleshooting when those are meaningful.
   - Avoid one giant page unless the utility surface is genuinely small.

3. Write the hub page.
   - First runnable example.
   - Response model.
   - Canonical syntax.
   - One or two decision sections or tables.
   - "What's next" list linking to every subguide.
   - "See also" section linking to related guides.

4. Write subguides.
   - Start with the user problem the page solves.
   - Show a runnable example early.
   - Explain when to use the option or pattern.
   - Compare it with adjacent options.
   - Keep reference-style detail out unless it helps a decision.
   - For caching, private pages, and troubleshooting: keep guide-specific, link to `common/`.

5. Update shared navigation.
   - Update `src/content/docs/guides/index.md` (including the "Which guide do I need?" table).
   - Update `src/components/patterns/Aside/constants.js`.

6. Cross-check before finishing.
   - Verify every claim against the API docs.
   - Align syntax, defaults, response fields, and plan gating.
   - If the guide exposes a clear reference inconsistency, fix it.
   - If the inconsistency is ambiguous, ask the user instead of inventing behavior.
   - Use an ask-questions step when the utility surface, page set, or plan gating is unclear.
   - Verify all example URLs are stable and not deprecated.

## MDX conventions

Common imports:

```js
import { Link } from 'components/elements/Link'
import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import ProBadge from 'components/patterns/ProBadge/ProBadge'
```

- Import only what you use.
- Use `Link` for internal docs links.
- Use `Figcaption` to explain the takeaway of the example, not restate the code.
- Frontmatter descriptions should explain the page's user value, not list every parameter.
- Keep titles short and consistent with existing guide naming.
- Prefer markdown tables for comparisons and decision points.

## Guardrails

- Do not mirror the API reference page-for-page.
- Do not add pages just for symmetry.
- Do not duplicate universal patterns that belong in `common/`. Link instead.
- Do not bury critical workflows like private pages or troubleshooting if the utility needs them.
- Do not rely on fragile selectors or gated third-party pages for core examples.
- Do not ship inconsistent syntax between guide and reference.
- Do not use deprecated third-party services (verify URLs are still live).
- When docs conflict, prefer:
  1. parameter page type, frontmatter, and examples
  2. directly related basics/getting-started docs
  3. explicit user confirmation
- Do not infer behavior from pricing blurbs, isolated prose mentions, or error codes alone.

## Definition of done

- [ ] The page set matches the real utility surface.
- [ ] `index.md` works as both quickstart and hub.
- [ ] `index.md` has a "See also" section linking to related guides.
- [ ] The guide focuses on workflows and decision points.
- [ ] Examples are runnable and use stable URLs.
- [ ] Plan gating matches the authoritative docs.
- [ ] Syntax, defaults, and response fields match the reference.
- [ ] Caching, private pages, and troubleshooting pages link to `common/` for shared patterns.
- [ ] `src/content/docs/guides/index.md` is updated (including "Which guide do I need?" table).
- [ ] `src/components/patterns/Aside/constants.js` is updated if needed.
- [ ] Each subguide has `## Next step`.
- [ ] The guide reads like one cohesive system, not separate parameter notes.

## Templates

For copyable outlines, see [references/templates.md](references/templates.md).
