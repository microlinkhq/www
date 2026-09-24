export const CONTENT = {
  slug: 'proxy/bring-your-own-proxy',
  head: {
    title: 'Use your own proxy with a headless browser API',
    description:
      'Route a headless browser through your own authenticated proxy: pass proxy.url and every redirect, asset and fetch of the page goes through your server.'
  },
  hero: {
    title: 'Run a headless browser through your own proxy server',
    intro:
      'A headless browser with a custom proxy is what you need when the exit IP is not yours to choose: a residential provider you already pay for, an address a partner has allow-listed, or a compliance rule about where traffic leaves from. Instead of launching and authenticating Chrome per proxy, pass the proxy URL with the request and the managed browser runs the page through it, credentials included.',
    cta: { label: 'See how the proxy works', href: '/features/proxy' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Wiring an authenticated proxy into headless Chrome is fiddly',
    paragraphs: [
      'In Puppeteer the proxy is a launch flag, so it applies to the whole browser, and the username and password go in separately through page authentication on every page you open. Two proxies means two browsers. A second provider, a second country or a rotated credential means relaunching, and a mistake in any of those steps shows up as a timeout rather than a clear error.',
      'Then the credential starts to travel. It ends up in environment files on every worker, in launch arguments that show in process lists, and sometimes in logs when a URL gets printed on failure. The proxy you pay for works, but the plumbing around it becomes its own small service to maintain.',
      'With Microlink the proxy is a request option. [proxy.url](/docs/api/parameters/proxy/url) takes a standard URL with the credentials inside, and every sub-request made while resolving the page, from redirects to assets to dynamic fetches, goes through that server. The browser, the retries and the error codes stay on the API side, and a different proxy on the next call is just a different value.'
    ]
  },
  how: {
    title: 'How to use your own proxy with a headless browser API',
    intro:
      'Keep the proxy URL in an environment variable on your server and pass it per request. The [proxy guide](/docs/guides/common/proxy) documents the format and the security rules in full.',
    steps: [
      {
        label: '1 · Route a request through your proxy',
        sdk: `const markdown = await microlink.markdown('https://example.com/article', {
  proxy: { url: process.env.PROXY_URL }
})`,
        note: 'PROXY_URL holds a value such as https://username:password@hostname:port. The page, its redirects and every asset it loads leave through that server, and the call resolves to the Markdown of the page.'
      },
      {
        label: '2 · Check the IP the target sees',
        sdk: `const text = await microlink.text('https://geolocation.microlink.io', {
  proxy: process.env.PROXY_URL
})`,
        note: 'geolocation.microlink.io shows the IP and country the server sees, so the text should name your proxy’s exit, not a Microlink one. A bare string is shorthand for proxy.url.'
      },
      {
        label: '3 · The same request with curl',
        code: `curl -G https://pro.microlink.io \\
  --data-urlencode 'url=https://example.com/article' \\
  --data-urlencode "proxy.url=$PROXY_URL" \\
  -d meta=false \\
  -d screenshot=true \\
  -H "x-api-key: $MICROLINK_API_KEY"`,
        language: 'bash',
        note: 'Both the proxy URL and the API key come from the shell environment, so neither is written into a script. Run it server-side only: the proxy URL is a credential.'
      }
    ],
    params: [
      {
        name: 'proxy.url',
        href: '/docs/api/parameters/proxy/url',
        note: 'Your proxy as a WHATWG URL, https://username:password@hostname:port. Pro plans.'
      },
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Accepts an object or a bare string; a string is treated as proxy.url.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff when your proxy is briefly unreachable. Default 2.'
      },
      {
        name: 'timeout',
        href: '/docs/api/parameters/timeout',
        note: 'Maximum request time: 30 seconds on the free plan, 60 seconds on Pro.'
      }
    ],
    outro:
      'If your proxy is flaky, the guide pairs it with retry: 3. For logged-in pages, the proxy only changes the exit IP; the session travels as [forwarded request headers](/docs/api/parameters/headers).'
  },
  why: {
    title: 'Why bring your own proxy to a managed browser',
    intro:
      'You keep the exit you trust and drop the browser fleet around it. The API owns everything between the proxy and the output.',
    cards: [
      {
        kicker: 'Every sub-request',
        title: 'The whole page leaves through your server.',
        body: 'Redirects, images, scripts and the API calls the page makes while rendering all go through the proxy you pass, not only the first document request. Allow-lists and regional rules on the target see one consistent address.',
        note: 'The route shows in the x-fetch-mode response header, whose value ends in -proxy, as described in the [proxy parameter reference](/docs/api/parameters/proxy).'
      },
      {
        kicker: 'One option per call',
        title: 'Switch proxies without relaunching anything.',
        body: 'Each request carries its own proxy.url, so two providers, two countries or a rotated credential are two values, not two browser pools. The same option works on screenshots, PDFs, Markdown, metadata and extraction.',
        note: 'If you do not need a specific provider, you may not need this at all: Pro plans already include a managed proxy, explained in the [rotating proxy alternative](/use-cases/proxy/rotating-proxy-alternative).'
      },
      {
        kicker: 'Credentials stay server-side',
        title: 'A proxy URL is a secret. Treat it like one.',
        body: 'Never put it in client-side code, public HTML or an embed URL. Read it from an environment variable on the server, the same way you handle the API key.',
        note: 'When not to: for a country pin with no provider constraint, [proxy.location](/use-cases/proxy/geo-blocked-websites) is simpler. It is exclusive with proxy.url, so pick one per request.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I use an authenticated proxy with a headless browser API?',
      answer:
        'Pass it as proxy.url in the form https://username:password@hostname:port on a Pro plan. The credentials travel inside the URL, so there is no separate authentication step, and the managed browser routes the whole page through that server.'
    },
    {
      question: 'Do redirects and assets also go through my own proxy?',
      answer:
        'Yes. All sub-requests made while resolving the target URL, including redirects, assets and dynamic fetches, go through the same proxy server.'
    },
    {
      question: 'Can I use my own proxy and pick a country at the same time?',
      answer:
        'Not in one request: proxy.url and proxy.location are exclusive. If you need a specific country from your own provider, use that provider’s country endpoint as the proxy.url.'
    },
    {
      question: 'Why do I get EINVALPROXY or EPROXY with my own proxy?',
      answer:
        'EINVALPROXY means the value could not be parsed as a URL; check the scheme, the port and that special characters in the password are URL-encoded. EPROXY means proxy was sent without a Pro plan, since custom proxies are a [Pro feature](/pricing).'
    },
    {
      question: 'Is it safe to send proxy credentials to a scraping API?',
      answer:
        'Send them only from your server, over the Pro endpoint with your API key, and read them from an environment variable. Never place them in frontend code or in embed URLs anyone can open. For browser apps, keep the call behind your own backend.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to route',
    headlineAccent: 'through your own proxy',
    body: 'Keep the provider you trust, drop the browser fleet. One option per request, on every product.',
    href: '/features/proxy',
    label: 'Use your own proxy'
  },
  howTo: {
    name: 'How to use your own proxy with a headless browser API',
    steps: [
      {
        title: 'Route a request through your proxy',
        description:
          'Store the proxy URL in an environment variable and pass it as proxy.url on the request. Every sub-request of the page goes through that server.'
      },
      {
        title: 'Check the IP the target sees',
        description:
          'Request geolocation.microlink.io with the same proxy and confirm that the IP and country shown belong to your proxy.'
      },
      {
        title: 'Send the same request with curl',
        description:
          'Call pro.microlink.io with url, proxy.url from the environment, meta=false and screenshot=true, authenticating with the x-api-key header.'
      }
    ]
  }
}
