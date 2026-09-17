export const CONTENT = {
  slug: 'website-screenshot/open-graph-images',
  head: {
    title: 'Dynamic Open Graph images from URL screenshots',
    description:
      'Point og:image at a Screenshot API URL and every share on X, Slack or LinkedIn gets a fresh, cached screenshot of the page. No image service to run.'
  },
  hero: {
    title: 'Generate Open Graph images from a screenshot of the page',
    intro:
      'Every page needs a social preview image, and designing one per page does not scale. With the embed option the Screenshot API URL itself behaves like an image, so og:image can point straight at a live capture of the page, framed and cached.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Static social images go stale, custom renderers are work',
    paragraphs: [
      'A single default banner makes every share look the same. A custom OG image service means templates, fonts, a renderer and a cache to maintain. Meanwhile the page itself already looks the way you want it to be shared.',
      'The embed parameter returns the screenshot as the response body with the right content type. Drop the API URL into og:image and twitter:image, and crawlers receive an up-to-date PNG of the page, served from the cache after the first request.'
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
        'Generated live by the API call below: a 1200×630 viewport, the size social cards expect.'
    }
  },
  how: {
    title: 'Make the API URL the image',
    intro:
      'Set the viewport to the social card size, ask for the image directly with embed, and cache it for a day. Then reference the URL in your meta tags.',
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
        note: 'embed=screenshot.url returns the PNG itself instead of JSON, at the 1200×630 size social networks expect.'
      },
      {
        label: '2 · Reference it in the page head',
        code: '<meta property="og:image" content="https://api.microlink.io/?url=https%3A%2F%2Fyour-site.com%2Fblog%2Fpost&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=630" />\n<meta name="twitter:image" content="https://api.microlink.io/?url=https%3A%2F%2Fyour-site.com%2Fblog%2Fpost&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=630" />',
        language: 'html',
        note: 'Crawlers fetch the API URL like any image; the first fetch renders the page, the following ones hit the cache.'
      },
      {
        label: '3 · Add a frame and a longer cache',
        sdk: "const { url } = await microlink.screenshot('https://your-site.com/blog/post', {\n  viewport: { width: 1200, height: 630 },\n  overlay: { browser: 'dark', background: '#0473e4' },\n  ttl: '7d',\n  staleTtl: 0\n})",
        note: 'overlay composes a browser frame and a background; ttl and staleTtl keep the card cached for a week on a Pro key.'
      }
    ],
    params: [
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Return one field of the response as the body: screenshot.url returns the image.'
      },
      {
        name: 'viewport',
        href: '/docs/api/parameters/viewport',
        note: '1200×630 is the common social card size; set deviceScaleFactor to 2 for a sharper image.'
      },
      {
        name: 'screenshot.overlay',
        href: '/docs/api/parameters/screenshot/overlay',
        note: 'Browser window frame (light or dark) over a color, gradient or image background.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache the card up to 31 days on Pro plans; 24 hours by default.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serve the cached card instantly and refresh it in the background.'
      }
    ],
    outro:
      'Keep API keys out of public og:image URLs. On the free endpoint no key is needed; on Pro, proxy the request through your own domain so the key stays server-side.'
  },
  why: {
    title: 'Why a live screenshot makes a good social card',
    intro:
      'The page is the most accurate preview of itself, and the API already caches and serves images at the edge.',
    cards: [
      {
        kicker: 'Always current',
        title: 'The card updates when the page does.',
        body: 'Change a headline or a hero and the next cache refresh updates the preview. No redeploy, no regenerate step, no stale banner from last year.',
        note: 'During [traffic spikes](/use-cases/website-screenshot/traffic-spikes) the same cache absorbs the crawler storm that follows a viral share.'
      },
      {
        kicker: 'Framed on demand',
        title: 'overlay turns a raw capture into a designed card.',
        body: 'A browser frame over a brand color or gradient reads as intentional on X, Slack and LinkedIn, and it takes one option instead of a template engine.',
        note: 'Pick the light or dark frame to match the page theme; the background accepts hex, rgba, gradients or an image URL.'
      },
      {
        kicker: 'Served like an image',
        title: 'The URL works anywhere an image does.',
        body: 'Meta tags, README badges, CMS fields, email templates: anything that can load an image URL can load the API URL. Strict content security headers keep the response a plain image.',
        note: 'When not to: if the card needs text that is not on the page, such as an author or a series name, render a dedicated card and use the screenshot only as its backdrop.'
      }
    ]
  },
  faq: [
    {
      question: 'Do social networks accept an API URL as og:image?',
      answer:
        'Yes. Crawlers request the URL and receive a PNG with an image content type. Make sure the URL is absolute and publicly reachable, and give the first crawl a moment to render.'
    },
    {
      question: 'What size should the screenshot be?',
      answer:
        'Set the viewport to 1200×630 for the standard 1.91:1 card. Add deviceScaleFactor: 2 for a 2400×1260 image when you want it crisp on high-density screens.'
    },
    {
      question: 'How do I avoid exposing my API key in the meta tag?',
      answer: [
        'On the free endpoint no key is needed. On Pro, do not put the key in the URL: proxy the request through your own server or edge function with @microlink/proxy or @microlink/edge-proxy, and reference your own domain in og:image.',
        'The [authentication docs](/docs/api/basics/authentication) explain both setups.'
      ]
    },
    {
      question: 'Can the card include a cookie banner or ads?',
      answer:
        'Not by default. adblock is enabled and removes ads, trackers and third-party consent popups. For a first-party banner, add a click or a styles rule to the same URL.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to ship',
    headlineAccent: 'live social cards',
    body: 'One URL per page, cached and framed. Start on the free tier and point your og:image at a real screenshot today.',
    href: '/screenshot',
    label: 'Generate your first OG image'
  }
}
