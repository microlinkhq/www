export const CONTENT = {
  slug: 'website-to-markdown/javascript-rendered-pages',
  head: {
    title: 'Convert single-page apps to Markdown after JS runs',
    description:
      'Client-rendered content only exists after JavaScript runs. Force a browser render with prerender, wait for the element, then convert the DOM.'
  },
  hero: {
    title: 'Convert JavaScript-rendered pages to Markdown',
    intro:
      'A plain HTTP fetch of a React, Vue or Angular app returns an empty shell and a script tag. The content you want exists only in the browser after the bundle runs. The Markdown API can render the page in a real browser first, wait for the content, and convert what the user actually sees.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The HTML you fetch is not the page you see',
    paragraphs: [
      'Single-page applications ship a root div and load everything else at runtime. Scrapers that parse the response body find nothing, and heuristics that guess when the page is ready either wait too little or too long.',
      'Microlink picks the fetch mode automatically with prerender set to auto. Force prerender to true for pages you know are client-rendered, add waitForSelector for the element that proves the data has arrived, and the conversion runs against the rendered DOM.'
    ],
    live: {
      label: 'Open the live Markdown of a client-rendered page',
      request: {
        url: 'https://dev.to',
        params: {
          data: { markdown: { selector: 'main', attr: 'markdown' } },
          meta: false,
          embed: 'markdown',
          prerender: true,
          waitForSelector: 'main'
        }
      }
    }
  },
  how: {
    title: 'Render, wait, convert',
    intro:
      'Two options decide correctness: prerender chooses the browser, and the wait options decide when the DOM is ready to convert.',
    steps: [
      {
        label: '1 · Force the browser and wait',
        sdk: "const markdown = await microlink.markdown('https://app.example.com/docs', {\n  prerender: true,\n  waitForSelector: 'main h1'\n})",
        note: 'prerender: true skips the plain fetch; waitForSelector pauses until the heading exists.'
      },
      {
        label: '2 · Navigate fast, then wait for data',
        sdk: "const cards = await microlink.markdown('https://app.example.com/catalog', {\n  prerender: true,\n  waitUntil: 'domcontentloaded',\n  waitForSelector: '.product-card',\n  selectorAll: '.product-card'\n})",
        note: 'A quick lifecycle event plus a selector wait is the fastest reliable pattern; selectorAll returns one Markdown string per card.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://app.example.com/docs',
          params: {
            data: { markdown: { attr: 'markdown' } },
            meta: false,
            prerender: true,
            waitForSelector: 'main h1'
          }
        },
        note: 'Check the x-fetch-mode response header: prerender confirms a browser render was used.'
      }
    ],
    params: [
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'auto (default), true to force a browser render, false for a plain fetch.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Pause until the selector matches a visible element.'
      },
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/waitUntil',
        note: 'auto, load, domcontentloaded, networkidle0 or networkidle2.'
      },
      {
        name: 'waitForTimeout',
        href: '/docs/api/parameters/waitForTimeout',
        note: 'A fixed delay when no stable selector exists; capped by the plan timeout.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Open a tab or dismiss a dialog before the conversion.'
      }
    ],
    outro:
      'When x-fetch-mode reports fetch, the page was served as static HTML and no browser was needed; prerender: auto makes that call for you and only renders when it must.'
  },
  why: {
    title: 'Why render before converting',
    intro:
      'The Markdown can only be as complete as the DOM it is converted from.',
    cards: [
      {
        kicker: 'The real DOM',
        title: 'Conversion runs on what the browser rendered.',
        body: 'With prerender the page executes its JavaScript in a real browser, so hydrated components, fetched data and lazy sections are present in the DOM before the Markdown serializer reads it.',
        note: 'The [html](/docs/sdk/methods/html) method returns the same rendered DOM as markup when you need to parse it yourself.'
      },
      {
        kicker: 'Wait for the proof',
        title: 'A selector wait ends when the content exists.',
        body: 'Instead of a timer, wait for the element that only appears once the data has loaded. It returns as early as possible and still covers the slow case.',
        note: 'For lists, wait for the first item and convert with selectorAll to get each item separately.'
      },
      {
        kicker: 'Auto when unsure',
        title: 'prerender: auto renders only when needed.',
        body: 'For a mixed set of URLs, leave prerender on auto: static pages are fetched cheaply, client-rendered pages get the browser. Force true only for hosts you know.',
        note: 'When not to: server-rendered documentation and articles convert fine with a plain fetch; forcing prerender there only adds latency.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does my Markdown come back empty for a web app?',
      answer:
        'The page is client-rendered and the conversion ran on the initial HTML. Set prerender to true and add waitForSelector for an element that exists once the app has rendered.'
    },
    {
      question: 'How do I know whether a browser render was used?',
      answer:
        'Read the x-fetch-mode response header: prerender means a browser rendered the page, fetch means a plain HTTP request was enough.'
    },
    {
      question: 'How long can the conversion wait for a single-page app?',
      answer:
        'Up to the request timeout: 30 seconds on the free endpoint and 60 seconds on Pro plans. A longer waitForTimeout is ignored.'
    },
    {
      question: 'Can I convert content that appears after a click?',
      answer:
        'Yes. Use click with the selector of the tab or button, then waitForSelector for the content it reveals, and the conversion includes it.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to convert',
    headlineAccent: 'rendered apps',
    body: 'Render first, wait for the data, then convert. Start on the free tier and turn your first single-page app into Markdown today.',
    href: '/markdown',
    label: 'Convert a web app'
  }
}
