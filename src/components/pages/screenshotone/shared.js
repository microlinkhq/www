import React from 'react'

import { Link } from 'components/elements/Link'
import {
  GradientText,
  MICROLINK_PLAN,
  faqPageStructured,
  formatCheckedAt
} from 'components/patterns/ProductStory'
import {
  formatPrice,
  missing
} from 'components/patterns/ProductStory/price-comparison'
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

const COMPETITOR_PRICE = 79
const COMPETITOR_VOLUME = 10000
const COMPETITOR_SCALE_PRICE = 259
const COMPETITOR_SCALE_VOLUME = 50000
export const COMPETITOR_RATE_LIMIT = 80
const COMPETITOR_OVERAGE = 0.006
export const COMPETITOR_FREE_VOLUME = 100
const THOUSAND = 1000
const CENTS = 100
const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal
export const VOLUME_RATIO = (MICROLINK_VOLUME / COMPETITOR_VOLUME).toFixed(1)
export const PRICE_SAVING = Math.round(
  (1 - MICROLINK_PLAN.price / COMPETITOR_PRICE) * 100
)

export const MICROLINK_PRICE_LABEL = formatPrice(MICROLINK_PLAN.price)
export const MICROLINK_VOLUME_LABEL = formatNumber(MICROLINK_VOLUME)
export const COMPETITOR_PRICE_LABEL = formatPrice(COMPETITOR_PRICE)
export const COMPETITOR_VOLUME_LABEL = formatNumber(COMPETITOR_VOLUME)
export const COMPETITOR_SCALE_PRICE_LABEL = formatPrice(COMPETITOR_SCALE_PRICE)
export const COMPETITOR_SCALE_VOLUME_LABEL = formatNumber(
  COMPETITOR_SCALE_VOLUME
)

const CHECKED_AT = '2026-11-18'
export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

const EXTRA_MONTHLY_COST_LABEL = formatPrice(
  COMPETITOR_PRICE - MICROLINK_PLAN.price
)
const OVERAGE_LABEL = `${formatPrice(
  Math.round(COMPETITOR_OVERAGE * THOUSAND * CENTS) / CENTS
)} per ${formatNumber(THOUSAND)} extra\u00a0screenshots`

const FEWER_SCREENSHOTS_LABEL = formatNumber(
  MICROLINK_VOLUME - COMPETITOR_VOLUME
)

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='More requests.'
      highlight={'Lower\u00a0price.'}
    />
  ),
  caption: `Microlink bills requests: ${MICROLINK_VOLUME_LABEL} for ${MICROLINK_PRICE_LABEL}\u00a0per\u00a0month. ScreenshotOne\u00a0Growth bills screenshots: ${COMPETITOR_VOLUME_LABEL} for ${COMPETITOR_PRICE_LABEL}\u00a0per\u00a0month.`,
  microlink: {
    cta: 'alternative-screenshotone:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: ['Screenshots, PDF, metadata, previews, and remote\u00a0JS']
  },
  competitor: {
    name: 'ScreenshotOne Growth',
    price: COMPETITOR_PRICE,
    quota: COMPETITOR_VOLUME,
    unit: 'screenshots',
    items: [
      `Free plan: ${COMPETITOR_FREE_VOLUME}\u00a0screenshots/month`,
      missing(`${COMPETITOR_RATE_LIMIT}\u00a0requests/minute cap`),
      OVERAGE_LABEL,
      'PDF, scrolling screenshots, and video output',
      'Choose the IP location',
      'S3 upload and webhooks'
    ],
    source: 'https://screenshotone.com/pricing/',
    checkedAt: CHECKED_AT
  },
  note: `ScreenshotOne Growth costs ${EXTRA_MONTHLY_COST_LABEL} more per month and includes ${FEWER_SCREENSHOTS_LABEL} fewer\u00a0screenshots.`
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
    screenshotone: {
      name: 'ScreenshotOne',
      summary: {
        avgColdDuration: 7711.14,
        totalColdDuration: 53977.99
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 12695.34 },
        { url: 'https://example.com', coldDuration: 3134.84 },
        { url: 'https://stripe.com', coldDuration: 5677.9 },
        { url: 'https://screenshotone.com', coldDuration: 12138.63 },
        { url: 'https://news.ycombinator.com', coldDuration: 6857.3 },
        { url: 'https://github.com/trending', coldDuration: 6058.52 },
        { url: 'https://www.framer.com', coldDuration: 7415.46 }
      ]
    }
  }
}

export const SPEED = benchmarkClaims(BENCHMARK_DATA, 'screenshotone')

export const CTA = {
  caption: `${SPEED.averageRatio}× faster on average in our benchmark, with ${VOLUME_RATIO}× the monthly volume. Point one ScreenshotOne request at the Screenshot API and compare the\u00a0result.`,
  cta: 'alternative-screenshotone:footer-cta',
  links: [
    { href: '/screenshot', label: 'Explore the Screenshot API' },
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' }
  ]
}

export const FAQ_CAPTION =
  'Free tiers, rate limits, pricing and what a move from ScreenshotOne takes.'

export const FAQ_ITEMS = [
  {
    question: 'Is there a free ScreenshotOne alternative?',
    text: `Yes. Microlink’s free tier includes ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, with every Pro feature, served from the same ${CDN_EDGES} edge network as paid plans. ScreenshotOne’s free tier is ${COMPETITOR_FREE_VOLUME} screenshots per\u00a0month.`,
    answer: (
      <>
        <div>
          Yes. Microlink’s <Link href='/pricing'>free&nbsp;tier</Link> includes{' '}
          {FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests/day, renews daily, no
          credit card, with every Pro feature, served from the same
          {CDN_EDGES} edge network as paid&nbsp;plans.
        </div>
        <div>
          ScreenshotOne’s free tier is {COMPETITOR_FREE_VOLUME}&nbsp;screenshots
          per&nbsp;month.
        </div>
      </>
    )
  },
  {
    question:
      'How does Microlink compare to ScreenshotOne for screenshot speed and quality?',
    text: `Both services produce high-quality screenshots using Chromium. In our ${SPEED.run} cold-start benchmark, Microlink was ${SPEED.averageRatio}× faster on average. ScreenshotOne delivers good quality too, with optional GPU rendering on its Scale plan for WebGL-heavy\u00a0sites.`
  },
  {
    question: 'Can I migrate from ScreenshotOne to Microlink easily?',
    text: 'Yes. Microlink’s screenshot API accepts similar parameters (URL, viewport, format, full-page, selectors). Most migrations involve updating the API endpoint and key. The screenshot docs include examples for every parameter. Ask your favorite LLM client to migrate your code, or contact hello@microlink.io if you need help\u00a0migrating.',
    answer: (
      <>
        <div>
          Yes. Microlink’s screenshot API accepts similar parameters (URL,
          viewport, format, full-page, selectors). Most migrations involve
          updating the API endpoint and key. The{' '}
          <Link href='/docs/guides/screenshot'>screenshot&nbsp;docs</Link>{' '}
          include examples for every&nbsp;parameter.
        </div>
        <div>
          Ask your favorite LLM client to migrate your code, or contact{' '}
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link> if
          you need help&nbsp;migrating.
        </div>
      </>
    )
  },
  {
    question:
      'What do you get besides speed when switching from ScreenshotOne?',
    text: 'With Microlink, one API key and one integration gives you screenshots, PDF generation, metadata/Open Graph extraction, link previews, remote JavaScript execution, and Lighthouse\u00a0audits.'
  },
  {
    question: 'Is Microlink open source?',
    text: 'The core engine components are MIT-licensed and available on GitHub: Metascraper (metadata extraction), MQL (Microlink Query Language), and Browserless (headless browser). Read the code, fork it, or run it yourself. ScreenshotOne is closed-source. There is no way to inspect or audit the engine processing your\u00a0requests.',
    answer: (
      <>
        <div>
          The core engine components are MIT-licensed and available on GitHub:{' '}
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
          ScreenshotOne is closed-source. There is no way to inspect or audit
          the engine processing your&nbsp;requests.
        </div>
      </>
    )
  },
  {
    question: 'How much does ScreenshotOne cost compared to Microlink?',
    text: `ScreenshotOne’s recommended plan is $${COMPETITOR_PRICE}/month for ${formatNumber(
      COMPETITOR_VOLUME
    )} screenshots, capped at ${COMPETITOR_RATE_LIMIT} requests/minute. Microlink’s comparable plan is $${
      MICROLINK_PLAN.price
    }/month for ${formatNumber(
      DEFAULT_PLAN.reqsPerMonthTotal
    )} requests (${VOLUME_RATIO}× more volume for ${PRICE_SAVING}% less) with no rate limit on paid\u00a0plans.`
  },
  {
    question: 'Does Microlink have rate limits?',
    text: `There is no rate limit on paid plans. The only limit is your monthly request quota. ScreenshotOne enforces a per-minute rate limit (${COMPETITOR_RATE_LIMIT} requests/minute on the $${COMPETITOR_PRICE} plan), which can bottleneck batch pipelines or high-traffic embed\u00a0scenarios.`
  },
  {
    question: 'How does Microlink handle sites with cookie banners or ads?',
    text: 'Both Microlink and ScreenshotOne support ad blocking and cookie banner removal. In Microlink you enable them with the adblock parameter and custom CSS/JS injection to dismiss consent dialogs before the screenshot is\u00a0taken.',
    answer: (
      <div>
        Both Microlink and ScreenshotOne support ad blocking and cookie banner
        removal. In Microlink you enable them with{' '}
        <Link href='/docs/api/parameters/adblock'>adblock</Link> and custom
        CSS/JS injection to dismiss consent dialogs before the screenshot
        is&nbsp;taken.
      </div>
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
  BENCHMARK_DATA.results.screenshotone.summary.avgColdDuration -
  BENCHMARK_DATA.results.microlink.summary.avgColdDuration

const SAVED_HOURS_PER_MONTH = Math.round(
  (MONTHLY_SCREENSHOTS * SAVED_MS_PER_REQUEST) / MS_PER_HOUR
)

export const SERVICE_COLORS = {
  microlink: colors.red6,
  screenshotone: colors.gray5
}

const PROXY_COUNTRIES = 181

const COMPARISON_DATA = [
  {
    feature: 'Free\u00a0plan',
    microlink: `${FREE_PLAN_REQUESTS_PER_DAY}/day, renews\u00a0daily`,
    screenshotone: `${COMPETITOR_FREE_VOLUME}/month`
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    screenshotone: `${COMPETITOR_RATE_LIMIT}/min on\u00a0Growth`
  },
  { feature: 'PDF\u00a0generation', microlink: true, screenshotone: true },
  { feature: 'Video\u00a0output', microlink: true, screenshotone: 'Growth+' },
  {
    feature: 'Animated GIF\u00a0output',
    microlink: false,
    screenshotone: true
  },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    screenshotone: false,
    note: 'ScreenshotOne routes IP location through datacenter proxies on Growth and\u00a0Scale.'
  },
  {
    feature: 'Proxy\u00a0geolocation',
    microlink: `${PROXY_COUNTRIES}\u00a0countries`,
    screenshotone: 'Growth+',
    note: 'Microlink proxy.location takes any of 181 ISO country codes on every API key, free included. ScreenshotOne lists IP location controls from the Growth plan\u00a0upward.'
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    screenshotone: false
  },
  {
    feature: 'Metadata\u00a0extraction',
    microlink: true,
    screenshotone: true,
    note: 'ScreenshotOne returns Open Graph, title, icon and font metadata with the\u00a0capture.'
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
    screenshotone: false
  },
  {
    feature: 'Remote JS\u00a0execution',
    microlink: true,
    screenshotone: false
  },
  {
    feature: 'Browser chrome\u00a0overlay',
    microlink: true,
    screenshotone: false
  },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    screenshotone: false
  },
  {
    feature: 'GPU\u00a0rendering',
    microlink: false,
    screenshotone: 'Scale',
    note: 'ScreenshotOne lists GPU rendering on its Scale\u00a0plan.'
  },
  {
    feature: 'No\u2011code integrations (Zapier,\u00a0Make\u2026)',
    microlink: 'Partial',
    screenshotone: true
  },
  { feature: 'Async +\u00a0webhooks', microlink: false, screenshotone: true },
  { feature: 'S3 direct\u00a0upload', microlink: false, screenshotone: true },
  { feature: 'Bulk\u00a0screenshots', microlink: false, screenshotone: true },
  {
    feature: 'OpenAI Vision\u00a0integration',
    microlink: false,
    screenshotone: true
  },
  {
    feature: 'Team organizations /\u00a0roles',
    microlink: false,
    screenshotone: true
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
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
    number: '02',
    title: 'Screenshot, PDF, metadata, previews, and remote\u00a0JS',
    description: (
      <>
        Microlink handles screenshots, PDFs, metadata extraction, link previews,
        and remote JS in <b>a single integration</b> under one API&nbsp;key.
      </>
    )
  },
  {
    number: '03',
    title: `${VOLUME_RATIO}× more requests for ${PRICE_SAVING}%\u00a0less`,
    description: (
      <>
        ScreenshotOne{'\u2019'}s recommended plan: {COMPETITOR_VOLUME_LABEL}{' '}
        screenshots for <b>{COMPETITOR_PRICE_LABEL}/month</b>. Microlink:{' '}
        <b>
          {MICROLINK_VOLUME_LABEL} requests for {MICROLINK_PRICE_LABEL}
        </b>
        . ScreenshotOne{'\u2019'}s next plan up is{' '}
        {COMPETITOR_SCALE_PRICE_LABEL} for {COMPETITOR_SCALE_VOLUME_LABEL}
        &nbsp;screenshots.
      </>
    )
  },
  {
    number: '04',
    title: 'Open\u2011source core\u00a0(MIT)',
    description: (
      <>
        Metascraper, MQL, and Browserless are <b>MIT&#8209;licensed</b> on
        GitHub. Read the core engine, fork it, or self&#8209;host&nbsp;it.
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
        {'\u2026'}) when a target blocks the request, with nothing
        to&nbsp;configure.
      </>
    )
  },
  {
    number: '06',
    title: 'Presentation\u2011ready screenshots in one\u00a0call',
    description: (
      <>
        <b>screenshot.overlay</b> wraps any capture in a browser chrome frame
        with a custom gradient or image background.{' '}
        <b>Marketing&#8209;ready visuals</b> come straight from the&nbsp;API.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'S3 direct upload with\u00a0webhooks',
    description:
      'ScreenshotOne can upload screenshots directly to S3\u2011compatible storage and notify you via webhook when done. Microlink does not have native S3\u00a0upload.'
  },
  {
    title: 'GPU rendering',
    description:
      'ScreenshotOne lists GPU rendering on its Scale plan for sites that rely on WebGL or heavy canvas\u00a0operations.'
  },
  {
    title: 'Built\u2011in OpenAI Vision\u00a0analysis',
    description:
      'ScreenshotOne integrates with vision models natively: capture and analyze a screenshot in one API call. Microlink does not have this\u00a0integration.'
  },
  {
    title: 'No\u2011code integrations',
    description:
      'ScreenshotOne publishes official integrations for Make, Zapier, n8n, Bubble, and Clay. Microlink has fewer no\u2011code connectors\u00a0today.'
  },
  {
    title: 'Team access\u00a0control',
    description:
      'ScreenshotOne supports organizations with role\u2011based access. Microlink does not have a team/organization\u00a0feature.'
  },
  {
    title: 'Bulk\u00a0screenshots',
    description:
      'ScreenshotOne captures a list of URLs in one bulk request. Microlink captures one URL per\u00a0request.'
  }
]

export const META = {
  title: 'ScreenshotOne Alternative for Faster Cold Starts',
  description: `Microlink is ${SPEED.averageRatio}× faster on average than ScreenshotOne in our benchmark, with screenshots, PDF, metadata, and link previews in one API.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ScreenshotOne Alternative for Faster Cold Starts |\u00a0Microlink',
    description: `Compare Microlink and ScreenshotOne for latency-sensitive screenshot workloads. Microlink is ${SPEED.averageRatio}× faster on average (up to ${SPEED.widestGap.ratio}× faster on ${SPEED.widestGap.host}) while also covering PDF generation, metadata extraction, and more in one API.`,
    url: 'https://microlink.io/alternative/screenshotone',
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
  caption: <>The usual reasons teams move from ScreenshotOne to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      Microlink leads on volume, price and open source. The last rows are where
      ScreenshotOne ships more: GPU, no&#8209;code, webhooks, S3 upload, bulk
      jobs, OpenAI Vision and team&nbsp;roles.
    </>
  ),
  columns: ['Microlink', 'ScreenshotOne'],
  rows: COMPARISON_DATA,
  competitorKey: 'screenshotone',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>ScreenshotOne</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'ScreenshotOne goes further on GPU, no\u2011code, webhooks, S3 upload, bulk jobs, OpenAI Vision and team\u00a0roles.',
  items: HONESTY_ITEMS
}
