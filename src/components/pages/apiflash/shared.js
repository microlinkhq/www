import React from 'react'

import { Link } from 'components/elements/Link'
import {
  GradientText,
  MICROLINK_PLAN,
  faqPageStructured,
  formatCheckedAt
} from 'components/patterns/ProductStory'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import { formatNumber } from 'helpers/format-number'
import { DEFAULT_PLAN } from 'helpers/pro-plans'
import { benchmarkClaims } from 'components/patterns/SpeedSection/claims'
import {
  formatPerThousand,
  missing
} from 'components/patterns/ProductStory/price-comparison'
import { AlternativePricingTitle } from 'components/patterns/ProductStory/alternative-section'
import { colors } from 'theme'
import { CDN_EDGES } from 'helpers/cdn-edges'

const NBSP = '\u00a0'

const COMPETITOR_PRICE = 35
const COMPETITOR_VOLUME = 10000
const COMPETITOR_FREE_SCREENSHOTS = 100
const COMPETITOR_LITE_PRICE = 7
const COMPETITOR_RATE_LIMIT = 20
const COMPETITOR_BURST = 400
const COMPETITOR_LITE_VOLUME = 1000
const CHECKED_AT = '2026-11-18'

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
    apiflash: {
      name: 'ApiFlash',
      summary: {
        avgColdDuration: 9463.2,
        totalColdDuration: 66242.4
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 14232.91 },
        { url: 'https://example.com', coldDuration: 1819.86 },
        { url: 'https://stripe.com', coldDuration: 5900.18 },
        { url: 'https://screenshotone.com', coldDuration: 9802.49 },
        { url: 'https://news.ycombinator.com', coldDuration: 1967.53 },
        { url: 'https://github.com/trending', coldDuration: 5365.86 },
        { url: 'https://www.framer.com', coldDuration: 27153.57 }
      ]
    }
  }
}

export const SPEED = benchmarkClaims(BENCHMARK_DATA, 'apiflash')

const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal
const VOLUME_RATIO = (MICROLINK_VOLUME / COMPETITOR_VOLUME).toFixed(1)
const PRICE_GAP = MICROLINK_PLAN.price - COMPETITOR_PRICE
const COMPETITOR_PER_THOUSAND = formatPerThousand(
  COMPETITOR_PRICE,
  COMPETITOR_VOLUME,
  'screenshots'
)
const MICROLINK_PER_THOUSAND = formatPerThousand(
  MICROLINK_PLAN.price,
  MICROLINK_VOLUME,
  'requests'
)

export const PRICING_FACTS = {
  competitorPrice: COMPETITOR_PRICE,
  competitorVolume: formatNumber(COMPETITOR_VOLUME),
  competitorFree: COMPETITOR_FREE_SCREENSHOTS,
  competitorRateLimit: COMPETITOR_RATE_LIMIT,
  competitorBurst: COMPETITOR_BURST,
  competitorLitePrice: COMPETITOR_LITE_PRICE,
  competitorLiteVolume: formatNumber(COMPETITOR_LITE_VOLUME),
  microlinkPrice: MICROLINK_PLAN.price,
  microlinkVolume: formatNumber(MICROLINK_VOLUME),
  volumeRatio: VOLUME_RATIO,
  priceGap: PRICE_GAP
}

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='More volume.'
      highlight={'Far less per\u00a0screenshot.'}
    />
  ),
  caption: `Microlink bills requests: ${formatNumber(MICROLINK_VOLUME)} for $${
    MICROLINK_PLAN.price
  }${NBSP}per${NBSP}month. ApiFlash${NBSP}Medium bills screenshots: ${formatNumber(
    COMPETITOR_VOLUME
  )} for $${COMPETITOR_PRICE}${NBSP}per${NBSP}month.`,
  microlink: {
    cta: 'alternative-apiflash:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: [`Screenshots, PDF, metadata, previews, and remote${NBSP}JS`]
  },
  competitor: {
    name: 'ApiFlash Medium',
    price: COMPETITOR_PRICE,
    quota: COMPETITOR_VOLUME,
    unit: 'screenshots',
    items: [
      `Free plan: ${COMPETITOR_FREE_SCREENSHOTS}${NBSP}screenshots/month`,
      missing(
        `${COMPETITOR_RATE_LIMIT}${NBSP}requests/second cap, burst${NBSP}${COMPETITOR_BURST}`
      ),
      `PNG, JPEG, and WebP${NBSP}screenshots`,
      `Export to${NBSP}S3`,
      `Priority${NBSP}support`
    ],
    source: 'https://apiflash.com/',
    checkedAt: CHECKED_AT
  },
  note: `$${PRICE_GAP} more per month buys ${VOLUME_RATIO}× the volume, at ${MICROLINK_PER_THOUSAND} against ${COMPETITOR_PER_THOUSAND}, plus PDF, metadata, and link previews from the same${NBSP}API.`
}

export const LAST_VERIFIED = formatCheckedAt(
  PRICE_COMPARISON.competitor.checkedAt
)

export const CTA = {
  caption: `${SPEED.averageRatio}× faster on average than ApiFlash in our benchmark. ${VOLUME_RATIO}× the monthly volume for $${PRICE_GAP}${NBSP}more.`,
  cta: 'alternative-apiflash:footer-cta',
  links: [
    { href: '/screenshot', label: 'Explore the Screenshot API' },
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' }
  ]
}

export const FAQ_CAPTION = `Cost per screenshot, rate limits, storage, and migration, from ApiFlash’s public${NBSP}site.`

export const FAQ_ITEMS = [
  {
    question: 'Why switch from ApiFlash to Microlink for production workloads?',
    text: 'ApiFlash is a straightforward screenshot API. Microlink adds lower cold-start latency, no rate limit on paid plans, PDFs, metadata, link previews, and built-in antibot handling, all from the same API and the same key. ApiFlash stays focused on screenshot capture, while Microlink covers screenshot workflows that usually spill into scraping, previews, automation, or AI\u00a0pipelines.'
  },
  {
    question: 'How fast is Microlink against ApiFlash in the benchmark?',
    text: `In the ${SPEED.run} benchmark, Microlink averaged ${SPEED.microlinkAverage} per cold start and ApiFlash averaged ${SPEED.competitorAverage} on the same ${SPEED.urls}\u2011URL suite: ${SPEED.averageRatio}× faster on average. Microlink was up to ${SPEED.widestGap.ratio}× faster on ${SPEED.widestGap.host}: ${SPEED.widestGap.microlink} against\u00a0${SPEED.widestGap.competitor}.`
  },
  {
    question:
      'How does Microlink pricing compare to ApiFlash at higher volume?',
    text: `ApiFlash Medium is $${COMPETITOR_PRICE}/month for ${formatNumber(
      COMPETITOR_VOLUME
    )} screenshots. Microlink Pro is $${
      MICROLINK_PLAN.price
    }/month for ${formatNumber(
      MICROLINK_VOLUME
    )} requests. That is ${VOLUME_RATIO}× more volume for $${PRICE_GAP} more per month: ${COMPETITOR_PER_THOUSAND} on ApiFlash Medium against ${MICROLINK_PER_THOUSAND} on\u00a0Microlink${NBSP}Pro.`
  },
  {
    question: 'Can I migrate from ApiFlash urltoimage to Microlink quickly?',
    text: 'Usually, yes. ApiFlash uses a urltoimage endpoint with parameters like url, full_page, format, wait_for, headers, and cookies. Microlink supports the same capture concepts, even though some parameter names differ. In practice, most migrations are endpoint-and-parameter mapping\u00a0work.',
    answer: (
      <>
        <div>
          Usually, yes. ApiFlash uses a <b>urltoimage</b> endpoint with
          parameters like <b>url</b>, <b>full_page</b>, <b>format</b>,{' '}
          <b>wait_for</b>, <b>headers</b>, and <b>cookies</b>. Microlink
          supports the same capture concepts, even though some parameter names
          differ.
        </div>
        <div>
          In practice, most migrations are endpoint&#8209;and&#8209;parameter
          mapping work. Start from the{' '}
          <Link href='/docs/guides/screenshot'>screenshot&nbsp;docs</Link> and
          adapt your existing request&nbsp;shape.
        </div>
      </>
    )
  },
  {
    question: 'What if I depend on ApiFlash S3 export?',
    text: 'ApiFlash includes Export to S3 on its plans, while Microlink does not offer native S3 or cloud-storage upload. If your current workflow is capture and push straight to S3, you would need to add that storage step yourself after the Microlink\u00a0response.'
  },
  {
    question: 'Does Microlink handle bot-protected pages better than ApiFlash?',
    text: 'ApiFlash says some strict bot protections may still block access and recommends supplying your own proxy through the proxy parameter. Proxy sourcing and tuning stay on you. Microlink includes a built-in proxy layer plus detection for 30+ antibot and CAPTCHA providers on every\u00a0request.'
  },
  {
    question:
      'Is Microlink overkill if I only need simple website screenshots?',
    text: 'Possibly. If all you need is a focused screenshot API with PNG, JPEG, or WebP output plus full-page and mobile captures, ApiFlash is simpler and built for that use case. Microlink fits when screenshot capture is one part of the workflow and the same API also covers metadata, PDF, previews, remote JS, or antibot-protected\u00a0URLs.'
  },
  {
    question: 'Does Microlink have a more generous free plan than ApiFlash?',
    text: `ApiFlash gives you ${COMPETITOR_FREE_SCREENSHOTS} free screenshots per month. Microlink gives you ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, with every Pro feature, so you test the whole browser API, proxy included. If you are evaluating an ApiFlash replacement gradually, the same request also returns metadata, PDF or markdown, so one call tests the whole\u00a0migration.`
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

export const SERVICE_COLORS = {
  microlink: colors.red6,
  apiflash: colors.gray5
}

const ENTERPRISE_PLAN = 'Enterprise plan'

const PROXY_COUNTRIES = 181

const COMPARISON_DATA = [
  {
    feature: 'Free\u00a0plan',
    microlink: `${FREE_PLAN_REQUESTS_PER_DAY}/day, renews\u00a0daily`,
    apiflash: `${PRICING_FACTS.competitorFree}/month`
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    apiflash: `${PRICING_FACTS.competitorRateLimit}/s, burst\u00a0${PRICING_FACTS.competitorBurst}`
  },
  {
    feature: 'WebP\u00a0output',
    note: 'Microlink renders PNG or JPEG, and its CDN serves WebP to devices that support\u00a0it.',
    microlink: 'Automatic via\u00a0CDN',
    apiflash: true
  },
  { feature: 'PDF\u00a0generation', microlink: true, apiflash: false },
  {
    feature: 'Video output (MP4,\u00a0WebM)',
    microlink: true,
    apiflash: false
  },
  { feature: 'Dark/light mode\u00a0capture', microlink: true, apiflash: false },
  {
    feature: 'Device emulation\u00a0presets',
    microlink: true,
    apiflash: false
  },
  { feature: 'Signed request\u00a0URLs', microlink: true, apiflash: false },
  { feature: 'S3 direct\u00a0upload', microlink: false, apiflash: true },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    note: 'ApiFlash lists managed proxies on its custom Enterprise\u00a0plan.',
    microlink: true,
    apiflash: ENTERPRISE_PLAN
  },
  {
    feature: 'Proxy IP\u00a0geolocation',
    note: 'Microlink proxy.location takes any of 181 ISO country codes on every API key, free included. ApiFlash sets the proxy country on\u00a0Enterprise.',
    microlink: `${PROXY_COUNTRIES}\u00a0countries`,
    apiflash: ENTERPRISE_PLAN
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    apiflash: false
  },
  { feature: 'Metadata\u00a0extraction', microlink: true, apiflash: false },
  {
    feature: 'Link\u00a0previews',
    note: (
      <>
        <Link href='/link-preview'>Link&nbsp;preview&nbsp;API</Link> returns the
        oEmbed iframe, card fields, and media in one&nbsp;call.
      </>
    ),
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Remote JS execution (return\u00a0values)',
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Markdown, Lighthouse and tech\u00a0detection',
    microlink: true,
    apiflash: false
  },
  { feature: 'Browser chrome\u00a0overlay', microlink: true, apiflash: false },
  {
    feature: `${CDN_EDGES} CDN edge\u00a0nodes`,
    microlink: true,
    apiflash: false
  },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    apiflash: false
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'Less waiting in the critical\u00a0path',
    description: (
      <>
        ApiFlash averaged <b>{SPEED.competitorAverage}</b> in the benchmark.
        Microlink averaged <b>{SPEED.microlinkAverage}</b>. That is{' '}
        <b>{SPEED.averageRatio}&times; faster on average</b>, and up to{' '}
        {SPEED.widestGap.ratio}&times; faster on&nbsp;{SPEED.widestGap.host}.
      </>
    )
  },
  {
    number: '02',
    title: `${PRICING_FACTS.volumeRatio}× more monthly volume for $${PRICING_FACTS.priceGap}\u00a0more`,
    description: (
      <>
        ApiFlash Medium is <b>${PRICING_FACTS.competitorPrice}</b> for{' '}
        {PRICING_FACTS.competitorVolume} screenshots. Microlink is{' '}
        <b>
          ${PRICING_FACTS.microlinkPrice} for {PRICING_FACTS.microlinkVolume}{' '}
          requests
        </b>
        .
      </>
    )
  },
  {
    number: '03',
    title: 'No second tool when requirements\u00a0grow',
    description: (
      <>
        ApiFlash stays focused on screenshots. Microlink also gives you{' '}
        <b>PDFs, metadata extraction, link previews, remote JS</b>, and more
        from <b>the same&nbsp;integration</b>.
      </>
    )
  },
  {
    number: '04',
    title: 'Built for blocked\u00a0pages',
    description: (
      <>
        ApiFlash documents a BYO&#8209;proxy approach when stricter bot
        protection gets in the way. Microlink includes a{' '}
        <b>built&#8209;in proxy layer</b> and detection for{' '}
        <b>30+ antibot and CAPTCHA providers</b> so protected pages need less
        infrastructure around&nbsp;them.
      </>
    )
  },
  {
    number: '05',
    title: 'A free tier with every Pro\u00a0feature',
    description: (
      <>
        ApiFlash offers {PRICING_FACTS.competitorFree} free screenshots per
        month. Microlink gives you{' '}
        <b>
          {FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit
          card
        </b>
        , with proxy, PDF, metadata and browser automation included, so the free
        tier covers the whole&nbsp;API.
      </>
    )
  },
  {
    number: '06',
    title: 'Open\u2011source core\u00a0(MIT)',
    description: (
      <>
        Metascraper, MQL, and Browserless are <b>MIT-licensed</b> on GitHub.
        Read the core engine, fork it, or self&#8209;host it. ApiFlash is
        closed&nbsp;source.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'S3 export built\u00a0in',
    description:
      'ApiFlash includes Export to S3 on every plan, free included. Microlink does not provide native S3 or cloud\u2011storage upload, so you would need to add that storage step\u00a0yourself.'
  },
  {
    title: `$${PRICING_FACTS.competitorLitePrice} paid plan for light\u00a0usage`,
    description: `ApiFlash starts at $${PRICING_FACTS.competitorLitePrice}/month for ${PRICING_FACTS.competitorLiteVolume} screenshots. Microlink Pro starts at $${PRICING_FACTS.microlinkPrice}/month for ${PRICING_FACTS.microlinkVolume}\u00a0requests.`
  },
  {
    title: 'AWS Lambda + isolated Chrome\u00a0model',
    description:
      'ApiFlash runs on AWS Lambda and says each screenshot gets a brand\u2011new isolated Chrome instance that is destroyed after capture. No cookies, cache, or session state carry over from one capture to the\u00a0next.'
  },
  {
    title: 'WebP files from the\u00a0API',
    description:
      'ApiFlash returns PNG, JPEG, or WebP from the capture call. Microlink renders PNG or JPEG and serves WebP only through its CDN, to devices that support\u00a0it.'
  }
]

const META_TITLE = 'ApiFlash Alternative for Production Screenshot Workloads'

const META_FACTS = `Microlink is ${SPEED.averageRatio}× faster on average than ApiFlash in our benchmark and gives you ${PRICING_FACTS.microlinkVolume} requests for $${PRICING_FACTS.microlinkPrice} vs ${PRICING_FACTS.competitorVolume} screenshots for $${PRICING_FACTS.competitorPrice}`

export const META = {
  title: META_TITLE,
  description: `${META_FACTS}, plus PDF, metadata, previews, and built-in antibot tooling.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: META_TITLE,
    description: `Compare Microlink and ApiFlash for production screenshot workloads. ${META_FACTS}, and covers screenshots, PDF, metadata, previews, and remote JS from one\u00a0API.`,
    url: 'https://microlink.io/alternative/apiflash',
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
  caption: <>The usual reasons teams move from ApiFlash to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      ApiFlash facts come from its public site and docs. Rows where it does
      more, S3 upload and WebP files, are listed&nbsp;too.
    </>
  ),
  columns: ['Microlink', 'ApiFlash'],
  rows: COMPARISON_DATA,
  competitorKey: 'apiflash',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>ApiFlash</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption: `S3 export, a $${PRICING_FACTS.competitorLitePrice} entry plan, a fresh Chrome per capture, and WebP files straight from the${NBSP}API.`,
  items: HONESTY_ITEMS
}
