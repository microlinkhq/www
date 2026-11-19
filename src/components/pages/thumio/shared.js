import React from 'react'

import { Link } from 'components/elements/Link'
import {
  GradientText,
  faqPageStructured,
  formatCheckedAt
} from 'components/patterns/ProductStory'
import { formatNumber } from 'helpers/format-number'
import { DEFAULT_PLAN } from 'helpers/pro-plans'
import { benchmarkClaims } from 'components/patterns/SpeedSection/claims'
import { formatPrice } from 'components/patterns/ProductStory/price-comparison'
import { AlternativePricingTitle } from 'components/patterns/ProductStory/alternative-section'
import { colors } from 'theme'

const COMPETITOR_PRICE = 20
const COMPETITOR_PRICE_PER_BATCH = 1
const COMPETITOR_BATCH_SIZE = 10000
const COMPETITOR_FREE_HITS = 1000
const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal
const USAGE_COST_AT_MICROLINK_VOLUME =
  (MICROLINK_VOLUME / COMPETITOR_BATCH_SIZE) * COMPETITOR_PRICE_PER_BATCH
const THOUSAND = 1000
const CENTS = 100
export const HIT_PRICING = `${formatPrice(
  Math.round(
    (COMPETITOR_PRICE_PER_BATCH * CENTS * THOUSAND) / COMPETITOR_BATCH_SIZE
  ) / CENTS
)} per ${formatNumber(THOUSAND)}`
export const COMPETITOR_PRICE_LABEL = formatPrice(COMPETITOR_PRICE)
export const FREE_HITS_LABEL = formatNumber(COMPETITOR_FREE_HITS)

const CHECKED_AT = '2026-11-18'
export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

const competitorBillAtMicrolinkVolume = () =>
  USAGE_COST_AT_MICROLINK_VOLUME < COMPETITOR_PRICE
    ? `At ${formatNumber(
      MICROLINK_VOLUME
    )} screenshots, this tier still bills its $${COMPETITOR_PRICE} monthly\u00a0minimum`
    : `At ${formatNumber(
      MICROLINK_VOLUME
    )} screenshots, this tier bills $${USAGE_COST_AT_MICROLINK_VOLUME.toFixed(
      2
    )}`

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='Thum.io wins on price.'
      highlight={'Microlink wins on\u00a0reach.'}
    />
  ),
  caption: `Microlink bills requests: ${formatNumber(
    MICROLINK_VOLUME
  )} for ${formatPrice(
    DEFAULT_PLAN.monthlyPrice.USD
  )}\u00a0per\u00a0month. Thum.io\u00a0Better bills hits: ${HIT_PRICING}, with a ${COMPETITOR_PRICE_LABEL} monthly\u00a0minimum.`,
  microlink: {
    cta: 'alternative-thumio:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: [
      'Screenshots, PDF, metadata, previews, and remote\u00a0JS',
      'Proxy and antibot handling included'
    ]
  },
  competitor: {
    name: 'Thum.io Better',
    price: COMPETITOR_PRICE,
    period: 'monthly minimum',
    volume: `${HIT_PRICING}\u00a0hits`,
    items: [
      `Free plan: ${FREE_HITS_LABEL}\u00a0hits/month`,
      competitorBillAtMicrolinkVolume(),
      'Full\u2011page screenshots and adjustable viewport\u00a0width',
      'Animated initial render with unbranded loader\u00a0options',
      'Queue priority'
    ],
    source: 'https://www.thum.io/',
    checkedAt: CHECKED_AT
  },
  note: 'For plain website thumbnails at scale, pick Thum.io. When each request also needs metadata, a PDF, or antibot help, pick\u00a0Microlink.'
}

export const BENCHMARK_DATA = {
  timestamp: '2026-04-15T18:19:27.744Z',
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
    },
    {
      url: 'https://www.framer.com',
      width: 1920,
      height: 1800,
      fullPage: false,
      format: 'jpeg',
      deviceScaleFactor: 2,
      adblock: true
    }
  ],
  results: {
    microlink: {
      name: 'Microlink',
      website: 'https://microlink.io',
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 7851.3195000000005,
          imageSize: 553030,
          imageQuality: 1005.1851912097997,
          success: true,
          error: null
        },
        {
          url: 'https://example.com',
          coldDuration: 1214.3017909999999,
          imageSize: 16203,
          imageQuality: 323.9259376924314,
          success: true,
          error: null
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3253.5385829999996,
          imageSize: 127452,
          imageQuality: 1353.4169854193146,
          success: true,
          error: null
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 4989.000249999999,
          imageSize: 2065261,
          imageQuality: 1291.8271797525126,
          success: true,
          error: null
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 3426.2449579999993,
          imageSize: 168951,
          imageQuality: 4776.754227201613,
          success: true,
          error: null
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 3012.872292,
          imageSize: 136255,
          imageQuality: 2771.475739986613,
          success: true,
          error: null
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 5965.603333000003,
          imageSize: 1008610,
          imageQuality: 1224.2724297355865,
          success: true,
          error: null
        }
      ],
      summary: {
        totalTime: 29712.88,
        totalColdDuration: 29712.88,
        avgColdDuration: 4244.7,
        avgImageSize: 582252,
        avgImageQuality: 1820.98,
        successRate: 1,
        totalRequests: 7
      }
    },
    thumio: {
      name: 'Thum.io',
      website: 'https://www.thum.io',
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 34919.6895,
          imageSize: 1781571,
          imageQuality: 414.46681223326374,
          success: true,
          error: null
        },
        {
          url: 'https://example.com',
          coldDuration: 30688.288791,
          imageSize: 17440,
          imageQuality: 327.3619063307722,
          success: true,
          error: null
        },
        {
          url: 'https://stripe.com',
          coldDuration: 13062.827541000006,
          imageSize: 141532,
          imageQuality: 1585.236417539989,
          success: true,
          error: null
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 51775.59608300001,
          imageSize: 7162,
          imageQuality: 0,
          success: true,
          error: null
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 20816.988957999998,
          imageSize: 5932,
          imageQuality: 0,
          success: true,
          error: null
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 4302.058332999994,
          imageSize: 124597,
          imageQuality: 2615.3637047615643,
          success: true,
          error: null
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 34930.73104100001,
          imageSize: 109666,
          imageQuality: 2533.4204149531142,
          success: true,
          error: null
        }
      ],
      summary: {
        totalTime: 190496.18,
        totalColdDuration: 190496.18,
        avgColdDuration: 27213.74,
        avgImageSize: 312557,
        avgImageQuality: 1067.98,
        successRate: 1,
        totalRequests: 7
      }
    }
  },
  winner: 'microlink'
}

export const SPEED = benchmarkClaims(BENCHMARK_DATA, 'thumio')

export const CTA = {
  caption: `Fully loaded screenshots ${SPEED.averageRatio}× faster on average in our benchmark, plus metadata, PDF, and browser automation from the same API.`,
  cta: 'alternative-thumio:footer-cta',
  links: [
    { href: '/screenshot', label: 'Explore the Screenshot API' },
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' }
  ]
}

export const FAQ_CAPTION =
  'Price, streamed renders, callbacks and what a move from Thum.io image URLs takes.'

export const FAQ_ITEMS = [
  {
    question:
      'What is a good Thum.io alternative when the fully loaded screenshot matters?',
    text: 'Microlink returns the fully loaded screenshot, and the same platform covers PDF generation, metadata extraction, link previews, and remote JS. Thum.io is built for site preview images and streamed initial\u00a0renders.'
  },
  {
    question: 'Does this benchmark include Thum.io’s streamed GIF behavior?',
    text: 'No. This benchmark measures final cold-start completion time: when the requested screenshot payload was fully ready. It does not score how fast a loading spinner or animated initial render appears. That distinction matters with Thum.io because its main differentiator is perceived speed during streaming. For synchronous server-side screenshot workflows, the final completion time is usually the more important\u00a0number.',
    answer: (
      <>
        <div>
          No. This benchmark measures <b>final cold-start completion time</b>:
          when the requested screenshot payload was fully ready. It does not
          score how fast a loading spinner or animated initial
          render&nbsp;appears.
        </div>
        <div>
          That distinction matters with Thum.io because its main differentiator
          is perceived speed during streaming. For synchronous server-side
          screenshot workflows, the final completion time is usually the more
          important&nbsp;number.
        </div>
      </>
    )
  },
  {
    question: 'How hard is it to migrate from Thum.io URLs to Microlink?',
    text: 'Thum.io encodes options as path segments like fullpage, viewportWidth, wait, and device names. Microlink takes the same capture options as query parameters. The migration is mostly mapping screenshot intent to Microlink parameters. Start from the screenshot docs, then adapt any Thum.io-specific loader or prefetch logic\u00a0separately.',
    answer: (
      <>
        <div>
          Thum.io encodes options as path segments like <i>fullpage</i>,{' '}
          <i>viewportWidth</i>, <i>wait</i>, and device names. Microlink takes
          the same capture options as query&nbsp;parameters.
        </div>
        <div>
          The migration is mostly mapping screenshot intent to Microlink
          parameters. Start from the{' '}
          <Link href='/docs/guides/screenshot'>screenshot&nbsp;docs</Link>, then
          adapt any Thum.io-specific loader or prefetch logic&nbsp;separately.
        </div>
      </>
    )
  },
  {
    question: 'When does Thum.io still make more sense than Microlink?',
    text: 'When the job is high-volume website preview images, with a streamed initial render and a direct image URL. Thum.io also has built-in prefetch plus callback workflows, image resizing, and PDF-to-image conversion, which Microlink does\u00a0not.',
    answer: (
      <>
        <div>
          When the job is high&#8209;volume website preview images, with a
          streamed initial render and a direct image&nbsp;URL.
        </div>
        <div>
          Thum.io also has built&#8209;in <b>prefetch plus callback</b>
          workflows, image resizing, and PDF&#8209;to&#8209;image conversion,
          which Microlink does&nbsp;not.
        </div>
      </>
    )
  },
  {
    question:
      'Is Microlink better if I need metadata or PDF from the same request?',
    text: 'Yes. Microlink covers screenshots, PDF generation, metadata extraction, link previews, and remote JS in one platform. Thum.io documents screenshots, image resizing, and PDF-to-image conversion, but not metadata extraction, webpage-to-PDF generation, or the broader browser workflow surface that Microlink\u00a0exposes.'
  },
  {
    question: 'How does pricing compare for simple thumbnail embeds?',
    text: `Thum.io’s paid screenshot tier is priced at ${HIT_PRICING} screenshot hits with a ${COMPETITOR_PRICE_LABEL} monthly minimum, built for embedded website preview images. Microlink is ${formatPrice(
      DEFAULT_PLAN.monthlyPrice.USD
    )}/month for ${formatNumber(
      MICROLINK_VOLUME
    )} requests, and each request can also return metadata, run browser logic, and handle blocked\u00a0pages.`,
    answer: (
      <>
        <div>
          Thum.io’s paid screenshot tier is priced at{' '}
          <b>{HIT_PRICING}&nbsp;screenshot hits</b> with a{' '}
          {COMPETITOR_PRICE_LABEL} monthly minimum, built for embedded website
          preview&nbsp;images.
        </div>
        <div>
          Microlink is {formatPrice(DEFAULT_PLAN.monthlyPrice.USD)}/month for{' '}
          {formatNumber(MICROLINK_VOLUME)} requests, and each request can also
          return metadata, run browser logic, and handle blocked&nbsp;pages.
        </div>
      </>
    )
  },
  {
    question:
      'Do both Microlink and Thum.io support signed URLs and direct embeds?',
    text: 'Yes. Thum.io documents signed requests and simple img src embeds. Microlink also supports signed request URLs and direct embed flows, so both products can power frontend-friendly image delivery. The difference is what happens after the image request. Microlink keeps going into metadata, PDFs, proxies, selectors, and browser automation features that Thum.io does not\u00a0document.',
    answer: (
      <>
        <div>
          Yes. Thum.io documents signed requests and simple <i>img src</i>{' '}
          embeds. Microlink also supports signed request URLs and direct embed
          flows, so both products can power frontend-friendly
          image&nbsp;delivery.
        </div>
        <div>
          The difference is what happens after the image request. Microlink
          keeps going into metadata, PDFs, proxies, selectors, and browser
          automation features that Thum.io does not&nbsp;document.
        </div>
      </>
    )
  },
  {
    question: 'Can Microlink replace Thum.io prefetch and callback workflows?',
    text: 'Not one-to-one. Thum.io documents a native prefetch endpoint with optional callbacks when the image is ready. Microlink does not expose native async callbacks or webhooks for screenshot completion. If that exact pattern is important, you would keep the async orchestration in your own app: request Microlink, store the result, then fire your own callback or queue event\u00a0downstream.'
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

export const SERVICE_COLORS = {
  microlink: colors.red6,
  thumio: colors.gray5
}

const COMPARISON_DATA = [
  {
    feature: 'Full\u2011page\u00a0screenshots',
    microlink: true,
    thumio: true,
    note: 'Thum.io documents full\u2011page capture on the Better\u00a0plan.'
  },
  {
    feature: 'Element\u2011level capture (CSS\u00a0selector)',
    microlink: true,
    thumio: false
  },
  { feature: 'PDF\u00a0generation', microlink: true, thumio: false },
  { feature: 'HTML\u00a0rendering', microlink: true, thumio: false },
  {
    feature: 'Custom JS/CSS, headers and\u00a0cookies',
    microlink: true,
    thumio: false
  },
  {
    feature: 'Hide/remove elements (CSS\u00a0selectors)',
    microlink: true,
    thumio: false
  },
  {
    feature: 'Click, scroll and wait for\u00a0selector',
    microlink: true,
    thumio: false
  },
  {
    feature: 'Ad and cookie banner\u00a0blocking',
    microlink: true,
    thumio: false
  },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    thumio: false
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    thumio: false
  },
  { feature: 'Metadata\u00a0extraction', microlink: true, thumio: false },
  {
    feature: 'Link\u00a0previews',
    note: (
      <>
        <Link href='/link-preview'>Link&nbsp;preview&nbsp;API</Link> returns the
        oEmbed iframe, card fields, and media in one&nbsp;call.
      </>
    ),
    microlink: true,
    thumio: false
  },
  { feature: 'Remote JS\u00a0execution', microlink: true, thumio: false },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    thumio: false
  },
  {
    feature: 'Animated initial\u00a0render',
    microlink: false,
    thumio: true,
    note: 'Thum.io streams an animated initial render while the fully loaded screenshot\u00a0completes.'
  },
  {
    feature: 'Prefetch + callback batch\u00a0workflow',
    microlink: false,
    thumio: true,
    note: 'Thum.io documents prefetch requests plus optional callbackUrl\u00a0delivery.'
  },
  { feature: 'Image resizing\u00a0API', microlink: false, thumio: true },
  {
    feature: 'PDF\u2011to\u2011image\u00a0conversion',
    microlink: false,
    thumio: true
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'Time to a fully loaded\u00a0screenshot',
    description: (
      <>
        Thum.io’s standout trick is streaming an animated initial render. That
        is useful for embeds. Our benchmark measured when the{' '}
        <b>fully loaded screenshot</b> was actually ready. On that metric,
        Microlink averaged <b>{SPEED.microlinkAverage}</b> against{' '}
        <b>{SPEED.competitorAverage}</b> for&nbsp;Thum.io.
      </>
    )
  },
  {
    number: '02',
    title: 'More control once pages stop being\u00a0simple',
    description: (
      <>
        Thum.io’s URL API focuses on <b>width</b>, <b>crop</b>, <b>fullpage</b>,{' '}
        <b>wait</b>, and a few device presets. Microlink adds selector capture,
        JS/CSS injection, cookies, custom headers, click/scroll interactions,
        and ad blocking when real browser state starts to&nbsp;matter.
      </>
    )
  },
  {
    number: '03',
    title: `Up to ${SPEED.widestGap.ratio}× faster on\u00a0${SPEED.widestGap.host}`,
    description: (
      <>
        The widest gap in the benchmark: Thum.io took{' '}
        <b>{SPEED.widestGap.competitor}</b> on {SPEED.widestGap.host}, and
        Microlink returned the same fully loaded screenshot in{' '}
        <b>{SPEED.widestGap.microlink}</b>.
      </>
    )
  },
  {
    number: '04',
    title: 'Screenshot, PDF, and metadata in one\u00a0request',
    description: (
      <>
        One Microlink request can return the <b>screenshot</b>, a{' '}
        <b>PDF of the page</b>, and its <b>metadata</b>. Thum.io documents
        screenshots, image resizing, and PDF&#8209;to&#8209;image conversion,
        with no webpage&#8209;to&#8209;PDF or metadata&nbsp;extraction.
      </>
    )
  },
  {
    number: '05',
    title: 'Built for harder\u00a0pages',
    description: (
      <>
        Microlink includes <b>built-in proxying</b> and detection for 30+
        antibot and CAPTCHA providers. Targets behind Cloudflare, DataDome, or
        similar protections need no proxy setup of your&nbsp;own.
      </>
    )
  },
  {
    number: '06',
    title: 'Open\u2011source core\u00a0(MIT)',
    description: (
      <>
        Metascraper, MQL, and Browserless are <b>MIT&#8209;licensed</b>. You can
        audit the core pieces, self-host them, or fork them. Thum.io is
        proprietary, so the rendering internals are not&nbsp;inspectable.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Streaming initial\u00a0render',
    description:
      'Thum.io streams an animated initial render immediately, which can make embeds feel responsive before the fully loaded screenshot is done. Microlink focuses on returning the completed\u00a0capture.'
  },
  {
    title: `${HIT_PRICING} hits on the paid\u00a0tier`,
    description: `Thum.io lists a paid screenshot tier at ${HIT_PRICING} screenshot hits with a ${COMPETITOR_PRICE_LABEL} monthly minimum. For simple website snapshots at scale, that costs less per capture than\u00a0Microlink.`
  },
  {
    title: `${FREE_HITS_LABEL} free hits a month, no\u00a0signup`,
    description: `Thum.io says you can use up to ${FREE_HITS_LABEL} hits per month for free without signing up, enough to test basic website\u00a0previews.`
  },
  {
    title: 'Screenshots as plain image\u00a0URLs',
    description:
      'The product is built around direct image URLs such as image.thum.io/get/\u2026, so a screenshot drops into an img tag or CMS field with little application\u00a0code.'
  },
  {
    title: 'Prefetch plus callback\u00a0workflows',
    description:
      'Thum.io documents a prefetch endpoint with optional callback delivery when the image is ready. Microlink does not have native async callback workflows or\u00a0webhooks.'
  },
  {
    title: 'Image resizing and PDF\u2011to\u2011image\u00a0utilities',
    description:
      'Beyond screenshots, Thum.io exposes image resizing and PDF\u2011to\u2011image conversion endpoints. Microlink has\u00a0neither.'
  }
]

export const META = {
  title: 'Thum.io Alternative for Fully Loaded Screenshots',
  description: `Thum.io is clever for ultra-cheap streamed thumbnails. Microlink is built for fully loaded screenshots, selectors, PDFs, metadata, and blocked-page workloads, ${SPEED.averageRatio}× faster on average in our ${SPEED.run} benchmark.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Thum.io Alternative for Fully Loaded Screenshots |\u00a0Microlink',
    description: `Compare Microlink and Thum.io when simple website thumbnails are no longer enough. Microlink delivers fully loaded screenshots, PDF generation, metadata extraction, and broader browser control ${SPEED.averageRatio}× faster on average in our ${SPEED.run} benchmark.`,
    url: 'https://microlink.io/alternative/thumio',
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
  caption: <>The usual reasons teams move from Thum.io to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      Both turn a URL into a screenshot. The last four rows are what Thum.io
      adds around the image that Microlink does&nbsp;not.
    </>
  ),
  columns: ['Microlink', 'Thum.io'],
  rows: COMPARISON_DATA,
  competitorKey: 'thumio',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>Thum.io</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'Thum.io wins on streamed renders, price per hit, free access, plain image URLs, callbacks and image\u00a0utilities.',
  items: HONESTY_ITEMS
}
