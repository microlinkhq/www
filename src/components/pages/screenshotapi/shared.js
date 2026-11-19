import React from 'react'

import { Link } from 'components/elements/Link'
import {
  GradientText,
  MICROLINK_PLAN,
  faqPageStructured,
  formatCheckedAt,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import { formatNumber } from 'helpers/format-number'
import { DEFAULT_PLAN } from 'helpers/pro-plans'
import {
  benchmarkClaims,
  formatDuration
} from 'components/patterns/SpeedSection/claims'
import {
  formatPerThousand,
  missing
} from 'components/patterns/ProductStory/price-comparison'
import { AlternativePricingTitle } from 'components/patterns/ProductStory/alternative-section'
import { colors } from 'theme'

export const FREE_CREDITS = 100
const FREE_RATE_LIMIT = 10
const ESSENTIAL_PRICE = 15
const ESSENTIAL_VOLUME = 2000
const ESSENTIAL_RATE_LIMIT = 30
const STARTUP_PRICE = 39
const STARTUP_VOLUME = 10000
const STARTUP_RATE_LIMIT = 60
const STARTUP_OVERAGE_BLOCK = 650
export const GROWTH_PRICE = 69
export const GROWTH_VOLUME = 40000
export const GROWTH_RATE_LIMIT = 100
const GROWTH_OVERAGE_BLOCK = 1450
const GROWTH_MAX_CREDITS = 60000
const BUSINESS_PRICE = 199
const BUSINESS_VOLUME = 125000
const BUSINESS_RATE_LIMIT = 150
const OVERAGE_PRICE = 5
const DAYS_PER_MONTH = 30

export const PREMIUM_PROXY_CREDITS = 4
export const CAPTCHA_CREDITS = 3
const CHECKED_AT = '2026-11-18'

const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal
const MICROLINK_PRICE_PER_REQUEST = MICROLINK_PLAN.price / MICROLINK_VOLUME
const MICROLINK_PER_THOUSAND = formatPerThousand(
  MICROLINK_PLAN.price,
  MICROLINK_VOLUME,
  'requests'
)
const MICROLINK_FREE_MONTHLY = FREE_PLAN_REQUESTS_PER_DAY * DAYS_PER_MONTH

export const VOLUME_ADVANTAGE_PCT = Math.floor(
  ((MICROLINK_VOLUME - GROWTH_VOLUME) / GROWTH_VOLUME) * 100
)
export const PRICE_SAVINGS = GROWTH_PRICE - MICROLINK_PLAN.price
export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

export const BENCHMARK_DATA = {
  timestamp: '2026-03',
  testUrls: [
    {
      url: 'https://vercel.com',
      width: 1920,
      fullPage: true,
      format: 'jpeg'
    },
    {
      url: 'https://example.com',
      width: 1280,
      height: 800,
      fullPage: false,
      format: 'png'
    },
    {
      url: 'https://stripe.com',
      width: 393,
      height: 852,
      fullPage: false,
      format: 'jpeg'
    },
    {
      url: 'https://screenshotone.com',
      width: 1920,
      fullPage: true,
      format: 'png'
    },
    {
      url: 'https://news.ycombinator.com',
      width: 1440,
      fullPage: true,
      format: 'jpeg'
    },
    {
      url: 'https://github.com/trending',
      width: 768,
      height: 1024,
      fullPage: false,
      format: 'png'
    },
    {
      url: 'https://www.framer.com',
      width: 1920,
      height: 1800,
      fullPage: false,
      format: 'jpeg'
    }
  ],
  results: {
    microlink: {
      name: 'Microlink',
      summary: {
        avgColdDuration: 4111.84,
        totalColdDuration: 28782.87
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 6361.22 },
        { url: 'https://example.com', coldDuration: 967.96 },
        { url: 'https://stripe.com', coldDuration: 3217.22 },
        { url: 'https://screenshotone.com', coldDuration: 5474.39 },
        { url: 'https://news.ycombinator.com', coldDuration: 3435.08 },
        { url: 'https://github.com/trending', coldDuration: 3059.69 },
        { url: 'https://www.framer.com', coldDuration: 6267.31 }
      ]
    },
    screenshotapi: {
      name: 'ScreenshotAPI',
      summary: {
        avgColdDuration: 5915.71,
        totalColdDuration: 41409.99
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 6143.4 },
        { url: 'https://example.com', coldDuration: 4987.8 },
        { url: 'https://stripe.com', coldDuration: 5613.77 },
        { url: 'https://screenshotone.com', coldDuration: 6805.46 },
        { url: 'https://news.ycombinator.com', coldDuration: 5384.65 },
        { url: 'https://github.com/trending', coldDuration: 6174.08 },
        { url: 'https://www.framer.com', coldDuration: 6300.83 }
      ]
    }
  }
}

export const SPEED = benchmarkClaims(BENCHMARK_DATA, 'screenshotapi')

const cheaperPerRequestThan = (price, volume) =>
  Number((price / volume / MICROLINK_PRICE_PER_REQUEST).toFixed(1))
const ESSENTIAL_RATIO = cheaperPerRequestThan(ESSENTIAL_PRICE, ESSENTIAL_VOLUME)
const STARTUP_RATIO = cheaperPerRequestThan(STARTUP_PRICE, STARTUP_VOLUME)
const GROWTH_RATIO = cheaperPerRequestThan(GROWTH_PRICE, GROWTH_VOLUME)
const BUSINESS_RATIO = cheaperPerRequestThan(BUSINESS_PRICE, BUSINESS_VOLUME)

const CENTS = 100
const THOUSAND = 1000

const overageLabel = block =>
  `$${(Math.round((OVERAGE_PRICE * CENTS * THOUSAND) / block) / CENTS).toFixed(
    2
  )} per ${formatNumber(THOUSAND)} extra\u00a0credits`

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='More requests.'
      highlight={'One broader\u00a0API.'}
    />
  ),
  caption: `Microlink bills requests: ${formatNumber(MICROLINK_VOLUME)} for $${
    MICROLINK_PLAN.price
  }\u00a0per\u00a0month. ScreenshotAPI\u00a0Growth bills credits: ${formatNumber(
    GROWTH_VOLUME
  )} for $${GROWTH_PRICE}\u00a0per\u00a0month.`,
  microlink: {
    cta: 'alternative-screenshotapi:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: ['Screenshots, PDF, metadata, previews, and remote\u00a0JS']
  },
  competitor: {
    name: 'ScreenshotAPI Growth',
    price: GROWTH_PRICE,
    quota: GROWTH_VOLUME,
    unit: 'credits',
    items: [
      `Free plan: ${FREE_CREDITS}\u00a0credits/month`,
      missing(`${GROWTH_RATE_LIMIT}\u00a0requests/minute cap`),
      `${overageLabel(GROWTH_OVERAGE_BLOCK)}, up to ${formatNumber(
        GROWTH_MAX_CREDITS
      )}\u00a0credits/month`,
      'Screenshots, PDF, scrolling video, bulk capture, and scraping',
      'MCP server plus Zapier, Make, and n8n workflows',
      'BYOB storage (S3, GCS, Azure, Wasabi)'
    ],
    source: 'https://www.screenshotapi.net/pricing',
    checkedAt: CHECKED_AT
  },
  note: `ScreenshotAPI Growth costs $${PRICE_SAVINGS} more per month and includes ${formatNumber(
    MICROLINK_VOLUME - GROWTH_VOLUME
  )} fewer credits. It adds bulk jobs, scheduled captures, and scrolling\u00a0video.`
}

export const CTA = {
  caption: 'Screenshots, PDF, metadata, previews, and remote JS under one key.',
  cta: 'alternative-screenshotapi:footer-cta',
  links: [
    { href: '/screenshot', label: 'Explore the Screenshot API' },
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' }
  ]
}

export const FAQ_CAPTION =
  'Credits, rate limits, storage, and migration, from ScreenshotAPI’s public pricing and docs.'

export const FAQ_ITEMS = [
  {
    question: 'Is there a free ScreenshotAPI.net alternative?',
    text: `Yes. Microlink’s free tier gives you ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, with every Pro feature, served from the same ${CDN_EDGES} edge network as paid plans. ScreenshotAPI also has a free plan: ${FREE_CREDITS} credits per month at ${FREE_RATE_LIMIT} requests/minute. Microlink’s free plan adds up to ${formatNumber(
      MICROLINK_FREE_MONTHLY
    )} requests in a ${DAYS_PER_MONTH}-day\u00a0month.`,
    answer: (
      <>
        <div>
          Yes. Microlink’s <Link href='/pricing'>free tier</Link> gives you{' '}
          {FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests/day, renews daily, no
          credit card, with every Pro feature, served from the same {CDN_EDGES}{' '}
          edge network as paid&nbsp;plans.
        </div>
        <div>
          ScreenshotAPI also has a free plan: {FREE_CREDITS}&nbsp;credits per
          month at {FREE_RATE_LIMIT}&nbsp;requests/minute. Microlink’s free plan
          adds up to {formatNumber(MICROLINK_FREE_MONTHLY)} requests in a{' '}
          {DAYS_PER_MONTH}-day&nbsp;month.
        </div>
      </>
    )
  },
  {
    question: 'What is the best alternative to ScreenshotAPI?',
    text: 'Microlink is a full headless browser API that consolidates screenshots, PDF generation, metadata extraction, link previews, and remote JS execution in one API with one\u00a0key.'
  },
  {
    question:
      'Does Microlink produce the same screenshot quality as ScreenshotAPI?',
    text: `Both use Chromium under the hood. In our ${SPEED.run} benchmark Microlink was ${SPEED.averageRatio}× faster on average (up to ${SPEED.widestGap.ratio}× faster on ${SPEED.widestGap.host}). ScreenshotAPI also produces good results and supports retina 2× captures up to 5K resolution for pixel\u2011dense\u00a0output.`
  },
  {
    question: 'How do I migrate from ScreenshotAPI to Microlink?',
    text: 'ScreenshotAPI sends GET requests with query params: token, url, width, height, output, full_page. Microlink accepts the same concepts under its own parameter names. Change the host and the key, and most integrations keep working. The screenshot docs cover every parameter with examples. Paste your existing code into any LLM and ask it to migrate to Microlink. Or email hello@microlink.io and we’ll help\u00a0directly.',
    answer: (
      <>
        <div>
          ScreenshotAPI sends GET requests with query params: <i>token</i>,{' '}
          <i>url</i>, <i>width</i>, <i>height</i>, <i>output</i>,{' '}
          <i>full_page</i>. Microlink accepts the same concepts under its own
          parameter names. Change the host and the key, and most integrations
          keep working. The{' '}
          <Link href='/docs/guides/screenshot'>screenshot docs</Link> cover
          every parameter with&nbsp;examples.
        </div>
        <div>
          Paste your existing code into any LLM and ask it to migrate to
          Microlink. Or email{' '}
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link> and
          we’ll help&nbsp;directly.
        </div>
      </>
    )
  },
  {
    question: 'Does Microlink do more than screenshots?',
    text: 'Yes. One API key gives you screenshots, PDF generation, Open Graph and metadata extraction, link previews (via the React/Vue/JS SDK), remote JavaScript execution, and Lighthouse audits. ScreenshotAPI already handles screenshots, PDFs, scrolling video, bulk capture, and text, HTML, and Markdown extraction, but metadata extraction, link previews, and remote JS still sit outside its core\u00a0surface.'
  },
  {
    question: 'What output formats does Microlink support?',
    text: 'PNG and JPEG for still screenshots (served as WebP through the CDN when the client supports it), MP4 video for animated captures, and PDF generation, all from the same API\u00a0endpoint.'
  },
  {
    question: 'Can I use the screenshot API without a server?',
    text: 'Yes. Microlink’s embed mode returns a direct image URL you can put in an img tag, CSS background-image, or Markdown with no backend or storage layer\u00a0needed.'
  },
  {
    question: 'Is Microlink open source?',
    text: 'The core engine components are MIT-licensed on GitHub: Metascraper (metadata extraction), MQL (query language), and Browserless (headless browser). Read the code, fork it, or run it yourself. ScreenshotAPI is closed-source. There is no way to inspect the code that handles your\u00a0URLs.',
    answer: (
      <>
        <div>
          The core engine components are MIT&#8209;licensed on GitHub:{' '}
          <Link href='https://github.com/microlinkhq/metascraper'>
            Metascraper
          </Link>{' '}
          (metadata extraction),{' '}
          <Link href='https://github.com/microlinkhq/mql'>MQL</Link> (query
          language), and{' '}
          <Link href='https://github.com/microlinkhq/browserless'>
            Browserless
          </Link>{' '}
          (headless browser). Read the code, fork it, or run it&nbsp;yourself.
        </div>
        <div>
          ScreenshotAPI is closed-source. There is no way to inspect the code
          that handles your&nbsp;URLs.
        </div>
      </>
    )
  },
  {
    question: 'How does ScreenshotAPI pricing compare to Microlink?',
    text: `ScreenshotAPI sells credits: Essential is $${ESSENTIAL_PRICE}/month for ${formatNumber(
      ESSENTIAL_VOLUME
    )}, Startup $${STARTUP_PRICE} for ${formatNumber(
      STARTUP_VOLUME
    )}, Growth $${GROWTH_PRICE} for ${formatNumber(
      GROWTH_VOLUME
    )}, and Business $${BUSINESS_PRICE} for ${formatNumber(
      BUSINESS_VOLUME
    )}. Overage starts at ${overageLabel(
      STARTUP_OVERAGE_BLOCK
    )} on Startup, and premium proxies (+${PREMIUM_PROXY_CREDITS}) or the CAPTCHA solver (+${CAPTCHA_CREDITS}) spend extra credits per request. Microlink is $${
      MICROLINK_PLAN.price
    }/month for ${formatNumber(
      MICROLINK_VOLUME
    )} requests (${MICROLINK_PER_THOUSAND}), with no per\u2011minute rate limit. That is ${VOLUME_ADVANTAGE_PCT}% more volume than Growth for $${PRICE_SAVINGS} less, ${GROWTH_RATIO}× cheaper per request than Growth, ${STARTUP_RATIO}× cheaper than Startup, and ${ESSENTIAL_RATIO}× cheaper than Essential. At Business volume the gap narrows to\u00a0${BUSINESS_RATIO}×.`
  },
  {
    question: 'Does Microlink throttle requests?',
    text: `There is no rate limit on paid plans. The only limit is your monthly quota. ScreenshotAPI enforces a rate limit on every plan: ${FREE_RATE_LIMIT} requests/minute on Free, ${ESSENTIAL_RATE_LIMIT} on Essential, ${STARTUP_RATE_LIMIT} on Startup, ${GROWTH_RATE_LIMIT} on Growth, and ${BUSINESS_RATE_LIMIT} on Business. That cap can bottleneck batch jobs or high-traffic embed\u00a0workflows.`
  },
  {
    question: 'How does Microlink handle cookie banners and ads?',
    text: 'Both Microlink and ScreenshotAPI block ads and remove cookie banners. ScreenshotAPI gives you 15+ resource-type toggles: block JS, stylesheets, fonts, XHR, fetch, WebSockets, and more, individually. Microlink uses the adblock parameter and custom CSS/JS injection to dismiss consent dialogs before\u00a0capture.',
    answer: (
      <div>
        Both Microlink and ScreenshotAPI block ads and remove cookie banners.
        ScreenshotAPI gives you 15+ resource&#8209;type toggles: block JS,
        stylesheets, fonts, XHR, fetch, WebSockets, and more, individually.
        Microlink uses the{' '}
        <Link href='/docs/api/parameters/adblock'>adblock</Link> parameter and
        custom CSS/JS injection to dismiss consent dialogs before&nbsp;capture.
      </div>
    )
  },
  {
    question: 'What SLA does Microlink offer?',
    text: `Microlink guarantees 99.9% uptime with a formal SLA. Requests are served from ${CDN_EDGES} Cloudflare edge nodes, so latency stays low regardless of where your users are located. ScreenshotAPI runs on Google Cloud Platform and does not publish a formal SLA or CDN edge\u00a0distribution.`
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

const MONTHLY_SCREENSHOTS = 100000

const MS_PER_HOUR = 3600000

const MS_SAVED_PER_REQUEST =
  BENCHMARK_DATA.results.screenshotapi.summary.avgColdDuration -
  BENCHMARK_DATA.results.microlink.summary.avgColdDuration

const HOURS_RECOVERED = Math.round(
  (MONTHLY_SCREENSHOTS * MS_SAVED_PER_REQUEST) / MS_PER_HOUR
)

export const SERVICE_COLORS = {
  microlink: colors.red6,
  screenshotapi: colors.gray5
}

const PROXY_COUNTRIES = 181

const COMPARISON_DATA = [
  {
    feature: 'Free\u00a0plan',
    microlink: `${FREE_PLAN_REQUESTS_PER_DAY}/day, renews\u00a0daily`,
    screenshotapi: `${FREE_CREDITS} credits/month`
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    screenshotapi: `${GROWTH_RATE_LIMIT}/min on\u00a0Growth`
  },
  { feature: 'PDF\u00a0generation', microlink: true, screenshotapi: true },
  {
    feature: 'Device emulation\u00a0presets',
    note: 'ScreenshotAPI emulates devices through a custom user_agent string, with no named\u00a0presets.',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Wait for\u00a0selector',
    note: 'ScreenshotAPI waits on a page event (load, networkidle) or a fixed\u00a0delay.',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    note: `ScreenshotAPI includes classic proxies from Essential up, opted in per request. Premium proxies cost +${PREMIUM_PROXY_CREDITS}\u00a0credits.`,
    microlink: true,
    screenshotapi: true
  },
  {
    feature: 'Proxy\u00a0geolocation',
    note: 'Microlink proxy.location takes any of 181 ISO country codes on every API key, free\u00a0included.',
    microlink: `${PROXY_COUNTRIES}\u00a0countries`,
    screenshotapi: true
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    note: `ScreenshotAPI offers basic stealth mode on every plan and a CAPTCHA solver on Growth and Business (+${CAPTCHA_CREDITS}\u00a0credits).`,
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Metadata\u00a0extraction',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Link\u00a0previews',
    note: (
      <>
        <Link href='/link-preview'>Link preview API</Link> returns the oEmbed
        iframe, card fields, and media in one&nbsp;call.
      </>
    ),
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Remote JS execution (return\u00a0values)',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Lighthouse audits and tech\u00a0detection',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Browser chrome\u00a0overlay',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: `${CDN_EDGES} CDN edge\u00a0nodes`,
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Bulk screenshots\u00a0(JSON/CSV)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'BYOB storage\u00a0(S3/GCS/Azure/Wasabi)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Scrolling video capture\u00a0(WebM/MP4/GIF)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Granular resource blocking (15+\u00a0toggles)',
    microlink: 'Partial',
    screenshotapi: true
  },
  {
    feature: 'Scheduled and no\u2011code workflows (Zapier, Make,\u00a0n8n)',
    microlink: 'Partial',
    screenshotapi: true,
    note: 'ScreenshotAPI publishes a scheduling surface and official automation guides for Zapier, Make, and\u00a0n8n.'
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'Latency compounds at\u00a0scale',
    description: (
      <>
        At {formatNumber(MONTHLY_SCREENSHOTS)} screenshots/month,{' '}
        <b>{formatDuration(MS_SAVED_PER_REQUEST)} saved per request</b> adds up
        to <b>{HOURS_RECOVERED}&nbsp;hours</b> of recovered pipeline time.
        Microlink is <b>{SPEED.averageRatio}&times; faster on average</b>, and
        up to {SPEED.widestGap.ratio}&times; faster on&nbsp;
        {SPEED.widestGap.host}.
      </>
    )
  },
  {
    number: '02',
    title: 'Screenshot, PDF, metadata, previews, and remote\u00a0JS',
    description: (
      <>
        Screenshots, PDFs, metadata extraction, link previews, and remote JS
        from <b>one integration</b> under one API&nbsp;key.
      </>
    )
  },
  {
    number: '03',
    title: `${VOLUME_ADVANTAGE_PCT}% more requests for $${PRICE_SAVINGS}\u00a0less`,
    description: (
      <>
        ScreenshotAPI Growth: {formatNumber(GROWTH_VOLUME)} credits for{' '}
        <b>${GROWTH_PRICE}/month</b>. Microlink:{' '}
        <b>
          {formatNumber(DEFAULT_PLAN.reqsPerMonthTotal)} requests for $
          {MICROLINK_PLAN.price}
        </b>
        . ${PRICE_SAVINGS}&nbsp;less, {VOLUME_ADVANTAGE_PCT}% more volume, and
        every request covers screenshots, PDF, metadata, and more.
      </>
    )
  },
  {
    number: '04',
    title: 'Open\u2011source core\u00a0(MIT)',
    description: (
      <>
        Metascraper, MQL, and Browserless are <b>MIT-licensed</b> on GitHub.
        Read the core engine, fork it, or self&#8209;host it. ScreenshotAPI is
        closed&nbsp;source.
      </>
    )
  },
  {
    number: '05',
    title: 'Proxy and antibot\u00a0built\u2011in',
    description: (
      <>
        Microlink <b>rotates proxies automatically</b> and detects{' '}
        <b>30+&nbsp;antibot and CAPTCHA providers</b> (Cloudflare, DataDome,
        Akamai
        {'\u2026'}) when a target blocks the request, at the standard request
        price. ScreenshotAPI has proxies too, but you opt in per request and
        premium proxies cost +{PREMIUM_PROXY_CREDITS}&nbsp;credits.
      </>
    )
  },
  {
    number: '06',
    title: 'Browser frames from one\u00a0parameter',
    description: (
      <>
        Set <b>screenshot.overlay</b> and the capture comes back inside a light
        or dark browser window, on a gradient or image background of your
        choice. No design tool in&nbsp;between.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Scheduled screenshot\u00a0workflows',
    description:
      'ScreenshotAPI has a dedicated scheduling surface and publishes official automation guides for Zapier, Make, and n8n. Microlink handles on\u2011demand captures and does not include a built-in scheduler.'
  },
  {
    title: 'Bulk URL\u00a0processing',
    description:
      'ScreenshotAPI accepts JSON payloads or CSV uploads for batch jobs, with pause, resume, and cancel controls, plus an email notification when the run finishes. Microlink does not have native bulk\u00a0processing.'
  },
  {
    title: 'Page-scroll video\u00a0output',
    description:
      'ScreenshotAPI records a scrolling page as WebM, MP4, or GIF with configurable speed, direction, and duration across multiple viewports. Microlink does not produce scrolling video\u00a0captures.'
  },
  {
    title: 'Fine-grained resource\u00a0control',
    description:
      'ScreenshotAPI lets you block JS, stylesheets, images, fonts, XHR, fetch, WebSockets, and more, each with its own toggle. Microlink covers ad blocking and CSS\u2011selector hiding but not per\u2011resource\u2011type\u00a0controls.'
  },
  {
    title: 'Zapier, Make, or n8n\u00a0integrations',
    description:
      'ScreenshotAPI publishes official integrations and workflow guides for Zapier, Make, n8n, Google Sheets, viaSocket, and Slack. Microlink has fewer no\u2011code connectors\u00a0today.'
  },
  {
    title: 'Screenshots sent to your own\u00a0bucket',
    description:
      'ScreenshotAPI supports BYOB storage integrations for Amazon S3, Google Cloud Storage, Azure Blob, and Wasabi. Microlink returns the image in the API response and does not include native storage\u00a0upload.'
  }
]

const joinLastTwoWords = text => text.replace(/ (\S+)$/, '\u00a0$1')

export const FAQ_QUESTIONS = toFaqQuestions(FAQ_ITEMS).map(item => ({
  ...item,
  question: joinLastTwoWords(item.question)
}))

export const META = {
  title: 'ScreenshotAPI Alternative for Metadata, Previews, and More',
  description: `ScreenshotAPI already covers screenshots, PDFs, bulk capture, and scraping. Microlink adds metadata, link previews, and remote JS in the same API, and was ${SPEED.averageRatio}× faster on average in our benchmark.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ScreenshotAPI Alternative for Metadata, Previews, and More |\u00a0Microlink',
    description: `Compare Microlink and ScreenshotAPI when you want screenshots, PDFs, bulk capture, and scraping plus richer browser outputs. Microlink was ${SPEED.averageRatio}× faster on average in our benchmark and adds metadata extraction, link previews, and remote JS in one API.`,
    url: 'https://microlink.io/alternative/screenshotapi',
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
  caption: <>The usual reasons teams move from ScreenshotAPI to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      ScreenshotAPI facts come from its public docs and pricing page, including
      the rows where it does more.
    </>
  ),
  columns: ['Microlink', 'ScreenshotAPI'],
  rows: COMPARISON_DATA,
  competitorKey: 'screenshotapi',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>ScreenshotAPI</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'ScreenshotAPI is built around screenshot pipelines. These are the jobs where its extras\u00a0matter.',
  items: HONESTY_ITEMS
}
