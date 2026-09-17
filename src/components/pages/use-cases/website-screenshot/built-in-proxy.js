export const CONTENT = {
  slug: 'website-screenshot/built-in-proxy',
  head: {
    title: 'Screenshot blocked websites with a built-in proxy',
    description:
      'Sites behind Cloudflare, DataDome or Akamai block headless browsers. Add proxy: true and the capture routes through a managed proxy pool automatically.'
  },
  hero: {
    title: 'Screenshot blocked websites with the built-in proxy',
    intro:
      'Some pages refuse to render for automated browsers: a challenge page, a 403, an endless spinner. Instead of buying and rotating a proxy list yourself, add one option and the Screenshot API resolves the proxy for you.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Bot protection sees a headless browser coming',
    paragraphs: [
      'Datacenter IPs and headless fingerprints are exactly what antibot services look for. Cloudflare, DataDome, Akamai and similar shields answer with a challenge or a block, and your screenshot shows the wall instead of the page.',
      'On Pro plans, Microlink includes automatic proxy resolution: when a target requires it, the request is routed through a rotating proxy pool tested against the 500 most popular websites. The API tells you when that is needed with the EPROXYNEEDED error code.'
    ]
  },
  how: {
    title: 'Detect the block, retry through the proxy',
    intro:
      'Start without a proxy, catch EPROXYNEEDED, retry with proxy: true. Or pass it upfront for targets you already know are protected.',
    steps: [
      {
        label: '1 · Capture through the managed proxy',
        sdk: "const { url } = await microlink.screenshot('https://hard-target.com', {\n  proxy: true\n})",
        note: 'proxy: true routes the request through the managed proxy pool; there is no list to maintain.'
      },
      {
        label: '2 · Only when the target needs it',
        sdk: "const capture = async target => {\n  try {\n    return await microlink.screenshot(target)\n  } catch (error) {\n    if (error.code !== 'EPROXYNEEDED') throw error\n    return microlink.screenshot(target, { proxy: true, retry: 3 })\n  }\n}",
        note: 'EPROXYNEEDED signals that the target refused a direct request; retrying with the proxy resolves it.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://hard-target.com',
          params: { screenshot: true, meta: false, proxy: true },
          pro: true
        },
        note: 'proxy requires a Pro key, so the URL targets the pro endpoint.'
      }
    ],
    params: [
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'true for automatic resolution, an object with location, or your own proxy URL. Pro plans.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff for intermittent challenges.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forward a language or a custom header when the target expects one.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache the unblocked capture so repeat calls skip the proxy path.'
      }
    ],
    outro:
      'Confirm the proxy was used with the x-fetch-mode response header: any value prefixed with proxy- means the request went through it.'
  },
  why: {
    title: 'Why a built-in proxy beats a proxy list',
    intro:
      'A proxy is only useful if it is the right proxy, at the right time, without leaking credentials into your screenshot URLs.',
    cards: [
      {
        kicker: 'Resolved, not rotated by you',
        title: 'The API decides when and how to route.',
        body: 'Microlink identifies the antibot provider blocking the request and routes it through a dedicated resolution path. You never maintain a pool, rotate IPs or debug which exit is burned.',
        note: 'This applies to every product, so the same option unblocks a [Markdown conversion](/markdown) or a [metadata](/metadata) request of the same site.'
      },
      {
        kicker: 'An explicit signal',
        title: 'EPROXYNEEDED tells you exactly when a proxy is required.',
        body: 'Instead of guessing from a blank image, the API rejects the direct request with a code you can catch. Retry with proxy: true only for the targets that need it and keep the rest cheap.',
        note: 'The signal surfaces on every plan; routing through the proxy is a Pro capability.'
      },
      {
        kicker: 'Bring your own if you must',
        title: 'A proxy URL string routes through your own provider.',
        body: 'If a contract or a region requires a specific proxy, pass its URL as proxy and Microlink still handles the browser, retries and errors around it.',
        note: 'When not to: the proxy does not log you into anything. For pages behind authentication, forward the session with [request headers](/use-cases/website-screenshot/behind-login) instead.'
      }
    ]
  },
  faq: [
    {
      question: 'Is the proxy included in the price?',
      answer:
        'Automatic proxy resolution is included in Pro plans; there is no separate proxy bill. The free tier surfaces the EPROXYNEEDED signal but cannot route through the proxy.'
    },
    {
      question: 'How do I know the screenshot was taken through the proxy?',
      answer:
        'Check the x-fetch-mode response header. Values prefixed with proxy-, such as prerender-proxy, mean the request was routed through the proxy.'
    },
    {
      question: 'Which sites need the proxy?',
      answer:
        'Typically sites protected by Cloudflare, DataDome, Akamai and similar antibot services, or sites that rate-limit datacenter IPs. Rather than keeping a list, catch EPROXYNEEDED and retry with proxy: true.'
    },
    {
      question: 'Can I choose the country of the proxy?',
      answer:
        'Yes. Pass proxy.location with a two-letter country code to pin the exit country. See [screenshot a site from another country](/use-cases/website-screenshot/proxy-geolocation) for the full recipe.'
    },
    {
      question: 'Does the proxy solve CAPTCHAs?',
      answer:
        'The proxy avoids the checks that trigger CAPTCHAs for datacenter traffic; it is not a CAPTCHA solver. When a page still shows a challenge, Microlink’s [antibot detection](/features/antibot) tells you which provider blocked it.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to screenshot',
    headlineAccent: 'hard targets',
    body: 'One option, no proxy list. Get a Pro key and capture the pages that block everyone else.',
    href: '/screenshot',
    label: 'Unblock your screenshots'
  }
}
