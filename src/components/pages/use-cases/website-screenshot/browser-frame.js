export const CONTENT = {
  slug: 'website-screenshot/browser-frame',
  head: {
    title: 'Website screenshots with a browser frame mockup',
    description:
      'Compose any capture inside a light or dark browser window over a color, gradient or image background. Presentation-ready assets from a URL, one option.'
  },
  hero: {
    title: 'Screenshots with a browser frame, ready for slides and social',
    intro:
      'A raw screenshot looks unfinished in a deck, a blog post or a launch tweet. Designers drop it into a browser mockup by hand. The overlay option does that composition in the API: a window frame, a background, done.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Raw captures need a design pass before they ship',
    paragraphs: [
      'Edge-to-edge screenshots have no context: no window chrome, no breathing room, no brand color. Every marketing asset ends up in a design tool for the same five-minute edit, and every automated pipeline skips it.',
      'screenshot.overlay wraps the capture in a realistic browser window, light or dark, and places it over a background you choose: a hex color, a CSS gradient or an image URL. The result is one PNG, ready to embed.'
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
    title: 'Frame it, color it, ship it',
    intro:
      'Two properties control the composition. Combine them with a viewport, a device or the JPEG options like any other screenshot.',
    steps: [
      {
        label: '1 · Dark frame over a gradient',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  overlay: {\n    browser: 'dark',\n    background: 'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)'\n  }\n})",
        note: 'browser picks the window theme; background accepts colors, gradients or image URLs.'
      },
      {
        label: '2 · Light frame over a brand color as JPEG',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  overlay: { browser: 'light', background: '#0473e4' },\n  type: 'jpeg',\n  quality: 80\n})",
        note: 'Switch to JPEG with a quality setting when the asset goes on a web page and size matters.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: {
            meta: false,
            screenshot: { overlay: { browser: 'dark', background: '#0473e4' } }
          }
        },
        note: 'Nested overlay options flatten to screenshot.overlay.browser and screenshot.overlay.background.'
      }
    ],
    params: [
      {
        name: 'screenshot.overlay',
        href: '/docs/api/parameters/screenshot/overlay',
        note: 'browser: light or dark; background: hex, rgb, rgba, CSS gradient or image URL.'
      },
      {
        name: 'screenshot.type',
        href: '/docs/api/parameters/screenshot/type',
        note: 'png (default) or jpeg.'
      },
      {
        name: 'screenshot.quality',
        href: '/docs/api/parameters/screenshot/quality',
        note: 'JPEG compression from 0 to 100, default 80.'
      },
      {
        name: 'device',
        href: '/docs/api/parameters/device',
        note: 'Frame a phone-sized capture for app or responsive showcases.'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Return the composed image directly for an img tag or a social card.'
      }
    ],
    outro:
      'An invalid background value is rejected with the EINVALOVERLAYBG error code, so a typo in a gradient fails fast instead of producing a broken asset.'
  },
  why: {
    title: 'Why compose in the API',
    intro:
      'The frame is the difference between a debug artifact and a marketing asset, and doing it server-side keeps it automated.',
    cards: [
      {
        kicker: 'One request, one asset',
        title: 'No design tool in the loop.',
        body: 'Changelogs, launch posts, product tours and documentation can generate their framed screenshots at build time or on demand, with the same options every time.',
        note: 'The same URL powers [dynamic Open Graph images](/use-cases/website-screenshot/open-graph-images) when you add embed.'
      },
      {
        kicker: 'On brand',
        title: 'Backgrounds accept your palette or your artwork.',
        body: 'Use a flat brand color for consistency, a gradient for launch material, or an image URL to place the window over a scene. The frame adapts to light or dark pages.',
        note: 'Pair a dark frame with [dark mode capture](/use-cases/website-screenshot/dark-mode) for a fully dark composition.'
      },
      {
        kicker: 'Still a screenshot',
        title: 'Every capture option applies before the frame is added.',
        body: 'Wait for content, hide banners, capture a mobile viewport or a single element, then frame the result. The overlay is the last step, not a separate product.',
        note: 'When not to: if the image is a pixel-accurate reference for QA or visual regression, skip the overlay; the frame adds padding and chrome that are not part of the page.'
      }
    ]
  },
  faq: [
    {
      question: 'Which overlay backgrounds are supported?',
      answer:
        'Solid colors as hex, rgb or rgba, CSS gradients such as linear-gradient, and image URLs. Invalid values return EINVALOVERLAYBG.'
    },
    {
      question: 'Does the frame change the image size?',
      answer:
        'Yes. The composed image includes the window chrome and the space around it, so it is larger than the viewport. Read width and height from the response before placing it.'
    },
    {
      question: 'Can I frame a mobile capture?',
      answer:
        'Yes. Set device to a phone preset or a custom viewport and the overlay wraps the mobile capture in the same browser window style.'
    },
    {
      question: 'Can I get the framed image directly, without JSON?',
      answer:
        'Add embed=screenshot.url and the API URL returns the PNG or JPEG itself, ready for an img tag, a Markdown file or an og:image tag.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'presentation-ready captures',
    body: 'A frame and a background in one option, no design tool needed. Start on the free tier and produce your first framed screenshot today.',
    href: '/screenshot',
    label: 'Frame a screenshot'
  }
}
