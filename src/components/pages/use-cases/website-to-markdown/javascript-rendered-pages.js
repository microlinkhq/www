export const CONTENT = {
  slug: 'website-to-markdown/javascript-rendered-pages',
  head: {
    title: 'Convert JavaScript-rendered pages and SPAs to Markdown',
    description:
      'Turn a single-page app into Markdown: force a browser render with prerender, wait for the element that proves the data loaded, then convert the DOM.'
  },
  hero: {
    title: 'Convert a JavaScript-rendered page or SPA to Markdown',
    intro:
      'Getting an SPA to Markdown means converting the DOM after JavaScript runs, not the HTML the server sent. A plain HTTP fetch of a React, Vue or Angular app returns an empty shell and a script tag, which is why docs portals, dashboards and storefronts come back blank. The Markdown API can render the page in a real browser first, wait for the content and convert what the user actually sees.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A fetched SPA is an empty shell, so the Markdown is empty too',
    paragraphs: [
      'Single-page applications ship a root div and load everything else at runtime. Convert the response body of a React app to Markdown and you get a title, maybe a noscript warning, and nothing else. The request succeeded, the content is missing, and nothing in the output tells you why.',
      'Running your own headless browser fixes the render and creates a new problem: deciding when the page is ready. A fixed sleep is too short for the slow case and wasted time for the fast one. Network-idle heuristics never settle on pages that poll, and they fire too early on pages that load data after a click.',
      'Microlink picks the fetch mode automatically with [prerender](/docs/api/parameters/prerender) set to auto. Force it to true for pages you know are client-rendered, add [waitForSelector](/docs/api/parameters/waitForSelector) for the element that proves the data has arrived, and the conversion runs against the rendered DOM.'
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
    title: 'How to render an SPA before converting it to Markdown',
    intro:
      'Two options decide correctness: prerender chooses the browser, and the wait options decide when the DOM is ready to convert. The [page preparation guide](/docs/guides/data-extraction/page-preparation) ranks the wait controls from the cheapest to the most forgiving.',
    steps: [
      {
        label: '1 · Force the browser and wait',
        sdk: "const markdown = await microlink.markdown('https://app.example.com/docs', {\n  prerender: true,\n  waitForSelector: 'main h1'\n})",
        note: 'prerender: true skips the plain fetch and spawns a headless browser. waitForSelector pauses until the heading appears, so the Markdown string you get back includes the hydrated content.'
      },
      {
        label: '2 · Navigate fast, then wait for data',
        sdk: "const cards = await microlink.markdown('https://app.example.com/catalog', {\n  prerender: true,\n  waitUntil: 'domcontentloaded',\n  waitForSelector: '.product-card',\n  selectorAll: '.product-card'\n})",
        note: 'A quick lifecycle event plus a selector wait is the fastest reliable pattern when the default navigation signal is too slow. selectorAll resolves to an array with one Markdown string per card.'
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
        note: 'The Markdown arrives in the data.markdown field of the JSON response. Check the x-fetch-mode response header: prerender confirms that a browser render was used, and x-fetch-time reports how long the fetch step took.'
      }
    ],
    params: [
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'auto by default, true to force a headless browser render, false for a plain HTTP GET.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Pause the browser until an element matching the CSS selector appears.'
      },
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/waitUntil',
        note: 'auto by default. Also load, domcontentloaded, networkidle0 or networkidle2.'
      },
      {
        name: 'waitForTimeout',
        href: '/docs/api/parameters/waitForTimeout',
        note: 'A fixed delay for pages with no stable selector. Capped by the plan timeout: 30 seconds free, 60 seconds Pro.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Click one selector or several to open a tab or dismiss a dialog before the conversion.'
      }
    ],
    outro:
      'When x-fetch-mode reports fetch, the page was served as static HTML and no browser was needed. prerender: auto makes that call for you and only renders when it must, which is the right default for a mixed list of URLs.'
  },
  why: {
    title: 'Why a browser render comes before the Markdown conversion',
    intro:
      'The Markdown can only be as complete as the DOM it is converted from, and for a client-rendered app that DOM does not exist until the bundle has run.',
    cards: [
      {
        kicker: 'The real DOM',
        title: 'Conversion runs on what the browser rendered.',
        body: 'With prerender the page executes its JavaScript in a real browser, so hydrated components, fetched data and lazy sections are present in the DOM before the Markdown serializer reads it. Every request runs in its own isolated browser.',
        note: 'The [html method](/docs/sdk/methods/html) returns the same rendered DOM as markup when you need to parse it yourself.'
      },
      {
        kicker: 'Wait for the proof',
        title: 'A selector wait ends when the content exists.',
        body: 'Instead of a timer, wait for the element that only appears once the data has loaded. The request returns as early as possible and still covers the slow case, up to the plan timeout.',
        note: 'The same wait logic applies to [screenshots of JavaScript-rendered pages](/use-cases/website-screenshot/dynamic-content) and to [metadata from single-page apps](/use-cases/website-metadata/javascript-rendered-pages), so one selector per site serves all three.'
      },
      {
        kicker: 'Auto when unsure',
        title: 'prerender: auto renders only when needed.',
        body: 'For a mixed set of URLs, leave prerender on auto: static pages are fetched with a plain request, client-rendered pages get the browser. Force true only for hosts you know.',
        note: 'When not to: server-rendered documentation and articles convert fine with a plain fetch, and forcing prerender there only adds latency. Once the page renders, [scope the conversion](/use-cases/website-to-markdown/clean-content) to keep the app chrome out of the Markdown.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does my Markdown come back empty for a React or Vue app?',
      answer:
        'The page is client-rendered and the conversion ran on the initial HTML, which is only a root element and script tags. Set prerender to true and add waitForSelector for an element that exists once the app has rendered.'
    },
    {
      question: 'How do I convert an SPA to Markdown with an API?',
      answer:
        'Send the URL with data.markdown.attr=markdown, prerender=true and a waitForSelector for the content container. Microlink renders the app in a headless browser, waits for that element and serializes the finished DOM as Markdown.'
    },
    {
      question: 'How do I know whether a browser render was used for the Markdown?',
      answer:
        'Read the x-fetch-mode response header: prerender means a browser rendered the page, fetch means a plain HTTP request was enough. x-fetch-time reports the time spent in that step.'
    },
    {
      question: 'How long can a Markdown conversion wait for a single-page app?',
      answer:
        'Up to the request [timeout](/docs/api/parameters/timeout): 30 seconds on the free endpoint and 60 seconds on Pro plans. A longer waitForTimeout is ignored, so prefer waitForSelector, which returns as soon as the content appears.'
    },
    {
      question: 'Can I convert content to Markdown that only appears after a click?',
      answer:
        'Yes. Use click with the selector of the tab or button, then waitForSelector for the content it reveals, and the conversion includes it. [Browser automation](/features/automation) covers the other interactions available on a request.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to convert',
    headlineAccent: 'rendered apps',
    body: 'Render first, wait for the data, then convert. Start on the free tier and turn your first single-page app into Markdown today.',
    href: '/markdown',
    label: 'Convert a web app'
  },
  howTo: {
    name: 'How to convert a JavaScript-rendered page to Markdown',
    steps: [
      {
        title: 'Force the browser and wait for the content',
        description:
          'Call the Markdown method with prerender: true and waitForSelector set to an element that only exists once the app has rendered, such as main h1.'
      },
      {
        title: 'Navigate fast, then wait for data',
        description:
          'Set waitUntil to domcontentloaded and waitForSelector to the first data element, and use selectorAll to get one Markdown string per item.'
      },
      {
        title: 'Verify the render from the response headers',
        description:
          'Send the same options as query parameters and check the x-fetch-mode response header: prerender confirms that a browser rendered the page before the conversion.'
      }
    ]
  }
}
