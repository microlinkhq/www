import React from 'react'
import { colors } from 'theme'
import {
  Code as CodeIcon,
  Cpu as CpuIcon,
  Clock as ClockIcon,
  Shield as ShieldIcon,
  Crosshair as CrosshairIcon
} from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.violet7
export const TILE_BG = colors.violet0

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.violet9} 0%,
  ${colors.violet9} 48%,
  ${colors.violet8} 48%,
  ${colors.violet8} 52%,
  ${colors.indigo8} 52%,
  ${colors.indigo8} 65%,
  ${colors.violet7} 65%,
  ${colors.violet7} 79%,
  ${ACCENT} 79%,
  ${ACCENT} 100%
)`

export const HERO = {
  title: 'Rendered HTML API for developers',
  description:
    'Get the HTML a real browser sees, after JavaScript has run. One REST call returns the fully hydrated DOM of any URL, no headless Chrome to operate.',
  ctaHref: '/docs/api/parameters/data',
  ctaLabel: 'Get Started',
  mqlCode: {
    url: 'https://vercel.com',
    data: { html: { attr: 'html' } },
    meta: false
  }
}

export const TIMINGS = {
  title: 'Send the URL',
  subtitle: 'Get the rendered HTML back',
  stats: [
    { healthcheckKey: 'meta', label: 'P95 cold response' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CAPABILITIES = {
  title: 'The DOM after JavaScript,',
  titleAccent: 'not before.',
  caption:
    'A plain HTTP fetch gives you an empty shell on any modern site. Microlink boots a real browser, waits for the app to hydrate, and hands back the markup that actually rendered.',
  items: [
    {
      icon: CpuIcon,
      title: 'JavaScript fully executed',
      description:
        'React, Vue, Svelte and Angular apps are rendered before capture. Client-side routes, hydrated content and lazy sections are all in the response.'
    },
    {
      icon: ClockIcon,
      title: 'Wait for what matters',
      description:
        'Control readiness with waitUntil and waitFor. Block until the network settles, or until a specific selector exists on the page.'
    },
    {
      icon: CrosshairIcon,
      title: 'Scope to a selector',
      description:
        'Return the whole document or just the subtree you care about. Smaller payloads, less parsing, lower token cost downstream.'
    },
    {
      icon: ShieldIcon,
      title: 'Gets past the hard pages',
      description: (
        <>
          Residential <Link href='/features/proxy'>proxy resolution</Link> and{' '}
          <Link href='/features/antibot'>antibot detection</Link> handle the
          sites that block plain fetches.
        </>
      )
    },
    {
      icon: CodeIcon,
      title: 'Pairs with every other output',
      description: (
        <>
          Ask for HTML alongside <Link href='/markdown'>markdown</Link>,{' '}
          <Link href='/text'>text</Link>, <Link href='/metadata'>metadata</Link>{' '}
          or a <Link href='/screenshot'>screenshot</Link> in the same request.
        </>
      )
    }
  ]
}

export const PRICING_CAPTION =
  'No signup, no API key, no credit card. The rendered HTML API is free to start — just call the endpoint.'

export const CTA = {
  caption:
    'Get 25 requests/day with zero commitment. The rendered HTML API is free to use, with no account and no credit card. Call it and start parsing real markup in seconds.',
  ctaHref: '/docs/api/parameters/data',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'Everything you need to know about the Microlink rendered HTML API.'

export const FAQ_ITEMS = [
  {
    question: 'How is this different from fetching the URL myself?',
    text: 'A plain HTTP fetch returns whatever the server sent — on a single-page app that is usually an empty div. Microlink loads the URL in a real Chromium instance, runs the JavaScript, waits for the page to settle, and returns the resulting DOM, so you get the markup a user would actually see.',
    answer: (
      <>
        <div>
          A plain HTTP fetch returns whatever the server sent — on a single-page
          app that is usually an empty div. Microlink loads the URL in a real{' '}
          <Link href='/blog/what-is-a-headless-browser'>browser</Link>, runs the
          JavaScript, waits for the page to settle, and returns the resulting
          DOM.
        </div>
        <div>
          You get the markup a user would actually see, without operating
          Chromium yourself.
        </div>
      </>
    )
  },
  {
    question: 'Can I get only part of the page instead of the whole document?',
    text: 'Yes. Scope the response to a CSS selector so you receive just that subtree rather than the entire document. This keeps payloads small and cuts the parsing and token cost of anything you do downstream.'
  },
  {
    question: 'How do I make sure the page is fully loaded before capture?',
    text: 'Use waitUntil to choose the network condition to block on, and waitFor to block until a specific selector appears or for a fixed duration. Together they cover slow hydration, lazy-loaded sections and client-side routing.'
  },
  {
    question: 'What happens on sites that block automated requests?',
    text: 'Microlink runs every request in an isolated browser with a real fingerprint. For hard targets you can enable proxy resolution to route through residential IPs, and antibot detection tells you exactly which provider blocked a request and why.'
  },
  {
    question: 'Does every call boot a browser?',
    text: 'Only on a cache miss. Set a ttl and any repeat request for the same URL inside that window is served from the edge cache instantly, at no cost and without booting a browser.'
  },
  {
    question: 'Can I get HTML and other formats in one request?',
    text: 'Yes. HTML, markdown, text, metadata, screenshots and PDFs all come from the same endpoint, so a single call can return several representations of the same page without paying for repeated renders.'
  }
]

export const META = {
  title: 'Rendered HTML API - HTML After JavaScript',
  description:
    'Get the fully rendered HTML of any URL after JavaScript executes. Real browser rendering, CSS selector scoping, proxy support and edge caching. 25 free requests/day.',
  structuredName: 'Microlink HTML API',
  structuredDescription:
    'A developer-first API that returns the fully rendered HTML of any URL after JavaScript execution, with CSS selector scoping, configurable readiness conditions, residential proxy resolution and global edge caching.',
  keywords: [
    'rendered html api',
    'url to html api',
    'javascript rendering api',
    'headless browser html',
    'dom scraping api',
    'server side rendering api'
  ],
  about: [
    {
      name: 'HTML',
      sameAs: 'https://en.wikipedia.org/wiki/HTML'
    },
    {
      name: 'Document Object Model',
      sameAs: 'https://en.wikipedia.org/wiki/Document_Object_Model'
    },
    {
      name: 'Headless browser',
      sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
    }
  ]
}
