import React from 'react'
import { SECTION_VERTICAL_SPACING, theme } from 'theme'

import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import {
  ProductHero,
  ProductTimings,
  ProductCapabilities,
  ProductPricing,
  ProductCta,
  ProductFaq,
  Subhead,
  productStructured,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import {
  ACCENT,
  TILE_BG,
  TIMINGS_ACCENT,
  HERO,
  TIMINGS,
  CAPABILITIES,
  PRICING_CAPTION,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  META
} from 'components/pages/html/shared'

const FEATURES = [
  {
    title: 'Real Browser Rendering',
    description:
      'Every request runs in a real Chromium instance, so client-rendered apps return complete markup instead of an empty shell.'
  },
  {
    title: 'Selector Scoping',
    description:
      'Return the whole document or a single subtree. Smaller responses mean less parsing and lower token cost in whatever consumes them.'
  },
  {
    title: 'Readiness You Control',
    description:
      'waitUntil and waitFor let you block on network idle, a fixed delay, or the appearance of a specific element before the HTML is captured.'
  },
  {
    title: 'Residential Proxy Resolution',
    description:
      'Route hard targets through residential IPs to get past Cloudflare, DataDome and Akamai without maintaining a proxy pool yourself.'
  },
  {
    title: 'Antibot Transparency',
    description:
      'When a request is blocked you get told which of 30+ antibot and CAPTCHA providers blocked it, instead of a silent failure.'
  },
  {
    title: 'Edge Cached Responses',
    description:
      'Configurable TTL from 1 minute to 31 days. Cache hits are free, return instantly, and never boot a browser.'
  },
  {
    title: 'One Call, Many Formats',
    description:
      'Request HTML together with markdown, text, metadata, screenshots or PDFs and pay for a single render instead of several.'
  },
  {
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready infrastructure with a 99.9% uptime SLA and guaranteed performance for business-critical extraction workflows.'
  },
  {
    title: 'Generous Free Tier',
    description:
      'Start immediately with 25 requests/day. No setup fees, no credit card, and pay-as-you-grow pricing that scales with your usage.'
  }
]

const REPOS = ['browserless', 'html-get', 'html']

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/html',
      name: META.structuredName,
      description: META.structuredDescription,
      keywords: META.keywords,
      about: META.about,
      stars: getRepoStars(REPOS[0]),
      starsRepo: REPOS[0],
      faqItems: FAQ_ITEMS
    })}
  />
)

const HtmlPage = () => (
  <Layout>
    <ProductHero {...HERO} />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductCapabilities {...CAPABILITIES} accent={ACCENT} tileBg={TILE_BG} />
    <ProductPricing caption={PRICING_CAPTION} />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='The Microlink rendering engine is powered by battle-tested open source libraries used by thousands of developers worldwide. Our rendered HTML API is built on an open source foundation: explore the code, contribute, or run it yourself.'
    />
    <Features
      css={theme({ px: 4, py: SECTION_VERTICAL_SPACING })}
      title={
        <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
          The markup a browser sees,{' '}
          <span
            css={{
              display: 'block',
              color: ACCENT,
              width: '100%',
              textAlign: 'left'
            }}
          >
            without running one.
          </span>
        </Subhead>
      }
      caption={
        <>
          No Chromium fleet to patch, no proxy pool to rotate, no queue to
          babysit. Send a URL and get back the hydrated DOM, ready to parse via
          the <Link href='/docs/api/parameters/data'>data API</Link>.
        </>
      }
      features={FEATURES}
    />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
  </Layout>
)

export default HtmlPage
