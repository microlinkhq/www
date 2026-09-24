export const CONTENT = {
  slug: 'proxy/geo-blocked-websites',
  head: {
    title: 'Fetch geo-blocked websites from another country',
    description:
      'Fetch geo-restricted content through a proxy in one of 181 countries: set proxy.location, verify the exit IP and get the page as HTML, Markdown or data.'
  },
  hero: {
    title: 'Fetch geo-restricted pages from the country they are meant for',
    intro:
      'To fetch a website from another country, the request has to leave from an IP in that country; a header or a VPN on your laptop does not help a server-side job. Streaming catalogs, regional news, government portals, local marketplaces and country-only launches all answer foreign traffic with a block page, a redirect or a trimmed version. One request option moves the exit to the country you name, on every Microlink product.',
    cta: { label: 'See how the proxy works', href: '/features/proxy' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Geo-restricted content serves your servers a different page, or none',
    paragraphs: [
      'Geo-restrictions read the IP, not your intent. A crawler in a US datacenter asking for a page reserved for Japan gets “not available in your region”, a redirect to the international homepage, or the same URL with half the content missing. The request succeeds, so a pipeline that only checks the status code stores the wrong page.',
      'The workarounds cost more than the fetch. A VPN covers one country at a time and does not belong in a server fleet. Buying a proxy per market means one contract, one credential and one integration per country, plus a way to prove each exit actually sits where the vendor says. Setting Accept-Language changes the language you ask for, not the country you appear to come from.',
      '[proxy.location](/docs/api/parameters/proxy/location) takes a two-letter ISO country code and routes the request through a proxy IP in that country. 181 codes are supported, the default is us, and it works the same for HTML, Markdown, screenshots, PDFs and data extraction. geolocation.microlink.io shows which IP and country the target sees, so you can check the route before trusting the content.'
    ]
  },
  how: {
    title: 'How to fetch a geo-blocked website from another country',
    intro:
      'Check the exit once, then fetch the real target with the same country code. Both calls need a Pro key. The [geolocation section of the proxy guide](/docs/guides/common/proxy) shows the same verification with the interactive editor.',
    steps: [
      {
        label: '1 · Confirm the exit country',
        sdk: `const seen = await microlink.text('https://geolocation.microlink.io', {
  proxy: { location: 'jp' }
})`,
        note: 'geolocation.microlink.io reports the IP address and country of whoever requests it. Through proxy.location jp, the text it returns should name Japan, which proves the route before you spend requests on the real target.'
      },
      {
        label: '2 · Fetch the geo-restricted page',
        sdk: `const markdown = await microlink.markdown('https://example.jp/catalog', {
  proxy: { location: 'jp' },
  headers: { 'x-api-header-accept-language': 'ja-JP' }
})`,
        note: 'The page is requested from a Japanese IP and converted to Markdown. The x-api-header- prefix forwards Accept-Language to the site, for pages that negotiate language as well as region.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.jp/catalog',
          params: {
            proxy: { location: 'jp' },
            data: { markdown: { attr: 'markdown' } },
            meta: false
          },
          pro: true
        },
        note: 'proxy.location is a Pro option, so the URL goes to the Pro endpoint with your x-api-key header. An unknown country code is rejected with EINVALQUERY instead of silently falling back.'
      }
    ],
    params: [
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'ISO 3166-1 alpha-2 code, case-insensitive, 181 countries. Default us. Pro plans.'
      },
      {
        name: 'proxy.url',
        href: '/docs/api/parameters/proxy/url',
        note: 'Your own proxy instead of a country pin. Exclusive with proxy.location.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forwards Accept-Language or other headers the site negotiates on. Pro plans.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Keeps each country’s copy cached from 1 minute to 31 days. Pro plans.'
      }
    ],
    outro:
      'The cache key includes every recognized query parameter, as the [cache reference](/docs/api/basics/cache) explains, so each country gets its own cached copy of the same URL. For a visual record of the regional version, [screenshot the site from another country](/use-cases/website-screenshot/proxy-geolocation) with the same option.'
  },
  why: {
    title: 'Why a country parameter beats a VPN or a proxy per market',
    intro:
      'Geo-restricted content is a routing problem with a verification problem attached. Keeping both in one API means one integration covers every market.',
    cards: [
      {
        kicker: '181 countries, one option',
        title: 'Change the market by changing two letters.',
        body: 'The exit country is a request option, so a job that covers five markets is five calls with five codes. There is no contract, credential or client per country to maintain.',
        note: 'For prices specifically, [scraping prices by country](/use-cases/proxy/geo-targeted-prices) turns the same option into a comparison table.'
      },
      {
        kicker: 'Verifiable exits',
        title: 'Check the country before you trust the page.',
        body: 'geolocation.microlink.io echoes the IP and country the target sees. Running it with the same proxy.location takes one request and settles whether a strange result is the site or the route.',
        note: 'The response header x-fetch-mode ends in -proxy when the proxy route was used, as the [proxy parameter reference](/docs/api/parameters/proxy) shows.'
      },
      {
        kicker: 'Every output',
        title: 'The same country pin on any product.',
        body: 'proxy.location is a shared option, so the regional page can come back as Markdown for an index, HTML for your parser, a screenshot for evidence or extracted fields for a table, without a second integration per output.',
        note: 'When not to: a region lock enforced by a login, a subscription or a licence is not an IP problem, and a proxy is not the answer. Only fetch regional content you are permitted to access; the [pricing page](/pricing) lists which plans include the proxy.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I fetch a website from another country with an API?',
      answer:
        'Add proxy.location with the two-letter ISO code of the country, for example jp or de, to a request on a Pro plan. The request leaves through a proxy IP in that country and the site answers as it would to a local visitor.'
    },
    {
      question: 'Which countries can a geo-restricted request come from?',
      answer:
        '181 countries, each identified by its ISO 3166-1 alpha-2 code. The value is case-insensitive and defaults to us; unknown codes are rejected with EINVALQUERY. The full list is in the [proxy.location reference](/docs/api/parameters/proxy/location).'
    },
    {
      question: 'How do I check which country a proxied request exits from?',
      answer:
        'Request geolocation.microlink.io with the same proxy.location. It returns the IP address and country the server sees, which is exactly what the geo-restricted site will see.'
    },
    {
      question: 'Can I access geo-blocked content through my own proxy instead?',
      answer:
        'Yes. Pass your provider’s URL as proxy.url, for example a country-specific endpoint you already pay for. proxy.url and proxy.location are exclusive, so use one or the other per request.'
    },
    {
      question: 'Does the cache mix up pages fetched from different countries?',
      answer:
        'No. The cache key is derived from the target URL and all recognized query parameters, proxy.location included, so the Japanese and German versions of the same URL are separate entries. Cache hits never count toward your quota.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to fetch',
    headlineAccent: 'from any market',
    body: 'Two letters per request, 181 countries, one integration. Verify the exit, then fetch the page as locals see it.',
    href: '/features/proxy',
    label: 'Reach geo-blocked pages'
  },
  howTo: {
    name: 'How to fetch a geo-blocked website from another country',
    steps: [
      {
        title: 'Confirm the exit country',
        description:
          'Request geolocation.microlink.io with proxy.location set to the target country and check that the IP and country it reports match.'
      },
      {
        title: 'Fetch the geo-restricted page',
        description:
          'Request the target URL with the same proxy.location, adding an Accept-Language header through the x-api-header- prefix when the site also negotiates language.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Send url, proxy.location, data.markdown.attr=markdown and meta=false to pro.microlink.io with the x-api-key header.'
      }
    ]
  }
}
