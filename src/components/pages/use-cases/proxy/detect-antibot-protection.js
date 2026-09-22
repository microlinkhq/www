export const CONTENT = {
  slug: 'proxy/detect-antibot-protection',
  head: {
    title: 'Detect which antibot system is blocking your scraper',
    description:
      'Find out whether Cloudflare, DataDome, Akamai or a CAPTCHA blocked your request with the open-source is-antibot library, then route only those URLs.'
  },
  hero: {
    title: 'Find out which bot protection a site uses before you retry',
    intro:
      'To detect antibot protection reliably, you need more than a 403: you need to know that a shield answered instead of the site, and which one. Crawlers, link preview services, SEO tools and data pipelines all treat those failures as random noise and retry them blindly. is-antibot, the open-source library Microlink uses for this check, names the provider from the response you already have, so each blocked URL gets the right next step.',
    cta: { label: 'See antibot detection', href: '/features/antibot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A blocked response looks like a success until you know who answered',
    paragraphs: [
      'Blocks come from named providers, and each one blocks differently. Cloudflare serves a “Just a moment” interstitial, DataDome scores request signatures in real time, Akamai Bot Manager blocks datacenter IPs at the edge, PerimeterX leans on client-side fingerprinting, and a reCAPTCHA or hCaptcha widget can sit in front of all of them. Some of these arrive as a 403, some as a 429, and some as a 200 with a challenge page for a body.',
      'Hand-written detection does not keep up. A check for “Just a moment” in the HTML catches one Cloudflare mode and misses the rest; a status code check misses every challenge served on a 200. And treating all failures alike is costly: a retry strategy that works against one system can make the next request look more suspicious to another.',
      'is-antibot reads the status code, headers, cookies, body markers and URL of a response and returns whether a block was detected, the provider behind it and which signal matched. It covers 30+ antibot and CAPTCHA providers, it is dependency-free, and it does not try to solve challenges. The Microlink API runs the same detection as one of its first checks: free requests fail with EPROXYNEEDED, and on Pro the blocked request is [routed through the proxy](/features/proxy).'
    ]
  },
  how: {
    title: 'How to detect which antibot protection a site uses',
    intro:
      'Classify your own responses with is-antibot, and let the API handle the ones that are blocked. The API tells you that a URL is protected; only the library tells you by whom.',
    steps: [
      {
        label: '1 · Name the provider from a response',
        code: `import isAntibot from 'is-antibot'

const url = 'https://www.example.com/pricing'
const response = await fetch(url)

const { detected, provider, detection } = isAntibot({
  url: response.url,
  statusCode: response.status,
  headers: response.headers,
  html: await response.text()
})

console.log(detected, provider, detection)
// => true 'cloudflare' 'html'`,
        language: 'js',
        note: 'Install it with npm install is-antibot. detected says whether a shield answered, provider names it and detection reports which signal matched: statusCode, headers, cookies, html or url.'
      },
      {
        label: '2 · The API’s answer on the free endpoint',
        request: {
          url: 'https://www.example.com/pricing',
          params: { meta: false }
        },
        note: 'Without an API key, a protected target fails with EPROXYNEEDED: “The URL provided uses antibot protection. Upgrade to a Pro plan.” It confirms protection is there, but the response does not name the provider.'
      },
      {
        label: '3 · Route only the blocked URLs',
        sdk: `import isAntibot from 'is-antibot'

const read = async url => {
  const response = await fetch(url)
  const html = await response.text()
  const { detected } = isAntibot({
    url: response.url,
    statusCode: response.status,
    headers: response.headers,
    html
  })
  return detected ? microlink.html(url) : html
}`,
        note: 'Your own fetch serves the open sites. When a shield answers, the same URL goes to the API with your Pro key, where the proxy route is automatic, and resolves to the rendered HTML.'
      }
    ],
    params: [
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Automatic on Pro. Set it only to pin a country or to use your own proxy.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff for intermittent challenges. Default 2.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Caches the unblocked response from 1 minute to 31 days. Pro plans.'
      }
    ],
    outro:
      'The full list of error codes, EPROXYNEEDED and EPROXY included, is in the [error codes reference](/docs/api/basics/error-codes). If a provider keeps blocking after you know its name, the fix is usually on the routing side: see [how to fix 403 and 429 errors](/use-cases/proxy/fix-403-and-429-errors).'
  },
  why: {
    title: 'Why antibot detection comes before any retry',
    intro:
      'Detection is the decision point. Knowing who answered tells you whether to route, wait, skip or stop spending requests on a URL.',
    cards: [
      {
        kicker: 'Open source',
        title: 'The same check the API runs, in your code.',
        body: 'is-antibot is published on npm and GitHub, dependency-free and deterministic, so it can run on every response without becoming the bottleneck. You can audit exactly how each provider is matched.',
        note: 'The [antibot feature page](/features/antibot) lists the providers and explains how the API uses the result.'
      },
      {
        kicker: 'Provider, not guess',
        title: 'Named across 30+ antibot and CAPTCHA systems.',
        body: 'Cloudflare, DataDome, Akamai Bot Manager, PerimeterX, Kasada, Imperva, AWS WAF and Vercel Attack Mode on the antibot side; reCAPTCHA, hCaptcha, FunCaptcha, GeeTest and Cloudflare Turnstile among the CAPTCHAs.',
        note: 'For the most common case, [scraping Cloudflare-protected sites](/use-cases/proxy/scrape-cloudflare-protected-sites) walks through what happens after detection.'
      },
      {
        kicker: 'Detection, not solving',
        title: 'It tells you who blocked you, not how to get past.',
        body: 'The library never touches the challenge. Getting a legitimate request through is the proxy’s job, which on Pro plans escalates blocked requests through proxy tiers up to residential IPs.',
        note: 'When not to: if every URL you fetch already goes through the API on a Pro plan, you do not need client-side detection at all, because the proxy route is automatic. Compare plans on the [pricing page](/pricing).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I detect if a site uses Cloudflare bot protection?',
      answer:
        'Fetch the page and pass the response’s status, headers, URL and HTML to is-antibot. If detected is true and provider is cloudflare, a Cloudflare challenge or block answered instead of the site.'
    },
    {
      question: 'Does the Microlink API tell me which antibot provider blocked a request?',
      answer:
        'No. The API runs antibot detection internally and acts on it: the free endpoint fails with EPROXYNEEDED and Pro routes the request through the proxy. The provider name is only exposed by the is-antibot library.'
    },
    {
      question: 'Which bot protection providers can is-antibot detect?',
      answer:
        'More than 30, covering antibot systems such as Cloudflare, DataDome, Akamai Bot Manager, PerimeterX, Kasada, Imperva and AWS WAF, and CAPTCHA providers such as reCAPTCHA, hCaptcha, FunCaptcha, GeeTest and Cloudflare Turnstile.'
    },
    {
      question: 'Can is-antibot get my scraper past a bot challenge?',
      answer:
        'No. It does not try to solve challenges; it only detects them and names the provider. To fetch the blocked page, send it through the API on a Pro plan, where [automatic proxy resolution](/docs/api/parameters/proxy) handles the route.'
    },
    {
      question: 'What does EPROXYNEEDED tell me about a site’s bot protection?',
      answer:
        'That the site uses antibot protection and the request cannot succeed on the free plan. It is the signal to upgrade to Pro, where the same request is routed through the proxy automatically, not a parameter to add.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to see',
    headlineAccent: 'who is blocking you',
    body: 'Name the provider with is-antibot, then let a Pro key route the blocked URLs through the proxy.',
    href: '/features/antibot',
    label: 'Explore antibot detection'
  },
  howTo: {
    name: 'How to detect which antibot protection a site uses',
    steps: [
      {
        title: 'Name the provider from a response',
        description:
          'Install is-antibot, fetch the page and pass the URL, status code, headers and HTML to it. Read detected, provider and detection from the result.'
      },
      {
        title: 'Check the API’s answer on the free endpoint',
        description:
          'Request the URL from api.microlink.io without a key. A protected target fails with EPROXYNEEDED, which confirms protection without naming the provider.'
      },
      {
        title: 'Route only the blocked URLs',
        description:
          'Serve open sites from your own fetch and send the URLs where is-antibot detected a block to the API with a Pro key, where the proxy route is automatic.'
      }
    ]
  }
}
