export const CONTENT = {
  slug: 'proxy/scrape-cloudflare-protected-sites',
  head: {
    title: 'Scrape Cloudflare-protected websites with an API',
    description:
      'Scrape pages behind Cloudflare’s “Just a moment” check. On Pro plans the proxy is automatic: blocked requests escalate up to residential IPs.'
  },
  hero: {
    title: 'Scrape Cloudflare-protected websites and get the real page back',
    intro:
      'To scrape a Cloudflare-protected website, your request first has to reach the page instead of the “Just a moment” interstitial. Price trackers, lead enrichment, research crawlers and RAG pipelines all run into it sooner or later. With a Pro key, the [Scraping API](/features/scraping) handles the wall for you: no proxy option, no challenge solver, just the extraction rules you already wrote.',
    cta: { label: 'See how the proxy works', href: '/features/proxy' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Cloudflare answers your scraper with a challenge, not the page',
    paragraphs: [
      'Cloudflare, like other antibot systems, scores a request on its IP reputation, its headers, its TLS handshake and the JavaScript it runs. Datacenter traffic from a headless browser fails that score, so it gets a 403 or a JavaScript interstitial titled “Just a moment”. Your selectors then run against the challenge, return nothing, and the job logs a success with empty fields.',
      'The usual fixes are fragile. A stealth plugin patches the browser fingerprint until the next detection update. A proxy subscription changes the IP but leaves you deciding when to switch exits, which tier to pay for and how to tell a challenge from a real page. Retrying the same blocked request the same way mostly teaches the shield that you are a bot.',
      'On Pro plans, [automatic proxy resolution](/docs/api/parameters/proxy) is on by default. When a request hits a 403 antibot wall, the API escalates through its proxy tiers, ending with residential IPs, the slowest route and the one that usually gets through. The tier that worked is remembered per domain, so the next request to that site goes straight to it. It is well tested against the 500 most popular websites, not guaranteed for every site on the web.'
    ]
  },
  how: {
    title: 'How to scrape a Cloudflare-protected site with extraction rules',
    intro:
      'Write the rules for the page you want and send them with a Pro key. The unblocking happens before the rules run, so the code is the same as for an unprotected site. The [proxy guide](/docs/guides/common/proxy) covers the signals and headers in more depth.',
    steps: [
      {
        label: '1 · Extract fields from the protected page',
        sdk: `const product = await microlink.extract(
  'https://shop.example.com/product/42',
  {
    title: { selector: 'h1', attr: 'text' },
    price: { selector: '[itemprop="price"]', attr: 'content', type: 'number' }
  },
  { retry: 3, ttl: '1h' }
)`,
        note: 'The call resolves to an object with one key per rule, read from the real product page. retry: 3 absorbs intermittent challenges, and ttl keeps the result cached for an hour so repeat reads skip the escalation.'
      },
      {
        label: '2 · See which route the request took',
        sdk: `const mode = microlink.last.response.headers.get('x-fetch-mode')

console.log(mode, mode.endsWith('-proxy'))
// => 'prerender-proxy' true`,
        note: 'A value that ends in -proxy, such as prerender-proxy or fetch-proxy, means the request went through the proxy route. It is informational: nothing in your request needs to change.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://shop.example.com/product/42',
          params: {
            data: {
              title: { selector: 'h1', attr: 'text' },
              price: { selector: '[itemprop="price"]', attr: 'content', type: 'number' }
            },
            meta: false,
            retry: 3
          },
          pro: true
        },
        note: 'The Pro endpoint with your x-api-key header is all it takes. There is no proxy parameter in the URL because automatic resolution is the default on Pro.'
      }
    ],
    params: [
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'The extraction rules: a CSS selector, the attribute to read and the type to cast it to.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff. Default 2; 3 helps with intermittent challenges.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Caches the unblocked result from 1 minute to 31 days. Pro plans.'
      },
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'Optional. Pins the exit country when the site also serves regional content. Default us.'
      }
    ],
    outro:
      'If a site keeps failing, the [troubleshooting guide](/docs/guides/common/troubleshooting) explains the debug headers, and [detecting which antibot system blocks you](/use-cases/proxy/detect-antibot-protection) tells you whether it is Cloudflare or another provider.'
  },
  why: {
    title: 'Why scrape Cloudflare sites through the API instead of a stealth browser',
    intro:
      'A stealth setup is a race against detection updates. Moving the unblocking into the API turns it into someone else’s maintenance and leaves your code about the data.',
    cards: [
      {
        kicker: 'Escalation, not guesswork',
        title: 'The cheapest route that works, then remembered.',
        body: 'Requests go direct first and only climb the proxy tiers when a 403 wall answers. Residential exits are the last step, and once a tier works for a domain, later requests to that domain start there instead of rediscovering it.',
        note: 'The same mechanism is what makes it a [rotating proxy alternative](/use-cases/proxy/rotating-proxy-alternative): you never pick exits yourself.'
      },
      {
        kicker: 'An explicit answer',
        title: 'Real data or a clear error, never challenge HTML.',
        body: 'On the free endpoint a Cloudflare-protected target fails with EPROXYNEEDED, “The URL provided uses antibot protection”, instead of handing your rules a challenge page. On Pro the same URL is resolved through the proxy.',
        note: 'Automatic proxy resolution is part of every paid plan on the [pricing page](/pricing), starting with Pro at 46,000 requests a month.'
      },
      {
        kicker: 'Know the limits',
        title: 'No CAPTCHA solving, no login.',
        body: 'The proxy gets a request judged as legitimate traffic. It does not solve a CAPTCHA or a Turnstile widget that the site shows to every visitor, and it does not sign in to anything.',
        note: 'When not to: pages that need an account are a session problem, not a proxy problem. Forward your own session with [private pages patterns](/docs/guides/common/private-pages), and only where you are allowed to access the content.'
      }
    ]
  },
  faq: [
    {
      question: 'Can I scrape a Cloudflare-protected website with an API?',
      answer:
        'Yes. Send your extraction rules to the Pro endpoint and automatic proxy resolution handles the Cloudflare wall before the rules run. No proxy parameter is needed, and the response is the data from the real page.'
    },
    {
      question: 'Why does my scraper return a Cloudflare “Just a moment” page?',
      answer:
        'Cloudflare decided the request looked automated, usually because of a datacenter IP or a headless fingerprint, and served its interstitial instead of the page. Your scraper parsed the interstitial. Through the API on a Pro plan, that 403 triggers the proxy escalation instead of reaching your parser.'
    },
    {
      question: 'Does the scraping API solve Cloudflare Turnstile challenges?',
      answer:
        'No. There is no CAPTCHA or Turnstile solving. The proxy route is built so requests are judged as legitimate traffic in the first place; a challenge shown to every visitor is not something it clicks through.'
    },
    {
      question: 'Will every Cloudflare-protected site scrape successfully?',
      answer:
        'Not every one. Automatic proxy resolution is well tested against the 500 most popular websites worldwide, and protection settings vary from site to site. Check the x-fetch-mode header and the returned fields on a sample before you scale a job to a new domain.'
    },
    {
      question: 'What happens when I scrape a Cloudflare site on the free plan?',
      answer:
        'The request fails with the [EPROXYNEEDED error code](/docs/api/basics/error-codes#eproxyneeded): the URL uses antibot protection and needs a Pro plan. Nothing else changes when you upgrade: the same request, sent with an API key, goes through the proxy automatically.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to scrape',
    headlineAccent: 'behind Cloudflare',
    body: 'Keep your extraction rules, add a Pro key and let the API climb to residential IPs only when a site demands it.',
    href: '/features/proxy',
    label: 'Scrape protected sites'
  },
  howTo: {
    name: 'How to scrape a Cloudflare-protected website',
    steps: [
      {
        title: 'Extract fields from the protected page',
        description:
          'Call the extract method with CSS selector rules for the fields you need, a retry of 3 and a ttl, using a client created with a Pro API key.'
      },
      {
        title: 'Check the route the request took',
        description:
          'Read the x-fetch-mode response header from the last request. A value that ends in -proxy means the page was reached through the proxy route.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Send url, the data rules, meta=false and retry=3 to pro.microlink.io with the x-api-key header. No proxy parameter is needed on Pro.'
      }
    ]
  }
}
