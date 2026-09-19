export const CONTENT = {
  slug: 'website-metadata/high-volume-link-previews',
  head: {
    title: 'Link previews at scale: caching without throttling',
    description:
      'Unfurl links in chat, feeds and editors at any volume: no per-second throttling, a 24-hour cache with background refresh, cache keys and field selection.'
  },
  hero: {
    title: 'Serve link previews at scale, without throttling or stale cards',
    intro:
      'Every pasted link in a chat, a note or a feed becomes a metadata request, and the same link is pasted by thousands of users in the same hour. The Metadata API is built for that shape: unlimited parallelism within your quota and a cache that serves the repeats.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Link previews are bursty and repetitive',
    paragraphs: [
      'A trending article produces a spike of identical requests within minutes. A self-hosted unfurler either rate-limits your own users or crawls the same page over and over, and the site on the other end starts blocking you.',
      'Microlink applies no throttling limitation; parallel requests count against your quota and nothing else. Responses are cached for 24 hours by default, staleTtl serves the cached card instantly while refreshing behind it, and meta scoping keeps each request light.'
    ]
  },
  how: {
    title: 'Scope, cache, refresh in the background',
    intro:
      'Three options define a production unfurler: which fields, how long to cache, and whether to serve stale while revalidating.',
    steps: [
      {
        label: '1 · A lean preview request',
        sdk: "const { title, description, image } = await microlink.metadata(url, {\n  meta: { title: true, description: true, image: true },\n  ttl: '1d',\n  staleTtl: 0\n})",
        note: 'Only the preview fields are detected; the card is cached for a day and refreshed in the background on every hit.'
      },
      {
        label: '2 · Unfurl a burst in parallel',
        sdk: "const previews = await Promise.all(\n  links.map(link =>\n    microlink.metadata(link, { ttl: '1d', staleTtl: 0, retry: 3 })\n  )\n)",
        note: 'No per-second throttling; retries handle transient failures server-side.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/article',
          params: {
            meta: { title: true, description: true, image: true },
            ttl: '1d',
            staleTtl: 0
          },
          pro: true
        },
        note: 'ttl and staleTtl need a Pro key; the URL then targets the pro endpoint.'
      }
    ],
    params: [
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Detect only the fields the card renders.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache lifetime from 1 minute to 31 days on Pro plans; 24 hours by default.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serve the cached preview instantly and revalidate in the background.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Separate cache entries per tenant or per workspace when needed.'
      },
      {
        name: 'force',
        href: '/docs/api/parameters/force',
        note: 'Refresh one preview on demand when a user reports it stale.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff.'
      }
    ],
    outro:
      'Log x-cache-status and x-rate-limit-remaining: the hit ratio tells you how much of the burst the cache absorbed, and the remaining quota tells you when to slow down.'
  },
  why: {
    title: 'Why the cache is the unfurler',
    intro:
      'Most preview requests are for links someone else already pasted. Serving those from the edge is the whole optimization.',
    cards: [
      {
        kicker: 'No throttling',
        title: 'Bursts are limited by quota, not by a rate limiter.',
        body: 'A thousand users pasting the same link produce a thousand requests that the cache turns into one render and many edge hits. When quota runs out you get an explicit 429 with ERATE.',
        note: 'The same guarantee backs [screenshot bursts](/use-cases/website-screenshot/traffic-spikes) and every other product.'
      },
      {
        kicker: 'Instant and fresh',
        title: 'staleTtl: 0 serves now and refreshes later.',
        body: 'Users never wait on a render: the cached card returns immediately and a background refresh keeps it current. Set ttl by how fast the source changes.',
        note: 'Use force sparingly, for a user-initiated refresh; it always renders and bypasses the cache.'
      },
      {
        kicker: 'Light by design',
        title: 'Field selection keeps each request small.',
        body: 'A card needs title, description and image. Restricting meta to those skips logo, author and date detection and makes both the miss and the payload cheaper.',
        note: 'When not to: a low-volume internal tool with a handful of links a day does not need cache tuning; the defaults and the free tier are enough.'
      }
    ]
  },
  faq: [
    {
      question: 'Is there a per-second limit on metadata requests?',
      answer:
        'No throttling limitation is applied. You can perform as many parallel requests as your quota allows; the free endpoint has a soft daily limit of 25, Pro plans use a monthly quota.'
    },
    {
      question: 'How do I keep link previews fresh without re-fetching every time?',
      answer:
        'Set ttl to the freshness you need and staleTtl to 0. Requests are served from the cache instantly and refreshed in the background; force refreshes a single preview on demand.'
    },
    {
      question: 'Can I separate preview cache entries per workspace?',
      answer:
        'Yes. cacheKey appends a custom identifier to the cache key, so the same URL can have independent entries per tenant, workspace or variant.'
    },
    {
      question: 'What happens when the target site blocks my unfurler?',
      answer:
        'The API returns EPROXYNEEDED. On Pro plans, retry with proxy: true and the request routes through the managed proxy pool; see [link previews for bot-protected sites](/use-cases/website-metadata/blocked-sites).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to unfurl',
    headlineAccent: 'at any volume',
    body: 'No throttling, a cache that serves the repeats, and cards that stay fresh. Pick a Pro plan sized for your traffic and ship previews that never lag.',
    href: '/metadata',
    label: 'Scale your link previews'
  }
}
