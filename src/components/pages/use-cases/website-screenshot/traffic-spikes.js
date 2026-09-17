export const CONTENT = {
  slug: 'website-screenshot/traffic-spikes',
  head: {
    title: 'Screenshot API for traffic spikes without throttling',
    description:
      'Bursty screenshot workloads without provisioning browsers: no throttling, parallel requests up to your quota, a 24-hour cache and a 99.9% SLA on Pro.'
  },
  hero: {
    title: 'Screenshots under traffic spikes, without provisioning browsers',
    intro:
      'A product launch, a viral post, a Monday morning batch job: screenshot demand is rarely linear. Running your own headless browsers means sizing for the peak and paying for it all month. The Screenshot API absorbs the burst and bills per request.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Peak traffic is when self-hosted browsers fail',
    paragraphs: [
      'Headless Chrome is memory hungry and slow to start. A pool sized for average load queues or times out when ten times the traffic arrives, and a pool sized for the peak sits idle most of the time.',
      'Microlink applies no throttling limitation: you can run as many parallel requests as your quota allows, every response is cached for 24 hours by default, and paid plans come with a 99.9% uptime SLA. Bursts hit the cache first and the browser pool second.'
    ]
  },
  how: {
    title: 'Cache first, parallel second, retry last',
    intro:
      'Three options turn a spiky workload into a predictable one. None of them require infrastructure on your side.',
    steps: [
      {
        label: '1 · Serve repeats from the cache',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  ttl: '1d',\n  staleTtl: 0\n})",
        note: 'ttl keeps the capture for a day; staleTtl serves the cached copy instantly and refreshes it in the background.'
      },
      {
        label: '2 · Fire requests in parallel',
        sdk: "const targets = ['https://a.com', 'https://b.com', 'https://c.com']\n\nconst screenshots = await Promise.all(\n  targets.map(target => microlink.screenshot(target, { retry: 3 }))\n)",
        note: 'There is no per-second throttling; parallel requests only count against your quota. retry adds server-side retries with backoff.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: { screenshot: true, meta: false, ttl: '1d', staleTtl: 0 },
          pro: true
        },
        note: 'ttl and staleTtl require a Pro key; the URL then targets the pro endpoint.'
      }
    ],
    params: [
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache lifetime from 1 minute to 31 days on Pro plans; the default is 24 hours everywhere.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serve the cached response immediately while revalidating in the background.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff on transient browser errors. Default 2.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'meta: false skips metadata extraction, usually the biggest single speedup.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Split identical requests into separate cache entries per tenant or variant.'
      }
    ],
    outro:
      'Watch x-cache-status and x-rate-limit-remaining in the response headers to see how much of a burst the cache absorbed and how much quota is left.'
  },
  why: {
    title: 'Why the API scales where a pool does not',
    intro:
      'Bursty traffic is a capacity problem, and capacity is exactly what a managed browser service pools across customers.',
    cards: [
      {
        kicker: 'No throttling',
        title: 'Parallel requests are limited by your quota, not by a rate limiter.',
        body: 'The API does not apply per-second throttling. A burst of a thousand captures is a thousand requests against your quota, processed as they arrive.',
        note: 'When the quota runs out you get HTTP 429 with the ERATE code and headers that tell you when it resets, so back-pressure is explicit instead of silent.'
      },
      {
        kicker: 'Cache absorbs repeats',
        title: 'The same URL is captured once and served many times.',
        body: 'A launch drives thousands of views of the same handful of pages. With a 24-hour default cache, and up to 31 days with ttl, those views become cache hits served from the CDN edge.',
        note: 'staleTtl at 0 is the production default worth copying: users always get an instant response while the copy refreshes behind them.'
      },
      {
        kicker: 'Availability you can quote',
        title: '99.9% uptime SLA on paid plans, one browser per request.',
        body: 'Every request runs in its own isolated browser instance, so a slow or broken target never affects another capture. Paid plans commit to 99.9% uptime.',
        note: 'When not to: a steady trickle of a few captures per day is fine on the free tier or a self-hosted browser; the API pays off when demand moves faster than you can provision.'
      }
    ]
  },
  faq: [
    {
      question: 'Is there a rate limit per second?',
      answer:
        'No throttling limitation is applied. You can perform as many parallel requests as your quota allows. The free endpoint has a soft limit of 25 requests per day; Pro plans use a monthly quota.'
    },
    {
      question: 'What happens when I exceed my quota during a spike?',
      answer:
        'The API returns HTTP 429 with the ERATE error code. The x-rate-limit-remaining and x-rate-limit-reset headers tell you how much is left and when the window resets, so you can queue requests instead of dropping them.'
    },
    {
      question: 'Do cached responses count as requests?',
      answer:
        'Yes, a cache hit is still one API call, but it is served from the edge in milliseconds instead of rendering a browser, which is what keeps response times flat during a burst.'
    },
    {
      question: 'How do I keep screenshots fresh without re-rendering on every hit?',
      answer:
        'Set ttl to how often the content changes and staleTtl to 0. Requests are served from the cache instantly and a background refresh keeps the copy current. force: true bypasses the cache for a one-off refresh.'
    },
    {
      question: 'Can I get dedicated capacity?',
      answer:
        'Enterprise plans include a dedicated endpoint and browser pool with custom concurrency. See the [enterprise page](/enterprise) or contact us with your expected peak.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'unpredictable traffic',
    body: 'No browsers to size, no queues to babysit. Start on the free tier, then pick a Pro plan matched to your monthly volume.',
    href: '/screenshot',
    label: 'Start capturing at scale'
  }
}
