export const CONTENT = {
  slug: 'website-screenshot/open-graph-images',
  head: {
    title: 'Dynamic Open Graph images from a page screenshot',
    description:
      'Point og:image at a Screenshot API URL and every share on X, Slack or LinkedIn shows a current, cached capture of the page. No image service to run.'
  },
  hero: {
    title: 'Generate dynamic Open Graph images from a screenshot of the page',
    intro:
      'A dynamic Open Graph image does not need a template engine when the page already looks the way you want it shared. With the embed option the Screenshot API URL behaves like an image file, so og:image can point straight at a live capture. Blogs, docs sites, changelogs, directories and user-generated pages get a unique social card per URL without designing a single one.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Static og:image files go stale and custom renderers are work',
    paragraphs: [
      'One default banner makes every share of your site look the same, and links with a generic preview get scrolled past. A hand-made image per page fixes that for ten pages, not for ten thousand, and it is out of date the day someone edits the headline.',
      'The usual answer is an OG image service: HTML templates, bundled fonts, a renderer on a serverless function and a cache in front of it. That is a second front end to design, deploy and keep in sync with the first one. Meanwhile the page itself is already rendered, styled and current.',
      'The [embed](/docs/api/parameters/embed) parameter returns one field of the response as the body, with the headers of the original resource. Set it to screenshot.url and the API URL is the PNG. Drop that URL into og:image and twitter:image and crawlers receive a capture of the page, rendered on the first request and served from the cache after that. The [delivery and embedding guide](/docs/guides/screenshot/embedding) shows the same URL in HTML, CSS and Markdown.'
    ],
    figure: {
      request: {
        url: 'https://microlink.io/blog/edge-cdn',
        params: {
          screenshot: true,
          meta: false,
          embed: 'screenshot.url',
          viewport: { width: 1200, height: 630, deviceScaleFactor: 1 }
        }
      },
      alt: 'A blog post captured at the 1200 by 630 Open Graph size',
      width: 1200,
      height: 630,
      caption:
        'Generated live by the API call below: a 1200×630 viewport, the common size for social cards.'
    }
  },
  how: {
    title: 'How to generate an og:image from a screenshot URL',
    intro:
      'Set the viewport to the social card size, ask for the image directly with embed, and reference the resulting URL in your meta tags. The default cache keeps the card for 24 hours.',
    steps: [
      {
        label: '1 · Build the image URL',
        request: {
          url: 'https://your-site.com/blog/post',
          params: {
            screenshot: true,
            meta: false,
            embed: 'screenshot.url',
            viewport: { width: 1200, height: 630 }
          }
        },
        note: 'embed=screenshot.url makes the response the PNG itself instead of JSON, captured at 1200×630. meta=false skips metadata detection, so the first render is faster.'
      },
      {
        label: '2 · Reference it in the page head',
        code: '<meta property="og:image" content="https://api.microlink.io/?url=https%3A%2F%2Fyour-site.com%2Fblog%2Fpost&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=630" />\n<meta name="twitter:image" content="https://api.microlink.io/?url=https%3A%2F%2Fyour-site.com%2Fblog%2Fpost&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=630" />',
        language: 'html',
        note: 'Crawlers fetch the API URL like any image. URL-encode the target, and check the result with the [sharing debugger](/tools/sharing-debugger) before you ship.'
      },
      {
        label: '3 · Add a frame and a longer cache',
        sdk: "const { url } = await microlink.screenshot('https://your-site.com/blog/post', {\n  viewport: { width: 1200, height: 630 },\n  overlay: { browser: 'dark', background: '#0473e4' },\n  ttl: '7d',\n  staleTtl: 0\n})",
        note: 'overlay composes a browser frame over a background, as in the [browser frame recipe](/use-cases/website-screenshot/browser-frame). ttl and staleTtl need a Pro key, so run this from your backend or send the same options through your own proxy.'
      }
    ],
    params: [
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Returns one field of the response as the body. screenshot.url returns the image.'
      },
      {
        name: 'viewport',
        href: '/docs/api/parameters/viewport',
        note: '1200×630 is the common social card size. Set deviceScaleFactor to 2 for a sharper image.'
      },
      {
        name: 'screenshot.overlay',
        href: '/docs/api/parameters/screenshot/overlay',
        note: 'Browser window frame, light or dark, over a color, gradient or image background.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache lifetime from 1 minute to 31 days. Defaults to 24 hours. Pro plans.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serves the cached card instantly and refreshes it in the background. Pro plans.'
      }
    ],
    outro:
      'Keep API keys out of public og:image URLs. The free endpoint needs no key and allows 25 requests per day, which suits a small site because cache hits do not count. For production, put the request behind your own domain as described in the [authentication docs](/docs/api/basics/authentication).'
  },
  why: {
    title: 'Why a live screenshot works as a social preview image',
    intro:
      'The page is the most accurate preview of itself, and a social preview image API that already caches and serves images at the edge removes the rest of the stack.',
    cards: [
      {
        kicker: 'Always current',
        title: 'The card updates when the page does.',
        body: 'Change a headline or a hero and the next cache refresh updates the preview. There is no redeploy, no regenerate step and no stale banner from last year. With staleTtl the cached card is served instantly while a fresh one renders in the background.',
        note: 'After a viral share, crawlers and unfurlers request the same URL over and over. The cache absorbs that burst, as the [traffic spikes recipe](/use-cases/website-screenshot/traffic-spikes) explains, and with a [configurable TTL](/features/ttl) those cache hits do not count against your quota.'
      },
      {
        kicker: 'Framed on demand',
        title: 'overlay turns a raw capture into a designed card.',
        body: 'A browser frame over a brand color or a gradient reads as intentional on X, Slack and LinkedIn. It takes one option instead of a template engine, and it follows the page through every redesign.',
        note: 'Pick the light or dark frame to match the page theme. The background accepts hex, rgb or rgba colors, CSS gradients or an image URL.'
      },
      {
        kicker: 'Served like an image',
        title: 'The URL works anywhere an image does.',
        body: 'Meta tags, README files, CMS fields, email templates: anything that can load an image URL can load the API URL. Embedded assets are served with a strict Content-Security-Policy and nosniff headers, so the response stays a plain image.',
        note: 'When not to: if the card needs text that is not on the page, such as an author or a series name, render a dedicated card and use the screenshot only as its backdrop. If the page has no og:image at all and you cannot edit it, [override the metadata](/use-cases/website-metadata/missing-or-wrong-metadata) on the consuming side instead.'
      }
    ]
  },
  faq: [
    {
      question: 'Do social networks accept a screenshot API URL as og:image?',
      answer:
        'Yes. Crawlers request the URL and receive a PNG with an image content type, because embed mimics the headers of the original resource. Make sure the URL is absolute, URL-encoded and publicly reachable, and give the first crawl a moment to render.'
    },
    {
      question: 'What size should an Open Graph screenshot be?',
      answer:
        'Set the viewport to 1200×630 for the standard 1.91:1 card. Add deviceScaleFactor: 2 for a 2400×1260 image when you want it crisp on high-density screens, at the cost of a larger file.'
    },
    {
      question: 'How often does a dynamic Open Graph image screenshot refresh?',
      answer:
        'Every 24 hours by default, when the cached copy expires. On Pro plans ttl sets the lifetime from 1 minute to 31 days and staleTtl refreshes in the background while serving the cached card. The [caching guide](/docs/guides/screenshot/caching-and-performance) has the recommended production setup.'
    },
    {
      question: 'How do I keep my API key out of the og:image screenshot URL?',
      answer: [
        'On the free endpoint no key is needed. On Pro, do not put the key in the URL: route the request through your own server or edge function with @microlink/proxy or @microlink/edge-proxy, and reference your own domain in og:image.',
        'The proxy only lets an allowed list of domains consume your quota, so the key never reaches the page source.'
      ]
    },
    {
      question: 'Will the Open Graph screenshot include cookie banners or ads?',
      answer:
        'Not by default. adblock is enabled and blocks ads, trackers and third-party consent popups. For a first-party banner, add a click or a styles rule to the same URL, as in the [cookie banner recipe](/use-cases/website-screenshot/block-cookie-banners-and-ads).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to ship',
    headlineAccent: 'live social cards',
    body: 'One URL per page, cached and framed. Start on the free endpoint and point your og:image at a real screenshot today.',
    href: '/screenshot',
    label: 'Generate your first OG image'
  },
  howTo: {
    name: 'How to generate dynamic Open Graph images from a screenshot',
    steps: [
      {
        title: 'Build the image URL',
        description:
          'Request a screenshot of the page with a 1200 by 630 viewport, meta=false and embed=screenshot.url so the API URL returns the image itself.'
      },
      {
        title: 'Reference it in the page head',
        description:
          'Use the URL-encoded API URL as the content of the og:image and twitter:image meta tags.'
      },
      {
        title: 'Add a frame and a longer cache',
        description:
          'Add screenshot.overlay for a browser frame and, on a Pro plan, ttl and staleTtl to keep the card cached and refreshed in the background.'
      }
    ]
  }
}
