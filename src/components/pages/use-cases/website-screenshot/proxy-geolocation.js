export const CONTENT = {
  slug: 'website-screenshot/proxy-geolocation',
  head: {
    title: 'Screenshot a website from a specific country',
    description:
      'See a page as a local visitor does: pin the request to a country with proxy.location, set the language header and capture region-specific content.'
  },
  hero: {
    title: 'Screenshot a website as seen from a specific country',
    intro:
      'Prices, availability, legal notices and even the language change with the visitor’s country. To capture what a customer in France or Japan actually sees, the request has to come from there. proxy.location pins the exit country of the built-in proxy.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Geo-targeted pages show you the wrong version',
    paragraphs: [
      'Localization is decided server-side from the IP address, sometimes combined with the Accept-Language header. A screenshot taken from a datacenter in the United States shows the US store, the US price and the US cookie notice, whatever your users elsewhere get.',
      'With proxy.location the request exits from a proxy in the country you choose, so the target serves that region’s version. Add the language header and the page renders in the local language too.'
    ]
  },
  how: {
    title: 'Pick the country, then the language',
    intro:
      'Two parameters cover most localization logic: the exit country for IP-based targeting and Accept-Language for language negotiation.',
    steps: [
      {
        label: '1 · Capture from a country',
        sdk: "const { url } = await microlink.screenshot('https://example.com/pricing', {\n  proxy: { location: 'fr' }\n})",
        note: 'The request is routed through a proxy in France and the page serves its French region variant.'
      },
      {
        label: '2 · Match the language as well',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  proxy: { location: 'jp' },\n  headers: { 'Accept-Language': 'ja-JP' }\n})",
        note: 'Sites that negotiate language from the header render in Japanese instead of falling back to English.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/pricing',
          params: {
            screenshot: true,
            meta: false,
            proxy: { location: 'fr' }
          },
          pro: true
        },
        note: 'proxy.location is a Pro option; unknown country codes are rejected with EINVALQUERY.'
      }
    ],
    params: [
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'ISO 3166-1 alpha-2 country code, case-insensitive. Default us. Exclusive with proxy.url.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Non-sensitive request headers such as Accept-Language, forwarded to the target.'
      },
      {
        name: 'device',
        href: '/docs/api/parameters/device',
        note: 'Combine with a mobile preset to capture the local mobile experience.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Keep one cache entry per country when the URL and options are otherwise identical.'
      }
    ],
    outro:
      'Verify the exit country before going to production by capturing geolocation.microlink.io with the same proxy.location: it prints the IP and country the target sees.'
  },
  why: {
    title: 'Why the exit country has to be real',
    intro:
      'Spoofing headers is not enough for IP-based localization, and buying country proxies yourself is a full-time chore.',
    cards: [
      {
        kicker: 'IP-based targeting',
        title: 'The target decides the region from where the request comes.',
        body: 'Geo-targeting reads the IP, not the user agent. A proxy exit in the chosen country is the only way to be served that region’s content, and proxy.location gives you that exit in one option.',
        note: 'Supported countries span every continent; the [location reference](/docs/api/parameters/proxy/location) lists every code.'
      },
      {
        kicker: 'Language is separate',
        title: 'Accept-Language completes the picture.',
        body: 'Many sites choose the region from the IP and the language from the header. Setting both keeps the capture consistent with what a native visitor sees, currency and copy included.',
        note: 'Headers passed this way are public query parameters, so keep secrets in [request headers](/use-cases/website-screenshot/behind-login) instead.'
      },
      {
        kicker: 'Verifiable',
        title: 'geolocation.microlink.io shows the country the target sees.',
        body: 'Before capturing a thousand pages, capture the geolocation endpoint with the same proxy.location. It echoes the exit IP and country, so a misconfigured code is caught in one request.',
        note: 'When not to: if the page localizes only from the browser language, a plain Accept-Language header without a proxy is enough and cheaper.'
      }
    ]
  },
  faq: [
    {
      question: 'Which countries are supported?',
      answer:
        'Countries on every continent, identified by their two-letter ISO code, with us as the default. The [proxy.location reference](/docs/api/parameters/proxy/location) lists every supported code.'
    },
    {
      question: 'Can I use proxy.location and my own proxy at the same time?',
      answer:
        'No. location and proxy.url are exclusive. If you already pay for a country-specific proxy, pass its URL as proxy.url instead.'
    },
    {
      question: 'Does the exit country change the language of the page?',
      answer:
        'Only when the site derives language from the IP. Sites that negotiate language from the browser need the Accept-Language header as well, which you can pass through the headers parameter.'
    },
    {
      question: 'Are geolocated screenshots cached separately per country?',
      answer:
        'Yes. The cache key includes every recognized query parameter, so two requests with different proxy.location values are cached separately. Use cacheKey when you need extra separation.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'local versions',
    body: 'Prices, stock and copy as your customers in each country see them. Get a Pro key and pin the request to any supported country.',
    href: '/screenshot',
    label: 'Capture from another country'
  }
}
