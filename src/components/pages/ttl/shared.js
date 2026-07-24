import React from 'react'
import { Clock } from 'react-feather'

import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import { theme } from 'theme'

import {
  buildMqlLanguages,
  faqFromItems
} from 'components/patterns/FeatureStory'

export const META = {
  title: 'Cache TTL & Stale-While-Revalidate API',
  description:
    'Cache hits never count against your Microlink plan quota — every HIT is free, including expensive screenshot and PDF renders. Tune cache lifetime per request with ttl (1 minute to 31 days) and eliminate cold-start latency with staleTtl.'
}

export const HERO = {
  name: 'Configurable Caching',
  title: 'Configurable Caching',
  description:
    "Don't pay to re-render the same screenshot or PDF twice. Every cache HIT is free — tune lifetime with ttl and keep callers instant with staleTtl.",
  primaryCta: {
    label: 'Read the caching guide →',
    href: '/docs/guides/common/caching'
  },
  secondaryCta: {
    label: 'View API docs',
    href: '/docs/api/parameters/ttl'
  },
  plans: [{ plan: 'Pro', description: 'Tune ttl and staleTtl per request.' }]
}

export const HeroMark = () => (
  <Flex
    css={theme({
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      border: 1,
      borderColor: 'black10',
      bg: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'violet7'
    })}
  >
    <Clock size={36} />
  </Flex>
)

export const OVERVIEW = {
  body: (
    <>
      Use <Link href='/docs/api/parameters/ttl'>ttl</Link> to set the freshness
      window (1 minute to 31 days) and{' '}
      <Link href='/docs/api/parameters/staleTtl'>staleTtl</Link> for
      stale-while-revalidate. Cache hits never count against your quota —
      including expensive screenshot and PDF renders.
    </>
  ),
  bullets: [
    'Every HIT is free — MISS bills once',
    'Unified cache across every Microlink output',
    'Served from the nearest CloudFlare edge',
    'force: true for intentional invalidation'
  ],
  sample: `{
  "x-cache-status": "HIT",
  "x-cache-ttl": "86400000",
  "cf-cache-status": "HIT",
  "x-response-time": "23ms"
}`,
  sampleTitle: 'headers'
}

export const STEPS = [
  {
    title: 'MISS',
    description: 'First request renders once, bills that MISS, and warms cache.'
  },
  {
    title: 'HIT',
    description: 'Later callers within ttl get free edge responses.'
  },
  {
    title: 'staleTtl',
    description: 'Serve cache instantly while a background refresh runs.'
  },
  {
    title: 'force',
    description: 'Optional bypass regenerates with x-cache-status: BYPASS.'
  }
]

export const LANGUAGES = buildMqlLanguages({
  url: 'https://example.com',
  options: { ttl: '1d', staleTtl: 0 },
  comment: 'Production pattern: ttl 1d + staleTtl 0'
})

LANGUAGES.JavaScript = `import mql from '@microlink/mql'

const { data } = await mql('https://example.com', {
  apiKey: process.env.MICROLINK_API_KEY,
  ttl: '1d',
  staleTtl: 0
})`

export const QUICK_START = {
  description:
    'Recommended production setup: ttl set to your freshness budget, staleTtl set to 0.',
  playgroundHref: '/docs/guides/common/caching'
}

export const PARAMS = {
  docsHref: '/docs/api/parameters/ttl',
  rows: [
    {
      name: 'ttl',
      type: "number | string ('1d', 'min', 'max')",
      description: 'Cache lifetime from 1 minute to 31 days.',
      required: false,
      plan: 'Pro'
    },
    {
      name: 'staleTtl',
      type: 'number | string | false',
      description: 'Stale-while-revalidate window; cannot exceed ttl.',
      required: false,
      plan: 'Pro'
    },
    {
      name: 'force',
      type: 'boolean',
      description: 'Bypass cache and regenerate (BYPASS).',
      required: false,
      plan: 'Free + Pro'
    }
  ]
}

export const EXAMPLES = {
  moreHref: '/docs/guides/common/caching',
  items: [
    {
      title: 'One paid request per day',
      description: 'ttl 1d + staleTtl 0.',
      snippet: "ttl: '1d', staleTtl: 0",
      href: '/docs/api/parameters/ttl'
    },
    {
      title: 'Force a fresh copy',
      description: 'Invalidate when you know the source changed.',
      snippet: 'force: true',
      href: '/docs/api/parameters/force'
    },
    {
      title: 'Read cache headers',
      description: 'HIT means free; MISS/BYPASS are billed.',
      snippet: `x-cache-status: HIT
x-cache-ttl: 86400000`,
      href: '/docs/api/basics/cache'
    }
  ]
}

export const USE_CASES = [
  {
    title: 'Cheap screenshots',
    description: 'Pay once to render; serve every HIT for free.',
    icon: 'clock'
  },
  {
    title: 'Marketing freshness',
    description: 'Long ttl for content that rarely changes.',
    icon: 'globe'
  },
  {
    title: 'Dashboard feeds',
    description: 'Short ttl for near-real-time data.',
    icon: 'radar'
  },
  {
    title: 'Zero cold-start',
    description: 'staleTtl: 0 keeps callers instant.',
    icon: 'code'
  },
  {
    title: 'APM-driven tuning',
    description: 'Track x-cache-status to grow or shrink TTL.',
    icon: 'list'
  }
]

export const FAQ_RAW = [
  {
    question: 'Does caching apply to screenshots and PDFs too?',
    text: 'Yes — the cache layer covers every Microlink output equally: metadata, HTML, markdown, screenshots, PDFs, insights, and data extraction.'
  },
  {
    question: 'Do cached responses count against my plan quota?',
    text: 'No. Any response served from cache (x-cache-status: HIT) does not count toward your plan quota. Only MISS and BYPASS count as billed requests.'
  },
  {
    question: 'What is the difference between ttl and staleTtl?',
    text: 'ttl sets how long a cached response is valid. staleTtl opts into stale-while-revalidate: callers get the cached copy instantly while a background refresh regenerates a fresh one.'
  },
  {
    question: 'How do I bypass the cache for a fresh response?',
    text: 'Pass force: true. The cache layer is skipped and the response carries x-cache-status: BYPASS.'
  },
  {
    question: 'Do ttl and staleTtl work on free plans?',
    text: 'No. Both are Pro features. Free-plan responses are still cached using the default 24-hour ttl, but the parameters themselves are honored only on Pro.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
