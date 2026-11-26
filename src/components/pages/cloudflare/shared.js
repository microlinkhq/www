import React from 'react'

import { Link } from 'components/elements/Link'
import {
  GradientText,
  MICROLINK_PLAN,
  faqPageStructured,
  formatCheckedAt
} from 'components/patterns/ProductStory'
import { missing } from 'components/patterns/ProductStory/price-comparison'
import { AlternativePricingTitle } from 'components/patterns/ProductStory/alternative-section'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import { formatNumber } from 'helpers/format-number'
import { DEFAULT_PLAN } from 'helpers/pro-plans'

const SECONDS_PER_HOUR = 3600
export const WORKERS_PAID_PRICE = 5
export const INCLUDED_BROWSER_HOURS = 10
const BROWSER_HOUR_PRICE = 0.09
const INCLUDED_CONCURRENT_BROWSERS = 10
const CONCURRENT_BROWSER_PRICE = 2
export const QUICK_ACTIONS_RATE_LIMIT = 30
const PAID_CONCURRENT_BROWSER_LIMIT = 200
const FREE_BROWSER_MINUTES_PER_DAY = 10
const FREE_QUICK_ACTIONS_INTERVAL_SECONDS = 10
const BROWSER_TIMEOUT_SECONDS = 60
export const SECONDS_PER_CAPTURE = 5

const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal
const BROWSER_HOURS = Math.round(
  (MICROLINK_VOLUME * SECONDS_PER_CAPTURE) / SECONDS_PER_HOUR
)
const QUICK_ACTIONS_BILL =
  WORKERS_PAID_PRICE +
  Math.max(0, BROWSER_HOURS - INCLUDED_BROWSER_HOURS) * BROWSER_HOUR_PRICE

export const VOLUME_LABEL = formatNumber(MICROLINK_VOLUME)
export const QUICK_ACTIONS_BILL_LABEL = `$${Math.round(QUICK_ACTIONS_BILL)}`
const WORKERS_PAID_LABEL = `$${WORKERS_PAID_PRICE}`
const QUICK_ACTIONS_TOTAL = `about ${QUICK_ACTIONS_BILL_LABEL}/month including the ${WORKERS_PAID_LABEL}\u00a0base`
export const BROWSER_HOUR_LABEL = `$${BROWSER_HOUR_PRICE.toFixed(2)}`
const CONCURRENT_BROWSER_LABEL = `$${CONCURRENT_BROWSER_PRICE}`
const CHECKED_AT = '2026-11-18'

export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='One request price.'
      highlight={'Everything\u00a0included.'}
    />
  ),
  caption: `Microlink bills requests: ${VOLUME_LABEL} for $${MICROLINK_PLAN.price}\u00a0per\u00a0month. Cloudflare\u00a0Workers\u00a0Paid bills browser hours: ${INCLUDED_BROWSER_HOURS} included for $${WORKERS_PAID_PRICE}\u00a0per\u00a0month, then ${BROWSER_HOUR_LABEL} per\u00a0hour.`,
  microlink: {
    cta: 'alternative-cloudflare:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: [
      'Screenshot, PDF, metadata, and markdown in one request',
      'Adblock, cookie banners, proxy, and CDN hosting included'
    ]
  },
  competitor: {
    name: 'Cloudflare Workers Paid',
    price: WORKERS_PAID_PRICE,
    period: 'per month + usage',
    volume: `${INCLUDED_BROWSER_HOURS} browser\u2011hours/month`,
    items: [
      `Free plan: ${FREE_BROWSER_MINUTES_PER_DAY}\u00a0browser\u2011minutes/day`,
      missing(
        `${QUICK_ACTIONS_RATE_LIMIT}\u00a0requests/second cap on Quick\u00a0Actions`
      ),
      `${BROWSER_HOUR_LABEL} per extra browser\u2011hour`,
      `${VOLUME_LABEL} captures at ~${SECONDS_PER_CAPTURE}\u00a0s each: ${QUICK_ACTIONS_TOTAL}`,
      `Browser sessions: ${INCLUDED_CONCURRENT_BROWSERS} concurrent included, then ${CONCURRENT_BROWSER_LABEL}\u00a0each`,
      missing(
        'Storage, caching, and delivery are your build (R2,\u00a0Cache\u00a0API)'
      )
    ],
    source: 'https://developers.cloudflare.com/browser-run/pricing/',
    checkedAt: CHECKED_AT
  },
  note: `Cloudflare’s compute bill is smaller. Microlink’s $${MICROLINK_PLAN.price} adds the storage, caching, delivery, banner handling, and proxy you would otherwise build.`
}

export const CTA = {
  caption:
    'One GET request in, one finished capture back. CDN\u2011hosted, banners removed, proxy on by\u00a0default.',
  cta: 'alternative-cloudflare:footer-cta',
  links: [
    { href: '/screenshot', label: 'Explore the Screenshot API' },
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' }
  ]
}

export const FAQ_CAPTION =
  'Billing models, limits, and what moving a Browser Run capture to Microlink takes.'

export const FAQ_ITEMS = [
  {
    question:
      'Is there a Cloudflare screenshot alternative that removes cookie banners automatically?',
    text: 'Yes, that is Microlink’s default behavior. The adblock parameter ships enabled, so ads, trackers, and cookie consent banners are stripped before the capture is taken, with automatic consent handling for supported providers. Cloudflare’s screenshot endpoint gives you the raw tools instead: rejectRequestPattern filters and addScriptTag injection. The blocklists and consent-dismissal scripts are yours to write and keep up to\u00a0date.',
    answer: (
      <>
        <div>
          Yes, that is Microlink’s default behavior. The{' '}
          <Link href='/docs/api/parameters/adblock'>adblock</Link> parameter
          ships enabled, so ads, trackers, and cookie consent banners are
          stripped before the capture is taken, with automatic consent handling
          for supported&nbsp;providers.
        </div>
        <div>
          Cloudflare’s screenshot endpoint gives you the raw tools instead:{' '}
          <b>rejectRequestPattern</b> filters and <b>addScriptTag</b> injection.
          The blocklists and consent&#8209;dismissal scripts are yours to write
          and keep up to&nbsp;date.
        </div>
      </>
    )
  },
  {
    question:
      'Can I embed a Cloudflare Browser Run screenshot directly in an image tag?',
    text: 'Not directly. Cloudflare’s endpoint is an authenticated POST: the request carries your API token, so it can never run from a browser tag. Every capture has to route through your backend, and storing, caching, and serving the binary is your job. Microlink screenshots are plain GET URLs that return a CDN-hosted image, so you can drop them into an image tag, a CSS background, or an Open Graph meta tag with no backend at\u00a0all.',
    answer: (
      <>
        <div>
          Not directly. Cloudflare’s endpoint is an authenticated POST: the
          request carries your API token, so it can never run from a browser
          tag. Every capture has to route through your backend, and storing,
          caching, and serving the binary is your&nbsp;job.
        </div>
        <div>
          Microlink screenshots are plain GET URLs that return a
          CDN&#8209;hosted image, so you can drop them into an image tag, a CSS
          background, or an Open Graph meta tag with no backend at all. See the{' '}
          <Link href='/docs/guides/screenshot'>screenshot&nbsp;docs</Link> for
          the embed&nbsp;patterns.
        </div>
      </>
    )
  },
  {
    question:
      'Why doesn’t Cloudflare’s screenshot endpoint include a proxy for blocked pages?',
    text: 'Cloudflare is the world’s largest bot-protection vendor. The walls that block screenshot requests are often Cloudflare’s own product. Its Browser Run docs are explicit that the configurable user agent does not bypass bot protection. Microlink ships a built-in proxy layer, on by default with any API key, that rotates proxies automatically when a target refuses the request, backed by detection for 30+ antibot and CAPTCHA\u00a0providers.',
    answer: (
      <>
        <div>
          Cloudflare is the world’s largest bot&#8209;protection vendor. The
          walls that block screenshot requests are often Cloudflare’s own
          product. Its Browser Run docs are explicit that the configurable user
          agent “does not bypass bot&nbsp;protection.”
        </div>
        <div>
          Microlink ships a{' '}
          <Link href='/features/proxy'>built&#8209;in proxy layer</Link>, on by
          default with any API key, that rotates proxies automatically when a
          target refuses the request, backed by{' '}
          <Link href='/features/antibot'>antibot&nbsp;detection</Link> for 30+
          antibot and CAPTCHA&nbsp;providers.
        </div>
      </>
    )
  },
  {
    question:
      'How does Cloudflare Browser Run pricing compare to Microlink for screenshots?',
    text: `The models are different shapes. Cloudflare bills browser time on top of a $${WORKERS_PAID_PRICE}/month Workers Paid plan: ${INCLUDED_BROWSER_HOURS} browser\u2011hours included, then ${BROWSER_HOUR_LABEL} per hour. Quick Actions such as the screenshot endpoint bill browser hours only. Browser Sessions (Puppeteer, Playwright, CDP) also bill ${CONCURRENT_BROWSER_LABEL} per concurrent browser beyond ${INCLUDED_CONCURRENT_BROWSERS}, measured on your daily peak, averaged over the month. At ~${SECONDS_PER_CAPTURE} seconds of browser time per capture, ${VOLUME_LABEL} Quick Actions screenshots come to about ${BROWSER_HOURS} browser\u2011hours, ${QUICK_ACTIONS_TOTAL}, before storage, caching, and delivery, which are separate work. Microlink bills finished screenshots at a flat rate: $${MICROLINK_PLAN.price}/month covers ${VOLUME_LABEL} requests with adblock, proxy routing, CDN\u2011hosted output, and caching included. A TTL of up to 31 days (any API key) means cache hits don’t spend your quota, and there is no rate limit on paid plans. A single request can even bundle the screenshot with the PDF, metadata, logo, and markdown. Cloudflare’s snapshot endpoint bundles HTML, a screenshot, and markdown, but a PDF is a separate call billed as separate browser\u00a0time.`
  },
  {
    question:
      'How do I migrate from the Cloudflare screenshot endpoint to Microlink?',
    text: 'The capture concepts map one-to-one: url stays url, fullPage becomes screenshot.fullPage, selector becomes screenshot.element, and viewport, waitForSelector, cookies, and setExtraHTTPHeaders all have direct equivalents. The main change is simpler plumbing: Microlink is a GET request with query parameters instead of an authenticated POST with a JSON body, and the response is a hosted image URL instead of a binary you need to\u00a0store.',
    answer: (
      <>
        <div>
          The capture concepts map one&#8209;to&#8209;one: <b>url</b> stays{' '}
          <b>url</b>, <b>fullPage</b> becomes <b>screenshot.fullPage</b>,{' '}
          <b>selector</b> becomes <b>screenshot.element</b>, and <b>viewport</b>
          , <b>waitForSelector</b>, <b>cookies</b>, and{' '}
          <b>setExtraHTTPHeaders</b> all have direct&nbsp;equivalents.
        </div>
        <div>
          The main change is simpler plumbing: Microlink is a GET request with
          query parameters instead of an authenticated POST with a JSON body,
          and the response is a hosted image URL instead of a binary you need to
          store. Start from the{' '}
          <Link href='/docs/guides/screenshot'>screenshot&nbsp;guide</Link>.
        </div>
      </>
    )
  },
  {
    question:
      'What are Cloudflare’s screenshot rate limits compared to Microlink?',
    text: `On the Workers Free plan, Cloudflare allows ${FREE_BROWSER_MINUTES_PER_DAY} minutes of browser time per day and 1 Quick Actions request every ${FREE_QUICK_ACTIONS_INTERVAL_SECONDS} seconds, with a ${BROWSER_TIMEOUT_SECONDS}\u2011second browser timeout. The paid plan raises that to ${QUICK_ACTIONS_RATE_LIMIT} Quick Actions requests per second and ${PAID_CONCURRENT_BROWSER_LIMIT} concurrent browsers per account for Puppeteer and Playwright sessions. Microlink’s free API key gives you ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, with every Pro feature, and there is no rate limit on paid plans: you spend your monthly quota at whatever rate your workload\u00a0needs.`
  },
  {
    question: 'When is Cloudflare Browser Run the better choice?',
    text: 'When you need a programmable browser. If your code already lives in Cloudflare Workers, bindings give you a headless browser with no extra auth hop, and persistent Puppeteer, Playwright, and CDP sessions cover automation well beyond captures. Its crawling and AI\u2011extraction endpoints also go past what a screenshot API covers. If that is your workload, Browser Run (formerly Browser Rendering) is a different product. This page is about the screenshot use\u00a0case.'
  },
  {
    question: 'Why is there no live benchmark against Cloudflare on this page?',
    text: 'Microlink’s open screenshot benchmark measures dedicated screenshot SaaS providers over identical cold-start runs. Cloudflare’s endpoint is account-scoped infrastructure with its own rate limits, so it has not been through that suite yet. We only publish numbers we have measured. The comparison on this page sticks to documented capabilities, pricing, and limits from each product’s own\u00a0docs.',
    answer: (
      <>
        <div>
          Microlink’s open{' '}
          <Link href='/benchmarks/screenshot-api'>screenshot benchmark</Link>{' '}
          measures dedicated screenshot SaaS providers over identical
          cold&#8209;start runs. Cloudflare’s endpoint is account&#8209;scoped
          infrastructure with its own rate limits, so it has not been through
          that suite&nbsp;yet.
        </div>
        <div>
          We only publish numbers we have measured. The comparison on this page
          sticks to documented capabilities, pricing, and limits from each
          product’s own&nbsp;docs.
        </div>
      </>
    )
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

export const CLOUDFLARE_CURL = `URL=https://api.cloudflare.com\\
/client/v4/accounts/$ACCOUNT_ID\\
/browser-run/screenshot
PAGE=https://example.com
JSON=application/json
curl -X POST "$URL" \\
  --oauth2-bearer "$API_TOKEN" \\
  -H "Content-Type: $JSON" \\
  -d "{\\"url\\":\\"$PAGE\\"}" \\
  --output screenshot.png`

export const MICROLINK_CURL = `curl -G https://api.microlink.io \\
  -d url=https://example.com \\
  -d screenshot`

export const LIVE_SCREENSHOT_URL =
  'https://api.microlink.io/?url=https%3A%2F%2Fwww.cloudflare.com&screenshot'

export const LIVE_SCREENSHOT_HOST = 'api.microlink.io'

export const LIVE_SCREENSHOT_QUERY = '?url=cloudflare.com'

export const LIVE_SCREENSHOT_FLAG = '&screenshot'

const PROXY_COUNTRIES = 181

const COMPARISON_DATA = [
  {
    feature: 'Free tier with proxy and every paid\u00a0feature',
    microlink: true,
    cloudflare: false,
    note: `Cloudflare’s Workers Free plan allows ${FREE_BROWSER_MINUTES_PER_DAY} browser\u2011minutes per day and 1 Quick Actions request every ${FREE_QUICK_ACTIONS_INTERVAL_SECONDS}\u00a0seconds.`
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    cloudflare: `${QUICK_ACTIONS_RATE_LIMIT}/s on Quick\u00a0Actions`
  },
  { feature: 'PDF generation', microlink: true, cloudflare: true },
  {
    feature: 'Screenshot + PDF + metadata in one\u00a0request',
    microlink: true,
    cloudflare: false,
    note: 'Cloudflare /snapshot bundles HTML, a screenshot, and markdown; a PDF is a separate Quick Actions call, billed as its own browser\u00a0time.'
  },
  {
    feature: 'Cookie banner removal (on by\u00a0default)',
    microlink: true,
    cloudflare: false,
    note: 'Microlink ships adblock enabled by default, with automatic consent\u2011banner\u00a0handling.'
  },
  {
    feature: 'Ad & tracker blocking\u00a0engine',
    microlink: true,
    cloudflare: 'Partial',
    note: 'Cloudflare exposes manual rejectRequestPattern / rejectResourceTypes filters. The blocklist is yours to\u00a0maintain.'
  },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    cloudflare: false
  },
  {
    feature: 'Proxy\u00a0geolocation',
    note: 'Microlink proxy.location takes any of 181 ISO country codes on every API key, free\u00a0included.',
    microlink: `${PROXY_COUNTRIES}\u00a0countries`,
    cloudflare: false
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    cloudflare: false,
    note: 'Detected providers include Cloudflare’s own bot\u00a0management.'
  },
  {
    feature: 'Hosted capture URLs (CDN\u00a0delivery)',
    microlink: true,
    cloudflare: false
  },
  {
    feature: 'Direct embed (no\u00a0backend)',
    microlink: true,
    cloudflare: false
  },
  { feature: 'Metadata\u00a0extraction', microlink: true, cloudflare: false },
  {
    feature: 'Link\u00a0previews',
    note: (
      <>
        <Link href='/link-preview'>Link preview API</Link> returns the oEmbed
        iframe, card fields, and media in one&nbsp;call.
      </>
    ),
    microlink: true,
    cloudflare: false
  },
  {
    feature: 'Browser chrome\u00a0overlay',
    microlink: true,
    cloudflare: false
  },
  {
    feature: 'Animated capture\u00a0(MP4)',
    microlink: true,
    cloudflare: false
  },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    cloudflare: false
  },
  {
    feature: 'Full browser sessions (Puppeteer / Playwright /\u00a0CDP)',
    microlink: 'Partial',
    cloudflare: true,
    note: 'Microlink exposes Puppeteer through the function parameter; Cloudflare offers persistent\u00a0sessions.'
  },
  {
    feature: 'Multi\u2011page\u00a0crawling',
    microlink: false,
    cloudflare: true
  },
  {
    feature: 'AI\u2011prompt JSON\u00a0extraction',
    microlink: false,
    cloudflare: true
  },
  {
    feature: 'Workers\u2011native\u00a0bindings',
    microlink: false,
    cloudflare: true
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'A screenshot URL in one GET\u00a0request',
    description: (
      <>
        Cloudflare’s endpoint is an authenticated POST that returns raw binary:
        your API token can never touch a browser tag, so every capture routes
        through your backend, and <b>storing, caching, and serving</b> the image
        is your job. Microlink returns a <b>CDN&#8209;hosted URL</b> you can
        drop straight into an image&nbsp;tag.
      </>
    )
  },
  {
    number: '02',
    title: 'Popups and cookie banners gone by\u00a0default',
    description: (
      <>
        Microlink ships <Link href='/docs/api/parameters/adblock'>adblock</Link>{' '}
        enabled by default: ads, trackers, and cookie consent banners are
        stripped <b>before the page renders</b>. On Cloudflare you get{' '}
        <b>rejectRequestPattern</b> and <b>addScriptTag</b>. The blocklists and
        consent&#8209;dismissal scripts are yours to write and&nbsp;maintain.
      </>
    )
  },
  {
    number: '03',
    title: 'A proxy layer with no\u00a0setup',
    description: (
      <>
        When a target blocks the request, Microlink’s{' '}
        <Link href='/features/proxy'>built&#8209;in proxy layer</Link> rotates
        proxies automatically, on by default, plus{' '}
        <Link href='/features/antibot'>antibot&nbsp;detection</Link> for 30+
        antibot and CAPTCHA providers, Cloudflare included. Cloudflare sells the
        bot protection those walls are made of; its own docs state the
        configurable user agent <b>“does not bypass bot&nbsp;protection.”</b>
      </>
    )
  },
  {
    number: '04',
    title: 'One request, the whole\u00a0platform',
    description: (
      <>
        A single API call can return the <b>screenshot</b>, the <b>PDF</b>, the{' '}
        <b>metadata</b> (title, description, logo, brand image) and even{' '}
        <b>markdown</b>, all at the same per&#8209;request price. On Cloudflare,
        the snapshot endpoint bundles HTML, a screenshot, and markdown, while a
        PDF is a separate call billed as separate browser&nbsp;time.
      </>
    )
  },
  {
    number: '05',
    title: 'Presentation\u2011ready output from\u00a0parameters',
    description: (
      <>
        Browser chrome <b>overlays</b> with light/dark themes and custom
        backgrounds, <b>dark&#8209;mode capture</b>, named <b>device presets</b>{' '}
        like iPhone 15 Pro Max, and <b>animated MP4</b> recordings, each one a
        query parameter. Cloudflare’s endpoint exposes viewport numbers and PNG,
        JPEG, or&nbsp;WebP.
      </>
    )
  },
  {
    number: '06',
    title: 'A free tier with the whole browser\u00a0API',
    description: (
      <>
        Microlink gives you{' '}
        <b>
          {FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit
          card
        </b>
        , with every Pro feature. Cloudflare’s free tier needs an account ID
        plus a scoped API token, and caps you at{' '}
        <b>10 minutes of browser time per day</b> and 1 request every
        10&nbsp;seconds.
      </>
    )
  },
  {
    number: '07',
    title: 'Open\u2011source core\u00a0(MIT)',
    description: (
      <>
        Browserless, Metascraper, and MQL are <b>MIT-licensed</b> on GitHub.
        Read the core engine, fork it, or self&#8209;host it. Browser Run is a
        closed managed service inside the Cloudflare&nbsp;platform.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'You live inside Cloudflare\u00a0Workers',
    description:
      'Workers bindings call the browser directly from your Worker code with no extra auth hop, and compose with R2, KV, and\u00a0Queues.'
  },
  {
    title: 'Persistent browser\u00a0sessions',
    description:
      'Puppeteer, Playwright, and CDP sessions stay open across steps, for logins and multi\u2011step automation. Microlink runs Puppeteer per request through the function\u00a0parameter.'
  },
  {
    title: 'Crawling and AI\u00a0extraction',
    description:
      'A crawl endpoint runs multi\u2011page jobs, and a JSON endpoint extracts structured data from a natural\u2011language prompt. Microlink works one URL per request and has\u00a0neither.'
  },
  {
    title: 'Raw compute is\u00a0cheap',
    description: `Workers Paid is $${WORKERS_PAID_PRICE}/month with ${INCLUDED_BROWSER_HOURS} browser\u2011hours included, then ${BROWSER_HOUR_LABEL} per hour, and Quick Actions screenshots bill no concurrency. At ~${SECONDS_PER_CAPTURE}\u00a0s a capture, ${VOLUME_LABEL} screenshots come to ${QUICK_ACTIONS_TOTAL}. Storage, delivery, banner handling, and proxies are separate work on your\u00a0side.`
  }
]

export const META = {
  title: 'Cloudflare Screenshot Alternative with Batteries Included',
  description:
    'Cloudflare’s screenshot endpoint rents you a raw browser. Microlink returns finished captures: cookie banners removed by default, a built-in proxy for blocked pages, and CDN-hosted URLs you can embed anywhere.'
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cloudflare Screenshot Alternative with Batteries\u00a0Included',
    description:
      'Compare Microlink and Cloudflare Browser Run (formerly Browser Rendering) for screenshots. Microlink removes cookie banners and ads by default, ships a built-in rotating proxy with antibot detection, and returns CDN-hosted capture URLs you can embed without a backend.',
    url: 'https://microlink.io/alternative/cloudflare',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Microlink',
      applicationCategory: ['DeveloperApplication', 'WebApplication'],
      url: 'https://microlink.io',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR'
      }
    }
  },
  FAQ_STRUCTURED
]

export const WHY_SWITCH = {
  caption: <>The usual reasons teams move from Cloudflare to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      Cloudflare facts come from the Browser Run docs and pricing page, and the
      last four rows are where it does&nbsp;more.
    </>
  ),
  columns: ['Microlink', 'Cloudflare'],
  rows: COMPARISON_DATA,
  competitorKey: 'cloudflare',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>Cloudflare</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'Cloudflare sells a browser you program: Workers bindings, persistent sessions, crawling, AI extraction, and cheap raw\u00a0compute.',
  items: HONESTY_ITEMS
}
