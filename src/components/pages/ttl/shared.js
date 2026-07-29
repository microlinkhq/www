import React from 'react'
import { Link } from 'components/elements/Link'

import { faqFromItems, sdkExample } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Configurable Caching API: Cache Hits Are Free',
  description:
    'Set ttl on any Microlink request with humanized durations like "1d". Cache hits are free and instant; staleTtl serves the cached value while a fresh one is fetched in the background.'
}

export const HERO = {
  title: 'Configurable Caching',
  tag: 'PRO',
  description:
    'Hits are free. Set ttl with a humanized duration on any request — cache hits return instantly and cost nothing, and staleTtl keeps responses fast while refreshing.'
}

export const OVERVIEW = {
  title: 'A cache hit costs nothing.',
  body: (
    <>
      Add <Link href='/docs/api/parameters/ttl'>ttl</Link> to any request to set
      its freshness window with a humanized duration — <code>'1d'</code>,{' '}
      <code>'12h'</code>, <code>'30m'</code>. Repeat calls inside the window are
      served from cache: free, instant, no browser. Add{' '}
      <Link href='/docs/api/parameters/staleTtl'>staleTtl</Link> to serve the
      cached value while a fresh one is fetched in the background.
    </>
  ),
  bullets: [
    'Cache hits are free and return instantly — no browser boots',
    "Humanized durations: '1d', '12h', '30m' — no raw seconds",
    'staleTtl serves stale-while-revalidate for zero-latency refreshes',
    'x-cache-status header tells you HIT or MISS on every response',
    'Works on every product — screenshot, markdown, extract, run'
  ]
}

export const PARAMS = {
  title: 'How caching is tuned.',
  rows: [
    {
      name: 'ttl',
      type: 'string | number',
      description: "Freshness window as a humanized duration ('1d') or ms.",
      href: '/docs/api/parameters/ttl'
    },
    {
      name: 'staleTtl',
      type: 'string | number',
      description: 'Serve the cached value while revalidating in background.',
      href: '/docs/api/parameters/staleTtl'
    },
    {
      name: 'x-cache-status',
      type: 'response header',
      description: 'HIT or MISS — tells you whether the cache served the call.',
      href: '/docs/api/parameters/ttl'
    },
    {
      name: 'force',
      type: 'boolean',
      description: 'Bypass the cache to render a fresh response on demand.',
      href: '/docs/api/parameters/force'
    }
  ]
}

export const EXAMPLES = {
  title: 'Fetch once. Serve many.',
  panels: [
    {
      id: 'ttl-day',
      title: 'Cache for a day',
      description: "A humanized '1d' window — repeat calls are free and fast.",
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com',
  { ttl: '1d' }
)`)
    },
    {
      id: 'stale',
      title: 'Stale-while-revalidate',
      description:
        'staleTtl serves the cached value while refreshing behind it.',
      snippet: sdkExample(`const md = await microlink.markdown(
  'https://example.com/blog',
  { ttl: '1h', staleTtl: '30m' }
)`)
    },
    {
      id: 'force',
      title: 'Force a fresh render',
      description: 'Skip the cache when you need the latest response now.',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com',
  { force: true }
)`)
    },
    {
      id: 'extract',
      title: 'Cheap monitoring',
      description: 'Repeat extract on a schedule and pay only on MISS.',
      snippet: sdkExample(`const price = await microlink.extract(url, {
  price: { selector: '.price', type: 'string' }
}, { ttl: '15m' })`)
    },
    {
      id: 'with-proxy',
      title: 'Cache after proxy',
      description:
        'Keep hard-target results warm so you skip the proxy next time.',
      snippet: sdkExample(`const md = await microlink.markdown(url, {
  proxy: true,
  ttl: '1d'
})`)
    }
  ]
}

export const RELATED = {
  relatedSlugs: ['scraping', 'proxy', 'function', 'headers'],
  title: 'Make every product cheaper.'
}

export const FAQ_ITEMS = faqFromItems([
  {
    question: 'What does “cache hits are free” mean?',
    text: 'When a request is served from cache inside its ttl window, no browser boots and no render happens — the stored response is returned instantly and does not count against your usage.'
  },
  {
    question: 'How do I set the cache duration?',
    text: 'Pass ttl on any request with a humanized duration such as "1d", "12h" or "30m" (or milliseconds). It ranges from 1 minute to 31 days, so you tune freshness to the content.'
  },
  {
    question: 'What is staleTtl?',
    text: 'staleTtl enables stale-while-revalidate: once the ttl expires, the cached value is still served immediately while a fresh response is fetched in the background, so callers never wait on a render.'
  },
  {
    question: 'How do I know if a response was cached?',
    text: 'Every response carries an x-cache-status header set to HIT or MISS, so you can confirm whether the cache served the call and measure your hit rate.'
  },
  {
    question: 'Can I bypass the cache when I need fresh data?',
    text: 'Yes. Pass force: true to skip the cache and render a fresh response on demand, while still storing it for subsequent calls within the ttl.'
  }
])
