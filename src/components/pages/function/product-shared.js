import React from 'react'
import { colors } from 'theme'
import { CheckCircle, Code, Globe } from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.indigo8
export const ACCENT_NAME = 'indigo'

export const HERO = {
  title: 'Browser Function',
  titleAccent: 'as a Service',
  description:
    'Write a JavaScript function. Send a URL. Microlink runs the function remotely and returns whatever it returned — no Lambda, no browser fleet, no server to operate.',
  glanceCaption:
    'A function is just JavaScript. These five run remotely and return a value.',
  ctaHref: '/docs/guides/function',
  ctaLabel: 'Get Started',
  docsHref: '/docs/api/parameters/function',
  docsLabel: 'Read the docs'
}

export const GLANCE = {
  items: [
    {
      id: 'extract',
      title: 'Read the page',
      href: '/docs/guides/function/browser-interaction',
      span: 2,
      code: `const { value } = await microlink.function(
  'https://microlink.io',
  ({ page }) => page.evaluate(() => ({
    title: document.title,
    links: document.links.length,
    resources: performance.getEntriesByType('resource').length
  }))
)`
    },
    {
      id: 'click',
      title: 'Click, then scrape',
      href: '/docs/guides/function/browser-interaction',
      span: 2,
      code: `const { value } = await microlink.function(
  'https://news.ycombinator.com',
  async ({ page }) => {
    await page.click('a.morelink')
    await page.waitForSelector('.athing')
    return page.$$eval('.titleline a', els =>
      els.map(el => el.textContent)
    )
  }
)`
    },
    {
      id: 'proxy',
      title: 'Run through a proxy',
      href: '/docs/api/parameters/proxy',
      span: 2,
      code: `const { value } = await microlink.function(
  'https://github.com/microlinkhq/mql',
  async ({ page }) => {
    await page.waitForSelector('#repo-stars-counter-star')
    return page.$eval('#repo-stars-counter-star', el => el.title)
  },
  { proxy: { location: 'us' } }
)`
    },
    {
      id: 'inject',
      title: 'Inject a script',
      href: '/docs/guides/function/browser-interaction',
      span: 3,
      code: `const { value } = await microlink.function(
  'https://microlink.io',
  ({ page }) => page.evaluate(() =>
    $('a[href^="/docs"]').map((i, el) => el.href).get()
  ),
  { scripts: 'https://code.jquery.com/jquery-3.5.0.min.js' }
)`
    },
    {
      id: 'npm',
      title: 'require() a package',
      href: '/docs/guides/function/writing-functions',
      span: 3,
      code: `const { value } = await microlink.function(
  'https://microlink.io/blog',
  async ({ page }) => {
    const cheerio = require('cheerio')
    const $ = cheerio.load(await page.content())
    return $('article').map((i, el) => ({
      title: $(el).find('h2, h3').first().text(),
      href: $(el).find('a').attr('href')
    })).get()
  }
)`
    }
  ]
}

export const PRIMER = {
  title: 'Send a function',
  titleAccent: 'Get the result',
  caption:
    'You write a normal JavaScript function. Microlink serializes it, runs it in a sandbox, and sends back the return value. A browser starts only if the function uses page.',
  items: [
    {
      icon: Code,
      title: 'Write a function',
      description:
        'Any JavaScript. Return a number, a string, an array, or an object. No Lambda bundle and no special format — the same function you would run locally.'
    },
    {
      icon: Globe,
      title: 'Send it with a URL',
      description:
        'The function runs against that page. Mention page and Microlink starts a headless browser and gives you the full Puppeteer page object. Skip page and no browser starts.'
    },
    {
      icon: CheckCircle,
      title: 'Read the return value',
      description:
        'value is what the function returned. isFulfilled is false if it threw, and value then holds the error. profiling.phases shows install, build, spawn, and run.'
    }
  ]
}

export const SHOWCASE = {
  title: 'How a function runs',
  caption:
    'Start with a function that returns a value. Add a browser, a click, or a package only when you need them.',
  items: [
    {
      title: 'Your first function',
      description:
        'Pass a JavaScript function and a target URL. The function runs remotely. The return value is at value — the same way a local function returns.',
      href: '/docs/guides/function',
      cta: 'Your first function',
      mql: {
        url: 'https://example.com',
        function: '({ page }) => page.title()'
      }
    },
    {
      title: 'Skip the browser when you can',
      description:
        'When the function does not mention page, no Chrome starts. That is faster and cheaper. Extra parameters on the request are forwarded to the function, so one function can be reused.',
      href: '/docs/guides/function/writing-functions',
      cta: 'Writing functions',
      mql: {
        url: 'https://example.com',
        function: '() => 40 + 2'
      }
    },
    {
      title: 'Read the result',
      description:
        'A throw does not fail the HTTP request. isFulfilled tells you if the function finished. value is the return, or the error. profiling.phases shows where time went.',
      href: '/docs/guides/function/profiling-and-performance',
      cta: 'Errors and timings',
      mql: {
        url: 'https://example.com',
        function: '() => { throw new Error("boom") }'
      }
    },
    {
      title: 'Prefer extract() first',
      description:
        'If a CSS selector is enough, do not write a function. data is shorter, cheaper, and easier to reuse. Reach for Function when the first HTML is not the data.',
      href: '/docs/guides/data-extraction',
      cta: 'Data extraction',
      mql: {
        url: 'https://microlink.io',
        data: {
          title: { selector: 'title' },
          description: {
            selector: 'meta[name="description"]',
            attr: 'content'
          }
        }
      }
    },
    {
      title: 'page is a remote Chrome',
      description:
        'Name page and Microlink navigates first, then hands you the Puppeteer page object. title, $eval, $$eval, click, wait — the same API you use locally.',
      href: '/docs/guides/function/browser-interaction',
      cta: 'Browser interaction',
      mql: {
        url: 'https://microlink.io',
        function: `({ page }) => page.evaluate(() => ({
  title: document.title,
  links: document.links.length,
  resources: performance.getEntriesByType('resource').length
}))`
      }
    },
    {
      title: 'Click, wait, then scrape',
      description:
        'Pagination, “Load more”, and client-rendered lists are missing from the first HTML. Click, wait for the new nodes, then return the text or hrefs.',
      href: '/docs/guides/function/browser-interaction',
      cta: 'Drive the page',
      mql: {
        url: 'https://news.ycombinator.com',
        function: `async ({ page }) => {
  await page.click('a.morelink')
  await page.waitForSelector('.athing')
  return page.$$eval('.titleline a', els =>
    els.map(el => el.textContent)
  )
}`
      }
    },
    {
      title: 'require() a package',
      description:
        "Need cheerio or lodash? require it. The runtime detects the import, installs it in the sandbox, and caches it. No Lambda zip. Pin a version with require('cheerio@1.0.0').",
      href: '/docs/guides/function/writing-functions',
      cta: 'npm packages',
      mql: {
        url: 'https://microlink.io/blog',
        function: `async ({ page }) => {
  const cheerio = require('cheerio')
  const $ = cheerio.load(await page.content())
  return $('article').map((i, el) => ({
    title: $(el).find('h2, h3').first().text(),
    href: $(el).find('a').attr('href')
  })).get()
}`
      }
    },
    {
      title: 'Inject a script',
      description:
        'Function is another Microlink parameter, so you can prepare the page first. Pass scripts and the helper lands before the function runs.',
      href: '/docs/guides/function/browser-interaction',
      cta: 'Scripts and modules',
      mql: {
        url: 'https://microlink.io',
        function: `({ page }) => page.evaluate(() =>
  $('a[href^="/docs"]').map((i, el) => el.href).get()
)`,
        scripts: 'https://code.jquery.com/jquery-3.5.0.min.js'
      }
    },
    {
      title: 'Route through a proxy',
      description:
        'Datacenter IPs get blocked. Pin a country with proxy.location and the function runs after a residential navigation. Same value, harder target.',
      href: '/docs/api/parameters/proxy',
      cta: 'Proxy parameter',
      mql: {
        url: 'https://github.com/microlinkhq/mql',
        function: `async ({ page }) => {
  await page.waitForSelector('#repo-stars-counter-star')
  return page.$eval('#repo-stars-counter-star', el => el.title)
}`,
        proxy: { location: 'us' }
      }
    },
    {
      title: 'Cache the result',
      description:
        'Set ttl and a repeat of the same URL and function is served from the edge. The sandbox does not run again. Cache hits are free.',
      href: '/docs/api/parameters/ttl',
      cta: 'TTL parameter',
      mql: {
        url: 'https://example.com',
        function: "({ page }) => page.$eval('h1', el => el.textContent)",
        ttl: '1h'
      }
    }
  ]
}

export const FEATURES_INTRO = {
  title: 'What you can add',
  caption:
    'A function and a URL are enough to start. These are the options you can add on the same request.'
}

export const FEATURES = [
  {
    icon: 'Code',
    title: 'Microlink Function',
    description: 'Send a function and a URL. Read the return value.'
  },
  {
    icon: 'Globe',
    title: 'Browser on demand',
    description: 'Chrome starts only when the function uses page.'
  },
  {
    icon: 'Package',
    title: 'require() anything',
    description: 'require() installs on the fly. No zip, no install step.'
  },
  {
    icon: 'MousePointer',
    title: 'Click and paginate',
    description: 'Click, wait, then return the new nodes.'
  },
  {
    icon: 'FilePlus',
    title: 'Inject scripts',
    description: 'scripts lands in the page before the function runs.'
  },
  {
    icon: 'Shield',
    title: 'Residential proxy',
    description: 'proxy.location pins a country for blocked targets.'
  },
  {
    icon: 'Clock',
    title: 'TTL cache',
    description: 'ttl serves the same call from cache. Hits are free.'
  },
  {
    icon: 'Minimize2',
    title: 'Compression',
    description: 'gzip, brotli, or zstd on the wire.'
  },
  {
    icon: 'AlertCircle',
    title: 'Errors as values',
    description: 'A throw still resolves. Read isFulfilled and value.'
  },
  {
    icon: 'Activity',
    title: 'Profiling',
    description: 'profiling.phases breaks down install, build, spawn, run.'
  },
  {
    icon: 'Layers',
    title: 'Scope',
    description: 'Extra arguments become scope on the remote function.'
  },
  {
    icon: 'Type',
    title: 'TypeScript',
    description: 'Types ship with the SDK. No extra package.'
  },
  {
    icon: 'Terminal',
    title: 'CLI and HTTP',
    description: 'The same function from the SDK, CLI, or a GET.'
  },
  {
    icon: 'Lock',
    title: 'API token',
    description: 'Free is 25 requests/day. Pro raises the daily cap.'
  },
  {
    icon: 'Zap',
    title: 'Edge cache',
    description: 'A warm cache skips the sandbox on the next call.'
  }
]

export const HOW_TO = {
  name: 'How to use Microlink Function',
  description:
    'Write a JavaScript function, send it with a URL, and read the return value. A browser starts only if the function uses page.',
  steps: [
    {
      title: 'Write a function',
      description:
        'Any JavaScript. Return a number, a string, an array, or an object. No Lambda bundle and no special format — the same function you would run locally.'
    },
    {
      title: 'Send it with a URL',
      description:
        'The function runs against that page. Mention page and Microlink starts a headless browser and gives you the full Puppeteer page object. Skip page and no browser starts.'
    },
    {
      title: 'Read the return value',
      description:
        'value is what the function returned. isFulfilled is false if it threw, and value then holds the error. profiling.phases shows install, build, spawn, and run.'
    }
  ]
}

export const PRICING_CAPTION =
  'No signup, no API key, no credit card. Write a function and send it — 25 requests/day on the free plan.'

export const CTA = {
  caption:
    'Write a function. Send a URL. 25 requests/day, no account, no card.',
  ctaHref: '/docs/guides/function',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'The questions that come up the first time you send a function.'

export const FAQ_ITEMS = [
  {
    question: 'What is Microlink Function?',
    text: 'A way to run your JavaScript remotely. You send a function and a URL. Microlink executes the function in a sandbox — and starts a headless browser only if the function uses page — then returns the value. No Lambda bundle, no browser fleet, no server.'
  },
  {
    question: 'When does the function start a browser?',
    text: 'Only when your code references page. Without it, Microlink skips the headless browser entirely, so plain compute runs faster and cheaper. Reference page to get the full Puppeteer API for clicks, waits, and evaluation.'
  },
  {
    question: 'When should I use Function instead of extract()?',
    text: 'Start with extract() — declarative CSS-selector rules are shorter and easier to maintain. Escalate to Function when you need to click, wait, compute, or orchestrate custom logic that rules cannot express.',
    answer: (
      <>
        <div>
          Start with <Link href='/docs/guides/data-extraction'>extract()</Link>{' '}
          — declarative CSS-selector rules are shorter and easier to maintain.
        </div>
        <div>
          Escalate to <Link href='/docs/guides/function'>Function</Link> when
          you need to click, wait, compute, or orchestrate custom logic that
          rules cannot express.
        </div>
      </>
    )
  },
  {
    question: 'Can I require() npm packages?',
    text: "Yes. Any require() call is detected, installed on the fly into the sandbox, and cached for later runs. Pin a version with require('cheerio@1.0.0'). Operations such as spawning child processes or writing outside the sandbox are not permitted."
  },
  {
    question: 'What happens if my function throws?',
    text: 'The promise still resolves: result.isFulfilled comes back false and result.value carries the error as { name, message } so you handle failures in your own code.'
  },
  {
    question: 'Is Function available on the free plan?',
    text: 'Yes. Free runs get a 5-second timeout, 32 MB of memory, 1024 bytes of code, and one concurrent execution per IP. Pro plans extend the timeout up to 60 seconds, raise memory to 64 MB, and remove code-size and concurrency limits.'
  },
  {
    question: 'Does every call execute the function again?',
    text: 'Only on a cache miss. Set a ttl and any repeat request for the same URL and function inside that window is served from the edge cache instantly, at no cost and without running the sandbox again.'
  }
]

export const META = {
  title: 'Browser Functions API — Run JavaScript on Any Page',
  description:
    'Write a JavaScript function, send a URL, and get the return value. Microlink runs it in a remote sandbox — a headless browser only if you need one. Free to start, 25 requests/day.',
  structuredName: 'Microlink Function API',
  structuredDescription:
    'Write a JavaScript function, send it with a URL, and read the return value. A browser starts only if the function uses page. Optional Puppeteer, on-the-fly npm packages, no fleet to operate.',
  keywords: [
    'browser functions api',
    'run javascript remotely',
    'puppeteer api',
    'headless browser functions',
    'serverless browser automation',
    'microlink run',
    'serverless puppeteer',
    'require npm remotely',
    'run javascript on a url'
  ],
  about: [
    {
      name: 'Headless browser',
      sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
    },
    {
      name: 'Puppeteer',
      sameAs: 'https://en.wikipedia.org/wiki/Puppeteer_(software)'
    },
    {
      name: 'Serverless computing',
      sameAs: 'https://en.wikipedia.org/wiki/Serverless_computing'
    }
  ]
}
