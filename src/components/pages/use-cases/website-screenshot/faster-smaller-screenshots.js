export const CONTENT = {
  slug: 'website-screenshot/faster-smaller-screenshots',
  head: {
    title: 'Faster, smaller website screenshots via API',
    description:
      'Cut response time and file size: skip metadata, pick JPEG quality and pixel density, keep ads blocked and wait for a selector instead of a timer.'
  },
  hero: {
    title: 'Faster, smaller screenshots for high-volume pipelines',
    intro:
      'When you capture thousands of pages, seconds and kilobytes add up. Most of the cost hides in defaults: metadata you do not read, retina density you do not display, timers that wait longer than needed. Each one is a single option away from being switched off.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Default captures do more work than your pipeline needs',
    paragraphs: [
      'Every screenshot request also extracts the page metadata, renders at the device’s native pixel density and waits for the page to settle. Those defaults make sense for a one-off capture and cost time on a batch of ten thousand thumbnails.',
      'Turning off metadata is usually the single biggest speedup. After that, a lower deviceScaleFactor, JPEG with a quality setting and selector-based waits shrink both the response time and the bytes you store and serve.'
    ],
    figure: {
      request: {
        url: 'https://microlink.io',
        params: {
          meta: false,
          embed: 'screenshot.url',
          screenshot: { type: 'jpeg', quality: 60 },
          viewport: { width: 1200, height: 750, deviceScaleFactor: 1 }
        }
      },
      alt: 'A page captured as a compressed JPEG at 1x density',
      width: 1200,
      height: 750,
      caption:
        'Generated live by the API call below: metadata skipped, JPEG at quality 60, 1× density.'
    }
  },
  how: {
    title: 'Six settings that trade fidelity for speed',
    intro:
      'Apply them in this order. Each step is optional and each one is a plain request option.',
    steps: [
      {
        label: '1 · Skip what you do not need',
        sdk: "const { url, size_pretty: size } = await microlink.screenshot(\n  'https://example.com',\n  {\n    meta: false,\n    type: 'jpeg',\n    quality: 60,\n    viewport: { deviceScaleFactor: 1 }\n  }\n)",
        note: 'meta: false skips metadata extraction; JPEG at quality 60 and 1× density cut the file size.'
      },
      {
        label: '2 · Wait for a selector, not a timer',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  meta: false,\n  waitUntil: 'domcontentloaded',\n  waitForSelector: 'h1'\n})",
        note: 'The capture fires as soon as the heading is visible instead of waiting for every resource.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: {
            meta: false,
            screenshot: { type: 'jpeg', quality: 60 },
            viewport: { deviceScaleFactor: 1 }
          }
        },
        note: 'Compare x-response-time headers before and after to measure the gain on your own targets.'
      }
    ],
    params: [
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata detection; x-fetch-mode reports skipped.'
      },
      {
        name: 'screenshot.type',
        href: '/docs/api/parameters/screenshot/type',
        note: 'jpeg for smaller files when transparency is not needed.'
      },
      {
        name: 'screenshot.quality',
        href: '/docs/api/parameters/screenshot/quality',
        note: 'JPEG compression from 0 to 100; 80 by default.'
      },
      {
        name: 'viewport',
        href: '/docs/api/parameters/viewport',
        note: 'deviceScaleFactor: 1 halves the pixel count of a retina capture.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Finish as soon as the element exists instead of a fixed delay.'
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript',
        note: 'false skips script execution for pages that are complete without it.'
      }
    ],
    outro:
      'Keep adblock and animations at their defaults: blocking third-party requests and freezing transitions already make captures faster and more stable.'
  },
  why: {
    title: 'Why these settings matter at volume',
    intro:
      'Each option removes work the browser or the network would otherwise do on every single request.',
    cards: [
      {
        kicker: 'Metadata off',
        title: 'The largest single speedup for screenshot-only jobs.',
        body: 'Metadata detection parses the page, resolves images and checks links. If you only need the picture, meta: false skips all of it and the response header confirms it with x-fetch-mode: skipped.',
        note: 'This applies to [PDF generation](/pdf) too; any request that only needs one output benefits.'
      },
      {
        kicker: 'Fewer pixels',
        title: 'Density and format decide the bytes you store.',
        body: 'A 2× capture has four times the pixels of a 1× capture. JPEG at quality 60 is a fraction of a lossless PNG. Thumbnails and previews rarely need either extreme.',
        note: 'The CDN may still serve an optimized format such as WebP to compatible browsers, so the stored asset and the delivered asset can differ.'
      },
      {
        kicker: 'Wait for a condition',
        title: 'Selector waits finish early; timers finish late.',
        body: 'A selector wait returns the moment the element appears. Combined with domcontentloaded it skips fonts, images and third-party scripts that do not change the content you capture.',
        note: 'When not to: pixel-perfect design reviews and visual regression need 2× density and PNG; save the speed settings for previews, thumbnails and monitoring.'
      }
    ]
  },
  faq: [
    {
      question: 'What is the single biggest speedup for screenshots?',
      answer:
        'Setting meta to false. Metadata extraction is the most expensive step that a screenshot-only request does not need, and skipping it is reflected in the x-fetch-mode: skipped response header.'
    },
    {
      question: 'How much smaller is JPEG than PNG?',
      answer:
        'It depends on the page, but photographic and colorful pages compress several times better as JPEG at quality 60 to 80. PNG stays lossless and keeps transparency, which JPEG cannot.'
    },
    {
      question: 'Does a cached screenshot still take time to generate?',
      answer:
        'No. A cache hit is served from the edge in milliseconds. Speed settings matter for the first capture of each URL and for pipelines with many unique URLs.'
    },
    {
      question: 'Is there an option to prioritize speed automatically?',
      answer:
        'The SDK exposes optimizeForSpeed on the screenshot method, which prioritizes capture speed over image size and fidelity. The explicit settings above give you finer control over the trade-off.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'leaner screenshots',
    body: 'Skip the work you do not need and capture faster on every plan. Start on the free tier and measure the difference on your own pages.',
    href: '/screenshot',
    label: 'Speed up your screenshots'
  }
}
