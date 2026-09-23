export const CONTENT = {
  slug: 'scraping/npm-packages-remotely',
  head: {
    title: 'Run JavaScript with npm packages on any URL',
    description:
      'Run JavaScript remotely with any npm package: require cheerio or lodash in a function, pin versions, and skip the browser when you do not need one.'
  },
  hero: {
    title: 'Run JavaScript remotely with any npm package and no deploy step',
    intro:
      'A run JavaScript remotely API is useful when the code is small and the setup around it is not. Parsing HTML with cheerio, normalizing data with lodash or computing a value next to the target site all need a runtime, dependencies and somewhere to host them. With [Browser Functions](/function) you send the function, require what you need, and get the return value back.',
    cta: { label: 'Start with Browser Functions', href: '/function' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A ten-line scraper should not need a deployment pipeline',
    paragraphs: [
      'The logic is short: fetch a page, load it into cheerio, pick a few values, return them. Around it you need a function host, a package.json, a bundle, a deploy, logs and a way to update the dependency when it ships a fix.',
      'Serverless platforms solve hosting but not the ceremony. Every new script is a new function to configure and deploy, packages have to be bundled ahead of time, and if the code sometimes needs a browser you are back to shipping Chromium alongside it.',
      'The function runtime installs dependencies for you. Any require() in your code is detected, installed in a sandbox and cached, and require(\'cheerio@1.0.0\') pins a version. When the function never references page, no browser starts at all, so plain JavaScript runs faster. The [writing functions guide](/docs/guides/function/writing-functions) covers each step.'
    ]
  },
  how: {
    title: 'How to run serverless JavaScript scraping with npm packages',
    intro:
      'Start without a browser. Add page only when the content you need is rendered by JavaScript on the target.',
    steps: [
      {
        label: '1 · Cheerio in the cloud, no browser',
        sdk: `const headings = async ({ url }) => {
  const cheerio = require('cheerio@1.0.0')
  const response = await fetch(url)
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`)
  const $ = cheerio.load(await response.text())
  return $('h2').map((_, el) => $(el).text().trim()).get()
}

const { isFulfilled, value } = await microlink.function(
  'https://example.com/docs',
  headings
)`,
        note: 'The function never touches page, so no browser starts. It fetches the target itself, which counts as a same-origin request and is allowed on every plan, and returns the headings as an array.'
      },
      {
        label: '2 · Cheerio over the rendered page',
        sdk: "const rendered = async ({ page }) => {\n  const cheerio = require('cheerio@1.0.0')\n  const $ = cheerio.load(await page.content())\n  return $('[data-price]').map((_, el) => $(el).attr('data-price')).get()\n}\n\nconst { value } = await microlink.function('https://app.example.com', rendered, {\n  waitForSelector: '[data-price]'\n})",
        note: 'Referencing page starts a browser and navigates first, so page.content() is the HTML after JavaScript ran. waitForSelector holds the call until the elements exist.'
      },
      {
        label: '3 · Reusable functions with parameters',
        sdk: "const pick = ({ url, fields }) => {\n  const { pick: select } = require('lodash')\n  return fetch(url)\n    .then(response => response.json())\n    .then(items => items.map(item => select(item, fields.split(','))))\n}\n\nconst { value } = await microlink.function(\n  'https://api.example.com/products.json',\n  pick,\n  { fields: 'id,name,price' }\n)",
        note: 'fields is not an API parameter, so it reaches the function as a named argument. One function serves many requests without changing its code.'
      }
    ],
    params: [
      {
        name: 'function',
        href: '/docs/api/parameters/function',
        note: 'The code to run. require() calls are detected and installed automatically.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Waits for an element before a function that uses page is called.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Skipped by default from the SDK, so the request only pays for the function.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Caches the function result like any other response, from 1 minute to 31 days. Pro plans.'
      }
    ],
    outro:
      'The first run of a new dependency set shows a high install time in profiling.phases; later runs with the same dependencies skip installation and it drops to zero. The [function reference](/docs/api/parameters/function#npm-packages) documents the install, build, spawn and run phases.'
  },
  why: {
    title: 'Why a remote function beats deploying a script per job',
    intro:
      'The unit you write is a function. The runtime, the dependencies and the browser are resolved per request, so there is nothing else to maintain.',
    cards: [
      {
        kicker: 'Dependencies on demand',
        title: 'require() is the whole install step.',
        body: 'Packages are parsed from your code, installed into an isolated sandbox, bundled and cached. Pin a version with the package@version form, or leave it off to get the latest release.',
        note: 'The [Browser Functions feature](/features/function) summarizes the runtime, and the [sitemap tool](/tools/sitemap) is built on this same function method.'
      },
      {
        kicker: 'Browser optional',
        title: 'Plain JavaScript runs without Chrome.',
        body: 'A function that does not reference page skips the browser entirely and is faster for it. The same call gains a full Puppeteer page the moment your code asks for one.',
        note: 'For click loops, waits and interaction, see [run Puppeteer without hosting Chrome](/use-cases/scraping/run-puppeteer-without-chrome).'
      },
      {
        kicker: 'Sandboxed',
        title: 'Clear limits, clear errors.',
        body: 'Free plans get 15 seconds, 64 MB, 1024 bytes of compressed code and same-origin requests only; Pro gets up to 60 seconds, 128 MB, unlimited code and any outgoing request. Each limit has its own named error.',
        note: 'When not to: packages that spawn child processes or write to the filesystem outside the sandbox fail with ERR_ACCESS_DENIED, and heavy CPU work can hit CpuTimeError. If a declarative rule can read the value, [scrape it to JSON](/use-cases/scraping/website-to-json) instead.'
      }
    ]
  },
  faq: [
    {
      question: 'Can I use cheerio in the cloud without deploying a server?',
      answer:
        'Yes. require(\'cheerio\') inside a function sent with microlink.function. The package is installed on the fly and cached, and the function can load HTML it fetched from the target or the rendered page.content() when it uses page.'
    },
    {
      question: 'Which npm packages can I require in a remote function?',
      answer:
        'Any package on npm, as long as it does not need restricted system capabilities. Spawning child processes and writing to the filesystem outside the sandbox are blocked, and a package that tries returns an ERR_ACCESS_DENIED error.'
    },
    {
      question: 'Why is the first run of my remote JavaScript function slower?',
      answer:
        'The first run installs and bundles the dependencies, which shows as install time in profiling.phases. The result is cached, so later runs with the same dependencies skip installation. Fewer packages mean shorter install and build phases.'
    },
    {
      question: 'Can serverless JavaScript scraping call other domains?',
      answer:
        'On Pro, yes: outgoing requests are unrestricted. On the free plan a function can only make same-origin requests to the target URL’s host, and a cross-origin call returns OutgoingRequestError. See [pricing](/pricing) for plan details.'
    },
    {
      question: 'How do I pin an npm package version in a remote function?',
      answer:
        'Append the version to the package name inside require, for example require(\'cheerio@1.0.0\'). Without a version the latest release is installed.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to run',
    headlineAccent: 'JavaScript remotely',
    body: 'Any npm package, no deploy step, a browser only when you ask for one. Start on the free tier and send your first function today.',
    href: '/function',
    label: 'Send your first function'
  },
  howTo: {
    name: 'How to run JavaScript with npm packages on a URL',
    steps: [
      {
        title: 'Require packages inside the function',
        description:
          'Write a function that calls require for the packages it needs, pinning versions with the package@version form.'
      },
      {
        title: 'Skip the browser when you can',
        description:
          'Fetch the target URL inside the function and parse it, so no browser starts. Reference page only when you need the rendered HTML.'
      },
      {
        title: 'Pass parameters and read the result',
        description:
          'Send custom options as named arguments, then check isFulfilled and read value and profiling from the response.'
      }
    ]
  }
}
