import React from 'react'
import { MousePointer } from 'react-feather'

import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import { theme } from 'theme'

import {
  buildMqlLanguages,
  faqFromItems
} from 'components/patterns/FeatureStory'

export const META = {
  title: 'Browser Automation API: Control the Page Before Capture',
  description:
    'Control a headless browser via query parameters — click elements, scroll, wait for dynamic content, emulate devices and dark mode, inject CSS or JavaScript, and block ads and cookie banners by default. The same parameters apply to screenshots, PDFs, metadata, and data extraction, and they all work on the free tier.'
}

export const HERO = {
  name: 'Browser Automation',
  title: 'Browser Automation',
  description:
    'Click, scroll, wait, emulate devices, and inject CSS or JavaScript — shape the page before every capture.',
  primaryCta: {
    label: 'Try it in Playground →',
    href: '/blog/browser-automation'
  },
  secondaryCta: {
    label: 'View API docs',
    href: '/docs/api/parameters/click'
  },
  plans: [
    { plan: 'Free', description: 'Every browser parameter on every output.' },
    { plan: 'Pro', description: 'Proxy, headers, and configurable TTL on top.' }
  ]
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
      color: 'green7'
    })}
  >
    <MousePointer size={36} />
  </Flex>
)

export const OVERVIEW = {
  body: (
    <>
      Declarative query parameters control the headless browser on every
      request. The page state you shape is the page every output sees —{' '}
      <Link href='/screenshot'>screenshots</Link>, <Link href='/pdf'>PDFs</Link>
      , <Link href='/metadata'>metadata</Link>, and{' '}
      <Link href='/features/scraping'>data extraction</Link> alike.
    </>
  ),
  bullets: [
    'Click, scroll, and wait before capture',
    'Device presets, dark mode, and print styles',
    'Inject CSS or JavaScript when you need it',
    'Adblock on by default — banners and trackers stay out'
  ],
  sample: `{
  "screenshot": {
    "url": "https://cdn.microlink.io/…",
    "width": 393,
    "height": 852
  }
}`,
  sampleTitle: 'response.json'
}

export const STEPS = [
  {
    title: 'Request',
    description: 'Send url plus declarative browser parameters on any workflow.'
  },
  {
    title: 'Emulate',
    description: 'Apply device, viewport, colorScheme, and mediaType.'
  },
  {
    title: 'Interact',
    description: 'click, scroll, and wait* shape the live page state.'
  },
  {
    title: 'Capture',
    description: 'The same prepared page feeds screenshot, pdf, data, and meta.'
  }
]

export const LANGUAGES = buildMqlLanguages({
  url: 'https://example.com',
  options: {
    screenshot: true,
    device: 'iPhone 15 Pro',
    colorScheme: 'dark',
    meta: false
  },
  comment: 'Dark-mode iPhone screenshot'
})

export const QUICK_START = {
  description:
    'A single device value sets viewport, user agent, and resolution. Compose with colorScheme, click, and waitForSelector.',
  playgroundHref: '/docs/guides/screenshot/browser-settings'
}

export const PARAMS = {
  docsHref: '/docs/api/parameters/click',
  rows: [
    {
      name: 'click',
      type: 'string | string[]',
      description: 'Click DOM elements by CSS selector before capture.',
      required: false,
      plan: 'Free + Pro'
    },
    {
      name: 'waitForSelector',
      type: 'string',
      description: 'Pause until an element exists in the DOM.',
      required: false,
      plan: 'Free + Pro'
    },
    {
      name: 'device',
      type: 'string',
      description: 'Device preset (viewport + UA + resolution).',
      required: false,
      plan: 'Free + Pro'
    },
    {
      name: 'colorScheme',
      type: "'light' | 'dark'",
      description: 'Force prefers-color-scheme.',
      required: false,
      plan: 'Free + Pro'
    },
    {
      name: 'styles',
      type: 'string | string[]',
      description: 'Inject CSS before render.',
      required: false,
      plan: 'Free + Pro'
    },
    {
      name: 'prerender',
      type: "boolean | 'auto'",
      description: 'Force or auto-enable headless Chrome for SPAs.',
      required: false,
      plan: 'Free + Pro'
    }
  ]
}

export const EXAMPLES = {
  moreHref: '/blog/browser-automation',
  items: [
    {
      title: 'Dark mode iPhone',
      description: 'Device + colorScheme on a single screenshot request.',
      snippet: `screenshot: true,
device: 'iPhone 15 Pro',
colorScheme: 'dark'`,
      href: '/docs/api/parameters/device'
    },
    {
      title: 'Click, wait, extract',
      description: 'Open a tab, wait for price, then run data rules.',
      snippet: `click: '.tab-annual',
waitForSelector: '.price',
data: { price: { selector: '.price', attr: 'text' } }`,
      href: '/docs/guides/data-extraction/page-preparation'
    },
    {
      title: 'Hide UI with styles',
      description: 'Inject CSS for site-specific chrome adblock misses.',
      snippet: "styles: ['.cookie-banner { display: none !important }']",
      href: '/docs/api/parameters/styles'
    }
  ]
}

export const USE_CASES = [
  {
    title: 'Mobile & dark-mode QA',
    description: 'Capture what an iPhone user would see.',
    icon: 'mouse'
  },
  {
    title: 'SPA scraping',
    description: 'Click tabs and wait before data extraction.',
    icon: 'code'
  },
  {
    title: 'Clean screenshots',
    description: 'Adblock strips ads and cookie banners by default.',
    icon: 'shield'
  },
  {
    title: 'Print / theme overrides',
    description: 'mediaType and styles rewrite the page before PDF.',
    icon: 'list'
  },
  {
    title: 'Escalate to functions',
    description: 'When params stop being enough, use full Puppeteer.',
    icon: 'globe'
  }
]

export const FAQ_RAW = [
  {
    question: 'Can I click or scroll before the capture happens?',
    text: 'Yes. The click parameter clicks DOM elements matching CSS selectors, and scroll brings a specific element into view. Both mutate the browser page state before any output is produced.'
  },
  {
    question: 'How do I wait for dynamic content to render?',
    text: 'Use waitForSelector for a specific element, waitUntil for lifecycle events, or waitForTimeout for a fixed delay. For SPAs, prerender makes sure client-rendered content is executed before capture.'
  },
  {
    question: 'Can I emulate a mobile device or dark mode?',
    text: 'Yes. A single device value sets viewport, user agent, and resolution. colorScheme forces prefers-color-scheme to light or dark.'
  },
  {
    question: 'How do I get rid of cookie banners and ads?',
    text: 'Adblock is enabled by default and blocks advertisements, trackers, and cookie-consent services. For anything site-specific, inject a styles rule or use click to dismiss it.'
  },
  {
    question: 'Do these parameters work on the free plan?',
    text: 'Yes — every browser automation parameter works on the free tier across every output. Pro adds proxy resolution, custom headers, and configurable TTL.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
