export const CONTENT = {
  slug: 'website-screenshot/capture-element',
  head: {
    title: 'Screenshot a single element by CSS selector via API',
    description:
      'Crop the capture to one DOM element: a chart, a pricing table or a widget. The API waits for the selector to be visible, with optional transparency.'
  },
  hero: {
    title: 'Screenshot one element of a page, not the whole page',
    intro:
      'You rarely need the entire viewport. A chart for a report, a pricing table for a comparison, a component for documentation. screenshot.element crops the capture to the matching selector and waits until it is visible.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Cropping a full screenshot is guesswork',
    paragraphs: [
      'Cropping by coordinates breaks the moment the page adds a banner, changes a font or renders at a different width. You end up with half a chart or a strip of the neighbouring section.',
      'Selecting the element by CSS selector is stable: the browser finds the node, waits for it to be visible and captures exactly its box. Add omitBackground and the image comes back with transparency around the element.'
    ],
    figure: {
      request: {
        url: 'https://codepen.io/fossheim/full/oNjxrZa',
        params: {
          meta: false,
          embed: 'screenshot.url',
          screenshot: { element: '#result-iframe-wrap', omitBackground: true }
        }
      },
      alt: 'The result frame of a CodePen captured as a single element',
      width: 1280,
      height: 735,
      fit: 'contain',
      caption:
        'Generated live by the API call below: only the #result-iframe-wrap element is captured.'
    }
  },
  how: {
    title: 'Point at the element, get its box',
    intro:
      'One option selects the node. Combine it with the wait and interaction options when the element renders late or sits behind a tab.',
    steps: [
      {
        label: '1 · Capture the element',
        sdk: "const { url, width, height } = await microlink.screenshot(\n  'https://example.com/pricing',\n  { element: '#pricing-table' }\n)",
        note: 'The capture is cropped to the first element matching the selector.'
      },
      {
        label: '2 · Make the background transparent',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  element: '.logo',\n  omitBackground: true\n})",
        note: 'omitBackground drops the default white background; keep the PNG format for transparency.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/pricing',
          params: { meta: false, screenshot: { element: '#pricing-table' } }
        },
        note: 'Dot notation turns nested screenshot options into query parameters.'
      }
    ],
    params: [
      {
        name: 'screenshot.element',
        href: '/docs/api/parameters/screenshot/element',
        note: 'CSS selector of the element to capture. Waits for it to appear and be visible.'
      },
      {
        name: 'screenshot.omitBackground',
        href: '/docs/api/parameters/screenshot/omitBackground',
        note: 'Transparent capture instead of a white background (PNG only).'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Open the tab or accordion that contains the element first.'
      },
      {
        name: 'scroll',
        href: '/docs/api/parameters/scroll',
        note: 'Scroll to a selector while keeping a viewport-sized capture, when you want context around the element.'
      }
    ],
    outro:
      'element crops the image; scroll only moves the viewport. Use element for a widget, scroll for a section shown in context.'
  },
  why: {
    title: 'Why selector capture beats cropping',
    intro:
      'The selector is a contract with the page, and it comes with three practical advantages.',
    cards: [
      {
        kicker: 'Waits for visibility',
        title: 'No blank captures of elements that have not rendered yet.',
        body: 'The API waits for the element to exist and be visible before capturing, so client-rendered charts and lazy-loaded widgets are captured after they draw, without a fixed delay.',
        note: 'For elements that appear after an interaction, [click](/docs/api/parameters/click) the tab or button first; the wait happens after the click.'
      },
      {
        kicker: 'Smaller and faster',
        title: 'You transfer the pixels you need and nothing else.',
        body: 'A component capture is a fraction of a full-page screenshot, which means smaller files, faster responses and cheaper storage when you embed it in reports or docs.',
        note: 'The response still tells you the width and height of the image, so it drops into a layout without measuring.'
      },
      {
        kicker: 'Transparent output',
        title: 'omitBackground turns a component into an asset.',
        body: 'Logos, icons and UI components captured with a transparent background composite over any color in a slide, a social card or a design comp.',
        note: 'When not to: if the selector matches an element larger than the visible area, or the page hides it behind a modal, capture the [full page](/docs/api/parameters/screenshot/fullPage) or dismiss the modal first.'
      }
    ]
  },
  faq: [
    {
      question: 'What happens if the selector matches several elements?',
      answer:
        'The first match is captured. Use a more specific selector, an id, or a parent selector that wraps the exact node you want.'
    },
    {
      question: 'Can I capture an element inside an iframe?',
      answer:
        'Select the iframe element itself and the capture includes what is rendered inside it. Selectors do not reach into the iframe’s own document.'
    },
    {
      question: 'Why is my element capture blank or cut off?',
      answer: [
        'The API waits for the element to be visible, but a sticky header or a modal can still overlap it. Hide the overlap with styles or dismiss it with click before capturing.',
        'If the element renders only after user interaction, click the trigger first; if it renders after a network call, add waitForSelector for a child that appears when the data has loaded.'
      ]
    },
    {
      question: 'Does omitBackground work with JPEG?',
      answer:
        'No. JPEG has no alpha channel. Keep the default PNG format when you need transparency.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'just the element',
    body: 'One selector, one image, no cropping math. Start on the free tier and capture a chart, a table or a component in a single call.',
    href: '/screenshot',
    label: 'Capture an element'
  }
}
