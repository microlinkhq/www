export const CONTENT = {
  slug: 'website-screenshot/capture-element',
  head: {
    title: 'Screenshot a specific element by CSS selector',
    description:
      'Crop the capture to one DOM element: a chart, a pricing table or a widget. The API waits until the selector is visible and can return a transparent PNG.'
  },
  hero: {
    title: 'Screenshot a single element of a page by its CSS selector',
    intro:
      'To screenshot an element by CSS selector, you name the node and the API returns an image of exactly that box. No full-page capture, no cropping math. It fits a chart headed for a weekly report, a pricing table in a competitor comparison, a component in your documentation or a widget in a changelog. The screenshot.element option crops the capture to the matching node and waits until it is visible.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Cropping a full-page screenshot by coordinates is guesswork',
    paragraphs: [
      'You rarely need the whole viewport. You need the revenue chart, the plan comparison or the embedded map, at its real size, every day. A full capture forces a second step: find where the element landed and cut it out.',
      'Cropping by coordinates breaks the moment the page adds a banner, swaps a font or renders at a different width. You end up with half a chart or a strip of the neighboring section. Image-processing code to detect the region is a second system to maintain, and it still fails when the element renders late.',
      'Selecting the node is stable. With [screenshot.element](/docs/api/parameters/screenshot/element) the browser finds the element, waits for it to appear and be visible, and captures exactly its box. Add [omitBackground](/docs/api/parameters/screenshot/omitBackground) and the default white background is dropped, so the image comes back transparent around the element.'
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
    title: 'How to screenshot an element with a CSS selector',
    intro:
      'One option selects the node. Combine it with the interaction options when the element sits behind a tab or an accordion. The [customizing output guide](/docs/guides/screenshot/customizing-output) compares element capture with full-page and viewport captures.',
    steps: [
      {
        label: '1 · Capture the element',
        sdk: "const { url, width, height } = await microlink.screenshot(\n  'https://example.com/pricing',\n  { element: '#pricing-table' }\n)",
        note: 'The capture is cropped to the element matching the selector. The response includes the hosted image URL plus the width and height of the cropped image.'
      },
      {
        label: '2 · Make the background transparent',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  element: '.logo',\n  omitBackground: true\n})",
        note: 'omitBackground drops the default white background. Keep the default PNG type, because JPEG has no transparency.'
      },
      {
        label: '3 · Open a tab first, then capture',
        sdk: "const { url } = await microlink.screenshot('https://example.com/pricing', {\n  click: '#tab-annual',\n  element: '#pricing-table'\n})",
        note: '[click](/docs/api/parameters/click) changes the page state before the capture, so the element is captured the way it looks after the interaction.'
      },
      {
        label: '4 · The same request as a URL',
        request: {
          url: 'https://example.com/pricing',
          params: { meta: false, screenshot: { element: '#pricing-table' } }
        },
        note: 'Dot notation turns nested screenshot options into query parameters, so screenshot.element works from any language or straight from an img tag.'
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
        note: 'Omits the default white background for a transparent capture. Off by default; PNG only.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Clicks a selector first, to open the tab or accordion that contains the element.'
      },
      {
        name: 'scroll',
        href: '/docs/api/parameters/scroll',
        note: 'Scrolls to a selector while keeping a viewport-sized capture, for a section shown in context.'
      }
    ],
    outro:
      'element crops the image; [scroll](/docs/api/parameters/scroll) only moves the viewport. Use element for a widget and scroll for a section you want to show with its surroundings.'
  },
  why: {
    title: 'Why a selector beats cropping a full screenshot',
    intro:
      'The selector is a contract with the page, not with its pixels. That gives a screenshot of a specific element three practical advantages.',
    cards: [
      {
        kicker: 'Waits for visibility',
        title: 'No blank captures of elements that have not rendered yet.',
        body: 'The API waits for the element to appear and be visible before it captures. Client-rendered charts and lazy-loaded widgets are captured after they draw, without a fixed delay. You usually do not need an extra waitForSelector for the same node.',
        note: 'When the element depends on data that arrives later, the [JavaScript-rendered pages recipe](/use-cases/website-screenshot/dynamic-content) covers waiting for a child selector or a network event.'
      },
      {
        kicker: 'Smaller and faster',
        title: 'You transfer the pixels you need and nothing else.',
        body: 'An element capture is usually faster than a full-page capture and produces a smaller image. That means lighter files in reports and docs, and less storage when you keep a daily history of the same chart.',
        note: 'The response still reports the width and height of the image, so it drops into a layout without measuring. Compare the options in the [full page capture reference](/docs/api/parameters/screenshot/fullPage).'
      },
      {
        kicker: 'Transparent output',
        title: 'omitBackground turns a component into an asset.',
        body: 'Logos, icons and UI components captured as a transparent screenshot composite over any color in a slide, a social card or a design comp. The page’s own transparent areas are preserved instead of being filled with white.',
        note: 'When not to: if a sticky header or a modal covers the element, the overlap shows up in the capture. Hide it with [styles](/docs/api/parameters/styles) or dismiss it with click first, as in the [cookie banner recipe](/use-cases/website-screenshot/block-cookie-banners-and-ads).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I screenshot a specific element with a CSS selector?',
      answer:
        'Pass the selector as screenshot.element, for example screenshot.element=#pricing-table in the URL or element: \'#pricing-table\' in the SDK. The API waits for the node to be visible and returns an image cropped to its box.'
    },
    {
      question: 'What if my element screenshot selector matches several nodes?',
      answer:
        'The capture targets one element, so write a selector that matches exactly one node: an id, a data attribute or a parent selector that wraps the part you want. Test the selector in the browser console before you automate it.'
    },
    {
      question: 'Can I screenshot an element inside an iframe?',
      answer:
        'Select the element that wraps the iframe and the capture includes what is rendered inside it, which is how the CodePen example on this page works. A CSS selector does not reach into the iframe’s own document.'
    },
    {
      question: 'Why is my element screenshot blank or cut off?',
      answer: [
        'The API waits for the element to be visible, but a sticky header or a modal can still overlap it. Hide the overlap with styles or dismiss it with click before capturing.',
        'If the element renders only after an interaction, click the trigger first. The [screenshot troubleshooting guide](/docs/guides/screenshot/troubleshooting) lists the fix for each wrong-area symptom.'
      ]
    },
    {
      question: 'Can I get a transparent screenshot as JPEG?',
      answer:
        'No. JPEG has no alpha channel, so omitBackground only produces transparency with the default PNG type. Switch to JPEG when you care more about file size than transparency.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'just the element',
    body: 'One selector, one image, no cropping math. Start on the free endpoint and capture a chart, a table or a component in a single call.',
    href: '/screenshot',
    label: 'Capture an element'
  },
  howTo: {
    name: 'How to screenshot a single element by CSS selector',
    steps: [
      {
        title: 'Capture the element',
        description:
          'Pass screenshot.element with the CSS selector of the node. The API waits for it to be visible and crops the image to its box.'
      },
      {
        title: 'Make the background transparent',
        description:
          'Add screenshot.omitBackground and keep the PNG type to drop the default white background.'
      },
      {
        title: 'Interact before capturing',
        description:
          'Add click with the selector of a tab or accordion when the element only shows after an interaction.'
      },
      {
        title: 'Use the request as a URL',
        description:
          'Send screenshot.element as a query parameter with dot notation to call the API from any language.'
      }
    ]
  }
}
