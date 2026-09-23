export const CONTENT = {
  slug: 'proxy/rotating-proxy-alternative',
  head: {
    title: 'A rotating proxy API alternative for web scraping',
    description:
      'A scraping API with built-in proxies: blocked requests escalate through proxy tiers up to residential, and the tier that works is remembered per domain.'
  },
  hero: {
    title: 'Replace rotating proxies with an API that picks the route',
    intro:
      'A rotating proxy API sells you exits; you still have to run the browser, notice the block, choose the next IP and decide when a site deserves a residential one. A scraping API with built-in proxies moves those decisions to the other side of the request. On Pro plans, Microlink routes blocked requests through its proxy tiers automatically and learns per domain which route works, so your code asks for a page and gets the page.',
    cta: { label: 'See how the proxy works', href: '/features/proxy' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A rotating proxy gives you IP addresses, not pages',
    paragraphs: [
      'Proxy rotation for scraping starts simple: point the HTTP client at a gateway and let it hand out a new exit per request. Then a target serves a challenge on a 200, another only lets residential traffic through, a third works on datacenter IPs and does not need the slower route at all. The rotation layer cannot see any of that, because it moves bytes and never looks at the page.',
      'So the logic lands in your scraper: detect the block, pick a pool, retry, remember which domains needed what, and keep a headless browser running for the sites that render in JavaScript. Every new target is a small research project, and the knowledge of what works where lives in code you maintain or in someone’s head.',
      'Microlink puts the proxy behind the request instead of in front of it. On Pro plans, a request that hits a 403 antibot wall escalates through the proxy tiers, with residential IPs as the last one: the slowest, and the one that usually gets through. The tier that worked is cached per domain, so later requests go straight to it. Browser rendering, [retries](/docs/api/parameters/retry) and caching come in the same call.'
    ]
  },
  how: {
    title: 'How to scrape without managing proxy rotation',
    intro:
      'Drop the proxy gateway from your client and call the API with a Pro key. What remains is reading which domains took the proxy route, and pinning a country where it matters. The [proxy guide](/docs/guides/common/proxy) lists the headers involved.',
    steps: [
      {
        label: '1 · Fetch a list of targets, no proxy config',
        sdk: `const urls = [
  'https://news.example.com/story',
  'https://shop.example.com/item/42',
  'https://docs.example.com/guide'
]

for (const url of urls) {
  const markdown = await microlink.markdown(url, { ttl: '1d' })
  const mode = microlink.last.response.headers.get('x-fetch-mode')
  console.log(new URL(url).hostname, mode, markdown.length)
}`,
        note: 'Each call resolves to the page as Markdown. x-fetch-mode ends in -proxy for the domains that needed the proxy route and not for the rest, so the log shows which targets are protected without any detection code on your side.'
      },
      {
        label: '2 · Pin a country only where it matters',
        sdk: `const markdown = await microlink.markdown('https://shop.example.co.uk/item/42', {
  proxy: { location: 'gb' }
})`,
        note: 'proxy.location is the one routing decision left to you: a two-letter country code for sites that serve regional content. Everything else about the route stays automatic.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://shop.example.com/item/42',
          params: {
            data: { markdown: { attr: 'markdown' } },
            meta: false,
            ttl: '1d'
          },
          pro: true
        },
        note: 'Call the Pro endpoint with your x-api-key header. There is no proxy parameter and no gateway URL: automatic resolution is the default on Pro.'
      }
    ],
    params: [
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Automatic on Pro. Set it only to pin a country or to use your own proxy server.'
      },
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'ISO 3166-1 alpha-2 country code for the exit, case-insensitive. Default us.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Caches each page from 1 minute to 31 days so repeat reads skip the fetch. Pro plans.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff. Default 2.'
      }
    ],
    outro:
      'x-fetch-mode is informational: a value like prerender-proxy needs no change to your request. If you already pay for a provider you must keep, [bring your own proxy](/use-cases/proxy/bring-your-own-proxy) with proxy.url instead.'
  },
  why: {
    title: 'Why built-in proxy tiers beat a rotating proxy pool',
    intro:
      'Rotation is a means. What a scraper needs is the right route for each site, found once and reused. That takes a system that sees the response, not just the connection.',
    cards: [
      {
        kicker: 'Escalates on evidence',
        title: 'Residential only when a site demands it.',
        body: 'Requests start on the fast route and climb the proxy tiers only when an antibot wall answers with a 403. Sites that never block you never pay the latency of the slowest tier.',
        note: 'Detection is one of the first checks in the request flow, as the [antibot feature page](/features/antibot) describes.'
      },
      {
        kicker: 'Memory per domain',
        title: 'The second request skips the search.',
        body: 'Once a tier works for a domain, that choice is cached, so later requests to the same site go straight to the route that works instead of rediscovering it on every call.',
        note: 'Combined with the response cache, where hits never count toward your quota, a crawler that revisits a site pays for neither the search nor the fetch.'
      },
      {
        kicker: 'Priced by request',
        title: 'No bandwidth meter, no separate proxy bill.',
        body: 'Plans are sold as requests per month, starting with Pro at €39 for 46,000, and automatic proxy resolution is included in every paid plan. There are no gigabytes to track per pool.',
        note: 'When not to: if a contract requires a specific proxy provider, or you only need raw HTTP through many IPs with no browser at all, a proxy service fits better. For the first case, [route through your own proxy](/use-cases/proxy/bring-your-own-proxy). Plans are on the [pricing page](/pricing).'
      }
    ]
  },
  faq: [
    {
      question: 'What is a good alternative to a rotating proxy API for scraping?',
      answer:
        'A scraping API with built-in proxies, where the service decides when a request needs a proxy and which kind. On Microlink Pro plans that decision is automatic: blocked requests escalate through proxy tiers up to residential IPs, and the result comes back as a screenshot, PDF, Markdown or extracted data.'
    },
    {
      question: 'Does the scraping API use residential proxies?',
      answer:
        'Yes, as the last tier. A request that hits a 403 antibot wall escalates through the proxy tiers and ends on residential IPs, the slowest route and the one that usually gets through. Faster tiers are tried first.'
    },
    {
      question: 'How do I see which domains needed the proxy route?',
      answer:
        'Read the x-fetch-mode response header. Values that end in -proxy, such as prerender-proxy or fetch-proxy, mean the request went through the proxy; the SDK exposes it on microlink.last.response.headers. Logging it per hostname gives you a map of your protected targets.'
    },
    {
      question: 'Can I still choose the exit country without a proxy pool?',
      answer:
        'Yes. Pass [proxy.location](/docs/api/parameters/proxy/location) with a two-letter ISO country code; 181 countries are supported and the default is us. The rest of the routing stays automatic.'
    },
    {
      question: 'Do I need to enable the proxy on every scraping request?',
      answer:
        'No. On Pro plans automatic proxy resolution is on by default, so requests only take the proxy route when a site blocks them. The proxy parameter is only for pinning a country or passing your own proxy URL.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to retire',
    headlineAccent: 'your proxy rotation code',
    body: 'Ask for the page, get the page. Proxy tiers, residential escalation and per-domain memory are included in Pro.',
    href: '/features/proxy',
    label: 'Drop proxy rotation'
  },
  howTo: {
    name: 'How to scrape without managing proxy rotation',
    steps: [
      {
        title: 'Fetch your targets without proxy configuration',
        description:
          'Call the Markdown method for each URL with a Pro API key and a ttl, then log the hostname with the x-fetch-mode header of the last response to see which domains used the proxy route.'
      },
      {
        title: 'Pin a country only where it matters',
        description:
          'Add proxy.location with a two-letter country code for the sites that serve regional content. The rest of the routing stays automatic.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Send url, data.markdown.attr=markdown, meta=false and ttl to pro.microlink.io with the x-api-key header, with no proxy parameter.'
      }
    ]
  }
}
