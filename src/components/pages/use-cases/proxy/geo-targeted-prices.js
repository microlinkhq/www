export const CONTENT = {
  slug: 'proxy/geo-targeted-prices',
  head: {
    title: 'Scrape prices by country with a geo-targeted proxy',
    description:
      'Scrape the price shown in each country as structured data: one extraction request per market, pinned with proxy.location, merged into one table.'
  },
  hero: {
    title: 'Scrape the price each country sees, as structured data',
    intro:
      'To scrape prices by country, every request has to look local to the market you are measuring, because stores set currency, tax display, discounts and availability from the visitor’s IP. Pricing teams, marketplace sellers, travel aggregators and analysts comparing regional pricing all need the same thing: one row per country, with numbers they can compare. Extraction rules plus a country pin turn each storefront into that row.',
    cta: { label: 'See how the proxy works', href: '/features/proxy' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Your scraper records one country’s price and calls it the price',
    paragraphs: [
      'A scraper running in one region sees one version of the store. The German shopper sees euros with VAT included, the US shopper sees dollars before tax, the UK page shows a promotion nobody else gets, and some products are simply not sold everywhere. Monitoring from a single exit gives you a clean, confident dataset of the wrong prices for every other market.',
      'Getting the other versions the hard way means an exit per market and a scraper that knows which to use. You buy country proxies, map each one to a job, keep a browser running for stores that render prices in JavaScript, and parse a different currency format per locale. When a number looks off, there is no quick way to tell whether the store changed its price or a proxy landed in the wrong country.',
      'Microlink combines both halves in one request. [proxy.location](/docs/api/parameters/proxy/location) routes the call through an IP in the country you name, one of 181, and [data rules](/docs/api/parameters/data) read the price, currency and availability from the rendered page with a type that casts the price to a number. One request per country gives you one comparable row per market.'
    ]
  },
  how: {
    title: 'How to scrape prices by country with extraction rules',
    intro:
      'Define the rules once, run them once per country, and merge the rows. The [extract method](/docs/sdk/methods/extract) documents selectors, attributes and types.',
    steps: [
      {
        label: '1 · One extraction per country',
        sdk: `const url = 'https://shop.example.com/product/42'
const countries = ['us', 'gb', 'de', 'jp']

const rules = {
  price: { selector: '[itemprop="price"]', attr: 'content', type: 'number' },
  currency: { selector: '[itemprop="priceCurrency"]', attr: 'content' },
  availability: { selector: '[itemprop="availability"]', attr: 'href' }
}

const rows = await Promise.all(
  countries.map(async country => {
    const row = await microlink.extract(url, rules, {
      proxy: { location: country },
      ttl: '1h'
    })
    return Object.assign({ country }, row)
  })
)`,
        note: 'Four requests run in parallel, each from a different country, and rows resolves to one object per market with a numeric price, its currency and the availability link. ttl keeps each country’s answer for an hour.'
      },
      {
        label: '2 · Match the language to the market',
        sdk: `const row = await microlink.extract(url, rules, {
  proxy: { location: 'de' },
  headers: { 'x-api-header-accept-language': 'de-DE' }
})`,
        note: 'Some stores pick the currency from the IP but the language, and occasionally the price format, from Accept-Language. The x-api-header- prefix forwards it to the store so both signals point at the same market.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://shop.example.com/product/42',
          params: {
            proxy: { location: 'de' },
            data: {
              price: { selector: '[itemprop="price"]', attr: 'content', type: 'number' },
              currency: { selector: '[itemprop="priceCurrency"]', attr: 'content' }
            },
            meta: false
          },
          pro: true
        },
        note: 'One URL per country: change proxy.location and keep the rest. The Pro endpoint with your x-api-key header returns the price and currency under data.'
      }
    ],
    params: [
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'ISO 3166-1 alpha-2 country code for the market, case-insensitive. Default us. Pro plans.'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'Extraction rules: selector, attr and a type such as number for the price.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forwards Accept-Language for stores that localize by language too. Pro plans.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache lifetime per country, from 1 minute to 31 days. Pro plans.'
      }
    ],
    outro:
      'Microlink has no scheduler, so run the job from your own cron or queue and store the rows with a timestamp. If the price only renders after JavaScript, add [waitForSelector](/docs/api/parameters/waitForSelector) with the price selector.'
  },
  why: {
    title: 'Why per-country extraction beats one global price scraper',
    intro:
      'A price comparison is only as good as its weakest market. Treating the country as a request option makes every market a first-class row.',
    cards: [
      {
        kicker: 'Comparable numbers',
        title: 'Typed values, not strings to clean.',
        body: 'The number type returns the price as a number and the currency comes back as its own field, so the table you build compares like with like instead of parsing “1.299,00 €” against “$1,299.00”.',
        note: 'Structured rules are covered end to end in the [data extraction guide](/docs/guides/data-extraction).'
      },
      {
        kicker: 'Cached per market',
        title: 'Each country is its own cache entry.',
        body: 'The cache key includes every recognized query parameter, proxy.location among them, so the German and Japanese answers never overwrite each other. Cache hits never count toward your quota.',
        note: 'Each country is one request on a cold cache, so four markets are four requests. Plans and quotas are on the [pricing page](/pricing).'
      },
      {
        kicker: 'Rendered, not raw',
        title: 'Prices injected by JavaScript still count.',
        body: 'The rules run against the page after a real browser renders it, so a price that a storefront fills in client-side is read like any other element. The country pin and the rendering happen in the same request.',
        note: 'When not to: if you only need a localized title, description or preview image rather than a price table, [localized metadata](/use-cases/website-metadata/localized-metadata) does it without writing rules.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I scrape prices by country?',
      answer:
        'Write extraction rules for the price and currency, then send one request per country with proxy.location set to that country’s ISO code. Each response is the price a local visitor sees, and merging them gives you one row per market.'
    },
    {
      question: 'Why does a scraped price differ from the one in my browser?',
      answer:
        'The store localizes by IP. Your browser and your scraper leave from different countries or networks, so they are shown different currencies, taxes or promotions. Pin the scraper to the market you are checking with proxy.location.'
    },
    {
      question: 'How many countries can I monitor prices in?',
      answer:
        '181. proxy.location accepts any ISO 3166-1 alpha-2 code in the [supported list](/docs/api/parameters/proxy/location); unknown codes fail with EINVALQUERY rather than falling back to a default.'
    },
    {
      question: 'Does each country count as a separate price request?',
      answer:
        'Yes. Each country is its own request and its own cache entry. Repeat reads within the cache lifetime are cache hits, which never count toward your quota, so a dashboard that re-reads the same markets costs nothing extra until the ttl expires.'
    },
    {
      question: 'Should I use price extraction or localized metadata for regional pages?',
      answer:
        'Use extraction rules when you need numbers to compare, such as price, currency and stock. Use [localized metadata](/use-cases/website-metadata/localized-metadata) when you need the regional title, description and image for a link preview. Both rely on the same proxy.location option.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to compare',
    headlineAccent: 'prices across markets',
    body: 'One set of rules, one request per country, 181 markets available. Get a Pro key and build the table.',
    href: '/features/proxy',
    label: 'Compare prices by country'
  },
  howTo: {
    name: 'How to scrape prices by country',
    steps: [
      {
        title: 'Run one extraction per country',
        description:
          'Define rules for price, currency and availability, then call the extract method once per country code with proxy.location set to that country, in parallel.'
      },
      {
        title: 'Match the language to the market',
        description:
          'Forward an Accept-Language header with the x-api-header- prefix for stores that localize by language as well as by IP.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Send url, proxy.location, the data rules and meta=false to pro.microlink.io with the x-api-key header, changing only the country code per market.'
      }
    ]
  }
}
