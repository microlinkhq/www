export const CONTENT = {
  slug: 'proxy/fix-403-and-429-errors',
  head: {
    title: 'Fix 403 and 429 errors when scraping protected sites',
    description:
      'Scraper blocked with 403 Forbidden or 429 Too Many Requests? Tell the antibot wall, the site’s throttling and your own API quota apart, and fix each one.'
  },
  hero: {
    title: 'Fix 403 Forbidden and 429 Too Many Requests in your scraper',
    intro:
      'Scraping 403 Forbidden and 429 Too Many Requests errors look like the same problem, but they rarely have the same cause or the same fix. One is an antibot wall judging your IP and fingerprint, one is a site throttling repeat traffic, and one can be your own scraping quota. This page sorts them by where they come from, so you stop retrying the wrong way and your scraper only waits when waiting actually helps.',
    cta: { label: 'See how the proxy works', href: '/features/proxy' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Your scraper is blocked, and the status code alone does not say why',
    paragraphs: [
      'A 403 from a protected site usually means an antibot service scored the request as automated: a datacenter IP, a header set that does not match a real browser, a TLS handshake that gives the client away. A 429 means the site is rate limiting the address the requests come from. Both arrive as a failed fetch, and a scraper that logs only the status code treats them as the same flaky error.',
      'The reflex fixes make it worse. Retrying a 403 immediately, or with a new user agent on the same IP, sends the same signals again and looks more suspicious each time; a real browser profile is the whole header set, not one string. Retrying a 429 in a tight loop extends the throttle. And if you call a scraping API, its own 429 for an exhausted quota is a third case that no proxy will fix.',
      'On Pro plans the antibot 403 is handled before it reaches you: [automatic proxy resolution](/docs/api/parameters/proxy) escalates through proxy tiers up to residential IPs and remembers per domain which one worked. The free endpoint names the same situation with [EPROXYNEEDED](/docs/api/basics/error-codes#eproxyneeded) instead of a raw 403. A Microlink 429 is ERATE, your quota, with a reset time. Caching cuts the repeat hits that trigger throttling.'
    ]
  },
  how: {
    title: 'How to fix 403 and 429 errors when scraping',
    intro:
      'Classify the failure by error code, then reduce how often you hit the target. The [troubleshooting guide](/docs/guides/common/troubleshooting) lists every plan and auth error alongside these.',
    steps: [
      {
        label: '1 · Tell the three blocks apart',
        sdk: `const read = async url => {
  try {
    return { url, page: await microlink.metadata(url, { retry: 3 }) }
  } catch (error) {
    if (error.code === 'ERATE') return { url, blocked: 'quota' }
    if (error.code === 'EPROXYNEEDED') return { url, blocked: 'antibot' }
    throw error
  }
}`,
        note: 'ERATE is the API’s own 429: your plan quota ran out. EPROXYNEEDED is an antibot wall hit on the free endpoint. With a Pro key the antibot case is resolved through the proxy, so it stops showing up here.'
      },
      {
        label: '2 · Hit the target less often',
        sdk: `const page = await microlink.metadata('https://example.com/pricing', {
  ttl: '1d',
  staleTtl: 0
})`,
        note: 'ttl keeps the response for a day and staleTtl: 0 serves the cached copy while a fresh one is fetched in the background. Cache hits never reach the target site and never count toward your quota.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/pricing',
          params: { ttl: '1d', staleTtl: 0, retry: 3 },
          pro: true
        },
        note: 'Sent to the Pro endpoint with your x-api-key header, the request needs no proxy parameter. The payload includes statusCode, the HTTP status the target answered with.'
      }
    ],
    params: [
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff instead of your own tight loop. Default 2.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache lifetime from 1 minute to 31 days, so repeat reads skip the target. Pro plans.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serves the cached copy while revalidating in the background. Pro plans.'
      },
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Automatic on Pro. Pass it only to pin a country or to use your own proxy server.'
      }
    ],
    outro:
      'When the quota is the limit, the [rate limit docs](/docs/api/basics/rate-limit) explain the reset window. When a site keeps answering 403 and you want to know who is behind it, [detect the antibot system](/use-cases/proxy/detect-antibot-protection) first.'
  },
  why: {
    title: 'Why sorting 403 and 429 errors beats retrying them',
    intro:
      'Every retry of a blocked request costs time and makes the next one look worse. Knowing which of the three blocks you hit tells you whether to route, wait or cache.',
    cards: [
      {
        kicker: 'Antibot 403',
        title: 'Routed through proxy tiers on Pro.',
        body: 'When a 403 antibot wall answers, the API escalates through its proxy tiers, with residential IPs as the last and slowest step. The winning tier is remembered per domain, so the second request to a protected site does not pay for the search again.',
        note: 'For the Cloudflare case specifically, see [scraping Cloudflare-protected sites](/use-cases/proxy/scrape-cloudflare-protected-sites).'
      },
      {
        kicker: 'Your own 429',
        title: 'ERATE is quota, not the target.',
        body: 'The free endpoint allows 25 requests a day and Pro starts at 46,000 a month. There is no throttling within the quota, so parallel requests are fine; once it is exhausted, only the reset or a bigger plan helps.',
        note: 'The [pricing page](/pricing) lists every plan, and automatic proxy resolution comes with all of the paid ones.'
      },
      {
        kicker: 'The site’s 429',
        title: 'Fewer hits, not faster retries.',
        body: 'A site that throttles by address responds to volume. Caching with ttl and staleTtl means the same URL is fetched once per cache lifetime, however many times your code asks for it.',
        note: 'When not to: a 403 from a login page or a paywall is an access decision, not a bot score. Forward your own session with [private pages patterns](/docs/guides/common/private-pages) where you are allowed to, and leave it alone otherwise.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does my scraper get 403 Forbidden on some sites?',
      answer:
        'An antibot service in front of the site scored the request as automated, most often because of a datacenter IP, an inconsistent header set or a headless TLS fingerprint. The same code works on unprotected sites, which is why it only happens on some. Through the Pro endpoint those requests are escalated through the proxy tiers automatically.'
    },
    {
      question: 'How do I fix 429 Too Many Requests when scraping?',
      answer:
        'First check where it comes from. If the target site sent it, fetch each URL less often: cache responses with ttl and staleTtl so repeat reads never reach the site. If the Microlink API sent it with ERATE, you have used your plan quota and need to wait for the reset or upgrade.'
    },
    {
      question: 'Does changing the user agent fix a 403 when scraping?',
      answer:
        'Rarely. Antibot systems check the whole header set, the TLS handshake and the IP reputation, so a new user agent on the same datacenter IP sends the same signals with one string changed. Retrying the same way can make the next request look more suspicious, not less.'
    },
    {
      question: 'What does EPROXYNEEDED mean in a scraping response?',
      answer:
        'The free endpoint detected antibot protection on the target: “The URL provided uses antibot protection. Upgrade to a Pro plan.” It is the signal to upgrade, not to add a parameter. With a Pro key, the same request is routed through the proxy automatically.'
    },
    {
      question: 'Is a 429 from the scraping API the same as a 429 from the site?',
      answer:
        'No. A 429 with the ERATE code comes from the API and means your quota is used up; the [production patterns guide](/docs/guides/common/production-patterns) shows how to wait for the reset. A 429 from the target shows up as the statusCode of the page you asked for.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to stop',
    headlineAccent: 'retrying blocked requests',
    body: 'Pro plans route antibot 403s through the proxy automatically and cache the result, so blocked targets stop being a retry loop.',
    href: '/pricing',
    label: 'Compare Pro plans'
  },
  howTo: {
    name: 'How to fix 403 and 429 errors when scraping',
    steps: [
      {
        title: 'Tell the three blocks apart',
        description:
          'Wrap the request in a try/catch and branch on the error code: ERATE is your API quota, EPROXYNEEDED is an antibot wall on the free endpoint, anything else is rethrown.'
      },
      {
        title: 'Hit the target less often',
        description:
          'Add ttl and staleTtl to the request so repeat reads are served from the cache and never reach the target site.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Send url, ttl, staleTtl and retry to pro.microlink.io with the x-api-key header. Antibot 403s are resolved through the proxy without a proxy parameter.'
      }
    ]
  }
}
