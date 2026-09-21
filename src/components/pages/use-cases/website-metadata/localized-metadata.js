export const CONTENT = {
  slug: 'website-metadata/localized-metadata',
  head: {
    title: 'Get localized metadata: titles and prices by country',
    description:
      'Fetch the title, description and price a visitor in a given country sees: pin the request with proxy.location and send the matching Accept-Language header.'
  },
  hero: {
    title: 'Fetch localized metadata as a visitor in another country sees it',
    intro:
      'Localized metadata is what a visitor in a given country actually sees: the translated title, the local currency, the regional availability. A preview generated from a US datacenter shows the US version to everyone. Pin the Metadata API request to the visitor’s country and language and the response matches their view, which is what price monitors, travel and retail aggregators and international newsletters need.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Websites localize their metadata, extractors do not',
    paragraphs: [
      'Stores show local currency, publishers translate titles, and some pages redirect to a regional domain based on where the request comes from. An extractor with one exit country reports one version of the truth, and it is rarely the one your user in Berlin or Tokyo sees.',
      'Setting Accept-Language alone does not fix it, because geo-targeting reads the origin IP rather than a header. Running your own servers or proxies in every market is the other option, and it turns a metadata call into infrastructure you maintain per country.',
      '[proxy.location](/docs/api/parameters/proxy/location) routes the request through a proxy IP in the country you choose, [headers](/docs/api/parameters/headers) adds the Accept-Language the site negotiates on, and a [data rule](/docs/api/parameters/data) captures a localized value such as the price. Each combination is cached separately.'
    ]
  },
  how: {
    title: 'How to fetch metadata from another country',
    intro:
      'Two request options localize the page, and a rule reads the value that differs. Both options are part of Pro plans, as the [proxy guide](/docs/guides/common/proxy) explains.',
    steps: [
      {
        label: '1 · Metadata as seen from a country',
        sdk: "const { title, description } = await microlink.metadata('https://example.com/product', {\n  proxy: { location: 'de' }\n})",
        note: 'The request exits from a German IP, so the site serves its German-region version and the normalized title and description come from that version.'
      },
      {
        label: '2 · Add the language and the local price',
        sdk: "const { title, price } = await microlink.metadata('https://example.com/product', {\n  proxy: { location: 'de' },\n  headers: { 'Accept-Language': 'de-DE' },\n  data: {\n    price: { selector: '.price', attr: 'text' }\n  }\n})",
        note: 'The language header completes the localization, and the rule captures the price text exactly as displayed, currency symbol included.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/product',
          params: {
            proxy: { location: 'de' },
            headers: { 'Accept-Language': 'de-DE' }
          },
          pro: true
        },
        note: 'proxy.location and headers are Pro options, so the URL targets pro.microlink.io. Header values in the query string are public, so keep them to non-sensitive ones such as Accept-Language.'
      }
    ],
    params: [
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'ISO 3166-1 alpha-2 country code, case-insensitive. Default us. Exclusive with proxy.url. Pro plans.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forwards Accept-Language and other non-sensitive headers to the target. Pro plans.'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'A rule for the localized value the normalized fields do not carry, such as the price.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Extra separation when the same URL must be cached per audience. Pro plans.'
      }
    ],
    outro:
      'Verify the exit country first: request https://geolocation.microlink.io with the same proxy.location and it returns the IP and the country the target sees. An unknown country code is rejected with EINVALQUERY.'
  },
  why: {
    title: 'Why a price-by-country lookup needs a real exit IP',
    intro:
      'Sites decide the region from the IP. Only a request from that region gets that region’s metadata.',
    cards: [
      {
        kicker: 'IP-based region',
        title: 'proxy.location makes the request come from there.',
        body: 'Geo-targeting reads the origin IP. A proxy exit in the target country is the only way to be served that version, and it is one option on the request rather than a server you run in each market.',
        note: 'The same exit works for the visual side of the job: see [screenshots from another country](/use-cases/website-screenshot/proxy-geolocation).'
      },
      {
        kicker: 'Header-based language',
        title: 'Accept-Language completes the picture.',
        body: 'Many sites pick the region from the IP and the language from the header. Setting both returns titles and descriptions in the local language, with the local currency.',
        note: 'Keep secrets out of the headers parameter, because it travels in the query string. Cookies and tokens go in [x-api-header-* request headers](/docs/guides/metadata/private-pages) instead.'
      },
      {
        kicker: 'Cached per audience',
        title: 'Each country and language pair is its own entry.',
        body: 'The cache key is derived from the URL and every recognized parameter, so the German and the Japanese versions of a page never overwrite each other. Cache hits do not count against your quota.',
        note: 'When not to: sites that localize only from the browser language need just the header, without a proxy. Check which signal the target uses before you route every request through a country.'
      }
    ]
  },
  faq: [
    {
      question:
        'Can I get metadata as a visitor from a specific country would see it?',
      answer:
        'Yes. Pass proxy.location with the two-letter country code on a Pro plan and the request is routed through a proxy IP in that country. The normalized title, description and image then come from the version of the page served to that region.'
    },
    {
      question: 'Which countries can a localized metadata request exit from?',
      answer:
        'proxy.location accepts ISO 3166-1 alpha-2 country codes, and the [location reference](/docs/api/parameters/proxy/location) lists every supported one. The value is case-insensitive and defaults to us. Unknown codes are rejected with EINVALQUERY.'
    },
    {
      question: 'Does proxy.location also translate the page metadata?',
      answer:
        'Only if the site derives the language from the IP. Sites that negotiate language from the browser also need the Accept-Language header, passed through the headers parameter. Send both when you are not sure which signal the target uses.'
    },
    {
      question: 'Are localized link previews cached separately per country?',
      answer:
        'Yes. Different proxy.location or header values produce different cache keys, so each market keeps its own entry for 24 hours by default. Add cacheKey on Pro plans when you need an extra namespace.'
    },
    {
      question: 'How do I capture the local price next to the metadata?',
      answer:
        'Add a data rule that targets the price element, for example selector .price with attr text. It comes back next to the normalized fields, in the currency the site shows to that country. See [custom fields alongside metadata](/use-cases/website-metadata/custom-fields) for typed rules and lists.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'localized metadata',
    body: 'Titles, descriptions and prices as each market sees them. Get a Pro key and fetch your first regional version today.',
    href: '/metadata',
    label: 'Fetch localized metadata'
  },
  howTo: {
    name: 'How to fetch localized metadata from another country',
    steps: [
      {
        title: 'Pin the request to a country',
        description:
          'Pass proxy.location with the ISO 3166-1 alpha-2 code of the target country on a Pro plan, so the request exits from an IP in that country.'
      },
      {
        title: 'Send the matching language',
        description:
          'Add an Accept-Language header through the headers parameter for sites that negotiate the language from the browser.'
      },
      {
        title: 'Capture the localized value',
        description:
          'Add a data rule for the field that differs per market, such as the price, and read it next to the normalized metadata.'
      },
      {
        title: 'Verify the exit country',
        description:
          'Request geolocation.microlink.io with the same proxy.location to confirm the IP and country the target sees.'
      }
    ]
  }
}
