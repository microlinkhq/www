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
const SERPAPI_LEGAL_SHIELD = 'https://serpapi.com/us-legal-shield'

export const META = {
  title: 'SerpApi Alternative Without Hourly Caps',
  description:
    'Compare SerpApi with Microlink Search: 10 Google surfaces as JSON, $1.07 per 1,000 requests on every plan, and no hourly throughput limit to plan around.'
}

const FAIR_USE_NOTE =
  'No hourly limit applies to legitimate use. Traffic that is fraudulent, illegal or aimed at attacking third parties is restricted.'

export const HERO = {
  title: 'The SerpApi alternative without an hourly ceiling',
  description: (
    <Text as='span'>
      Microlink Search turns a Google query into JSON across ten surfaces: web,
      news, images, videos, places, maps, shopping, scholar, patents and
      autocomplete. Call it from the SDK, the CLI or MCP. Each search is one
      request against a monthly quota, with no hourly throughput tier to size a
      worker pool against.
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
    'Every SerpApi plan carries two numbers: searches per month, and successful searches per hour. Their pricing page calls the second one guaranteed throughput, their FAQ calls it the hourly throughput limit, and below a million searches it is 20% of the monthly volume. A queue of workers has to be sized against it. Microlink publishes one number, it is monthly, and the price per 1,000 does not move with the plan.',
  columns: ['Plan', 'Per month', 'Per hour', 'Per 1,000'],
  rows: [
    {
      plan: 'SerpApi Free, $0',
      cells: ['250 searches', '50', '$0']
    },
    {
      plan: 'SerpApi Starter, $25',
      cells: ['1,000 searches', '200', '$25.00']
    },
    {
      plan: 'SerpApi Developer, $75',
      cells: ['5,000 searches', '1,000', '$15.00']
    },
    {
      plan: 'SerpApi Production, $150',
      cells: ['15,000 searches', '3,000', '$10.00']
    },
    {
      plan: 'SerpApi Big Data, $275',
      cells: ['30,000 searches', '6,000', '$9.17']
    },
    {
      plan: 'SerpApi Searcher, $725',
      cells: ['100,000 searches', '20,000', '$7.25']
    },
    {
      plan: 'Microlink Pro, $49',
      cells: ['46,000 requests', 'No limit*', '$1.07'],
      highlight: true
    },
    {
      plan: 'Microlink Pro, $150',
      cells: ['140,000 requests', 'No limit*', '$1.07'],
      highlight: true
    },
    {
      plan: 'Microlink Pro, $450',
      cells: ['420,000 requests', 'No limit*', '$1.07'],
      highlight: true
    }
  ],
  footnote: (
    <>
      SerpApi volumes and hourly figures are published on their{' '}
      <Link href={SERPAPI_PRICING}>pricing page</Link>, which also lists
      higher tiers from 250,000 searches a month ($1,475) to 54 million
      ($106,050). The per-1,000 column is arithmetic on each monthly price.
      Microlink rows are self-serve Pro plans from{' '}
      <Link href='/pricing'>pricing</Link>, and{' '}
      <Link href='/docs/api/basics/rate-limit'>rate limit</Link> states that no
      throttling is applied: parallel requests are bounded by the monthly quota.
      * {FAIR_USE_NOTE} The units differ, so read the volumes carefully. A
      SerpApi search is a search, and it does not count when it errors or is
      served from their one-hour cache. A Microlink request is any API call, so
      the same quota also covers screenshots, PDFs and metadata, and a result
      you expand with <code>.markdown()</code> costs one request of its own.
    </>
  )
}

export const COMPARISON = {
  title: (
    <>
      What each one <GradientText>puts in writing</GradientText>.
    </>
  ),
  caption: (
    <>
      Both products return public Google results as structured JSON, paginated,
      geo-targetable, and callable from an agent. What differs is the surface
      catalog, what arrives with each result, and what the vendor guarantees
      on paper. Every SerpApi row comes from their{' '}
      <Link href={SERPAPI_PRICING}>pricing page</Link>,{' '}
      <Link href={SERPAPI_MARKDOWN}>Markdown Output</Link>,{' '}
      <Link href={SERPAPI_SPEED}>Ludicrous Speed</Link> and{' '}
      <Link href={SERPAPI_LEGAL_SHIELD}>U.S. Legal Shield</Link> pages,
      including the rows where SerpApi has capabilities Microlink does not.
    </>
  ),
  columns: ['Microlink', 'SerpApi'],
  rows: [
    {
      feature: 'Hourly throughput limit',
      href: '/docs/api/basics/rate-limit',
      microlink: 'None',
      serpapi: '20% of plan',
      highlight: true,
      note: 'SerpApi sets the hourly limit at 20% of monthly volume below a million searches: 50 an hour on Free, 6,000 on Big Data. Microlink applies no throttling to legitimate use; the monthly quota is the only bound.'
    },
    {
      feature: 'Cost per 1,000',
      href: '/pricing',
      microlink: '$1.07',
      serpapi: '$1.96 to $25',
      highlight: true,
      note: 'Arithmetic on published monthly plans. Microlink is $1.07 on every self-serve plan, from $49 for 46,000 to $450 for 420,000. SerpApi falls with volume: $15.00 on Developer, $9.17 on Big Data, $3.75 at a million a month, $1.96 at 54 million.'
    },
    {
      feature: 'Billing unit',
      href: '/docs/guides/search/content-expansion',
      microlink: '1 request',
      serpapi: '1 search',
      note: 'One query is one unit on both, however many results it returns. SerpApi does not count errored searches or one-hour cache hits. A Microlink request is shared with every other product, and expanding a result costs one more.'
    },
    {
      feature: 'Page content of each result',
      href: '/docs/guides/search/content-expansion',
      microlink: true,
      serpapi: false,
      highlight: true,
      note: 'result.markdown() and result.html() fetch the linked page itself, at one request per result. SerpApi returns the results page; its Markdown Output renders that page as Markdown rather than reading the links.'
    },
    {
      feature: 'Screenshots, PDF and metadata',
      href: '/api',
      microlink: true,
      serpapi: false,
      highlight: true,
      note: 'The same key, SDK and quota also capture a page, print it to PDF, or return normalized metadata. SerpApi is a search product.'
    },
    {
      feature: 'One results array across surfaces',
      href: '/docs/sdk/methods/search',
      microlink: true,
      serpapi: false,
      note: 'Every Microlink surface returns page.results, with fields that fit the surface. SerpApi names the array per engine: organic_results, news_results, images_results, video_results, shopping_results, local_results, suggestions.'
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
      href: '/docs/sdk/methods/search',
      microlink: true,
      serpapi: true,
      note: 'Microlink takes period for recency and a two-letter country code for location. SerpApi takes gl, hl, a free-text location and tbs.'
    },
    {
      feature: 'MCP server',
      href: '/integrations/mcp',
      microlink: true,
      serpapi: true
    },
    {
      feature: 'Search surfaces',
      href: '/search',
      microlink: '10 Google',
      serpapi: '100+ APIs',
      note: 'Microlink covers web, news, images, videos, places, maps, shopping, scholar, patents and autocomplete. SerpApi lists 57 Google APIs, including AI Overview, AI Mode, Trends, Flights, Hotels, Jobs and Lens, plus Amazon, Bing, YouTube, Walmart, Yelp, Baidu and more.'
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
      note: 'Search is a method of the JavaScript SDK, a subcommand of the microlink.io CLI and a tool in the MCP server. SerpApi publishes clients for Ruby, Python, JavaScript, Go, PHP, Java, Rust, .NET, Swift and C++, plus a CLI.'
    },
    {
      feature: 'Paid latency tier',
      microlink: false,
      serpapi: true,
      note: 'Ludicrous Speed at 2× the standard price, Ludicrous Speed Max at 4×, on any paid plan.'
    },
    {
      feature: 'Uptime SLA',
      href: '/pricing',
      microlink: '99.9%',
      serpapi: '99.95%',
      note: 'SerpApi applies it to every plan, with service credits. Microlink applies 99.9% to every paid plan, with service credits on Enterprise.'
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
      note: 'From the Production plan up, the SerpApi U.S. Legal Shield covers the lawful collection of public search data, not how the data is used. Microlink offers no comparable cover.'
    }
  ],
  note: 'Last verified: September 2026. Check each product’s own pages for the latest.'
}

export const MIGRATION = {
  title: (
    <>
      From <GradientText>engine</GradientText> to type.
    </>
  ),
  caption:
    'A SerpApi integration is an HTTP call plus a parser per engine. On Microlink it is one method call, and the per-engine unwrapping goes away because every surface resolves to page.results. Most of the migration is this lookup table.',
  columns: ['SerpApi', 'Microlink'],
  rows: [
    {
      id: 'endpoint',
      serpapi: <code>GET serpapi.com/search.json</code>,
      microlink: <code>microlink.search(query, options)</code>
    },
    {
      id: 'api-key',
      serpapi: <code>api_key</code>,
      microlink: <code>createClient({'{ apiKey }'})</code>
    },
    {
      id: 'q',
      serpapi: <code>q</code>,
      microlink: 'The first argument, operators such as site: included'
    },
    {
      id: 'google',
      serpapi: <code>engine=google</code>,
      microlink: (
        <>
          <code>type</code> omitted, or <code>'search'</code>
        </>
      )
    },
    {
      id: 'news',
      serpapi: <code>engine=google_news</code>,
      microlink: <code>type: 'news'</code>
    },
    {
      id: 'images',
      serpapi: <code>engine=google_images</code>,
      microlink: <code>type: 'images'</code>
    },
    {
      id: 'videos',
      serpapi: <code>engine=google_videos</code>,
      microlink: <code>type: 'videos'</code>
    },
    {
      id: 'local',
      serpapi: <code>engine=google_local</code>,
      microlink: <code>type: 'places'</code>
    },
    {
      id: 'maps',
      serpapi: <code>engine=google_maps</code>,
      microlink: <code>type: 'maps'</code>
    },
    {
      id: 'shopping',
      serpapi: <code>engine=google_shopping</code>,
      microlink: <code>type: 'shopping'</code>
    },
    {
      id: 'scholar',
      serpapi: <code>engine=google_scholar</code>,
      microlink: <code>type: 'scholar'</code>
    },
    {
      id: 'patents',
      serpapi: <code>engine=google_patents</code>,
      microlink: <code>type: 'patents'</code>
    },
    {
      id: 'autocomplete',
      serpapi: <code>engine=google_autocomplete</code>,
      microlink: <code>type: 'autocomplete'</code>
    },
    {
      id: 'gl',
      serpapi: <code>gl=us</code>,
      microlink: <code>location: 'us'</code>
    },
    {
      id: 'start',
      serpapi: <code>start=10</code>,
      microlink: (
        <>
          <code>page: 2</code>, or <code>await page.next()</code>
        </>
      )
    },
    {
      id: 'results',
      serpapi: <code>organic_results, news_results, …</code>,
      microlink: <code>page.results</code>
    },
    {
      id: 'markdown',
      serpapi: <code>output=md</code>,
      microlink: <code>await page.markdown()</code>
    }
  ],
  note: 'SerpApi parameters from their Google engine docs, checked September 2026. Microlink options from the search method reference.'
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>SerpApi</GradientText> is the better pick.
    </>
  ),
  caption:
    'SerpApi covers more engines, sells more guarantees and signs more paperwork. Four cases where that settles the question in its favor.',
  items: [
    {
      title: 'Anything past ten Google surfaces',
      body: 'SerpApi lists more than a hundred APIs: Amazon, Walmart, Bing, YouTube, Yandex, Yelp, Zillow, Baidu, DuckDuckGo and the App Store, plus 57 Google APIs that include AI Overview, AI Mode, Trends, Flights, Hotels, Jobs and Lens. Microlink Search covers ten Google surfaces. If the job is Amazon pricing or tracking AI Overviews, there is no Microlink answer to compare.'
    },
    {
      title: 'A throughput number in the contract',
      body: 'Every SerpApi plan states the successful searches it guarantees per hour, from 50 on Free to 640,000 on its largest Cloud tier. Microlink applies no throttling and sells no parallelism tier, so there is nothing to throttle, but there is also no figure to size a worker pool against or point to in a review.'
    },
    {
      title: 'Certifications and legal cover',
      body: 'SerpApi publishes SOC 2 Type II, SOC 3 and ISO 27001 certification, a 99.95% uptime SLA with credits on every plan, a U.S. Legal Shield of up to $2 million from the Production plan up, and a ZeroTrace mode on Enterprise that retains no query or result. If procurement is the gate, that list is the answer.'
    },
    {
      title: 'Native clients and a free tier',
      body: 'SerpApi ships clients for Ruby, Python, JavaScript, Go, PHP, Java, Rust, .NET, Swift and C++, plus a CLI, and 250 searches a month at no cost. Microlink Search is a JavaScript SDK method, a CLI subcommand and an MCP tool, on a paid plan. If the service is written in Java and wants a native client, that settles it.'
    }
  ]
}

export const PRICING_TITLE = 'Pay per month, not per hour'

export const PRICING_CAPTION = (
  <Text>
    Search runs on any Pro plan, at the same price per 1,000 on every tier, and
    the quota it draws from is the one every other product uses. Spend it on
    searches, screenshots or <Link href='/markdown'>Markdown</Link> in whatever
    mix the month needs. The free plan covers every product except Search.
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
    'Monthly quota, no hourly limit'
  ]
}

export const FAQ_CAPTION =
  'Cost, quota, surfaces, and what happens to the parsing code you already have.'

export const FAQ_ITEMS = [
  {
    question: 'Is Microlink a drop-in replacement for SerpApi?',
    text: 'No. SerpApi is an HTTP endpoint that takes an engine parameter and a query, and returns a payload shaped per engine. Microlink Search is a method of the JavaScript SDK that takes a query plus a type, and always resolves to page.results. A migration is usually one module: the engine name becomes type, the per-engine unwrapping goes away, and the field names change once. The lookup table above maps every Google engine and parameter.',
    answer: (
      <div>
        No. SerpApi is an HTTP endpoint that takes an engine parameter and a
        query, and returns a payload shaped per engine. Microlink Search is the{' '}
        <Link href='/docs/sdk/methods/search'>search</Link> method of the{' '}
        <Link href='/integrations/sdk'>JavaScript SDK</Link>: it takes a query
        plus a <code>type</code>, and always resolves to{' '}
        <code>page.results</code>. A migration is usually one module: the engine
        name becomes <code>type</code>, the per-engine unwrapping goes away, and
        the field names change once. The{' '}
        <Link href='#migration'>lookup table</Link> maps every Google engine and
        parameter.
      </div>
    )
  },
  {
    question: 'Is Microlink Search cheaper than SerpApi?',
    text: 'Per unit, yes on every published paid plan. Microlink costs $1.07 per 1,000 requests on every self-serve Pro plan, from $49 for 46,000 to $450 for 420,000. SerpApi costs $25.00 per 1,000 on Starter, $9.17 on Big Data and $3.75 at a million searches a month. The units are not identical: a Microlink request also pays for screenshots, PDFs and page expansions, while SerpApi does not charge for errored searches or one-hour cache hits.',
    answer: (
      <div>
        Per unit, yes on every published paid plan. Microlink costs $1.07 per
        1,000 requests on every self-serve Pro <Link href='/pricing'>plan</Link>,
        from $49 for 46,000 to $450 for 420,000. SerpApi costs $25.00 per 1,000 on
        Starter, $9.17 on Big Data and $3.75 at a million searches a month. The
        units are not identical: a Microlink request also pays for screenshots,
        PDFs and page expansions, while SerpApi does not charge for errored
        searches or one-hour cache hits. The{' '}
        <Link href='#throughput'>plan table</Link> has the arithmetic.
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
    text: 'No. Microlink applies no throttling: you can run as many parallel requests as the quota allows, and the quota resets monthly on Pro. This applies to legitimate use: traffic that is fraudulent, illegal or aimed at third parties is restricted. Every response carries x-rate-limit-limit, x-rate-limit-remaining and x-rate-limit-reset, and requests return HTTP 429 once the quota is spent. SerpApi instead sets an hourly throughput limit on each plan, 20% of the monthly volume below a million searches.',
    answer: (
      <div>
        No. Microlink applies no throttling: you can run as many parallel
        requests as the quota allows, and the quota resets monthly on Pro. This
        applies to legitimate use: traffic that is fraudulent, illegal or aimed
        at third parties is restricted. Every response carries{' '}
        <code>x-rate-limit-limit</code>,{' '}
        <code>x-rate-limit-remaining</code> and <code>x-rate-limit-reset</code>,
        and requests return HTTP 429 once the quota is spent. See{' '}
        <Link href='/docs/api/basics/rate-limit'>rate limit</Link>. SerpApi
        instead sets an hourly throughput limit on each plan, 20% of the monthly
        volume below a million searches.
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
    about: {
      '@type': 'Thing',
      name: 'SerpApi',
      sameAs: 'https://serpapi.com'
    },
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Microlink Search',
      keywords: [
        'serpapi alternative',
        'google search api',
        'serp api',
        'search api for ai agents'
      ],
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
