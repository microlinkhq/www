export const CONTENT = {
  slug: 'website-screenshot/traffic-spikes',
  head: {
    title: 'High-volume screenshots without throttling or browsers',
    description:
      'Absorb screenshot traffic spikes without a browser pool: no per-second throttling, a 24-hour cache with free hits and a 99.9% SLA on every paid plan.'
  },
  hero: {
    title:
      'Serve high-volume screenshots through traffic spikes',
    intro:
      'High-volume screenshots rarely arrive at a steady rate. A product launch, a viral post or a Monday morning batch job multiplies demand in minutes, and a self-hosted browser pool has to be sized, and paid for, at that peak. The [Screenshot API](/screenshot) applies no throttling, serves repeats from a cache whose hits do not count against your quota, and spends your plan only on fresh captures.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Screenshot traffic spikes are when self-hosted browsers fail',
    paragraphs: [
      'Headless Chrome is memory hungry and slow to start. A pool sized for average load queues or times out when ten times the traffic arrives, so captures fail exactly when the most people are looking. A pool sized for the peak sits idle, and billed, for the rest of the month.',
      'The usual workarounds move the problem instead of removing it. A job queue protects the browsers but turns a burst into minutes of latency. Adding containers on demand helps only if new browsers boot faster than the spike grows, and a rate limiter in front of everything drops the requests you cared about.',
      'Microlink applies no throttling limitation: you can run as many parallel requests as your quota allows. Every response is [cached for 24 hours](/docs/api/basics/cache) by default, a repeat of the same request is a cache hit that does not count against your quota, and each fresh capture runs in its own isolated browser. Every paid plan adds a 99.9% uptime SLA, so a burst hits the cache first and a managed browser fleet second.'
    ]
  },
  how: {
    title:
      'How to serve high-volume screenshots during a spike',
    intro:
      'Three request options turn a spiky workload into a predictable one, and none of them needs infrastructure on your side. The [screenshot caching and performance guide](/docs/guides/screenshot/caching-and-performance) covers the same setup in more depth.',
    steps: [
      {
        label: '1 · Serve repeats from the cache',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  ttl: '1d',\n  staleTtl: 0\n})",
        note: 'ttl keeps the capture for a day, and [staleTtl](/docs/api/parameters/staleTtl) at 0 serves the cached copy instantly while a fresh one is generated in the background. The result is the usual asset object with url, width, height and size.'
      },
      {
        label: '2 · Fire fresh captures in parallel',
        sdk: "const targets = ['https://a.com', 'https://b.com', 'https://c.com']\n\nconst screenshots = await Promise.all(\n  targets.map(target => microlink.screenshot(target, { retry: 3 }))\n)",
        note: 'No per-second limiter sits in front of the API, so Promise.all over a list of targets is fine and only your quota bounds it. retry raises the server-side retries with exponential backoff from the default of 2 to 3.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: { screenshot: true, meta: false, ttl: '1d', staleTtl: 0 },
          pro: true
        },
        note: 'ttl and staleTtl need a Pro key, so the URL targets pro.microlink.io and carries the x-api-key header. Read x-cache-status in the response: MISS on the first call, HIT on every repeat.'
      }
    ],
    params: [
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache lifetime from 1 minute to 31 days, including the min and max aliases. Pro plans; the default is 24 hours everywhere.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serves the cached response immediately while revalidating in the background. Cannot exceed ttl. Pro plans.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff on unexpected browser errors. Default 2.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata extraction, usually the biggest single speedup for screenshot-only requests.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Appends a custom identifier to the cache key to keep separate entries per tenant or variant. Pro plans.'
      }
    ],
    outro:
      'Log x-cache-status, x-response-time and x-rate-limit-remaining from the response headers to see how much of a burst the cache absorbed and how much quota is left. The [production patterns guide](/docs/guides/common/production-patterns) lists every header worth watching.'
  },
  why: {
    title: 'Why a managed API survives screenshot traffic spikes',
    intro:
      'Bursty traffic is a capacity problem, and capacity is exactly what a managed browser service pools across every customer. Three properties do the work.',
    cards: [
      {
        kicker: 'No throttling',
        title: 'Parallel requests are bounded by your quota, not by a rate limiter.',
        body: 'The API applies no per-second throttling. A burst of a thousand captures is a thousand requests against your quota, processed as they arrive, with no queue for you to drain afterwards.',
        note: 'When the quota runs out you get HTTP 429 with the ERATE error code, plus x-rate-limit-remaining and x-rate-limit-reset headers, so back-pressure is explicit instead of a silent slowdown.'
      },
      {
        kicker: 'Cache absorbs repeats',
        title: 'The same URL is captured once and served many times.',
        body: 'A launch drives thousands of views of the same handful of pages. With the 24-hour default cache, or up to 31 days with ttl on Pro, those views become cache hits served from the nearest CDN edge node. Cache hits do not count against your quota, so a spike costs you the unique captures and nothing else.',
        note: 'staleTtl at 0 is the [caching default worth copying](/features/ttl): visitors always get an instant response while the copy refreshes behind them. The same pattern keeps [dynamic Open Graph images](/use-cases/website-screenshot/open-graph-images) fast when a link goes viral.'
      },
      {
        kicker: 'Availability you can quote',
        title: '99.9% uptime SLA on every paid plan, one browser per request.',
        body: 'Every request runs in its own isolated browser instance, so a slow or broken target never affects another capture. Every paid plan commits to 99.9% uptime, a figure you can plan a launch around.',
        note: 'When not to: a steady trickle of a few captures per day fits the free tier of 25 requests per day, and a one-off batch of up to 25 URLs is quicker with the [bulk screenshot tool](/tools/website-screenshot/bulk). The API pays off when demand moves faster than you can provision.'
      }
    ]
  },
  faq: [
    {
      question: 'Does the screenshot API rate limit requests per second?',
      answer:
        'No. Microlink applies no throttling limitation, so you can run as many parallel screenshot requests as your quota allows. The free endpoint has a soft limit of 25 requests per day and paid plans use a monthly quota, both described in the [rate limit docs](/docs/api/basics/rate-limit).'
    },
    {
      question: 'What happens when a screenshot spike exceeds my quota?',
      answer:
        'The API returns HTTP 429 with the ERATE error code instead of slowing down silently. The x-rate-limit-remaining and x-rate-limit-reset headers tell you how much is left and when the window resets, so you can queue the remaining captures instead of dropping them.'
    },
    {
      question: 'Do cached screenshots count against my quota?',
      answer:
        'No. Cache hits do not count against your quota. A repeat of the same request within the cache lifetime is served from the edge with x-cache-status: HIT, and only fresh captures consume a request.'
    },
    {
      question:
        'How do I keep high-volume screenshots fresh without re-rendering on every hit?',
      answer:
        'Set ttl to how often the page changes and staleTtl to 0, both Pro options. Requests are served from the cache instantly while a background refresh keeps the copy current, and force: true bypasses the cache when you need a one-off refresh.'
    },
    {
      question: 'Can I get dedicated capacity for screenshot workloads?',
      answer:
        'Yes. Enterprise plans include a dedicated endpoint and browser pool, plus dedicated storage and CDN. See the [enterprise page](/enterprise) and share your expected peak so the capacity matches it.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'unpredictable traffic',
    body: 'No browsers to size, no queues to babysit. Start on the free tier with 25 requests per day, then pick a paid plan matched to your monthly volume.',
    href: '/screenshot',
    label: 'Start capturing at scale'
  },
  howTo: {
    name: 'How to handle screenshot traffic spikes with the Microlink API',
    steps: [
      {
        title: 'Serve repeats from the cache',
        description:
          'Set ttl to how long a capture stays valid and staleTtl to 0, so repeated requests are served from the cache instantly while a fresh copy is generated in the background.'
      },
      {
        title: 'Fire fresh captures in parallel',
        description:
          'Request every unique URL at once with Promise.all. No per-second throttling applies, only your quota, and retry adds server-side retries with exponential backoff.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Send the request to pro.microlink.io with your x-api-key header and check x-cache-status: MISS on the first call, HIT on every repeat.'
      },
      {
        title: 'Watch the response headers',
        description:
          'Log x-cache-status, x-response-time and x-rate-limit-remaining to measure how much of a burst the cache absorbed and how much quota is left.'
      }
    ]
  }
}
