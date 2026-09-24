export const CONTENT = {
  slug: 'website-to-markdown/blocked-sites',
  head: {
    title: 'Convert a blocked page to Markdown with a built-in proxy',
    description:
      'Convert a blocked page to Markdown: when Cloudflare, DataDome or Akamai reject the fetch, a Pro key escalates it through proxy tiers automatically.'
  },
  hero: {
    title: 'Convert bot-protected and blocked pages to Markdown',
    intro:
      'Convert a blocked page to Markdown with a Pro key instead of a proxy subscription and a rotation script. News sites, marketplaces and documentation behind a CDN shield are the pages that agents, RAG crawlers and research tools most want to read, and the ones most likely to answer automated traffic with a challenge. Automatic proxy resolution handles the unblocking inside the same Markdown request, with no extra parameter.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A blocked page converts to a challenge screen, not Markdown',
    paragraphs: [
      'Antibot services such as Cloudflare, DataDome and Akamai answer datacenter traffic with a JavaScript challenge, a CAPTCHA or a bare 403. Converted to Markdown, that is a heading that says “Just a moment” and no content. The pipeline records a success, moves on, and your index now has a hole where the article should be.',
      'The usual workaround is a proxy vendor plus your own rotation logic: a list of exits to maintain, retries to tune per target and a second bill. It also splits one job across two systems, so when a conversion fails you have to work out whether the proxy, the browser or the parser was at fault. Scraping a Cloudflare site to Markdown should not need three moving parts.',
      'On Pro plans [automatic proxy resolution](/features/proxy) is on by default. When a fetch hits a 403, Microlink [identifies the antibot provider](/features/antibot) and escalates through proxy tiers, ending on residential exits, the slowest and most reliable route, then caches the tier that worked for that domain. On the free tier the same target fails with the [EPROXYNEEDED error code](/docs/api/basics/error-codes) instead of returning junk, so you know exactly which URLs need a Pro key.'
    ]
  },
  how: {
    title: 'How to convert a blocked page to Markdown through the proxy',
    intro:
      'Send protected pages with a Pro key, or start on the free tier and move only the EPROXYNEEDED URLs to Pro, then cache the result so the proxy path runs once per URL. The [proxy guide](/docs/guides/common/proxy) lists the other signals that a target is blocking you, such as empty results on a known-good URL.',
    steps: [
      {
        label: '1 · Convert with a Pro key',
        sdk: "const markdown = await microlink.markdown('https://hard-target.com/article', {\n  selector: 'article'\n})",
        note: 'The client carries your Pro key, so a blocked fetch escalates through the proxy tiers with no parameter, and the selector scopes the conversion to the article element. The call resolves to the Markdown string.'
      },
      {
        label: '2 · Free tier first, Pro when blocked',
        sdk: "const freeTier = createClient()\n\nconst convert = async url => {\n  try {\n    return await freeTier.markdown(url)\n  } catch (error) {\n    if (error.code !== 'EPROXYNEEDED') throw error\n    return microlink.markdown(url, { retry: 3, ttl: '1d' })\n  }\n}",
        note: 'The free tier runs first. Only URLs that fail with EPROXYNEEDED move to the Pro client, where the proxy resolves automatically, with three server-side retries for intermittent challenges and a one-day ttl so repeat reads come from the cache.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://hard-target.com/article',
          params: {
            data: { markdown: { attr: 'markdown' } },
            meta: false,
            embed: 'markdown'
          },
          pro: true
        },
        note: 'The proxy comes with the Pro key, so the URL targets the pro endpoint with your API key in the x-api-key header and no proxy parameter. embed=markdown returns the Markdown itself with a text/markdown content type.'
      }
    ],
    params: [
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Automatic on Pro plans with no value needed. Pass location to pin a country or url for your own proxy server.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff for intermittent failures. Default 2.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache lifetime of the converted page: 24 hours by default, 1 minute to 31 days on Pro plans.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forward an accept-language or user-agent header when the target expects one. Pro plans.'
      }
    ],
    outro:
      'Confirm the route with the x-fetch-mode response header: any value ending in -proxy, such as fetch-proxy or prerender-proxy, means the request went through the proxy. x-cache-status tells you whether the response was a MISS, a HIT or a BYPASS.'
  },
  why: {
    title: 'Why the proxy belongs inside the Markdown API',
    intro:
      'Reaching the page and reading it are one problem for an agent. Splitting them across vendors doubles the failure modes, and troubleshooting a failed request is much shorter when one request owns the whole path.',
    cards: [
      {
        kicker: 'Provider-aware routing',
        title: 'Microlink identifies who is blocking and routes accordingly.',
        body: 'Rather than blindly rotating IPs, the API escalates through proxy tiers after a 403, up to residential exits, and caches the tier that worked per domain. The next page on the same site skips the climb.',
        note: 'The same Pro key unblocks [screenshots of blocked websites](/use-cases/website-screenshot/built-in-proxy) and [link previews for bot-protected sites](/use-cases/website-metadata/blocked-sites), so one fix covers every workflow that touches the same domain.'
      },
      {
        kicker: 'A signal you can act on',
        title: 'EPROXYNEEDED separates blocked from broken.',
        body: 'A blocked target fails with a specific code instead of returning a challenge page as content. Your pipeline can move it to a Pro key, mark the domain or skip it, and nothing unreadable ever reaches the index.',
        note: 'The signal surfaces on the free endpoint. Automatic proxy resolution is a Pro capability, and the [pricing page](/pricing) lists the plans.'
      },
      {
        kicker: 'Composable with cleaning and caching',
        title: 'Proxy, selector and cache in a single request.',
        body: 'The proxy fetches the page, the selector scopes the content and ttl keeps the result. Cache hits do not count against your quota, so the proxy path runs once per URL per cache lifetime.',
        note: 'When not to: the proxy does not sign you in or get you past a paywall. Pages behind authentication need [forwarded headers](/docs/guides/common/private-pages), and content you are not permitted to access should stay out of the pipeline.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I convert a Cloudflare-protected page to Markdown?',
      answer:
        'Send the Markdown request with a Pro key, no extra parameter. Microlink detects the antibot provider, escalates through proxy tiers up to residential and converts the page it finally reaches. There is no separate proxy subscription to buy and no exit list to rotate.'
    },
    {
      question: 'Why does a blocked page convert to a “Just a moment” screen in Markdown?',
      answer:
        'The target served its antibot challenge instead of the article, and the conversion ran on that. Send the same URL with a Pro key, where the proxy resolves automatically, and scope the result with a selector such as article. If the content is also client-rendered, see [Markdown from JavaScript-rendered pages](/use-cases/website-to-markdown/javascript-rendered-pages).'
    },
    {
      question: 'How do I know a Markdown request went through the proxy?',
      answer:
        'Check the x-fetch-mode response header. A value ending in -proxy, such as fetch-proxy or prerender-proxy, means the request was routed through the proxy, and x-pricing-plan reports pro.'
    },
    {
      question: 'Can I use my own proxy for Markdown conversions?',
      answer:
        'Yes. Pass your proxy server as [proxy.url](/docs/api/parameters/proxy/url) in the form https://username:password@hostname:port, and Microlink routes every sub-request through it while still handling the browser, retries and errors. A custom proxy URL and proxy.location are exclusive.'
    },
    {
      question: 'Does the proxy let a Markdown conversion bypass paywalls or logins?',
      answer:
        'No. It only avoids the blocks that target automated traffic. Authenticated content still requires your own session forwarded through request headers, and only where you are permitted to access it.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to read',
    headlineAccent: 'hard targets',
    body: 'No option, no proxy list, clean Markdown from the pages that block everyone else. Get a Pro key and unblock your pipeline.',
    href: '/markdown',
    label: 'Convert protected pages'
  },
  howTo: {
    name: 'How to convert a bot-protected page to Markdown',
    steps: [
      {
        title: 'Convert with a Pro key',
        description:
          'Call the Markdown method with a Pro key and a selector such as article. A blocked fetch escalates through proxy tiers automatically and resolves to the Markdown of that element.'
      },
      {
        title: 'Start on the free tier and move blocked URLs to Pro',
        description:
          'Run the request on the free tier first and catch the EPROXYNEEDED error code. Send only those URLs to the Pro client with retry: 3 and a ttl so the unblocked result is cached.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Send url, data.markdown.attr=markdown, meta=false and embed=markdown to the pro endpoint with your API key in the x-api-key header to get the Markdown back as text/markdown.'
      }
    ]
  }
}
