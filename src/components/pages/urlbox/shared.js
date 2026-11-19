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
import { CDN_EDGES } from 'helpers/cdn-edges'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import { formatNumber } from 'helpers/format-number'
import { DEFAULT_PLAN } from 'helpers/pro-plans'
import {
  benchmarkClaims,
  formatDuration
} from 'components/patterns/SpeedSection/claims'
import { colors } from 'theme'

export const COMPETITOR_PRICE = 49
const COMPETITOR_VOLUME = 5000
const ULTRA_PRICE = 99
const ULTRA_VOLUME = 15000
export const COMPETITOR_RATE_LIMIT = 60
const ULTRA_RATE_LIMIT = 250
const ENTRY_PRICE = 19
const BUSINESS_BASE_PRICE = 495
const BUSINESS_PRICE_PER_1000 = 3
const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal

const pricePerThousand = (price, volume) => ((price / volume) * 1000).toFixed(2)

export const VOLUME_RATIO = (MICROLINK_VOLUME / COMPETITOR_VOLUME).toFixed(1)
export const MICROLINK_REQUESTS = formatNumber(MICROLINK_VOLUME)
export const COMPETITOR_RENDERS = formatNumber(COMPETITOR_VOLUME)
export const BUSINESS_COST_AT_MICROLINK_VOLUME =
  BUSINESS_BASE_PRICE + (MICROLINK_VOLUME / 1000) * BUSINESS_PRICE_PER_1000
export const BUSINESS_PRICING = `$${BUSINESS_BASE_PRICE} base plus $${BUSINESS_PRICE_PER_1000} per 1,000\u00a0renders`

const MICROLINK_PRICE_PER_1000 = pricePerThousand(
  MICROLINK_PLAN.price,
  MICROLINK_VOLUME
)
const COMPETITOR_PRICE_PER_1000 = pricePerThousand(
  COMPETITOR_PRICE,
  COMPETITOR_VOLUME
)
const ULTRA_PRICE_PER_1000 = pricePerThousand(ULTRA_PRICE, ULTRA_VOLUME)

const CHECKED_AT = '2026-11-18'
export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

const FEWER_RENDERS_LABEL = formatNumber(MICROLINK_VOLUME - COMPETITOR_VOLUME)

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='Same price.'
      highlight={`${VOLUME_RATIO}× more\u00a0requests.`}
    />
  ),
  caption: `Microlink bills requests: ${MICROLINK_REQUESTS} for $${MICROLINK_PLAN.price}\u00a0per\u00a0month. Urlbox\u00a0Hi\u2011Fi bills renders: ${COMPETITOR_RENDERS} for $${COMPETITOR_PRICE}\u00a0per\u00a0month.`,
  microlink: {
    cta: 'alternative-urlbox:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: ['Screenshots, PDF, metadata, previews, and remote\u00a0JS']
  },
  competitor: {
    name: 'Urlbox Hi\u2011Fi',
    price: COMPETITOR_PRICE,
    quota: COMPETITOR_VOLUME,
    unit: 'renders',
    items: [
      missing('No free plan'),
      missing(`${COMPETITOR_RATE_LIMIT}\u00a0requests/minute cap`),
      'Screenshots, PDF, metadata, and\u00a0markdown',
      'Save to your own S3\u00a0bucket'
    ],
    source: 'https://urlbox.com/pricing',
    checkedAt: CHECKED_AT
  },
  note: `Urlbox Hi\u2011Fi costs the same $${COMPETITOR_PRICE} per month and includes ${FEWER_RENDERS_LABEL} fewer\u00a0renders.`
}

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
    urlbox: {
      name: 'Urlbox',
      summary: {
        avgColdDuration: 7334.22,
        totalColdDuration: 51339.56
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 14952.83 },
        { url: 'https://example.com', coldDuration: 2331.45 },
        { url: 'https://stripe.com', coldDuration: 3678.79 },
        { url: 'https://screenshotone.com', coldDuration: 14975.56 },
        { url: 'https://news.ycombinator.com', coldDuration: 4748.08 },
        { url: 'https://github.com/trending', coldDuration: 4266.84 },
        { url: 'https://www.framer.com', coldDuration: 6386.01 }
      ]
    }
  }
}

export const SPEED = benchmarkClaims(BENCHMARK_DATA, 'urlbox')

export const CTA = {
  caption: `${VOLUME_RATIO}× the monthly volume for the same $${COMPETITOR_PRICE}, ${SPEED.averageRatio}× faster on average in our benchmark. Point one Urlbox request at the Screenshot API and compare the\u00a0result.`,
  cta: 'alternative-urlbox:footer-cta',
  links: [
    { href: '/screenshot', label: 'Explore the Screenshot API' },
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' }
  ]
}

export const FAQ_CAPTION =
  'Pricing, rate limits, free access and what a move from Urlbox takes.'

export const FAQ_ITEMS = [
  {
    question: 'Is there a free Urlbox alternative?',
    text: `Yes. Microlink’s free tier includes ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, with every Pro feature, served from the same ${CDN_EDGES} edge network as paid plans. Urlbox does not offer a free plan. Its entry point is a 7-day free trial on paid plans, after which you need a subscription starting at\u00a0$${ENTRY_PRICE}/month.`,
    answer: (
      <>
        <div>
          Yes. Microlink’s <Link href='/pricing'>free&nbsp;tier</Link> includes{' '}
          {FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests/day, renews daily, no
          credit card, with every Pro feature, served from the same {CDN_EDGES}{' '}
          edge network as paid&nbsp;plans.
        </div>
        <div>
          Urlbox does not offer a free plan. Its entry point is a 7-day free
          trial on paid plans, after which you need a subscription starting
          at&nbsp;${ENTRY_PRICE}/month.
        </div>
      </>
    )
  },
  {
    question: 'How does Microlink compare to Urlbox for screenshot quality?',
    text: `Both services produce high-quality screenshots using Chromium. Urlbox emphasizes pixel-perfect rendering with macOS-quality emoji and webfont support, plus optional GPU rendering for WebGL-heavy sites. Microlink was ${SPEED.averageRatio}× faster on average in our ${SPEED.run}\u00a0benchmark.`
  },
  {
    question: 'Can I migrate from Urlbox to Microlink easily?',
    text: 'Yes. Urlbox uses render links and a REST API with parameters like url, width, full_page, format, and selector. Microlink accepts the same capture concepts under its own parameter names. Most migrations are endpoint-and-key swaps. The screenshot docs cover every parameter with examples. Paste your Urlbox integration into any LLM and ask it to migrate to Microlink. Or email hello@microlink.io and we’ll help\u00a0directly.',
    answer: (
      <>
        <div>
          Yes. Urlbox uses render links and a REST API with parameters like{' '}
          <i>url</i>, <i>width</i>, <i>full_page</i>, <i>format</i>, and{' '}
          <i>selector</i>. Microlink accepts the same capture concepts under its
          own parameter names. Most migrations are endpoint-and-key swaps. The{' '}
          <Link href='/docs/guides/screenshot'>screenshot&nbsp;docs</Link> cover
          every parameter with&nbsp;examples.
        </div>
        <div>
          Paste your Urlbox integration into any LLM and ask it to migrate to
          Microlink. Or email{' '}
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link> and
          we’ll help&nbsp;directly.
        </div>
      </>
    )
  },
  {
    question: 'When is Microlink the better value than Urlbox?',
    text: 'Urlbox is feature-rich and a strong fit when you need screenshot-first extras like SVG output, scrolling video, LLM analysis, or CaptureDeck. Microlink becomes the better value when you want lower cost per render plus screenshots, PDF generation, metadata/Open Graph extraction, link previews, remote JavaScript execution, and Lighthouse audits from one API key and one\u00a0integration.'
  },
  {
    question: 'Is Microlink open source?',
    text: 'The core engine components are MIT-licensed on GitHub: Metascraper (metadata extraction), MQL (Microlink Query Language), and Browserless (headless browser). Read the code, fork it, or run it yourself. Urlbox is closed-source. There is no way to inspect or audit the engine processing your\u00a0requests.',
    answer: (
      <>
        <div>
          The core engine components are MIT-licensed on GitHub:{' '}
          <Link href='https://github.com/microlinkhq/metascraper'>
            Metascraper
          </Link>{' '}
          (metadata extraction),{' '}
          <Link href='https://github.com/microlinkhq/mql'>MQL</Link> (Microlink
          Query Language), and{' '}
          <Link href='https://github.com/microlinkhq/browserless'>
            Browserless
          </Link>{' '}
          (headless browser). Read the code, fork it, or run it&nbsp;yourself.
        </div>
        <div>
          Urlbox is closed-source. There is no way to inspect or audit the
          engine processing your&nbsp;requests.
        </div>
      </>
    )
  },
  {
    question: 'How much does Urlbox cost compared to Microlink?',
    text: `Urlbox Hi-Fi is $${COMPETITOR_PRICE}/month for ${COMPETITOR_RENDERS} renders ($${COMPETITOR_PRICE_PER_1000} per 1,000). Urlbox Ultra is $${ULTRA_PRICE}/month for ${formatNumber(
      ULTRA_VOLUME
    )} renders ($${ULTRA_PRICE_PER_1000} per 1,000). Microlink is $${
      MICROLINK_PLAN.price
    }/month for ${MICROLINK_REQUESTS} requests ($${MICROLINK_PRICE_PER_1000} per 1,000) with no rate limit on paid plans. For the same $${COMPETITOR_PRICE}, Microlink delivers ${VOLUME_RATIO}× more\u00a0volume.`,
    answer: (
      <>
        <div>
          Urlbox Hi-Fi is ${COMPETITOR_PRICE}/month for {COMPETITOR_RENDERS}{' '}
          renders (${COMPETITOR_PRICE_PER_1000} per 1,000). Urlbox Ultra is $
          {ULTRA_PRICE}/month for {formatNumber(ULTRA_VOLUME)} renders ($
          {ULTRA_PRICE_PER_1000} per 1,000). Microlink is $
          {MICROLINK_PLAN.price}/month for {MICROLINK_REQUESTS} requests ($
          {MICROLINK_PRICE_PER_1000} per 1,000) with no rate limit on
          paid&nbsp;plans.
        </div>
        <div>
          For the same ${COMPETITOR_PRICE}, Microlink delivers {VOLUME_RATIO}
          &times; more&nbsp;volume.
        </div>
      </>
    )
  },
  {
    question: 'Does Microlink have rate limits?',
    text: `There is no rate limit on paid plans. The only limit is your monthly request quota. Urlbox caps requests per minute by plan (${COMPETITOR_RATE_LIMIT} on Hi-Fi, ${ULTRA_RATE_LIMIT} on Ultra), so higher throughput requires higher-tier\u00a0plans.`
  },
  {
    question: 'How does Microlink handle sites with cookie banners or ads?',
    text: 'Both Microlink and Urlbox support ad blocking and cookie banner removal. Microlink uses the adblock parameter and custom CSS/JS injection to dismiss consent dialogs before the screenshot is taken. You can also use styles to hide specific elements with\u00a0CSS.',
    answer: (
      <>
        <div>
          Both Microlink and Urlbox support ad blocking and cookie banner
          removal. Microlink uses the{' '}
          <Link href='/docs/api/parameters/adblock'>adblock</Link> parameter and
          custom CSS/JS injection to dismiss consent dialogs before the
          screenshot is&nbsp;taken.
        </div>
        <div>
          Use <Link href='/docs/api/parameters/styles'>styles</Link> to hide
          specific elements with CSS: sticky banners, chat widgets, or any
          overlay that clutters the&nbsp;capture.
        </div>
      </>
    )
  },
  {
    question: 'What uptime and SLA does Microlink guarantee?',
    text: `Microlink guarantees 99.9% uptime backed by a formal SLA. Requests are served from ${CDN_EDGES} Cloudflare edge nodes worldwide, so latency and availability stay consistent regardless of where the caller is\u00a0located.`
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

const MONTHLY_SCREENSHOTS = 100000

const MS_PER_HOUR = 3600000

const SAVED_MS_PER_REQUEST =
  BENCHMARK_DATA.results.urlbox.summary.avgColdDuration -
  BENCHMARK_DATA.results.microlink.summary.avgColdDuration

const SAVED_HOURS_PER_MONTH = Math.round(
  (MONTHLY_SCREENSHOTS * SAVED_MS_PER_REQUEST) / MS_PER_HOUR
)

export const SERVICE_COLORS = {
  microlink: colors.red6,
  urlbox: colors.gray5
}

const COMPARISON_DATA = [
  {
    feature: `Free tier (${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews\u00a0daily)`,
    microlink: true,
    urlbox: false
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    urlbox: `${COMPETITOR_RATE_LIMIT}/min on\u00a0Hi\u2011Fi`
  },
  { feature: 'PDF\u00a0generation', microlink: true, urlbox: true },
  { feature: 'Metadata extraction\u00a0(JSON)', microlink: true, urlbox: true },
  { feature: 'Video\u00a0output', microlink: true, urlbox: 'Ultra+' },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    urlbox: 'Paid add\u2011on',
    note: 'Urlbox sells managed proxies through its pov option, billed at 2× to 50× the\u00a0render.'
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    urlbox: 'Partial',
    note: 'Urlbox documents stealth mode, captcha solving and retries through\u00a0proxies.'
  },
  {
    feature: 'Link\u00a0previews',
    note: (
      <>
        <Link href='/link-preview'>Link&nbsp;preview&nbsp;API</Link> returns the
        oEmbed iframe, card fields, and media in one&nbsp;call.
      </>
    ),
    microlink: true,
    urlbox: false
  },
  {
    feature: 'Remote JS execution (return\u00a0values)',
    microlink: true,
    urlbox: 'Ultra+',
    note: 'Urlbox returns data from custom JS under metadata.custom on Ultra and\u00a0above.'
  },
  { feature: 'Browser chrome\u00a0overlay', microlink: true, urlbox: false },
  {
    feature: 'Lighthouse audits and tech\u00a0detection',
    microlink: true,
    urlbox: false
  },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    urlbox: false
  },
  { feature: 'GPU\u00a0rendering', microlink: false, urlbox: 'Ultra+' },
  { feature: 'SVG\u00a0output', microlink: false, urlbox: true },
  {
    feature: 'LLM integration (vision\u00a0models)',
    microlink: false,
    urlbox: true
  },
  {
    feature: 'Scrolling video\u00a0capture',
    microlink: false,
    urlbox: 'Ultra+'
  },
  {
    feature: 'Cloud storage integrations\u00a0(plan\u2011gated)',
    microlink: false,
    urlbox: true,
    note: 'Urlbox documents S3\u2011compatible storage, plus Azure and GCS\u00a0workflows.'
  },
  {
    feature: 'Bulk screenshot tool\u00a0(CaptureDeck)',
    microlink: false,
    urlbox: true
  },
  {
    feature: 'Scheduled and no\u2011code workflows (Zapier,\u00a0Airtable…)',
    microlink: 'Partial',
    urlbox: true,
    note: 'Urlbox documents recurring capture flows through Zapier and no\u2011code\u00a0automation.'
  },
  { feature: 'SOC 2 Type II\u00a0attested', microlink: false, urlbox: true }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: `${VOLUME_RATIO}× more requests, same\u00a0price`,
    description: (
      <>
        Urlbox Hi&#8209;Fi: {COMPETITOR_RENDERS} renders for{' '}
        <b>${COMPETITOR_PRICE}/month</b>. Microlink:{' '}
        <b>
          {MICROLINK_REQUESTS} requests for ${MICROLINK_PLAN.price}
        </b>
        . On Urlbox Business, that volume costs $
        {BUSINESS_COST_AT_MICROLINK_VOLUME}&nbsp;({BUSINESS_PRICING}).
      </>
    )
  },
  {
    number: '02',
    title: 'API latency compounds at\u00a0scale',
    description: (
      <>
        At {formatNumber(MONTHLY_SCREENSHOTS)} screenshots/month, saving{' '}
        {formatDuration(SAVED_MS_PER_REQUEST)} per request recovers about{' '}
        <b>{SAVED_HOURS_PER_MONTH}&nbsp;hours of pipeline time</b>. Microlink is{' '}
        <b>{SPEED.averageRatio}&times; faster on average</b>, and up to{' '}
        <b>{SPEED.widestGap.ratio}&times; faster</b> on&nbsp;
        {SPEED.widestGap.host}.
      </>
    )
  },
  {
    number: '03',
    title: 'Screenshot, PDF, metadata, previews, and remote\u00a0JS',
    description: (
      <>
        Microlink handles screenshots, PDFs, metadata extraction, link previews,
        and remote JS in <b>a single integration</b> under one API&nbsp;key.
      </>
    )
  },
  {
    number: '04',
    title: 'A free tier that renews\u00a0daily',
    description: (
      <>
        Microlink gives you <b>{FREE_PLAN_REQUESTS_PER_DAY} requests/day</b>,
        renews daily, no credit card, with every Pro feature. Urlbox only offers
        a <b>7&#8209;day trial</b>. After that, you
        {'\u2019'}re on a paid plan or locked out.
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
        {'\u2026'}) when a target blocks the request, at no extra cost. Urlbox
        sells managed proxies as a paid add&#8209;on billed per&nbsp;render.
      </>
    )
  },
  {
    number: '06',
    title: 'Open\u2011source core\u00a0(MIT)',
    description: (
      <>
        Metascraper, MQL, and Browserless are <b>MIT&#8209;licensed</b> on
        GitHub. Read the core engine, fork it, or self&#8209;host&nbsp;it.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'GPU rendering',
    description:
      'Urlbox offers GPU rendering on Ultra and above for sites that rely on WebGL, Canvas, or heavy 3D\u00a0scenes.'
  },
  {
    title: 'LLM\u2011powered screenshot\u00a0analysis',
    description:
      'Urlbox integrates with OpenAI, Anthropic, Google AI, and more. Analyze a screenshot with an LLM prompt in a single API call. Microlink does not have built\u2011in LLM\u00a0integration.'
  },
  {
    title: 'Screenshots sent to your own\u00a0bucket',
    description:
      'Urlbox saves renders straight to S3\u2011compatible storage, and documents Azure Blob and Google Cloud workflows too. Microlink returns the image in the API response and does not include native storage\u00a0upload.'
  },
  {
    title: 'Bulk screenshots from a\u00a0dashboard',
    description:
      'Urlbox’s CaptureDeck tool lets you upload CSVs or paste URL lists and download zip archives without writing code. For recurring captures, Urlbox documents Zapier-driven automation flows. Microlink is API\u2011first and does not have a bulk\u00a0dashboard.'
  },
  {
    title: 'SOC\u00a02 compliance',
    description:
      'Urlbox is SOC\u00a02 Type\u00a0II attested and publishes a Trust Center. Microlink does not hold a SOC\u00a02\u00a0attestation.'
  },
  {
    title: 'SVG or scrolling video\u00a0output',
    description:
      'Urlbox can output SVG images and record scrolling videos (WebM/MP4) of page content. Microlink records MP4 or WebM video of a page but does not produce SVG or scrolling video\u00a0captures.'
  }
]

const PRICE_POINT =
  MICROLINK_PLAN.price === COMPETITOR_PRICE
    ? `the same $${COMPETITOR_PRICE}`
    : `$${MICROLINK_PLAN.price} against $${COMPETITOR_PRICE}`

export const META = {
  title: 'Urlbox Alternative for Better Cost Per Render',
  description: `Compare Microlink vs Urlbox on cost per render and broader browser workflows: for ${PRICE_POINT}, ${MICROLINK_REQUESTS} requests against ${COMPETITOR_RENDERS} on Urlbox Hi-Fi, plus metadata, previews, and ${SPEED.averageRatio}× faster on average in our benchmark.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Urlbox Alternative for Better Cost Per Render |\u00a0Microlink',
    description: `Compare Microlink and Urlbox when cost per render and broader browser workflows matter. Microlink is ${SPEED.averageRatio}× faster on average in our benchmark, includes ${MICROLINK_REQUESTS} requests at $${MICROLINK_PLAN.price}, and adds screenshots, PDF generation, metadata extraction, and more in one\u00a0API.`,
    url: 'https://microlink.io/alternative/urlbox',
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
  caption: <>The usual reasons teams move from Urlbox to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      Both render with Chromium. The last rows are where Urlbox ships more: GPU,
      SVG, scrolling video, LLM analysis, bucket storage, bulk capture,
      no&#8209;code workflows and SOC&nbsp;2.
    </>
  ),
  columns: ['Microlink', 'Urlbox'],
  rows: COMPARISON_DATA,
  competitorKey: 'urlbox',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>Urlbox</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'Urlbox goes further on GPU, SVG, scrolling video, LLM analysis, bucket storage, bulk capture, no\u2011code workflows and SOC\u00a02.',
  items: HONESTY_ITEMS
}
