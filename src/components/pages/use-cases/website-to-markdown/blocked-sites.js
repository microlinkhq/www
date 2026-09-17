export const CONTENT = {
  slug: 'website-to-markdown/blocked-sites',
  head: {
    title: 'Convert bot-protected pages to Markdown with a proxy',
    description:
      'Sites behind Cloudflare, DataDome or Akamai reject automated fetches. Add proxy: true and the Markdown conversion routes through a managed proxy pool.'
  },
  hero: {
    title: 'Convert bot-protected pages to Markdown',
    intro:
      'The pages agents most want to read are often the ones that block them: news sites, marketplaces, documentation behind a CDN shield. Instead of a proxy subscription and a rotation script, add one option to the Markdown request.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A challenge page converts to nothing useful',
    paragraphs: [
      'Antibot services answer datacenter traffic with a challenge, a captcha or a bare 403. Converted to Markdown, that is a heading that says “Just a moment” and no content, and the pipeline moves on with a hole in its index.',
      'On Pro plans, Microlink includes automatic proxy resolution: it identifies the antibot provider and routes the request through a dedicated resolution path over a rotating proxy pool. The EPROXYNEEDED error code tells you exactly which requests need it.'
    ]
  },
  how: {
    title: 'Detect, retry, cache',
    intro:
      'Try the direct request first, retry with the proxy on EPROXYNEEDED, and cache the result so the proxy path runs once per URL.',
    steps: [
      {
        label: '1 · Convert through the managed proxy',
        sdk: "const markdown = await microlink.markdown('https://hard-target.com/article', {\n  proxy: true,\n  selector: 'article'\n})",
        note: 'proxy: true routes the request through the managed pool; scoping to article keeps the result clean.'
      },
      {
        label: '2 · Only when the target needs it',
        sdk: "const convert = async url => {\n  try {\n    return await microlink.markdown(url)\n  } catch (error) {\n    if (error.code !== 'EPROXYNEEDED') throw error\n    return microlink.markdown(url, { proxy: true, retry: 3, ttl: '1d' })\n  }\n}",
        note: 'The direct call stays cheap; the proxy path runs only for targets that reject it, and ttl caches the unblocked result.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://hard-target.com/article',
          params: {
            data: { markdown: { attr: 'markdown' } },
            meta: false,
            proxy: true,
            embed: 'markdown'
          },
          pro: true
        },
        note: 'proxy is a Pro option, so the URL targets the pro endpoint.'
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
        note: 'Cache the converted page so repeat reads skip the proxy path.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forward a language header or a user agent when the target expects one.'
      }
    ],
    outro:
      'Confirm the proxy was used with the x-fetch-mode response header: values prefixed with proxy- mean the request went through it.'
  },
  why: {
    title: 'Why the proxy belongs in the API',
    intro:
      'Reaching the page and reading it are one problem for an agent. Splitting them across vendors doubles the failure modes.',
    cards: [
      {
        kicker: 'Provider-aware routing',
        title: 'Microlink identifies who is blocking and routes accordingly.',
        body: 'Rather than blindly rotating IPs, the resolution path depends on the antibot provider detected. The pool is tested against the 500 most popular websites, which is where most agent traffic goes.',
        note: 'The same option unblocks [screenshots](/use-cases/website-screenshot/built-in-proxy) and [metadata](/use-cases/website-metadata/blocked-sites) of the same site.'
      },
      {
        kicker: 'A signal you can act on',
        title: 'EPROXYNEEDED separates blocked from broken.',
        body: 'A blocked target fails with a specific code instead of returning junk. Your pipeline can retry with the proxy, mark the domain, or skip it, instead of indexing a challenge page.',
        note: 'The signal is available on every plan; routing through the proxy is a Pro capability.'
      },
      {
        kicker: 'Composable with cleaning',
        title: 'Proxy plus selector plus cache.',
        body: 'The proxy fetches the page, the selector scopes the content and ttl keeps the result. One request handles the whole path from blocked to indexed.',
        note: 'When not to: the proxy does not sign you in. Pages behind authentication need [forwarded headers](/docs/guides/common/private-pages), and content you are not permitted to access should stay out of the pipeline.'
      }
    ]
  },
  faq: [
    {
      question: 'Do I need a separate proxy subscription to convert protected sites?',
      answer:
        'No. Automatic proxy resolution is included in Pro plans. Add proxy: true and Microlink manages the pool; there is nothing to configure or rotate.'
    },
    {
      question: 'How do I know a Markdown request went through the proxy?',
      answer:
        'Check the x-fetch-mode response header. A value prefixed with proxy- means the request was routed through the proxy.'
    },
    {
      question: 'Can I use my own proxy for Markdown conversions?',
      answer:
        'Yes. Pass a proxy URL string instead of true and Microlink routes through your provider while still handling the browser, retries and errors.'
    },
    {
      question: 'Does the proxy bypass paywalls or logins?',
      answer:
        'No. It only avoids the blocks that target automated traffic. Authenticated content still requires your own session forwarded through request headers, and only where you are permitted to access it.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to read',
    headlineAccent: 'hard targets',
    body: 'One option, no proxy list, clean Markdown from the pages that block everyone else. Get a Pro key and unblock your pipeline.',
    href: '/markdown',
    label: 'Convert protected pages'
  }
}
