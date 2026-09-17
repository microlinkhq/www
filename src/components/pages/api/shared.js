import React from 'react'
import {
  colors,
  layout,
  breakpoints,
  shadows,
  shadowInk,
  transition,
  SECTION_VERTICAL_SPACING,
  theme
} from 'theme'
import {
  Activity,
  Code,
  Database,
  FileText,
  Package,
  Server,
  Shield,
  UserCheck
} from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import { Brain } from 'components/icons/Brain'
import { Terminal } from 'components/icons/Terminal'
import {
  PRODUCTS,
  PRODUCT_TILES,
  HOME_CONTENT_WIDTH
} from 'components/pages/home/catalog'
import heroDemoRequests from 'components/pages/home/hero-demo-requests'
import { Subhead } from 'components/patterns/ProductStory'
import { TOOLBAR_PRIMARY_HEIGHTS } from 'components/elements/Toolbar'
import { CDN_EDGES } from 'helpers/cdn-edges'
import styled, { css } from 'styled-components'

export const ACCENT = colors.link

export const PAGE_NAV_HEIGHT = '52px'

export const META = {
  title: 'Microlink API. One request, any URL',
  description:
    'Turn any URL into screenshots, PDFs, metadata, markdown, embeds, and browser functions. One REST endpoint. 25 requests/day free. No API key to start.',
  structuredName: 'Microlink API',
  structuredDescription:
    'A single REST API that turns any URL into structured data, screenshots, PDFs, markdown, HTML, text, embeds, and browser functions. Free to start, with no API key needed on the free plan.',
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
    'Screenshots, PDFs, metadata, markdown, HTML, text, embeds, and browser functions from a single REST endpoint. No browser fleet to run.',
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

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.blue9} 0%,
  ${colors.blue9} 48%,
  ${colors.blue8} 48%,
  ${colors.blue8} 52%,
  ${colors.indigo8} 52%,
  ${colors.indigo8} 65%,
  ${colors.blue7} 65%,
  ${colors.blue7} 79%,
  ${ACCENT} 79%,
  ${ACCENT} 100%
)`

export const TIMINGS = {
  title: 'One endpoint,',
  subtitle: 'production-ready speed.',
  stats: [
    { healthcheckKey: 'screenshot', label: 'Screenshot P95' },
    { healthcheckKey: 'meta', label: 'Metadata P95' },
    { value: '99.9', unit: '%', label: 'SLA on paid plans' }
  ]
}

const { DEMO_URLS } = heroDemoRequests

export const HERO_EXAMPLES = [
  {
    label: 'Metadata',
    mqlCode: { url: DEMO_URLS.metadata }
  },
  {
    label: 'Screenshot',
    mqlCode: { url: DEMO_URLS.screenshot, screenshot: true }
  },
  {
    label: 'PDF',
    mqlCode: { url: DEMO_URLS.pdf, pdf: true }
  },
  {
    label: 'Markdown',
    mqlCode: {
      url: DEMO_URLS.markdown,
      data: { markdown: { attr: 'markdown' } }
    }
  },
  {
    label: 'HTML',
    mqlCode: {
      url: 'https://stripe.com',
      data: { html: { attr: 'html' } }
    }
  },
  {
    label: 'Text',
    mqlCode: {
      url: DEMO_URLS.text,
      data: { text: { attr: 'text' } }
    }
  },
  {
    label: 'URLs',
    mqlCode: {
      url: DEMO_URLS.markdown,
      data: { links: { selectorAll: 'a', attr: 'href', type: 'url' } }
    }
  },
  {
    label: 'Emails',
    mqlCode: {
      url: 'https://microlink.io',
      data: { emails: { selector: 'html', attr: 'html', type: 'email' } }
    }
  },
  {
    label: 'Embed',
    mqlCode: { url: DEMO_URLS.embed, iframe: true }
  }
]

export const QUICKSTART = {
  title: 'Call the API. No key needed.',
  caption:
    'The free endpoint is a GET. Pass a URL, read JSON. Add a key later when you need Search, more quota, a proxy, or a custom cache TTL.',
  docsHref: '/docs/api/getting-started/overview',
  docsLabel: 'Full quickstart in docs',
  steps: [
    {
      title: 'Pick any URL',
      description:
        'A public page is enough. The API detects when a page needs a headless browser, so client-rendered sites work as well as static HTML.',
      code: 'https://github.com'
    },
    {
      title: 'Hit api.microlink.io',
      code: '?url=https://github.com',
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
      code: '&screenshot=true',
      description: (
        <>
          Add <Link href='/docs/api/parameters/screenshot'>screenshot</Link>,{' '}
          <Link href='/docs/api/parameters/pdf'>pdf</Link>, or{' '}
          <Link href='/docs/guides/content-conversion/url-to-markdown'>
            markdown
          </Link>{' '}
          on the same request. Same endpoint, extra fields.
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

const PRO_ONLY_KEYS = ['search']

const BUILD_DESCRIPTIONS = {
  screenshot:
    'Pixel-perfect PNG or JPEG captures of any page, full page or a single element.',
  pdf: 'Print-ready PDFs from any URL, with paper size, margins, and page ranges.',
  metadata:
    'Normalized title, description, image, logo, and more from any page.',
  markdown: 'Web pages, PDFs, and Office documents as clean markdown for LLMs.',
  embed: 'Ready-to-paste iframes for 300+ providers like YouTube and Spotify.',
  function: 'Run your own Puppeteer code on any page, with npm packages.',
  search:
    'Google results as structured JSON: web, news, images, places, and more.',
  text: 'Readable plain text from any page or document, without the markup.'
}

export const BUILD = BUILD_KEYS.map(key => ({
  ...PRODUCTS[key],
  description: BUILD_DESCRIPTIONS[key],
  tile: PRODUCT_TILES[key],
  isPro: PRO_ONLY_KEYS.includes(key)
}))

export const INTEGRATIONS = [
  {
    label: 'SDK',
    href: '/integrations/sdk',
    icon: Package,
    hue: 'blue',
    description:
      'One client for every product. Typed methods instead of query strings.'
  },
  {
    label: 'CLI',
    href: '/integrations/cli',
    icon: Terminal,
    hue: 'indigo',
    description: 'Explore the API from your terminal during local development.'
  },
  {
    label: 'MCP',
    href: '/integrations/mcp',
    icon: Brain,
    hue: 'violet',
    description: 'Give an AI agent the same URL-to-data API you use in code.'
  },
  {
    label: 'Editor',
    href: '/editor',
    icon: Code,
    hue: 'pink',
    description:
      'Write a request in the browser and run it before you integrate.'
  }
]

export const ENTERPRISE_ITEMS = [
  {
    title: 'Invoice and net 30',
    icon: FileText,
    hue: 'green',
    description:
      'Pay by card or invoice, with your PO number on the invoice. Net 30 terms on Business.'
  },
  {
    title: 'NDA, DPA, and MSA',
    icon: Shield,
    hue: 'violet',
    description:
      'A published DPA, plus NDA and service agreement signed on request for your legal team.'
  },
  {
    title: 'Named contact',
    icon: UserCheck,
    hue: 'blue',
    description:
      'The same person for commercial and technical questions. First response within 1 business day on Business, 12 hours on Enterprise.'
  },
  {
    title: 'Dedicated environment',
    icon: Server,
    hue: 'indigo',
    description:
      'Your own API endpoint and browser pool on Enterprise. No shared capacity, no noisy neighbors.'
  },
  {
    title: '99.9% uptime SLA',
    icon: Activity,
    hue: 'teal',
    description:
      'On every paid plan. Enterprise adds service credits and no rate limits, so traffic spikes are served, not throttled.'
  },
  {
    title: 'Your storage and CDN',
    icon: Database,
    hue: 'orange',
    description: `On Enterprise, your own asset store with no TTL cap and your own CDN across ${CDN_EDGES} Cloudflare edge nodes.`
  }
]

export const HOW_TO = {
  name: 'How to use the Microlink API',
  description:
    'Pass a URL to api.microlink.io, read JSON, then add query parameters for screenshots, PDFs, markdown, and more.',
  steps: [
    {
      title: 'Pick any URL',
      description:
        'A public page is enough. The API detects when a page needs a headless browser, so client-rendered sites work as well as static HTML.'
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

export const tileColors = hue => ({
  bg: colors[`${hue}0`],
  color: colors[`${hue}7`]
})

export const IconTile = ({ icon: Icon, tile }) => (
  <Flex
    aria-hidden='true'
    css={[
      theme({
        width: '40px',
        height: '40px',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }),
      { background: tile.bg, color: tile.color }
    ]}
  >
    <Icon width='20px' height='20px' />
  </Flex>
)

export const CardGrid = styled(Box).attrs(({ as }) => ({ as: as || 'ul' }))`
  ${theme({
    display: 'grid',
    gap: 3,
    width: '100%',
    listStyle: 'none',
    p: 0,
    m: 0
  })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(
      ${({ $tabletColumns = 2 }) => $tabletColumns},
      minmax(0, 1fr)
    );
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(
      ${({ $columns }) => $columns},
      minmax(0, 1fr)
    );
  }
`

const CARD_STYLES = {
  bg: 'white',
  border: 1,
  borderColor: 'gray2',
  borderRadius: 4,
  p: [3, 3, 4, 4],
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  color: 'black',
  boxShadow: shadows[1]
}

const CARD_HOVER_SHADOW = `0 22px 46px -28px rgba(${shadowInk}, 0.35)`

export const StaticCard = styled(Box)(theme(CARD_STYLES))

export const LinkCard = styled(Link)(
  theme({
    ...CARD_STYLES,
    textDecoration: 'none',
    _hover: { color: 'black' }
  }),
  css`
    transition: border-color ${transition.medium},
      box-shadow ${transition.medium};

    > a {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      height: 100%;
      color: inherit;
      text-decoration: none;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: ${({ $accent }) => $accent || colors.gray4};
        box-shadow: ${CARD_HOVER_SHADOW};
      }

      @media (prefers-reduced-motion: no-preference) {
        transition: border-color ${transition.medium},
          box-shadow ${transition.medium}, transform ${transition.medium};

        &:hover {
          transform: translateY(-1px);
        }
      }
    }
  `
)

export const CardTitle = styled(Text).attrs({ as: 'h3' })(
  theme({
    m: 0,
    pt: 3,
    color: 'black',
    fontWeight: 'bold',
    minWidth: 0
  })
)

export const CardText = styled(Text)(
  theme({
    pt: 2,
    color: 'black70',
    fontSize: 1,
    lineHeight: 2,
    flex: 1
  })
)
