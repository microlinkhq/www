import React from 'react'

import { Link } from 'components/elements/Link'
import {
  GradientText,
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
import { benchmarkClaims } from 'components/patterns/SpeedSection/claims'
import { colors } from 'theme'

export const COMPETITOR_PRICE_EUR = 59
const COMPETITOR_VOLUME = 20000
const COMPETITOR_OVERAGE_EUR = 0.003
export const COMPETITOR_FREE_VOLUME = 100
const THOUSAND = 1000
const CENTS = 100
export const MICROLINK_PRICE_EUR = DEFAULT_PLAN.monthlyPrice.EUR
const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal

export const MICROLINK_VOLUME_LABEL = formatNumber(MICROLINK_VOLUME)
export const COMPETITOR_VOLUME_LABEL = formatNumber(COMPETITOR_VOLUME)

const CHECKED_AT = '2026-11-18'
export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

const EXTRA_MONTHLY_COST_LABEL = formatPrice(
  COMPETITOR_PRICE_EUR - MICROLINK_PRICE_EUR,
  'EUR'
)
const OVERAGE_LABEL = `${formatPrice(
  Math.round(COMPETITOR_OVERAGE_EUR * THOUSAND * CENTS) / CENTS,
  'EUR'
)} per ${formatNumber(THOUSAND)} extra\u00a0screenshots`

const FEWER_SCREENSHOTS_LABEL = formatNumber(
  MICROLINK_VOLUME - COMPETITOR_VOLUME
)

export const PRICE_COMPARISON = {
  currency: 'EUR',
  title: (
    <AlternativePricingTitle
      lead='More requests.'
      highlight={'More outputs per\u00a0request.'}
    />
  ),
  caption: `Microlink bills requests: ${MICROLINK_VOLUME_LABEL} for €${MICROLINK_PRICE_EUR}\u00a0per\u00a0month. Screenshot\u00a0Machine\u00a0Pro bills fresh screenshots: ${COMPETITOR_VOLUME_LABEL} for €${COMPETITOR_PRICE_EUR}\u00a0per\u00a0month.`,
  microlink: {
    cta: 'alternative-screenshotmachine:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: ['Screenshots, PDF, metadata, previews, and remote\u00a0JS']
  },
  competitor: {
    name: 'Screenshot\u00a0Machine Pro',
    price: COMPETITOR_PRICE_EUR,
    quota: COMPETITOR_VOLUME,
    unit: 'screenshots',
    items: [
      `Free plan: ${COMPETITOR_FREE_VOLUME}\u00a0screenshots/month`,
      OVERAGE_LABEL,
      missing('Screenshots and PDF only: no metadata or\u00a0previews'),
      missing('No custom JS or CSS injection'),
      'Repeat captures served from cache for 14 days are not\u00a0billed',
      'Cookies plus language and user\u2011agent controls',
      '99.99% uptime SLA'
    ],
    source: 'https://www.screenshotmachine.com/pricing.php',
    checkedAt: CHECKED_AT
  },
  note: `Screenshot\u00a0Machine Pro costs ${EXTRA_MONTHLY_COST_LABEL} more per month and includes ${FEWER_SCREENSHOTS_LABEL} fewer\u00a0screenshots.`
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
    screenshotmachine: {
      name: 'Screenshot\u00a0Machine',
      summary: {
        avgColdDuration: 6099.77,
        totalColdDuration: 42698.4
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 9790.6 },
        { url: 'https://example.com', coldDuration: 1321.19 },
        { url: 'https://stripe.com', coldDuration: 3167.16 },
        { url: 'https://screenshotone.com', coldDuration: 12403.69 },
        { url: 'https://news.ycombinator.com', coldDuration: 4328.76 },
        { url: 'https://github.com/trending', coldDuration: 3898.21 },
        { url: 'https://www.framer.com', coldDuration: 7788.79 }
      ]
    }
  }
}

export const SPEED = benchmarkClaims(BENCHMARK_DATA, 'screenshotmachine')

export const CTA = {
  caption: `Screenshots and PDF, plus metadata, previews, and remote JS. ${MICROLINK_VOLUME_LABEL} requests a month against ${COMPETITOR_VOLUME_LABEL} screenshots.`,
  cta: 'alternative-screenshotmachine:footer-cta',
  links: [
    { href: '/screenshot', label: 'Explore the Screenshot API' },
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' }
  ]
}

export const FAQ_CAPTION =
  'Free tiers, pricing, rate limits and what a move from Screenshot\u00a0Machine takes.'

export const FAQ_ITEMS = [
  {
    question: 'Is there a free Screenshot\u00a0Machine alternative?',
    text: `Yes. Microlink’s free tier gives you ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, with every Pro feature, served from the same ${CDN_EDGES} edge network as paid plans, proxy included. Screenshot\u00a0Machine’s free tier is ${COMPETITOR_FREE_VOLUME} fresh screenshots per\u00a0month.`,
    answer: (
      <>
        <div>
          Yes. Microlink’s <Link href='/pricing'>free&nbsp;tier</Link> gives you{' '}
          {FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests/day, renews daily, no
          credit card, with every Pro feature, served from the same {CDN_EDGES}{' '}
          edge network as paid plans, proxy&nbsp;included.
        </div>
        <div>
          Screenshot&nbsp;Machine’s free tier is {COMPETITOR_FREE_VOLUME}
          &nbsp;fresh screenshots per&nbsp;month.
        </div>
      </>
    )
  },
  {
    question:
      'How does Microlink compare to Screenshot\u00a0Machine for screenshot quality?',
    text: `Both services produce high-quality screenshots. Microlink was ${SPEED.averageRatio}× faster on average in our ${SPEED.run} benchmark. Screenshot\u00a0Machine also delivers good quality and supports JPG, PNG, and GIF output\u00a0formats.`
  },
  {
    question: 'Can I migrate from Screenshot\u00a0Machine to Microlink easily?',
    text: 'Yes. Screenshot\u00a0Machine uses a simple GET API with parameters like url, dimension, device, format, delay, and zoom. Microlink accepts the same capture concepts under its own parameter names. Most migrations involve updating the API endpoint and key. The screenshot docs cover every parameter with examples. Paste your existing code into any LLM and ask it to migrate to Microlink. Or email hello@microlink.io and we’ll help\u00a0directly.',
    answer: (
      <>
        <div>
          Yes. Screenshot&nbsp;Machine uses a simple GET API with parameters
          like <i>url</i>, <i>dimension</i>, <i>device</i>, <i>format</i>,{' '}
          <i>delay</i>, and <i>zoom</i>. Microlink accepts the same capture
          concepts under its own parameter names. Most migrations involve
          updating the API endpoint and key. The{' '}
          <Link href='/docs/guides/screenshot'>screenshot&nbsp;docs</Link> cover
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
    question:
      'When is Screenshot\u00a0Machine enough, and when should you upgrade?',
    text: 'Screenshot\u00a0Machine is a good fit when you want a simpler API focused on screenshots and website-to-PDF conversion. Microlink is the upgrade path when those captures need to feed richer browser workflows: metadata/Open Graph extraction, link previews, remote JavaScript execution, and Lighthouse audits from one API key and one\u00a0integration.'
  },
  {
    question: 'Is Microlink open source?',
    text: 'The core engine components are MIT-licensed on GitHub: Metascraper (metadata extraction), MQL (Microlink Query Language), and Browserless (headless browser). Read the code, fork it, or run it yourself. Screenshot\u00a0Machine is closed-source. There is no way to inspect or audit the engine processing your\u00a0requests.',
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
          Screenshot&nbsp;Machine is closed-source. There is no way to inspect
          or audit the engine processing your&nbsp;requests.
        </div>
      </>
    )
  },
  {
    question:
      'How much does Screenshot\u00a0Machine cost compared to Microlink?',
    text: `Screenshot\u00a0Machine Pro is listed at €${COMPETITOR_PRICE_EUR}/month for ${COMPETITOR_VOLUME_LABEL} fresh screenshots, then ${OVERAGE_LABEL}. Microlink Pro is €${MICROLINK_PRICE_EUR}/month for ${MICROLINK_VOLUME_LABEL}\u00a0requests.`
  },
  {
    question: 'Does Microlink have rate limits?',
    text: 'There is no rate limit on paid plans. The only limit is your monthly request quota. Screenshot\u00a0Machine does not publish explicit per-minute rate limits, but its pricing tiers are based on fresh screenshots per month. Cached screenshots (up to 14 days) are not\u00a0billed.'
  },
  {
    question: 'How does Microlink handle sites with cookie banners or ads?',
    text: 'Microlink supports ad blocking via the adblock parameter and custom CSS/JS injection to dismiss consent dialogs before the screenshot is taken. Screenshot\u00a0Machine supports cookie-banner handling through its click and hide selector parameters, but it does not advertise a dedicated ad-blocking or cookie-blocking rules\u00a0engine.',
    answer: (
      <div>
        Microlink supports ad blocking via the{' '}
        <Link href='/docs/api/parameters/adblock'>adblock</Link> parameter and
        custom CSS/JS injection to dismiss consent dialogs before the screenshot
        is taken. Screenshot&nbsp;Machine supports cookie-banner handling
        through its <i>click</i> and <i>hide</i> selector parameters, but it
        does not advertise a dedicated ad-blocking or cookie-blocking
        rules&nbsp;engine.
      </div>
    )
  },
  {
    question: 'What uptime and SLA does Microlink guarantee?',
    text: `Microlink guarantees 99.9% uptime backed by a formal SLA. Requests are served from ${CDN_EDGES} Cloudflare edge nodes worldwide. Screenshot\u00a0Machine advertises 99.99% uptime on its SLA page, which is a strong availability\u00a0commitment.`
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

export const SERVICE_COLORS = {
  microlink: colors.red6,
  screenshotmachine: colors.gray5
}

const PROXY_COUNTRIES = 181

const COMPARISON_DATA = [
  {
    feature: 'Free\u00a0plan',
    microlink: `${FREE_PLAN_REQUESTS_PER_DAY}/day, renews\u00a0daily`,
    screenshotmachine: `${COMPETITOR_FREE_VOLUME}/month`
  },
  { feature: 'PDF\u00a0generation', microlink: true, screenshotmachine: true },
  {
    feature: 'GIF output (from\u00a0API)',
    microlink: false,
    screenshotmachine: true,
    note: 'Screenshot\u00a0Machine supports GIF as a direct output\u00a0format.'
  },
  {
    feature: 'Region cropping (x, y, w,\u00a0h)',
    microlink: false,
    screenshotmachine: true
  },
  {
    feature: 'Custom JS and CSS\u00a0injection',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'Custom HTTP\u00a0headers',
    microlink: true,
    screenshotmachine: 'Partial',
    note: 'Supports request language and user\u2011agent\u00a0only.'
  },
  {
    feature: 'Wait for CSS\u00a0selector',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'HTML rendering (raw HTML\u00a0input)',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'Dark/light mode\u00a0capture',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'Ad and cookie banner\u00a0blocking',
    microlink: true,
    screenshotmachine: 'Partial',
    note: 'Screenshot\u00a0Machine hides banners manually, via click and hide selectors, and has no ad\u00a0blocker.'
  },
  {
    feature: 'Custom proxy\u00a0support',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'Proxy\u00a0geolocation',
    note: 'Microlink proxy.location takes any of 181 ISO country codes on every API key, free\u00a0included.',
    microlink: `${PROXY_COUNTRIES}\u00a0countries`,
    screenshotmachine: false
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'Metadata\u00a0extraction',
    microlink: true,
    screenshotmachine: false
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
    screenshotmachine: false
  },
  {
    feature: 'Remote JS execution (return\u00a0values)',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'Browser chrome\u00a0overlay',
    microlink: true,
    screenshotmachine: false
  },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    screenshotmachine: false
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'A browser API beyond query\u00a0params',
    description: (
      <>
        Screenshot&nbsp;Machine covers the basics well, including cookies plus
        user&#8209;agent and language controls. Microlink goes further with{' '}
        <b>arbitrary headers, JS injection, CSS injection</b>, and broader
        browser automation for SPAs, auth&#8209;gated pages, and
        dynamic&nbsp;content.
      </>
    )
  },
  {
    number: '02',
    title: `${MICROLINK_VOLUME_LABEL} requests against ${COMPETITOR_VOLUME_LABEL}\u00a0screenshots`,
    description: (
      <>
        Screenshot&nbsp;Machine Pro is listed at{' '}
        <b>€{COMPETITOR_PRICE_EUR}/month</b> for {COMPETITOR_VOLUME_LABEL} fresh
        screenshots. Microlink Pro is{' '}
        <b>
          €{MICROLINK_PRICE_EUR}/month for {MICROLINK_VOLUME_LABEL} requests
        </b>
        .
      </>
    )
  },
  {
    number: '03',
    title: 'Screenshot, PDF, metadata, previews, and remote\u00a0JS',
    description: (
      <>
        Microlink handles screenshots, PDFs, metadata extraction, link previews,
        and remote JS in <b>a single integration</b>. Screenshot&nbsp;Machine
        covers screenshots and PDFs only. Anything else requires a
        separate&nbsp;service.
      </>
    )
  },
  {
    number: '04',
    title: `${SPEED.averageRatio}× faster on\u00a0average`,
    description: (
      <>
        In the {SPEED.run} benchmark, Microlink averaged{' '}
        <b>{SPEED.microlinkAverage}</b> and Screenshot&nbsp;Machine averaged{' '}
        <b>{SPEED.competitorAverage}</b> across {SPEED.urls} real&#8209;world
        URLs. Up to <b>{SPEED.widestGap.ratio}&times;</b> faster on&nbsp;
        {SPEED.widestGap.host}.
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
        {'\u2026'}) when a target blocks the request. Screenshot&nbsp;Machine
        does not offer proxy support or antibot&nbsp;detection.
      </>
    )
  },
  {
    number: '06',
    title: 'Open\u2011source core\u00a0(MIT)',
    description: (
      <>
        Metascraper, MQL, and Browserless are <b>MIT&#8209;licensed</b> on
        GitHub. Read the core engine, fork it, or self&#8209;host it.
        Screenshot&nbsp;Machine is closed&nbsp;source.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'The simplest possible\u00a0API',
    description:
      'Screenshot\u00a0Machine\u2019s API is a single GET endpoint with a handful of parameters for screenshots and\u00a0PDFs.'
  },
  {
    title: 'Region cropping built\u00a0in',
    description:
      'Screenshot\u00a0Machine lets you crop a specific rectangle (x, y, width, height) from the viewport in a single API call. Microlink captures full viewports or CSS-selected elements, but does not have built\u2011in pixel\u2011coordinate\u00a0cropping.'
  },
  {
    title: 'GIF output directly from the\u00a0API',
    description:
      'Screenshot\u00a0Machine supports GIF as a direct output format alongside JPG and\u00a0PNG.'
  }
]

export const META = {
  title: 'Screenshot Machine Alternative for Broader Browser Workflows',
  description: `Screenshot Machine is great for simple screenshots and PDFs. Microlink is ${SPEED.averageRatio}× faster on average in our benchmark and adds metadata, link previews, remote JS, and ${MICROLINK_VOLUME_LABEL} requests on its €${MICROLINK_PRICE_EUR} tier.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Screenshot Machine Alternative for Broader Browser Workflows |\u00a0Microlink',
    description: `Compare Microlink and Screenshot Machine when your screenshot workflow grows beyond basic captures and PDFs. Microlink is ${SPEED.averageRatio}× faster on average in our benchmark and adds metadata extraction, link previews, and remote JS in one API.`,
    url: 'https://microlink.io/alternative/screenshotmachine',
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
  caption: (
    <>
      The usual reasons teams move from Screenshot&nbsp;Machine
      to&nbsp;Microlink.
    </>
  ),
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      Both capture screenshots and PDFs. Screenshot&nbsp;Machine adds GIF output
      and region cropping; Microlink adds metadata, browser automation, and an
      open&#8209;source&nbsp;core.
    </>
  ),
  columns: ['Microlink', 'Screenshot\u00a0Machine'],
  rows: COMPARISON_DATA,
  competitorKey: 'screenshotmachine',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>Screenshot Machine</GradientText> is the
      better&nbsp;pick.
    </>
  ),
  caption: 'A one\u2011call GET API, pixel cropping, and GIF\u00a0output.',
  items: HONESTY_ITEMS
}
