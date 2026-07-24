import React from 'react'
import { Code, Hash } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import { theme } from 'theme'

import {
  buildMqlLanguages,
  faqFromItems
} from 'components/patterns/FeatureStory'

export const META = {
  title: 'Web Scraping API: Structured Data Extraction',
  description:
    'Extract structured data from any URL with CSS selectors using the data parameter — single values, collections, and computed fields returned as clean JSON. Works on the free tier; Pro plans add automatic proxy resolution against Cloudflare, DataDome, and Akamai antibots, custom headers for login walls, and configurable cache TTL.'
}

export const HERO = {
  name: 'Web Scraping',
  title: 'Web Scraping',
  description:
    'Extract structured JSON from any webpage using CSS selectors. URL → JSON in one request.',
  primaryCta: {
    label: 'Try it in Playground →',
    href: '/docs/guides/data-extraction'
  },
  secondaryCta: {
    label: 'View API docs',
    href: '/docs/api/parameters/data'
  },
  plans: [
    {
      plan: 'Free',
      description: 'Basic scraping. Perfect for simple cases.'
    },
    {
      plan: 'Pro',
      description: 'Advanced scraping. Anti-bot, geo, proxy & more.'
    }
  ]
}

export const HeroMark = () => (
  <Flex css={theme({ alignItems: 'center', gap: 3 })}>
    <Flex
      css={theme({
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        border: 1,
        borderColor: 'black10',
        bg: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'secondary'
      })}
    >
      <Code size={28} />
    </Flex>
    <Box
      css={theme({
        width: '48px',
        borderTop: 1,
        borderTopColor: 'black20',
        borderStyle: 'dashed'
      })}
    />
    <Flex
      css={theme({
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        border: 1,
        borderColor: 'black10',
        bg: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'secondary'
      })}
    >
      <Hash size={28} />
    </Flex>
  </Flex>
)

export const OVERVIEW = {
  body: (
    <>
      The <Link href='/docs/api/parameters/data'>data</Link> object you send is
      the shape of the JSON you get back. Point a CSS selector at an element,
      pick what to read, and validate the result — Microlink runs the headless
      browser, waits for content, and returns clean JSON.
    </>
  ),
  bullets: [
    'No infrastructure to maintain',
    'Battle-tested browser environment',
    'Handles JavaScript-rendered content',
    'Works with anti-bot detectors (Pro)'
  ],
  sample: `{
  "status": "success",
  "data": {
    "headline": "Show HN: Microlink",
    "link": "https://news.ycombinator.com/…"
  }
}`,
  sampleTitle: 'response.json'
}

export const STEPS = [
  {
    title: 'Request',
    description: 'Send a URL and CSS selectors to the API.'
  },
  {
    title: 'Render',
    description: 'We render the page in a headless browser.'
  },
  {
    title: 'Extract',
    description: 'Your CSS selectors are applied to the page.'
  },
  {
    title: 'Response',
    description: 'You receive structured JSON in one request.'
  }
]

const DATA_OPTIONS = {
  data: {
    headline: { selector: '.titleline > a', attr: 'text' },
    link: { selector: '.titleline > a', attr: 'href', type: 'url' }
  }
}

export const LANGUAGES = buildMqlLanguages({
  url: 'https://news.ycombinator.com',
  options: DATA_OPTIONS,
  comment: 'Extract headline + link from Hacker News'
})

export const QUICK_START = {
  description:
    'Each key inside data becomes a field in the response. No HTML parsing on your side.',
  playgroundHref: '/docs/guides/data-extraction',
  playgroundLabel: 'Try it in Playground →'
}

export const PARAMS = {
  docsHref: '/docs/api/parameters/data',
  rows: [
    {
      name: 'url',
      type: 'string',
      description: 'Target page to extract from.',
      required: true,
      plan: 'Free + Pro'
    },
    {
      name: 'data',
      type: 'object',
      description: 'CSS-selector rules that define the JSON shape.',
      required: false,
      plan: 'Free + Pro'
    },
    {
      name: 'prerender',
      type: "boolean | 'auto'",
      description: 'Force headless Chrome for client-rendered pages.',
      required: false,
      plan: 'Free + Pro'
    },
    {
      name: 'proxy',
      type: 'boolean | string',
      description: 'Automatic or bring-your-own proxy for blocked targets.',
      required: false,
      plan: 'Pro'
    },
    {
      name: 'ttl',
      type: 'string | number',
      description: 'Cache lifetime so repeated extractions are free.',
      required: false,
      plan: 'Pro'
    },
    {
      name: 'headers',
      type: 'object',
      description: 'Forward locale or other public headers to the target.',
      required: false,
      plan: 'Pro'
    }
  ]
}

export const EXAMPLES = {
  moreHref: '/docs/guides/data-extraction',
  items: [
    {
      title: 'Extract article data',
      description: 'Pull headline and canonical link with two rules.',
      snippet: `data: {
  headline: { selector: 'h1', attr: 'text' },
  link: { selector: 'link[rel=canonical]', attr: 'href' }
}`,
      href: '/docs/guides/data-extraction'
    },
    {
      title: 'Product listing',
      description: 'selectorAll returns every match as structured objects.',
      snippet: `data: {
  products: {
    selectorAll: '.product',
    attr: { title: { selector: 'h2', attr: 'text' } }
  }
}`,
      href: '/docs/guides/data-extraction/defining-rules'
    },
    {
      title: 'Jobs board',
      description: 'Collect titles and links across a listing page.',
      snippet: `data: {
  jobs: {
    selectorAll: '.athing',
    attr: {
      title: { selector: '.titleline > a', attr: 'text' }
    }
  }
}`,
      href: '/docs/guides/data-extraction/defining-rules'
    }
  ]
}

export const USE_CASES = [
  {
    title: 'Price monitoring',
    description: 'Track product prices without running your own browsers.',
    icon: 'globe'
  },
  {
    title: 'Lead generation',
    description: 'Turn directory pages into structured contact lists.',
    icon: 'list'
  },
  {
    title: 'Market research',
    description: 'Sample competitor pages at scale with one endpoint.',
    icon: 'radar'
  },
  {
    title: 'Content aggregation',
    description: 'Normalize headlines and links from many sources.',
    icon: 'code'
  },
  {
    title: 'Competitive intel',
    description: 'Watch pricing, copy, and feature pages for changes.',
    icon: 'shield'
  }
]

export const FAQ_RAW = [
  {
    question: 'Can I scrape JavaScript-rendered pages?',
    text: 'Yes. Microlink runs headless Chrome and applies your CSS selectors server-side. For client-rendered content, control rendering with prerender and wait for dynamic elements with waitForSelector before rules are applied.'
  },
  {
    question: 'How does Microlink handle anti-bot protection?',
    text: 'On Pro plans, Microlink detects the antibot provider protecting the target — Cloudflare, DataDome, Akamai, PerimeterX, and more — and automatically routes the request through a dedicated resolution path. Free plans return EPROXYNEEDED when a proxy is required.'
  },
  {
    question: 'Do I need to run a headless browser?',
    text: 'No. Microlink runs headless Chrome on its infrastructure — you send a data object and receive JSON back.'
  },
  {
    question: 'Is data extraction available on the free plan?',
    text: 'Yes. Every rule type works on the free tier (25 requests per day without an API key). Pro plans add automatic proxy resolution, custom headers, and configurable TTL.'
  },
  {
    question: "What happens when a selector doesn't match?",
    text: 'Define a rule as an array of fallbacks and Microlink tries each one in priority order. If nothing matches, the field comes back empty rather than failing the request.'
  },
  {
    question: 'Can I extract data behind a login?',
    text: 'Yes — forward the session as a request header using x-api-header-cookie (Pro). The credential travels inside HTTPS request headers and never appears in the URL.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
