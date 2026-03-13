# Microlink Guide Templates

Use these templates as starting points. Trim aggressively. Only keep sections that the target utility actually needs.

## Utility hub `index.md`

```md
---
title: '<Utility>'
description: 'Take your first <utility> with Microlink API, learn the core mental model, and choose the right next step for your use case.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

<One-paragraph quickstart intro.>

<MultiCodeEditorInteractive mqlCode={{ url: 'https://...', <utility>: true }} />

<Figcaption><What the first example proves.></Figcaption>

## How it works

<Explain canonical syntax once, especially boolean vs object or default vs customized usage.>

## The response

<Show the key response fields users will reuse.>

## Choose a mode

| Need | Best option | Why |
|------|-------------|-----|
| ... | ... | ... |

## Free tier and API key

<Only mention plan details that change user action. Use ProBadge when required.>

## What's next

- **[Page 1](...)** — <why to read it>
- **[Page 2](...)** — <why to read it>
```

## Topical subguide

```md
---
title: '<Guide name>'
description: '<User-value sentence.>'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

<Open with the user problem this page solves.>

## <Primary section>

<MultiCodeEditorInteractive mqlCode={{ ... }} />

<Figcaption><What this example teaches.></Figcaption>

<Explain when to use it.>

## Choose X vs Y

| If you need | Use |
|-------------|-----|
| ... | ... |

## Next step

<Route to the most natural next page.>
```

## Delivery/embedding page

```md
## Two delivery models

| When you need | Use | Result |
|---------------|-----|--------|
| JSON plus metadata | Default response | Read `data.<field>.url` |
| Direct asset response | `embed: '<field>.url'` | The API URL behaves like the asset |
```

## Troubleshooting page

```md
## Quick triage checklist

1. <Most common fix>
2. <Second most common fix>
3. <Route to auth/proxy if needed>

## The result is wrong or incomplete

<Explain the main timing/rendering failure mode.>

## The request fails

<Explain timeout, auth, proxy, or plan issues.>

## Useful headers while debugging

- `x-cache-status`
- `x-cache-ttl`
- `x-fetch-mode`
- `x-fetch-time`
- `x-pricing-plan`
- `x-response-time`
```

## Naming guidance

- Keep page names action-oriented and user-facing.
- Prefer “Delivery and embedding” over a narrow “Embed” page when the page also covers JSON vs direct asset responses.
- Add `private-pages.md` only when auth, sessions, headers, or endpoint choice are real workflows.
- Add `troubleshooting.md` when the utility has common multi-step failure modes.
