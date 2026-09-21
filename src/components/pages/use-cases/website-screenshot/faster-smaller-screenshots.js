export const CONTENT = {
  slug: 'website-screenshot/faster-smaller-screenshots',
  head: {
    title: 'Faster screenshot API responses and smaller image files',
    description:
      'Cut screenshot response time and file size: skip metadata, pick JPEG quality and pixel density, keep ads blocked and wait for a selector, not a timer.'
  },
  hero: {
    title: 'Get faster screenshot API responses and smaller files at volume',
    intro:
      'A fast screenshot API call is mostly a matter of not doing work you will throw away. When you capture thousands of pages for thumbnails, link previews, monitoring or a search index, seconds and kilobytes add up, and most of the cost hides in defaults: metadata you do not read, retina density you do not display, timers that wait longer than needed. Each one is a single [Screenshot API](/screenshot) option away from being switched off.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Default screenshots do more work than a high-volume pipeline needs',
    paragraphs: [
      'Every screenshot request also extracts the page metadata, renders at the device’s native pixel density and waits for the page to settle. Those defaults make sense for a one-off capture and cost time on a batch of ten thousand thumbnails.',
      'The usual reaction is to optimize after the fact: download the PNG, resize it, recompress it and upload it again. That doubles the storage traffic, adds an image pipeline to maintain and does nothing for the response time, because the browser already rendered every pixel you later threw away.',
      'Turning off metadata with [meta: false](/docs/api/parameters/meta) is usually the single biggest speedup. After that, a lower deviceScaleFactor, JPEG with a [quality setting](/docs/api/parameters/screenshot/quality) and selector-based waits shrink both the response time and the bytes you store and serve.'
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
    title: 'How to make screenshot API calls faster and images smaller',
    intro:
      'Apply the settings in this order. Each one is optional and each one is a plain request option, listed with the rest in the [screenshot caching and performance guide](/docs/guides/screenshot/caching-and-performance).',
    steps: [
      {
        label: '1 · Skip what you do not need',
        sdk: "const { url, size_pretty: size } = await microlink.screenshot(\n  'https://example.com',\n  {\n    meta: false,\n    type: 'jpeg',\n    quality: 60,\n    viewport: { deviceScaleFactor: 1 }\n  }\n)",
        note: 'meta: false skips metadata extraction, JPEG at quality 60 compresses harder than the default of 80, and deviceScaleFactor: 1 renders one device pixel per CSS pixel. size_pretty in the response shows the resulting file size.'
      },
      {
        label: '2 · Wait for a selector, not a timer',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  meta: false,\n  waitUntil: 'domcontentloaded',\n  waitForSelector: 'h1'\n})",
        note: 'The capture fires as soon as the heading is in the page instead of waiting for every image and third-party script. [Screenshots of JavaScript-rendered pages](/use-cases/website-screenshot/dynamic-content) covers the full set of wait options.'
      },
      {
        label: '3 · Skip JavaScript on static pages',
        sdk: "const { url } = await microlink.screenshot('https://example.com/docs', {\n  meta: false,\n  javascript: false\n})",
        note: 'javascript: false disables script execution in the browser page. Use it for server-rendered pages that are complete without it, and leave it on for client-rendered apps.'
      },
      {
        label: '4 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: {
            meta: false,
            screenshot: { type: 'jpeg', quality: 60 },
            viewport: { deviceScaleFactor: 1 }
          }
        },
        note: 'The request runs on the free endpoint. Compare the x-response-time header before and after to measure the gain on your own targets, and look for x-fetch-mode: skipped to confirm metadata was bypassed.'
      }
    ],
    params: [
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata detection and x-fetch-mode reports skipped. Default true.'
      },
      {
        name: 'screenshot.type',
        href: '/docs/api/parameters/screenshot/type',
        note: 'png (default) or jpeg. JPEG gives smaller files when transparency is not needed.'
      },
      {
        name: 'screenshot.quality',
        href: '/docs/api/parameters/screenshot/quality',
        note: 'JPEG compression from 0 to 100; 80 by default. Ignored for PNG output.'
      },
      {
        name: 'viewport',
        href: '/docs/api/parameters/viewport',
        note: 'deviceScaleFactor: 1 renders a quarter of the pixels of a 2x capture. Partial values merge with the device defaults.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Finishes as soon as the element exists instead of a fixed delay.'
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript',
        note: 'false skips script execution for pages that are complete without it. Default true.'
      }
    ],
    outro:
      'Keep [adblock](/docs/api/parameters/adblock) and animations at their defaults: blocking third-party requests and disabling transitions already make captures faster and more stable. Avoid fullPage when a viewport or an element capture is enough.'
  },
  why: {
    title: 'Why these screenshot speed settings matter at volume',
    intro:
      'Each option removes work the browser or the network would otherwise do on every single request.',
    cards: [
      {
        kicker: 'Metadata off',
        title: 'The largest single speedup for screenshot-only jobs.',
        body: 'Metadata detection is a full extraction step that runs next to the capture. If you only need the picture, meta: false skips all of it, and the response header confirms it with x-fetch-mode: skipped.',
        note: 'When you do need some metadata next to the image, [fetch only the metadata fields you need](/use-cases/website-metadata/only-the-fields-you-need) instead of all of them.'
      },
      {
        kicker: 'Fewer pixels',
        title: 'Density and format decide the bytes you store.',
        body: 'A 2× capture has four times the pixels of a 1× capture, and JPEG at quality 60 is a fraction of a lossless PNG on photographic pages. Thumbnails and previews rarely need either extreme.',
        note: 'The CDN may still serve an optimized format such as WebP to compatible browsers, so the stored asset and the delivered asset can differ. Cropping to [a single element](/use-cases/website-screenshot/capture-element) is the other way to cut pixels.'
      },
      {
        kicker: 'Wait for a condition',
        title: 'Selector waits finish early; timers finish late.',
        body: 'A selector wait returns the moment the element appears. Combined with domcontentloaded it skips fonts, images and third-party scripts that do not change the content you capture.',
        note: 'When not to: pixel-perfect design reviews and visual regression need 2× density and PNG. Save the speed settings for previews, thumbnails and monitoring.'
      }
    ]
  },
  faq: [
    {
      question: 'What is the biggest speedup for screenshot API requests?',
      answer:
        'Setting meta to false. Metadata extraction is the most expensive step that a screenshot-only request does not need, and skipping it is reflected in the x-fetch-mode: skipped response header.'
    },
    {
      question: 'How do I reduce screenshot file size with JPEG quality?',
      answer:
        'Set screenshot.type to jpeg and lower screenshot.quality from its default of 80. It depends on the page, but photographic and colorful pages compress several times better as JPEG at quality 60 to 80. PNG stays lossless and keeps transparency, which JPEG cannot.'
    },
    {
      question: 'Does a cached screenshot still take time to generate?',
      answer:
        'No. A cache hit is served from the edge without launching a browser, and it does not count against your quota. Speed settings matter for the first capture of each URL and for pipelines with many unique URLs, while [ttl](/docs/api/parameters/ttl) decides how long the rest stay cached.'
    },
    {
      question: 'Is there a screenshot option that prioritizes speed automatically?',
      answer:
        'The SDK exposes optimizeForSpeed on the [screenshot method](/docs/sdk/methods/screenshot), which prioritizes capture speed over image size and fidelity and is off by default. The explicit settings above give you finer control over the trade-off.'
    },
    {
      question: 'Does a lower deviceScaleFactor make screenshots blurry?',
      answer:
        'At deviceScaleFactor 1 the image has one pixel per CSS pixel, which looks sharp on standard displays and slightly soft on high-density screens at full size. For thumbnails and previews displayed smaller than the viewport, the difference is not visible and the file is much lighter.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'leaner screenshots',
    body: 'Skip the work you do not need and capture faster on every plan. Start on the free tier and measure the difference on your own pages.',
    href: '/screenshot',
    label: 'Speed up your screenshots'
  },
  howTo: {
    name: 'How to make website screenshots faster and smaller',
    steps: [
      {
        title: 'Skip what you do not need',
        description:
          'Set meta to false, request JPEG with a quality around 60 and set viewport.deviceScaleFactor to 1 to cut both the response time and the file size.'
      },
      {
        title: 'Wait for a selector, not a timer',
        description:
          'Navigate with waitUntil set to domcontentloaded and add waitForSelector, so the capture fires as soon as the content exists.'
      },
      {
        title: 'Skip JavaScript on static pages',
        description:
          'Set javascript to false for server-rendered pages that are complete without client-side scripts.'
      },
      {
        title: 'Measure the gain',
        description:
          'Call the same request as a URL and compare the x-response-time header before and after. x-fetch-mode: skipped confirms metadata was bypassed.'
      }
    ]
  }
}
