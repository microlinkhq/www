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
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import { formatNumber } from 'helpers/format-number'
import { DEFAULT_PLAN } from 'helpers/pro-plans'
import { benchmarkClaims } from 'components/patterns/SpeedSection/claims'
import { colors } from 'theme'

const COMPETITOR_PRICE = 59.99
const COMPETITOR_VOLUME = 30000
export const COMPETITOR_FREE_VOLUME = 100
const COMPETITOR_OVERAGE_PER_10K = 79.99
const OVERAGE_BLOCK = 10000
export const COMPETITOR_RATE_LIMIT = 45
const THOUSAND = 1000
const CENTS = 100
const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal

export const VOLUME_ADVANTAGE_PCT = Math.floor(
  ((MICROLINK_VOLUME - COMPETITOR_VOLUME) / COMPETITOR_VOLUME) * 100
)
export const PRICE_REDUCTION_PCT = Math.floor(
  ((COMPETITOR_PRICE - MICROLINK_PLAN.price) / COMPETITOR_PRICE) * 100
)

export const MICROLINK_PRICE_LABEL = formatPrice(MICROLINK_PLAN.price)
export const COMPETITOR_PRICE_LABEL = formatPrice(COMPETITOR_PRICE)
const formatCents = amount => `$${amount.toFixed(2)}`
const perThousand = (price, volume) =>
  Math.round((price * CENTS * THOUSAND) / volume) / CENTS
const OVERAGE_PER_THOUSAND = perThousand(
  COMPETITOR_OVERAGE_PER_10K,
  OVERAGE_BLOCK
)
const PLAN_PER_THOUSAND = perThousand(COMPETITOR_PRICE, COMPETITOR_VOLUME)

export const OVERAGE_LABEL = `${formatPrice(
  OVERAGE_PER_THOUSAND
)} per ${formatNumber(THOUSAND)} extra\u00a0snapshots`
export const PLAN_PER_THOUSAND_LABEL = formatCents(PLAN_PER_THOUSAND)
export const OVERAGE_MULTIPLE = Math.round(
  OVERAGE_PER_THOUSAND / PLAN_PER_THOUSAND
)
const BENCHMARK_TIMESTAMP = '2026-04-16T15:09:25.379Z'
export const MICROLINK_VOLUME_LABEL = formatNumber(MICROLINK_VOLUME)
export const COMPETITOR_VOLUME_LABEL = formatNumber(COMPETITOR_VOLUME)

export const BENCHMARK_DATA = {
  timestamp: BENCHMARK_TIMESTAMP,
  testUrls: [
    {
      url: 'https://vercel.com',
      width: 1920,
      height: 1080,
      fullPage: true,
      format: 'jpeg',
      deviceScaleFactor: 1,
      adblock: true
    },
    {
      url: 'https://example.com',
      width: 1280,
      height: 800,
      fullPage: false,
      format: 'png',
      deviceScaleFactor: 1,
      adblock: true
    },
    {
      url: 'https://stripe.com',
      width: 393,
      height: 852,
      fullPage: false,
      format: 'jpeg',
      deviceScaleFactor: 2,
      adblock: true
    },
    {
      url: 'https://screenshotone.com',
      width: 1920,
      height: 1080,
      fullPage: true,
      format: 'png',
      deviceScaleFactor: 1,
      adblock: true
    },
    {
      url: 'https://news.ycombinator.com',
      width: 1440,
      height: 1080,
      fullPage: true,
      format: 'jpeg',
      deviceScaleFactor: 1,
      adblock: true
    },
    {
      url: 'https://github.com/trending',
      width: 768,
      height: 1024,
      fullPage: false,
      format: 'png',
      deviceScaleFactor: 1,
      adblock: true
    }
  ],
  results: {
    microlink: {
      name: 'Microlink',
      summary: {
        avgColdDuration: 4077.0,
        totalColdDuration: 24461.99
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 6362.6325
        },
        {
          url: 'https://example.com',
          coldDuration: 1189.0359579999995
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3159.544583000001
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 5549.680625000001
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 3744.222084000001
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 4456.877667000001
        }
      ]
    },
    screenshotlayer: {
      name: 'Screenshotlayer',
      summary: {
        avgColdDuration: 8083.59,
        totalColdDuration: 48501.53
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 9820.394290999999
        },
        {
          url: 'https://example.com',
          coldDuration: 6413.815875
        },
        {
          url: 'https://stripe.com',
          coldDuration: 7420.940957999992
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 9278.437207999988
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 6903.8293330000015
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 8664.116000000038
        }
      ]
    }
  }
}

export const SPEED = benchmarkClaims(BENCHMARK_DATA, 'screenshotlayer')

const CHECKED_AT = '2026-11-18'
export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

const EXTRA_MONTHLY_COST_LABEL = formatPrice(
  Number((COMPETITOR_PRICE - MICROLINK_PLAN.price).toFixed(2))
)
export const FEWER_REQUESTS_LABEL = formatNumber(
  MICROLINK_VOLUME - COMPETITOR_VOLUME
)

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='More headroom.'
      highlight={'Less cap\u00a0math.'}
    />
  ),
  caption: `Microlink bills requests: ${MICROLINK_VOLUME_LABEL} for ${MICROLINK_PRICE_LABEL}\u00a0per\u00a0month. Screenshotlayer\u00a0Professional bills snapshots: ${COMPETITOR_VOLUME_LABEL} for ${COMPETITOR_PRICE_LABEL}\u00a0per\u00a0month.`,
  microlink: {
    cta: 'alternative-screenshotlayer:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: [
      'Screenshots, PDF, metadata, previews, and remote\u00a0JS',
      'Proxy and antibot handling included'
    ]
  },
  competitor: {
    name: 'Screenshotlayer Professional',
    price: COMPETITOR_PRICE,
    quota: COMPETITOR_VOLUME,
    unit: 'snapshots',
    items: [
      `Free plan: ${COMPETITOR_FREE_VOLUME}\u00a0snapshots/month`,
      missing(`${COMPETITOR_RATE_LIMIT}\u00a0requests/minute cap`),
      OVERAGE_LABEL,
      '20 dedicated workers',
      'WebP output with quality up to 100%',
      'Direct export to FTP or S3'
    ],
    source: 'https://screenshotlayer.com/pricing',
    checkedAt: CHECKED_AT
  },
  note: `Screenshotlayer Professional costs ${EXTRA_MONTHLY_COST_LABEL} more per month and includes ${FEWER_REQUESTS_LABEL} fewer snapshots.`
}

export const CTA = {
  caption: `${VOLUME_ADVANTAGE_PCT}% more monthly volume for ${PRICE_REDUCTION_PCT}% less, no rate limit on paid plans.`,
  cta: 'alternative-screenshotlayer:footer-cta',
  links: [
    { href: '/screenshot', label: 'Explore the Screenshot API' },
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' }
  ]
}

export const FAQ_CAPTION =
  'Free tiers, rate limits, overages and moving off Screenshotlayer signed URLs.'

export const FAQ_ITEMS = [
  {
    question:
      'Is there a free Screenshotlayer alternative with more room to test?',
    text: `Yes. Microlink’s free plan is ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, with every Pro feature included: proxy, PDF, metadata and browser automation. Screenshotlayer’s free plan is ${COMPETITOR_FREE_VOLUME} screenshots per\u00a0month.`,
    answer: (
      <>
        <div>
          Yes. Microlink’s free plan is{' '}
          <b>{FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests/day</b>, renews daily,
          no credit card, with every Pro feature included: proxy, PDF, metadata
          and browser&nbsp;automation.
        </div>
        <div>
          Screenshotlayer’s free plan is{' '}
          <b>{COMPETITOR_FREE_VOLUME} screenshots per&nbsp;month</b>.
        </div>
      </>
    )
  },
  {
    question: 'Why does this benchmark exclude framer.com?',
    text: `This page excludes framer.com because Screenshotlayer returned 400 Bad Request on that URL in the ${SPEED.run} benchmark run. To keep the comparison fair, the benchmark section only compares the ${SPEED.urls} URLs both providers\u00a0completed.`,
    answer: (
      <>
        <div>
          Because Screenshotlayer returned <b>400 Bad Request</b> on framer.com
          in the {SPEED.run} benchmark&nbsp;run.
        </div>
        <div>
          To keep the comparison fair, this page only compares the{' '}
          <b>{SPEED.urls} URLs both providers completed</b>. That still leaves
          Microlink ahead on every shared URL in the&nbsp;dataset.
        </div>
      </>
    )
  },
  {
    question:
      'How do Microlink and Screenshotlayer differ on rate limits and concurrency?',
    text: 'Screenshotlayer publishes explicit per-minute caps: 2 requests per minute on Free, 30 per minute on Basic, and 45 per minute on Professional and Enterprise. The docs also recommend limiting paid plans to about 1 request every 2 seconds for best performance. Microlink has no rate limit on paid\u00a0plans.',
    answer: (
      <>
        <div>
          Screenshotlayer publishes explicit per-minute caps:{' '}
          <b>2 requests/minute on Free</b>, <b>30/minute on Basic</b>, and{' '}
          <b>45/minute on Professional and Enterprise</b>. The docs also
          recommend limiting paid plans to about{' '}
          <b>1 request every 2 seconds</b> for best&nbsp;performance.
        </div>
        <div>
          Microlink has no rate limit on paid plans. Bursts run at whatever rate
          you send, up to the monthly&nbsp;quota.
        </div>
      </>
    )
  },
  {
    question: 'How does pricing compare once I outgrow the free plan?',
    text: `Screenshotlayer Professional is ${COMPETITOR_PRICE_LABEL} per month for ${COMPETITOR_VOLUME_LABEL} snapshots. Microlink is ${MICROLINK_PRICE_LABEL} per month for ${MICROLINK_VOLUME_LABEL} requests. That means Microlink gives you ${VOLUME_ADVANTAGE_PCT}% more monthly volume for ${PRICE_REDUCTION_PCT}% less. Screenshotlayer’s published overage on Professional is\u00a0${OVERAGE_LABEL}.`,
    answer: (
      <>
        <div>
          Screenshotlayer Professional is{' '}
          <b>
            {COMPETITOR_PRICE_LABEL}/month for {COMPETITOR_VOLUME_LABEL}{' '}
            snapshots
          </b>
          . Microlink is{' '}
          <b>
            {MICROLINK_PRICE_LABEL}/month for {MICROLINK_VOLUME_LABEL}
            &nbsp;requests
          </b>
          .
        </div>
        <div>
          That means Microlink gives you <b>{VOLUME_ADVANTAGE_PCT}% more</b>{' '}
          monthly volume for <b>{PRICE_REDUCTION_PCT}% less</b>.
          Screenshotlayer’s published overage on Professional is{' '}
          <b>{OVERAGE_LABEL}</b>.
        </div>
      </>
    )
  },
  {
    question:
      'Can I migrate from Screenshotlayer signed URLs to Microlink easily?',
    text: 'Usually, yes. Screenshotlayer already uses a simple URL-based request model with parameters like url, viewport, fullpage, format, and css_url. Microlink supports the same core screenshot intent, so most migrations are endpoint-and-parameter mapping\u00a0work.',
    answer: (
      <>
        <div>
          Usually, yes. Screenshotlayer already uses a simple URL-based request
          model with parameters like <i>url</i>, <i>viewport</i>,{' '}
          <i>fullpage</i>, <i>format</i>, and <i>css_url</i>. Microlink supports
          the same core screenshot intent, even if some parameter
          names&nbsp;differ.
        </div>
        <div>
          In practice, most migrations are endpoint-and-parameter mapping work.
          Start from the{' '}
          <Link href='/docs/guides/screenshot'>screenshot&nbsp;guide</Link> and
          adapt your existing request builder around Microlink’s
          query&nbsp;shape.
        </div>
      </>
    )
  },
  {
    question: 'What if I rely on Screenshotlayer S3 export?',
    text: 'Screenshotlayer documents direct export to AWS S3 or FTP on its Professional and Enterprise plans. Microlink does not offer native storage export, so you would need to add that storage step yourself after the API\u00a0response.',
    answer: (
      <>
        <div>
          Screenshotlayer documents direct export to <b>AWS S3 or FTP</b> on its
          Professional and Enterprise&nbsp;plans.
        </div>
        <div>
          Microlink does not offer native storage export, so if your current
          workflow is “capture and push straight to S3 or FTP”, you would need
          to add that storage step yourself after the API&nbsp;response.
        </div>
      </>
    )
  },
  {
    question:
      'Does Microlink still cover Screenshotlayer basics like full-page and CSS injection?',
    text: 'Yes. Both products cover the core screenshot controls most teams expect: full-page capture, custom CSS, signed URLs, caching, and direct image delivery. Microlink adds PDFs, metadata, previews, browser automation, and blocked-page tooling on top of those\u00a0basics.'
  },
  {
    question:
      'Is Screenshotlayer still fine if I only need simple screenshot URLs?',
    text: 'Yes. If your use case is strictly screenshot-first and you like a simple signed URL model, Screenshotlayer is still a reasonable option. Its lower-priced entry plan, dedicated worker model, and built-in S3 or FTP export can make sense for some teams. Microlink fits when screenshot capture starts touching metadata, PDFs, previews, anti-bot handling, or bursty traffic that runs into plan\u00a0caps.'
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

export const SERVICE_COLORS = {
  microlink: colors.red6,
  screenshotlayer: colors.gray5
}

const COMPARISON_DATA = [
  {
    feature: 'Free\u00a0plan',
    microlink: `${FREE_PLAN_REQUESTS_PER_DAY}/day, renews\u00a0daily`,
    screenshotlayer: `${COMPETITOR_FREE_VOLUME}/month`
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    screenshotlayer: `${COMPETITOR_RATE_LIMIT}/min on\u00a0Professional`
  },
  {
    feature: 'Full\u2011page\u00a0screenshots',
    microlink: true,
    screenshotlayer: true
  },
  {
    feature: 'Custom CSS\u00a0injection',
    microlink: true,
    screenshotlayer: true
  },
  {
    feature: 'Device emulation\u00a0presets',
    microlink: true,
    screenshotlayer: 'Partial',
    note: 'Screenshotlayer documents custom viewport sizes and common device dimensions, with no named\u00a0presets.'
  },
  {
    feature: 'PDF\u00a0generation',
    microlink: true,
    screenshotlayer: false,
    note: 'Screenshotlayer documents PNG, JPG, GIF, and WebP output\u00a0only.'
  },
  {
    feature: 'Metadata\u00a0extraction',
    microlink: true,
    screenshotlayer: false
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
    screenshotlayer: false
  },
  {
    feature: 'Arbitrary custom HTTP\u00a0headers',
    microlink: true,
    screenshotlayer: 'Partial',
    note: 'Screenshotlayer documents User\u2011Agent and Accept\u2011Language overrides\u00a0only.'
  },
  {
    feature: 'Custom\u00a0cookies',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'Click/scroll\u00a0interactions',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'Wait for\u00a0selector',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'Browser chrome\u00a0overlay',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'Remote JS execution (return\u00a0values)',
    microlink: true,
    screenshotlayer: false
  },
  {
    feature: 'S3 / FTP direct\u00a0export',
    microlink: false,
    screenshotlayer: 'Professional+',
    note: 'Screenshotlayer documents direct export to AWS S3 or FTP on Professional and\u00a0Enterprise.'
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'No rate limit on paid\u00a0plans',
    description: (
      <>
        Screenshotlayer publishes <b>30&nbsp;requests/minute on Basic</b> and{' '}
        <b>45&nbsp;requests/minute on Professional</b>, then recommends keeping
        paid usage around <b>1 request every 2 seconds</b> for best performance.
        Microlink has <b>no rate limit on paid plans</b>.
      </>
    )
  },
  {
    number: '02',
    title: `${VOLUME_ADVANTAGE_PCT}% more monthly volume for ${PRICE_REDUCTION_PCT}%\u00a0less`,
    description: (
      <>
        Screenshotlayer Professional is{' '}
        <b>
          {COMPETITOR_PRICE_LABEL} for {COMPETITOR_VOLUME_LABEL} snapshots
        </b>
        . Microlink is{' '}
        <b>
          {MICROLINK_PRICE_LABEL} for {MICROLINK_VOLUME_LABEL} requests
        </b>
        . That is <b>{VOLUME_ADVANTAGE_PCT}% more included volume</b> while
        paying <b>{PRICE_REDUCTION_PCT}%&nbsp;less</b>.
      </>
    )
  },
  {
    number: '03',
    title: `Overage costs ${OVERAGE_MULTIPLE}× the plan\u00a0rate`,
    description: (
      <>
        Screenshotlayer Professional works out to{' '}
        <b>{PLAN_PER_THOUSAND_LABEL} per 1,000 snapshots</b> inside the plan.
        Past {COMPETITOR_VOLUME_LABEL}, the published overage is{' '}
        <b>{OVERAGE_LABEL}</b>. Microlink includes{' '}
        <b>{FEWER_REQUESTS_LABEL} more requests</b> in the base plan, so a
        traffic spike has more room before it reaches the&nbsp;limit.
      </>
    )
  },
  {
    number: '04',
    title: 'A free tier that renews daily, with the whole browser\u00a0API',
    description: (
      <>
        Screenshotlayer’s free plan is{' '}
        <b>{COMPETITOR_FREE_VOLUME} snapshots per month</b>. Microlink gives you{' '}
        <b>
          {FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit
          card
        </b>
        , with every Pro feature: proxy, PDF, metadata, and browser automation.
      </>
    )
  },
  {
    number: '05',
    title: 'Screenshots, PDF, metadata, and previews on one\u00a0key',
    description: (
      <>
        Screenshotlayer stays focused on screenshot delivery. Microlink also
        gives you{' '}
        <b>PDF generation, metadata extraction, link previews, and remote JS</b>{' '}
        from the same integration, so your screenshot pipeline does not spill
        into extra vendors&nbsp;later.
      </>
    )
  },
  {
    number: '06',
    title: 'Harder pages need less manual\u00a0setup',
    description: (
      <>
        Screenshotlayer documents no built&#8209;in proxy rotation or antibot
        tooling. Microlink includes <b>built&#8209;in proxying</b> and{' '}
        <b>detection for 30+ antibot and CAPTCHA providers</b>, which removes
        work when targets stop being friendly public&nbsp;pages.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: '100 free screenshots without a time\u00a0limit',
    description:
      'The free plan gives 100 screenshots per month and does not expire, enough for occasional manual\u00a0testing.'
  },
  {
    title: 'S3 and FTP export built\u00a0in',
    description:
      'Screenshotlayer exports captures straight to AWS S3 or FTP on Professional and Enterprise. Microlink has no native storage\u00a0export.'
  },
  {
    title: 'Dedicated\u2011worker model',
    description:
      'Screenshotlayer publishes dedicated worker counts on paid plans, so concurrency is a number you read before you\u00a0buy.'
  },
  {
    title: 'Simple signed image URL\u00a0flow',
    description:
      'One URL returns one image, signed with a secret key when you need to secure\u00a0it.'
  }
]

const PRICING_SUMMARY = `${MICROLINK_VOLUME_LABEL} requests for ${MICROLINK_PRICE_LABEL} against Screenshotlayer ${COMPETITOR_VOLUME_LABEL} for ${COMPETITOR_PRICE_LABEL}`

export const META = {
  title: 'Screenshotlayer Alternative for More Throughput',
  description: `Compare Microlink vs Screenshotlayer when plan caps, overages, and cold starts start to matter. Microlink gives you ${PRICING_SUMMARY}, no rate limit on paid plans, and ${SPEED.averageRatio}× faster on average on the ${SPEED.urls} shared benchmark URLs.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Screenshotlayer Alternative for More Throughput |\u00a0Microlink',
    description: `Compare Microlink and Screenshotlayer when bursty screenshot workloads start running into plan caps, overages, and slower cold starts. Microlink gives you ${PRICING_SUMMARY}, no rate limit on paid plans, and ${SPEED.averageRatio}× faster on average on the ${SPEED.urls} shared benchmark\u00a0URLs.`,
    url: 'https://microlink.io/alternative/screenshotlayer',
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
  caption: <>The usual reasons teams move from Screenshotlayer to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      Every Screenshotlayer cell comes from its public pricing and documentation
      pages, including the rows where it&nbsp;wins.
    </>
  ),
  columns: ['Microlink', 'Screenshotlayer'],
  rows: COMPARISON_DATA,
  competitorKey: 'screenshotlayer',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>Screenshotlayer</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'A free plan that never expires, S3 and FTP export, published worker counts, and signed image\u00a0URLs.',
  items: HONESTY_ITEMS
}
