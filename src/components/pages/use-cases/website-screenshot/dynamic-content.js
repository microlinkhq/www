export const CONTENT = {
  slug: 'website-screenshot/dynamic-content',
  head: {
    title: 'Screenshot JavaScript-rendered pages after load',
    description:
      'Single-page apps, lazy sections and charts render after the first paint. Wait for a selector, an event or a delay so the capture shows the finished page.'
  },
  hero: {
    title: 'Screenshot JavaScript-rendered pages once they are ready',
    intro:
      'React, Vue and Angular apps paint an empty shell first and fill it in later. Charts, maps and infinite lists arrive even later. A screenshot taken at page load shows spinners and placeholders. The wait options let you capture when the content you care about exists.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Load is not the same as rendered',
    paragraphs: [
      'The browser considers a page loaded when its resources are fetched, not when the framework has hydrated and the data has arrived. For client-rendered apps those two moments can be seconds apart, and fixed timers are either too short or too slow.',
      'Microlink offers three levels of control: waitUntil chooses the lifecycle event, waitForSelector pauses until a specific element is visible, and waitForTimeout adds a fixed delay as a last resort. Combined with click and scroll, you capture the exact state you need.'
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
    title: 'Wait for the element, not the clock',
    intro:
      'Navigate fast, then wait for the one thing that proves the page is ready. Add a timer only when nothing stable exists to wait for.',
    steps: [
      {
        label: '1 · Wait for a selector',
        sdk: "const { url } = await microlink.screenshot('https://app.example.com/report', {\n  waitUntil: 'domcontentloaded',\n  waitForSelector: '.chart svg'\n})",
        note: 'A quick lifecycle event followed by a selector wait is the fastest reliable pattern.'
      },
      {
        label: '2 · Trigger lazy content first',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  scroll: '#reviews',\n  waitForSelector: '#reviews .card',\n  fullPage: true\n})",
        note: 'scroll brings a lazy section into view so it loads; then wait for its cards and capture the whole page.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://app.example.com/report',
          params: {
            screenshot: true,
            meta: false,
            waitUntil: 'domcontentloaded',
            waitForSelector: '.chart svg'
          }
        },
        note: 'Works on the free endpoint; timeouts are 30 seconds on free and 60 on Pro.'
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
        note: 'Pause until the selector matches a visible element.'
      },
      {
        name: 'waitForTimeout',
        href: '/docs/api/parameters/waitForTimeout',
        note: 'A fixed delay such as 3s. Cannot exceed the request timeout of your plan.'
      },
      {
        name: 'scroll',
        href: '/docs/api/parameters/scroll',
        note: 'Scroll to a selector so lazy sections load before the capture.'
      },
      {
        name: 'animations',
        href: '/docs/api/parameters/animations',
        note: 'Disabled by default so transitions never freeze mid-way in the capture.'
      }
    ],
    outro:
      'screenshot.element already waits for its own selector, so a separate waitForSelector is only needed when you capture the viewport or the full page.'
  },
  why: {
    title: 'Why selector waits beat timers',
    intro:
      'Waiting for a condition is both faster and more reliable than waiting for a duration.',
    cards: [
      {
        kicker: 'Finishes as soon as ready',
        title: 'A selector wait ends the moment the element appears.',
        body: 'A timer has to be long enough for the slowest case and wastes time in every other case. Waiting for the element you need returns as early as possible and still handles the slow case.',
        note: 'Pair it with domcontentloaded to skip waiting for images and third-party scripts that do not affect the content.'
      },
      {
        kicker: 'Deterministic state',
        title: 'The same condition produces the same capture.',
        body: 'Animations are disabled by default and the wait targets a specific DOM state, so captures do not vary between runs, which is what comparisons and monitoring need.',
        note: 'For content that appears after interaction, [click](/docs/api/parameters/click) the trigger and wait for its result in the same request.'
      },
      {
        kicker: 'Escape hatches',
        title: 'networkidle and timeouts cover the rest.',
        body: 'Pages without a stable selector can wait for network silence with networkidle0, or for a fixed delay with waitForTimeout when nothing else is observable.',
        note: 'When not to: if the page is server-rendered and complete at load, adding waits only makes the capture slower; set javascript to false to render it even faster.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does my screenshot show a spinner or an empty page?',
      answer:
        'The capture fired before the app finished rendering. Add waitForSelector for an element that only exists once the data has loaded, or switch waitUntil to networkidle0 when the page keeps fetching.'
    },
    {
      question: 'How long can the API wait for content?',
      answer:
        'Up to the request timeout of your plan: 30 seconds on the free endpoint and 60 seconds on Pro. A waitForTimeout larger than that is ignored.'
    },
    {
      question: 'Do I need prerender for screenshots?',
      answer:
        'No. Screenshots always render in a real browser. prerender controls whether metadata extraction uses a browser or a plain fetch, which is a different concern.'
    },
    {
      question: 'Can I wait for several conditions?',
      answer:
        'Yes. waitUntil accepts an array of lifecycle events, and waitForSelector, scroll and click compose in one request: click a tab, wait for its panel, then capture.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'the finished page',
    body: 'Wait for the element that matters and capture it once. Start on the free tier and screenshot your first single-page app today.',
    href: '/screenshot',
    label: 'Capture dynamic content'
  }
}
