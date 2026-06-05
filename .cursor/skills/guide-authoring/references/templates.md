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

## See also

- <Link href='/docs/guides/...' children='...' /> — <when this related guide is the better choice>
- <Link href='/docs/guides/...' children='...' /> — <when this related guide is the better choice>
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

## Caching page (slim, guide-specific)

```md
---
title: 'Caching and performance'
description: '<Optimize [utility] requests for speed and cost.>'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

<One-sentence context about why this utility benefits from caching.>

## <Utility>-specific speedups

<The single biggest speedup for this workflow, with interactive example.>

<Numbered list of guide-specific optimizations.>

## Cache strategy

For the cache controls that apply to all workflows — `ttl`, `staleTtl`, `force`, and how to verify caching through response headers — see <Link href='/docs/guides/common/caching' children='caching patterns' />.

<Recommended production setup with interactive example.>

## Next step

<Route to the next page, usually private pages.>
```

## Private pages page (slim, guide-specific)

```md
---
title: 'Private pages'
description: '<Access authenticated pages for [utility] safely.>'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

<One-sentence intro linking to shared patterns.> The general patterns for headers, secrets, endpoint selection, and proxy are covered in <Link href='/docs/guides/common/private-pages' children='private pages patterns' />.

## <Utility> with non-sensitive headers <ProBadge />

<Interactive example with guide-specific parameters.>

## <Utility> with sensitive credentials

<curl example with guide-specific parameters and x-api-header-*.>

## When private <utility> still fails

<Brief mention of proxy and link to troubleshooting.>

## Next step

<Route to troubleshooting.>
```

## Troubleshooting page (slim, guide-specific)

```md
---
title: 'Troubleshooting'
description: '<Debug [utility]-specific failures.>'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

<One-sentence overview of common failure categories.>

For timeouts, blocked sites, auth/plan errors, and debug headers that apply to all workflows, see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' />.

## <Guide-specific issue 1>

<Explanation with interactive example.>

## <Guide-specific issue 2>

<Explanation with table or example.>

## Still stuck

Check the full <Link href='/docs/api/basics/error-codes' children='error codes reference' /> or see <Link href='/docs/guides/common/troubleshooting' children='common troubleshooting' />.

## Back to guides

See the <Link href='/docs/guides' children='guides overview' /> for more Microlink guides.
```

## Naming guidance

- Keep page names action-oriented and user-facing.
- Prefer "Delivery and embedding" over a narrow "Embed" page when the page also covers JSON vs direct asset responses.
- Use descriptive names that avoid collision with other guides (e.g., `choosing-scope.md` instead of `defining-rules.md` in the markdown guide).
- Add `private-pages.md` only when auth, sessions, headers, or endpoint choice are real workflows.
- Add `troubleshooting.md` when the utility has common multi-step failure modes.
- For caching, private pages, and troubleshooting: keep guide-specific content only, link to `common/` for shared patterns.
