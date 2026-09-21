export const CONTENT = {
  slug: 'website-metadata/blocked-sites',
  head: {
    title: 'Fix link previews blocked by Cloudflare with a proxy',
    description:
      'A bot challenge turns every card into “Just a moment…”. Route the metadata request through the built-in proxy, then cache the real title and image.'
  },
  hero: {
    title: 'Fix link previews blocked by Cloudflare and other bot protection',
    intro:
      'A link preview blocked by Cloudflare, DataDome or Akamai shows a challenge page where the title, description and image should be. Chat apps, bookmark managers, CRMs and newsletter editors hit this on the links their users share most. On Pro plans the Metadata API routes the request through its [built-in proxy](/features/proxy), so the link unfurls into the real card.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A Cloudflare challenge page has no metadata worth showing',
    paragraphs: [
      'Antibot services answer automated requests with a verification page. Its title is “Just a moment…”, its description is empty and it has no image, so a naive unfurler renders that for every link to the site. News outlets, marketplaces and social networks sit behind this kind of protection, and those are the links people paste most.',
      'The usual fixes do not hold. Changing the user agent does not help when the target is judging the origin IP, and datacenter ranges are the first ones it rejects. Renting a proxy list means rotating IPs, watching ban rates and paying a second vendor, all to keep a feature working that should be one HTTP call.',
      'On Pro plans, Microlink includes [automatic proxy resolution](/docs/api/parameters/proxy): it identifies the [antibot provider](/features/antibot) and routes the request through a dedicated resolution path over a rotating proxy pool. When it detects the block and no proxy was used, the API fails with [EPROXYNEEDED](/docs/api/basics/error-codes#eproxyneeded) instead of handing you the challenge page as metadata.'
    ]
  },
  how: {
    title: 'How to unfurl protected links through the built-in proxy',
    intro:
      'Try the direct request first, retry through the proxy on EPROXYNEEDED, and cache the preview so the proxy path runs once per URL. The [proxy guide](/docs/guides/common/proxy) covers the same pattern for every workflow.',
    steps: [
      {
        label: '1 · Metadata through the managed proxy',
        sdk: "const { title, description, image } = await microlink.metadata(\n  'https://hard-target.com/article',\n  { proxy: true }\n)",
        note: 'proxy: true sends the request through the managed pool with nothing else to configure. The response is the usual normalized object: title, description, image, logo, publisher and the rest.'
      },
      {
        label: '2 · Only when the target needs it',
        sdk: "const preview = async url => {\n  try {\n    return await microlink.metadata(url)\n  } catch (error) {\n    if (error.code !== 'EPROXYNEEDED') throw error\n    return microlink.metadata(url, { proxy: true, retry: 3, ttl: '1d' })\n  }\n}",
        note: 'Direct requests skip the extra hop, so the proxy only runs for targets that reject them. retry adds server-side attempts for intermittent challenges and ttl caches the unblocked preview for a day.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://hard-target.com/article',
          params: {
            proxy: true,
            meta: { title: true, description: true, image: true }
          },
          pro: true
        },
        note: 'proxy is a Pro option, so the URL targets pro.microlink.io and carries your API key as a header. The meta object keeps detection to the three fields a card renders.'
      }
    ],
    params: [
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'true for automatic resolution, an object with location to pin a country, or url for your own proxy server. Pro plans.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff on unexpected browser errors. Default 2.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'How long the unblocked preview stays cached, from 1 minute to 31 days. Default 24 hours. Pro plans.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Restrict detection to title, description and image for a lighter request.'
      },
      {
        name: 'ping',
        href: '/docs/api/parameters/ping',
        note: 'On by default: image and logo URLs are verified as reachable before they are returned.'
      }
    ],
    outro:
      'Confirm the route with the x-fetch-mode response header: any value prefixed with proxy-, such as fetch-proxy or prerender-proxy, means the request went through the proxy.'
  },
  why: {
    title: 'Why link previews need the proxy inside the metadata API',
    intro:
      'Unfurling a link is one step in your product. It should stay one step even when the target pushes back.',
    cards: [
      {
        kicker: 'Provider-aware',
        title: 'The route depends on who is blocking.',
        body: 'Microlink identifies which antibot provider is blocking the request and picks a dedicated resolution path for it. The pool is tested against the 500 most popular websites worldwide, which is where most shared links point.',
        note: 'The same option unblocks [screenshots of blocked websites](/use-cases/website-screenshot/built-in-proxy) and [Markdown from bot-protected pages](/use-cases/website-to-markdown/blocked-sites).'
      },
      {
        kicker: 'Explicit signal',
        title: 'EPROXYNEEDED instead of a wrong preview.',
        body: 'A detected block fails with a code you can catch. Your app retries through the proxy or falls back to a plain link, and it never renders “Just a moment…” as the headline of a story.',
        note: 'The error surfaces on every plan. Routing through the proxy needs a Pro key; see [pricing](/pricing) for the plans.'
      },
      {
        kicker: 'Cached unfurls',
        title: 'The proxy runs once per URL, the cache serves the rest.',
        body: 'Chat apps and feeds unfurl the same link thousands of times. With ttl and staleTtl the proxied preview is served from the cache while a fresh copy is fetched in the background, and cache hits do not count against your quota.',
        note: 'When not to: the proxy gets past bot blocks, not logins or paywalls. Content behind authentication needs [forwarded headers](/docs/guides/metadata/private-pages), and only where you are permitted to fetch it.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does my link preview show “Just a moment…” as the title?',
      answer:
        'The site sits behind antibot protection and answered the request with a verification page. An extractor that does not notice the block reads that page’s title and its empty description. Microlink flags a detected block with the EPROXYNEEDED error code, so you can retry through the proxy instead of storing a wrong card.'
    },
    {
      question: 'How do I fix a link preview blocked by Cloudflare?',
      answer:
        'Send the same metadata request with proxy: true on a Pro plan. Microlink identifies the protection in front of the site, routes the request through its rotating proxy pool and returns the normalized title, description and image. Cache the result with ttl so the proxy path runs once per URL.'
    },
    {
      question: 'Is the metadata API proxy included in Pro plans?',
      answer:
        'Yes. Automatic proxy resolution is part of every Pro plan, with no separate proxy subscription and no IP list to manage. If you already pay for a proxy service, you can pass it as proxy.url instead.'
    },
    {
      question: 'Can I pin the metadata proxy to a specific country?',
      answer:
        'Yes. Pass proxy.location with an ISO 3166-1 alpha-2 country code and the request exits from that country. See [region-specific metadata](/use-cases/website-metadata/localized-metadata) for combining it with the Accept-Language header.'
    },
    {
      question: 'Should every link preview request go through the proxy?',
      answer:
        'No. Most sites answer a direct request, which skips the extra hop. Catch EPROXYNEEDED and retry with the proxy only for the targets that need it, then let the cache serve the repeats.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to unfurl',
    headlineAccent: 'every link',
    body: 'One option, no proxy list, real previews for the sites that block everyone else. Get a Pro key and fix your first blocked preview today.',
    href: '/metadata',
    label: 'Unblock link previews'
  },
  howTo: {
    name: 'How to unfurl links to bot-protected sites',
    steps: [
      {
        title: 'Request the metadata directly',
        description:
          'Call the Metadata API with the shared URL. Most sites answer without a proxy and return the normalized title, description and image.'
      },
      {
        title: 'Retry through the built-in proxy',
        description:
          'When the request fails with EPROXYNEEDED, repeat it with proxy set to true on a Pro plan, and add retry for intermittent challenges.'
      },
      {
        title: 'Cache the unblocked preview',
        description:
          'Set ttl so repeat unfurls of the same link are served from the cache and skip the proxy path.'
      },
      {
        title: 'Verify the route',
        description:
          'Check that the x-fetch-mode response header starts with proxy-, which confirms the request went through the proxy.'
      }
    ]
  }
}
