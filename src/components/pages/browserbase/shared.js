import React from 'react'
import { colors } from 'theme'
import {
  Code as CodeIcon,
  Clock as ClockIcon,
  Cpu as CpuIcon,
  Grid as GridIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon
} from 'react-feather'

import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { GradientText } from 'components/patterns/ProductStory'

export const ACCENT_NAME = 'indigo'
export const ACCENT = colors.indigo8

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.indigo9} 0%,
  ${colors.indigo9} 48%,
  ${colors.indigo8} 48%,
  ${colors.indigo8} 52%,
  ${colors.blue7} 52%,
  ${colors.blue7} 65%,
  ${colors.blue6} 65%,
  ${colors.blue6} 79%,
  ${colors.cyan6} 79%,
  ${colors.cyan6} 100%
)`

export const BROWSERBASE_URL = 'https://www.browserbase.com'
export const BROWSERBASE_PRICING_URL = 'https://www.browserbase.com/pricing'
export const BROWSERBASE_DOCS_URL = 'https://docs.browserbase.com/introduction'
export const BROWSERBASE_FETCH_DOCS_URL =
  'https://docs.browserbase.com/platform/fetch/overview'
export const BROWSERBASE_SECURITY_DOCS_URL =
  'https://docs.browserbase.com/account/enterprise/security'

export const HERO = {
  title: 'The Browserbase alternative that renders in one call',
  description: (
    <Text as='span'>
      Browserbase has a one-call path — the Fetch API — but it never executes
      JavaScript, and it cannot return a screenshot or a PDF. Anything rendered
      means opening a browser session and paying by the browser-hour. Microlink
      renders every request in a real browser and returns the finished artifact
      from a single call.
    </Text>
  ),
  ctaHref: '/docs/api/getting-started/overview',
  ctaLabel: 'Get Started',
  mqlCode: {
    url: 'https://vercel.com',
    screenshot: true,
    data: { markdown: { attr: 'markdown' } }
  }
}

export const TIMINGS = {
  title: 'Send the URL',
  subtitle: 'Get the rendered result back',
  stats: [
    { healthcheckKey: 'screenshot', label: 'P95 screenshot' },
    { healthcheckKey: 'meta', label: 'P95 metadata' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CAPABILITIES = {
  title: (
    <>
      <GradientText>One call.</GradientText> Rendered, not fetched.
    </>
  ),
  caption:
    'Every Microlink request boots a real browser, runs the page, and returns the finished artifact. There is no cheaper tier that quietly skips JavaScript, and no session to open when the page turns out to need one.',
  items: [
    {
      icon: ZapIcon,
      title: 'JavaScript always runs',
      description:
        'Client-rendered apps, lazy-loaded content, and hydration are handled the same way on every request. Nothing degrades to a plain HTTP fetch behind your back.'
    },
    {
      icon: CodeIcon,
      title: 'Pick the output, not the pipeline',
      description: (
        <>
          Ask for <Link href='/markdown'>Markdown</Link>,{' '}
          <Link href='/html'>HTML</Link>,{' '}
          <Link href='/metadata'>metadata</Link>, a{' '}
          <Link href='/screenshot'>screenshot</Link>, a{' '}
          <Link href='/pdf'>PDF</Link>, or a custom{' '}
          <Link href='/docs/api/parameters/data'>data</Link> shape with CSS
          selectors — several of them in the same request.
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
          any npm package — page-level control without operating a session.
        </>
      )
    },
    {
      icon: ShieldIcon,
      title: 'Blocked targets are named',
      description: (
        <>
          <Link href='/features/antibot'>Antibot detection</Link> tells you
          which of 30+ providers refused the request on every plan, and{' '}
          <Link href='/features/proxy'>residential proxy resolution</Link>{' '}
          reroutes it on Pro.
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
          extract, and more — that return results instead of browser state.
        </>
      )
    },
    {
      icon: ClockIcon,
      title: 'Isolated and cacheable',
      description: (
        <>
          Every call runs in{' '}
          <Link href='/features/isolation'>one ephemeral browser</Link> behind
          an SSRF gate. Set a <Link href='/features/ttl'>ttl</Link> and repeat
          requests come back from the edge without booting a browser at all.
        </>
      )
    }
  ]
}

export const PATHS = {
  title: (
    <>
      <GradientText>What it takes</GradientText> to get the result.
    </>
  ),
  caption:
    'Browserbase splits the work across a fetcher, a browser session, and a search index, each metered separately. On Microlink every row below is the same endpoint and the same unit — one request.',
  columns: {
    output: 'What you want',
    browserbase: 'On Browserbase',
    microlink: 'On Microlink'
  },
  rows: [
    {
      output: 'Raw HTML of a static page',
      browserbase: 'Fetch API — from $0.50 per 1,000 calls, no JavaScript run',
      microlink: (
        <>
          <Link href='/html'>html</Link> — rendered, one request
        </>
      )
    },
    {
      output: 'Markdown of a static page',
      browserbase: 'Fetch Extract — $4 per 1,000 calls',
      microlink: (
        <>
          <Link href='/markdown'>markdown</Link> — one request
        </>
      )
    },
    {
      output: 'Markdown of a client-rendered app',
      browserbase: 'Out of scope for Fetch — open a session, pay browser-hours',
      microlink: 'The same one request'
    },
    {
      output: 'A screenshot',
      browserbase: 'A session you drive: connect Playwright or CDP and capture',
      microlink: (
        <>
          <Link href='/screenshot'>screenshot</Link> — a parameter on the call
        </>
      )
    },
    {
      output: 'A PDF',
      browserbase: 'A session you drive — Fetch cannot produce or convert PDFs',
      microlink: (
        <>
          <Link href='/pdf'>pdf</Link> — a parameter on the call
        </>
      )
    },
    {
      output: 'Structured fields from a rendered page',
      browserbase: 'Fetch Extract with a schema, but without JavaScript',
      microlink: (
        <>
          <Link href='/docs/api/parameters/data'>data</Link> with CSS selectors,
          after rendering
        </>
      )
    },
    {
      output: 'Google results as JSON',
      browserbase: 'Search API — $7 per 1,000 calls past the included quota',
      microlink: (
        <>
          <Link href='/search'>search</Link> — a request like any other, on paid
          plans
        </>
      )
    }
  ],
  footnote: (
    <>
      Fetch limits and pricing are Browserbase&#39;s own, published in the{' '}
      <Link href={BROWSERBASE_FETCH_DOCS_URL}>Fetch overview</Link> — “Fetch
      doesn&#39;t execute JavaScript and has a 5 MB content limit” — and on{' '}
      <Link href={BROWSERBASE_PRICING_URL}>browserbase.com/pricing</Link>, read
      August 2026. Per-call rates shown are Startup-plan overages; the Developer
      plan is $1 per 1,000 Fetch calls.
    </>
  )
}

export const COMPARISON = {
  title: (
    <>
      <GradientText>Capability by capability</GradientText>, side by side.
    </>
  ),
  caption: (
    <>
      Both platforms put a real browser behind an API. What differs is how much
      of the work you still do, what a call costs, and what ships in the box.
      Every Browserbase row comes from their{' '}
      <Link href={BROWSERBASE_DOCS_URL}>documentation</Link>,{' '}
      <Link href={BROWSERBASE_FETCH_DOCS_URL}>Fetch reference</Link> and{' '}
      <Link href={BROWSERBASE_PRICING_URL}>pricing page</Link>, including the
      last four, where Browserbase has capabilities Microlink does not.
    </>
  ),
  columns: ['Microlink', 'Browserbase'],
  rows: [
    {
      feature: 'Billing unit',
      href: '/pricing',
      microlink: '1 request',
      browserbase: '6 meters',
      highlight: true,
      note: 'Browserbase meters browser-hours, concurrency tier, proxy GB, Fetch calls, Search calls and agent runs. A Microlink request costs the same whatever it returns.'
    },
    {
      feature: 'JavaScript on the one-call path',
      href: '/markdown',
      microlink: true,
      browserbase: false,
      highlight: true,
      note: 'Browserbase Fetch “doesn’t execute JavaScript and has a 5 MB content limit”. Rendering means opening a session. Every Microlink request renders.'
    },
    {
      feature: 'Screenshot without writing browser code',
      href: '/screenshot',
      microlink: true,
      browserbase: false,
      highlight: true,
      note: 'A parameter on the Microlink request. On Browserbase you connect Playwright or CDP to a session and capture it yourself.'
    },
    {
      feature: 'PDF of the page',
      href: '/pdf',
      microlink: true,
      browserbase: false,
      highlight: true,
      note: 'pdf: true on any Microlink request. Fetch cannot produce or convert PDFs; a session can, through your own code.'
    },
    {
      feature: 'Response caching',
      href: '/features/ttl',
      microlink: true,
      browserbase: false,
      highlight: true,
      note: 'ttl from 1 minute to 31 days, served from the edge without booting a browser. No response cache is documented for Browserbase.'
    },
    {
      feature: 'Page metadata',
      href: '/metadata',
      microlink: true,
      browserbase: 'Schema',
      highlight: true,
      note: 'Title, description, author, date, logo, image and publisher, normalized. Browserbase reaches the same fields through a Fetch Extract schema you define.'
    },
    {
      feature: 'Named antibot blocker',
      href: '/features/antibot',
      microlink: true,
      browserbase: false,
      highlight: true,
      note: 'Microlink reports which of 30+ providers refused the request, on every plan. Browserbase offers proxies but documents no blocker attribution.'
    },
    {
      feature: 'Markdown',
      href: '/markdown',
      microlink: true,
      browserbase: true,
      note: 'Microlink renders first, and also converts PDFs and office documents. Browserbase Fetch Extract converts the fetched HTML.'
    },
    {
      feature: 'Structured extraction',
      href: '/docs/api/parameters/data',
      microlink: true,
      browserbase: true,
      note: 'CSS and regex rules against a rendered page on Microlink; a JSON schema against unrendered HTML on Browserbase.'
    },
    {
      feature: 'Run your own browser code',
      href: '/features/function',
      microlink: true,
      browserbase: true,
      note: 'Browser Functions give Microlink a Puppeteer page plus any npm package. Browserbase gives you the whole session in your own framework.'
    },
    {
      feature: 'Proxy for hard targets',
      href: '/features/proxy',
      microlink: true,
      browserbase: true,
      note: 'Residential routing on Microlink Pro, included in the request price. Browserbase bills proxy traffic per GB.'
    },
    {
      feature: 'MCP server',
      href: '/integrations/mcp',
      microlink: '20 tools',
      browserbase: '6 tools',
      note: 'Microlink tools each return a finished artifact. Browserbase tools drive a session: start, end, navigate, act, observe, extract.'
    },
    {
      feature: 'Search results',
      href: '/search',
      microlink: true,
      browserbase: true,
      note: 'Google results as JSON on Microlink paid plans. Browserbase does not disclose its index and caps Search at 120 requests per minute.'
    },
    {
      feature: 'Free tier',
      href: '/pricing',
      microlink: '25/day',
      browserbase: '1 hour',
      highlight: true,
      note: 'Microlink renews 25 rendered requests every day with no card. Browserbase gives 1 browser hour, 3 concurrent browsers and 15-minute sessions, plus 1,000 Fetch and 1,000 Search calls.'
    },
    {
      feature: 'Long-lived, stateful sessions',
      microlink: false,
      browserbase: true,
      note: 'Interactive logins, live view and human takeover need a session that outlives one call. Microlink runs one ephemeral browser per request.'
    },
    {
      feature: 'Agent framework primitives',
      microlink: false,
      browserbase: true,
      note: 'Stagehand ships act, extract and observe over the browser, alongside a sandboxed Runtime, Identity and a Model Gateway.'
    },
    {
      feature: 'File downloads from a page',
      microlink: false,
      browserbase: true,
      note: 'Browserbase syncs files a session downloads into cloud storage, retrievable through their API.'
    },
    {
      feature: 'SOC 2 and HIPAA',
      microlink: false,
      browserbase: true,
      note: 'Browserbase documents SOC 2 Type II, a HIPAA BAA on request, third-party penetration testing and four data-residency regions.'
    }
  ],
  note: 'Last verified: August 2026. Check each product’s docs for the latest.'
}
export const HONESTY = {
  title: (
    <>
      When <GradientText>Browserbase</GradientText> is the better pick.
    </>
  ),
  caption:
    'Microlink returns results, not a browser you hold open and script step by step. Several jobs really are about the browser — and a few are about the paperwork around it.',
  items: [
    {
      title: 'You drive the browser yourself',
      description:
        'When the work is Playwright, Puppeteer, Selenium, or Stagehand code against a live page — arbitrary clicks, multi-step flows, assertions you own — a managed session is the right shape, and Browserbase documents all four frameworks.'
    },
    {
      title: 'Long-lived, stateful sessions',
      description:
        'Interactive logins, human-in-the-loop takeover, and watching a running browser live all need a session that outlives a single call. Microlink runs one ephemeral browser per request and returns.'
    },
    {
      title: 'Cheap bulk HTML of static pages',
      description:
        'Fetch starts at $0.50 per 1,000 calls on the Startup plan for pages that need no JavaScript. If your targets are server-rendered and you only want the source, that is hard to beat on price alone.'
    },
    {
      title: 'A whole agent platform behind one key',
      description:
        'Stagehand, a sandboxed Runtime, Identity, a Model Gateway, and session observability ship together. Microlink is one API that returns web artifacts, not an agent runtime.'
    },
    {
      title: 'Files a page hands you',
      description:
        'A Browserbase session syncs files downloaded during automation into cloud storage, retrievable through their API. Microlink returns the artifact it rendered, not whatever a click made the page download.'
    },
    {
      title: 'Compliance and data residency',
      description:
        'Browserbase documents SOC 2 Type II, HIPAA with a BAA on request, third-party penetration testing, and regions in US West, US East, EU and Asia. If procurement asks for that list, ask them for it.'
    }
  ]
}

export const PRICING_CAPTION = (
  <Text as='span'>
    No browser-hours, no concurrency tier, no proxy GB, no separate meter for
    fetching and searching. One request is one API call — under €1 per 1,000
    requests on the entry Pro plan, and 25 a day free with no credit card.
  </Text>
)

export const CTA = {
  caption:
    'Point a URL at the API and get the rendered result back — screenshot, PDF, Markdown, or structured data. 25 requests a day, no account, no browser to operate.',
  ctaHref: '/docs/api/getting-started/overview',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'How Microlink compares to Browserbase, and when each one fits.'

export const FAQ_ITEMS = [
  {
    question: 'Does Microlink replace Browserbase, or sit next to it?',
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
    question:
      'Browserbase already has a Fetch API that returns Markdown. Why use Microlink?',
    text: 'Because Fetch does not execute JavaScript. Browserbase documents that limit directly, along with a 5 MB content cap, a 60 second timeout, and no PDF conversion. On a server-rendered page Fetch is an excellent, cheap tool. On a client-rendered app it returns the shell, and the fix is to open a browser session and pay by the browser-hour. Microlink renders every request in a real browser, so the same call works for both and the price does not change.',
    answer: (
      <>
        <div>
          Because Fetch does not execute JavaScript. Browserbase{' '}
          <Link href={BROWSERBASE_FETCH_DOCS_URL}>documents that limit</Link>{' '}
          directly, along with a 5 MB content cap, a 60 second timeout, and no
          PDF conversion.
        </div>
        <div>
          On a server-rendered page Fetch is an excellent, cheap tool. On a
          client-rendered app it returns the shell, and the fix is to open a
          browser session and pay by the browser-hour. Microlink{' '}
          <Link href='/markdown'>renders every request</Link> in a real browser,
          so the same call works for both and the price does not change.
        </div>
      </>
    )
  },
  {
    question: 'Can I still run custom browser code on Microlink?',
    text: 'Yes. Browser Functions execute your JavaScript against a live Puppeteer page, and the runtime installs any npm package you require() automatically, caching it for later runs. You get page-level control without opening and managing a session — but not a persistent, interactive browser you drive end to end.',
    answer: (
      <>
        <div>
          Yes. <Link href='/features/function'>Browser Functions</Link> execute
          your JavaScript against a live Puppeteer page, and the runtime
          installs any npm package you <code>require()</code> automatically,
          caching it for later runs.
        </div>
        <div>
          You get page-level control without opening and managing a session —
          but not a persistent, interactive browser you drive end to end.
        </div>
      </>
    )
  },
  {
    question: 'What replaces browser-hours and concurrency tiers?',
    text: 'Browserbase meters browser-hours, the concurrency tier you sit on, proxy GB, Fetch calls, Search calls, and agent runs — six units to forecast. Microlink charges one request per API call regardless of what comes back, which works out under €1 per 1,000 requests on the entry Pro plan. Set a ttl and a repeat request is served from the edge without booting a browser.',
    answer: (
      <>
        <div>
          Browserbase meters browser-hours, the concurrency tier you sit on,
          proxy GB, Fetch calls, Search calls, and agent runs — six units to
          forecast. Microlink charges{' '}
          <Link href='/pricing'>one request per API call</Link> regardless of
          what comes back, which works out under €1 per 1,000 requests on the
          entry Pro plan.
        </div>
        <div>
          Set a <Link href='/features/ttl'>ttl</Link> and a repeat request is
          served from the edge without booting a browser.
        </div>
      </>
    )
  },
  {
    question: 'Both ship an MCP server. What is the difference?',
    text: 'The Browserbase MCP server exposes six tools that operate a session — start, end, navigate, act, observe, and extract — so the agent is still driving a browser, one step at a time. Microlink MCP exposes 20 tools that each return a finished artifact: screenshot, PDF, Markdown, metadata, media, Lighthouse insights, and Google search. It works without an API key on the free tier, except Search, which needs a paid plan and a key.',
    answer: (
      <>
        <div>
          The Browserbase MCP server exposes six tools that operate a session —
          start, end, navigate, act, observe, and extract — so the agent is
          still driving a browser, one step at a time.
        </div>
        <div>
          <Link href='/integrations/mcp'>Microlink MCP</Link> exposes 20 tools
          that each return a finished artifact: screenshot, PDF, Markdown,
          metadata, media, Lighthouse insights, and Google search. It works
          without an API key on the free tier, except{' '}
          <Link href='/search'>Search</Link>, which needs a paid plan and a key.
        </div>
      </>
    )
  },
  {
    question: 'What happens on pages behind Cloudflare, DataDome, or Akamai?',
    text: 'Antibot detection runs on every plan and tells you which of 30+ providers refused the request, and the EPROXYNEEDED signal says when a target needs a residential exit rather than failing silently. Routing through the managed residential pool with proxy: true is a Pro capability. Browserbase also offers proxies, enabled per request and billed per GB.',
    answer: (
      <>
        <div>
          <Link href='/features/antibot'>Antibot detection</Link> runs on every
          plan and tells you which of 30+ providers refused the request, and the{' '}
          <b>EPROXYNEEDED</b> signal says when a target needs a residential exit
          rather than failing silently.
        </div>
        <div>
          Routing through the managed residential pool with{' '}
          <code>proxy: true</code> is a{' '}
          <Link href='/features/proxy'>Pro capability</Link>. Browserbase also
          offers proxies, enabled per request and billed per GB.
        </div>
      </>
    )
  },
  {
    question: 'Can Microlink keep a login session across requests?',
    text: 'No. Each Microlink request runs in its own ephemeral browser that is destroyed when the response is sent, so nothing carries over between calls. You can send cookies or authorization headers on an individual request, but an interactive login you keep alive and reuse is exactly the job Browserbase sessions and contexts exist for.',
    answer: (
      <>
        <div>
          No. Each Microlink request runs in its own{' '}
          <Link href='/features/isolation'>ephemeral browser</Link> that is
          destroyed when the response is sent, so nothing carries over between
          calls.
        </div>
        <div>
          You can send cookies or authorization{' '}
          <Link href='/features/headers'>headers</Link> on an individual
          request, but an interactive login you keep alive and reuse is exactly
          the job Browserbase sessions and contexts exist for.
        </div>
      </>
    )
  },
  {
    question: 'Which one is safer to point at untrusted URLs?',
    text: 'They solve different halves of it. Browserbase documents a dedicated VM per session, destroyed afterwards, plus SOC 2 Type II and HIPAA with a BAA on request. Microlink runs one ephemeral browser per call on every plan and refuses private, loopback, and link-local addresses before navigation, which is the SSRF case you hit when the URL comes from a user. If you need the audited compliance paperwork, Browserbase publishes it and Microlink does not.',
    answer: (
      <>
        <div>
          They solve different halves of it. Browserbase{' '}
          <Link href={BROWSERBASE_SECURITY_DOCS_URL}>documents</Link> a
          dedicated VM per session, destroyed afterwards, plus SOC 2 Type II and
          HIPAA with a BAA on request.
        </div>
        <div>
          Microlink runs{' '}
          <Link href='/features/isolation'>one ephemeral browser per call</Link>{' '}
          on every plan and refuses private, loopback, and link-local addresses
          before navigation — the SSRF case you hit when the URL comes from a
          user. If you need the audited compliance paperwork, Browserbase
          publishes it and Microlink does not.
        </div>
      </>
    )
  }
]

export const META = {
  title: 'Browserbase Alternative That Renders in One Call',
  description:
    'Browserbase alternative for teams tired of choosing between a fetcher that skips JavaScript and a browser billed by the hour. Microlink renders every request and returns Markdown, JSON, a screenshot or a PDF from one call.',
  structuredName: 'Microlink vs Browserbase',
  structuredDescription:
    'A comparison of Microlink and Browserbase for rendering web pages into screenshots, PDFs, Markdown, HTML and structured data, and for giving AI agents web access — a single rendered API call versus a cloud browser platform metered by browser-hour, Fetch call and proxy GB.',
  keywords: [
    'browserbase alternative',
    'browserbase vs microlink',
    'cloud browser api',
    'headless browser api',
    'url to markdown api',
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
