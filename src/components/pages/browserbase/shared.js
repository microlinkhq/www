import React from 'react'
import { colors } from 'theme'
import {
  Grid as GridIcon,
  Code as CodeIcon,
  Clock as ClockIcon,
  Cpu as CpuIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon
} from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.orange7
export const TILE_BG = colors.orange0

export const BROWSERBASE_URL = 'https://www.browserbase.com'
export const BROWSERBASE_PRICING_URL = 'https://www.browserbase.com/pricing'

export const HERO = {
  title: 'The Browserbase alternative that returns the result',
  description:
    'Browserbase rents you a cloud browser to drive yourself. Microlink gives you the output — screenshot, PDF, Markdown, or structured data — from one API call. No sessions, no browser-hours, no Playwright to write.',
  ctaHref: '/docs/api/getting-started/overview',
  ctaLabel: 'Get Started',
  mqlCode: {
    url: 'https://browserbase.com',
    data: { markdown: { attr: 'markdown' } },
    meta: false
  }
}

export const CAPABILITIES = {
  title: 'Skip the session.',
  titleAccent: 'Keep the result.',
  caption:
    'A managed browser still leaves you to script Playwright, wait for the page, and shape the output yourself. Microlink runs the browser and hands back the finished artifact, so one HTTP call does what a whole session used to.',
  items: [
    {
      icon: ZapIcon,
      title: 'One call, not one session',
      description:
        'Send a URL, get a result. No session to open, drive over CDP, and tear down — the API returns the screenshot, PDF, Markdown, HTML, or JSON directly.'
    },
    {
      icon: CodeIcon,
      title: 'Structured output built in',
      description: (
        <>
          Ask for <Link href='/markdown'>Markdown</Link>,{' '}
          <Link href='/html'>HTML</Link>, <Link href='/metadata'>metadata</Link>
          , or a custom <Link href='/docs/api/parameters/data'>data</Link> shape
          with CSS selectors. Browserbase returns a browser; Microlink returns
          the data.
        </>
      )
    },
    {
      icon: CpuIcon,
      title: 'Run code when you need to',
      description: (
        <>
          <Link href='/features/function'>Browser Functions</Link> execute your
          JavaScript against a live Puppeteer page and <code>require()</code>{' '}
          any npm package — the same control, without renting the browser.
        </>
      )
    },
    {
      icon: ShieldIcon,
      title: 'Blocked targets handled',
      description: (
        <>
          Residential <Link href='/features/proxy'>proxy resolution</Link> and{' '}
          <Link href='/features/antibot'>antibot detection</Link> get past
          Cloudflare, DataDome, and Akamai, and tell you which of 30+ providers
          blocked a request.
        </>
      )
    },
    {
      icon: GridIcon,
      title: 'Made for AI agents',
      description: (
        <>
          The <Link href='/integrations/mcp'>Microlink MCP</Link> server gives
          an agent 20 web tools in natural language — screenshot, PDF, Markdown,
          extract, and more — no browser code to maintain.
        </>
      )
    },
    {
      icon: ClockIcon,
      title: 'Cached and isolated',
      description: (
        <>
          Every request runs in{' '}
          <Link href='/features/isolation'>one ephemeral browser</Link> with an
          SSRF gate. Set a <Link href='/features/ttl'>ttl</Link> and repeat
          requests return from the edge cache for free.
        </>
      )
    }
  ]
}

export const COMPARISON = {
  title: 'Rent a browser, or get the result',
  caption:
    'Browserbase is browser infrastructure for AI agents — you connect a framework and drive the browser. Microlink is an API that returns finished output. Where the two overlap, here is what each one hands back.',
  columns: { browserbase: 'Browserbase', microlink: 'Microlink' },
  rows: [
    {
      dimension: 'What you get back',
      browserbase: 'A live browser session you drive over CDP',
      microlink: (
        <>
          Finished output — <Link href='/screenshot'>screenshot</Link>,{' '}
          <Link href='/pdf'>PDF</Link>, <Link href='/markdown'>Markdown</Link>,{' '}
          <Link href='/html'>HTML</Link>, or JSON
        </>
      )
    },
    {
      dimension: 'How you call it',
      browserbase:
        'Connect Playwright, Puppeteer, Selenium, or Stagehand and script the page',
      microlink: 'One REST call, or one SDK method per result'
    },
    {
      dimension: 'URL to Markdown or JSON',
      browserbase: 'Fetch API returns HTML, JSON, or Markdown',
      microlink: (
        <>
          <Link href='/markdown'>markdown</Link>, <Link href='/html'>html</Link>
          , and <Link href='/docs/api/parameters/data'>data</Link> products, one
          call each
        </>
      )
    },
    {
      dimension: 'Web search for agents',
      browserbase: 'Search API for agent web search',
      microlink: (
        <>
          <Link href='/search'>search</Link> product — Google results as
          structured data
        </>
      )
    },
    {
      dimension: 'Run your own browser code',
      browserbase: 'Full session control in your framework',
      microlink: (
        <>
          <Link href='/features/function'>Browser Functions</Link> — Puppeteer
          page plus any npm package, no infrastructure
        </>
      )
    },
    {
      dimension: 'AI agent access',
      browserbase: 'Stagehand plus the Sessions API',
      microlink: (
        <>
          <Link href='/integrations/mcp'>20-tool MCP server</Link>, driven in
          natural language
        </>
      )
    },
    {
      dimension: 'Blocked targets',
      browserbase: 'Proxies billed per GB',
      microlink: (
        <>
          <Link href='/features/proxy'>Residential proxy resolution</Link> and{' '}
          <Link href='/features/antibot'>antibot transparency</Link> across 30+
          providers
        </>
      )
    },
    {
      dimension: 'Isolation',
      browserbase: 'Managed browser sessions',
      microlink: (
        <>
          <Link href='/features/isolation'>One ephemeral browser per call</Link>
          , SSRF blocked before navigation
        </>
      )
    },
    {
      dimension: 'Pricing model',
      browserbase: 'Browser-hours, concurrency tiers, and proxy GB',
      microlink: (
        <>
          <Link href='/pricing'>One request is one API call</Link>
        </>
      )
    },
    {
      dimension: 'Free tier',
      browserbase: '1 browser hour, 3 concurrent, 15-minute sessions',
      microlink: '25 requests per day, no credit card'
    }
  ],
  footnote: (
    <>
      Browserbase capabilities and pricing from{' '}
      <Link href={BROWSERBASE_URL}>browserbase.com</Link> and{' '}
      <Link href={BROWSERBASE_PRICING_URL}>browserbase.com/pricing</Link>,
      August 2026. No head-to-head benchmark is claimed for either side.
    </>
  )
}

export const HONESTY = {
  title: 'When Browserbase is the better pick',
  caption:
    'Microlink returns results, not a browser you script step by step. If the job is really about driving the browser, Browserbase is built for it.',
  items: [
    {
      title: 'You drive the browser yourself',
      description:
        'When the work is Playwright, Puppeteer, or Selenium code against a live page — arbitrary clicks, multi-step flows, and assertions you own — a managed session is the right shape.'
    },
    {
      title: 'Long-lived, stateful sessions',
      description:
        'Interactive logins, human-in-the-loop takeover, and live view of a running browser need a persistent session. Microlink runs one ephemeral browser per call and returns.'
    },
    {
      title: 'Stagehand agent primitives',
      description:
        'If you want an agent framework with act, extract, and observe layered over the browser, Stagehand is Browserbase’s own and is built around that model.'
    },
    {
      title: 'Enterprise agent runtime',
      description:
        'Verified agents, a session runtime, and compliance controls like a HIPAA BAA are platform features Microlink does not offer.'
    }
  ]
}

export const PRICING_CAPTION =
  'No browser-hours, no concurrency tiers, no proxy GB to meter. One request is one API call — start on the free tier with 25 requests a day and no credit card.'

export const CTA = {
  caption:
    'Point a URL at the API and get the finished result back — screenshot, PDF, Markdown, or structured data. 25 requests a day, no account, no browser to operate.',
  ctaHref: '/docs/api/getting-started/overview',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'How Microlink compares to Browserbase, and when each one fits.'

export const FAQ_ITEMS = [
  {
    question: 'Is Microlink a drop-in replacement for Browserbase?',
    text: 'Not exactly. Browserbase gives you a cloud browser you drive with Playwright, Puppeteer, Selenium, or Stagehand. Microlink is an API that returns finished output — a screenshot, PDF, Markdown, HTML, or structured JSON — from a single call. If you reach for a browser only to produce one of those results, Microlink replaces the whole session. If you need to script the browser yourself, keep Browserbase.',
    answer: (
      <>
        <div>
          Not exactly. Browserbase gives you a cloud browser you drive with
          Playwright, Puppeteer, Selenium, or Stagehand. Microlink is an API
          that returns finished output — a{' '}
          <Link href='/screenshot'>screenshot</Link>,{' '}
          <Link href='/pdf'>PDF</Link>, <Link href='/markdown'>Markdown</Link>,
          HTML, or structured JSON — from a single call.
        </div>
        <div>
          If you reach for a browser only to produce one of those results,
          Microlink replaces the whole session. If you need to script the
          browser yourself, keep Browserbase.
        </div>
      </>
    )
  },
  {
    question: 'Can I run custom browser code on Microlink?',
    text: 'Yes. Browser Functions execute your JavaScript against a live Puppeteer page, and the runtime installs any npm package you require() automatically. You get page-level control without opening and managing a session — but not a persistent, interactive browser you drive end to end.',
    answer: (
      <>
        <div>
          Yes. <Link href='/features/function'>Browser Functions</Link> execute
          your JavaScript against a live Puppeteer page, and the runtime
          installs any npm package you <code>require()</code> automatically.
        </div>
        <div>
          You get page-level control without opening and managing a session —
          but not a persistent, interactive browser you drive end to end.
        </div>
      </>
    )
  },
  {
    question: 'How does the pricing differ?',
    text: 'Browserbase meters browser-hours, concurrent browsers, and proxy GB. Microlink charges one request per API call, and a cached response still counts but returns from the edge in milliseconds. The free tier is 25 requests a day with no credit card.',
    answer: (
      <>
        <div>
          Browserbase meters browser-hours, concurrent browsers, and proxy GB.
          Microlink charges{' '}
          <Link href='/pricing'>one request per API call</Link>, and a cached
          response still counts but returns from the edge in milliseconds.
        </div>
        <div>The free tier is 25 requests a day with no credit card.</div>
      </>
    )
  },
  {
    question: 'Does Microlink work for AI agents like Browserbase does?',
    text: 'Yes. The Microlink MCP server exposes 20 web tools — screenshot, PDF, Markdown, extract, metadata, and more — that an agent calls in natural language, with no browser code to maintain. Browserbase targets agents that drive a full browser through Stagehand and the Sessions API; Microlink targets agents that just need the result of a web task.',
    answer: (
      <>
        <div>
          Yes. The <Link href='/integrations/mcp'>Microlink MCP</Link> server
          exposes 20 web tools — screenshot, PDF, Markdown, extract, metadata,
          and more — that an agent calls in natural language, with no browser
          code to maintain.
        </div>
        <div>
          Browserbase targets agents that drive a full browser through Stagehand
          and the Sessions API; Microlink targets agents that just need the
          result of a web task.
        </div>
      </>
    )
  },
  {
    question:
      'Which pages block automated requests — does Microlink get past them?',
    text: 'Every request runs in an isolated browser with a real fingerprint. For hard targets, residential proxy resolution routes around Cloudflare, DataDome, and Akamai, and antibot detection reports which of 30+ providers blocked a request instead of failing silently.',
    answer: (
      <>
        <div>
          Every request runs in an{' '}
          <Link href='/features/isolation'>isolated browser</Link> with a real
          fingerprint. For hard targets,{' '}
          <Link href='/features/proxy'>residential proxy resolution</Link>{' '}
          routes around Cloudflare, DataDome, and Akamai.
        </div>
        <div>
          <Link href='/features/antibot'>Antibot detection</Link> reports which
          of 30+ providers blocked a request instead of failing silently.
        </div>
      </>
    )
  }
]

export const META = {
  title: 'Browserbase Alternative',
  description:
    'Browserbase alternative: skip cloud browser sessions and browser-hours. Microlink returns a screenshot, PDF, Markdown, or JSON from one API call.',
  structuredName: 'Microlink vs Browserbase',
  structuredDescription:
    'A comparison of Microlink and Browserbase for capturing screenshots and PDFs, converting URLs to Markdown and HTML, extracting structured data, and giving AI agents web access — an API that returns results versus managed cloud browsers you drive.',
  keywords: [
    'browserbase alternative',
    'browserbase vs microlink',
    'cloud browser api',
    'headless browser api',
    'browser automation api',
    'ai agent browser api'
  ],
  about: [
    {
      name: 'Headless browser',
      sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
    },
    {
      name: 'Web scraping',
      sameAs: 'https://en.wikipedia.org/wiki/Web_scraping'
    },
    {
      name: 'Application programming interface',
      sameAs: 'https://en.wikipedia.org/wiki/API'
    }
  ]
}
