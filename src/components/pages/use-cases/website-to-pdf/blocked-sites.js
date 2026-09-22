export const CONTENT = {
  slug: 'website-to-pdf/blocked-sites',
  head: {
    title: 'Save bot-protected pages as PDF with a built-in proxy',
    description:
      'Save a Cloudflare-protected page as PDF instead of a challenge screen. On Pro plans the proxy is automatic, so the PDF request needs no extra option.'
  },
  hero: {
    title: 'Print bot-protected pages to PDF, not the challenge screen',
    intro:
      'Making a PDF of a Cloudflare-protected page fails in the quietest possible way: the file is generated, it opens, and it contains a one-page “Just a moment” screen. Compliance archives, legal evidence, competitor research and report generators all need the actual page on paper. With a Pro key, the [PDF API](/pdf) reaches the page through its built-in proxy before it prints, with nothing extra in the request.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A PDF of a blocked page is a PDF of the bot wall',
    paragraphs: [
      'Antibot services such as Cloudflare, DataDome and Akamai answer datacenter traffic with a challenge or a 403. A headless browser printing to PDF does not know the difference, so it prints whatever it received. The job reports a valid file, the file lands in the archive, and nobody notices until someone opens it months later looking for the original.',
      'Fixing it yourself means putting a proxy between your print server and the web: buying exits, deciding which sites need residential ones, relaunching Chrome with the right flags, and adding a check that the output is not a challenge page. Printing already needs a full browser; stacking proxy management on top turns one job into two systems that fail in different ways.',
      'On Pro plans the PDF request is unblocked automatically. When a page answers with a 403 antibot wall, the API escalates through its [proxy tiers](/docs/api/parameters/proxy), ending with residential IPs, and remembers per domain which tier worked. The page is then rendered with its print stylesheet, [adblock](/features/adblock) removes the consent banners, and the result is a hosted PDF of the real content.'
    ]
  },
  how: {
    title: 'How to save a bot-protected page as PDF',
    intro:
      'Send the same PDF request you would send for any page, with a Pro key. The [PDF troubleshooting guide](/docs/guides/pdf/troubleshooting) covers blocked sites next to layout and timing issues.',
    steps: [
      {
        label: '1 · Print the protected page',
        sdk: `const { url, size_pretty: size } = await microlink.pdf(
  'https://news.example.com/2026/report',
  { format: 'A4', margin: '1cm', retry: 3 }
)`,
        note: 'No proxy option: the Pro key is enough. The response is the hosted PDF with its url and size, printed from the real page; retry: 3 absorbs intermittent challenges.'
      },
      {
        label: '2 · Record the route with the file',
        sdk: `const mode = microlink.last.response.headers.get('x-fetch-mode')

const record = {
  source: 'https://news.example.com/2026/report',
  pdf: url,
  viaProxy: mode.endsWith('-proxy'),
  savedAt: new Date().toISOString()
}`,
        note: 'x-fetch-mode ends in -proxy, for example prerender-proxy, when the page was reached through the proxy. Storing it with the file tells you later which archived PDFs came from protected sites.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://news.example.com/2026/report',
          params: {
            pdf: { format: 'A4', margin: '1cm' },
            meta: false,
            retry: 3
          },
          pro: true
        },
        note: 'The Pro endpoint with your x-api-key header prints through the proxy when the site requires it. Keep the call server-side: an API key never belongs in a public PDF link.'
      }
    ],
    params: [
      {
        name: 'pdf.format',
        href: '/docs/api/parameters/pdf/format',
        note: 'Paper size such as A4 (the default) or Letter.'
      },
      {
        name: 'pdf.margin',
        href: '/docs/api/parameters/pdf/margin',
        note: 'Whitespace around the content. Default 0.35cm.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff. Default 2.'
      },
      {
        name: 'timeout',
        href: '/docs/api/parameters/timeout',
        note: '60 seconds on Pro by default. Leave it there: the residential route is the slowest.'
      },
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'Optional. Prints the page as seen from a given country. Default us. Pro plans.'
      }
    ],
    outro:
      'Store the file yourself once it is generated, as the [article archiving recipe](/use-cases/website-to-pdf/archive-articles) shows; the hosted URL is for delivery, not retention. For a quick one-off without code, the [website to PDF tool](/tools/website-to-pdf) prints any public URL.'
  },
  why: {
    title: 'Why the PDF API should handle the proxy, not your print server',
    intro:
      'A PDF is a record. If it records the bot wall, the archive is wrong in a way no one sees. One request that owns the route and the print removes that failure mode.',
    cards: [
      {
        kicker: 'No extra option',
        title: 'The same PDF request, now unblocked.',
        body: 'On Pro plans automatic proxy resolution is on by default. Your existing format, margin, styles and page range options stay exactly as they are; the proxy only changes how the page is reached.',
        note: 'The same mechanism unblocks [screenshots of bot-protected websites](/use-cases/website-screenshot/built-in-proxy) and [Markdown from blocked pages](/use-cases/website-to-markdown/blocked-sites).'
      },
      {
        kicker: 'Residential when needed',
        title: 'Escalation, then memory per domain.',
        body: 'A 403 antibot wall triggers the proxy tiers, ending with residential IPs, the slowest route and the one that usually gets through. The tier that worked is cached for the domain, so a batch of PDFs from one site does not repeat the search.',
        note: 'The route is tested against the 500 most popular websites; see how it works on the [proxy feature page](/features/proxy).'
      },
      {
        kicker: 'A clear failure',
        title: 'EPROXYNEEDED instead of a useless file.',
        body: 'On the free endpoint, a protected page fails with EPROXYNEEDED rather than producing a PDF of the challenge. You never archive a bot wall by accident; you get an error you can act on.',
        note: 'When not to: pages behind a login or a paywall are not bot walls. Forward your own session as described in the [PDF private pages guide](/docs/guides/pdf/private-pages), and only print content you are permitted to keep.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I save a Cloudflare-protected page as PDF?',
      answer:
        'Send the PDF request to the Pro endpoint with your API key. Automatic proxy resolution handles the Cloudflare wall before the page is printed, so the request is the same as for any other URL.'
    },
    {
      question: 'Why is my PDF a one-page “Just a moment” screen?',
      answer:
        'The site served its antibot challenge instead of the page, and the browser printed what it received. Through the API on a Pro plan, that 403 triggers the proxy escalation, and the PDF is printed from the real page.'
    },
    {
      question: 'Do I need to add a proxy option to PDF requests?',
      answer:
        'No. On Pro plans the proxy is automatic. Pass [proxy.location](/docs/api/parameters/proxy/location) only when you want the PDF as seen from a specific country, or proxy.url when you must use your own proxy server.'
    },
    {
      question: 'Does printing a blocked page to PDF take longer?',
      answer:
        'It can. The residential tier is the slowest route, so the first PDF from a protected domain may take longer than a direct one. Later requests to that domain go straight to the tier that worked, and cached PDFs return without any fetch.'
    },
    {
      question: 'Does the PDF proxy get past logins or paywalls?',
      answer:
        'No. It gets past blocks aimed at automated traffic, not access controls. Authenticated pages need your own session forwarded as request headers, and only where you are allowed to print that content.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to print',
    headlineAccent: 'the pages that block bots',
    body: 'Same PDF request, real page, no proxy list. Get a Pro key and stop archiving challenge screens.',
    href: '/pdf',
    label: 'Print protected pages'
  },
  howTo: {
    name: 'How to save a bot-protected page as PDF',
    steps: [
      {
        title: 'Print the protected page',
        description:
          'Call the PDF method with format, margin and a retry of 3 using a Pro API key. No proxy option is needed; the page is reached through the proxy when it is protected.'
      },
      {
        title: 'Record the route with the file',
        description:
          'Read the x-fetch-mode header of the last response and store whether it ends in -proxy next to the PDF URL and the source.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Send url, pdf.format, pdf.margin, meta=false and retry=3 to pro.microlink.io with the x-api-key header.'
      }
    ]
  }
}
