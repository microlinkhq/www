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

export const ACCENT_NAME = 'violet'
export const ACCENT = colors.violet7

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.violet9} 0%,
  ${colors.violet9} 48%,
  ${colors.violet8} 48%,
  ${colors.violet8} 52%,
  ${ACCENT} 52%,
  ${ACCENT} 65%,
  ${colors.pink7} 65%,
  ${colors.pink7} 79%,
  ${colors.pink6} 79%,
  ${colors.pink6} 100%
)`

const PAGE_URL = 'https://microlink.io/alternative/playwright'

export const PLAYWRIGHT = 'https://playwright.dev'
export const PLAYWRIGHT_REPO = 'https://github.com/microsoft/playwright'
export const PLAYWRIGHT_BROWSERS = 'https://playwright.dev/docs/browsers'
export const PLAYWRIGHT_DOCKER = 'https://playwright.dev/docs/docker'
export const PLAYWRIGHT_PAGE_API = 'https://playwright.dev/docs/api/class-page'
const PLAYWRIGHT_MCP_REPO = 'https://github.com/microsoft/playwright-mcp'

export const LAST_VERIFIED =
  'Last verified: November 2026. Check each product’s docs for the latest.'

export const META = {
  title: 'Playwright Alternative: Screenshot & PDF API',
  description:
    'Keep Playwright for tests. Move production screenshots, PDFs and scraping to one API call, without browser builds, Docker images or workers to run.'
}

export const HERO = {
  title: 'The Playwright alternative for production screenshots and PDFs',
  description:
    'Playwright was built to test your own app across three browsers. Reused as a screenshot, PDF or scraping service, it brings browser builds per release, a Docker image to pin, workers to size and proxies to buy. Microlink runs that browser for you: one request, one URL, the file or the data back.',
  cta: 'alternative-playwright:hero',
  ctaLabel: 'Get your free API key',
  secondaryHref: '/docs/guides/screenshot',
  secondaryLabel: 'Read the screenshot guide',
  examplesLabel: 'Playwright jobs as one request',
  examples: [
    {
      label: 'Screenshot',
      mqlCode: {
        url: 'https://playwright.dev',
        screenshot: { fullPage: true, type: 'jpeg' },
        device: 'iPhone 15 Pro',
        meta: false
      }
    },
    {
      label: 'PDF',
      mqlCode: {
        url: 'https://playwright.dev/docs/intro',
        pdf: { format: 'A4', margin: '1cm' },
        mediaType: 'screen',
        meta: false
      }
    },
    {
      label: 'Scrape',
      mqlCode: {
        url: 'https://news.ycombinator.com',
        waitForSelector: '.titleline',
        data: {
          stories: {
            selectorAll: '.athing',
            attr: {
              title: { selector: '.titleline > a', attr: 'text' },
              url: { selector: '.titleline > a', attr: 'href' }
            }
          }
        },
        meta: false
      }
    }
  ]
}

export const TIMINGS = {
  title: 'No browser to run',
  subtitle: 'The same request, every time',
  stats: [
    { healthcheckKey: 'screenshot', label: 'P95 screenshot' },
    { healthcheckKey: 'pdf', label: 'P95 PDF' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const OPERATIONS = {
  title: (
    <>
      What the test runner <GradientText>leaves to you</GradientText> in
      production.
    </>
  ),
  caption: (
    <>
      Playwright Test gives every test a fresh browser context and runs them in
      parallel. A production screenshot or PDF service needs more than that, and
      each item below is work the team owns once Playwright leaves CI. Sources:{' '}
      <Link href={PLAYWRIGHT_BROWSERS}>Browsers</Link> and{' '}
      <Link href={PLAYWRIGHT_DOCKER}>Docker</Link> in the Playwright docs.
    </>
  ),
  items: [
    {
      title: 'Browser builds per release',
      body: 'Each Playwright version needs specific browser binaries, installed with npx playwright install. They take a few hundred megabytes of disk, and every upgrade means installing them again.'
    },
    {
      title: 'A Docker image to pin',
      body: 'The official image is tagged by Playwright version, and a mismatch leaves Playwright unable to find its browsers. The docs recommend --ipc=host, without which Chromium can run out of memory and crash, and --init to reap zombie processes.'
    },
    {
      title: 'Untrusted pages need hardening',
      body: 'The Playwright docs advise against using its Docker image to visit untrusted websites. Scraping arbitrary URLs safely means a non-root user plus a seccomp profile to keep the Chromium sandbox on.'
    },
    {
      title: 'Workers, memory and timeouts',
      body: 'A test suite runs on a schedule. A production service gets traffic spikes, pages that never reach networkidle and tabs that leak memory, so someone sizes workers, sets timeouts and restarts what hangs.'
    },
    {
      title: 'Proxies and antibot',
      body: 'Your own staging server never blocks you. Production targets do, and Playwright ships no proxy pool or antibot detection: launch accepts a proxy server, and the rest is yours to buy and wire.'
    },
    {
      title: 'Storage and caching',
      body: 'page.screenshot and page.pdf return a buffer or write a file. Hosting it, serving it from a CDN and deciding when to render it again are left to the caller.'
    }
  ]
}

export const COMPARISON = {
  title: (
    <>
      <GradientText>Capability by capability</GradientText>, side by side.
    </>
  ),
  caption: (
    <>
      Both drive a real browser. Playwright is a library and test runner you
      host; Microlink is an API that hosts the browser and returns the result.
      Every Playwright row comes from{' '}
      <Link href={PLAYWRIGHT}>playwright.dev</Link> or the{' '}
      <Link href={PLAYWRIGHT_REPO}>Playwright repository</Link>, including the
      rows where Playwright is the better choice.
    </>
  ),
  columns: ['Microlink', 'Playwright'],
  rows: [
    {
      feature: 'Infrastructure to run',
      href: '/docs/guides/common/production-patterns',
      microlink: 'None, one HTTPS call',
      playwright: 'Browsers, image, workers',
      highlight: true,
      note: 'Playwright needs browser binaries matched to its version, and the official Docker image must match the Playwright version in the project.'
    },
    {
      feature: 'Billing unit',
      href: '/pricing',
      microlink: '1 request',
      playwright: 'Your servers',
      highlight: true,
      note: 'Microlink is $1.07 per 1,000 requests on every self-serve Pro plan, from $49 for 46,000 to $450 for 420,000. Playwright is free and open source; the cost is the compute, memory and time to keep it running.'
    },
    {
      feature: 'Screenshot',
      href: '/screenshot',
      microlink: true,
      playwright: true,
      note: 'Both capture the viewport, the full page or a single element. Microlink returns a CDN URL instead of a buffer.'
    },
    {
      feature: 'PDF',
      href: '/pdf',
      microlink: true,
      playwright: 'Chromium only',
      note: 'In the Playwright source, only the Chromium page implements page.pdf. Microlink renders every PDF in Chrome.'
    },
    {
      feature: 'Response caching',
      href: '/features/ttl',
      microlink: '1 minute to 31 days',
      playwright: 'Your code',
      note: 'ttl sets how long Microlink keeps a result at the edge. With Playwright, storing and reusing a capture is your code.'
    },
    {
      feature: 'Proxy for blocked targets',
      href: '/features/proxy',
      microlink: 'Managed on Pro',
      playwright: 'Bring your own',
      note: 'Microlink resolves a proxy automatically on Pro and proxy.location pins the exit country. Playwright accepts a proxy server at launch.'
    },
    {
      feature: 'Antibot reporting',
      href: '/features/antibot',
      microlink: true,
      playwright: 'Your code',
      note: 'Microlink names the antibot or CAPTCHA provider that blocked a request.'
    },
    {
      feature: 'Ad and tracker blocking',
      href: '/features/adblock',
      microlink: 'On by default',
      playwright: 'Write route rules'
    },
    {
      feature: 'Page metadata and markdown',
      href: '/metadata',
      microlink: true,
      playwright: 'Code you write',
      note: 'Microlink returns title, description, author, date, logo and markdown in the same response as the screenshot. Playwright can extract all of it too, with selectors and parsing code you maintain per site.'
    },
    {
      feature: 'Requests in parallel',
      href: '/docs/api/basics/rate-limit',
      microlink: 'Unthrottled on Pro',
      playwright: 'As many as you host',
      note: `On a paid Microlink plan, parallelism is capped only by the requests left in the month. A free key handles ${FREE_PLAN_CONCURRENT_REQUESTS} in flight. With Playwright, the ceiling is the browsers your machines can hold.`
    },
    {
      feature: 'Custom code on the page',
      href: '/function',
      microlink: 'Puppeteer API',
      playwright: 'Playwright API',
      note: 'Microlink Function hands your code a Puppeteer page, so Playwright code moves only after a rewrite: locators, auto-waiting and web-first assertions stay behind.'
    },
    {
      feature: 'MCP server for agents',
      href: '/integrations/mcp',
      microlink: true,
      playwright: true,
      note: 'Playwright MCP drives a browser through accessibility snapshots. Microlink MCP returns screenshots, PDFs, markdown and metadata per URL.'
    },
    {
      feature: 'Firefox and WebKit',
      microlink: false,
      playwright: true,
      highlight: true,
      note: 'Playwright drives Chromium, Firefox and WebKit with one API. Microlink runs Chrome only.'
    },
    {
      feature: 'Test runner and assertions',
      microlink: false,
      playwright: true,
      note: 'Playwright Test runs tests in parallel with browser isolation, auto-waiting and web-first assertions.'
    },
    {
      feature: 'Tracing and Trace Viewer',
      microlink: false,
      playwright: true
    },
    {
      feature: 'Codegen test recorder',
      microlink: false,
      playwright: true
    },
    {
      feature: 'Works offline and on localhost',
      microlink: false,
      playwright: true,
      note: 'Microlink fetches public URLs from its own network, so a dev server on localhost is out of reach.'
    },
    {
      feature: 'Free tier',
      href: '/pricing',
      microlink: `${FREE_PLAN_REQUESTS_PER_DAY}/day`,
      playwright: 'Open source',
      note: `Signing up for a Microlink key, with no card, gives ${FREE_PLAN_REQUESTS_PER_DAY} requests per day; without a key, ${KEYLESS_REQUESTS_PER_DAY} per day still go through. Playwright ships under Apache-2.0; the hosting bill is yours.`
    }
  ],
  note: LAST_VERIFIED
}

export const PRICING_CAPTION = (
  <Text>
    One price per 1,000 requests on every tier, with the browser, the proxy and
    the cache included. Spend the quota on{' '}
    <Link href='/screenshot'>screenshots</Link>, <Link href='/pdf'>PDFs</Link>{' '}
    or scraping in whatever mix the month needs, and stop sizing workers for the
    busiest hour.
  </Text>
)

export const CTA = {
  caption:
    'Take the URL your Playwright worker screenshotted last and send it as one request.',
  cta: 'alternative-playwright:footer-cta',
  links: [
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' },
    { href: '/docs/guides/pdf', label: 'Read the PDF guide' }
  ]
}

export const HONESTY = {
  title: (
    <>
      Where <GradientText>Playwright is the better tool</GradientText>.
    </>
  ),
  caption:
    'Microlink replaces the screenshot, PDF and scraping service. For testing your own app, keep Playwright.',
  items: [
    {
      title: 'Testing your own app',
      description:
        'Playwright Test brings the runner, fixtures, browser isolation, auto-waiting and web-first assertions. Microlink has no test runner and does not try to be one.'
    },
    {
      title: 'Firefox and WebKit',
      description:
        'Playwright drives Chromium, Firefox and WebKit with one API, so a Safari rendering bug shows up before release. Microlink runs Chrome only.'
    },
    {
      title: 'Debugging what happened',
      description:
        'The Trace Viewer records every action, DOM snapshot, network request and console message, and Codegen writes a test while you click. Microlink returns the result and the response headers.'
    },
    {
      title: 'Local, private and offline',
      description:
        'Playwright runs against localhost, behind a VPN or with no network at all, and costs nothing per run. Microlink fetches every URL from its own network and rejects private and internal addresses with EFORBIDDENURL, so an intranet page stays out of reach.'
    },
    {
      title: 'Answers in milliseconds',
      description:
        'Microlink starts an isolated browser for each request, so a capture takes seconds, as the P95 figures above show. A Playwright context kept open next to your app reuses a running browser and returns far sooner. When a user waits on the result, a warm pool you host wins.'
    },
    {
      title: 'Millions of captures on a flat curve',
      description:
        'At $1.07 per 1,000 requests, the API bill grows with every capture. A machine you already own and keep busy around the clock can undercut that per screenshot, as long as the hours spent on browser upgrades, crashes and Docker pins go on the same ledger.'
    }
  ]
}

export const FAQ_CAPTION =
  'What moves, what stays in Playwright, and what happens to the worker running page.screenshot today.'

export const FAQ_ITEMS = [
  {
    question: 'Should I replace Playwright in my test suite?',
    text: 'No. For end-to-end testing Playwright is the right tool: it runs Chromium, Firefox and WebKit, isolates every test, waits automatically and ships assertions, tracing and Codegen. Microlink replaces the other job Playwright often ends up doing, a production service that takes screenshots, prints PDFs or scrapes pages on demand.',
    answer: (
      <div>
        No. For end-to-end testing Playwright is the right tool: it runs
        Chromium, Firefox and WebKit, isolates every test, waits automatically
        and ships assertions, tracing and Codegen. Microlink replaces the other
        job Playwright often ends up doing, a production service that takes{' '}
        <Link href='/screenshot'>screenshots</Link>, prints{' '}
        <Link href='/pdf'>PDFs</Link> or scrapes pages on demand.
      </div>
    )
  },
  {
    question: 'Can I run my Playwright script on Microlink?',
    text: 'Not as is. Most screenshot and PDF scripts become query parameters: fullPage, format, device, waitForSelector, headers and the rest map one to one. For custom steps, the function parameter runs your JavaScript with a Puppeteer page, not a Playwright one, so locators and expect calls need rewriting as Puppeteer calls.',
    answer: (
      <div>
        Not as is. Most screenshot and PDF scripts become query parameters:{' '}
        <code>fullPage</code>, <code>format</code>, <code>device</code>,{' '}
        <code>waitForSelector</code>, <code>headers</code> and the rest map one
        to one. For custom steps, the{' '}
        <Link href='/docs/api/parameters/function'>function</Link> parameter
        runs your JavaScript with a Puppeteer page, not a Playwright one, so
        locators and <code>expect</code> calls need rewriting as Puppeteer
        calls.
      </div>
    )
  },
  {
    question: 'Does Microlink support Firefox or WebKit?',
    text: 'No. Microlink runs Chrome for every request, because one engine has to produce the screenshot, the PDF and the DOM consistently. If you need to see how a page renders in Safari or Firefox, run Playwright for that check.',
    answer: (
      <div>
        No. Microlink runs Chrome for every request, because one engine has to
        produce the screenshot, the PDF and the DOM consistently. The reasons
        are in{' '}
        <Link href='/blog/why-we-still-run-chrome'>
          Why we still run Chrome
        </Link>
        . If you need to see how a page renders in Safari or Firefox, run
        Playwright for that check.
      </div>
    )
  },
  {
    question: 'How do PDFs compare with page.pdf?',
    text: 'Both print through Chromium. Playwright implements page.pdf on Chromium only, so a Firefox or WebKit page cannot print. Microlink takes the same options as pdf parameters (format, margin, scale, pageRanges, landscape) and defaults to A4 where Playwright defaults to Letter. The PDF comes back as a CDN URL instead of a buffer.',
    answer: (
      <div>
        Both print through Chromium. Playwright implements <code>page.pdf</code>{' '}
        on Chromium only, so a Firefox or WebKit page cannot print. Microlink
        takes the same options as{' '}
        <Link href='/docs/api/parameters/pdf'>pdf</Link> parameters (format,
        margin, scale, pageRanges, landscape) and defaults to A4 where
        Playwright defaults to Letter. The PDF comes back as a CDN URL instead
        of a buffer.
      </div>
    )
  },
  {
    question: 'What does it cost compared with hosting Playwright?',
    text: 'Pro starts at $49 for 46,000 requests a month and tops out self-serve at $450 for 420,000, the same $1.07 per 1,000 at every step, with the browser, proxy resolution and edge cache included. Playwright costs nothing to download; what you pay for is the machines, the memory each browser holds, the proxies, and the engineering time spent keeping browser builds and the Docker tag in step.',
    answer: (
      <div>
        <Link href='/pricing'>Pro</Link> starts at $49 for 46,000 requests a
        month and tops out self-serve at $450 for 420,000, the same $1.07 per
        1,000 at every step, with the browser, proxy resolution and edge cache
        included. Playwright costs nothing to download; what you pay for is the
        machines, the memory each browser holds, the proxies, and the
        engineering time spent keeping browser builds and the Docker tag in
        step.
      </div>
    )
  },
  {
    question: 'What are the rate limits?',
    text: `Paid plans apply no throttling: run as many parallel requests as the monthly quota allows. The free API key runs ${FREE_PLAN_CONCURRENT_REQUESTS} requests at a time against ${FREE_PLAN_REQUESTS_PER_DAY} requests a day, and ${KEYLESS_REQUESTS_PER_DAY} a day work with no key at all.`,
    answer: (
      <div>
        Paid plans apply no throttling: run as many parallel requests as the
        monthly <Link href='/docs/api/basics/rate-limit'>quota</Link> allows.
        The free API key runs {FREE_PLAN_CONCURRENT_REQUESTS}&nbsp;requests at a
        time against {FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests a day, and{' '}
        {KEYLESS_REQUESTS_PER_DAY}&nbsp;a day work with no key at all.
      </div>
    )
  },
  {
    question: 'Does Microlink have an MCP server like Playwright MCP?',
    text: 'Yes, with a different job. Playwright MCP lets an agent drive a browser step by step through accessibility snapshots. The Microlink MCP server gives an agent one tool call per URL that returns a screenshot, a PDF, markdown or metadata, with no browser session to manage.',
    answer: (
      <div>
        Yes, with a different job.{' '}
        <Link href={PLAYWRIGHT_MCP_REPO}>Playwright MCP</Link> lets an agent
        drive a browser step by step through accessibility snapshots. The{' '}
        <Link href='/integrations/mcp'>Microlink MCP server</Link> gives an
        agent one tool call per URL that returns a screenshot, a PDF, markdown
        or metadata, with no browser session to manage.
      </div>
    )
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
      '@type': 'SoftwareApplication',
      name: 'Playwright',
      sameAs: PLAYWRIGHT
    },
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Microlink',
      keywords: [
        'playwright alternative',
        'playwright screenshot api',
        'playwright pdf api',
        'playwright scraping in production'
      ],
      applicationCategory: ['DeveloperApplication', 'WebAPI'],
      url: 'https://microlink.io/screenshot',
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
  'Playwright and Microsoft are trademarks of their respective owners. Microlink is not affiliated with or endorsed by them. Competitor details come from their public pages and may have changed since they were checked.'
