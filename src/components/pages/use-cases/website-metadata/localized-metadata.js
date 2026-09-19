export const CONTENT = {
  slug: 'website-metadata/localized-metadata',
  head: {
    title: 'Region-specific titles, prices and descriptions',
    description:
      'Fetch the metadata a visitor in a given country sees: pin the request to a country with proxy.location, set the language header, capture the local price.'
  },
  hero: {
    title: 'Fetch the metadata a visitor in another country sees',
    intro:
      'Titles, descriptions, prices and availability are localized by IP and by language. A preview generated from a US datacenter shows the US version to everyone. Pin the request to the visitor’s country and language and the metadata matches what they would see.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Metadata is localized, extractors are not',
    paragraphs: [
      'Stores show local currency, publishers translate titles, and some pages redirect to a regional domain based on the request’s origin. An extractor with one exit country reports one version of the truth.',
      'proxy.location routes the request through a proxy in the country you choose, headers adds the Accept-Language the site negotiates on, and a data rule captures a localized value such as the price. Each combination is cached separately.'
    ]
  },
  how: {
    title: 'Country, language, then the local field',
    intro:
      'Two request options localize the page; a rule reads the value that differs.',
    steps: [
      {
        label: '1 · Metadata as seen from a country',
        sdk: "const { title, description } = await microlink.metadata('https://example.com/product', {\n  proxy: { location: 'de' }\n})",
        note: 'The request exits from Germany and the page serves its German-region version.'
      },
      {
        label: '2 · Add the language and the local price',
        sdk: "const { title, price } = await microlink.metadata('https://example.com/product', {\n  proxy: { location: 'de' },\n  headers: { 'Accept-Language': 'de-DE' },\n  data: {\n    price: { selector: '.price', attr: 'text' }\n  }\n})",
        note: 'The language header completes the localization and the rule captures the price text with its currency.'
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
        note: 'proxy.location and headers are Pro options; the URL targets the pro endpoint.'
      }
    ],
    params: [
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'ISO 3166-1 alpha-2 country code, default us. Exclusive with proxy.url.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Accept-Language and other non-sensitive headers forwarded to the target.'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'A rule for the localized value the normalized fields do not carry.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Extra separation when the same URL must be cached per audience.'
      }
    ],
    outro:
      'Verify the exit country with geolocation.microlink.io and the same proxy.location before relying on it in production.'
  },
  why: {
    title: 'Why localization needs a real exit',
    intro:
      'Sites decide the region from the IP. Only a request from that region gets that region’s metadata.',
    cards: [
      {
        kicker: 'IP-based region',
        title: 'proxy.location makes the request come from there.',
        body: 'Geo-targeting reads the origin IP. A proxy exit in the target country is the only way to be served that version, and it is one option away.',
        note: 'The [location reference](/docs/api/parameters/proxy/location) lists every supported country code.'
      },
      {
        kicker: 'Header-based language',
        title: 'Accept-Language completes the picture.',
        body: 'Many sites pick the region from the IP and the language from the header. Setting both returns titles and descriptions in the local language with the local currency.',
        note: 'Keep secrets out of the headers parameter; it is a public query string.'
      },
      {
        kicker: 'Cached per audience',
        title: 'Each country and language pair is its own entry.',
        body: 'The cache key includes every recognized parameter, so the German and the Japanese versions of a page never overwrite each other.',
        note: 'When not to: sites that localize only from the browser language need just the header, without a proxy; check which signal the target uses before paying for the proxy path.'
      }
    ]
  },
  faq: [
    {
      question: 'Can I get metadata as a visitor from a specific country would see it?',
      answer:
        'Yes. Pass proxy.location with the two-letter country code on a Pro plan and the request is routed through a proxy in that country.'
    },
    {
      question: 'Does proxy.location also translate the page?',
      answer:
        'Only if the site derives language from the IP. Sites that negotiate language from the browser need the Accept-Language header as well, passed through the headers parameter.'
    },
    {
      question: 'Are localized previews cached separately?',
      answer:
        'Yes. Different proxy.location or header values produce different cache keys. Add cacheKey when you need an extra namespace.'
    },
    {
      question: 'How do I capture the local price?',
      answer:
        'Add a data rule that targets the price element, for example selector .price with attr text, and it returns next to the normalized fields in the local currency.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'localized metadata',
    body: 'Titles, descriptions and prices as each market sees them. Get a Pro key and fetch your first regional version today.',
    href: '/metadata',
    label: 'Fetch localized metadata'
  }
}
