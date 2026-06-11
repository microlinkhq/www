---
name: generate-changelog
description: Generate concise, user-facing changelog entries for Microlink by inspecting git commits across relevant repositories.
---

# Generate Changelog

Generate concise, user-facing changelog entries for `src/content/fragments/changelog.md` by inspecting git commits across all Microlink repositories since the last changelog edit.

## When to use

Run this skill when you need to update the changelog with recent changes. It scans all relevant repos and produces entries grouped by month. The changelog is read **newest to oldest** — both across months and within each month section.

## Steps

### 1. Determine the cutoff date

Find the last time the changelog file was modified:

```bash
git log -1 --format="%ai" -- src/content/fragments/changelog.md
```

Use that date as the `--after` boundary for all repo scans.

### 2. Read the current changelog

Read `src/content/fragments/changelog.md` to understand the existing format and identify which months already have entries (to avoid duplicates).

### 3. Scan repositories for commits

Scan commits after the cutoff date across these repo groups:

**Microlink repos** at `~/Projects/microlink/`:

| Repo              | Changelog relevance                                                 |
| ----------------- | ------------------------------------------------------------------- |
| `api`             | API features, fixes, new parameters, resolution improvements        |
| `metascraper`     | New integrations, detection improvements                            |
| `browserless`     | Major versions, Puppeteer upgrades, new packages                    |
| `mql`             | SDK changes, new features                                           |
| `sdk`             | SDK changes                                                         |
| `www`             | New pages, landings, tools, blog posts                              |
| `html-get`        | Extraction improvements                                             |
| `gateway`         | Dashboard changes (only if user-facing)                             |
| `openkey`         | Releases                                                            |
| `splashy`         | Releases                                                            |
| `youtube-dl-exec` | Releases                                                            |
| `tinyspawn`       | Releases                                                            |
| `geolocation`     | UI changes, new features                                            |
| `fonts`           | New features                                                        |
| `cards`           | New presets                                                         |
| `skills`          | New skills (only if user-facing)                                    |
| `cli`             | New commands, flags, output formats                                 |
| `function`        | Microlink Function SDK — new packages, API changes, runtime updates |
| `google`          | Releases, new Google product support                                |
| `is-antibot`      | Major versions (improves API antibot resolution)                    |
| `oembed-spec`     | Major versions only                                                 |

**unavatar repos** at `~/Projects/unavatar/`:

| Repo       | Changelog relevance                          |
| ---------- | -------------------------------------------- |
| `unavatar` | New providers, new features (public library) |
| `api`      | API changes, new endpoints                   |
| `www`      | Website changes                              |

For each repo, run:

```bash
cd <repo-path> && git log --format="%h %ad %s" --date=format:"%Y-%m-%d" --after="<cutoff>" --no-merges
```

### 4. Filter for user-facing changes

**Include** commits that match:
- `feat:` or `feat(...):`  — new features
- New pages, landings, tools in `www`
- New providers or integrations
- New presets (cards)
- Major version releases
- Blog posts
- Significant `fix:` commits that affect user-visible behavior (resolution, rendering, extraction)
- `perf:` commits with user-visible impact (e.g., Puppeteer upgrade)

**Exclude** commits that are purely internal:
- `chore: update dependencies` / `build(deps):` — dependency bumps
- `chore(release):` — release tags (use them to identify versions, not as entries)
- `ci:` / `build:` — CI and build config
- `test:` — test-only changes
- `chore(statsd):` / `chore(sentry):` — observability internals
- `chore(k8s):` / `chore(base):` — infrastructure
- `refactor:` — unless it changes user-facing behavior
- `Revert` — unless it reverts a user-facing feature

### 5. Group by month and compose entries

Group changes by month (`### Month YYYY`).

**Within each month, sort entries newest first (reverse chronological).** Use commit dates from the repo scans to determine order. When a change spans multiple repos on the same day, any stable order is fine — what matters is that earlier-in-the-month entries appear lower in the section.

Do **not** group by product within a month. The reader scans top-to-bottom from most recent to oldest.

When multiple user-facing changes ship on different dates under the same product (e.g., three dashboard updates across a week), prefer **one entry per change** so each line sits at the correct chronological position. Avoid rolling them into a single composite entry unless they shipped together.

Product link conventions (for writing entries, not for ordering):

- `[Microlink](/)` — website pages, landings, tools
- `[Microlink API](/docs/api/getting-started/overview)` — API features and fixes
- `[Browserless](https://browserless.js.org)` — include version when relevant
- `[Metascraper](https://metascraper.js.org)` — include version when relevant
- `[Microlink MQL](/docs/mql/getting-started/overview)` — MQL changes
- `[Microlink SDK](/docs/sdk/getting-started/overview)` — SDK changes
- `[Microlink OSS](/oss)` — other OSS releases
- `[unavatar.io](https://unavatar.io)` — providers and features

### 6. Entry format rules

Each entry follows this format:

```
- [Product](link): Description.
```

Specific conventions:

- **unavatar providers**: link to `https://unavatar.io/<provider>` (e.g., `[Steam](https://unavatar.io/steam)`). Group multiple providers in a single entry.
- **Browserless/Metascraper versions**: include version in product name (e.g., `[Browserless v13](https://browserless.js.org)`). Use release tags to determine version numbers.
- **API parameters**: link to the parameter docs page when available (e.g., `[function](/docs/api/parameters/function)`).
- **www pages**: link to the page path (e.g., `[embed](/embed)`, `[pricing](/pricing)`).
- **Blog posts**: use format `[Microlink Blog](/blog): Published [Title](/blog/slug).`
- **Keep it concise**: one line per entry, describe the user impact, not the implementation.
- **No internal jargon**: avoid mentioning Redis, Kubernetes, Datadog, Sentry, statsd, etc.

### 7. Present entries for review

Show the proposed entries to the user before editing the file. Ask if any entries should be added, removed, or reworded.

### 8. Insert into changelog

- **New month**: prepend the `### Month YYYY` section at the top of the file, before the first existing month header. Sort all entries in that section newest first.
- **Existing month**: merge new entries into the matching month section and **re-sort the entire section** newest first. Do not append new entries at the bottom — that puts the freshest changes last, which is the wrong reading order.
- **Older months**: do not modify entries in months that are not being updated.
