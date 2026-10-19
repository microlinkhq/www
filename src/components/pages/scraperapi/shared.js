import React from 'react'
import { colors } from 'theme'

import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { GradientText } from 'components/patterns/ProductStory'

export const ACCENT_NAME = 'teal'
export const ACCENT = colors.teal7

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.teal9} 0%,
  ${colors.teal9} 48%,
  ${colors.teal8} 48%,
  ${colors.teal8} 52%,
  ${ACCENT} 52%,
  ${ACCENT} 65%,
  ${colors.cyan7} 65%,
  ${colors.cyan7} 79%,
  ${colors.cyan6} 79%,
  ${colors.cyan6} 100%
)`

const PAGE_URL = 'https://microlink.io/alternative/scraperapi'

const SCRAPERAPI_PRICING = 'https://www.scraperapi.com/pricing/'
const SCRAPERAPI_CREDITS =
  'https://docs.scraperapi.com/getting-started/quick-start/credits-and-requests-costs'
const SCRAPERAPI_ASYNC = 'https://docs.scraperapi.com/asynchronous-api/overview'
const SCRAPERAPI_CACHE =
  'https://docs.scraperapi.com/control-and-optimization/cached-responses'
const SCRAPERAPI_GEO =
  'https://docs.scraperapi.com/control-and-optimization/geotargeting/standard-geo'

export const META = {
  title: 'ScraperAPI Alternative Priced Per Request',
  description:
    'A ScraperAPI alternative priced per request, not per credit. Rendering, proxy routing and the target domain never change what one call costs.'
}

export const HERO = {
  title: 'The ScraperAPI alternative that prices every URL the same',
  description: (
    <Text as='span'>
      On ScraperAPI a page costs 1 credit, or 5, or 25, or 30, decided by the
      domain in the URL and the flags on the request. Microlink counts one
      request per API call: the same price rendered, the same price proxied, the
      same price whatever the host.
    </Text>
  ),
  cta: 'alternative-scraperapi:hero',
  ctaLabel: 'Get your free API key',
  secondaryHref: '/docs/guides/data-extraction',
  secondaryLabel: 'Read the extraction guide',
  mqlCode: {
    url: 'https://news.ycombinator.com',
    data: {
      titles: {
        selectorAll: '.titleline > a',
        attr: 'text'
      }
    }
  }
}

export const TIMINGS = {
  title: 'One request',
  subtitle: 'Whatever it returns',
  stats: [
    { healthcheckKey: 'meta', label: 'P95 metadata' },
    { healthcheckKey: 'screenshot', label: 'P95 screenshot' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CREDITS = {
  title: (
    <>
      The <GradientText>URL</GradientText> decides the bill.
    </>
  ),
  caption:
    'ScraperAPI publishes a credit cost per domain and per flag. The same code pointed at a different host costs 5, 25 or 30 times more, and asking for a rendered page costs 10. A $49 plan is worth 100,000 pages or 1,333, decided per request rather than at checkout.',
  columns: ['Request', 'Credits', 'Pages for $49'],
  rows: [
    {
      config: 'Any URL, no flags',
      credits: '1 credit',
      pages: '100,000 pages'
    },
    {
      config: 'Amazon, Walmart or eBay',
      credits: '5 credits',
      pages: '20,000 pages'
    },
    {
      config: 'JavaScript rendering',
      credits: '10 credits',
      pages: '10,000 pages'
    },
    {
      config: 'Cloudflare, DataDome, PerimeterX or Akamai bypass',
      credits: '10 credits',
      pages: '10,000 pages'
    },
    {
      config: 'Google or Bing',
      credits: '25 credits',
      pages: '4,000 pages'
    },
    {
      config: 'Premium proxy, rendered',
      credits: '25 credits',
      pages: '4,000 pages'
    },
    {
      config: 'LinkedIn',
      credits: '30 credits',
      pages: '3,333 pages'
    },
    {
      config: 'Ultra premium proxy, rendered',
      credits: '75 credits',
      pages: '1,333 pages'
    },
    {
      config: 'Microlink, any of the above',
      credits: '1 request',
      pages: '46,000 pages',
      highlight: true
    }
  ],
  footnote: (
    <>
      Credit costs are ScraperAPI&#39;s own, published in{' '}
      <Link href={SCRAPERAPI_CREDITS}>credits and requests costs</Link>; the $49
      Hobby plan and its 100,000 credits come from their{' '}
      <Link href={SCRAPERAPI_PRICING}>pricing page</Link>, which runs on to
      21,500,000 credits at $1,975. The third column is that arithmetic, rounded
      down. The Microlink row is the $49 Pro plan on{' '}
      <Link href='/pricing'>pricing</Link>: 46,000 requests, $1.07 per 1,000 on
      every tier, and a <Link href='/features/ttl'>cache hit</Link> not counted
      at all. Read the crossover plainly: while a ScraperAPI request stays under
      2.17 credits it buys more pages than Microlink does for the same $49, and
      above that Microlink buys more. Ultra premium is paid plans only, and
      ScraperAPI bills successful requests, 404s included.
    </>
  )
}

export const COMPARISON = {
  title: (
    <>
      <GradientText>Feature by feature</GradientText>, side by side.
    </>
  ),
  caption: (
    <>
      Both APIs take a URL and give back the page. What differs is the unit on
      the invoice, what arrives with the HTML, and what is on without asking.
      Every ScraperAPI row is taken from their{' '}
      <Link href='https://docs.scraperapi.com/'>documentation</Link> and{' '}
      <Link href={SCRAPERAPI_PRICING}>pricing page</Link>, the last three
      included, where ScraperAPI has capabilities Microlink does not.
    </>
  ),
  columns: ['Microlink', 'ScraperAPI'],
  rows: [
    {
      feature: 'Billing unit',
      href: '/pricing',
      microlink: '1 request',
      scraperapi: '1–75 credits',
      highlight: true,
      note: 'ScraperAPI: 1 credit flat, 5 on Amazon, Walmart and eBay, 25 on Google and Bing, 30 on LinkedIn, 10 to render, 10 to bypass an anti-bot system, 75 for an ultra premium proxy with rendering. A Microlink request costs the same whatever it carries.'
    },
    {
      feature: 'Real browser on every call',
      href: '/docs/api/parameters/prerender',
      microlink: true,
      scraperapi: 'Opt-in, 10 credits',
      highlight: true,
      note: 'Microlink runs Chrome by default, and prerender defaults to auto so a page that needs no browser takes the plain HTTP path. On ScraperAPI rendering is the render flag, priced above a flat fetch.'
    },
    {
      feature: 'Response caching',
      href: '/features/ttl',
      microlink: '1 minute to 31 days',
      scraperapi: '10 minutes, ultra premium',
      highlight: true,
      note: 'Microlink cache hits do not count against the quota. ScraperAPI caching applies only to requests carrying ultra_premium and serves values no older than 10 minutes.'
    },
    {
      feature: 'Pick the exit country',
      href: '/docs/api/parameters/proxy/location',
      microlink: '181 countries',
      scraperapi: 'US and EU until $299',
      highlight: true,
      note: 'Microlink proxy.location takes any of 181 ISO country codes on any Pro plan. ScraperAPI limits Hobby and Startup to the US and EU regions, with individual country codes from the Business plan up.'
    },
    {
      feature: 'Concurrency',
      href: '/docs/api/basics/rate-limit',
      microlink: 'No throttling',
      scraperapi: '20 to 500 threads',
      note: 'ScraperAPI sells concurrent threads per plan, 20 on Hobby up to 500 on Advanced. Microlink applies no throttling: parallel requests are bounded by the monthly quota.'
    },
    {
      feature: 'Page metadata',
      href: '/metadata',
      microlink: true,
      scraperapi: false,
      highlight: true,
      note: 'Title, description, author, date, logo, image and publisher, normalized for any URL. ScraperAPI returns the HTML, or parsed JSON on the domains it supports.'
    },
    {
      feature: 'PDF of the page',
      href: '/pdf',
      microlink: true,
      scraperapi: false,
      note: 'pdf: true on any Microlink request. ScraperAPI documents no PDF output.'
    },
    {
      feature: 'Screenshots',
      href: '/screenshot',
      microlink: true,
      scraperapi: '10 credits',
      note: 'One Microlink request returns the image. ScraperAPI documents screenshot capture under JavaScript rendering, priced at 10 credits.'
    },
    {
      feature: 'Markdown and text',
      href: '/markdown',
      microlink: true,
      scraperapi: true,
      note: 'ScraperAPI output_format takes markdown or text at no extra credit. Microlink converts the page, and also PDFs and office documents.'
    },
    {
      feature: 'Structured extraction',
      href: '/features/scraping',
      microlink: 'Any site',
      scraperapi: 'Named domains',
      note: 'Microlink data rules target any site with selector, selectorAll, regex and ordered fallbacks. ScraperAPI parses a fixed list of retail and search domains, or a parser you train.'
    },
    {
      feature: 'Lighthouse and technology detection',
      href: '/insights',
      microlink: true,
      scraperapi: false,
      note: 'A Lighthouse report and the detected stack for any URL.'
    },
    {
      feature: 'Page interaction',
      href: '/features/automation',
      microlink: true,
      scraperapi: true,
      note: 'click, scroll and waitForSelector on Microlink; the rendering instruction set on ScraperAPI.'
    },
    {
      feature: 'Bring your own proxy',
      href: '/docs/api/parameters/proxy/url',
      microlink: true,
      scraperapi: 'Not documented',
      note: 'Microlink takes a proxy server URL so a pool you already pay for is used. ScraperAPI documents its own pools and its own proxy port.'
    },
    {
      feature: 'MCP server',
      href: '/integrations/mcp',
      microlink: true,
      scraperapi: true
    },
    {
      feature: 'Free tier',
      href: '/pricing',
      microlink: '100/month',
      scraperapi: '5,000 once',
      highlight: true,
      note: 'The free Microlink API key renews 100 requests every month with no card and no expiry, and 25 a day need no key at all. ScraperAPI gives a 7-day trial with 5,000 credits.'
    },
    {
      feature: 'Asynchronous jobs',
      microlink: false,
      scraperapi: true,
      note: 'ScraperAPI takes up to 50,000 URLs per batch job and retries for up to 24 hours, returning results from a status URL or a webhook. Microlink is synchronous.'
    },
    {
      feature: 'Sticky sessions',
      microlink: false,
      scraperapi: true,
      note: 'ScraperAPI session_number keeps consecutive requests on one IP, expiring 15 minutes after the last use. Microlink has no session parameter.'
    },
    {
      feature: 'Parsers for retail domains',
      microlink: false,
      scraperapi: true,
      note: 'Structured endpoints for Amazon, Walmart, eBay, Home Depot and more, in JSON or CSV.'
    }
  ],
  note: 'Last verified: October 2026. Check each product’s docs for the latest.'
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>ScraperAPI</GradientText> is the better pick.
    </>
  ),
  caption:
    'A comparison page that only flatters the vendor writing it is worth nothing. Five cases where the answer is ScraperAPI.',
  items: [
    {
      title: 'Jobs that run without you',
      body: 'The Async API takes up to 50,000 URLs in one batch, keeps retrying each page for up to 24 hours, and delivers results through a status URL or a webhook. Microlink is synchronous: you hold the connection, and the retrying and the queue are yours to build.'
    },
    {
      title: 'Parsers somebody else maintains',
      body: 'Structured endpoints return clean JSON or CSV for Amazon, Walmart, eBay, Home Depot and other named domains, and an AI parser can be trained for the rest. Microlink extraction is declarative CSS and regex, precise and repeatable, but you write the selector and you fix it when the markup moves.'
    },
    {
      title: 'A concurrency number in writing',
      body: 'Every plan states concurrent threads, from 20 on Hobby to 500 on Advanced and higher on Enterprise. Microlink applies no throttling on paid plans, which is better in practice and worse on paper: there is no published figure to size a worker pool against.'
    },
    {
      title: 'Static HTML at the lowest price',
      body: 'A flat request with no flags is 1 credit, so the $49 plan works out at $0.49 per 1,000 pages against $1.07 on Microlink. If the targets are static, nothing needs a browser and metadata is not the point, ScraperAPI is cheaper per page.'
    },
    {
      title: 'Volume past the self-serve ceiling',
      body: 'Published plans run to 21,500,000 credits a month at $1,975, with Enterprise above that. Microlink self-serve Pro tops out at 420,000 requests a month, so anything larger is a conversation rather than a checkout.'
    }
  ]
}

export const PRICING_CAPTION = (
  <Text>
    One request counted whether the call renders, proxies, or lands on a domain
    somebody else charges 30 credits for, and a{' '}
    <Link href='/features/ttl'>cache hit</Link> not counted at all. Start on the
    free API key and move to a paid plan when the monthly ceiling gets in the
    way.
  </Text>
)

export const CTA = {
  caption:
    'Point one request at the URL you are scraping today and compare the response with the one you get back now. A free API key covers the first 100 calls a month.',
  cta: 'alternative-scraperapi:footer-cta',
  ctaLabel: 'Get your free API key',
  secondaryHref: '/docs/guides/data-extraction',
  secondaryLabel: 'Read the extraction guide'
}

export const FAQ_CAPTION =
  'What changes, what does not, and what a migration actually involves.'

export const FAQ_ITEMS = [
  {
    question: 'Is Microlink a drop-in replacement for ScraperAPI?',
    text: 'No, the request shape is different. ScraperAPI takes an api_key and a url plus flags such as render, premium and ultra_premium; Microlink takes a url plus the products you want back, such as a data block, a screenshot or a pdf. Most migrations are a single call site: the target URL stays the same, render becomes the default behaviour, premium becomes proxy, country_code becomes proxy.location, and output_format becomes a data rule.',
    answer: (
      <div>
        No, the request shape is different. ScraperAPI takes an{' '}
        <code>api_key</code> and a url plus flags such as <code>render</code>,{' '}
        <code>premium</code> and <code>ultra_premium</code>; Microlink takes a{' '}
        <Link href='/docs/api/parameters/url'>url</Link> plus the products you
        want back, such as a <Link href='/docs/api/parameters/data'>data</Link>{' '}
        block, a <Link href='/docs/api/parameters/screenshot'>screenshot</Link>{' '}
        or a <Link href='/docs/api/parameters/pdf'>pdf</Link>. Most migrations
        are a single call site: the target URL stays the same,{' '}
        <code>render</code> becomes the default behaviour, <code>premium</code>{' '}
        becomes <Link href='/docs/api/parameters/proxy'>proxy</Link>,{' '}
        <code>country_code</code> becomes{' '}
        <Link href='/docs/api/parameters/proxy/location'>proxy.location</Link>,
        and <code>output_format</code> becomes a data rule.
      </div>
    )
  },
  {
    question: 'How do credits compare to requests?',
    text: 'A ScraperAPI credit is not a page. A flat fetch is 1 credit, an Amazon, Walmart or eBay page is 5, a Google or Bing page is 25, a LinkedIn page is 30, rendering is 10, an anti-bot bypass is 10, and an ultra premium proxy with rendering is 75. Microlink charges one request per API call whatever the call does, so the number on the plan is the number of pages. Compare by pages, not by the headline credit figure: while a ScraperAPI request stays under 2.17 credits it buys more pages than Microlink does for the same money.',
    answer: (
      <div>
        A credit is not a page. On{' '}
        <Link href={SCRAPERAPI_CREDITS}>ScraperAPI</Link> a flat fetch is 1
        credit, an Amazon, Walmart or eBay page is 5, a Google or Bing page is
        25, a LinkedIn page is 30, rendering is 10, an anti-bot bypass is 10,
        and an ultra premium proxy with rendering is 75. Microlink charges one
        request per API call whatever the call does, so the number on the{' '}
        <Link href='/pricing'>plan</Link> is the number of pages. Compare by
        pages, not by the headline credit figure: while a ScraperAPI request
        stays under 2.17 credits it buys more pages than Microlink does for the
        same money.
      </div>
    )
  },
  {
    question: 'Does the target domain change what a Microlink request costs?',
    text: 'No. One API call is one request on every host, so pointing the same code at a retail product page, a search engine or a social profile costs what any other page costs. ScraperAPI publishes a credit multiplier per domain category, which is why the same loop can cost 1 credit or 30 depending on where it points.'
  },
  {
    question: 'Can I pick the country a request comes from?',
    text: 'Yes. proxy.location takes any of 181 ISO country codes and works on any Pro plan, and proxy.url routes through a proxy server you supply instead. ScraperAPI limits Hobby and Startup to the US and EU regions, with individual country codes from the Business plan at $299 up.',
    answer: (
      <div>
        Yes.{' '}
        <Link href='/docs/api/parameters/proxy/location'>proxy.location</Link>{' '}
        takes any of 181 ISO country codes and works on any Pro plan, and{' '}
        <Link href='/docs/api/parameters/proxy/url'>proxy.url</Link> routes
        through a proxy server you supply instead. ScraperAPI limits Hobby and
        Startup to the US and EU regions, with individual country codes from{' '}
        <Link href={SCRAPERAPI_GEO}>the Business plan</Link> at $299 up.
      </div>
    )
  },
  {
    question: 'Do cached responses still cost a request?',
    text: 'No. A response served from cache inside its ttl window does not count against your usage: no browser boots, and the stored response returns from the edge in milliseconds. Set ttl anywhere from 1 minute to 31 days to decide how often a URL is fetched again. ScraperAPI caching applies only to requests carrying ultra_premium and serves values no older than 10 minutes.',
    answer: (
      <div>
        No. A response served from cache inside its{' '}
        <Link href='/docs/api/parameters/ttl'>ttl</Link> window does not count
        against your usage: no browser boots, and the stored response returns
        from the edge in milliseconds. Set <code>ttl</code> anywhere from 1
        minute to 31 days to decide how often a URL is fetched again.{' '}
        <Link href={SCRAPERAPI_CACHE}>ScraperAPI caching</Link> applies only to
        requests carrying <code>ultra_premium</code> and serves values no older
        than 10 minutes. See <Link href='/features/ttl'>caching</Link>.
      </div>
    )
  },
  {
    question: 'Is there a concurrency limit to plan around?',
    text: 'The two APIs answer this differently. ScraperAPI sells concurrency as a plan attribute, from 20 threads on Hobby to 500 on Advanced, so a pool of workers is sized against that figure. Microlink applies no throttling and does not sell parallelism as a tier, so throughput is bounded by the monthly quota rather than bought up, but there is no contractual number to design against either.'
  },
  {
    question: 'What happens to a request that fails?',
    text: 'Microlink retries internal browser errors with exponential backoff, twice by default, inside the same call. There is no job queue: a page that keeps failing comes back as an error for your code to handle. ScraperAPI bills successful responses only, 200 and 404 included, and its Async API keeps retrying a job in the background for up to 24 hours.',
    answer: (
      <div>
        Microlink retries internal browser errors with exponential backoff,{' '}
        <Link href='/docs/api/parameters/retry'>twice by default</Link>, inside
        the same call. There is no job queue: a page that keeps failing comes
        back as an <Link href='/docs/api/basics/error-codes'>error</Link> for
        your code to handle. ScraperAPI bills successful responses only, 200 and
        404 included, and its <Link href={SCRAPERAPI_ASYNC}>Async API</Link>{' '}
        keeps retrying a job in the background for up to 24 hours.
      </div>
    )
  },
  {
    question: 'What does the free tier include?',
    text: 'A free API key with 100 requests per month and every Pro capability, no credit card. Screenshot, PDF, metadata, markdown, search, insights and the SDK are included, along with the edge cache, proxy and adblock. Unauthenticated calls get 25 a day with no signup at all. ScraperAPI gives a 7-day trial with 5,000 credits.'
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
