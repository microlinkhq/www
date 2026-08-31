import React from 'react'
import { colors } from 'theme'

import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { GradientText } from 'components/patterns/ProductStory'

export const ACCENT_NAME = 'cyan'
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
  title: 'ScrapingBee Alternative You Can Forecast',
  description:
    'A ScrapingBee alternative where one API call is one request, so plan size is page count. No 1-to-75 credit multipliers to model before you can budget.'
}

export const HERO = {
  title: 'The ScrapingBee alternative you can forecast',
  description: (
    <Text as='span'>
      On ScrapingBee, 250,000 credits buys 250,000 pages or 3,333 — the flags on
      each request decide which. Microlink counts one request per API call, so
      the number on the plan is the number of pages, and that call still returns
      the screenshot, the markdown and the metadata together.
    </Text>
  ),
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
  title: (
    <>
      <GradientText>Feature by feature</GradientText>, side by side.
    </>
  ),
  caption: (
    <>
      Both APIs render pages in a real browser and return HTML, markdown,
      screenshots and extracted fields. The differences are what a request
      costs, what else comes back with it, and what is on by default. Every
      ScrapingBee row is taken from their{' '}
      <Link href='https://www.scrapingbee.com/documentation/'>
        documentation
      </Link>
      ,{' '}
      <Link href='https://help.scrapingbee.com/en/category/api-hoss7h/'>
        knowledge base
      </Link>{' '}
      and <Link href='https://www.scrapingbee.com/pricing/'>pricing page</Link>,
      including the last three, where ScrapingBee has capabilities Microlink
      does not.
    </>
  ),
  columns: ['Microlink', 'ScrapingBee'],
  rows: [
    {
      feature: 'Billing unit',
      href: '/pricing',
      microlink: '1 request',
      scrapingbee: '1–75 credits',
      highlight: true,
      note: 'ScrapingBee: 1 credit static, 5 rendered, 10–25 premium proxy, 75 stealth. A Microlink request costs the same whatever it carries.'
    },
    {
      feature: 'Response caching',
      href: '/features/ttl',
      microlink: true,
      scrapingbee: false,
      highlight: true,
      note: 'TTL from 1 minute to 31 days and cache hits are free. ScrapingBee states it does not cache requests at all.'
    },
    {
      feature: 'Ads, trackers and cookie banners',
      href: '/features/adblock',
      microlink: true,
      scrapingbee: 'Opt-in',
      highlight: true,
      note: 'adblock defaults to true on Microlink; block_ads defaults to false on ScrapingBee.'
    },
    {
      feature: 'Page metadata',
      href: '/metadata',
      microlink: true,
      scrapingbee: false,
      highlight: true,
      note: 'Title, description, author, date, logo, image and publisher, normalized. ScrapingBee has no metadata product — reach the meta tags with extract_rules.'
    },
    {
      feature: 'PDF of the page',
      href: '/pdf',
      microlink: true,
      scrapingbee: false,
      note: 'pdf: true on any Microlink request. No PDF output parameter is documented for ScrapingBee.'
    },
    {
      feature: 'Lighthouse and technology detection',
      href: '/insights',
      microlink: true,
      scrapingbee: false,
      note: 'Lighthouse report and detected stack for any URL.'
    },
    {
      feature: 'Markdown',
      href: '/markdown',
      microlink: true,
      scrapingbee: true,
      note: 'Microlink converts any URL, PDF or office document; ScrapingBee returns return_page_markdown for the page.'
    },
    {
      feature: 'Screenshots',
      href: '/screenshot',
      microlink: true,
      scrapingbee: true
    },
    {
      feature: 'Structured extraction',
      href: '/features/scraping',
      microlink: true,
      scrapingbee: true,
      note: 'Declarative CSS and regex rules on Microlink; CSS rules plus AI-described rules on ScrapingBee.'
    },
    {
      feature: 'Page interaction',
      href: '/features/automation',
      microlink: true,
      scrapingbee: true
    },
    {
      feature: 'Proxy for hard targets',
      href: '/features/proxy',
      microlink: true,
      scrapingbee: true,
      note: 'Residential routing included on Microlink Pro; ScrapingBee prices premium and stealth proxies per credit tier.'
    },
    {
      feature: 'MCP server',
      href: '/integrations/mcp',
      microlink: true,
      scrapingbee: true
    },
    {
      feature: 'Search results',
      href: '/search',
      microlink: true,
      scrapingbee: true,
      note: 'Google Search API on Microlink paid plans; included on every ScrapingBee plan.'
    },
    {
      feature: 'Free tier',
      href: '/pricing',
      microlink: '25/day',
      scrapingbee: '1,000 once',
      highlight: true,
      note: 'Microlink renews every day with no card and no expiry; ScrapingBee gives a one-time trial allowance.'
    },
    {
      feature: 'Geotargeting',
      microlink: false,
      scrapingbee: true,
      note: 'ScrapingBee country_code from the Startup plan up. Microlink has no country selector.'
    },
    {
      feature: 'Sticky sessions',
      microlink: false,
      scrapingbee: true,
      note: 'ScrapingBee session_id keeps consecutive requests on one IP.'
    },
    {
      feature: 'Dedicated retail scrapers',
      microlink: false,
      scrapingbee: true,
      note: 'Dedicated scraping APIs from the ScrapingBee Business plan up.'
    }
  ],
  note: 'Last verified: August 2026. Check each product’s docs for the latest.'
}

export const BILLING = {
  title: (
    <>
      The same plan, a <GradientText>75× spread</GradientText>.
    </>
  ),
  caption:
    'ScrapingBee publishes a multiplier per option, so the entry Freelance plan is worth anywhere from 250,000 pages to 3,333 — decided by flags set per request, not by the plan you bought.',
  columns: ['Configuration', 'Cost each', 'What 250,000 buys'],
  rows: [
    {
      config: 'Static page, no rendering',
      credits: '1 credit',
      pages: '250,000 pages'
    },
    { config: 'Rendered page', credits: '5 credits', pages: '50,000 pages' },
    {
      config: 'Premium proxy, no rendering',
      credits: '10 credits',
      pages: '25,000 pages'
    },
    {
      config: 'Premium proxy, rendered',
      credits: '25 credits',
      pages: '10,000 pages'
    },
    {
      config: 'Stealth proxy',
      credits: '75 credits',
      pages: '3,333 pages'
    },
    {
      config: 'Microlink — any of the above',
      credits: '1 request',
      pages: '250,000 pages',
      highlight: true
    }
  ],
  footnote: (
    <>
      Multipliers and the 250,000-credit Freelance plan are ScrapingBee&#39;s
      own, published in their{' '}
      <Link href='https://www.scrapingbee.com/documentation/'>
        documentation
      </Link>{' '}
      and <Link href='https://www.scrapingbee.com/pricing/'>pricing</Link>; the
      third column is that arithmetic. ScrapingBee also ships an auto mode that
      tries the cheapest configuration first and bills nothing for an attempt
      that fails, which narrows this spread when it works. Microlink has no
      multiplier to narrow: a rendered page and a proxied page are each one
      request against the plan you pick on{' '}
      <Link href='/pricing'>pricing</Link>, proxy resolution is included on Pro,
      and a <Link href='/features/ttl'>cache hit</Link> costs nothing at all.
    </>
  )
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>ScrapingBee</GradientText> is the better pick.
    </>
  ),
  caption:
    'A comparison page that only flatters the vendor writing it is worth nothing. Five cases where the answer is ScrapingBee.',
  items: [
    {
      title: 'Published concurrency',
      body: 'ScrapingBee states a concurrency figure on every plan, from 50 on Freelance up to 400 on Business+, and higher again on Enterprise tiers. Microlink does not cap requests per minute on paid plans, but it does not publish a parallel-worker number either. If a contractual concurrency figure is what you are buying against, ScrapingBee gives you one to point at.'
    },
    {
      title: 'A mode that prices itself',
      body: 'Auto mode tries the cheapest configuration that works and only bills the attempt that succeeds, and max_cost caps what any single request may spend. It is a real answer to the credit spread above, and Microlink has no equivalent because it has no spread to manage.'
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
      body: 'Published Enterprise tiers run to 14, 24 and 41 million credits a month. If crawling breadth is the whole job, and metadata, PDF and insights are not, that ceiling matters more than format breadth.'
    }
  ]
}

export const PRICING_CAPTION = (
  <Text>
    One request counted whether the call renders or proxies, and a{' '}
    <Link href='/features/ttl'>cache hit</Link> not counted at all — there is no
    multiplier to budget around. Start on the free tier and move to Pro when the
    daily ceiling gets in the way.
  </Text>
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
    text: 'ScrapingBee charges 1 credit for a static fetch with rendering off, 5 for a rendered page, 10 or 25 for a premium proxy depending on whether the page renders, and 75 for a stealth proxy. Microlink charges one request per API call regardless of what the call does, so the number on your plan is the number of pages you can fetch. Compare plans by pages, not by the headline credit figure — and note that a ScrapingBee plan is cheaper per page than Microlink when your targets are static and rendering stays off.'
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
    text: 'No. A response served from cache inside its ttl window does not count against your usage — no browser boots and the stored response returns from the edge in milliseconds. Set the ttl parameter anywhere from 1 minute to 31 days to decide how often a URL is fetched again. ScrapingBee states that it does not cache requests at all, so the same URL scraped twice is billed twice.',
    answer: (
      <div>
        No. A response served from cache inside its{' '}
        <Link href='/docs/api/parameters/ttl'>ttl</Link> window does not count
        against your usage — no browser boots, and the stored response returns
        from the edge in milliseconds. Set <code>ttl</code> anywhere from 1
        minute to 31 days to decide how often a URL is fetched again.
        ScrapingBee states that it does not cache requests at all, so the same
        URL scraped twice is billed twice. See{' '}
        <Link href='/features/ttl'>caching</Link>.
      </div>
    )
  },
  {
    question: 'Does Microlink support geotargeting like country_code?',
    text: 'No. ScrapingBee lets you pick an exit country with country_code from the Startup plan up, and Microlink has no equivalent country selector — proxy: true resolves a residential route automatically but you do not choose the region. If a request has to originate in a specific country, that is a reason to stay on ScrapingBee or to pass your own proxy server to Microlink and control the region there.',
    answer: (
      <div>
        No. ScrapingBee lets you pick an exit country with{' '}
        <code>country_code</code> from the Startup plan up, and Microlink has no
        equivalent country selector — <code>proxy: true</code> resolves a
        residential route automatically but you do not choose the region. If a
        request has to originate in a specific country, that is a reason to stay
        on ScrapingBee, or to pass your own proxy server to{' '}
        <Link href='/features/proxy'>Microlink</Link> and control the region
        there.
      </div>
    )
  },
  {
    question: 'Is there a concurrency limit to plan around?',
    text: 'The two APIs answer this differently. ScrapingBee sells concurrency as a plan attribute, from 50 parallel requests on Freelance to 400 on Business+, so a queue of workers is sized against that figure. Microlink does not apply a per-minute rate limit on paid plans and does not sell parallelism as a tier, so throughput is not something you buy up — but there is also no contractual number to design a worker pool against.'
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
