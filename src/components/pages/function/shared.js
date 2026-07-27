import React from 'react'
import { Link } from 'components/elements/Link'

import { faqFromItems, sdkExample } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Browser Functions API: microlink.run()',
  description:
    'Write a function, get a value. microlink.run() ships JavaScript to a sandbox with full Puppeteer, npm on the fly, and profiling — a browser boots only when your code touches page.'
}

export const HERO = {
  name: 'Browser Functions',
  title: 'Browser Functions',
  description:
    'Write a function. Get a value. microlink.run() runs your JavaScript in a sandbox — the browser is optional and boots only when your code touches page.',
  plans: [
    { plan: 'Free', description: '5s timeout, 16 MB, prototype workflows.' },
    { plan: 'Pro', description: 'Up to 28s, 32 MB, no code-size limits.' }
  ]
}

export const OVERVIEW = {
  eyebrow: 'Overview',
  title: 'Browser optional. Value guaranteed.',
  body: (
    <>
      <code>microlink.run(url, code)</code> ships a plain function to a remote
      sandbox — serialization, compression, and the API call are handled for
      you. Reference <code>page</code> for the full{' '}
      <Link href='/docs/guides/function/browser-interaction'>
        Puppeteer page
      </Link>
      ; skip it and no browser starts at all. See the{' '}
      <Link href='/docs/api/parameters/function'>function parameter</Link>.
    </>
  ),
  bullets: [
    'No page reference → no browser — faster, cheaper compute',
    'require() any npm package — installed on the fly and cached',
    'result.isFulfilled stays true even when your code throws',
    'profiling.phases breaks down install / build / spawn / run'
  ]
}

export const PARAMS = {
  eyebrow: 'Parameters',
  title: 'What run() forwards.',
  docsHref: '/docs/api/parameters/function',
  rows: [
    {
      name: 'url',
      type: 'string',
      description: 'Target page; navigated only when the function reads page.',
      required: true,
      plan: 'Free + Pro',
      href: '/docs/api/parameters/url'
    },
    {
      name: 'function',
      type: 'string | Function',
      description: 'The code to run remotely — run() serializes it for you.',
      required: false,
      plan: 'Free + Pro',
      href: '/docs/api/parameters/function'
    },
    {
      name: 'scope options',
      type: 'object',
      description:
        'Extra options are forwarded into the function scope for reuse.',
      required: false,
      plan: 'Free + Pro',
      href: '/docs/api/parameters/function'
    },
    {
      name: 'proxy',
      type: 'boolean | string',
      description: 'Compose with automatic or BYO proxy for antibot targets.',
      required: false,
      plan: 'Pro',
      href: '/docs/api/parameters/proxy'
    },
    {
      name: 'ttl',
      type: 'string | number',
      description: 'Cache repeated executions within a freshness window.',
      required: false,
      plan: 'Pro',
      href: '/docs/api/parameters/ttl'
    }
  ]
}

export const EXAMPLES = {
  eyebrow: 'Examples',
  title: 'Canonical run() snippets.',
  panels: [
    {
      id: 'no-browser',
      title: 'No page, no browser',
      description: 'Plain compute — Chrome never boots, so it stays fast.',
      language: 'js',
      snippet: sdkExample(`const { value } = await microlink.run(
  'https://example.com',
  () => 40 + 2
)
// → 42`)
    },
    {
      id: 'page-eval',
      title: 'Puppeteer page.$eval',
      description: 'Reference page and a headless browser is navigated first.',
      language: 'js',
      snippet: sdkExample(`const { value } = await microlink.run(
  'https://example.com',
  ({ page }) => page.$eval('h1', el => el.textContent)
)
// → 'Example Domain'`)
    },
    {
      id: 'cheerio',
      title: 'require() cheerio',
      description: 'Deps are detected, installed on the fly, and cached.',
      language: 'js',
      snippet: sdkExample(`await microlink.run(
  'https://news.ycombinator.com',
  async ({ page }) => {
    const cheerio = require('cheerio')
    const $ = cheerio.load(await page.content())
    return $('.titleline > a').map((i, el) => $(el).text()).toArray()
  }
)`)
    },
    {
      id: 'with-proxy',
      title: 'run() behind a proxy',
      description: 'Same sandbox, residential exit for hard targets.',
      language: 'js',
      snippet: sdkExample(`const { value } = await microlink.run(
  'https://protected-target.com',
  ({ page }) => page.title(),
  { proxy: true }
)`)
    },
    {
      id: 'with-ttl',
      title: 'Cache a repeated run',
      description: 'ttl returns the stored value instead of executing again.',
      language: 'js',
      snippet: sdkExample(`const { value } = await microlink.run(
  url,
  ({ page }) => page.$eval('h1', el => el.textContent),
  { ttl: '1h' }
)`)
    }
  ]
}

export const RELATED = {
  relatedSlugs: ['automation', 'scraping', 'proxy', 'headers', 'ttl'],
  title: 'Compose around your function.'
}

export const FAQ_RAW = [
  {
    question: 'When does microlink.run() start a browser?',
    text: 'Only when your code references page. Without it, Microlink skips the headless browser entirely, so plain compute runs faster and cheaper. Reference page to get the full Puppeteer API for clicks, waits, and evaluation.'
  },
  {
    question: 'Is run() available on the free plan?',
    text: 'Yes. Free runs get a 5-second timeout, 16 MB of memory, and one concurrent execution per IP. Pro plans extend the timeout up to 28 seconds, raise memory to 32 MB, and remove code-size limits.'
  },
  {
    question: 'When should I use run() instead of extract()?',
    text: 'Start with extract() — declarative CSS-selector rules are shorter and easier to maintain. Escalate to run() when you need to click, wait, compute, or orchestrate custom logic that rules cannot express.'
  },
  {
    question: 'What happens if my function throws?',
    text: 'The promise still resolves: result.isFulfilled comes back false and result.value carries the error as { name, message } so you handle failures in your own code.'
  },
  {
    question: 'Can I require() npm packages?',
    text: 'Yes. Any require() call is detected, installed on the fly into the sandbox, and cached for later runs. Pin a version with require("cheerio@1.0.0").'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)

export const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'parameters', label: 'Parameters' },
  { id: 'examples', label: 'Examples' },
  { id: 'related', label: 'Related features' },
  { id: 'faq', label: 'FAQ' }
]
