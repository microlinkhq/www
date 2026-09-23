export const CONTENT = {
  slug: 'scraping/run-puppeteer-without-chrome',
  head: {
    title: 'Run Puppeteer code without hosting Chrome',
    description:
      'Send a Puppeteer function and a URL, get the return value back. Microlink runs the headless browser, the sandbox and the cleanup for every call.'
  },
  hero: {
    title: 'Run Puppeteer as a service, with no Chrome to install or scale',
    intro:
      'Puppeteer as a service means you keep writing Puppeteer and stop running Chrome. Scrapers that need clicks, QA checks, data pulls from interactive pages and one-off automations all need a browser only for the seconds the script runs. With [Browser Functions](/function) you send the function with a URL and get its return value back.',
    cta: { label: 'Start with Browser Functions', href: '/function' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Headless Chrome is the heaviest dependency in a serverless stack',
    paragraphs: [
      'A Chromium build is too large for most function bundles, needs system fonts and libraries the runtime does not ship, and cold-starts slowly. On a server it leaks memory, leaves zombie processes behind after a crash and has to be upgraded in step with Puppeteer.',
      'Serverless Puppeteer workarounds trade one problem for another: trimmed Chromium builds pinned to old versions, layers that break on the next runtime upgrade, or a browser pool you now size, monitor and restart. None of it is the script you actually wanted to run.',
      'The [function method](/docs/sdk/methods/function) moves the browser behind the request. When your function references page, Microlink starts a headless browser, navigates to the URL and calls your function with the full Puppeteer Page. It returns whatever your function returns, plus profiling, and the browser is destroyed afterwards.'
    ]
  },
  how: {
    title: 'How to run Puppeteer as a service with microlink.function',
    intro:
      'Write the function as you would locally, but receive page instead of launching a browser. The navigation to the URL has already happened when your code starts.',
    steps: [
      {
        label: '1 · Your Puppeteer code, remote',
        sdk: "const { isFulfilled, value } = await microlink.function(\n  'https://news.ycombinator.com',\n  ({ page }) =>\n    page.$$eval('.titleline > a', links =>\n      links.slice(0, 5).map(a => ({ title: a.textContent, url: a.href }))\n    )\n)",
        note: 'The function receives page after navigation, along with url, headers and response. value is the array your function returned, and isFulfilled tells you it completed without throwing.'
      },
      {
        label: '2 · Prepare the page, pass your own arguments',
        sdk: "const { value } = await microlink.function(\n  'https://example.com/pricing',\n  ({ page, selector }) => page.$$eval(selector, rows => rows.map(row => row.innerText)),\n  { waitForSelector: '.plan', selector: '.plan' }\n)",
        note: 'API options such as waitForSelector, click or scripts prepare the page before your code runs. Any option that is not an API parameter, like selector here, arrives as a named argument.'
      },
      {
        label: '3 · The same function over HTTP',
        request: {
          url: 'https://example.com',
          params: {
            function: '({ page }) => page.title()',
            meta: false
          }
        },
        note: 'Without the SDK, send the function as a string in the function parameter. The result is under data.function with isFulfilled, value, profiling and logging.'
      }
    ],
    params: [
      {
        name: 'function',
        href: '/docs/api/parameters/function',
        note: 'The JavaScript to run. The SDK serializes and compresses it for you.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Waits for an element before the function is called.'
      },
      {
        name: 'scripts',
        href: '/docs/api/parameters/scripts',
        note: 'Injects a library such as jQuery into the page before your code runs.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'The SDK sends false by default so the request only pays for the function.'
      },
      {
        name: 'timeout',
        href: '/docs/api/parameters/timeout',
        note: 'The request ceiling: 30 seconds on free, 60 seconds on Pro.'
      }
    ],
    outro:
      'Plan limits are explicit: on the free plan a function gets 15 seconds, 64 MB of heap, 1024 bytes of compressed code, one in-flight run per IP and same-origin requests only. Pro raises that to 60 seconds, 128 MB, unlimited code size and concurrency, and unrestricted outgoing requests. The [profiling guide](/docs/guides/function/profiling-and-performance) shows where each run spends its time.'
  },
  why: {
    title: 'Why hosted headless Chrome beats a browser you maintain',
    intro:
      'The browser is infrastructure. The function is your product. Splitting them lets you ship the second without owning the first.',
    cards: [
      {
        kicker: 'Nothing to ship',
        title: 'No Chromium binary, no layer, no fonts.',
        body: 'Your code is a function, so it deploys anywhere Node.js, an edge runtime or a browser can make an HTTP call. The SDK compresses the function body before sending it, with brotli in Node.js and lz-string in browsers.',
        note: 'Try a function against a live page in the [editor](/editor) before wiring it into your code, and read the [Browser Functions feature](/features/function) for the full runtime.'
      },
      {
        kicker: 'Fails loudly',
        title: 'Errors come back as data, not crashes.',
        body: 'A function that throws resolves with isFulfilled false and the error name and message in value. Hitting a limit returns a named error such as TimeoutError or MemoryError whose message states the exact limit.',
        note: 'The [function troubleshooting guide](/docs/guides/function/troubleshooting) maps each error, including EINVALFUNCTION for syntax errors, to its fix.'
      },
      {
        kicker: 'Clean every time',
        title: 'A fresh, isolated browser per call.',
        body: 'Each request gets its own browser that is destroyed when the response is sent. No cookies or storage carry over between runs, so one job can never see another job’s state.',
        note: 'When not to: private and loopback targets such as localhost are refused with EFORBIDDENURL, so this is not a way to test a dev server, and flows that need state across many requests or more than 60 seconds belong on a browser you run. See [request isolation](/features/isolation).'
      }
    ]
  },
  faq: [
    {
      question: 'Can I run my existing Puppeteer script as a service?',
      answer:
        'Mostly as is. Remove the browser launch and the page.goto, take page from the function arguments and return the result. Everything after navigation, from page.click to page.$$eval, works unchanged because page is a full Puppeteer Page.'
    },
    {
      question: 'How long can a serverless Puppeteer function run?',
      answer:
        '15 seconds on the free plan and up to 60 seconds on Pro. Past that the function returns isFulfilled false with a TimeoutError. Replace fixed waits with waitForSelector and set meta: false to stay well inside the limit.'
    },
    {
      question: 'Can the hosted headless Chrome reach localhost or a private network?',
      answer:
        'No. Private, loopback and link-local addresses are rejected with EFORBIDDENURL before the browser starts. The target must be a public URL.'
    },
    {
      question: 'What happens when my Puppeteer function throws an error?',
      answer:
        'The promise still resolves. isFulfilled is false and value holds the error name and message. The promise only rejects when the API call itself fails, such as an invalid URL or an expired key.'
    },
    {
      question: 'Can a Puppeteer function use npm packages?',
      answer:
        'Yes. require() any package inside the function and it is installed on the fly and cached for later runs. [Run JavaScript with npm packages](/use-cases/scraping/npm-packages-remotely) covers version pinning and the sandbox restrictions.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to run Puppeteer',
    headlineAccent: 'without Chrome',
    body: 'Send a function, get a value. Start on the free tier and move your first script off your own browser today.',
    href: '/function',
    label: 'Run your first function'
  },
  howTo: {
    name: 'How to run Puppeteer code without hosting Chrome',
    steps: [
      {
        title: 'Send your Puppeteer function',
        description:
          'Call microlink.function with the URL and a function that receives page. The browser navigates to the URL before your code runs.'
      },
      {
        title: 'Prepare the page and pass arguments',
        description:
          'Add API options such as waitForSelector to prepare the page, and any other option to receive it as a named argument.'
      },
      {
        title: 'Read the result',
        description:
          'Check isFulfilled, then read value for the return value and profiling for the time spent per phase and the memory used.'
      }
    ]
  }
}
