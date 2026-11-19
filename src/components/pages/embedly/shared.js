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
import { CDN_EDGES } from 'helpers/cdn-edges'

export const COMPETITOR_PRICE = 119
const COMPETITOR_VOLUME = 10000
const EXTRACT_VOLUME = 10000
const DISPLAY_VOLUME = 25000
export const CARDS_PRICE = 19
const OVERAGE_PRICE = 9.5
const OVERAGE_BLOCK = 10000
export const RATE_LIMIT_PER_SECOND = 50
const CHECKED_AT = '2026-11-18'

export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

export const MICROLINK_VOLUME = formatNumber(DEFAULT_PLAN.reqsPerMonthTotal)
export const EMBEDLY_VOLUME = formatNumber(COMPETITOR_VOLUME)

const pricePerThousand = (price, volume) => ((price / volume) * 1000).toFixed(2)

export const MICROLINK_PRICE_PER_1000 = pricePerThousand(
  MICROLINK_PLAN.price,
  DEFAULT_PLAN.reqsPerMonthTotal
)

export const EMBEDLY_API_PRICE_PER_1000 = pricePerThousand(
  COMPETITOR_PRICE,
  COMPETITOR_VOLUME
)

export const OVERAGE_PER_1000 = pricePerThousand(OVERAGE_PRICE, OVERAGE_BLOCK)

export const EXTRACT_VOLUME_LABEL = formatNumber(EXTRACT_VOLUME)
export const DISPLAY_VOLUME_LABEL = formatNumber(DISPLAY_VOLUME)

export const EMBEDLY_COST_AT_MICROLINK_VOLUME = (
  COMPETITOR_PRICE +
  ((DEFAULT_PLAN.reqsPerMonthTotal - COMPETITOR_VOLUME) / OVERAGE_BLOCK) *
    OVERAGE_PRICE
).toFixed(2)

export const PER_URL_MULTIPLIER = Math.floor(
  COMPETITOR_PRICE /
    COMPETITOR_VOLUME /
    (MICROLINK_PLAN.price / DEFAULT_PLAN.reqsPerMonthTotal)
)

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='More volume.'
      highlight={'Under half the\u00a0spend.'}
    />
  ),
  caption: `Microlink bills requests: ${MICROLINK_VOLUME} for $${MICROLINK_PLAN.price}\u00a0per\u00a0month. Embedly\u00a0API bills Embed URLs: ${EMBEDLY_VOLUME} for $${COMPETITOR_PRICE}\u00a0per\u00a0month.`,
  microlink: {
    cta: 'alternative-embedly:pricing',
    secondaryHref: '/embed',
    secondaryLabel: 'Explore the Embed API',
    items: [
      'Embeds, metadata, screenshots, and PDF from one\u00a0quota',
      'Proxy and antibot handling\u00a0included'
    ]
  },
  competitor: {
    name: 'Embedly API',
    price: COMPETITOR_PRICE,
    quota: COMPETITOR_VOLUME,
    unit: 'Embed\u00a0URLs',
    items: [
      missing('No free plan'),
      missing(
        `${RATE_LIMIT_PER_SECOND}\u00a0URLs/second cap on every paid\u00a0plan`
      ),
      `$${OVERAGE_PER_1000} per 1,000 extra Embed or Extract\u00a0URLs`,
      'Embed, Extract, and Display split into three\u00a0quotas',
      `+${EXTRACT_VOLUME_LABEL} Extract URLs, +${DISPLAY_VOLUME_LABEL} Display\u00a0images`
    ],
    source: 'https://embed.ly/pricing',
    checkedAt: CHECKED_AT
  },
  note: `Embedly’s $${CARDS_PRICE} Cards widget costs less if a client\u2011side card is all you need. API plan to API plan, Microlink costs ${PER_URL_MULTIPLIER}× less per\u00a0URL.`
}

export const CTA = {
  caption:
    'Spend less on every embed. Pass any URL and get back normalized metadata plus a ready\u2011to\u2011paste iframe, same shape for every provider.',
  cta: 'alternative-embedly:footer-cta',
  links: [
    { href: '/embed', label: 'Explore the Embed API' },
    { href: '/docs/guides/embed', label: 'Read the embed guide' }
  ]
}

export const FAQ_CAPTION =
  'Per\u2011URL cost, rate limits, Cards, and migration, from Embedly’s public pricing and\u00a0docs.'

export const FAQ_ITEMS = [
  {
    question: 'How does Microlink compare to Embedly on per-URL cost?',
    text: `Embedly’s API plan starts at $${COMPETITOR_PRICE}/month for ${EMBEDLY_VOLUME} Embed URLs, which works out to $${EMBEDLY_API_PRICE_PER_1000} per 1,000. Microlink is $${MICROLINK_PLAN.price}/month for ${MICROLINK_VOLUME} requests, or $${MICROLINK_PRICE_PER_1000} per 1,000. Per Embed URL, Microlink is roughly ${PER_URL_MULTIPLIER}× cheaper at the entry tier. Embedly’s plan also bundles ${EXTRACT_VOLUME_LABEL} Extract URLs and ${DISPLAY_VOLUME_LABEL} Display images in separate quotas, while Microlink uses one shared bucket across every endpoint. Past the quota, Embedly bills $${OVERAGE_PER_1000} per 1,000 extra URLs, which is lower than Microlink’s per-request rate, so the gap narrows at higher\u00a0volume.`
  },
  {
    question: 'What is the difference between Embedly Cards and the API plan?',
    text: `Cards is the $${CARDS_PRICE}/month standalone JavaScript widget plan, also included with the API plan: you drop the embedly.js script on a publisher site and Embedly handles rendering in the browser. There is no documented server-side quota and you cannot call the API directly. The API plan at $${COMPETITOR_PRICE}/month gives you the Embed, Extract, and Display REST APIs with metered URL quotas and overage pricing. That is the plan to compare against Microlink, since Microlink is\u00a0API-first.`
  },
  {
    question: `Does Embedly have a ${RATE_LIMIT_PER_SECOND} URLs/second cap?`,
    text: `Yes. Embedly’s documentation states every paid API plan is rate\u2011limited to ${RATE_LIMIT_PER_SECOND} URLs per second across Embed, Extract, and Display combined. Custom throughput requires contacting their sales team. Microlink has no rate limit on paid plans, so spike traffic does not need a separate\u00a0negotiation.`
  },
  {
    question:
      'Can Microlink replace Embedly’s Embed, Extract, and Display APIs?',
    text: 'Embed and Extract: yes. Microlink’s metadata endpoint returns the same normalized fields Extract does and the same iframe HTML payload Embed returns for supported providers. Display: partial. Embedly Display is an on-the-fly image transform API. Microlink does not provide equivalent image-transform capabilities. Pair Microlink with a dedicated image CDN if you need image\u00a0optimization.',
    answer: (
      <>
        <div>
          Embed and Extract: yes. Microlink’s metadata endpoint returns the same
          normalized fields Extract does (title, description, image, author,
          publisher, oEmbed-style media) and the same iframe HTML payload Embed
          returns for supported providers. Pass any URL to{' '}
          <Link href='/embed'>the&nbsp;embed&nbsp;API</Link> and the response
          covers both jobs.
        </div>
        <div>
          Display: partial. Embedly Display is an on&#8209;the&#8209;fly image
          transform API (resize, crop, format conversion). Microlink does not
          provide equivalent image-transform capabilities. If image optimization
          is a load-bearing part of your stack, pair Microlink with a dedicated
          image CDN (Cloudinary, Imgix,&nbsp;ImageKit).
        </div>
      </>
    )
  },
  {
    question: 'Does Microlink replace a separate proxy service?',
    text: 'Yes, on every API key, free included. Microlink ships a built-in proxy layer, on by default, that resolves and rotates proxies automatically when a target site blocks the request, and detects the antibot or CAPTCHA provider in the way. Detection logic is open source as is-antibot. Supported antibot providers: Cloudflare, DataDome, Akamai, PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape Security. Embedly does not advertise any equivalent\u00a0capability.',
    answer: (
      <>
        <div>
          Yes, on every API key, free included. Microlink ships a{' '}
          <b>built&#8209;in proxy layer</b>, on by default, that resolves and
          rotates proxies automatically when a target site blocks the request,
          and detects the antibot or CAPTCHA provider in&nbsp;the&nbsp;way.
        </div>
        <div>
          The detection logic is open source as{' '}
          <Link href='https://github.com/microlinkhq/is-antibot'>
            is-antibot
          </Link>
          . Supported antibot providers: Cloudflare, DataDome, Akamai,
          PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape
          Security. The full breakdown lives on the{' '}
          <Link href='/features/proxy'>proxy&nbsp;feature&nbsp;page</Link>.
          Embedly does not advertise any equivalent&nbsp;capability.
        </div>
      </>
    )
  },
  {
    question: 'How do I migrate from Embedly to Microlink?',
    text: `The data shapes are close enough that most card components only need a thin adapter. Embedly returns title, description, thumbnail, oEmbed-style media, and provider info; Microlink returns the same fields plus color palette, logo URL, and dominant color metadata. At the network layer, swap i.embed.ly/1/oembed?url=…&key=… for pro.microlink.io?url=… with your free Microlink API key (${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit\u00a0card).`,
    answer: (
      <>
        <div>
          The data shapes are close enough that most card components only need a
          thin adapter. Embedly returns title, description, thumbnail,
          oEmbed-style media, and provider info; Microlink returns the same
          fields plus color palette, logo URL, and dominant color&nbsp;metadata.
        </div>
        <div>
          At the network layer, swap <b>i.embed.ly/1/oembed?url=…&key=…</b> for{' '}
          <b>pro.microlink.io?url=…</b> with your free Microlink API key (
          {FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests/day, renews daily, no
          credit card). The{' '}
          <Link href='/docs/guides/embed'>embed&nbsp;guide</Link> walks through
          the full&nbsp;mapping.
        </div>
      </>
    )
  },
  {
    question: 'When does Embedly still make more sense than Microlink?',
    text: `When you depend on a long-tail publisher in Embedly’s catalog of thousands of providers that Microlink does not yet cover, the catalog gap is a real reason to stay. Embedly has been curating their provider list since 2010. When image transformation is in your critical path (resizing, cropping, or format converting), Embedly Display ships that as a first-class API while Microlink does not. And if you only need the drop-in Cards widget for a publisher site with no server-side API usage, the $${CARDS_PRICE} Cards plan is the lower\u2011priced\u00a0entry.`
  },
  {
    question: 'Is Microlink open source?',
    text: 'The core is. Metascraper (metadata extraction), MQL (the query language), and Browserless (the headless browser layer) are all published on GitHub under the MIT license. The hosted API at microlink.io bundles those components with managed proxies, antibot tooling, edge caching, and a 99.9% SLA. Embedly’s pipeline is fully proprietary\u00a0today.',
    answer: (
      <>
        <div>
          The core is. Metascraper (metadata extraction), MQL (the query
          language), and Browserless (the headless browser layer) are all
          published on GitHub under the MIT license, so you can audit, fork, or
          self-host the underlying&nbsp;pipeline.
        </div>
        <div>
          The hosted API at <Link href='/'>microlink.io</Link> bundles those
          components with managed proxies, antibot tooling, edge caching, and a
          99.9% SLA. Embedly’s pipeline is fully proprietary&nbsp;today.
        </div>
      </>
    )
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

const PROXY_COUNTRIES = 181

const COMPARISON_DATA = [
  {
    feature: 'Free\u00a0plan',
    microlink: `${FREE_PLAN_REQUESTS_PER_DAY}\u00a0requests/day, renews\u00a0daily`,
    embedly: 'None listed',
    note: `Embedly’s pricing page lists no free plan: the API plan starts at $${COMPETITOR_PRICE}/month. Microlink’s free plan is ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit\u00a0card.`
  },
  {
    feature: 'Per\u2011request cost (entry API\u00a0tier)',
    microlink: `$${MICROLINK_PRICE_PER_1000} per 1,000\u00a0requests`,
    embedly: `$${EMBEDLY_API_PRICE_PER_1000} per 1,000\u00a0URLs`
  },
  {
    feature: 'Overage past the\u00a0quota',
    microlink: 'Next plan\u00a0up',
    embedly: `$${OVERAGE_PER_1000} per 1,000\u00a0URLs`,
    note: `Microlink has no overage billing: more volume moves you to the next plan. Embedly bills each extra Embed or Extract URL, at $${OVERAGE_PER_1000} per\u00a01,000.`
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    embedly: `${RATE_LIMIT_PER_SECOND}\u00a0URLs/second\u00a0cap`,
    note: `Embedly caps all paid plans at ${RATE_LIMIT_PER_SECOND} URLs/second. Higher throughput needs a custom\u00a0plan.`
  },
  {
    feature: 'Quota separation across\u00a0APIs',
    microlink: 'Single bucket',
    embedly: 'Three separate\u00a0quotas',
    note: 'Embedly meters Embed and Extract independently (10K each on the entry API plan). Microlink uses one shared request quota across all\u00a0endpoints.'
  },
  {
    feature: 'Publisher catalog\u00a0size',
    microlink: '300+ oEmbed\u00a0providers',
    embedly: 'Thousands of\u00a0providers',
    note: 'Embedly maintains a deeper publisher catalog. Microlink covers the most common oEmbed providers plus universal Open Graph\u00a0fallback.'
  },
  {
    feature: 'oEmbed iframe and card\u00a0output',
    microlink: true,
    embedly: true
  },
  {
    feature: 'Custom HTTP headers and\u00a0cookies',
    microlink: true,
    embedly: false
  },
  { feature: 'Remote JS\u00a0execution', microlink: true, embedly: false },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    embedly: false,
    note: 'Every Microlink API key, free included, comes with a built\u2011in proxy layer that rotates automatically when a site blocks the\u00a0request.'
  },
  {
    feature: 'Proxy\u00a0geolocation',
    note: 'Microlink proxy.location takes any of 181 ISO country codes on every API key, free\u00a0included.',
    microlink: `${PROXY_COUNTRIES}\u00a0countries`,
    embedly: false
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    embedly: false,
    note: 'Cloudflare, DataDome, Akamai, PerimeterX, Kasada, Imperva, AWS WAF, reCAPTCHA, hCaptcha, Cloudflare Turnstile and more, handled inside the\u00a0API.'
  },
  { feature: 'Screenshot\u00a0capture', microlink: true, embedly: false },
  { feature: 'PDF\u00a0generation', microlink: true, embedly: false },
  { feature: 'Video output\u00a0(MP4/WebM)', microlink: true, embedly: false },
  { feature: 'Markdown\u00a0conversion', microlink: true, embedly: false },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    embedly: false
  },
  {
    feature: `${CDN_EDGES} CDN edge\u00a0nodes`,
    microlink: true,
    embedly: false
  },
  {
    feature: 'Image transformation / resize\u00a0API',
    microlink: false,
    embedly: true,
    note: 'Embedly Display resizes, crops, fills, blurs, and converts images to WebP. Microlink does not provide an image transform\u00a0API.'
  },
  {
    feature: 'Ranked article\u00a0keywords',
    microlink: false,
    embedly: true
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: `Roughly ${PER_URL_MULTIPLIER}× less per Embed URL on the entry\u00a0tier`,
    description: (
      <>
        Embedly’s API plan is{' '}
        <b>
          ${COMPETITOR_PRICE}/month for {EMBEDLY_VOLUME} Embed URLs
        </b>
        , with {EXTRACT_VOLUME_LABEL} Extract URLs and {DISPLAY_VOLUME_LABEL}{' '}
        Display images bundled. Microlink is{' '}
        <b>
          ${MICROLINK_PLAN.price}/month for {MICROLINK_VOLUME} requests
        </b>{' '}
        across every endpoint. Embedly bills overage per URL, at $
        {OVERAGE_PER_1000} per 1,000, so {MICROLINK_VOLUME} Embed URLs cost{' '}
        <b>${EMBEDLY_COST_AT_MICROLINK_VOLUME}/month</b>. That overage rate is
        lower than Microlink’s ${MICROLINK_PRICE_PER_1000} per 1,000, so the gap
        narrows as volume&nbsp;grows.
      </>
    )
  },
  {
    number: '02',
    title: 'One shared request budget for three\u00a0endpoints',
    description: (
      <>
        Embedly meters <b>Embed</b>, <b>Extract</b>, and <b>Display</b> as three
        separate quotas, each with its own monthly cap and overage rate.
        Microlink uses <b>one shared request budget</b>, so swapping between a
        card render, a metadata pull, and an iframe response does not require
        capacity planning per&nbsp;endpoint.
      </>
    )
  },
  {
    number: '03',
    title: `No ${RATE_LIMIT_PER_SECOND} URLs/second ceiling on paid\u00a0plans`,
    description: (
      <>
        Embedly caps all paid tiers at{' '}
        <b>{RATE_LIMIT_PER_SECOND} URLs per second</b>. Microlink has{' '}
        <b>no rate limit on paid plans</b>, so spiky traffic (link&#8209;preview
        rendering during an email blast, batch re&#8209;indexing) does not
        require a custom contract.
      </>
    )
  },
  {
    number: '04',
    title: 'A built\u2011in web proxy on every API\u00a0key',
    description: (
      <>
        Embedly fetches cooperative publisher endpoints. The moment a target
        sits behind <b>Cloudflare</b>, <b>DataDome</b>, <b>Akamai</b>, or any of
        the 30+ antibot and CAPTCHA providers Microlink detects, Embedly
        documents no way&nbsp;through. Every Microlink API key, free included,
        folds three normally&#8209;separate stacks (a <b>rotating proxy</b>,{' '}
        <b>antibot detection</b>, and <b>CAPTCHA handling</b>) into the same
        request&nbsp;price.
        <br />
        <br />
        <Link href='/features/proxy'>See how the proxy works</Link>.
      </>
    )
  },
  {
    number: '05',
    title: 'A free tier that renews\u00a0daily',
    description: (
      <>
        Embedly’s pricing page lists <b>no free plan</b>: the API plan starts at
        ${COMPETITOR_PRICE}/month. Microlink’s free tier is{' '}
        <b>{FREE_PLAN_REQUESTS_PER_DAY} requests/day</b>, renews daily, no
        credit card, with every Pro feature on the same edge network as paid
        plans. Low&#8209;volume integrations can run on it in&nbsp;production.
      </>
    )
  },
  {
    number: '06',
    title: 'Open\u2011source core\u00a0(MIT)',
    description: (
      <>
        <b>Metascraper</b>, <b>Browserless</b>, and <b>MQL</b> are{' '}
        <b>MIT-licensed</b> on GitHub. Read the core engine, fork it, or
        self&#8209;host it. Embedly’s pipeline is&nbsp;proprietary.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Bigger publisher\u00a0catalog',
    description:
      'Embedly advertises thousands of supported providers, with an established record at NYT, Microsoft, Medium, Reddit, MLB, NPR, and The Guardian. If your product depends on long-tail publisher coverage, Embedly has been investing in that catalog at scale for over a decade.'
  },
  {
    title: `Cards plan at $${CARDS_PRICE}/mo for low\u2011volume\u00a0sites`,
    description: `If you only need the JS card widget on a publisher site and do not call the API server\u2011side, Embedly Cards at $${CARDS_PRICE}/month is a real entry point that Microlink does not match dollar\u2011for\u2011dollar. Microlink’s free tier (${FREE_PLAN_REQUESTS_PER_DAY} requests/day) covers most equivalent low-volume cases without a credit card, but the paid tier starts\u00a0at\u00a0$${MICROLINK_PLAN.price}.`
  },
  {
    title: 'Display API for on\u2011the\u2011fly image\u00a0optimization',
    description:
      'Embedly’s Display API resizes, crops, blurs, and converts images to WebP. Microlink extracts metadata and color palettes but does not transform images. If a chunk of your workflow is image CDN\u2011style transforms, Embedly has the dedicated endpoint for\u00a0it.'
  },
  {
    title: 'Ranked keywords from\u00a0articles',
    description:
      'Embedly’s Extract API returns clean article text alongside ranked keywords, ready for tagging and related\u2011content features. Microlink returns the article text and metadata, but does not rank\u00a0keywords.'
  }
]

export const META = {
  title: 'Embedly Alternative with Lower Per-URL Pricing',
  description: `Microlink gives you ${MICROLINK_VOLUME} requests for $${MICROLINK_PLAN.price} against Embedly’s ${EMBEDLY_VOLUME} Embed URLs for $${COMPETITOR_PRICE} (with bundled Extract and Display quotas): roughly ${PER_URL_MULTIPLIER}× cheaper per Embed URL, no ${RATE_LIMIT_PER_SECOND} URLs/second cap, plus a built-in built-in proxy on the same plan.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Embedly Alternative with Lower Per-URL Pricing |\u00a0Microlink',
    description: `Embedly’s API plan starts at $${COMPETITOR_PRICE}/month for ${EMBEDLY_VOLUME} Embed URLs, with ${EXTRACT_VOLUME_LABEL} Extract URLs and ${DISPLAY_VOLUME_LABEL} Display images bundled, and caps every plan at ${RATE_LIMIT_PER_SECOND} URLs/second. Microlink gives you ${MICROLINK_VOLUME} requests for $${MICROLINK_PLAN.price} across every endpoint, no rate limit on paid plans, plus a built-in built-in proxy on the same\u00a0plan.`,
    url: 'https://microlink.io/alternative/embedly',
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
  caption: <>The usual reasons teams move from Embedly to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>Based on Embedly’s public pricing page and API&nbsp;documentation.</>
  ),
  columns: ['Microlink', 'Embedly'],
  rows: COMPARISON_DATA,
  competitorKey: 'embedly',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>Embedly</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'A bigger publisher catalog, a cheaper Cards plan, image transforms, and ranked article\u00a0keywords.',
  items: HONESTY_ITEMS
}
