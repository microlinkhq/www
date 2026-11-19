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

export const COMPETITOR_PRICE = 199
const COMPETITOR_VOLUME = 50000
const COMPETITOR_OVERAGE = 0.004
const THOUSAND = 1000
const CENTS = 100
const COMPETITOR_WORKERS = 35
const ENTRY_PRICE = 29
const ENTRY_VOLUME = 5000
const MICROLINK_VOLUME = DEFAULT_PLAN.reqsPerMonthTotal

export const PRICE_SAVINGS_PCT = Math.floor(
  ((COMPETITOR_PRICE - MICROLINK_PLAN.price) / COMPETITOR_PRICE) * 100
)
const pricePerThousand = (price, volume) => ((price / volume) * 1000).toFixed(2)
const MICROLINK_PRICE_PER_1000 = pricePerThousand(
  MICROLINK_PLAN.price,
  MICROLINK_VOLUME
)
const COMPETITOR_PRICE_PER_1000 = pricePerThousand(
  COMPETITOR_PRICE,
  COMPETITOR_VOLUME
)

const CHECKED_AT = '2026-11-18'
export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

const EXTRA_MONTHLY_COST_LABEL = formatPrice(
  COMPETITOR_PRICE - MICROLINK_PLAN.price
)
const EXTRA_SCREENSHOTS_LABEL = formatNumber(
  COMPETITOR_VOLUME - MICROLINK_VOLUME
)

const OVERAGE_LABEL = `${formatPrice(
  Math.round(COMPETITOR_OVERAGE * THOUSAND * CENTS) / CENTS
)} per ${formatNumber(THOUSAND)} extra\u00a0screenshots`

export const MICROLINK_OFFER = `${formatNumber(
  MICROLINK_VOLUME
)} requests for $${MICROLINK_PLAN.price}`
export const COMPETITOR_VOLUME_LABEL = formatNumber(COMPETITOR_VOLUME)
export const COMPETITOR_OFFER = `${COMPETITOR_VOLUME_LABEL} screenshots for $${COMPETITOR_PRICE}`

export const PRICE_COMPARISON = {
  title: (
    <AlternativePricingTitle
      lead={'Almost the same\u00a0volume.'}
      highlight={'Much lower\u00a0spend.'}
    />
  ),
  caption: `Microlink bills requests: ${formatNumber(MICROLINK_VOLUME)} for $${
    MICROLINK_PLAN.price
  }\u00a0per\u00a0month. URL2PNG\u00a0Killinit bills screenshots: ${COMPETITOR_VOLUME_LABEL} for $${COMPETITOR_PRICE}\u00a0per\u00a0month.`,
  microlink: {
    cta: 'alternative-url2png:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: ['Screenshots, PDF, metadata, previews, and remote\u00a0JS']
  },
  competitor: {
    name: 'URL2PNG Killinit',
    price: COMPETITOR_PRICE,
    quota: COMPETITOR_VOLUME,
    unit: 'screenshots',
    items: [
      missing('No free plan'),
      OVERAGE_LABEL,
      `${COMPETITOR_WORKERS} dedicated workers, cached hits don\u2019t count toward\u00a0quota`,
      'Fastly CDN and SSL endpoint',
      'Full\u2011page screenshots and custom CSS\u00a0injection'
    ],
    source: 'https://www.url2png.com/plans',
    checkedAt: CHECKED_AT
  },
  note: `Killinit costs ${EXTRA_MONTHLY_COST_LABEL} more per month for ${EXTRA_SCREENSHOTS_LABEL} more screenshots. For light use, URL2PNG Bootstrapped is ${formatPrice(
    ENTRY_PRICE
  )} per month for ${formatNumber(ENTRY_VOLUME)}\u00a0screenshots.`
}

export const CTA = {
  caption:
    'Replace legacy screenshot plumbing. Start with screenshots, then add metadata, previews, PDF output, or remote browser logic when your workflow needs them.',
  cta: 'alternative-url2png:footer-cta',
  links: [
    { href: '/screenshot', label: 'Explore the Screenshot API' },
    { href: '/docs/guides/screenshot', label: 'Read the screenshot guide' }
  ]
}

export const FAQ_CAPTION =
  'Pricing, free access, signed URLs and when URL2PNG is still the simpler pick.'

export const FAQ_ITEMS = [
  {
    question: 'Why is there no live URL2PNG benchmark on this page?',
    text: 'We did not publish a benchmark because URL2PNG’s public signup page resolved back to the plans view during review, and the public site did not expose a normal self-serve evaluation flow for provisioning a new test account. Since the docs say the API key is assigned during signup, we limited this page to verified docs and\u00a0pricing.',
    answer: (
      <>
        <div>
          We did not publish a benchmark because URL2PNG’s public{' '}
          <Link href='https://www.url2png.com/signup' rel='nofollow'>
            signup page
          </Link>{' '}
          resolved back to the plans view during review, and the public site did
          not expose a normal self-serve evaluation flow for provisioning a new
          test&nbsp;account.
        </div>
        <div>
          Since the{' '}
          <Link href='https://www.url2png.com/docs' rel='nofollow'>
            docs
          </Link>{' '}
          say the API key is assigned during signup, we limited this page to
          verified docs and pricing. If their public signup flow reopens, this
          page can be benchmarked&nbsp;later.
        </div>
      </>
    )
  },
  {
    question:
      'What does Microlink cover that URL2PNG’s public docs do not mention?',
    text: 'Microlink goes well beyond screenshot capture. One integration also gives you PDF generation, metadata extraction, link previews, remote JavaScript execution, browser chrome overlays, and built-in tooling for blocked pages. URL2PNG’s public docs focus on screenshot parameters like viewport, fullpage, custom CSS, delay, user agent, language override, TTL, and cache-busting, which is a much narrower API\u00a0surface.',
    answer: (
      <>
        <div>
          Microlink goes well beyond screenshot capture. One integration also
          gives you PDF generation, metadata extraction, link previews, remote
          JavaScript execution, browser chrome overlays, and built-in tooling
          for blocked&nbsp;pages.
        </div>
        <div>
          URL2PNG’s public docs focus on screenshot parameters like viewport,
          fullpage, custom CSS, delay, user agent, language override, TTL, and
          cache-busting. That is fine for screenshot-only workloads, but it is a
          much narrower API&nbsp;surface.
        </div>
      </>
    )
  },
  {
    question: `How different is the pricing once you get close to ${formatNumber(
      COMPETITOR_VOLUME
    )} screenshots?`,
    text: `URL2PNG’s Killinit plan is $${COMPETITOR_PRICE} per month for ${formatNumber(
      COMPETITOR_VOLUME
    )} freshly generated screenshots. Microlink Pro is $${
      MICROLINK_PLAN.price
    } per month for ${formatNumber(
      MICROLINK_VOLUME
    )} requests. That gets you almost the same monthly volume for ${PRICE_SAVINGS_PCT}% less spend. Per 1,000 requests, Microlink lands at $${MICROLINK_PRICE_PER_1000} against $${COMPETITOR_PRICE_PER_1000} on the URL2PNG\u00a0plan.`,
    answer: (
      <>
        <div>
          URL2PNG’s Killinit plan is <b>${COMPETITOR_PRICE}/month</b> for{' '}
          <b>{formatNumber(COMPETITOR_VOLUME)} freshly generated screenshots</b>
          . Microlink Pro is <b>${MICROLINK_PLAN.price}/month</b> for{' '}
          <b>{formatNumber(MICROLINK_VOLUME)}&nbsp;requests</b>.
        </div>
        <div>
          That means Microlink gets you almost the same monthly volume for{' '}
          <b>{PRICE_SAVINGS_PCT}% less spend</b>. Per 1,000 requests, Microlink
          lands at <b>${MICROLINK_PRICE_PER_1000}</b> against{' '}
          <b>${COMPETITOR_PRICE_PER_1000}</b> on the URL2PNG&nbsp;plan.
        </div>
      </>
    )
  },
  {
    question: 'Can I evaluate Microlink without paying first?',
    text: `Yes. Microlink gives you ${FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit card, with every Pro feature. URL2PNG’s plans page says it does not offer free accounts, so Microlink is much easier to evaluate\u00a0gradually.`,
    answer: (
      <>
        <div>
          Yes. Microlink gives you{' '}
          <b>{FREE_PLAN_REQUESTS_PER_DAY} requests/day</b>, renews daily, no
          credit card, with every Pro feature. You can test the same screenshot
          API surface before moving to a paid&nbsp;plan.
        </div>
        <div>
          URL2PNG’s{' '}
          <Link href='https://www.url2png.com/plans' rel='nofollow'>
            plans page
          </Link>{' '}
          says it does not offer free accounts, so Microlink is much easier to
          evaluate&nbsp;gradually.
        </div>
      </>
    )
  },
  {
    question: 'How hard is it to move from URL2PNG signed URLs to Microlink?',
    text: 'URL2PNG already uses a signed request model with a URL target plus query params like viewport, fullpage, delay, and custom_css_url. Microlink supports the same high-level capture concepts, even if the parameter names differ. In practice, migrations are mostly endpoint-and-parameter mapping\u00a0work.',
    answer: (
      <>
        <div>
          URL2PNG already uses a signed request model with a URL target plus
          query params like <i>viewport</i>, <i>fullpage</i>, <i>delay</i>, and{' '}
          <i>custom_css_url</i>. Microlink supports the same high-level capture
          concepts, even if the parameter names&nbsp;differ.
        </div>
        <div>
          In practice, migrations are mostly endpoint-and-parameter mapping
          work. Start from the{' '}
          <Link href='/docs/guides/screenshot'>screenshot&nbsp;guide</Link> and
          adapt your existing request builder around the new query&nbsp;shape.
        </div>
      </>
    )
  },
  {
    question: 'Does URL2PNG document cookies or arbitrary request headers?',
    text: 'Not in the public material we reviewed. The docs explicitly mention user_agent and accept_languages, which gives you some header control, but we did not find documented cookie injection or arbitrary custom header support on the public docs pages. Microlink supports custom cookies and arbitrary request\u00a0headers.',
    answer: (
      <>
        <div>
          Not in the public material we reviewed. The docs explicitly mention{' '}
          <i>user_agent</i> and <i>accept_languages</i>, which gives you some
          header control, but we did not find documented cookie injection or
          arbitrary custom header support on the public docs&nbsp;pages.
        </div>
        <div>
          Microlink supports custom cookies and arbitrary request headers, which
          matters once you need authenticated captures, localization tests, or
          more realistic browser&nbsp;state.
        </div>
      </>
    )
  },
  {
    question: 'When is URL2PNG still a reasonable choice?',
    text: 'URL2PNG still looks reasonable when your workload is strictly screenshot-first and you value a very simple signed image URL model, long cache TTLs, hotlink-friendly delivery, and dedicated worker plans. Its public site also emphasizes no queued images, Fastly CDN delivery, and high-fidelity rendering for canvas, webfonts, CSS3, SVG, and video\u00a0pages.',
    answer: (
      <>
        <div>
          URL2PNG still looks reasonable when your workload is strictly
          screenshot-first and you value a very simple signed image URL model,
          long cache TTLs, hotlink-friendly delivery, and dedicated worker
          plans.
        </div>
        <div>
          Its public site also emphasizes no queued images, Fastly CDN delivery,
          and high-fidelity rendering for canvas, webfonts, CSS3, SVG, and video
          pages. If those basics are enough, a broader browser platform may be
          unnecessary.
        </div>
      </>
    )
  },
  {
    question:
      'Can Microlink replace screenshot plus metadata and preview tooling with one API?',
    text: 'Yes. Microlink can return screenshots, generate PDFs, extract metadata, power link previews through SDKs, and execute browser-side JavaScript from the same platform. URL2PNG is centered on screenshot delivery, so Microlink covers those jobs with the same API key once your workflow\u00a0expands.',
    answer: (
      <>
        <div>
          Yes. Microlink can return screenshots, generate PDFs, extract
          metadata, power link previews through SDKs, and execute browser-side
          JavaScript from the same&nbsp;platform.
        </div>
        <div>
          URL2PNG is centered on screenshot delivery. If your screenshot
          pipeline keeps expanding into product previews, metadata, or browser
          automation, Microlink covers those jobs with the same API&nbsp;key.
        </div>
      </>
    )
  }
]

export const FAQ_STRUCTURED = faqPageStructured(FAQ_ITEMS)

export const UNAVATAR_SCREENSHOT_URL =
  'https://api.microlink.io?url=https%3A%2F%2Funavatar.io&screenshot&embed=screenshot.url'

export const UNAVATAR_SCREENSHOT_LABEL = 'api.microlink.io?url=unavatar.io'

export const UNAVATAR_SCREENSHOT_FLAGS = '&screenshot&embed=screenshot.url'

export const MICROLINK_CURL = `curl -G https://api.microlink.io \\
  -d url=https://unavatar.io \\
  -d screenshot \\
  -d pdf`

const COMPARISON_DATA = [
  {
    feature: 'Free\u00a0plan',
    microlink: `${FREE_PLAN_REQUESTS_PER_DAY}/day, renews\u00a0daily`,
    url2png: false
  },
  {
    feature: 'Element\u2011level capture (CSS\u00a0selector)',
    microlink: true,
    url2png: false
  },
  {
    feature: 'PDF\u00a0generation',
    microlink: true,
    url2png: false
  },
  {
    feature: 'Metadata\u00a0extraction',
    microlink: true,
    url2png: false
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
    url2png: false
  },
  {
    feature: 'Custom\u00a0cookies',
    microlink: true,
    url2png: false
  },
  {
    feature: 'Arbitrary custom HTTP\u00a0headers',
    microlink: true,
    url2png: 'Partial',
    note: 'Public docs mention user_agent and accept_languages overrides\u00a0only.'
  },
  {
    feature: 'Click/scroll\u00a0interactions',
    microlink: true,
    url2png: false
  },
  {
    feature: 'Wait for\u00a0selector',
    microlink: true,
    url2png: 'Partial',
    note: 'URL2PNG waits only for a fixed url2png\u2011cheese element that the target page has to\u00a0add.'
  },
  {
    feature: 'Ad\u00a0blocking',
    microlink: true,
    url2png: false
  },
  {
    feature: 'Built\u2011in rotating\u00a0proxy',
    microlink: true,
    url2png: false
  },
  {
    feature: 'Antibot and CAPTCHA (30+\u00a0providers)',
    microlink: true,
    url2png: false
  },
  {
    feature: 'Remote JS execution (return\u00a0values)',
    microlink: true,
    url2png: false
  },
  {
    feature: 'Browser chrome\u00a0overlay',
    microlink: true,
    url2png: false
  },
  {
    feature: 'Open\u2011source core\u00a0(MIT)',
    microlink: true,
    url2png: false
  }
]

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'Screenshots plus PDF, metadata, and\u00a0previews',
    description: (
      <>
        URL2PNG’s public docs revolve around screenshot controls like viewport,
        fullpage, TTL, custom CSS, delay, language, and user agent. Microlink
        adds{' '}
        <b>PDF, metadata, previews, remote JS, and richer browser control</b>{' '}
        from the same&nbsp;integration.
      </>
    )
  },
  {
    number: '02',
    title: `${formatNumber(
      MICROLINK_VOLUME
    )} monthly requests without a $${COMPETITOR_PRICE}\u00a0bill`,
    description: (
      <>
        URL2PNG prices <b>{COMPETITOR_OFFER}/month</b>. Microlink gives you{' '}
        <b>{MICROLINK_OFFER}/month</b>. That is almost the same volume for
        <b>{PRICE_SAVINGS_PCT}% less&nbsp;spend</b>.
      </>
    )
  },
  {
    number: '03',
    title: 'A free plan to evaluate\u00a0on',
    description: (
      <>
        URL2PNG’s plans page says there are <b>no free accounts</b>. Microlink
        gives you{' '}
        <b>
          {FREE_PLAN_REQUESTS_PER_DAY} requests/day, renews daily, no credit
          card
        </b>
        , with every Pro feature, so you can test real traffic patterns
        before&nbsp;paying.
      </>
    )
  },
  {
    number: '04',
    title: 'More browser control when pages stop being\u00a0simple',
    description: (
      <>
        Microlink supports{' '}
        <b>
          custom cookies, arbitrary headers, click/scroll interactions, selector
          waits, and ad blocking
        </b>
        . URL2PNG’s public docs document a much narrower control surface
        centered on the screenshot&nbsp;itself.
      </>
    )
  },
  {
    number: '05',
    title: 'Built for harder\u00a0targets',
    description: (
      <>
        Microlink includes <b>built-in proxying</b> and{' '}
        <b>detection for 30+ antibot and CAPTCHA providers</b>. URL2PNG’s public
        material does not document built&#8209;in proxying or
        blocked&#8209;page&nbsp;tooling.
      </>
    )
  },
  {
    number: '06',
    title: 'One platform for product, embeds, and\u00a0previews',
    description: (
      <>
        Microlink can power screenshots, metadata, link previews, and
        presentation&#8209;ready browser overlays from one API. That is a better
        fit when screenshot capture is only{' '}
        <b>one part of a bigger&nbsp;workflow</b>.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Simple signed image\u00a0URLs',
    description:
      'One signed URL returns one image. The whole integration is a URL you build on your\u00a0server.'
  },
  {
    title: 'Cache TTL and freshness\u00a0controls',
    description:
      'Captures are cached for 30 days by default, and a unique parameter forces a fresh one. The image cache comes built\u00a0in.'
  },
  {
    title: 'Screenshot\u2011first rendering\u00a0focus',
    description:
      'The homepage calls out rendering for graphs, canvas, webfonts, CSS3, SVG, and video pages, all aimed at turning pages into\u00a0images.'
  },
  {
    title: 'Fastly CDN, hotlinking, and no queued\u00a0images',
    description:
      'Captures are served from Fastly, hotlinking is encouraged, and URL2PNG says no image waits in a queue. The image URL goes straight into an app or\u00a0CMS.'
  },
  {
    title: 'Dedicated worker\u00a0plans',
    description:
      'Bootstrapped includes 10 dedicated workers and Killinit includes 35. Higher tiers add customization\u00a0services.'
  },
  {
    title: 'Lower paid entry point for basic\u00a0usage',
    description: `URL2PNG Bootstrapped is ${formatPrice(
      ENTRY_PRICE
    )}/month for ${formatNumber(
      ENTRY_VOLUME
    )} screenshots. Microlink Pro starts at $${
      MICROLINK_PLAN.price
    }/month for ${formatNumber(MICROLINK_VOLUME)}\u00a0requests.`
  }
]

export const META = {
  title: 'URL2PNG Alternative for a More Modern Screenshot API',
  description: `URL2PNG still covers simple screenshots, but Microlink gives you a free plan or ${MICROLINK_OFFER} against URL2PNG’s ${COMPETITOR_VOLUME_LABEL} for $${COMPETITOR_PRICE}.`
}

export const STRUCTURED = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'URL2PNG Alternative for a More Modern Screenshot API |\u00a0Microlink',
    description: `Compare Microlink and URL2PNG on documented browser capabilities and pricing. Microlink adds PDF, metadata, previews, and harder-page tooling while giving you ${MICROLINK_OFFER} against URL2PNG’s\u00a0${COMPETITOR_OFFER}.`,
    url: 'https://microlink.io/alternative/url2png',
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
  caption: <>The usual reasons teams move from URL2PNG to Microlink.</>,
  items: WHY_SWITCH_ITEMS
}

export const COMPARISON = {
  caption: (
    <>
      Every URL2PNG cell comes from its public docs, homepage, plans and
      signup&nbsp;flow.
    </>
  ),
  columns: ['Microlink', 'URL2PNG'],
  rows: COMPARISON_DATA,
  competitorKey: 'url2png',
  lastVerified: LAST_VERIFIED
}

export const HONESTY = {
  title: (
    <>
      When <GradientText>URL2PNG</GradientText> is the better&nbsp;pick.
    </>
  ),
  caption:
    'URL2PNG wins on signed image URLs, cache controls, rendering focus, CDN delivery, dedicated workers and entry\u00a0price.',
  items: HONESTY_ITEMS
}
