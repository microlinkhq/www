export const CONTENT = {
  slug: 'website-screenshot/browser-frame',
  head: {
    title: 'Screenshots with a browser frame mockup from any URL',
    description:
      'Wrap any website capture in a light or dark browser window over a color, a gradient or an image. One option turns a URL into a presentation-ready mockup.'
  },
  hero: {
    title: 'Wrap a website screenshot in a browser frame, ready to share',
    intro:
      'A screenshot with a browser frame reads as a finished asset: window chrome, breathing room and a background in your brand color. Designers build that browser window mockup by hand for every launch post, changelog entry, pitch deck and docs page. The screenshot.overlay option does the composition inside the Screenshot API, so the framed image comes straight from a URL.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A raw website screenshot needs a design pass before it ships',
    paragraphs: [
      'Edge-to-edge captures have no context: no window chrome, no margin, no brand color behind them. Dropped into a slide or a blog post they look like a debugging artifact, so every marketing asset takes a detour through a design tool for the same five-minute edit.',
      'That manual step is exactly what automation skips. A changelog that publishes itself, a directory with thousands of listings or a release email built in CI cannot wait for someone to open a mockup template. Compositing the frame yourself means an image library, a window asset in two themes and code to scale them to every viewport.',
      'With [screenshot.overlay](/docs/api/parameters/screenshot/overlay) the API wraps the capture in a browser window, light or dark, and places it over a background you choose: a hex, rgb or rgba color, a CSS gradient or an image URL. The result is one hosted image. The [customizing output guide](/docs/guides/screenshot/customizing-output) shows the overlay next to the other output options.'
    ],
    figure: {
      request: {
        url: 'https://microlink.io',
        params: {
          meta: false,
          embed: 'screenshot.url',
          screenshot: {
            overlay: {
              browser: 'dark',
              background:
                'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)'
            }
          },
          viewport: { width: 1200, height: 750, deviceScaleFactor: 1 }
        }
      },
      alt: 'A website capture composed inside a dark browser frame over a gradient',
      width: 1200,
      height: 750,
      fit: 'contain',
      caption:
        'Generated live by the API call below with a dark browser frame over a gradient background.'
    }
  },
  how: {
    title: 'How to add a browser frame to a website screenshot',
    intro:
      'Two properties control the composition: browser picks the window theme and background fills the space around it. They combine with a viewport, a device or the JPEG options like any other capture.',
    steps: [
      {
        label: '1 · Dark frame over a gradient',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  overlay: {\n    browser: 'dark',\n    background: 'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)'\n  }\n})",
        note: 'browser accepts light or dark, and background takes a color, a CSS gradient or an image URL. The response carries the hosted URL of the composed image.'
      },
      {
        label: '2 · Light frame over a brand color as JPEG',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  overlay: { browser: 'light', background: '#0473e4' },\n  type: 'jpeg',\n  quality: 80\n})",
        note: 'Switch to JPEG with [quality](/docs/api/parameters/screenshot/quality) when the asset goes on a web page and file size matters. Quality runs from 0 to 100 and defaults to 80.'
      },
      {
        label: '3 · Frame a mobile capture',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  device: 'iPhone 15 Pro',\n  overlay: { browser: 'dark', background: '#0473e4' }\n})",
        note: 'Every capture option runs before the frame is added, so a device preset produces a framed phone-sized capture.'
      },
      {
        label: '4 · The same request as an image URL',
        request: {
          url: 'https://example.com',
          params: {
            meta: false,
            embed: 'screenshot.url',
            screenshot: { overlay: { browser: 'dark', background: '#0473e4' } }
          }
        },
        note: 'Nested options flatten to screenshot.overlay.browser and screenshot.overlay.background. With [embed](/docs/api/parameters/embed) the URL returns the image itself, ready for an img tag or a Markdown file.'
      }
    ],
    params: [
      {
        name: 'screenshot.overlay',
        href: '/docs/api/parameters/screenshot/overlay',
        note: 'browser: light or dark. background: hex, rgb or rgba color, CSS gradient or image URL.'
      },
      {
        name: 'screenshot.type',
        href: '/docs/api/parameters/screenshot/type',
        note: 'Image format of the composed asset: png (default) or jpeg.'
      },
      {
        name: 'screenshot.quality',
        href: '/docs/api/parameters/screenshot/quality',
        note: 'JPEG compression from 0 to 100, default 80. Ignored for PNG.'
      },
      {
        name: 'device',
        href: '/docs/api/parameters/device',
        note: 'Frames a phone or tablet capture for app and responsive showcases.'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Returns the composed image as the response body instead of JSON.'
      }
    ],
    outro:
      'A malformed background, such as a gradient with missing color stops, is rejected with the EINVALOVERLAYBG [error code](/docs/api/basics/error-codes). A typo fails fast instead of producing a broken asset.'
  },
  why: {
    title: 'Why compose the browser mockup inside the API',
    intro:
      'The frame is the difference between a debug artifact and a marketing asset. Doing it server-side turns a website screenshot browser mockup into something a build step can produce.',
    cards: [
      {
        kicker: 'One request, one asset',
        title: 'No design tool in the loop.',
        body: 'Changelogs, launch posts, product tours and documentation can generate their framed screenshots at build time or on demand, with the same options every time. The output is a hosted image, cached for 24 hours by default.',
        note: 'The same URL powers [dynamic Open Graph images](/use-cases/website-screenshot/open-graph-images) once you add embed.'
      },
      {
        kicker: 'On brand',
        title: 'Backgrounds accept your palette or your artwork.',
        body: 'Use a flat brand color for consistency, a gradient for launch material, or an image URL to place the window over a scene. The light and dark window themes let you match the page you are framing.',
        note: 'Pair a dark frame with a [dark mode capture](/use-cases/website-screenshot/dark-mode) for a fully dark composition, or pull the background from the site’s own [brand colors](/use-cases/website-metadata/brand-colors).'
      },
      {
        kicker: 'Still a screenshot',
        title: 'Every capture option applies before the frame is added.',
        body: 'Wait for content, hide banners, emulate a phone or switch the color scheme, then frame the result. The overlay is the last step of the same request, not a separate product with its own options.',
        note: 'When not to: if the image is a pixel-accurate reference for QA or visual regression, skip the overlay. The frame adds chrome and background that are not part of the page.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I add a browser frame to a website screenshot?',
      answer:
        'Pass screenshot.overlay with a browser theme, light or dark, and optionally a background. The API captures the page first and then composes it inside the browser window, returning one image.'
    },
    {
      question: 'Which backgrounds can I put behind a framed screenshot?',
      answer:
        'Solid colors as hex, rgb or rgba, CSS gradients such as linear-gradient, and image URLs. A malformed value returns the EINVALOVERLAYBG error, usually because of missing gradient color stops or an invalid color.'
    },
    {
      question: 'What size is a screenshot with a browser frame?',
      answer:
        'The composed image includes the window chrome and the background around the capture, so do not assume it matches the viewport. Read width and height from the response before placing it in a layout.'
    },
    {
      question: 'Can I put a mobile screenshot inside the browser frame?',
      answer:
        'Yes. Set device to a phone preset or pass a custom viewport, and the overlay wraps that capture in the same window style. See the [mobile screenshot recipe](/use-cases/website-screenshot/mobile) for the device options.'
    },
    {
      question: 'Can I get the framed screenshot as an image, without JSON?',
      answer:
        'Add embed=screenshot.url and the API URL returns the PNG or JPEG itself, ready for an img tag, a Markdown file or an og:image tag. The [delivery and embedding guide](/docs/guides/screenshot/embedding) covers each context.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'presentation-ready captures',
    body: 'A frame and a background in one option, no design tool needed. Start on the free endpoint and produce your first framed screenshot today.',
    href: '/screenshot',
    label: 'Frame a screenshot'
  },
  howTo: {
    name: 'How to add a browser frame to a website screenshot',
    steps: [
      {
        title: 'Choose the frame and the background',
        description:
          'Pass screenshot.overlay with browser set to light or dark and background set to a color, a CSS gradient or an image URL.'
      },
      {
        title: 'Pick the output format',
        description:
          'Keep the default PNG, or set type to jpeg with a quality value when file size matters.'
      },
      {
        title: 'Combine with a device',
        description:
          'Add device with a phone preset to frame a mobile capture in the same request.'
      },
      {
        title: 'Return the image directly',
        description:
          'Add embed=screenshot.url so the API URL responds with the composed image instead of JSON.'
      }
    ]
  }
}
