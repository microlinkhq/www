import React from 'react'
import { colors } from 'theme'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.cyan7

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.cyan9} 0%,
  ${colors.cyan9} 48%,
  ${colors.cyan8} 48%,
  ${colors.cyan8} 52%,
  ${ACCENT} 52%,
  ${ACCENT} 65%,
  ${colors.teal7} 65%,
  ${colors.teal7} 79%,
  ${colors.teal6} 79%,
  ${colors.teal6} 100%
)`

const PAGE_URL = 'https://microlink.io/alternative/scrapingbee'

export const META = {
  title: 'ScrapingBee Alternative: Requests, Not Credits',
  description:
    'A ScrapingBee alternative that counts one request per API call — no credit multipliers. Screenshot, PDF, markdown, metadata and insights, one endpoint.'
}

export const HERO = {
  title: 'The ScrapingBee alternative without credit math',
  description:
    'ScrapingBee prices a rendered page at 5 credits, a premium proxy at 25 and stealth at 75. Microlink counts one request per API call — and returns a screenshot, the markdown and the metadata from that same call.',
  ctaHref: '/docs/guides',
  ctaLabel: 'Get Started',
  mqlCode: {
    url: 'https://stripe.com/blog/payment-api-design',
    screenshot: true,
    data: { markdown: { attr: 'markdown' } }
  }
}

export const TIMINGS = {
  title: 'Send the URL',
  subtitle: 'Get every format back',
  stats: [
    { healthcheckKey: 'screenshot', label: 'P95 screenshot' },
    { healthcheckKey: 'meta', label: 'P95 metadata' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const COMPARISON = {
  title: 'Feature by feature.',
  caption: (
    <>
      Both APIs render pages in a real browser and return HTML, markdown,
      screenshots and extracted fields. The differences are what a request
      costs, what else comes back with it, and what is on by default. Every
      ScrapingBee row below is taken from{' '}
      <Link href='https://www.scrapingbee.com/documentation/'>
        their documentation
      </Link>
      .
    </>
  ),
  columns: ['Microlink', 'ScrapingBee'],
  rows: [
    {
      label: 'Billing unit',
      microlink: 'One request per API call, whatever the call does',
      microlinkHref: '/pricing',
      scrapingbee: 'Credits: 5 rendered, 10–25 premium proxy, 75 stealth'
    },
    {
      label: 'Ads, trackers and cookie banners',
      microlink: 'Blocked by default — adblock defaults to true',
      microlinkHref: '/features/adblock',
      scrapingbee: 'Opt-in — block_ads defaults to false'
    },
    {
      label: 'Response caching',
      microlink: 'Configurable TTL, 1 minute to 31 days, served from the edge',
      microlinkHref: '/features/ttl',
      scrapingbee: 'Not documented'
    },
    {
      label: 'PDF of the page',
      microlink: 'pdf: true on any request',
      microlinkHref: '/pdf',
      scrapingbee: 'Not documented'
    },
    {
      label: 'Page metadata',
      microlink: 'Title, description, author, date, logo, image, publisher',
      microlinkHref: '/metadata',
      scrapingbee: 'Not documented'
    },
    {
      label: 'Performance and stack',
      microlink: 'Lighthouse report and technology detection per URL',
      microlinkHref: '/insights',
      scrapingbee: 'Not documented'
    },
    {
      label: 'Markdown',
      microlink: 'data.markdown on any URL, PDF or office document',
      microlinkHref: '/markdown',
      scrapingbee: 'return_page_markdown'
    },
    {
      label: 'Screenshots',
      microlink: 'Full page, element, any device, any viewport',
      microlinkHref: '/screenshot',
      scrapingbee: 'screenshot, screenshot_full_page, screenshot_selector'
    },
    {
      label: 'Structured extraction',
      microlink: 'Declarative CSS and regex rules with typed output',
      microlinkHref: '/features/scraping',
      scrapingbee: 'CSS rules, plus AI-described rules'
    },
    {
      label: 'Page interaction',
      microlink: 'click, scroll, waitForSelector, scripts, styles',
      microlinkHref: '/features/automation',
      scrapingbee: 'js_scenario'
    },
    {
      label: 'Hard targets',
      microlink: 'proxy: true, residential routing included on Pro',
      microlinkHref: '/features/proxy',
      scrapingbee: 'Premium and stealth proxies, priced per credit tier'
    },
    {
      label: 'MCP server',
      microlink: 'Twenty tools for agents',
      microlinkHref: '/integrations/mcp',
      scrapingbee: 'Remote MCP'
    },
    {
      label: 'Free tier',
      microlink: '25 requests every day, no card, no expiry',
      microlinkHref: '/pricing',
      scrapingbee: '1,000 credits to trial, no card'
    }
  ]
}

export const BILLING = {
  title: 'What a credit buys.',
  caption:
    'ScrapingBee publishes a multiplier per option. The same 250,000 credits buy a very different number of pages depending on what each page needs.',
  columns: ['Configuration', 'Credits each', '250,000 credits buy'],
  rows: [
    { config: 'Rendered page', credits: '5', pages: '50,000 pages' },
    {
      config: 'Premium proxy, no rendering',
      credits: '10',
      pages: '25,000 pages'
    },
    {
      config: 'Premium proxy, rendered',
      credits: '25',
      pages: '10,000 pages'
    },
    { config: 'Stealth proxy', credits: '75', pages: '3,333 pages' }
  ],
  footnote: (
    <>
      Multipliers are ScrapingBee&#39;s own, published in{' '}
      <Link href='https://www.scrapingbee.com/documentation/'>
        their documentation
      </Link>
      ; the third column is that arithmetic. Microlink has no multiplier: a
      rendered page and a proxied page are each one request against the plan you
      pick on <Link href='/pricing'>pricing</Link>, and proxy resolution is
      included on Pro.
    </>
  )
}

export const HONESTY = {
  title: 'When ScrapingBee is the better pick.',
  caption:
    'A comparison page that only flatters the vendor writing it is worth nothing. Four cases where the answer is ScrapingBee.',
  items: [
    {
      title: 'Published concurrency',
      body: 'ScrapingBee states a concurrency figure on every plan, from 25 on Hobby up to 400 on Business+. If a fixed number of parallel workers is the constraint you are buying against, that number is the one to compare.'
    },
    {
      title: 'A dedicated stealth tier',
      body: 'Stealth proxies are a separate, explicitly priced product for the hardest targets. Microlink resolves proxies automatically and does not sell an escalation tier above that.'
    },
    {
      title: 'Extraction described in prose',
      body: 'ai_query and ai_extract_rules let you ask for a field in plain language. Microlink extraction is declarative CSS and regex rules — precise and repeatable, but you write the selector.'
    },
    {
      title: 'Very high scraping volume',
      body: 'Enterprise plans reach into tens of millions of credits per month. If crawling breadth is the whole job and metadata, PDF and insights are not, that ceiling matters more than format breadth.'
    }
  ]
}

export const PRICING_CAPTION = (
  <>
    One request counted whether the call renders or proxies — there is no
    multiplier to budget around. Start on the free tier and move to Pro when the
    daily ceiling gets in the way.
  </>
)

export const CTA = {
  caption:
    'Point a request at the URL you are scraping today and compare the response with the one you get back now. No signup for the first call.',
  ctaHref: '/docs/guides',
  ctaLabel: 'Run your first request'
}

export const FAQ_CAPTION =
  'What changes, what does not, and what a migration actually involves.'

export const FAQ_ITEMS = [
  {
    question: 'Is Microlink a drop-in replacement for ScrapingBee?',
    text: 'No — the request shape is different. ScrapingBee takes url plus flags such as render_js and premium_proxy; Microlink takes url plus the products you want back, such as screenshot, pdf or a data block. Most migrations are a single call site: the target URL stays the same, render_js becomes the default behaviour, premium_proxy becomes proxy, and js_scenario becomes click, scroll and waitForSelector.',
    answer: (
      <div>
        No — the request shape is different. ScrapingBee takes a url plus flags
        such as <code>render_js</code> and <code>premium_proxy</code>; Microlink
        takes a <Link href='/docs/api/parameters/url'>url</Link> plus the
        products you want back, such as{' '}
        <Link href='/docs/api/parameters/screenshot'>screenshot</Link>,{' '}
        <Link href='/docs/api/parameters/pdf'>pdf</Link> or a{' '}
        <Link href='/docs/api/parameters/data'>data</Link> block. Most
        migrations are a single call site: the target URL stays the same,{' '}
        <code>render_js</code> becomes the default behaviour,{' '}
        <code>premium_proxy</code> becomes{' '}
        <Link href='/docs/api/parameters/proxy'>proxy</Link>, and{' '}
        <code>js_scenario</code> becomes{' '}
        <Link href='/docs/api/parameters/click'>click</Link>,{' '}
        <Link href='/docs/api/parameters/scroll'>scroll</Link> and{' '}
        <Link href='/docs/api/parameters/waitForSelector'>waitForSelector</Link>
        .
      </div>
    )
  },
  {
    question: 'How do credits compare to requests?',
    text: 'ScrapingBee charges 5 credits for a rendered page, 10 or 25 for a premium proxy depending on whether the page renders, and 75 for a stealth proxy. Microlink charges one request per API call regardless of what the call does, so the number on your plan is the number of pages you can fetch. Compare plans by pages, not by the headline credit figure.'
  },
  {
    question: 'Does Microlink render JavaScript?',
    text: 'Yes. Requests run in a real browser, so single-page apps return the content a visitor would see. The prerender parameter defaults to auto, which decides per URL whether a browser is needed or a plain HTTP fetch already returns the content — the fast path when the page does not need a browser.',
    answer: (
      <div>
        Yes. Requests run in a real browser, so single-page apps return the
        content a visitor would see. The{' '}
        <Link href='/docs/api/parameters/prerender'>prerender</Link> parameter
        defaults to <code>auto</code>, which decides per URL whether a browser
        is needed or a plain HTTP fetch already returns the content — the fast
        path when the page does not need a browser.
      </div>
    )
  },
  {
    question: 'Can I bring my own proxy?',
    text: 'Yes. Pass proxy: true for managed residential routing, included on any Pro plan, or pass your own proxy server as a URL string to route through a pool you already pay for. The x-fetch-mode response header confirms which path a request took.',
    answer: (
      <div>
        Yes. Pass <code>proxy: true</code> for managed residential routing,
        included on any <Link href='/pricing'>Pro</Link> plan, or pass your own
        proxy server as a URL string to route through a pool you already pay
        for. The <code>x-fetch-mode</code> response header confirms which path a
        request took. See <Link href='/features/proxy'>proxy resolution</Link>.
      </div>
    )
  },
  {
    question: 'What does the free tier include?',
    text: 'Twenty-five requests per day, forever, with no credit card. Screenshot, PDF, metadata, markdown, insights and the SDK are all included, along with the global edge cache and adblock. The daily allowance renews, so evaluation never runs out mid-test.'
  },
  {
    question: 'Do cached responses still cost a request?',
    text: 'Yes, a cached response counts as a request — but it is served from the edge in milliseconds and does not consume concurrency. Set the ttl parameter anywhere from 1 minute to 31 days to decide how often a URL is fetched again.',
    answer: (
      <div>
        Yes, a cached response counts as a request — but it is served from the
        edge in milliseconds and does not consume concurrency. Set the{' '}
        <Link href='/docs/api/parameters/ttl'>ttl</Link> parameter anywhere from
        1 minute to 31 days to decide how often a URL is fetched again.
      </div>
    )
  }
]

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: META.title,
    description: META.description,
    url: PAGE_URL,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Microlink',
      applicationCategory: ['DeveloperApplication', 'WebAPI'],
      url: 'https://microlink.io',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        url: 'https://microlink.io/pricing'
      }
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text
      }
    }))
  }
]
