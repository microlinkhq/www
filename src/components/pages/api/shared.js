import React from 'react'
import {
  colors,
  layout,
  breakpoints,
  SECTION_VERTICAL_SPACING,
  theme
} from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import { PRODUCTS, HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'
import { Subhead } from 'components/patterns/ProductStory'
import { TOOLBAR_PRIMARY_HEIGHTS } from 'components/elements/Toolbar'
import { CDN_EDGES } from 'helpers/cdn-edges'
import styled from 'styled-components'

export const ACCENT = colors.link

export const PAGE_NAV_HEIGHT = '52px'

export const META = {
  title: 'Microlink API. One request, any URL',
  description:
    'Turn any URL into screenshots, PDFs, metadata, markdown, embeds, and browser functions. One REST endpoint. 25 requests/day free. No API key to start.',
  structuredName: 'Microlink API',
  structuredDescription:
    'A single REST API that turns any URL into structured data, screenshots, PDFs, markdown, embeds, and browser functions. Free to start. No API key required.',
  keywords:
    'Microlink API, URL to JSON, screenshot API, PDF API, metadata API, markdown API, headless browser API, web scraping API',
  about: [
    {
      name: 'Application Programming Interface',
      sameAs: 'https://en.wikipedia.org/wiki/API'
    },
    {
      name: 'Headless browser',
      sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
    }
  ]
}

export const TOC = [
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'products', label: 'What you can build' },
  { id: 'features', label: 'Features' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'faq', label: 'FAQ' }
]

export const HERO = {
  eyebrow: 'Microlink API',
  title: 'One request. Any URL.',
  description:
    'Screenshots, PDFs, metadata, markdown, embeds, and browser functions from a single REST endpoint. No browser fleet to run.',
  ctaHref: '/pricing',
  ctaLabel: 'Start for free',
  docsHref: '/docs/api/getting-started/overview',
  docsLabel: 'Read the docs'
}

export const HERO_PROOF = [
  'No API key required to start',
  '25 requests per day free',
  `Cached across ${CDN_EDGES} edge locations`
]

export const HERO_EXAMPLES = [
  {
    label: 'Metadata',
    mqlCode: { url: 'https://microlink.io' }
  },
  {
    label: 'Screenshot',
    mqlCode: { url: 'https://microlink.io', screenshot: true }
  },
  {
    label: 'PDF',
    mqlCode: { url: 'https://microlink.io', pdf: true }
  },
  {
    label: 'Markdown',
    mqlCode: {
      url: 'https://microlink.io',
      data: { markdown: { attr: 'markdown' } }
    }
  }
]

export const QUICKSTART = {
  eyebrow: 'Zero to first response',
  title: 'Call the API. No key needed.',
  caption:
    'The free endpoint is a GET. Pass a URL, read JSON. Add a key later when you need more quota, a proxy, or a custom cache TTL.',
  docsHref: '/docs/api/getting-started/overview',
  docsLabel: 'Full quickstart in docs',
  steps: [
    {
      title: 'Pick any URL',
      description:
        'A public page is enough. The API fetches it in a real browser, so client-rendered sites work the same as static HTML.'
    },
    {
      title: 'Hit api.microlink.io',
      description: (
        <>
          GET{' '}
          <Link href='https://api.microlink.io?url=https://microlink.io'>
            api.microlink.io
          </Link>{' '}
          with a <Link href='/docs/api/parameters/url'>url</Link>. Metadata
          comes back by default.
        </>
      )
    },
    {
      title: 'Ask for what you need',
      description: (
        <>
          Add <Link href='/docs/api/parameters/screenshot'>screenshot</Link>,{' '}
          <Link href='/docs/api/parameters/pdf'>pdf</Link>, or{' '}
          <Link href='/docs/api/parameters/markdown'>markdown</Link> on the same
          request. Same endpoint, extra fields.
        </>
      )
    }
  ]
}

const BUILD_KEYS = [
  'screenshot',
  'pdf',
  'metadata',
  'markdown',
  'embed',
  'function',
  'search',
  'text'
]

export const BUILD = BUILD_KEYS.map(key => PRODUCTS[key])

export const INTEGRATIONS = [
  {
    label: 'SDK',
    href: '/integrations/sdk',
    description:
      'One client for every product. Typed methods instead of query strings.'
  },
  {
    label: 'CLI',
    href: '/integrations/cli',
    description: 'Explore the API from your terminal during local development.'
  },
  {
    label: 'MCP',
    href: '/integrations/mcp',
    description: 'Give an AI agent the same URL-to-data API you use in code.'
  },
  {
    label: 'Editor',
    href: '/editor',
    description:
      'Write a request in the browser and run it before you integrate.'
  }
]

export const ENTERPRISE_ITEMS = [
  {
    title: 'Invoice and net 30',
    description:
      'Pay by card or invoice, with your PO number on the invoice. Net 30 terms on Business.'
  },
  {
    title: 'NDA, DPA, and MSA',
    description:
      'A published DPA, plus NDA and service agreement signed on request for your legal team.'
  },
  {
    title: 'Named contact',
    description:
      'The same person for commercial and technical questions. First response within 1 business day.'
  },
  {
    title: 'Dedicated environment',
    description:
      'Your own API endpoint and browser pool on Enterprise. No shared capacity, no noisy neighbors.'
  },
  {
    title: '99.9% uptime SLA',
    description:
      'Backed by service credits. Traffic spikes are served, not throttled.'
  },
  {
    title: 'Your storage and CDN',
    description: `Your own asset store with no TTL cap, plus ${CDN_EDGES} Cloudflare edge nodes.`
  }
]

export const START = {
  title: 'Choose how to get started',
  selfServe: {
    title: 'Build on your own',
    body: 'The free plan is enough to ship a prototype. Pro is the same API with more quota, proxy, custom headers, and configurable TTL.',
    href: '/pricing',
    label: 'See pricing',
    items: [
      '25 requests/day free, no credit card',
      'Every product on one endpoint',
      'SDK, CLI, MCP, and OpenAPI',
      'Upgrade when the quota is the only thing in the way'
    ]
  },
  extra: {
    title: 'Get extra support',
    body: 'Business is Pro, bought the way companies buy. Enterprise is a dedicated environment with an SLA.',
    href: '/enterprise',
    label: 'Talk to us',
    items: [
      'Invoice, net 30, NDA, and DPA',
      'Named contact, no ticket queue',
      'Dedicated endpoint on Enterprise',
      '99.9% uptime SLA'
    ]
  }
}

export const HOW_TO = {
  name: 'How to use the Microlink API',
  description:
    'Pass a URL to api.microlink.io, read JSON, then add query parameters for screenshots, PDFs, markdown, and more.',
  steps: [
    {
      title: 'Pick any URL',
      description:
        'A public page is enough. The API fetches it in a real browser, so client-rendered sites work the same as static HTML.'
    },
    {
      title: 'Call the endpoint',
      description:
        'GET https://api.microlink.io with a url query parameter. No API key is required on the free plan.'
    },
    {
      title: 'Read the JSON',
      description:
        'Metadata is returned by default. Add screenshot, pdf, or markdown on the same request when you need those fields too.'
    }
  ]
}

export const PRICING_CAPTION =
  'No signup, no API key, no credit card. 25 requests/day on the free plan. Pro is the same API with more quota and production controls.'

export const CTA = {
  caption:
    'Hit the endpoint with any URL. 25 requests/day, no account, no card.',
  ctaHref: '/pricing',
  ctaLabel: 'Start for free'
}

export const FAQ_CAPTION =
  'The questions that come up the first time you call the endpoint.'

export { FAQ_ITEMS } from './faq-items'

export const PageRoot = styled(Box)`
  section[id] {
    scroll-margin-top: calc(${TOOLBAR_PRIMARY_HEIGHTS[0]} + ${PAGE_NAV_HEIGHT});
  }

  @media (min-width: ${breakpoints[0]}) {
    section[id] {
      scroll-margin-top: calc(
        ${TOOLBAR_PRIMARY_HEIGHTS[1]} + ${PAGE_NAV_HEIGHT}
      );
    }
  }
`

export const SectionBlock = ({ id, title, caption, bg, children }) => (
  <Flex
    as='section'
    id={id}
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      px: [3, 3, 4, 4],
      py: SECTION_VERTICAL_SPACING,
      ...(bg ? { bg } : null),
      scrollMarginTop: [6, 6, 6, 6]
    })}
  >
    <Box
      css={theme({
        width: '100%',
        maxWidth: HOME_CONTENT_WIDTH
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: ['center', 'center', 'flex-start', 'flex-start'],
          textAlign: ['center', 'center', 'left', 'left'],
          pb: [4, 4, 5, 5]
        })}
      >
        <Subhead titleize={false}>{title}</Subhead>
        {caption && (
          <Text
            css={theme({
              pt: [3, 3, 4, 4],
              maxWidth: layout.normal,
              color: 'black60'
            })}
          >
            {caption}
          </Text>
        )}
      </Flex>
      {children}
    </Box>
  </Flex>
)
