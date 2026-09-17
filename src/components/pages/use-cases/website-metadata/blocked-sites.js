export const CONTENT = {
  slug: 'website-metadata/blocked-sites',
  head: {
    title: 'Link previews for bot-protected sites with a proxy',
    description:
      'Sites behind Cloudflare, DataDome or Akamai return challenges instead of metadata. Add proxy: true and the request routes through a managed proxy pool.'
  },
  hero: {
    title: 'Link previews and metadata for bot-protected sites',
    intro:
      'A shared link to a protected site should still unfurl into a title, a description and an image. When the site blocks datacenter traffic, the Metadata API can route the request through its built-in proxy with one option.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A challenge page has no metadata worth showing',
    paragraphs: [
      'Antibot services serve a verification page to automated requests. Its title is “Just a moment”, its description is empty and its image is missing, and that is what a naive preview shows for every link to that site.',
      'On Pro plans, Microlink includes automatic proxy resolution: it identifies the antibot provider and routes the request through a dedicated resolution path over a rotating proxy pool. The EPROXYNEEDED error code tells you when a target requires it.'
    ]
  },
  how: {
    title: 'Detect, retry, cache',
    intro:
      'Try the direct request first, retry with the proxy on EPROXYNEEDED, and cache the preview so the proxy path runs once per URL.',
    steps: [
      {
        label: '1 · Metadata through the managed proxy',
        sdk: "const { title, description, image } = await microlink.metadata(\n  'https://hard-target.com/article',\n  { proxy: true }\n)",
        note: 'proxy: true routes the request through the managed pool; nothing to configure.'
      },
      {
        label: '2 · Only when the target needs it',
        sdk: "const preview = async url => {\n  try {\n    return await microlink.metadata(url)\n  } catch (error) {\n    if (error.code !== 'EPROXYNEEDED') throw error\n    return microlink.metadata(url, { proxy: true, retry: 3, ttl: '1d' })\n  }\n}",
        note: 'Direct requests stay cheap; the proxy runs only for targets that reject them, and ttl caches the unblocked preview.'
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
        note: 'proxy is a Pro option, so the URL targets the pro endpoint; meta keeps only the preview fields.'
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
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache the unblocked preview so repeat unfurls skip the proxy.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Restrict detection to title, description and image for a lighter request.'
      },
      {
        name: 'ping',
        href: '/docs/api/parameters/ping',
        note: 'Verifies that image and logo URLs are reachable before they are returned.'
      }
    ],
    outro:
      'Confirm the proxy was used with the x-fetch-mode response header: values prefixed with proxy- mean the request went through it.'
  },
  why: {
    title: 'Why previews need the proxy inside the API',
    intro:
      'Unfurling a link is a single step for your product. It should stay a single step even when the target fights back.',
    cards: [
      {
        kicker: 'Provider-aware',
        title: 'The route depends on who is blocking.',
        body: 'Microlink detects the antibot provider and picks a dedicated resolution path, over a pool tested against the 500 most popular websites, which is where most shared links point.',
        note: 'The same option unblocks [screenshots](/use-cases/website-screenshot/built-in-proxy) and [Markdown](/use-cases/website-to-markdown/blocked-sites) of the same site.'
      },
      {
        kicker: 'Explicit signal',
        title: 'EPROXYNEEDED instead of a wrong preview.',
        body: 'A blocked target fails with a code you can catch, so your app can retry with the proxy or show a plain link, but never renders “Just a moment” as the title of a story.',
        note: 'The signal surfaces on every plan; routing through the proxy is a Pro capability.'
      },
      {
        kicker: 'Cached unfurls',
        title: 'The proxy runs once per URL, the cache serves the rest.',
        body: 'Chat apps and feeds unfurl the same link thousands of times. With ttl and staleTtl the proxied preview is served from the edge while the copy refreshes in the background.',
        note: 'When not to: the proxy avoids bot blocks, not logins or paywalls. Content behind authentication needs forwarded headers, and only where you are permitted to fetch it.'
      }
    ]
  },
  faq: [
    {
      question: 'Why do link previews fail for some sites?',
      answer:
        'Those sites use antibot protection that blocks datacenter traffic. The API returns EPROXYNEEDED; retry with proxy: true on a Pro plan and the request routes through the managed proxy pool.'
    },
    {
      question: 'Is the proxy for metadata included in Pro plans?',
      answer:
        'Yes. Automatic proxy resolution is part of every Pro plan; there is no separate proxy subscription.'
    },
    {
      question: 'Can I pin the proxy to a country for previews?',
      answer:
        'Yes. Pass proxy.location with a two-letter country code to fetch the region-specific version of the page.'
    },
    {
      question: 'Should I always send proxy: true?',
      answer:
        'No. Direct requests are cheaper and faster. Catch EPROXYNEEDED and retry with the proxy only for the targets that need it, then cache the result.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to unfurl',
    headlineAccent: 'every link',
    body: 'One option, no proxy list, real previews for the sites that block everyone else. Get a Pro key and fix your first blocked preview today.',
    href: '/metadata',
    label: 'Unblock link previews'
  }
}
