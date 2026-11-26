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

const COMPETITOR_PRICE = 99
const COMPETITOR_CREDITS = 100000
const GROWTH_PRICE = 399
const COMPETITOR_CONCURRENCY = 25
const COMPETITOR_FREE_CREDITS = 1000
const LLM_FORMAT_SURCHARGE = 4
const LLM_FORMAT_CREDITS = 1 + LLM_FORMAT_SURCHARGE
const LLM_FORMAT_SHARE = 0.3
const DAYS_PER_MONTH = 30
const CHECKED_AT = '2026-11-18'

export const MICROLINK_CARD_FACTS = [
  'Markdown, metadata, logo, and screenshot from the same\u00a0call',
  'Built\u2011in proxy\u00a0included',
  'Cache hits\u00a0free'
]

export const MICROLINK_CARD_FOOTNOTE = 'The same price for every\u00a0request.'

export const FIRECRAWL_CARD_FACTS = [
  `1 per page, ${LLM_FORMAT_CREDITS} with a JSON, question, or highlights\u00a0format`,
  '+1 per PDF\u00a0page',
  '2 to 7 per browser\u2011minute of\u00a0interaction'
]

export const FIRECRAWL_CARD_FOOTNOTE =
  'Below Scale, unused credits expire\u00a0monthly.'

const MONTHLY_PAGES = DEFAULT_PLAN.reqsPerMonthTotal
const LLM_FORMAT_PAGES = Math.round(MONTHLY_PAGES * LLM_FORMAT_SHARE)
const BASIC_PAGES = MONTHLY_PAGES - LLM_FORMAT_PAGES
const MIXED_CREDITS = BASIC_PAGES + LLM_FORMAT_PAGES * LLM_FORMAT_CREDITS
const LLM_FORMAT_PERCENT = Math.round(LLM_FORMAT_SHARE * 100)
const FREE_REQUESTS_PER_MONTH = formatNumber(
  FREE_PLAN_REQUESTS_PER_DAY * DAYS_PER_MONTH
)
const PRICE_GAP = COMPETITOR_PRICE - MICROLINK_PLAN.price
const CREDIT_RATIO = (COMPETITOR_CREDITS / MONTHLY_PAGES).toFixed(1)
const LLM_FORMAT_ONLY_PAGES = COMPETITOR_CREDITS / LLM_FORMAT_CREDITS

export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)
export const FREE_CREDITS_LABEL = formatNumber(COMPETITOR_FREE_CREDITS)

const CREDIT_MATH = `If ${LLM_FORMAT_PERCENT}% of ${formatNumber(
  MONTHLY_PAGES
)} monthly pages ask for a JSON, question, or highlights format, that is ${formatNumber(
  BASIC_PAGES
)} + (${formatNumber(
  LLM_FORMAT_PAGES
)} × ${LLM_FORMAT_CREDITS}) = ${formatNumber(
  MIXED_CREDITS
)} credits, past the ${formatNumber(
  COMPETITOR_CREDITS
)}\u2011credit Standard plan and into the $${GROWTH_PRICE}\u00a0Growth\u00a0tier.`

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead='One request price.'
      highlight={'Same price for every\u00a0format.'}
    />
  ),
  caption: `Microlink bills requests: ${formatNumber(MONTHLY_PAGES)} for $${
    MICROLINK_PLAN.price
  }\u00a0per\u00a0month. Firecrawl\u00a0Standard bills credits: ${formatNumber(
    COMPETITOR_CREDITS
  )} for $${COMPETITOR_PRICE}\u00a0per\u00a0month, and the output format sets the credits per\u00a0page.`,
  microlink: {
    cta: 'alternative-firecrawl:pricing',
    secondaryHref: '/markdown',
    secondaryLabel: 'Explore the Markdown API',
    items: [
      'Markdown, metadata, logo, and screenshot in one request',
      'Adblock and cookie-banner removal on by default'
    ]
  },
  competitor: {
    name: 'Firecrawl Standard',
    price: COMPETITOR_PRICE,
    quota: COMPETITOR_CREDITS,
    unit: 'credits',
    items: [
      `Free plan: ${formatNumber(COMPETITOR_FREE_CREDITS)}\u00a0credits/month`,
      `${COMPETITOR_CONCURRENCY} concurrent requests on this\u00a0tier`,
      '1 credit per page, enhanced proxy\u00a0included',
      `JSON, question, and highlights formats: +${LLM_FORMAT_SURCHARGE}\u00a0credits per\u00a0page`,
      `${formatNumber(
        MONTHLY_PAGES
      )} pages, ${LLM_FORMAT_PERCENT}% as JSON: ${formatNumber(
        MIXED_CREDITS
      )}\u00a0credits, the\u00a0$${GROWTH_PRICE}\u00a0tier`,
      missing('Credits don’t roll over; 403 and 404 pages still\u00a0bill')
    ],
    source: 'https://www.firecrawl.dev/pricing',
    checkedAt: CHECKED_AT
  },
  note: `Firecrawl Standard costs $${PRICE_GAP} more per month for ${CREDIT_RATIO}× the credits. At ${LLM_FORMAT_CREDITS} credits per JSON page, those cover ${formatNumber(
    LLM_FORMAT_ONLY_PAGES
  )}\u00a0pages.`
}

export const CTA = {
  caption:
    'Markdown, metadata, and a screenshot for one request per URL, at one flat\u00a0price.',
  cta: 'alternative-firecrawl:footer-cta',
  links: [
    { href: '/markdown', label: 'Explore the Markdown API' },
    {
      href: '/docs/guides/content-conversion/url-to-markdown',
      label: 'Read the markdown guide'
    }
  ]
}

export const FAQ_CAPTION =
  'Credits, proxies, licenses, and migration, checked against Firecrawl’s public docs.'

export const FAQ_ITEMS = [
  {
    question: 'Is there a Firecrawl alternative with flat per-request pricing?',
    text: `Yes, Microlink charges one flat price per request, whatever the request does. Firecrawl bills in credits that multiply: a basic scrape is 1 credit, JSON, question, and highlights formats add ${LLM_FORMAT_SURCHARGE} per page, PDFs add 1 per PDF page, search costs 2 per 10 results, and browser interaction costs 2 to 7 per minute. On Microlink, routing through the built-in proxy, extracting metadata, or returning markdown never changes what a request costs. Cache hits are free on\u00a0top.`,
    answer: (
      <>
        <div>
          Yes, Microlink charges one flat price per request, whatever the
          request does. Firecrawl bills in credits that multiply: a basic scrape
          is 1 credit, JSON, question, and highlights formats add{' '}
          {LLM_FORMAT_SURCHARGE} per page, PDFs add 1 per PDF page, search costs
          2 per 10 results, and browser interaction costs 2 to 7
          per&nbsp;minute.
        </div>
        <div>
          On Microlink, routing through the{' '}
          <Link href='/features/proxy'>built&#8209;in&nbsp;proxy</Link>,
          extracting metadata, or returning markdown never changes what a
          request costs. Cache hits are free on&nbsp;top.
        </div>
      </>
    )
  },
  {
    question: 'Does Firecrawl’s enhanced proxy cost extra?',
    text: `No. Firecrawl’s docs bill an enhanced proxy request at the same 1 credit as a basic one, and an auto escalation from basic to enhanced is not charged twice. Credits still multiply with the output you ask for. ${CREDIT_MATH} Every Microlink API key, free included, has the built-in proxy routing and antibot detection at the flat request price, and no output format changes what a request\u00a0costs.`,
    answer: (
      <>
        <div>
          No. Firecrawl’s docs bill an enhanced proxy request at the same
          1&nbsp;credit as a basic one, and an <b>auto</b> escalation from basic
          to enhanced is not charged twice. Credits still multiply with the
          output you ask for. {CREDIT_MATH}
        </div>
        <div>
          Every Microlink API key, free included, has the built-in proxy routing
          and <Link href='/features/antibot'>antibot&nbsp;detection</Link> at
          the flat request price, and no output format changes what a
          request&nbsp;costs.
        </div>
      </>
    )
  },
  {
    question: 'Does Microlink return LLM-ready markdown like Firecrawl?',
    text: 'Yes. One GET request returns any URL as clean markdown. Because adblock ships enabled by default, ads, trackers, and cookie banners are stripped before conversion, so the markdown arrives free of consent noise. The token math matters for LLM workloads: a typical page that costs 20,000 HTML tokens becomes about 4,000 markdown tokens, roughly 80% fewer tokens per\u00a0page.',
    answer: (
      <>
        <div>
          Yes. One GET request returns any URL as clean markdown. See the{' '}
          <Link href='/docs/guides/content-conversion/url-to-markdown'>
            URL&nbsp;to&nbsp;markdown&nbsp;guide
          </Link>
          . Because <Link href='/docs/api/parameters/adblock'>adblock</Link>{' '}
          ships enabled by default, ads, trackers, and cookie banners are
          stripped before conversion, so the markdown arrives free of consent
          noise.
        </div>
        <div>
          The token math matters for LLM workloads: a typical page that costs
          20,000 HTML tokens becomes about 4,000 markdown tokens, roughly 80%
          fewer tokens per&nbsp;page.
        </div>
      </>
    )
  },
  {
    question: 'Can Microlink convert PDFs and office documents like Firecrawl?',
    text: 'Yes. Point the same request at a web page, a PDF, or a docx, xlsx, or pptx file. Microlink converts the document to an HTML DOM at fetch time, so the identical markdown request works across all of them. A YouTube URL even returns the video’s caption transcript as the markdown body. Firecrawl parses web\u2011hosted and local PDFs too; the difference is that on Microlink the document case needs no separate endpoint or parameter: it is the same GET\u00a0request.'
  },
  {
    question: 'What about crawling, search, and monitoring?',
    text: 'Crawling and monitoring are Firecrawl’s territory: Microlink converts one URL per call and does not watch pages for changes. You own the queue and the\u00a0diffing. Search is covered: Microlink Search returns normalized JSON for AI agents across 10 surfaces, where every result exposes a lazy .markdown() helper to expand top matches into LLM-ready\u00a0content.',
    answer: (
      <>
        <div>
          Crawling and monitoring are Firecrawl’s territory: Microlink converts
          one URL per call and does not watch pages for changes. You own the
          queue and the&nbsp;diffing.
        </div>
        <div>
          Search is covered: <Link href='/search'>Microlink&nbsp;Search</Link>{' '}
          returns normalized JSON for AI agents across 10 surfaces, where every
          result exposes a lazy <b>.markdown()</b> helper to expand top matches
          into LLM&#8209;ready&nbsp;content.
        </div>
      </>
    )
  },
  {
    question: 'How do the open-source licenses compare (MIT and AGPL)?',
    text: 'Both companies develop in the open, with different licenses. Firecrawl’s core is AGPL-3.0, a copyleft license that requires publishing your modifications if you serve the software to users. Microlink’s core libraries (Browserless, Metascraper, and MQL) are MIT-licensed: read, fork, embed, or self-host them with no copyleft\u00a0obligations.'
  },
  {
    question: 'How do I migrate from Firecrawl’s scrape endpoint to Microlink?',
    text: 'Swap the authenticated POST for a plain GET. Firecrawl’s formats: [markdown] becomes data.markdown.attr=markdown (add embed=markdown to receive raw markdown instead of JSON), and the metadata Firecrawl returns alongside the content is included in Microlink’s standard response by default. Screenshots, headers, and browser automation map to query parameters\u00a0too.',
    answer: (
      <>
        <div>
          Swap the authenticated POST for a plain GET. Firecrawl’s{' '}
          <b>formats: ["markdown"]</b> becomes{' '}
          <b>data.markdown.attr=markdown</b> (add <b>embed=markdown</b> to
          receive raw markdown instead of JSON), and the metadata Firecrawl
          returns alongside the content is included in Microlink’s standard
          response by&nbsp;default.
        </div>
        <div>
          Screenshots, headers, and browser automation map to query parameters
          too. Start from the{' '}
          <Link href='/docs/guides/content-conversion/url-to-markdown'>
            markdown&nbsp;guide
          </Link>{' '}
          and adapt one request at a&nbsp;time.
        </div>
      </>
    )
  },
  {
    question: 'How do the free tiers compare?',
    text: `Firecrawl’s free plan is ${formatNumber(
      COMPETITOR_FREE_CREDITS
    )} credits every month with 2 concurrent requests and no card. That is more monthly volume than Microlink’s free tier of ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, about ${FREE_REQUESTS_PER_MONTH} over a ${DAYS_PER_MONTH}-day month. Microlink’s free plan renews daily, needs no credit card, and includes every Pro feature, so one heavy test session never locks you out until the next billing cycle. The free API key takes a minute to get and the built-in proxy is included, so blocked pages work from the first\u00a0request.`
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

export const LIVE_MARKDOWN_ORIGIN = 'markdown.microlink.io'

export const LIVE_MARKDOWN_SUBDOMAIN = 'www.'

export const LIVE_MARKDOWN_DOMAIN = 'firecrawl.dev'

export const LIVE_MARKDOWN_TARGET = `${LIVE_MARKDOWN_SUBDOMAIN}${LIVE_MARKDOWN_DOMAIN}`

export const LIVE_MARKDOWN_URL = `https://${LIVE_MARKDOWN_ORIGIN}/${LIVE_MARKDOWN_TARGET}`

const COMPARISON_DATA = [
  {
    feature: 'Flat pricing (no credit\u00a0multipliers)',
    microlink: true,
    firecrawl: false,
    note: 'Firecrawl: JSON, question, and highlights formats +4 credits per page, PDFs +1 per PDF page, search 2 credits per 10 results, browser interaction 2 to 7 per\u00a0minute.'
  },
  {
    feature: 'Free tier that renews\u00a0daily',
    microlink: true,
    firecrawl: false,
    note: `Firecrawl’s free plan refills ${FREE_CREDITS_LABEL} credits once a month. Microlink’s free plan is ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit\u00a0card.`
  },
  {
    feature: 'Rate\u00a0limit',
    microlink: 'No rate limit on paid\u00a0plans',
    firecrawl: '5 to 100\u00a0concurrent',
    note: 'Firecrawl caps concurrency per plan: 2 Free, 5 Hobby, 25 Standard, 50 Growth, 100\u00a0Scale.'
  },
  {
    feature: 'URL to LLM\u2011ready\u00a0markdown',
    microlink: true,
    firecrawl: true
  },
  {
    feature: 'PDF parsing (PDF →\u00a0markdown)',
    microlink: true,
    firecrawl: true,
    note: 'Microlink also converts docx, xlsx, and pptx documents with the same\u00a0request.'
  },
  {
    feature: 'Structured data\u00a0extraction',
    microlink: true,
    firecrawl: true,
    note: 'Firecrawl uses AI prompts or JSON Schema; Microlink uses MQL CSS\u2011selector rules at the flat request\u00a0price.'
  },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    firecrawl: true,
    note: 'Firecrawl bills its enhanced proxy at the same 1 credit as a basic request; every Microlink API key, free included, has its built-in proxy at the flat request\u00a0price.'
  },
  {
    feature: 'Open\u2011source\u00a0license',
    microlink: 'MIT core',
    firecrawl: 'AGPL\u20113.0',
    note: 'Firecrawl is AGPL\u20113.0 (copyleft); Microlink components are\u00a0MIT\u2011licensed.'
  },
  {
    feature: 'Self\u2011hostable\u00a0platform',
    microlink: 'Partial',
    firecrawl: true,
    note: 'The MIT components (Browserless, Metascraper, MQL) can be self\u2011hosted; the hosted API is\u00a0managed.'
  },
  {
    feature: 'One\u2011line GET\u00a0endpoint',
    microlink: true,
    firecrawl: false,
    note: 'markdown.microlink.io/{url} returns the markdown of any\u00a0URL.'
  },
  {
    feature: 'PDF generation (URL →\u00a0PDF)',
    microlink: true,
    firecrawl: false
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
    firecrawl: false
  },
  { feature: 'Browser chrome\u00a0overlay', microlink: true, firecrawl: false },
  {
    feature: 'Animated capture\u00a0(MP4)',
    microlink: true,
    firecrawl: false
  },
  {
    feature: 'Direct embed (no\u00a0backend)',
    microlink: true,
    firecrawl: false
  },
  {
    feature: 'Multi\u2011page\u00a0crawling',
    microlink: false,
    firecrawl: true
  },
  { feature: 'Site\u00a0mapping', microlink: false, firecrawl: true },
  {
    feature: 'Change monitoring &\u00a0alerts',
    microlink: false,
    firecrawl: true
  },
  {
    feature: 'AI\u2011prompt extraction (natural\u00a0language)',
    microlink: false,
    firecrawl: true
  },
  { feature: 'Async jobs +\u00a0webhooks', microlink: false, firecrawl: true }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'Every request costs exactly one\u00a0request',
    description: (
      <>
        Firecrawl’s credit menu multiplies: JSON, question, and highlights
        formats add <b>4 credits per page</b>, PDFs add 1 per PDF page, search
        costs 2 per 10 results, and interaction 2 to 7 per browser&#8209;minute.
        A page that answers 403 or 404 <b>still bills a credit</b>, and below
        Scale unused credits expire monthly. On Microlink, a request is a
        request: one flat price, whatever it&nbsp;returns.
      </>
    )
  },
  {
    number: '02',
    title: 'One request per document, any page\u00a0count',
    description: (
      <>
        Firecrawl bills PDF parsing <b>per PDF page</b>, so a 40&#8209;page
        report costs at least 40 credits. On Microlink the same GET converts a
        PDF, docx, xlsx, or pptx for <b>one request</b>, with{' '}
        <Link href='/features/proxy'>automatically rotating&nbsp;proxies</Link>{' '}
        and <Link href='/features/antibot'>antibot&nbsp;detection</Link>{' '}
        included on every API&nbsp;key.
      </>
    )
  },
  {
    number: '03',
    title: 'A free tier that refills every\u00a0day',
    description: (
      <>
        Firecrawl’s free plan is <b>{FREE_CREDITS_LABEL} credits per month</b>,
        more monthly volume than Microlink’s, but once spent you wait for the
        next cycle. Microlink’s free plan is{' '}
        <b>{FREE_PLAN_REQUESTS_PER_DAY} requests/day</b>, renews daily, no
        credit card, with every Pro&nbsp;feature.
      </>
    )
  },
  {
    number: '04',
    title: 'Markdown from pages, PDFs, and office\u00a0files',
    description: (
      <>
        The same GET request converts a web page, a <b>PDF</b>, or a{' '}
        <b>docx, xlsx, or pptx</b> document into clean markdown (about{' '}
        <b>80% fewer tokens</b> than raw HTML) with{' '}
        <Link href='/docs/api/parameters/adblock'>adblock</Link> stripping ads,
        trackers, and cookie banners before conversion by&nbsp;default.
      </>
    )
  },
  {
    number: '05',
    title: 'Caching that pays you\u00a0back',
    description: (
      <>
        Microlink caches responses with a <b>TTL of up to 31 days</b> on every
        API key, and <b>cache hits don’t spend your quota</b>. Firecrawl credits
        work the other way around: below Scale they don’t roll over, so capacity
        you paid for disappears at the end of the&nbsp;month.
      </>
    )
  },
  {
    number: '06',
    title: 'MIT\u2011licensed core, no copyleft\u00a0strings',
    description: (
      <>
        Firecrawl’s core is <b>AGPL&#8209;3.0</b>, copyleft that requires
        publishing your modifications if you serve it to users. Microlink’s
        engine (Browserless, Metascraper, MQL) is <b>MIT-licensed</b>: embed it,
        fork it, or self&#8209;host it with no copyleft&nbsp;obligations.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Discovery and change\u00a0monitoring',
    description:
      'Firecrawl bundles search\u2011and\u2011scrape in one call, crawls whole sites, maps URL structures, and watches pages for changes with webhook, email, and Slack alerts. Microlink assumes you already know which URLs you need, and leaves scheduling and diffing to\u00a0you.'
  },
  {
    title: 'Natural\u2011language\u00a0extraction',
    description:
      'Firecrawl extracts structured data from a plain\u2011English prompt or a JSON Schema. Microlink MQL is CSS\u2011selector based: precise and deterministic, but you write the\u00a0selectors.'
  },
  {
    title: 'Self\u2011hosting the whole\u00a0platform',
    description:
      'Firecrawl is AGPL\u20113.0 and self\u2011hostable as a platform, though its cloud version adds features the open\u2011source build lacks. Microlink open\u2011sources its MIT core libraries, but the hosted API itself is a managed\u00a0service.'
  },
  {
    title: 'A large agent\u00a0ecosystem',
    description:
      'Official SDKs for Python, Node.js, Go, Java, Ruby, Rust, .NET, PHP, and Elixir, a first\u2011class CLI, and a widely adopted MCP server make Firecrawl a familiar default in AI tooling\u00a0stacks.'
  }
]

export const META = {
  title: 'Firecrawl Alternative: LLM-Ready Markdown, No Credit Math',
  description:
    'Firecrawl credits multiply: 5 per page for LLM formats, +1 per PDF page, spent even on error pages. Microlink converts URLs, PDFs, and docs into markdown, metadata, and screenshots at a flat per-request price, proxy included.'
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Firecrawl Alternative: LLM-Ready Markdown, No Credit\u00a0Math',
    description:
      'Compare Microlink and Firecrawl for LLM-ready web data. Microlink converts URLs, PDFs, and office documents into markdown, metadata, and screenshots at a flat per-request price, with the built-in proxy included and a free tier that renews daily.',
    url: 'https://microlink.io/alternative/firecrawl',
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
  caption: <>The usual reasons teams move from Firecrawl to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      Firecrawl facts come from its public docs and pricing page, and the last
      five rows are where it does&nbsp;more.
    </>
  ),
  columns: ['Microlink', 'Firecrawl'],
  rows: COMPARISON_DATA,
  competitorKey: 'firecrawl',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>Firecrawl</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'Firecrawl crawls, maps, and monitors whole sites. These are the jobs where that\u00a0wins.',
  items: HONESTY_ITEMS
}
