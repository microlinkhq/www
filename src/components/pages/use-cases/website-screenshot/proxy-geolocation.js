export const CONTENT = {
  slug: 'website-screenshot/proxy-geolocation',
  head: {
    title: 'Screenshot a website from another country via API',
    description:
      'See a page as a local visitor does: pin the request to a country with proxy.location, forward Accept-Language and capture regional prices and copy.'
  },
  hero: {
    title: 'Screenshot a website from another country, as locals see it',
    intro:
      'To screenshot a website from another country, the request has to come from there. Prices, availability, legal notices and even the language change with the visitor’s location, so ad verification, price monitoring, localization QA and compliance checks all need the regional version of a page. [proxy.location](/docs/api/parameters/proxy/location) pins the exit country of the built-in proxy with a two-letter code.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Geo-targeted pages serve your screenshot the wrong region',
    paragraphs: [
      'Localization is decided server-side from the IP address, sometimes combined with the Accept-Language header. A screenshot taken from a datacenter in the United States shows the US store, the US price and the US cookie notice, whatever your users elsewhere get.',
      'The workarounds are fragile. Appending a country parameter to the URL works only on sites that expose one, and spoofing Accept-Language changes the language but not the region. A VPN on a laptop does not scale past a handful of manual checks, and buying country-specific proxies means vetting providers, rotating exits and paying per country.',
      'With proxy.location the request exits from a proxy in the country you choose, so the target serves that region’s version. Forward Accept-Language with the [headers parameter](/docs/api/parameters/headers) and the page renders in the local language too. Both are Pro options, and they compose with everything else the [Screenshot API](/screenshot) does.'
    ]
  },
  how: {
    title:
      'How to take a geolocated screenshot of a website',
    intro:
      'Two parameters cover most localization logic: the exit country for IP-based targeting and Accept-Language for language negotiation. The [proxy guide](/docs/guides/common/proxy) shows both next to the other proxy patterns.',
    steps: [
      {
        label: '1 · Capture from a country',
        sdk: "const { url } = await microlink.screenshot('https://example.com/pricing', {\n  proxy: { location: 'fr' }\n})",
        note: 'The request is routed through a proxy in France, so the page serves its French variant: local prices, stock and legal copy. Codes are ISO 3166-1 alpha-2 and case-insensitive.'
      },
      {
        label: '2 · Match the language as well',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  proxy: { location: 'jp' },\n  headers: { 'x-api-header-accept-language': 'ja-JP' }\n})",
        note: 'The SDK sends headers as real HTTP request headers, and any header prefixed with x-api-header- is forwarded to the target with the prefix stripped. Sites that negotiate language from Accept-Language render in Japanese instead of falling back to English.'
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
        note: 'proxy.location is a Pro option, so the URL targets pro.microlink.io. Unknown country codes are rejected with the EINVALQUERY error instead of silently falling back to the default.'
      },
      {
        label: '4 · Verify the exit country first',
        sdk: "const { url } = await microlink.screenshot(\n  'https://geolocation.microlink.io',\n  { proxy: { location: 'fr' } }\n)",
        note: 'geolocation.microlink.io returns the origin IP and country seen by the server. Capturing it with the same proxy.location confirms the route before you spend requests on real targets.'
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
        note: 'Non-sensitive request headers such as Accept-Language, forwarded to the target. Pro plans.'
      },
      {
        name: 'device',
        href: '/docs/api/parameters/device',
        note: 'Combine with a mobile preset to capture the local mobile experience.'
      },
      {
        name: 'adblock',
        href: '/docs/api/parameters/adblock',
        note: 'On by default. Set it to false to keep regional consent banners in the capture.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Appends a custom identifier to the cache key when variants need extra separation. Pro plans.'
      }
    ],
    outro:
      'Requests with different proxy.location values are cached separately, because the [cache key](/docs/api/basics/cache) includes every recognized query parameter. One capture per country is rendered, and every repeat within the cache lifetime is a hit.'
  },
  why: {
    title: 'Why a screenshot from another country needs a real exit IP',
    intro:
      'Spoofing headers is not enough for IP-based localization, and buying country proxies yourself is a full-time chore.',
    cards: [
      {
        kicker: 'IP-based targeting',
        title: 'The target decides the region from where the request comes.',
        body: 'Geo-targeting reads the IP, not the user agent. A proxy exit in the chosen country is the only way to be served that region’s content, and proxy.location gives you that exit in one option, with no provider to vet.',
        note: 'The same option localizes other products: see [region-specific metadata](/use-cases/website-metadata/localized-metadata) for the titles, prices and descriptions a country gets.'
      },
      {
        kicker: 'Language is separate',
        title: 'Accept-Language completes the picture.',
        body: 'Many sites choose the region from the IP and the language from the header. Setting both keeps the capture consistent with what a native visitor sees, currency and copy included.',
        note: 'Values in the headers query parameter are public. Keep cookies and tokens in x-api-header-* request headers, as described in [screenshots behind a login](/use-cases/website-screenshot/behind-login).'
      },
      {
        kicker: 'Verifiable',
        title: 'geolocation.microlink.io shows the country the target sees.',
        body: 'Before capturing a thousand pages, capture the geolocation endpoint with the same proxy.location. It echoes the exit IP and country, so a misconfigured code is caught in one request.',
        note: 'When not to: if the page localizes only from the browser language, a forwarded Accept-Language header is enough and needs no country. If the site blocks automation altogether, start with the [built-in proxy recipe](/use-cases/website-screenshot/built-in-proxy).'
      }
    ]
  },
  faq: [
    {
      question: 'Which countries can I take a screenshot from?',
      answer:
        'Countries on every continent, identified by their ISO 3166-1 alpha-2 code, with us as the default. The value is case-insensitive, and the [proxy.location reference](/docs/api/parameters/proxy/location) lists every supported code.'
    },
    {
      question:
        'How do I screenshot a website from another country without a VPN?',
      answer:
        'Pass proxy.location with the country code, for example de for Germany, on a Pro key. The request exits from a proxy in that country, so the site serves its regional version with no VPN, no browser extension and no manual step.'
    },
    {
      question: 'Can I combine proxy.location with my own proxy for screenshots?',
      answer:
        'No. location and proxy.url are exclusive. If you already pay for a country-specific proxy, pass its URL as proxy.url instead and Microlink routes every sub-request of the page through it.'
    },
    {
      question: 'Does the exit country change the language of the screenshot?',
      answer:
        'Only when the site derives language from the IP. Sites that negotiate language from the browser also need Accept-Language, which you can pass through the headers parameter or as an x-api-header-accept-language request header.'
    },
    {
      question: 'Are geolocated screenshots cached separately per country?',
      answer:
        'Yes. The cache key includes every recognized query parameter, so two requests with different proxy.location values are cached separately. Use [cacheKey](/docs/api/parameters/cacheKey) when you need extra separation, for example per customer.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'local versions',
    body: 'Prices, stock and copy as your customers in each country see them. Get a Pro key and pin the request to any supported country.',
    href: '/screenshot',
    label: 'Capture from another country'
  },
  howTo: {
    name: 'How to screenshot a website from another country',
    steps: [
      {
        title: 'Capture from a country',
        description:
          'Set proxy.location to the two-letter ISO code of the country. The request exits from a proxy there and the site serves its regional version.'
      },
      {
        title: 'Match the language',
        description:
          'Forward an Accept-Language header so sites that negotiate language from the browser render in the local language as well.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Send the request to pro.microlink.io with your x-api-key header. Unknown country codes are rejected with EINVALQUERY.'
      },
      {
        title: 'Verify the exit country',
        description:
          'Capture geolocation.microlink.io with the same proxy.location to confirm the IP and country the target sees before a production run.'
      }
    ]
  }
}
