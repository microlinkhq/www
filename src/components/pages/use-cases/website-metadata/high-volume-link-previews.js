export const CONTENT = {
  slug: 'website-metadata/high-volume-link-previews',
  head: {
    title: 'Serve link previews at scale with caching, no throttling',
    description:
      'Unfurl links in chat, feeds and editors at any volume: parallel requests without throttling, a 24-hour cache, background refresh and uncounted cache hits.'
  },
  hero: {
    title: 'Serve link previews at scale, without throttling or stale cards',
    intro:
      'Running a link preview API at scale means absorbing bursts: every pasted link in a chat, a note or a feed becomes a metadata request, and the same link gets pasted by thousands of users in the same hour. The Metadata API fits that shape, with parallel requests limited only by your quota and a cache that serves the repeats without counting them.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Link preview traffic is bursty and repetitive',
    paragraphs: [
      'A trending article produces a spike of identical requests within minutes. Messaging apps, social feeds, comment systems and editors all see it: traffic arrives in bursts, and most of it asks for links someone else already pasted.',
      'A self-hosted unfurler handles this badly. Either it rate-limits your own users to protect its workers, or it crawls the same page over and over until the site on the other end starts blocking you. Adding a cache helps, until you also need invalidation, background refresh and per-tenant separation.',
      'Microlink applies [no throttling](/docs/api/basics/rate-limit): you can run as many parallel requests as your quota allows. Responses are cached for 24 hours by default, [staleTtl](/docs/api/parameters/staleTtl) serves the cached card instantly while refreshing behind it, and scoping [meta](/docs/api/parameters/meta) keeps each uncached request light.'
    ]
  },
  how: {
    title: 'How to cache and refresh unfurled links in production',
    intro:
      'Three options define a production unfurler: which fields to detect, how long to cache them, and whether to serve stale while revalidating. The [caching patterns guide](/docs/guides/common/caching) explains each control in depth.',
    steps: [
      {
        label: '1 · A lean preview request',
        sdk: "const { title, description, image } = await microlink.metadata(url, {\n  meta: { title: true, description: true, image: true },\n  ttl: '1d',\n  staleTtl: 0\n})",
        note: 'Only the three preview fields are detected. The card is cached for a day, and with staleTtl: 0 every hit is served from the cache while a background refresh keeps it current.'
      },
      {
        label: '2 · Unfurl a burst in parallel',
        sdk: "const previews = await Promise.all(\n  links.map(link =>\n    microlink.metadata(link, { ttl: '1d', staleTtl: 0, retry: 3 })\n  )\n)",
        note: 'There is no per-second throttling, so the whole burst goes out at once. retry handles transient browser errors server-side, with exponential backoff.'
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
        note: 'ttl and staleTtl need a Pro key, so the URL targets pro.microlink.io with the key sent as the x-api-key header.'
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
        note: 'Cache lifetime from 1 minute to 31 days. Default 24 hours. Pro plans.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serve the cached preview instantly and revalidate in the background. Cannot exceed ttl. Pro plans.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Appends a custom identifier to the cache key, for separate entries per tenant or workspace. Pro plans.'
      },
      {
        name: 'force',
        href: '/docs/api/parameters/force',
        note: 'Bypasses the cache and returns a fresh copy, for a user-initiated refresh.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff. Default 2.'
      }
    ],
    outro:
      'Log x-cache-status and x-rate-limit-remaining: the hit ratio tells you how much of the burst the cache absorbed, and the remaining quota tells you when to slow down. The [production patterns guide](/docs/guides/common/production-patterns) shows how to back off on a 429.'
  },
  why: {
    title: 'Why the cache does most of the work in a link preview API',
    intro:
      'Most preview requests are for links someone else already pasted. Serving those from the cache is the whole optimization.',
    cards: [
      {
        kicker: 'No throttling',
        title: 'Bursts are limited by quota, not by a rate limiter.',
        body: 'A thousand users pasting the same link produce a thousand requests that the cache turns into one fetch and many hits. Cache hits do not count against your quota, and when the quota does run out you get an explicit HTTP 429 with ERATE rather than a silent slowdown.',
        note: 'The same behavior backs [screenshots under traffic spikes](/use-cases/website-screenshot/traffic-spikes) and [bulk Markdown conversion](/use-cases/website-to-markdown/bulk-conversion).'
      },
      {
        kicker: 'Instant and fresh',
        title: 'staleTtl: 0 serves now and refreshes later.',
        body: 'Users never wait on a fetch: the cached card returns immediately and a background refresh keeps it current. Set ttl by how fast the source changes, anywhere from 1 minute to 31 days.',
        note: 'Keep [force](/docs/api/parameters/force) for a user-initiated refresh; it always bypasses the cache and fetches the page again.'
      },
      {
        kicker: 'Light by design',
        title: 'Field selection keeps each request small.',
        body: 'A card needs title, description and image. Restricting meta to those skips logo, author and date detection, which makes every cache miss faster and every payload smaller.',
        note: 'When not to: a low-volume internal tool with a handful of links a day does not need cache tuning. The defaults and the free endpoint, with 25 requests per day, are enough. For sustained volume above the listed plans, talk to us about [enterprise](/enterprise).'
      }
    ]
  },
  faq: [
    {
      question: 'Is there a per-second rate limit on metadata API requests?',
      answer:
        'No. Microlink applies no throttling: you can run as many parallel requests as your quota allows. The free endpoint has a soft limit of 25 requests per day, and paid plans use a monthly quota that starts at 14,000 requests.'
    },
    {
      question:
        'How do I keep link previews fresh without re-fetching every time?',
      answer:
        'Set ttl to the freshness you need and staleTtl to 0. Every request is served from the cache instantly and refreshed in the background, so the next visitor gets the newer card. force refreshes a single preview on demand.'
    },
    {
      question: 'Do cached link previews count against my quota?',
      answer:
        'No. Cache hits do not count against your quota. Only a cache miss, which actually fetches the page, uses a request, so a link pasted a thousand times in a day costs one.'
    },
    {
      question: 'Can I separate link preview cache entries per workspace?',
      answer:
        'Yes, on Pro plans. cacheKey appends a custom identifier to the cache key, so the same URL can have independent entries per tenant, workspace or variant.'
    },
    {
      question: 'What happens when a site blocks my link preview requests?',
      answer:
        'A detected block returns the EPROXYNEEDED error code. On Pro plans, retry with proxy: true and the request routes through the managed proxy pool; see [link previews for bot-protected sites](/use-cases/website-metadata/blocked-sites).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to unfurl',
    headlineAccent: 'at any volume',
    body: 'No throttling, a cache that serves the repeats, and a 99.9% SLA on every paid plan. Pick a plan sized for your traffic and ship previews that never lag.',
    href: '/metadata',
    label: 'Scale your link previews'
  },
  howTo: {
    name: 'How to serve link previews at scale',
    steps: [
      {
        title: 'Scope the request to the card fields',
        description:
          'Pass a meta object with title, description and image set to true so nothing else is detected.'
      },
      {
        title: 'Cache and revalidate in the background',
        description:
          'Set ttl to the freshness you need and staleTtl to 0, so every hit is served from the cache while a refresh runs behind it.'
      },
      {
        title: 'Fan out bursts in parallel',
        description:
          'Send the requests concurrently. There is no per-second throttling; parallel requests are limited only by your quota.'
      },
      {
        title: 'Monitor the hit ratio and the quota',
        description:
          'Log the x-cache-status and x-rate-limit-remaining response headers to see how much the cache absorbs and when to slow down.'
      }
    ]
  }
}
