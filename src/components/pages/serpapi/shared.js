import React from 'react'
import { colors } from 'theme'

import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { GradientText } from 'components/patterns/ProductStory'
import { sdkExample } from 'components/patterns/ExamplesSwitcher/sdk-example'

export const ACCENT_NAME = 'grape'
export const ACCENT = colors.grape7

const PAGE_URL = 'https://microlink.io/alternative/serpapi'

const SERPAPI_PRICING = 'https://serpapi.com/pricing'
const SERPAPI_MARKDOWN = 'https://serpapi.com/markdown-output'
const SERPAPI_SPEED = 'https://serpapi.com/ludicrous-speed'

export const META = {
  title: 'SerpApi Alternative Without Hourly Caps',
  description:
    'A SerpApi alternative for Google results as JSON: 10 surfaces from one SDK call, a monthly request quota, and no per-hour throughput ceiling.'
}

export const HERO = {
  title: 'The SerpApi alternative without an hourly ceiling',
  description: (
    <Text as='span'>
      Microlink Search turns a Google query into JSON: web, news, images,
      videos, places, maps, shopping, scholar, patents, autocomplete. One SDK
      call per surface, one request against a monthly quota, and no per-hour
      throughput tier to size a worker pool against.
    </Text>
  ),
  ctaHref: '/docs/guides/search',
  ctaLabel: 'Read the Search guide',
  code: sdkExample(`const page = await microlink.search('electric vehicle tax credit', {
  type: 'news',
  period: 'week',
  location: 'us'
})

console.log(page.results[0])
// { title, url, description, date, publisher, image }`)
}

export const THROUGHPUT = {
  title: (
    <>
      Priced per search, <GradientText>throttled per hour</GradientText>.
    </>
  ),
  caption:
    'SerpApi publishes two numbers on every plan: the searches you may run in a month, and the successful searches it guarantees in an hour. The second one is what a queue of workers has to be built around. Microlink publishes one number, and it is monthly.',
  columns: ['Plan', 'Included per month', 'Guaranteed per hour'],
  rows: [
    { plan: 'SerpApi Free, $0', volume: '250 searches', rate: '50 / hour' },
    {
      plan: 'SerpApi Starter, $25',
      volume: '1,000 searches',
      rate: '200 / hour'
    },
    {
      plan: 'SerpApi Developer, $75',
      volume: '5,000 searches',
      rate: '1,000 / hour'
    },
    {
      plan: 'SerpApi Production, $150',
      volume: '15,000 searches',
      rate: '3,000 / hour'
    },
    {
      plan: 'SerpApi Big Data, $275',
      volume: '30,000 searches',
      rate: '6,000 / hour'
    },
    {
      plan: 'Microlink Pro, $49',
      volume: '46,000 requests',
      rate: 'No hourly cap',
      highlight: true
    }
  ],
  footnote: (
    <>
      SerpApi plan volumes and hourly throughput figures are their own,
      published on their <Link href={SERPAPI_PRICING}>pricing page</Link>. The
      Microlink row is the entry Pro plan on{' '}
      <Link href='/pricing'>pricing</Link>, and{' '}
      <Link href='/docs/api/basics/rate-limit'>rate limit</Link> states that no
      throttling is applied: parallel requests are bounded by the monthly quota
      and nothing else. Read the volumes carefully, because the units differ. A
      SerpApi search is a search, while a Microlink request is any API call, so
      the same 46,000 also covers screenshots, PDFs and metadata, and a result
      you expand with <code>.markdown()</code> costs one request of its own.
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
      Both products return public Google results as structured JSON, paginated,
      geo-targetable, and callable from an agent. What differs is the surface
      catalogue, what arrives with each result, and what the vendor guarantees
      in writing. Every SerpApi row comes from their{' '}
      <Link href={SERPAPI_PRICING}>pricing page</Link>,{' '}
      <Link href={SERPAPI_MARKDOWN}>Markdown Output</Link> and{' '}
      <Link href={SERPAPI_SPEED}>Ludicrous Speed</Link> pages, including the
      four rows where SerpApi has capabilities Microlink does not.
    </>
  ),
  columns: ['Microlink', 'SerpApi'],
  rows: [
    {
      feature: 'Hourly throughput cap',
      href: '/docs/api/basics/rate-limit',
      microlink: 'None',
      serpapi: '50 to 6,000 / hour',
      highlight: true,
      note: 'Microlink applies no throttling: concurrency is limited by the monthly quota. SerpApi guarantees a successful-search rate per plan.'
    },
    {
      feature: 'Cost per 1,000',
      href: '/pricing',
      microlink: '$1.07',
      serpapi: '$15.00',
      highlight: true,
      note: 'Arithmetic on both published plans: $49 for 46,000 Microlink requests, $75 for 5,000 SerpApi searches on Developer. SerpApi gets cheaper per search on higher tiers, down to $9.17 on Big Data.'
    },
    {
      feature: 'Billing unit',
      href: '/docs/guides/search/content-expansion',
      microlink: '1 request',
      serpapi: '1 search',
      note: 'One query is one unit on both, whatever it returns. On Microlink that unit is shared with every other product, and expanding a result costs one more.'
    },
    {
      feature: 'Search surfaces',
      href: '/search',
      microlink: '10 Google',
      serpapi: 'Google + 20 sites',
      highlight: true,
      note: 'Microlink covers web, news, images, videos, places, maps, shopping, scholar, patents and autocomplete. SerpApi adds Amazon, Bing, YouTube, Yandex, Yelp, Walmart, Zillow, Baidu, DuckDuckGo and more.'
    },
    {
      feature: 'Page content of each result',
      href: '/markdown',
      microlink: true,
      serpapi: false,
      highlight: true,
      note: 'result.markdown() and result.html() fetch the linked page itself, at one request per result. SerpApi returns the results page; its Markdown Output renders that page as Markdown rather than reading the links.'
    },
    {
      feature: 'Results page as Markdown',
      href: '/use-cases/search-api/serp-to-markdown',
      microlink: true,
      serpapi: true,
      note: 'page.markdown() on Microlink. output=md, /search.md or an Accept header on SerpApi, which reports roughly half the tokens of the JSON.'
    },
    {
      feature: 'Recency and country filters',
      microlink: true,
      serpapi: true,
      note: 'Microlink takes period for recency and a two-letter country code for location.'
    },
    {
      feature: 'Screenshots, PDF and metadata',
      href: '/api',
      microlink: true,
      serpapi: false,
      note: 'The same key, SDK and quota also capture a page, print it to PDF, or return normalized metadata. SerpApi is a search product.'
    },
    {
      feature: 'MCP server',
      href: '/integrations/mcp',
      microlink: true,
      serpapi: true
    },
    {
      feature: 'Free tier for search',
      href: '/pricing',
      microlink: false,
      serpapi: '250 / month',
      note: 'Microlink Search starts on a paid plan because proxy capacity is part of the product from the first call. The 25-a-day free tier covers the other products.'
    },
    {
      feature: 'Client libraries',
      href: '/integrations/sdk',
      microlink: 'JavaScript',
      serpapi: '10 languages',
      note: 'Search is a method of the JavaScript SDK. SerpApi publishes clients for Ruby, Python, JavaScript, Go, PHP, Java, Rust, .NET, Swift and C++, plus a CLI.'
    },
    {
      feature: 'Audited compliance',
      microlink: false,
      serpapi: 'SOC 2, ISO 27001',
      note: 'SerpApi states SOC 2 Type II, SOC 3 and ISO 27001 certification. Microlink publishes no equivalent certification.'
    },
    {
      feature: 'Legal indemnity',
      microlink: false,
      serpapi: 'Up to $2M',
      note: 'The SerpApi U.S. Legal Shield covers scraping and parsing of search engine data for lawful use. Microlink offers no comparable cover.'
    }
  ],
  note: 'Last verified: September 2026. Check each product’s own pages for the latest.'
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>SerpApi</GradientText> is the better pick.
    </>
  ),
  caption:
    'A comparison page that only flatters the vendor writing it is worth nothing. Five cases where the answer is SerpApi.',
  items: [
    {
      title: 'Anything that is not Google',
      body: 'SerpApi sells more than a hundred search APIs, from Amazon and Walmart to Bing, YouTube, Yandex, Yelp, Zillow, Baidu and DuckDuckGo. Microlink Search covers ten Google surfaces and nothing else. If the job is Amazon pricing or App Store reviews, there is no Microlink answer to compare.'
    },
    {
      title: 'A throughput number in the contract',
      body: 'Every SerpApi plan states the successful searches it guarantees per hour, from 50 on Free to 6,000 on Big Data. Microlink applies no throttling and sells no parallelism tier, so there is nothing to throttle, but there is also no figure to size a worker pool against or point to in a review.'
    },
    {
      title: 'Certifications and legal cover',
      body: 'SerpApi publishes SOC 2 Type II, SOC 3 and ISO 27001 certification, uptime SLAs of up to 99.97%, a ZeroTrace mode that retains no query or result, and a legal shield covering up to $2 million. If procurement is the gate, that list is the answer.'
    },
    {
      title: 'A latency tier you can buy',
      body: 'Ludicrous Speed costs twice the standard rate and SerpApi reports it averaging 2.2 times faster, and 4.2 times faster at p99, over a 10,000-request sample. Microlink has no paid speed tier, so latency is whatever the surface returns.'
    },
    {
      title: 'Ten languages and a free tier',
      body: 'SerpApi ships clients for Ruby, Python, JavaScript, Go, PHP, Java, Rust, .NET, Swift and C++, plus a CLI, and 250 searches a month at no cost. Microlink Search is a JavaScript SDK method on a paid plan. If the service is written in Java, that settles it.'
    }
  ]
}

export const PRICING_CAPTION = (
  <Text>
    Search runs on any Pro plan, and the quota it draws from is the same one
    every other product uses. Pick the plan by monthly volume, then spend it on
    searches, screenshots or <Link href='/markdown'>Markdown</Link> in whatever
    mix the month needs.
  </Text>
)

export const CTA = {
  caption:
    'Run the query you ran this morning and compare the JSON with what you parse today. The Search guide has a working call in the first code block.',
  ctaHref: '/docs/guides/search',
  ctaLabel: 'Run your first search',
  badges: [
    '10 Google surfaces',
    'One SDK import',
    'Monthly quota, no hourly cap'
  ]
}

export const FAQ_CAPTION =
  'What changes, what does not, and what a migration actually involves.'

export const FAQ_ITEMS = [
  {
    question: 'Is Microlink a drop-in replacement for SerpApi?',
    text: 'No. SerpApi is an HTTP endpoint that takes an engine parameter and a query, and returns a payload shaped per engine. Microlink Search is a method of the JavaScript SDK that takes a query plus a type, and returns the same result shape across surfaces. A migration is usually one module: the engine name becomes type, the parsing layer goes away, and the field names change once.',
    answer: (
      <div>
        No. SerpApi is an HTTP endpoint that takes an engine parameter and a
        query, and returns a payload shaped per engine. Microlink Search is the{' '}
        <Link href='/docs/sdk/methods/search'>search</Link> method of the{' '}
        <Link href='/integrations/sdk'>JavaScript SDK</Link>: it takes a query
        plus a <code>type</code>, and returns the same result shape across
        surfaces. A migration is usually one module: the engine name becomes{' '}
        <code>type</code>, the parsing layer goes away, and the field names
        change once.
      </div>
    )
  },
  {
    question: 'Which Google surfaces are supported?',
    text: 'Ten: web search, news, images, videos, places, maps, shopping, scholar, patents and autocomplete. Omit type and you get web search. Each surface keeps its own result shape, so shopping returns parsed prices and scholar returns citation counts, but the call and the pagination are identical.',
    answer: (
      <div>
        Ten: web search, news, images, videos, places, maps, shopping, scholar,
        patents and autocomplete. Omit <code>type</code> and you get web search.
        Each surface keeps its own result shape, so shopping returns parsed
        prices and scholar returns citation counts, but the call and the
        pagination are identical. See the{' '}
        <Link href='/docs/guides/search'>Search guide</Link> for a page per
        surface.
      </div>
    )
  },
  {
    question: 'How does a search count against the quota?',
    text: 'One search is one request, whether it returns ten results or none. Expanding a result with .markdown() or .html() fetches that linked page and counts as one more request, which is why expansion is explicit rather than automatic. The quota is monthly and shared with every other Microlink product.',
    answer: (
      <div>
        One search is one request, whether it returns ten results or none.
        Expanding a result with <code>.markdown()</code> or <code>.html()</code>{' '}
        fetches that linked page and counts as one more request, which is why{' '}
        <Link href='/docs/guides/search/content-expansion'>expansion</Link> is
        explicit rather than automatic. The quota is monthly and shared with
        every other product on your <Link href='/pricing'>plan</Link>.
      </div>
    )
  },
  {
    question: 'Are there hourly rate limits to plan around?',
    text: 'No. Microlink applies no throttling: you can run as many parallel requests as the quota allows, and the quota resets monthly on Pro. Every response carries x-rate-limit-limit, x-rate-limit-remaining and x-rate-limit-reset, and requests return HTTP 429 once the quota is spent. SerpApi instead guarantees a successful-search rate per hour on each plan, from 50 to 6,000.',
    answer: (
      <div>
        No. Microlink applies no throttling: you can run as many parallel
        requests as the quota allows, and the quota resets monthly on Pro. Every
        response carries <code>x-rate-limit-limit</code>,{' '}
        <code>x-rate-limit-remaining</code> and <code>x-rate-limit-reset</code>,
        and requests return HTTP 429 once the quota is spent. See{' '}
        <Link href='/docs/api/basics/rate-limit'>rate limit</Link>. SerpApi
        instead guarantees a successful-search rate per hour on each plan, from
        50 to 6,000.
      </div>
    )
  },
  {
    question: 'Is there a free tier for Search?',
    text: 'No. Search starts on a paid plan because reliable collection of public results depends on managed proxy capacity from the first call, and that cost is part of the product. The free tier of 25 requests a day covers the other products: screenshot, PDF, metadata, markdown and insights.',
    answer: (
      <div>
        No. Search starts on a paid <Link href='/pricing'>plan</Link> because
        reliable collection of public results depends on managed proxy capacity
        from the first call, and that cost is part of the product. The free tier
        of 25 requests a day covers the other products:{' '}
        <Link href='/screenshot'>screenshot</Link>, <Link href='/pdf'>PDF</Link>
        , <Link href='/metadata'>metadata</Link>,{' '}
        <Link href='/markdown'>markdown</Link> and{' '}
        <Link href='/insights'>insights</Link>.
      </div>
    )
  },
  {
    question: 'Can I query Amazon, Bing or YouTube?',
    text: 'Not through Search. Microlink Search covers Google surfaces only. Anything else is a URL problem rather than a search problem, so the browser products handle it: point a request at the page and extract fields with CSS selectors, or read it as Markdown. If you need a parsed Amazon or Bing search API, SerpApi publishes one and Microlink does not.',
    answer: (
      <div>
        Not through Search. Microlink Search covers Google surfaces only.
        Anything else is a URL problem rather than a search problem, so the
        browser products handle it: point a request at the page and extract
        fields with <Link href='/features/scraping'>CSS selectors</Link>, or
        read it as <Link href='/markdown'>Markdown</Link>. If you need a parsed
        Amazon or Bing search API, SerpApi publishes one and Microlink does not.
      </div>
    )
  },
  {
    question: 'Can I read the pages behind the results, not just the snippets?',
    text: 'Yes, and that is the difference that matters for grounding an answer. Any result with a URL exposes markdown() and html(), which fetch that page through Microlink and resolve to its content, so an agent reads only the three results worth reading. Pass markdown: true or html: true to fetch everything up front instead.',
    answer: (
      <div>
        Yes, and that is the difference that matters for grounding an answer.
        Any result with a URL exposes <code>markdown()</code> and{' '}
        <code>html()</code>, which fetch that page through Microlink and resolve
        to its content, so an agent reads only the three results worth reading.
        Pass <code>markdown: true</code> or <code>html: true</code> to fetch
        everything up front instead. See{' '}
        <Link href='/use-cases/search-api/rag-grounding'>RAG grounding</Link>.
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
      name: 'Microlink Search',
      applicationCategory: ['DeveloperApplication', 'WebAPI'],
      url: 'https://microlink.io/search',
      offers: {
        '@type': 'Offer',
        price: '39',
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
