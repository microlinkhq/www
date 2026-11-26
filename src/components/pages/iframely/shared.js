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
import { formatNumber } from 'helpers/format-number'
import { DEFAULT_PLAN } from 'helpers/pro-plans'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import { CDN_EDGES } from 'helpers/cdn-edges'

export const COMPETITOR_PRICE = 49
const COMPETITOR_VOLUME = 25000
const OVERAGE_PER_THOUSAND = 3
const FREE_HITS = 2000
export const RATE_LIMIT_PER_SECOND = 50
const CHECKED_AT = '2026-11-18'

export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

export const MICROLINK_VOLUME = formatNumber(DEFAULT_PLAN.reqsPerMonthTotal)
export const IFRAMELY_VOLUME = formatNumber(COMPETITOR_VOLUME)
export const IFRAMELY_FREE_HITS = formatNumber(FREE_HITS)

const pricePerThousand = (price, volume) => ((price / volume) * 1000).toFixed(2)

export const MICROLINK_PRICE_PER_1000 = pricePerThousand(
  MICROLINK_PLAN.price,
  DEFAULT_PLAN.reqsPerMonthTotal
)

export const IFRAMELY_PRICE_PER_1000_HITS = pricePerThousand(
  COMPETITOR_PRICE,
  COMPETITOR_VOLUME
)

export const VOLUME_MULTIPLIER = (
  DEFAULT_PLAN.reqsPerMonthTotal / COMPETITOR_VOLUME
).toFixed(1)

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead={'Per\u2011request pricing.'}
      highlight={'One request per uncached\u00a0call.'}
    />
  ),
  caption: `Microlink bills requests: ${MICROLINK_VOLUME} for $${MICROLINK_PLAN.price}\u00a0per\u00a0month. Iframely\u00a0Business bills hits: ${IFRAMELY_VOLUME} for $${COMPETITOR_PRICE}\u00a0per\u00a0month.`,
  microlink: {
    cta: 'alternative-iframely:pricing',
    secondaryHref: '/embed',
    secondaryLabel: 'Explore the Embed API',
    items: [
      'Cache hits don’t spend your\u00a0quota',
      'Embeds, metadata, screenshots, and PDF from one\u00a0quota'
    ]
  },
  competitor: {
    name: 'Iframely Business',
    price: COMPETITOR_PRICE,
    quota: COMPETITOR_VOLUME,
    unit: 'hits',
    items: [
      `Free plan: ${IFRAMELY_FREE_HITS}\u00a0hits/month, pilot projects\u00a0only`,
      missing(
        `${RATE_LIMIT_PER_SECOND}\u00a0requests/second cap on every\u00a0plan`
      ),
      missing(`$${OVERAGE_PER_THOUSAND} per 1,000 extra\u00a0hits`),
      'A hit is an hour of activity on one URL, about 1 to 4 API\u00a0calls'
    ],
    source: 'https://iframely.com/plans',
    checkedAt: CHECKED_AT
  },
  note: 'Both plans absorb repeat loads: a hit groups an hour of calls to one URL, and Microlink cache hits are free. Unique URLs decide the bill.'
}

export const CTA = {
  caption:
    'Pass any URL and get back normalized metadata plus a ready\u2011to\u2011paste iframe, same shape for every\u00a0provider.',
  cta: 'alternative-iframely:footer-cta',
  links: [
    { href: '/embed', label: 'Explore the Embed API' },
    { href: '/docs/guides/embed', label: 'Read the embed guide' }
  ]
}

export const FAQ_CAPTION =
  'Hits, rate limits, catalog coverage, and migration, from Iframely’s public plans and docs.'

export const FAQ_ITEMS = [
  {
    question: 'How does Microlink compare to Iframely on pricing?',
    text: `Iframely Business is $${COMPETITOR_PRICE}/month for ${IFRAMELY_VOLUME} “hits”. Microlink is $${MICROLINK_PLAN.price}/month for ${MICROLINK_VOLUME} API requests. That is about $${MICROLINK_PRICE_PER_1000} per 1,000 requests for Microlink against $${IFRAMELY_PRICE_PER_1000_HITS} per 1,000 hits for Iframely Business. Iframely defines a “hit” as an hour of activity on one URL, typically 1 to 4 API calls, so repeat loads of the same URL inside that hour are absorbed. Microlink absorbs repeat loads too: responses served from cache don’t count against your quota. For the same money, the number of unique URLs decides the bill, and Microlink includes ${VOLUME_MULTIPLIER}× more of\u00a0them.`
  },
  {
    question: 'What exactly is a “hit” on Iframely?',
    text: 'From Iframely’s own pricing page, a hit represents an hour of URL activity on their service and typically covers 1 to 4 API calls or 5 to 15 iframe views per hit, depending on caching and reuse. This is a useful model if your audience re-views the same URLs in short bursts, but it makes pre\u2011purchase forecasting harder because the same workload can cost different amounts depending on how often users return to the same content. Microlink counts one request per uncached call, so a forecast starts from your URL\u00a0count.'
  },
  {
    question: 'Does Iframely have a requests-per-second cap?',
    text: `Yes. Iframely’s API license documents a ${RATE_LIMIT_PER_SECOND} requests/second ceiling across all standard plans, with higher throughput available only on custom arrangements. For most apps that is plenty; for spiky workloads (email blast triggers, viral threads, bulk re-indexing) it forces a conversation with sales. Microlink has no rate limit on paid plans. You pay for the requests you make and the API scales without a separate\u00a0contract.`
  },
  {
    question: 'Can Microlink return the same iframe HTML that Iframely does?',
    text: 'For oEmbed providers, yes. Microlink’s embed API returns the provider iframe HTML plus normalized title, description, image, logo, and color palette. Iframely advertises 1,900+ publishers with proprietary discovery on top of oEmbed; Microlink covers 300+ oEmbed providers plus universal Open Graph and Twitter Card\u00a0fallback.',
    answer: (
      <>
        <div>
          For oEmbed providers, yes. Pass the URL to{' '}
          <Link href='/embed'>Microlink’s&nbsp;embed&nbsp;API</Link> and the
          response includes the provider’s iframe HTML along with the normalized
          title, description, image, logo, and color palette, ready to paste or
          render through the&nbsp;SDK.
        </div>
        <div>
          What differs is publisher coverage breadth: Iframely advertises 1,900+
          publishers with proprietary discovery on top of oEmbed. Microlink
          covers 300+ oEmbed providers plus a universal Open Graph and Twitter
          Card fallback for anything&nbsp;else.
        </div>
      </>
    )
  },
  {
    question: 'Why pick Microlink if Iframely covers more publishers?',
    text: 'Two reasons. First, Microlink gives you the same embed flow plus screenshots, PDFs, Lighthouse audits, MQL extraction, and remote JS from one API. You do not pay a second vendor when the workflow widens beyond cards. Second, Microlink ships detection for 30+ antibot and CAPTCHA providers and a built-in rotating proxy, included on every API key, free included. Iframely’s pipeline is optimized for cooperative publisher endpoints; Microlink is optimized for arbitrary URLs, including ones that fight\u00a0back.'
  },
  {
    question: 'Does Microlink replace a separate proxy service?',
    text: 'Yes, on every API key, free included. Microlink ships a built-in proxy layer, on by default, that resolves and rotates proxies automatically when a target site blocks the request, and detects the antibot or CAPTCHA provider in the way. Detection logic is open source as is-antibot. Supported antibot providers: Cloudflare, DataDome, Akamai, PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape Security. Every response carries an x-fetch-mode header that shows whether the proxy\u00a0was\u00a0used.',
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
          </Link>{' '}
          and the supported list (Cloudflare, DataDome, Akamai, PerimeterX,
          Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape Security) plus the
          CAPTCHA coverage are documented on the{' '}
          <Link href='/features/proxy'>proxy&nbsp;feature&nbsp;page</Link>.
          Every response carries an <b>x&#8209;fetch&#8209;mode</b> header that
          shows whether the proxy&nbsp;was&nbsp;used.
        </div>
      </>
    )
  },
  {
    question: 'How hard is it to migrate from Iframely to Microlink?',
    text: 'For the data shape, it is short. Iframely returns title, description, thumbnail, oEmbed-style media, and links. Microlink returns the same normalized fields plus image palettes, logos, and color metadata. For the iframe.ly/api/iframely endpoint, swap to api.microlink.io with the same url parameter and add an API key if you need higher\u00a0limits.',
    answer: (
      <>
        <div>
          For the data shape, it is short. Iframely returns title, description,
          thumbnail, oEmbed-style media, and links. Microlink returns the same
          normalized fields plus image palettes, logos, and color metadata. Most
          card components require a thin adapter and not a&nbsp;rewrite.
        </div>
        <div>
          For the iframe.ly/api/iframely endpoint, swap to{' '}
          <Link href='https://api.microlink.io'>api.microlink.io</Link> with the
          same <b>url</b> parameter and add a Microlink API key if you need
          higher limits. The{' '}
          <Link href='/docs/guides/embed'>embed&nbsp;guide</Link> walks through
          the full&nbsp;mapping.
        </div>
      </>
    )
  },
  {
    question: 'When does Iframely still make more sense than Microlink?',
    text: 'When your buying profile is editorial CMS work (WordPress, CKEditor, AMP, Shadow DOM widgets), Iframely’s out\u2011of\u2011the\u2011box integrations remove real work. Microlink does not ship those integrations as first\u2011class plugins. When you depend on a specific long-tail publisher that Iframely curates and Microlink does not yet cover, the catalog gap is a real reason to stay. And when you need a negotiated SLA, Iframely’s Custom tier offers one; its paid plans otherwise carry the same 99.9% uptime guarantee as Microlink’s\u00a0SLA.'
  },
  {
    question: 'Is Microlink open source?',
    text: 'The core is. Metascraper (metadata extraction), MQL (the query language), and Browserless (the headless browser layer) are all published on GitHub under the MIT license. The hosted API at microlink.io bundles those components with managed proxies, antibot tooling, edge caching, and a 99.9% SLA. Iframely also publishes its URL engine under the MIT license, with some parsers kept private to its cloud service; its open-source code stops at metadata and embeds, while Microlink’s includes the headless browser\u00a0layer.',
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
          99.9% SLA. Iframely also publishes its URL engine under the MIT
          license, with some parsers kept private to its cloud service; its
          open-source code stops at metadata and embeds, while Microlink’s
          includes the headless browser&nbsp;layer.
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
    iframely: `${IFRAMELY_FREE_HITS} hits/month, pilot\u00a0use`,
    note: `Iframely Starter includes more monthly volume, but it is listed for pilot projects on one brand and shows a “Powered by” icon on cards. Microlink’s free plan is ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, and allowed in\u00a0production.`
  },
  {
    feature: 'Billing\u00a0unit',
    microlink: 'One uncached\u00a0request',
    iframely: 'Hit: an hour of activity on one\u00a0URL',
    note: 'Iframely documents a hit as roughly 1 to 4 API calls or 5 to 15 iframe views. Microlink cache hits do not count against the\u00a0quota.'
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    iframely: `${RATE_LIMIT_PER_SECOND}\u00a0requests/second`,
    note: `Iframely caps all plans at ${RATE_LIMIT_PER_SECOND} requests/second by license; higher throughput is\u00a0custom\u2011only.`
  },
  {
    feature: 'Publisher\u2011specific embed\u00a0catalog',
    microlink: '300+ oEmbed\u00a0providers',
    iframely: '1,900+ publishers',
    note: 'Iframely maintains a deeper publisher catalog. Microlink covers the most common oEmbed providers plus universal Open Graph\u00a0fallback.'
  },
  {
    feature: 'oEmbed iframe and card\u00a0output',
    microlink: true,
    iframely: true
  },
  {
    feature: 'Custom HTTP headers and\u00a0cookies',
    microlink: true,
    iframely: false
  },
  { feature: 'Remote JS\u00a0execution', microlink: true, iframely: false },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    iframely: false,
    note: 'Every Microlink API key, free included, comes with a built\u2011in proxy layer that rotates automatically when a site blocks the\u00a0request.'
  },
  {
    feature: 'Proxy\u00a0geolocation',
    note: 'Microlink proxy.location takes any of 181 ISO country codes on every API key, free\u00a0included.',
    microlink: `${PROXY_COUNTRIES}\u00a0countries`,
    iframely: false
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    iframely: false,
    note: 'Cloudflare, DataDome, Akamai, PerimeterX, Kasada, Imperva, AWS WAF, reCAPTCHA, hCaptcha, Cloudflare Turnstile and more, handled inside the\u00a0API.'
  },
  { feature: 'Screenshot\u00a0capture', microlink: true, iframely: false },
  { feature: 'PDF\u00a0generation', microlink: true, iframely: false },
  { feature: 'Video output\u00a0(MP4)', microlink: true, iframely: false },
  { feature: 'Markdown\u00a0conversion', microlink: true, iframely: false },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    iframely: true,
    note: 'Iframely’s URL engine is MIT\u2011licensed on GitHub, with some parsers kept private to its cloud service. Microlink’s MIT stack also covers the headless browser\u00a0layer.'
  },
  {
    feature: `${CDN_EDGES} CDN edge\u00a0nodes`,
    microlink: true,
    iframely: 'CDN cache'
  },
  {
    feature: 'AMP / Shadow DOM / WordPress\u00a0plugin',
    microlink: false,
    iframely: true,
    note: 'Iframely ships explicit AMP, Shadow DOM, WordPress and CKEditor integrations out of the\u00a0box.'
  },
  {
    feature: 'Content IDs (permanent iframe\u00a0URLs)',
    microlink: false,
    iframely: 'Editorial plan and\u00a0up'
  },
  {
    feature: 'White\u2011label CDN\u00a0delivery',
    microlink: false,
    iframely: 'Enterprise plan',
    note: 'Iframely lists white\u2011label CDN delivery on the Enterprise\u00a0plan.'
  }
]

export const SAME_PRICE = MICROLINK_PLAN.price === COMPETITOR_PRICE

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'Cost you can forecast from URL\u00a0count',
    description: (
      <>
        Iframely bills in <b>hits</b>: roughly an hour of URL activity that can
        cover <b>1 to 4 API calls</b> or <b>5 to 15 iframe views</b> per their
        own docs. Microlink counts <b>one request per uncached call</b>, so a
        forecast starts from the number of URLs you&nbsp;fetch.
      </>
    )
  },
  {
    number: '02',
    title: `${VOLUME_MULTIPLIER}× more headroom for the same\u00a0price`,
    description: (
      <>
        Iframely Business is{' '}
        <b>
          ${COMPETITOR_PRICE}/month for {IFRAMELY_VOLUME} hits
        </b>
        . Microlink is{' '}
        <b>
          ${MICROLINK_PLAN.price}/month for {MICROLINK_VOLUME} requests
        </b>
        . On a per-request basis that is{' '}
        <b>${MICROLINK_PRICE_PER_1000} per 1,000</b> against Iframely’s{' '}
        <b>${IFRAMELY_PRICE_PER_1000_HITS} per 1,000 hits</b> on&nbsp;Business.
      </>
    )
  },
  {
    number: '03',
    title: `No ${RATE_LIMIT_PER_SECOND} requests/second ceiling on paid\u00a0plans`,
    description: (
      <>
        Iframely’s API license caps usage at{' '}
        <b>{RATE_LIMIT_PER_SECOND} requests per second across all plans</b> with
        custom arrangements required for more. Microlink has
        <b> no rate limit on paid plans</b>, so burst traffic does not need a
        separate&nbsp;contract.
      </>
    )
  },
  {
    number: '04',
    title: 'A built\u2011in web proxy on every API\u00a0key',
    description: (
      <>
        Iframely fetches cooperative publisher endpoints. The moment a target
        sits behind <b>Cloudflare</b>, <b>DataDome</b>, <b>Akamai</b>, or any of
        the 30+ antibot and CAPTCHA providers Microlink detects, Iframely
        documents no way&nbsp;through. Every Microlink API key, free included,
        folds three normally separate stacks (a <b>rotating proxy</b>,{' '}
        <b>antibot detection</b>, and <b>CAPTCHA handling</b>) into the same
        request&nbsp;price.
        <br />
        <br />
        <Link href='/features/proxy'>See how the proxy&nbsp;works</Link>.
      </>
    )
  },
  {
    number: '05',
    title: 'A free tier you can run in\u00a0production',
    description: (
      <>
        Iframely Starter includes <b>{IFRAMELY_FREE_HITS} hits/month</b>, more
        volume than Microlink’s free tier, but it is licensed for{' '}
        <b>pilot projects on one brand</b> and shows a “Powered by” icon on
        cards. Microlink’s free tier is{' '}
        <b>
          {FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit
          card
        </b>
        , with every Pro feature on the same edge network as paid plans, usable
        in production from day one for low&#8209;volume&nbsp;integrations.
      </>
    )
  },
  {
    number: '06',
    title: 'Open\u2011source core (MIT), down to the\u00a0browser',
    description: (
      <>
        Iframely publishes its URL engine under MIT, with some parsers kept
        private to its cloud. The components behind Microlink (
        <b>Metascraper</b>, <b>Browserless</b>, and <b>MQL</b>) are{' '}
        <b>MIT-licensed</b> too, and they cover the headless browser that
        renders screenshots, PDFs, and remote JS on top of
        metadata&nbsp;parsing.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Deeper publisher\u00a0catalog',
    description:
      'Iframely advertises 1,900+ supported publishers with proprietary rich\u2011media discovery on top of oEmbed. If your product depends on long\u2011tail publisher coverage (niche video hosts, regional media, less common social networks), Iframely has been investing in that catalog since 2012 and serves billions of requests per\u00a0month.'
  },
  {
    title: 'Editorial and CMS\u00a0integrations',
    description:
      'Iframely ships a WordPress plugin, CKEditor integration, AMP support, and a per\u2011URL options editor designed for editorial workflows. If your buyers are CMS publishers, those integrations save real\u00a0time.'
  },
  {
    title: 'White\u2011label CDN delivery on\u00a0Enterprise',
    description:
      'Iframely Enterprise lists white-label CDN delivery, and Editorial and above add Content IDs: permanent iframe URLs that keep embeds working even after the subscription ends. That can matter for media platforms that want embeds served from their own domain. Microlink does not currently offer either\u00a0capability.'
  },
  {
    title: 'A self-hosted embed\u00a0engine',
    description:
      'Iframely publishes the URL engine behind its cloud service on GitHub, in production since 2013, with oEmbed and Iframely-format endpoints you run on your own server. Some plugins stay cloud\u2011only. Microlink open\u2011sources its libraries, but the API itself is a managed\u00a0service.'
  }
]

export const META = {
  title: 'Iframely Alternative for a Developer-First Embed API',
  description: `Compare Microlink vs Iframely on pricing transparency and integration scope. For $${MICROLINK_PLAN.price}/month, Microlink gives you ${MICROLINK_VOLUME} requests against Iframely’s ${IFRAMELY_VOLUME} hits for $${COMPETITOR_PRICE}, no rate limit on paid plans, plus screenshots, PDF, and metadata from one API.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Iframely Alternative for a Developer-First Embed API |\u00a0Microlink',
    description: `Iframely bills in hits and caps all plans at ${RATE_LIMIT_PER_SECOND} requests/second. For $${MICROLINK_PLAN.price}/month, Microlink gives you ${MICROLINK_VOLUME} requests against Iframely’s ${IFRAMELY_VOLUME} hits for $${COMPETITOR_PRICE}, transparent per-request pricing, no rate limit on paid plans, plus screenshots, PDF, and metadata from one\u00a0API.`,
    url: 'https://microlink.io/alternative/iframely',
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
  caption: <>The usual reasons teams move from Iframely to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>Based on Iframely’s public docs, plans page, and API limits page.</>
  ),
  columns: ['Microlink', 'Iframely'],
  rows: COMPARISON_DATA,
  competitorKey: 'iframely',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>Iframely</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'Iframely is built for publishers and editors. These are the cases where that focus pays\u00a0off.',
  items: HONESTY_ITEMS
}
