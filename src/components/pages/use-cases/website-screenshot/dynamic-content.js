export const CONTENT = {
  slug: 'website-screenshot/dynamic-content',
  head: {
    title: 'Screenshot JavaScript-rendered pages after they load',
    description:
      'Single-page apps, lazy sections and charts render after the first paint. Wait for a selector, a lifecycle event or a delay and capture the finished page.'
  },
  hero: {
    title: 'Screenshot JavaScript-rendered pages once the content is ready',
    intro:
      'To screenshot JavaScript-rendered pages you have to capture after the framework has done its work, not when the HTML arrives. React, Vue and Angular apps paint an empty shell first and fill it in later, and charts, maps and infinite lists arrive later still, so a capture taken at page load shows spinners and placeholders. The wait options of the [Screenshot API](/screenshot) fire the capture when the content you care about exists.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A screenshot taken at load shows the spinner, not the app',
    paragraphs: [
      'The browser considers a page loaded when its resources are fetched, not when the framework has hydrated and the data has arrived. For client-rendered apps those two moments can be seconds apart, and the screenshot fires in between.',
      'A fixed timer is the usual patch, and it fails in both directions. Three seconds is too short on a slow day and wasted time on every other request, and the right number differs for each page you capture. Waiting for network silence helps until the page opens a long-polling connection in the background and never goes quiet.',
      'Microlink offers three levels of control. [waitUntil](/docs/api/parameters/waitUntil) chooses the lifecycle event, [waitForSelector](/docs/api/parameters/waitForSelector) pauses until a specific element appears, and waitForTimeout adds a fixed delay as a last resort. Combined with click and scroll, you capture the exact state you need.'
    ],
    figure: {
      request: {
        url: 'https://dev.to',
        params: {
          screenshot: true,
          meta: false,
          embed: 'screenshot.url',
          waitForSelector: 'main',
          viewport: { width: 1200, height: 750, deviceScaleFactor: 1 }
        }
      },
      alt: 'A dynamic feed captured after its main content rendered',
      width: 1200,
      height: 750,
      caption:
        'Generated live by the API call below: the capture waits for the main element before firing.'
    }
  },
  how: {
    title: 'How to wait for a selector before the screenshot fires',
    intro:
      'Navigate fast, then wait for the one thing that proves the page is ready. Add a timer only when nothing stable exists to wait for. The [page interaction guide](/docs/guides/screenshot/page-interaction) walks through every wait, click and scroll option.',
    steps: [
      {
        label: '1 · Wait for a selector',
        sdk: "const { url } = await microlink.screenshot('https://app.example.com/report', {\n  waitUntil: 'domcontentloaded',\n  waitForSelector: '.chart svg'\n})",
        note: 'domcontentloaded fires as soon as the DOM is parsed, without waiting for images or third-party scripts. The selector wait then holds the capture until the chart’s svg exists, which is the fastest reliable pattern.'
      },
      {
        label: '2 · Trigger lazy content first',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  scroll: '#reviews',\n  waitForSelector: '#reviews .card',\n  fullPage: true\n})",
        note: 'scroll brings a lazy section into view so it starts loading. The capture waits for its cards and then takes the whole page with fullPage.'
      },
      {
        label: '3 · Open a tab, then wait for its panel',
        sdk: "const { url } = await microlink.screenshot('https://app.example.com/analytics', {\n  click: '#tab-revenue',\n  waitForSelector: '#panel-revenue canvas'\n})",
        note: 'click changes the page state and waitForSelector holds the capture until the result of that click exists. click also accepts an array of selectors in the SDK when several elements need a click.'
      },
      {
        label: '4 · The same request as a URL',
        request: {
          url: 'https://app.example.com/report',
          params: {
            screenshot: true,
            meta: false,
            waitUntil: 'domcontentloaded',
            waitForSelector: '.chart svg'
          }
        },
        note: 'Works on the free endpoint with no API key. The request timeout is 30 seconds on the free plan and 60 seconds on Pro, and every wait has to fit inside it.'
      }
    ],
    params: [
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/waitUntil',
        note: 'auto (default), load, domcontentloaded, networkidle0 or networkidle2. Accepts an array.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Pauses until the CSS selector matches an element in the page.'
      },
      {
        name: 'waitForTimeout',
        href: '/docs/api/parameters/waitForTimeout',
        note: 'A fixed delay such as 3s or 3000. Cannot exceed the request timeout of your plan.'
      },
      {
        name: 'scroll',
        href: '/docs/api/parameters/scroll',
        note: 'Scrolls to a selector so lazy sections load before the capture.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Clicks one selector, or several, to open a tab or expand a section first.'
      },
      {
        name: 'animations',
        href: '/docs/api/parameters/animations',
        note: 'false by default, so CSS animations and transitions never freeze mid-way in the capture.'
      }
    ],
    outro:
      '[screenshot.element](/docs/api/parameters/screenshot/element) already waits for its own selector to be visible, so a separate waitForSelector is only needed when you capture the viewport or the full page.'
  },
  why: {
    title: 'Why selector waits beat timers for JavaScript-rendered screenshots',
    intro:
      'Waiting for a condition is both faster and more reliable than waiting for a duration.',
    cards: [
      {
        kicker: 'Finishes as soon as ready',
        title: 'A selector wait ends the moment the element appears.',
        body: 'A timer has to be long enough for the slowest case and wastes time in every other case. Waiting for the element you need returns as early as possible and still handles the slow case.',
        note: 'Pair it with domcontentloaded to skip waiting for images and third-party scripts that do not affect the content. The same advice leads the list for [faster, smaller screenshots](/use-cases/website-screenshot/faster-smaller-screenshots).'
      },
      {
        kicker: 'Deterministic state',
        title: 'The same condition produces the same capture.',
        body: 'Animations are disabled by default and the wait targets a specific DOM state, so captures do not vary between runs, which is what comparisons and monitoring need.',
        note: 'For content that appears after interaction, click the trigger and wait for its result in the same request. The [browser automation feature](/features/automation) lists every option that shapes the page before capture.'
      },
      {
        kicker: 'Escape hatches',
        title: 'networkidle and timeouts cover the rest.',
        body: 'Pages without a stable selector can wait for network silence with networkidle0, or for a fixed delay with waitForTimeout when nothing else is observable. waitUntil also accepts an array when one event alone fires too early.',
        note: 'When not to: if the page is server-rendered and complete at load, adding waits only makes the capture slower. Set [javascript](/docs/api/parameters/javascript) to false to skip script execution altogether.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does my screenshot show a spinner or an empty page?',
      answer:
        'The capture fired before the app finished rendering. Add waitForSelector for an element that only exists once the data has loaded, or switch waitUntil to networkidle0 when the page keeps fetching. The [screenshot troubleshooting guide](/docs/guides/screenshot/troubleshooting) covers the other causes.'
    },
    {
      question: 'How long can the screenshot API wait for JavaScript to finish?',
      answer:
        'Up to the request timeout of your plan: 30 seconds on the free endpoint and 60 seconds on Pro. A waitForTimeout larger than that is ignored, so prefer a selector wait that ends as soon as the content is there.'
    },
    {
      question: 'Do I need prerender to screenshot a single-page app?',
      answer:
        'No. Screenshots always render in a real browser. prerender controls whether metadata extraction uses a browser or a plain HTTP fetch, a different concern covered in [metadata from single-page apps](/use-cases/website-metadata/javascript-rendered-pages).'
    },
    {
      question: 'Can I wait for several conditions before a screenshot?',
      answer:
        'Yes. waitUntil accepts an array of lifecycle events, and waitForSelector, scroll and click compose in one request: click a tab, wait for its panel, then capture.'
    },
    {
      question: 'How do I screenshot content that loads on scroll?',
      answer:
        'Pass scroll with the selector of the lazy section so the browser brings it into view and the section starts loading, then add waitForSelector for an element inside it. Add screenshot.fullPage when you want the whole page in one image.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'the finished page',
    body: 'Wait for the element that matters and capture it once. Start on the free tier and screenshot your first single-page app today.',
    href: '/screenshot',
    label: 'Capture dynamic content'
  },
  howTo: {
    name: 'How to screenshot a JavaScript-rendered page after it finishes loading',
    steps: [
      {
        title: 'Wait for a selector',
        description:
          'Set waitUntil to domcontentloaded and waitForSelector to an element that only exists once the data has loaded, so the capture fires as soon as the page is ready.'
      },
      {
        title: 'Trigger lazy content first',
        description:
          'Use scroll to bring a lazy section into view, wait for an element inside it and capture the whole page with fullPage.'
      },
      {
        title: 'Open a tab, then wait for its panel',
        description:
          'Use click to change the page state and waitForSelector to hold the capture until the result of that click exists.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Pass the same options as query parameters. The request works on the free endpoint and every wait has to fit inside the plan timeout: 30 seconds free, 60 seconds Pro.'
      }
    ]
  }
}
