export const CONTENT = {
  slug: 'website-screenshot/built-in-proxy',
  head: {
    title: 'Screenshot blocked websites with a built-in proxy',
    description:
      'Sites behind Cloudflare, DataDome or Akamai block headless browsers. Add proxy: true and the capture routes through a managed, rotating proxy pool.'
  },
  hero: {
    title: 'Screenshot blocked websites without managing a proxy list',
    intro:
      'To screenshot blocked websites you need more than a headless browser: a challenge page, a 403 or an endless spinner is what bot protection serves to datacenter traffic. Price monitoring, competitive research, archiving and link previews all hit that wall sooner or later. Instead of buying and rotating proxies yourself, add one option and the [Screenshot API](/screenshot) resolves the proxy for you.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A screenshot of a blocked website shows the bot wall, not the page',
    paragraphs: [
      'Datacenter IPs and headless fingerprints are exactly what antibot services look for. Cloudflare, DataDome, Akamai and similar shields answer with a challenge or a block, and your screenshot shows the wall instead of the page. With a self-hosted browser the navigation still succeeds, so nothing in your pipeline flags the image as useless.',
      'Running your own proxies is a second product to maintain. You buy a pool, rotate exits, retire the burned ones, match the proxy type to each antibot vendor and keep the credentials out of your URLs and logs. The list that works this month stops working the next, and every failure looks like a blank capture.',
      'On Pro plans Microlink includes automatic proxy resolution: it [detects the antibot provider](/features/antibot) blocking the request and routes it through a rotating proxy pool tested against the 500 most popular websites. When a direct request is refused, the API says so with the EPROXYNEEDED error code, and [proxy: true](/docs/api/parameters/proxy) sends the same capture through the pool.'
    ]
  },
  how: {
    title: 'How to screenshot a Cloudflare-protected site through the proxy',
    intro:
      'Start without a proxy, catch EPROXYNEEDED, retry with proxy: true. Or pass it upfront for targets you already know are protected. The [proxy guide](/docs/guides/common/proxy) lists every signal that a target needs one.',
    steps: [
      {
        label: '1 · Capture through the managed proxy',
        sdk: "const { url } = await microlink.screenshot('https://hard-target.com', {\n  proxy: true\n})",
        note: 'proxy: true routes the capture through the managed proxy pool and returns the same asset object as any screenshot: url, width, height, type and size. There is no list to maintain and no proxy credential in the request.'
      },
      {
        label: '2 · Only when the target needs it',
        sdk: "const capture = async target => {\n  try {\n    return await microlink.screenshot(target)\n  } catch (error) {\n    if (error.code !== 'EPROXYNEEDED') throw error\n    return microlink.screenshot(target, { proxy: true, retry: 3 })\n  }\n}",
        note: 'EPROXYNEEDED means the target refused a direct request. Retrying only those targets through the proxy, with retry raised to 3 for intermittent challenges, keeps every other capture on the direct route.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://hard-target.com',
          params: { screenshot: true, meta: false, proxy: true },
          pro: true
        },
        note: 'proxy requires a Pro key, so the URL targets pro.microlink.io with the x-api-key header. An x-fetch-mode response header prefixed with proxy-, such as prerender-proxy, confirms the route.'
      }
    ],
    params: [
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'true for automatic resolution, an object with location or url, or a bare proxy URL string. Pro plans.'
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
        note: 'Caches the unblocked capture from 1 minute to 31 days so repeat calls skip the proxy path. Pro plans.'
      }
    ],
    outro:
      'Confirm the proxy was used with the x-fetch-mode response header: any value prefixed with proxy- means the request went through it. If a capture still fails, the [screenshot troubleshooting guide](/docs/guides/screenshot/troubleshooting) walks through timing, blocking and plan errors in order.'
  },
  why: {
    title: 'Why a built-in proxy beats maintaining your own proxy list',
    intro:
      'A proxy is only useful if it is the right proxy, at the right time, without leaking credentials into your screenshot URLs. Building it into the API removes three chores.',
    cards: [
      {
        kicker: 'Resolved for you',
        title: 'The API decides when and how to route.',
        body: 'Microlink identifies the antibot provider blocking the request and routes it through a dedicated resolution path. You never maintain a pool, rotate IPs or debug which exit is burned, and the pool is tested against the 500 most popular websites.',
        note: 'The option works on every product, so the same flag unblocks a [Markdown conversion of a bot-protected page](/use-cases/website-to-markdown/blocked-sites) or a metadata request for the same site.'
      },
      {
        kicker: 'An explicit signal',
        title: 'EPROXYNEEDED tells you exactly when a proxy is required.',
        body: 'Instead of guessing from a blank image, the API rejects the direct request with a code you can catch. Retry with proxy: true only for the targets that need it, and every other capture stays on the direct route.',
        note: 'The signal surfaces on every plan, free tier included. Routing through the pool is a [Pro capability](/pricing), and sending proxy without a paid plan returns the EPROXY error.'
      },
      {
        kicker: 'Bring your own if you must',
        title: 'proxy.url routes through your own provider.',
        body: 'If a contract or a region requires a specific proxy, pass its URL as proxy.url and Microlink still handles the browser, the retries and the errors around it. Every sub-request of the page, from redirects to assets, goes through that server.',
        note: 'When not to: the proxy does not log you into anything. For pages behind authentication, [forward the session as a request header](/use-cases/website-screenshot/behind-login) instead, and add the proxy only if the site is also bot-protected.'
      }
    ]
  },
  faq: [
    {
      question:
        'Is the proxy for screenshots of blocked websites included in the price?',
      answer:
        'Yes. Automatic proxy resolution is included in every Pro plan, with no separate proxy bill. The free tier surfaces the EPROXYNEEDED signal but cannot route through the proxy.'
    },
    {
      question: 'How do I know a screenshot was taken through the proxy?',
      answer:
        'Check the x-fetch-mode response header. Values prefixed with proxy-, such as prerender-proxy, mean the request was routed through the proxy, and x-pricing-plan: pro confirms it ran on a paid plan.'
    },
    {
      question: 'How do I screenshot a Cloudflare-protected site?',
      answer:
        'Send the request with proxy: true on a Pro key. Sites protected by Cloudflare, DataDome, Akamai and similar antibot services refuse datacenter traffic, so rather than keeping a list of them, catch EPROXYNEEDED and retry those targets through the proxy.'
    },
    {
      question: 'Can I choose the country of the screenshot proxy?',
      answer:
        'Yes. Pass proxy.location with a two-letter ISO country code to pin the exit country; the default is us. See [screenshot a website from another country](/use-cases/website-screenshot/proxy-geolocation) for the full recipe.'
    },
    {
      question: 'Does the screenshot proxy solve CAPTCHAs?',
      answer:
        'The proxy is built to avoid the checks that trigger CAPTCHAs for datacenter traffic, not to solve a CAPTCHA once it is shown. When a page still presents a challenge, Microlink’s antibot detection reports which provider blocked it. See [proxy resolution](/features/proxy) for what the unblocker covers.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to screenshot',
    headlineAccent: 'hard targets',
    body: 'One option, no proxy list. Get a Pro key and capture the pages that block everyone else.',
    href: '/screenshot',
    label: 'Unblock your screenshots'
  },
  howTo: {
    name: 'How to screenshot a blocked website through the built-in proxy',
    steps: [
      {
        title: 'Capture through the managed proxy',
        description:
          'Add proxy: true to the screenshot request on a Pro key. The capture is routed through the managed, rotating proxy pool with no proxy list to maintain.'
      },
      {
        title: 'Use the proxy only when the target needs it',
        description:
          'Request the screenshot directly first, catch the EPROXYNEEDED error code and retry that target with proxy: true and a higher retry count.'
      },
      {
        title: 'Verify the route',
        description:
          'Call pro.microlink.io with your x-api-key header and check that the x-fetch-mode response header starts with proxy-, which confirms the request went through the proxy.'
      }
    ]
  }
}
