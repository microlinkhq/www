export const CONTENT = {
  slug: 'scraping/javascript-rendered-pages',
  head: {
    title: 'Scrape custom fields from JavaScript-rendered SPAs',
    description:
      'Scrape React, Vue or Angular apps: render the page in a real browser, wait for the element you need and extract typed JSON fields from the result.'
  },
  hero: {
    title: 'Scrape a JavaScript-rendered page once the app has loaded',
    intro:
      'To scrape a JavaScript-rendered page you need the DOM the browser builds, not the HTML the server sends. Single-page apps, dashboards, store fronts and job boards built with React, Vue or Angular ship an empty root element and fill it in later. The [Scraping API](/features/scraping) renders the page in a real browser, waits for your element and then runs your rules.',
    cta: { label: 'Start with the Scraping API', href: '/features/scraping' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The HTML of a React app has no data in it',
    paragraphs: [
      'Fetch a single-page app with an HTTP client and you get a script tag and an empty div. Every selector you wrote against the page in your browser returns nothing, because the content only exists after the JavaScript runs and the API calls behind it return.',
      'Running headless Chrome yourself fixes the rendering and brings new problems: when is the page done? Waiting for the load event fires too early on apps that fetch data afterwards, a fixed sleep is either too short or wastes seconds on every request, and the browser fleet needs memory, updates and crash handling.',
      'The API decides per page whether it needs a browser: [prerender](/docs/api/parameters/prerender) defaults to auto, and true forces rendering. Then waitForSelector holds extraction until the element you are about to read exists, so the rules run against the same DOM a visitor sees. The [page preparation guide](/docs/guides/data-extraction/page-preparation) explains each wait option.'
    ],
    live: {
      label: 'Open the live JSON from a client-rendered demo page',
      request: {
        url: 'https://quotes.toscrape.com/js/',
        params: {
          data: {
            quotes: {
              selectorAll: '.quote',
              attr: {
                text: { selector: '.text', attr: 'text' },
                author: { selector: '.author', attr: 'text' }
              }
            }
          },
          meta: false,
          prerender: true,
          waitForSelector: '.quote'
        }
      }
    }
  },
  how: {
    title: 'How to scrape a JavaScript-rendered page with a real browser',
    intro:
      'Force the browser, wait for the element, extract. Then tighten the wait so each request spends as little time as possible.',
    steps: [
      {
        label: '1 · Render and wait for the content',
        sdk: "const { quotes } = await microlink.extract(\n  'https://quotes.toscrape.com/js/',\n  {\n    quotes: {\n      selectorAll: '.quote',\n      attr: {\n        text: { selector: '.text', attr: 'text' },\n        author: { selector: '.author', attr: 'text' }\n      }\n    }\n  },\n  { prerender: true, waitForSelector: '.quote' }\n)",
        note: 'This demo page builds its quotes with JavaScript, so the plain HTML has none. With prerender and waitForSelector, quotes resolves to an array of { text, author } objects.'
      },
      {
        label: '2 · Navigate fast, then wait for the element',
        sdk: "const { jobs } = await microlink.extract(\n  'https://app.example.com/jobs',\n  { jobs: { selectorAll: '[data-testid=job-title]', attr: 'text' } },\n  {\n    prerender: true,\n    waitUntil: 'domcontentloaded',\n    waitForSelector: '[data-testid=job-title]'\n  }\n)",
        note: '[waitUntil](/docs/api/parameters/waitUntil) domcontentloaded ends navigation as soon as the DOM is parsed, and the selector wait covers the data that loads afterwards. This is usually faster than waiting for the network to go idle.'
      },
      {
        label: '3 · Read the app state instead of the DOM',
        sdk: "const { props } = await microlink.extract(\n  'https://nextjs-app.example.com/product/42',\n  {\n    props: {\n      evaluate: \"JSON.parse(document.getElementById('__NEXT_DATA__').textContent).props.pageProps\",\n      type: 'object'\n    }\n  },\n  { prerender: true }\n)",
        note: '[evaluate](/docs/sdk/methods/extract/evaluate) runs JavaScript in the page and returns the result. Many frameworks embed their initial data as JSON, which is often cleaner than the rendered markup.'
      }
    ],
    params: [
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'auto decides per page. true forces a headless browser, false a plain HTTP fetch.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Waits until an element matching the CSS selector appears. The most reliable wait.'
      },
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/waitUntil',
        note: 'Navigation event to wait for: auto, load, domcontentloaded, networkidle0 or networkidle2.'
      },
      {
        name: 'waitForTimeout',
        href: '/docs/api/parameters/waitForTimeout',
        note: 'A fixed delay for pages with no stable selector. Capped by the request timeout.'
      },
      {
        name: 'evaluate',
        href: '/docs/sdk/methods/extract/evaluate',
        note: 'A rule that runs JavaScript in the page context instead of querying the DOM.'
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript',
        note: 'Set false to render without running scripts when the page does not need them.'
      }
    ],
    outro:
      'The x-fetch-mode response header tells you which path ran: prerender when a browser rendered the page, fetch for a plain request. If fields are still null after the wait, the [troubleshooting guide](/docs/guides/data-extraction/troubleshooting) walks through wrong selectors, page variants and timeouts.'
  },
  why: {
    title: 'Why rendering on the API side beats running your own browser',
    intro:
      'The browser is the expensive part of scraping a React website. Moving it behind the request leaves you with the part that is specific to your job: the selectors.',
    cards: [
      {
        kicker: 'Right DOM',
        title: 'Rules run after the app has rendered.',
        body: 'The page loads in a real browser with ads and trackers blocked by default, the selector wait resolves when your element exists, and only then do the rules read it. Nothing runs against the empty shell.',
        note: 'Pages that only reveal content after a click or a scroll need one more step: [scrape paginated lists and Load more buttons](/use-cases/scraping/load-more-and-pagination) covers both.'
      },
      {
        kicker: 'Only when needed',
        title: 'Static pages skip the browser.',
        body: 'With prerender on auto, server-rendered pages are fetched without a browser and client-rendered ones get one. Set false explicitly for targets you know are static and they return faster.',
        note: 'The [caching and performance guide](/docs/guides/data-extraction/caching-and-performance) lists the extraction speedups in order of impact, starting with meta: false.'
      },
      {
        kicker: 'No fleet',
        title: 'Every request gets a fresh browser.',
        body: 'There is no pool to size, no Chrome version to update and no zombie process to reap. Each call runs in its own isolated browser that is destroyed afterwards, and the request timeout is 30 seconds on free and 60 on Pro.',
        note: 'When not to: if you only need the page title, description and image of an app, [metadata from single-page apps](/use-cases/website-metadata/javascript-rendered-pages) returns them without writing rules. For the full text, use [Markdown from JavaScript-rendered pages](/use-cases/website-to-markdown/javascript-rendered-pages).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I scrape a React website that returns empty HTML?',
      answer:
        'Add prerender: true to force a headless browser and waitForSelector with a selector for the content you need. The rules then run against the rendered DOM instead of the empty root element the server sends.'
    },
    {
      question: 'Why does my SPA scraping request return null fields?',
      answer:
        'Usually the rules ran before the data existed. Add waitForSelector for the exact element you extract; if fields stay null, open the page in your browser and check that the selector matches the rendered DOM and that the same page variant, device or locale, is being loaded.'
    },
    {
      question: 'Should I use waitForSelector or waitForTimeout on a JavaScript page?',
      answer:
        'Prefer waitForSelector. It resolves as soon as the element appears, while waitForTimeout always waits the full delay and can still be too short on a slow load. Keep waitForTimeout for pages with no stable selector to wait on.'
    },
    {
      question: 'How do I know whether the page was scraped with a browser?',
      answer:
        'Read the x-fetch-mode response header. prerender means a headless browser rendered the page and fetch means a plain HTTP request was enough. x-fetch-time shows how long that step took.'
    },
    {
      question: 'Can I scrape the JavaScript state of a page instead of its DOM?',
      answer:
        'Yes. An evaluate rule runs JavaScript in the page and returns its result, so it can read a global variable or parse the JSON a framework embeds for hydration. For clicks, loops or npm packages, move to a [remote Puppeteer function](/use-cases/scraping/run-puppeteer-without-chrome).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to scrape',
    headlineAccent: 'JavaScript apps',
    body: 'A real browser, the right wait and your rules in one request. Start on the free tier and scrape your first single-page app today.',
    href: '/features/scraping',
    label: 'Scrape a JavaScript page'
  },
  howTo: {
    name: 'How to scrape a JavaScript-rendered page',
    steps: [
      {
        title: 'Render the page in a browser',
        description:
          'Add prerender true so the page is loaded in a headless browser and its JavaScript runs before extraction.'
      },
      {
        title: 'Wait for the element you extract',
        description:
          'Set waitForSelector to the element your rules read, and waitUntil domcontentloaded to end navigation early.'
      },
      {
        title: 'Read the app state when it is cleaner',
        description:
          'Use an evaluate rule to run JavaScript in the page and return data the framework embeds, such as its hydration JSON.'
      }
    ]
  }
}
