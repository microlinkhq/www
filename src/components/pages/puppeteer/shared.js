import React from 'react'
import { colors } from 'theme'

import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { GradientText } from 'components/patterns/ProductStory/section'
import {
  FREE_PLAN_CONCURRENT_REQUESTS,
  FREE_PLAN_REQUESTS_PER_DAY,
  KEYLESS_REQUESTS_PER_DAY
} from 'helpers/free-tier'

export const ACCENT_NAME = 'green'
export const ACCENT = colors.green7

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.green9} 0%,
  ${colors.green9} 48%,
  ${colors.green8} 48%,
  ${colors.green8} 52%,
  ${ACCENT} 52%,
  ${ACCENT} 65%,
  ${colors.teal7} 65%,
  ${colors.teal7} 79%,
  ${colors.teal6} 79%,
  ${colors.teal6} 100%
)`

const PAGE_URL = 'https://microlink.io/alternative/puppeteer'

export const SOURCES = {
  installation: 'https://pptr.dev/guides/installation',
  supportedBrowsers: 'https://pptr.dev/supported-browsers',
  troubleshooting: 'https://pptr.dev/troubleshooting',
  lambdaQuotas:
    'https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html',
  sparticuz: 'https://github.com/Sparticuz/chromium',
  chromeReleaseCycle:
    'https://chromium.googlesource.com/chromium/src/+/HEAD/docs/process/release_cycle.md',
  browserless: 'https://github.com/microlinkhq/browserless',
  puppeteer: 'https://github.com/puppeteer/puppeteer'
}

const HN_TOP_STORIES = `({ page }) =>
  page.$$eval('.titleline > a', links =>
    links.slice(0, 5).map(a => ({ title: a.textContent, url: a.href }))
  )`

export const META = {
  title: 'Puppeteer Alternative: Headless Chrome as an API',
  description:
    'Run Puppeteer in production without hosting Chrome. Screenshots, PDFs and your own page code over one API, with no Chromium binary or zombie processes.'
}

export const HERO = {
  title: 'The Puppeteer alternative with no Chrome to run',
  description:
    'Keep the Puppeteer code and drop the browser fleet. Send a function that receives a Puppeteer page, or ask for a screenshot or PDF by parameter, and Microlink runs it in a fresh Chrome on its side.',
  cta: 'alternative-puppeteer:hero',
  ctaLabel: 'Get your free API key',
  secondaryHref: '/docs/api/parameters/function',
  secondaryLabel: 'Read the function docs',
  examplesLabel: 'Puppeteer examples',
  examples: [
    {
      label: 'Your code',
      mqlCode: {
        url: 'https://news.ycombinator.com',
        function: HN_TOP_STORIES,
        meta: false
      }
    },
    {
      label: 'Screenshot',
      mqlCode: {
        url: 'https://github.com/puppeteer/puppeteer',
        screenshot: true,
        meta: false
      }
    },
    {
      label: 'PDF',
      mqlCode: {
        url: 'https://pptr.dev',
        pdf: true,
        meta: false
      }
    }
  ]
}

export const OWNERSHIP = {
  title: (
    <>
      What you own when you <GradientText>run Puppeteer</GradientText>.
    </>
  ),
  caption: (
    <>
      <code>npm install puppeteer</code> and a ten-line script work on a laptop.
      Production adds a binary, a runtime and a process tree to look after.
      Every number below comes from the Puppeteer, AWS or Chromium docs, or from
      the @sparticuz/chromium repository.
    </>
  ),
  columns: ['The job', 'Running Puppeteer yourself', 'Microlink'],
  rows: [
    {
      job: 'The browser binary',
      self: 'Chrome for Testing downloads on install: about 170 MB on macOS, 282 MB on Linux, 280 MB on Windows.',
      microlink: 'Nothing to download. Your code makes an HTTP call.'
    },
    {
      job: 'Version upgrades',
      self: 'Each Puppeteer release pairs with one Chrome build (v25.17.0 with 157.0.8103.50), and Chrome ships a new major version every two weeks.',
      microlink: 'Chrome and Puppeteer upgraded on our side.'
    },
    {
      job: 'Serverless packaging',
      self: 'Lambda caps a zip deployment at 250 MB unzipped, layers included, and the Linux browser alone is larger. Either ship a container image (10 GB cap) and pay a larger cold start, or swap in the 130.62 MiB @sparticuz/chromium build.',
      microlink: 'No layer, no package budget to fit.',
      highlight: true
    },
    {
      job: 'System libraries and fonts',
      self: 'Chrome for Testing ships without its shared library dependencies. The Lambda runtime has no fonts, and the common trimmed build adds Open Sans only, no emoji.',
      microlink: 'Fonts and libraries installed once, for every call.'
    },
    {
      job: 'Zombie processes',
      self: 'Puppeteer’s own troubleshooting guide points to dumb-init or docker --init to reap Chrome processes left behind.',
      microlink:
        'A fresh browser per call, destroyed when the response is sent.',
      highlight: true
    },
    {
      job: 'Concurrency and queueing',
      self: 'You size the pool: how many browsers per box, how many pages per browser, what waits in the queue.',
      microlink: `Paid plans are capped by quota, never by rate. Free keys allow ${FREE_PLAN_CONCURRENT_REQUESTS} calls in flight.`
    },
    {
      job: 'Cold starts',
      self: 'Every new container or function launches Chrome before the first page loads.',
      microlink:
        'Your code launches no browser. Cache hits skip the browser entirely.'
    },
    {
      job: 'Proxies and antibot',
      self: 'You buy a proxy pool, rotate it, and detect blocks yourself.',
      microlink:
        'Proxy resolution included on Pro, and blocks named by provider.'
    },
    {
      job: 'Caching and retries',
      self: 'You build a cache in front of the browser and a retry loop around it.',
      microlink:
        'ttl from 1 minute to 31 days, and 2 backoff retries by default.'
    }
  ],
  footnote: (
    <>
      Download sizes from the Puppeteer{' '}
      <Link href={SOURCES.installation}>installation guide</Link>; version
      pairing from{' '}
      <Link href={SOURCES.supportedBrowsers}>supported browsers</Link>; release
      cadence from the Chromium{' '}
      <Link href={SOURCES.chromeReleaseCycle}>release cycle</Link> doc; the 250
      MB zip and 10 GB container image limits from{' '}
      <Link href={SOURCES.lambdaQuotas}>AWS Lambda quotas</Link>; the trimmed
      build size and font list from{' '}
      <Link href={SOURCES.sparticuz}>@sparticuz/chromium</Link>; libraries and
      zombie processes from Puppeteer{' '}
      <Link href={SOURCES.troubleshooting}>troubleshooting</Link>. The Microlink
      column links to <Link href='/docs/api/parameters/ttl'>ttl</Link>,{' '}
      <Link href='/docs/api/parameters/retry'>retry</Link>,{' '}
      <Link href='/features/proxy'>proxy</Link> and{' '}
      <Link href='/features/isolation'>request isolation</Link>. Last verified:
      November 2026.
    </>
  )
}

export const TIMINGS = {
  title: 'Send the page code',
  subtitle: 'Skip the browser fleet',
  stats: [
    { healthcheckKey: 'screenshot', label: 'P95 screenshot' },
    { healthcheckKey: 'pdf', label: 'P95 PDF' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const PRICING_CAPTION = (
  <Text>
    One request per call, whether it runs your{' '}
    <Link href='/function'>function</Link>, takes a{' '}
    <Link href='/screenshot'>screenshot</Link> or prints a{' '}
    <Link href='/pdf'>PDF</Link>. The rate holds at $1.07 per thousand calls
    whichever tier you pick, and a <Link href='/features/ttl'>cache hit</Link>{' '}
    costs nothing.
  </Text>
)

export const COMPARISON = {
  title: (
    <>
      <GradientText>Build or buy</GradientText>, row by row.
    </>
  ),
  caption: (
    <>
      Both run the same engine: Chrome, driven over the DevTools Protocol by
      Puppeteer. Microlink builds on{' '}
      <Link href={SOURCES.browserless}>browserless</Link>, its open-source
      driver on top of Puppeteer. The difference is who operates the browser.
      Puppeteer facts come from <Link href='https://pptr.dev'>pptr.dev</Link>{' '}
      and the <Link href={SOURCES.puppeteer}>Puppeteer repository</Link>, and
      the last four rows are where running it yourself wins.
    </>
  ),
  columns: ['Microlink', 'Self-hosted Puppeteer'],
  rows: [
    {
      feature: 'Run your own Puppeteer code',
      href: '/function',
      microlink: true,
      puppeteer: true,
      highlight: true,
      note: 'function receives page, a full Puppeteer Page already navigated to the URL, plus response and headers. Paid plans allow 60 seconds and 128 MB per run.'
    },
    {
      feature: 'Chrome install and upgrades',
      href: '/blog/why-we-still-run-chrome',
      microlink: 'Managed',
      puppeteer: 'You pin and upgrade',
      highlight: true,
      note: 'Puppeteer pairs each release with one Chrome for Testing build, and Chrome ships a major version every two weeks.'
    },
    {
      feature: 'Install footprint',
      microlink: '0 MB',
      puppeteer: '~282 MB on Linux',
      highlight: true,
      note: 'Lambda caps a zip deployment at 250 MB unzipped, layers included, and a container image at 10 GB.'
    },
    {
      feature: 'Fresh browser per call',
      href: '/features/isolation',
      microlink: true,
      puppeteer: 'createBrowserContext() per job',
      note: 'No cookies or storage carry over between Microlink calls. In Puppeteer, a new browser context shares no cookies or cache with the others.'
    },
    {
      feature: 'Screenshot, PDF, metadata, markdown',
      href: '/formats',
      microlink: 'One parameter each',
      puppeteer: 'You write each',
      note: 'page.screenshot() and page.pdf() exist in Puppeteer. Metadata and markdown are code you write and maintain.'
    },
    {
      feature: 'Response caching',
      href: '/features/ttl',
      microlink: '1 minute to 31 days',
      puppeteer: 'Your code',
      note: 'Default ttl is 24 hours, and a cache hit is not counted against the plan.'
    },
    {
      feature: 'Retries',
      href: '/docs/api/parameters/retry',
      microlink: '2 by default',
      puppeteer: 'Your code',
      note: 'Exponential backoff when the browser fails internally.'
    },
    {
      feature: 'Ads and cookie banners',
      href: '/features/adblock',
      microlink: 'Blocked by default',
      puppeteer: 'Write interception rules',
      note: 'Puppeteer blocks requests through page.setRequestInterception() and rules you maintain.'
    },
    {
      feature: 'Proxy for blocked targets',
      href: '/features/proxy',
      microlink: 'Included on Pro',
      puppeteer: 'Bring your own',
      note: 'proxy.location pins the exit country; proxy.url routes through a server you supply.'
    },
    {
      feature: 'Antibot detection',
      href: '/features/antibot',
      microlink: true,
      puppeteer: 'Your code',
      note: 'Microlink names the provider that blocked the request.'
    },
    {
      feature: 'Free tier',
      href: '/pricing',
      microlink: `${FREE_PLAN_REQUESTS_PER_DAY}/day`,
      puppeteer: 'Free, Apache-2.0',
      note: `Without signing up you get ${KEYLESS_REQUESTS_PER_DAY} calls daily; a free key raises that to ${FREE_PLAN_REQUESTS_PER_DAY}, no card asked. Puppeteer costs nothing to install, while the machine behind it bills by the hour.`
    },
    {
      feature: 'Session length',
      microlink: '60 s per call',
      puppeteer: 'Unbounded',
      note: 'A browser you launch stays open as long as your process does.'
    },
    {
      feature: 'Private network and localhost',
      microlink: false,
      puppeteer: true,
      note: 'Microlink refuses private and loopback targets with EFORBIDDENURL.'
    },
    {
      feature: 'Firefox',
      microlink: false,
      puppeteer: true,
      note: 'Puppeteer drives stable Firefox since v23.0.0. Microlink runs Chrome only.'
    },
    {
      feature: 'Launch flags and extensions',
      microlink: false,
      puppeteer: true,
      note: 'puppeteer.launch() takes any Chrome flag. Microlink launches the browser for you.'
    }
  ],
  note: 'Last verified: November 2026. Check pptr.dev for the latest Puppeteer and Chrome versions.'
}

export const HONESTY = {
  title: (
    <>
      When running <GradientText>Puppeteer yourself</GradientText> is the better
      pick.
    </>
  ),
  caption:
    'An API is the wrong tool for some Puppeteer jobs. Six of them, stated plainly.',
  items: [
    {
      title: 'Long sessions that keep state',
      description:
        'A login, then fifty clicks, then a download, all in one browser that stays open for an hour. Microlink gives each call a fresh browser and a 60-second ceiling on paid plans, so state across calls is yours to carry.'
    },
    {
      title: 'End-to-end tests',
      description:
        'Tests want the browser next to the code under test, deterministic and offline, running in CI. Puppeteer, or a test runner built on it, is the right tool there.'
    },
    {
      title: 'Intranet and localhost targets',
      description:
        'Microlink only resolves public addresses and refuses private and loopback ones with EFORBIDDENURL. A dev server, a staging box behind a VPN or an internal dashboard needs a browser inside that network.'
    },
    {
      title: 'Very high, steady volume',
      description:
        'At millions of pages a month on a flat, predictable load, a dedicated box can cost less per page than $1.07 per 1,000 requests. Count the hours spent keeping it up before you decide: self-hosting is cheaper only if it still wins with them included.'
    },
    {
      title: 'Latency-critical paths with a warm pool',
      description:
        'Microlink launches a fresh browser for every call, so a screenshot takes the P95 shown on this page. A Puppeteer browser you keep running answers browser.newPage() in-process with no launch at all, which is far faster when every millisecond sits in front of a user.'
    },
    {
      title: 'Full control of the browser',
      description:
        'Custom launch flags, extensions, a specific Chrome build or Firefox. puppeteer.launch() takes all of it; Microlink chooses the browser and its flags for you.'
    }
  ]
}

export const CTA = {
  caption:
    'Paste the body of the Puppeteer script you run today into a function call and compare the result.',
  cta: 'alternative-puppeteer:footer-cta',
  links: [
    {
      href: '/use-cases/scraping/run-puppeteer-without-chrome',
      label: 'Run Puppeteer without Chrome'
    }
  ]
}

export const FAQ_CAPTION =
  'What moves to the API, what stays in your code, and where the limits are.'

export const FAQ_ITEMS = [
  {
    question: 'Can I run my existing Puppeteer script on Microlink?',
    text: 'Mostly as is. Remove puppeteer.launch() and page.goto(), take page from the function arguments and return the result. Everything after navigation, from page.click() to page.$$eval(), works unchanged because page is a full Puppeteer Page. The function can require() npm packages, and the result comes back under data.function.',
    answer: (
      <div>
        Mostly as is. Remove <code>puppeteer.launch()</code> and{' '}
        <code>page.goto()</code>, take <code>page</code> from the function
        arguments and return the result. Everything after navigation, from{' '}
        <code>page.click()</code> to <code>page.$$eval()</code>, works unchanged
        because <code>page</code> is a full Puppeteer Page. The function can{' '}
        <code>require()</code> npm packages, and the result comes back under{' '}
        <code>data.function</code>. See{' '}
        <Link href='/docs/api/parameters/function'>function</Link> and{' '}
        <Link href='/docs/guides/function/writing-functions'>
          writing functions
        </Link>
        .
      </div>
    )
  },
  {
    question: 'Is there a Puppeteer screenshot API without writing code?',
    text: 'Yes. Set screenshot: true on a request and Microlink returns a hosted image URL, with full page, element, device and viewport as parameters. pdf: true does the same for page.pdf(). No function is needed for either.',
    answer: (
      <div>
        Yes. Set <code>screenshot: true</code> on a request and Microlink
        returns a hosted image URL, with{' '}
        <Link href='/docs/api/parameters/screenshot/fullPage'>full page</Link>,{' '}
        <Link href='/docs/api/parameters/screenshot/element'>element</Link>,{' '}
        <Link href='/docs/api/parameters/device'>device</Link> and{' '}
        <Link href='/docs/api/parameters/viewport'>viewport</Link> as
        parameters. <code>pdf: true</code> does the same for{' '}
        <code>page.pdf()</code>. No function is needed for either. See the{' '}
        <Link href='/screenshot'>Screenshot API</Link> and the{' '}
        <Link href='/pdf'>PDF API</Link>.
      </div>
    )
  },
  {
    question: 'Which browser runs my code?',
    text: 'Chrome. Microlink drives it through browserless, its open-source driver on top of Puppeteer, and keeps Chrome as the engine because the same rendering produces the screenshots, PDFs and DOM the API returns. Firefox is not available.',
    answer: (
      <div>
        Chrome. Microlink drives it through{' '}
        <Link href={SOURCES.browserless}>browserless</Link>, its open-source
        driver on top of Puppeteer, and keeps Chrome as the engine because the
        same rendering produces the screenshots, PDFs and DOM the API returns.
        Firefox is not available. Read{' '}
        <Link href='/blog/why-we-still-run-chrome'>
          why we still run Chrome
        </Link>
        .
      </div>
    )
  },
  {
    question: 'What are the limits of a function call?',
    text: `On paid plans a function gets 60 seconds, 128 MB of memory, unlimited code size and unrestricted outgoing requests. On the free plan it gets 15 seconds, 64 MB, 1024 bytes of code, ${FREE_PLAN_CONCURRENT_REQUESTS} concurrent requests and same-origin requests only. Hitting a limit returns a named error such as TimeoutError instead of failing the whole request.`,
    answer: (
      <div>
        On paid plans a function gets 60 seconds, 128&nbsp;MB of memory,
        unlimited code size and unrestricted outgoing requests. On the free plan
        it gets 15 seconds, 64&nbsp;MB, 1024 bytes of code,{' '}
        {FREE_PLAN_CONCURRENT_REQUESTS} concurrent requests and same-origin
        requests only. Hitting a limit returns a named error such as{' '}
        <code>TimeoutError</code> instead of failing the whole request. See{' '}
        <Link href='/docs/guides/function/troubleshooting'>
          function troubleshooting
        </Link>
        .
      </div>
    )
  },
  {
    question: 'Why not run Puppeteer on AWS Lambda?',
    text: 'You can, with work. Lambda caps a zip deployment at 250 MB unzipped including layers, and the Chrome for Testing build Puppeteer downloads is about 282 MB on Linux. One path is a container image, which Lambda accepts up to 10 GB, at the price of a larger cold start. The other is a trimmed build such as @sparticuz/chromium, with fonts added through a layer because the runtime ships none. Either way every cold start pays a browser launch.',
    answer: (
      <div>
        You can, with work. Lambda caps a zip deployment at 250&nbsp;MB unzipped
        including layers (<Link href={SOURCES.lambdaQuotas}>AWS quotas</Link>),
        and the Chrome for Testing build Puppeteer downloads is about
        282&nbsp;MB on Linux (
        <Link href={SOURCES.installation}>Puppeteer docs</Link>). One path is a
        container image, which Lambda accepts up to 10&nbsp;GB, at the price of
        a larger cold start. The other is a trimmed build such as{' '}
        <Link href={SOURCES.sparticuz}>@sparticuz/chromium</Link>, with fonts
        added through a layer because the runtime ships none. Either way every
        cold start pays a browser launch.
      </div>
    )
  },
  {
    question: 'How does pricing compare to running my own servers?',
    text: 'Every self-serve tier works out to $1.07 per thousand calls: $49 buys 46,000 a month and $450 buys 420,000, with cache hits billed at zero. A server bills a fixed amount each month, and on top of it come the hours spent upgrading Chrome, fixing fonts and reaping processes. Low or spiky traffic usually favors the API; very high, steady traffic can favor your own box, once those hours are counted.',
    answer: (
      <div>
        Every self-serve <Link href='/pricing'>tier</Link> works out to $1.07
        per thousand calls: $49 buys 46,000 a month and $450 buys 420,000, with{' '}
        <Link href='/features/ttl'>cache hits</Link> billed at zero. A server
        bills a fixed amount each month, and on top of it come the hours spent
        upgrading Chrome, fixing fonts and reaping processes. Low or spiky
        traffic usually favors the API; very high, steady traffic can favor your
        own box, once those hours are counted.
      </div>
    )
  },
  {
    question: 'Can I try it without a credit card?',
    text: `Yes. ${KEYLESS_REQUESTS_PER_DAY} requests a day need no key at all, and the free API key renews ${FREE_PLAN_REQUESTS_PER_DAY} requests every day with no card. Function, screenshot, PDF, metadata and markdown are all included on it.`
  }
]

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: META.title,
    description: META.description,
    url: PAGE_URL,
    about: {
      '@type': 'Thing',
      name: 'Puppeteer',
      sameAs: 'https://pptr.dev'
    },
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Microlink',
      keywords: [
        'puppeteer alternative',
        'puppeteer in production',
        'puppeteer screenshot api',
        'headless chrome api'
      ],
      applicationCategory: ['DeveloperApplication', 'WebAPI'],
      url: 'https://microlink.io/function',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        url: 'https://microlink.io/pricing'
      }
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text
      }
    }))
  }
]

export const TRADEMARKS =
  'Puppeteer, Chrome and Chromium are trademarks of Google LLC. Microlink is not affiliated with or endorsed by Google. Details about Puppeteer, Chrome and AWS Lambda come from their public documentation and may have changed since they were checked.'
