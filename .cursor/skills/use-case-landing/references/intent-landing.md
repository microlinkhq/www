# Intent landings (data-driven use cases)

Product use cases live under a vertical hub and are rendered by the shared
`UseCaseLanding` component. Authoring one means writing data, never JSX.

## Routes

- Hub: `/use-cases/<vertical>` from `src/pages/use-cases/<vertical>/index.js`
  (`website-screenshot`, `website-to-pdf`, `website-to-markdown`, `website-metadata`).
- Landing: `/use-cases/<vertical>/<intent>` from `src/pages/use-cases/<vertical>/<intent>.js`.
- One search intent per landing. The slug names the job, not a brand or a parameter.

## Files per landing

1. Registry entry in `src/components/patterns/UseCaseStory/registry/<vertical>.js`:

```js
{
  slug: 'website-screenshot/mobile',
  vertical: 'website-screenshot',
  name: 'Mobile screenshot at any viewport',
  blurb: 'One sentence, what the developer gets.',
  category: 'Screenshot API',
  keywords: ['mobile website screenshot api', 'screenshot viewport'],
  related: [
    'website-screenshot/capture-element',
    'website-screenshot/dark-mode',
    'website-to-pdf/clean-layout'
  ]
}
```

`related` holds exactly 3 or exactly 6 slugs, at least one from the same vertical, never
itself. They render as the same `UseCaseCard` grid as `/use-cases`, so those two counts
are the ones that fill the rows. Prefer 6 when real relations exist: same-vertical
siblings plus the cross-vertical twin (`blocked-sites` with `built-in-proxy`).

2. Content module `src/components/pages/use-cases/<vertical>/<intent>.js` exporting
`CONTENT`. It must stay import-free (strings, arrays, objects only) so
`test/use-cases/registry.js` can load and validate it:

```js
export const CONTENT = {
  slug: 'website-screenshot/mobile',
  head: { title: '30 to 58 chars, no brand', description: '70 to 155 chars' },
  hero: { title: 'h1', intro: 'paragraph', cta: { label: '…', href: '/screenshot' } },
  problem: {
    eyebrow: 'The problem',
    title: 'h2',
    paragraphs: ['the pain', 'why the workaround fails', 'how the API solves it'],
    figure: { request: { url, params }, alt, width, height, caption },
    live: { label: 'Open the live response', request: { url, params } }
  },
  how: {
    title: 'h2',
    intro: '…',
    steps: [
      { label: '1 · Emulate the device', sdk: 'SDK body without the client boilerplate', note: '…' },
      { label: '2 · Raw API URL', request: { url: 'https://example.com', params: { screenshot: true } }, note: '…' },
      { label: '3 · Anything else', code: '…', language: 'bash', note: '…' }
    ],
    params: [{ name: 'viewport', href: '/docs/api/parameters/viewport', note: '…' }],
    outro: '…'
  },
  why: { title: 'h2', intro: '…', cards: [{ kicker, title, body, note }, …, { …, note: 'When not to: …' }] },
  faq: [{ question: '…', answer: '…' }, { question: '…', answer: ['p1', 'p2'] }],
  cta: { headlinePrefix: 'Ready to capture', headlineAccent: 'mobile screenshots', body: '…', href: '/screenshot', label: '…' },
  howTo: { name: '…', steps: [{ title: '…', description: '…' }] }
}
```

Rules the test enforces:

- `figure`/`live` are optional. A `figure` is an `<img>` generated live by the API, so
  declare the viewport in `request.params` and set `width`/`height` to match.
- `request.params` keys must be documented under `src/content/docs/api/parameters/`
  and must not contain arrays (pass a single string; arrays only in `sdk` snippets).
- `params[].href` must resolve to a docs page.
- Inline links use `[label](/href)` in `hero.intro`, `problem.paragraphs`, `figure.caption`,
  `how.intro`, `steps[].note`, `how.outro`, `why.intro`, `cards[].note` and FAQ answers.
  `cards[].body`, `params[].note` and `cta.body` render as plain text.
- Every inline link must resolve to a file under `src/pages` or `src/content/docs`, and a
  landing never links to itself.
- `steps[].note` renders under its code block: one or two sentences on what the code does
  and what comes back.
- No em dash, no `...` (use `…`), exactly three `why.cards`, three to five FAQ items.
- Titles, h1s and FAQ questions are unique across the whole catalog.

3. Page file `src/pages/use-cases/<vertical>/<intent>.js`:

```js
import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  UseCaseLanding,
  useCaseStructured
} from 'components/patterns/UseCaseStory'

import { CONTENT } from 'components/pages/use-cases/website-screenshot/mobile'

const UseCaseMobileScreenshotPage = () => <UseCaseLanding content={CONTENT} />

export const Head = () => (
  <Meta
    title={CONTENT.head.title}
    description={CONTENT.head.description}
    schemaType='TechArticle'
    structured={useCaseStructured(CONTENT)}
  />
)

export default UseCaseMobileScreenshotPage
```

## Copy rules

- Depth: 750 to 1000 words of visible prose. Three problem paragraphs (the pain, why the
  usual workaround fails, how the API solves it), five FAQ items, and a `howTo` object
  mirroring `how.steps` in plain text.
- The registry `keywords` are the semantic targets. The primary keyword appears in the
  title, the h1, the first sentence of the intro, one H2 and one FAQ question. `how.title`
  reads as "How to <task>", `problem.title` names the concrete pain, `why.title` starts
  with "Why".
- FAQ questions are phrased the way a developer searches (How do I, Can I, Why does) and
  name the vertical's noun (screenshot, PDF, Markdown, metadata) so they stay unique.
- Six to ten inline links per page, mixing parameter docs, the matching guide under
  `/docs/guides`, a `/features` page, the product page, a `/tools` page and sibling use
  cases. Descriptive anchors only.
- Cache hits do not count against the quota. Never write that cached responses count or
  cost less.
- Only documented claims: 25 req/day free, 99.9% SLA on every paid plan, no throttling,
  24 h default cache, `ttl` 1 min to 31 d (Pro), automatic proxy resolution (Pro),
  `proxy.location` ISO country codes. Never say autoscaling.
- Task-shaped, verb-first titles that name the output and the constraint. Never
  "Free", "Tool", "Generator" (owned by `/tools`) nor the "<X> API:" prefix (owned by `/features`).
- Cross-vertical intents (spikes, proxy, geolocation) must differ in h1, parameters,
  consequences and FAQ from their siblings; link them through `related`.

## Verification

`npm test` runs `standard` and the two use-case suites (`test/use-cases/*.js`).
