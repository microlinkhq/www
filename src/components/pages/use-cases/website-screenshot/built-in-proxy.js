export const CONTENT = {
  slug: 'website-screenshot/built-in-proxy',
  head: {
    title: 'Screenshot blocked websites with a built-in proxy',
    description:
      'Sites behind Cloudflare, DataDome or Akamai block headless browsers. On a Pro key the capture escalates through proxy tiers automatically.'
  },
  hero: {
    title: 'Screenshot blocked websites without managing a proxy list',
    intro:
      'To screenshot blocked websites you need more than a headless browser: a challenge page, a 403 or an endless spinner is what bot protection serves to datacenter traffic. Price monitoring, competitive research, archiving and link previews all hit that wall sooner or later. Instead of buying and rotating proxies yourself, send the capture with a Pro key and the [Screenshot API](/screenshot) resolves the proxy for you, with no extra option.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A screenshot of a blocked website shows the bot wall, not the page',
    paragraphs: [
      'Datacenter IPs and headless fingerprints are exactly what antibot services look for. Cloudflare, DataDome, Akamai and similar shields answer with a challenge or a block, and your screenshot shows the wall instead of the page. With a self-hosted browser the navigation still succeeds, so nothing in your pipeline flags the image as useless.',
      'Running your own proxies is a second product to maintain. You buy a pool, rotate exits, retire the burned ones, match the proxy type to each antibot vendor and keep the credentials out of your URLs and logs. The list that works this month stops working the next, and every failure looks like a blank capture.',
      'On Pro plans the [proxy](/docs/api/parameters/proxy) is on by default. When a capture hits a 403 wall, Microlink [detects the antibot provider](/features/antibot) and escalates through proxy tiers, ending on residential exits: the slowest route, and the one that usually gets through. The tier that worked is cached per domain, so the next capture of that site goes straight to it. On the free tier the same target fails with EPROXYNEEDED instead.'
    ]
  },
  how: {
    title: 'How to screenshot a Cloudflare-protected site through the proxy',
    intro:
      'Send protected targets with a Pro key and the proxy resolves itself. If you start on the free tier, EPROXYNEEDED marks the URLs to move to the Pro key. The [proxy guide](/docs/guides/common/proxy) lists every signal that a target needs one.',
    steps: [
      {
        label: '1 · Capture with a Pro key',
        sdk: "const { url } = await microlink.screenshot('https://hard-target.com')",
        note: 'The client carries your Pro key, so a blocked capture escalates through the proxy tiers on its own and returns the same asset object as any screenshot: url, width, height, type and size. There is no parameter to add, no list to maintain and no proxy credential in the request.'
      },
      {
        label: '2 · Free tier first, Pro when blocked',
        sdk: "const freeTier = createClient()\n\nconst capture = async target => {\n  try {\n    return await freeTier.screenshot(target)\n  } catch (error) {\n    if (error.code !== 'EPROXYNEEDED') throw error\n    return microlink.screenshot(target, { retry: 3 })\n  }\n}",
        note: 'EPROXYNEEDED means the target uses antibot protection and needs a Pro plan. Only those URLs move to the Pro client, where the proxy resolves automatically, with retry raised to 3 for intermittent challenges.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://hard-target.com',
          params: { screenshot: true, meta: false },
          pro: true
        },
        note: 'The proxy comes with the Pro key, so the URL targets pro.microlink.io with the x-api-key header and no proxy parameter. An x-fetch-mode response header ending in -proxy, such as prerender-proxy, confirms the route.'
      }
    ],
    params: [
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Automatic on Pro plans with no value needed. Pass an object with location or url only to pin a country or bring your own server.'
      },
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'Two-letter ISO country code that pins the exit country of the proxy. Default us. Pro plans.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff for intermittent challenges. Default 2.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forwards a language or a custom header when the target expects one. Pro plans.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Caches the unblocked capture from 1 minute to 31 days so repeat calls skip the proxy path entirely. Pro plans.'
      }
    ],
    outro:
      'Confirm the proxy was used with the x-fetch-mode response header: any value ending in -proxy means the request went through it. If a capture still fails, the [screenshot troubleshooting guide](/docs/guides/screenshot/troubleshooting) walks through timing, blocking and plan errors in order.'
  },
  why: {
    title: 'Why a built-in proxy beats maintaining your own proxy list',
    intro:
      'A proxy is only useful if it is the right proxy, at the right time, without leaking credentials into your screenshot URLs. Building it into the API removes three chores.',
    cards: [
      {
        kicker: 'Resolved for you',
        title: 'The API decides when and how to route.',
        body: 'Microlink identifies the antibot provider behind a 403 and escalates through proxy tiers until one gets through, then remembers that tier for the domain. You never maintain a pool, rotate IPs or debug which exit is burned.',
        note: 'The resolution works on every product, so the same Pro key unblocks a [Markdown conversion of a bot-protected page](/use-cases/website-to-markdown/blocked-sites) or a metadata request for the same site.'
      },
      {
        kicker: 'An explicit signal',
        title: 'EPROXYNEEDED tells you exactly when a target needs Pro.',
        body: 'Instead of guessing from a blank image, the free tier rejects a bot-protected target with a code you can catch. Send only those targets to your Pro key, and every other capture stays on the free route.',
        note: 'The signal surfaces on the free tier. Automatic proxy resolution is a [Pro capability](/pricing), so a request sent to your Pro key from the start never needs the free-tier fallback.'
      },
      {
        kicker: 'Bring your own if you must',
        title: 'proxy.url routes through your own provider.',
        body: 'If a contract or a region requires a specific proxy, pass its URL as proxy.url and Microlink still handles the browser, the retries and the errors around it. Every sub-request of the page, from redirects to assets, goes through that server.',
        note: 'When not to: the proxy does not log you into anything. For pages behind authentication, [forward the session as a request header](/use-cases/website-screenshot/behind-login) instead. If the site is also bot-protected, the Pro key handles the proxy on top.'
      }
    ]
  },
  faq: [
    {
      question:
        'Is the proxy for screenshots of blocked websites included in the price?',
      answer:
        'Yes. Automatic proxy resolution is included and on by default in every Pro plan, with no separate proxy bill. The free tier surfaces the EPROXYNEEDED signal but cannot route through the proxy.'
    },
    {
      question: 'How do I know a screenshot was taken through the proxy?',
      answer:
        'Check the x-fetch-mode response header. Values ending in -proxy, such as prerender-proxy or fetch-proxy, mean the request was routed through the proxy, and x-pricing-plan: pro confirms it ran on a paid plan.'
    },
    {
      question: 'How do I screenshot a Cloudflare-protected site?',
      answer:
        'Send the request with a Pro key, no extra parameter. Sites protected by Cloudflare, DataDome, Akamai and similar antibot services refuse datacenter traffic, and the API escalates through proxy tiers, up to residential, until the capture goes through.'
    },
    {
      question: 'Can I choose the country of the screenshot proxy?',
      answer:
        'Yes. Pass proxy.location with a two-letter ISO country code to pin the exit country; the default is us. See [screenshot a website from another country](/use-cases/website-screenshot/proxy-geolocation) for the full recipe.'
    },
    {
      question: 'Why is the first screenshot of a protected site slower?',
      answer:
        'The first capture may climb several proxy tiers before one gets through, and the residential tier is the slowest. The tier that worked is cached per domain, so later screenshots of that site go straight to it. See [proxy resolution](/features/proxy) for how the escalation works.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to screenshot',
    headlineAccent: 'hard targets',
    body: 'No option, no proxy list. Get a Pro key and capture the pages that block everyone else.',
    href: '/screenshot',
    label: 'Unblock your screenshots'
  },
  howTo: {
    name: 'How to screenshot a blocked website through the built-in proxy',
    steps: [
      {
        title: 'Capture with a Pro key',
        description:
          'Send the screenshot request with a Pro key. A blocked capture escalates through proxy tiers automatically, with no parameter and no proxy list to maintain.'
      },
      {
        title: 'Start on the free tier and move blocked URLs to Pro',
        description:
          'Request the screenshot on the free tier first, catch the EPROXYNEEDED error code and send that target to the Pro client with a higher retry count.'
      },
      {
        title: 'Verify the route',
        description:
          'Call pro.microlink.io with your x-api-key header and check that the x-fetch-mode response header ends in -proxy, which confirms the request went through the proxy.'
      }
    ]
  }
}
