import React from 'react'

import { Link } from 'components/elements/Link'
import {
  GradientText,
  MICROLINK_PLAN,
  faqPageStructured,
  formatCheckedAt
} from 'components/patterns/ProductStory'
import { missing } from 'components/patterns/ProductStory/price-comparison'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import { formatNumber } from 'helpers/format-number'
import { DEFAULT_PLAN } from 'helpers/pro-plans'
import { AlternativePricingTitle } from 'components/patterns/ProductStory/alternative-section'

const DAYS_PER_MONTH = 30
const DAYS_PER_YEAR = 365
const CREDITS_PER_OVERAGE_BLOCK = 1000
const PAGES_PER_PRICE_UNIT = 1000

export const SCRAPE_CREDITS = 1
export const BRAND_CREDITS = 10
export const STYLEGUIDE_CREDITS = 10
export const JSON_EXTRACTION_CREDITS = 5
export const ENRICH_PERSON_CREDITS = 20
export const BUNDLE_CREDITS = SCRAPE_CREDITS + BRAND_CREDITS

export const FREE_CREDITS_PER_MONTH = 1000
export const FREE_CONCURRENT_REQUESTS = 2
export const FREE_REQUESTS_PER_MINUTE = 10
export const MAX_BATCH_URLS = 100000

const DEVELOPER_PLAN = {
  name: 'Developer',
  price: 20,
  credits: 10000,
  overagePerBlock: 3,
  concurrency: 10
}
const PRO_PLAN = {
  name: 'Pro',
  price: 90,
  credits: 100000,
  overagePerBlock: 2,
  concurrency: 100
}
const GROWTH_PLAN = {
  name: 'Growth',
  price: 300,
  credits: 500000,
  overagePerBlock: 1.5,
  concurrency: 250
}
const SCALE_PLAN = {
  name: 'Scale',
  price: 500,
  credits: 1000000,
  overagePerBlock: 1,
  concurrency: 500
}
const SCALE_2_5M_PLAN = {
  name: 'Scale 2.5M',
  price: 950,
  credits: 2500000,
  overagePerBlock: 0.75,
  concurrency: 500
}

const PAID_PLANS = [
  DEVELOPER_PLAN,
  PRO_PLAN,
  GROWTH_PLAN,
  SCALE_PLAN,
  SCALE_2_5M_PLAN
]

const monthlyCost = (plan, credits) =>
  plan.price +
  Math.ceil(Math.max(0, credits - plan.credits) / CREDITS_PER_OVERAGE_BLOCK) *
    plan.overagePerBlock

const cheapestPlanFor = credits =>
  PAID_PLANS.map(plan => ({ plan, cost: monthlyCost(plan, credits) })).reduce(
    (best, option) => (option.cost < best.cost ? option : best)
  )

const pricePerThousandPages = plan =>
  (plan.price / (plan.credits / PAGES_PER_PRICE_UNIT)).toFixed(2)

const formatDollars = amount => `$${formatNumber(Math.round(amount))}`

const formatPrice = amount =>
  Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`

const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal
const VOLUME_LABEL = formatNumber(MICROLINK_VOLUME)
const SCRAPE_ONLY = cheapestPlanFor(MICROLINK_VOLUME * SCRAPE_CREDITS)
const BUNDLE_VOLUME = MICROLINK_VOLUME * BUNDLE_CREDITS
const BUNDLE = cheapestPlanFor(BUNDLE_VOLUME)
export const MICROLINK_PER_THOUSAND = (
  MICROLINK_PLAN.price /
  (MICROLINK_VOLUME / PAGES_PER_PRICE_UNIT)
).toFixed(2)
const FREE_REQUESTS_PER_MONTH = formatNumber(
  FREE_PLAN_REQUESTS_PER_DAY * DAYS_PER_MONTH
)
const FREE_REQUESTS_PER_YEAR = formatNumber(
  FREE_PLAN_REQUESTS_PER_DAY * DAYS_PER_YEAR
)

export const PRO_PER_THOUSAND = pricePerThousandPages(PRO_PLAN)
export const LOWEST_PER_THOUSAND = pricePerThousandPages(SCALE_2_5M_PLAN)
export const PLAN_CONCURRENCY = {
  developer: DEVELOPER_PLAN.concurrency,
  pro: PRO_PLAN.concurrency,
  scale: SCALE_PLAN.concurrency
}
export const FREE_CREDITS_LABEL = formatNumber(FREE_CREDITS_PER_MONTH)
export const MAX_BATCH_URLS_LABEL = formatNumber(MAX_BATCH_URLS)

const CHECKED_AT = '2026-11-18'

export const MICROLINK_CARD_FACTS = [
  'Metadata, logo, brand image, and palette in the standard\u00a0response',
  'Markdown and screenshot on the same\u00a0request'
]

export const MICROLINK_CARD_FOOTNOTE = 'Every feature on the free API\u00a0key.'

export const CONTEXT_DEV_CARD_FACTS = [
  `Scrape: ${SCRAPE_CREDITS}\u00a0credit for markdown, metadata, and\u00a0screenshot`,
  `Retrieve Brand: +${BRAND_CREDITS}\u00a0credits`,
  missing('Two API calls per\u00a0URL')
]

export const CONTEXT_DEV_CARD_FOOTNOTE = `Free: ${FREE_CREDITS_LABEL}\u00a0credits/month, ${FREE_REQUESTS_PER_MINUTE}\u00a0requests/minute.`
export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='One request price.'
      highlight={'Every output\u00a0included.'}
    />
  ),
  caption: `Microlink bills requests: ${VOLUME_LABEL} for $${
    MICROLINK_PLAN.price
  }\u00a0per\u00a0month. Context.dev\u00a0${
    DEVELOPER_PLAN.name
  } bills credits: ${formatNumber(DEVELOPER_PLAN.credits)} for $${
    DEVELOPER_PLAN.price
  }\u00a0per\u00a0month, and each endpoint has its own credit\u00a0price.`,
  microlink: {
    cta: 'alternative-context-dev:pricing',
    secondaryHref: '/metadata',
    secondaryLabel: 'Explore the Metadata API',
    items: [
      'Markdown, metadata, logo, and screenshot in one\u00a0request',
      'Logo, brand image, and palette in the standard\u00a0response'
    ]
  },
  competitor: {
    name: `Context.dev ${DEVELOPER_PLAN.name}`,
    price: DEVELOPER_PLAN.price,
    quota: DEVELOPER_PLAN.credits,
    unit: 'credits',
    items: [
      `Free plan: ${FREE_CREDITS_LABEL}\u00a0credits/month`,
      `${formatPrice(DEVELOPER_PLAN.overagePerBlock)} per ${formatNumber(
        CREDITS_PER_OVERAGE_BLOCK
      )} extra\u00a0credits`,
      `${DEVELOPER_PLAN.concurrency} concurrent requests on this\u00a0tier`,
      `Scrape: ${SCRAPE_CREDITS}\u00a0credit for markdown, metadata, and\u00a0screenshot`,
      `Brand ${BRAND_CREDITS}, Styleguide ${STYLEGUIDE_CREDITS}, JSON ${JSON_EXTRACTION_CREDITS}, Enrich Person ${ENRICH_PERSON_CREDITS}\u00a0credits`,
      `${VOLUME_LABEL} URLs with brand data need ${formatNumber(
        BUNDLE_VOLUME
      )} credits: ${BUNDLE.plan.name} at $${
        BUNDLE.plan.price
      } plus overage, ${formatDollars(BUNDLE.cost)}/month`
    ],
    source: 'https://www.context.dev/pricing',
    checkedAt: CHECKED_AT
  },
  note: `On Context.dev, brand data is a separate ${BRAND_CREDITS}\u2011credit call per URL. Microlink returns it in the same\u00a0request.`
}

export const CTA = {
  caption:
    'Get the whole answer in one request. Metadata, logo, and brand image from any URL.',
  cta: 'alternative-context-dev:footer-cta',
  links: [
    { href: '/metadata', label: 'Explore the Metadata API' },
    { href: '/docs/guides/metadata', label: 'Read the metadata guide' }
  ]
}

export const FAQ_CAPTION =
  'Credits, brand data, free tiers, and migration, priced from Context.dev’s public plans.'

export const FAQ_ITEMS = [
  {
    question:
      'Is there a Context.dev alternative that returns brand data in one request?',
    text: `Yes. The standard response for any URL includes normalized metadata: title, description, publisher, logo, brand image, and color palette, at the price of one request. Add markdown or a screenshot to the same request and it still costs one request. On Context.dev, that bundle is a Scrape call plus a Retrieve Brand call, billed at ${SCRAPE_CREDITS} + ${BRAND_CREDITS} = ${BUNDLE_CREDITS} credits per\u00a0URL.`,
    answer: (
      <>
        <div>
          Yes. The standard response for any URL includes normalized{' '}
          <Link href='/metadata'>metadata</Link>: title, description, publisher,{' '}
          <Link href='/logo'>logo</Link>, brand image, and color palette, at the
          price of one&nbsp;request.
        </div>
        <div>
          Add markdown or a screenshot to the same request and it still costs
          one request. On Context.dev, that bundle is a Scrape call plus a
          Retrieve Brand call, billed at {SCRAPE_CREDITS} + {BRAND_CREDITS} ={' '}
          {BUNDLE_CREDITS} credits per&nbsp;URL.
        </div>
      </>
    )
  },
  {
    question: 'How does Microlink pricing compare to Context.dev credits?',
    text: `Context.dev prices a menu: a scrape is ${SCRAPE_CREDITS} credit (markdown, metadata, and a screenshot can share that call), JSON extraction is ${JSON_EXTRACTION_CREDITS}, Retrieve Brand ${BRAND_CREDITS}, Extract Styleguide ${STYLEGUIDE_CREDITS}, Enrich Person ${ENRICH_PERSON_CREDITS}. Plans run from $${
      DEVELOPER_PLAN.price
    }/month for ${formatNumber(DEVELOPER_PLAN.credits)} credits to $${
      SCALE_2_5M_PLAN.price
    }/month for ${formatNumber(
      SCALE_2_5M_PLAN.credits
    )}, with overage from ${formatPrice(
      DEVELOPER_PLAN.overagePerBlock
    )} down to ${formatPrice(
      SCALE_2_5M_PLAN.overagePerBlock
    )} per ${formatNumber(CREDITS_PER_OVERAGE_BLOCK)} credits and ${
      DEVELOPER_PLAN.concurrency
    } to ${
      SCALE_PLAN.concurrency
    } concurrent requests depending on plan. Microlink prices requests: $${
      MICROLINK_PLAN.price
    }/month covers ${VOLUME_LABEL} of them, whatever each one returns, with no rate limit on paid plans and cache hits free. Plain scraping costs less per page on Context.dev only at higher volume: ${
      PRO_PLAN.name
    } is $${PRO_PER_THOUSAND} per 1,000 pages at ${formatNumber(
      PRO_PLAN.credits
    )} pages a month. At ${VOLUME_LABEL} scrape-only pages, the cheapest Context.dev plan is ${
      SCRAPE_ONLY.plan.name
    } at ${formatDollars(SCRAPE_ONLY.cost)}/month against Microlink’s $${
      MICROLINK_PLAN.price
    }. Once brand data joins each URL, each one costs ${BUNDLE_CREDITS} credits across two calls, ${formatNumber(
      BUNDLE_VOLUME
    )} credits per month, and the ${
      BUNDLE.plan.name
    } plan plus overage comes to about ${formatDollars(
      BUNDLE.cost
    )}/month against Microlink’s\u00a0$${MICROLINK_PLAN.price}.`
  },
  {
    question: 'Can Microlink extract logos and brand assets like Context.dev?',
    text: 'Yes. The metadata engine, Metascraper, has been extracting logos, brand images, and publisher data in the open for years, and the logo API adds detection with color palettes and sizing information. Need a hotlinkable asset? embed=logo.url turns the API URL into the logo itself. The response mimics the original resource’s headers and body, so it drops straight into an image\u00a0tag.',
    answer: (
      <>
        <div>
          Yes. The metadata engine,{' '}
          <Link href='https://github.com/microlinkhq/metascraper'>
            Metascraper
          </Link>
          , has been extracting logos, brand images, and publisher data in the
          open for years, and the <Link href='/logo'>logo&nbsp;API</Link> adds
          detection with color palettes and sizing&nbsp;information.
        </div>
        <div>
          Need a hotlinkable asset? <b>embed=logo.url</b> turns the API URL into
          the logo itself. The response mimics the original resource’s headers
          and body, so it drops straight into an image&nbsp;tag.
        </div>
      </>
    )
  },
  {
    question: 'Does Microlink return LLM-ready markdown like Context.dev?',
    text: 'Yes. Any URL (a web page, a PDF, or a docx, xlsx, or pptx document) converts to clean markdown with about 80% fewer tokens than raw HTML, via the API or the one-line shortcut endpoint markdown.microlink.io/{url}. Adblock ships enabled by default, so ads, trackers, and cookie banners are stripped before\u00a0conversion.',
    answer: (
      <>
        <div>
          Yes. Any URL (a web page, a PDF, or a docx, xlsx, or pptx document)
          converts to clean markdown with about 80% fewer tokens than raw HTML.
          See the{' '}
          <Link href='/docs/guides/content-conversion/url-to-markdown'>
            URL&nbsp;to&nbsp;markdown&nbsp;guide
          </Link>
          , or use the one&#8209;line shortcut
          endpoint&nbsp;markdown.microlink.io/{'{url}'}.
        </div>
        <div>
          <Link href='/docs/api/parameters/adblock'>Adblock</Link> ships enabled
          by default, so ads, trackers, and cookie banners are stripped before
          conversion.
        </div>
      </>
    )
  },
  {
    question: 'Which Context.dev features does Microlink not cover?',
    text: `The company-data layer: NAICS and SIC classification, ticker lookup, transaction and merchant-descriptor identification, email\u2011to\u2011company lookup, and people search and enrichment. Microlink extracts what a URL contains. It does not resolve corporate entities behind it. Multi-page crawling, page monitors, and ${MAX_BATCH_URLS_LABEL}-URL batch jobs are also Context.dev territory. If those are the core of your workload, it is a different\u00a0product.`
  },
  {
    question: 'Do free credits expire on Context.dev and Microlink?',
    text: `Neither free tier is one-time. Context.dev grants ${FREE_CREDITS_LABEL} credits every month, with ${FREE_CONCURRENT_REQUESTS} concurrent requests and a cap of ${FREE_REQUESTS_PER_MINUTE} requests per minute. Microlink’s free plan is ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, with every Pro feature: about ${FREE_REQUESTS_PER_MONTH} per month, ${FREE_REQUESTS_PER_YEAR} per year, proxy included. Context.dev’s monthly grant is larger. Microlink’s daily reset means a busy afternoon never locks you out until next\u00a0month.`
  },
  {
    question: 'How do I migrate from Context.dev to Microlink?',
    text: 'Migration is mostly request rewriting: swap the Bearer header for x-api-key, turn a POST /web/scrape body (or the older GET /web/scrape/markdown?url= route) into ?url= plus data.markdown.attr=markdown, and delete the separate Retrieve Brand call. Metadata comes standard and screenshot is a parameter on the same\u00a0request.',
    answer: (
      <>
        <div>
          Migration is mostly request rewriting: swap the Bearer header for
          x&#8209;api&#8209;key, turn a <b>POST /web/scrape</b> body (or the
          older <b>GET /web/scrape/markdown?url=</b> route) into{' '}
          <b>?&#8288;url=</b> plus <b>data.markdown.attr=markdown</b>, and
          delete the separate Retrieve Brand call. Metadata comes standard and{' '}
          <b>screenshot</b> is a parameter on the same&nbsp;request.
        </div>
        <div>
          Start from the{' '}
          <Link href='/docs/guides/content-conversion/url-to-markdown'>
            markdown&nbsp;guide
          </Link>{' '}
          and the <Link href='/docs/guides/metadata'>metadata&nbsp;guide</Link>.
        </div>
      </>
    )
  },
  {
    question: 'Can I audit how Microlink extracts brand data?',
    text: 'Yes, the extraction rules are public code. Metascraper (the metadata and brand engine), MQL, and Browserless are MIT-licensed and developed in the open, used by thousands of projects beyond Microlink itself. Context.dev is a proprietary platform: its entity\u2011resolution logic is a black box you can only observe from\u00a0outside.'
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

const LIVE_METADATA_TARGET = 'context.dev'

export const LIVE_METADATA_URL = `https://api.microlink.io/?url=${encodeURIComponent(
  `https://www.${LIVE_METADATA_TARGET}`
)}`

export const LIVE_METADATA_LABEL = `api.microlink.io?url=${LIVE_METADATA_TARGET}`

const COMPARISON_DATA = [
  {
    feature: 'URL to LLM\u2011ready markdown',
    microlink: true,
    contextdev: true
  },
  { feature: 'Metadata extraction', microlink: true, contextdev: true },
  {
    feature: 'Logo & brand image\u00a0extraction',
    microlink: true,
    contextdev: true,
    note: `Context.dev Retrieve Brand bills ${BRAND_CREDITS} credits; Microlink includes logo and brand image in the standard\u00a0response.`
  },
  {
    feature: 'Screenshot capture',
    microlink: true,
    contextdev: true,
    note: 'Context.dev returns the screenshot inside its Scrape call as an inline base64 image with no hosted URL; Microlink returns a CDN\u2011hosted URL at the flat request\u00a0price.'
  },
  {
    feature: 'Structured data\u00a0extraction',
    microlink: true,
    contextdev: true,
    note: `Context.dev JSON extraction bills ${JSON_EXTRACTION_CREDITS} credits per page; Microlink MQL selector rules run at the flat request\u00a0price.`
  },
  {
    feature: 'Built\u2011in rotating proxy and\u00a0antibot',
    microlink: true,
    contextdev: true,
    note: 'Context.dev includes it on every plan; Microlink includes it with every API key, the free one\u00a0included.'
  },
  {
    feature: 'Markdown + metadata + logo + screenshot in one\u00a0request',
    microlink: true,
    contextdev: false,
    note: `On Context.dev that bundle is a Scrape call plus a Retrieve Brand call: ${SCRAPE_CREDITS} + ${BRAND_CREDITS} = ${BUNDLE_CREDITS}\u00a0credits.`
  },
  {
    feature: 'Free tier that\u00a0renews',
    microlink: true,
    contextdev: true,
    note: `Microlink’s free plan is ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card. Context.dev renews ${FREE_CREDITS_LABEL} credits every month, capped at ${FREE_REQUESTS_PER_MINUTE}\u00a0requests/minute.`
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    contextdev: `${PLAN_CONCURRENCY.developer} to ${PLAN_CONCURRENCY.scale}\u00a0concurrent`,
    note: `Context.dev caps concurrent requests by plan: ${PLAN_CONCURRENCY.developer} on Developer, ${PLAN_CONCURRENCY.pro} on Pro, up to ${PLAN_CONCURRENCY.scale} on\u00a0Scale.`
  },
  {
    feature: 'PDF generation (URL →\u00a0PDF)',
    microlink: true,
    contextdev: false
  },
  {
    feature: 'Animated capture\u00a0(MP4/WebM)',
    microlink: true,
    contextdev: false
  },
  { feature: 'Browser chrome overlay', microlink: true, contextdev: false },
  {
    feature: 'Direct embed (no\u00a0backend)',
    microlink: true,
    contextdev: false
  },
  {
    feature: 'Link previews',
    note: (
      <>
        <Link href='/link-preview'>Link preview API</Link> returns the oEmbed
        iframe, card fields, and media in one&nbsp;call.
      </>
    ),
    microlink: true,
    contextdev: false
  },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    contextdev: false
  },
  { feature: 'Multi\u2011page crawling', microlink: false, contextdev: true },
  {
    feature: 'Monitors / change\u00a0detection',
    microlink: false,
    contextdev: true
  },
  {
    feature: `Batch jobs (up to ${MAX_BATCH_URLS_LABEL}\u00a0URLs)`,
    microlink: false,
    contextdev: true
  },
  {
    feature: 'Company enrichment (NAICS/SIC, tickers,\u00a0people)',
    microlink: false,
    contextdev: true
  },
  {
    feature: 'Transaction / merchant\u00a0identification',
    microlink: false,
    contextdev: true
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'One request, one flat\u00a0price',
    description: (
      <>
        On Context.dev, each answer has a price tag: a scrape{' '}
        <b>{SCRAPE_CREDITS}</b> credit, JSON extraction{' '}
        <b>{JSON_EXTRACTION_CREDITS}</b>, Retrieve Brand <b>{BRAND_CREDITS}</b>,
        Extract Styleguide {STYLEGUIDE_CREDITS}, Enrich Person{' '}
        {ENRICH_PERSON_CREDITS}. Microlink returns{' '}
        <b>
          metadata, logo, brand image, markdown, and a screenshot from the same
          request
        </b>{' '}
        at one request&nbsp;price.
      </>
    )
  },
  {
    number: '02',
    title: 'Logos and brand data in the default\u00a0response',
    description: (
      <>
        The metadata engine behind Microlink,{' '}
        <b>
          Metascraper, has been extracting logos, brand images, and publisher
          data in the open for years
        </b>
        , and the <Link href='/logo'>logo&nbsp;API</Link> adds detection with
        color palettes and sizing. Normalized brand fields come in the default
        response on every&nbsp;plan.
      </>
    )
  },
  {
    number: '03',
    title: 'A free tier that renews\u00a0daily',
    description: (
      <>
        Context.dev grants <b>{FREE_CREDITS_LABEL} free credits per month</b>,
        capped at {FREE_CONCURRENT_REQUESTS} concurrent and{' '}
        {FREE_REQUESTS_PER_MINUTE}&nbsp;requests/minute: spend them early and
        you wait for next month. Microlink’s free plan is{' '}
        <b>{FREE_PLAN_REQUESTS_PER_DAY} requests/day</b>, renews daily, no
        credit card, with every Pro&nbsp;feature.
      </>
    )
  },
  {
    number: '04',
    title: 'Screenshots you can\u00a0embed',
    description: (
      <>
        Microlink screenshots cost the same flat request price and come back as{' '}
        <b>CDN&#8209;hosted URLs</b> you can embed directly, with{' '}
        <b>
          browser&#8209;frame overlays, device presets, and MP4/WebM recordings
        </b>{' '}
        as parameters. Context.dev returns a screenshot as an inline base64
        image with no hosted URL: storing and serving it is your job.
      </>
    )
  },
  {
    number: '05',
    title: 'No rate limit on paid\u00a0plans',
    description: (
      <>
        Context.dev caps concurrent requests by the plan you pay for:{' '}
        <b>
          {PLAN_CONCURRENCY.developer} on Developer, {PLAN_CONCURRENCY.pro} on
          Pro, up to {PLAN_CONCURRENCY.scale} on Scale
        </b>
        . Microlink has <b>no rate limit on paid plans</b>: your monthly quota
        spends at whatever rate your pipeline&nbsp;needs.
      </>
    )
  },
  {
    number: '06',
    title: 'Open\u2011source core\u00a0(MIT)',
    description: (
      <>
        Context.dev’s entity resolution is proprietary. Microlink’s extraction
        stack (<b>Metascraper, MQL, Browserless</b>) is <b>MIT-licensed</b> and
        developed in public: read the rules that produce your brand data, fork
        them, or run them&nbsp;yourself.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Company data beyond the\u00a0page',
    description:
      'NAICS and SIC classification, ticker lookup, merchant\u2011descriptor identification, email\u2011to\u2011company lookup, and people enrichment, on brand entities resolved across sources. Microlink extracts what a URL declares. It does not resolve the company behind\u00a0it.'
  },
  {
    title: 'Crawling, monitors, and batch\u00a0jobs',
    description: `Multi\u2011page crawls, page and sitemap monitors with signed webhooks, and batch jobs up to ${MAX_BATCH_URLS_LABEL} URLs cover pipeline shapes Microlink does not. Microlink converts one URL per call and leaves the queue to\u00a0you.`
  },
  {
    title: 'Cheaper per plain page at high\u00a0volume',
    description: `The Pro plan works out to $${PRO_PER_THOUSAND} per 1,000 pages, markdown, metadata, and screenshot included, against $${MICROLINK_PER_THOUSAND} on Microlink, and the largest self-serve tier drops to $${LOWEST_PER_THOUSAND}. For plain scraping at scale, Context.dev is the cheaper line\u00a0item.`
  },
  {
    title: 'A bigger monthly free\u00a0grant',
    description: `Context.dev’s free tier renews ${FREE_CREDITS_LABEL} credits every month, more than Microlink’s ${FREE_PLAN_REQUESTS_PER_DAY} requests/day add up to. For one evaluation burst a month, that grant goes\u00a0further.`
  }
]

export const META = {
  title: 'Context.dev Alternative: Brand & Web Data in One Request',
  description:
    'Context.dev bills a credit menu: 1 per scrape, 10 for brand data, 5 for JSON extraction. Microlink returns metadata, logo, palette, markdown, and screenshots in one flat-priced request, with a free tier that renews daily.'
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Context.dev Alternative: Brand & Web Data in One\u00a0Request',
    description: `Compare Microlink and Context.dev for brand and web data. Microlink returns metadata, logo, brand image, color palette, markdown, and screenshots from a single flat-priced request: no credit menu, a free plan of ${FREE_PLAN_REQUESTS_PER_DAY} requests/day that renews daily, and an MIT-licensed extraction\u00a0engine.`,
    url: 'https://microlink.io/alternative/context-dev',
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
  caption: <>The usual reasons teams move from Context.dev to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      Context.dev facts come from its public docs and pricing page, and the last
      five rows are where it does&nbsp;more.
    </>
  ),
  columns: ['Microlink', 'Context.dev'],
  rows: COMPARISON_DATA,
  competitorKey: 'contextdev',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>Context.dev</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'Company data, crawling and batch jobs, a lower per\u2011page price at volume, and a bigger monthly free\u00a0grant.',
  items: HONESTY_ITEMS
}
