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
import { TextCapabilitiesVisual } from 'components/pages/text/capabilities-visual'
import {
  ACCENT,
  TIMINGS_ACCENT,
  HERO,
  TIMINGS,
  CAPABILITIES,
  PRICING_CAPTION,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  META
} from 'components/pages/text/shared'

const FEATURES = [
  {
    title: 'Boilerplate Stripped',
    description:
      'Navigation, sidebars, consent banners, ads and footers are removed so the response carries only the content of the page.'
  },
  {
    title: 'JavaScript Rendered First',
    description:
      'Text is extracted after the page hydrates, so client-rendered blogs, docs and single-page apps return their real content.'
  },
  {
    title: 'Built For LLM Pipelines',
    description:
      'Plain text is a fraction of the size of source HTML, cutting the cost and latency of every embedding, classification and summarisation call.'
  },
  {
    title: 'Documents Supported',
    description:
      'PDFs, Word files, spreadsheets and slide decks resolve to text through the same endpoint, so one integration covers pages and documents.'
  },
  {
    title: 'Structure On Demand',
    description:
      'Request markdown alongside text when headings, lists and links matter, and pay for a single render instead of two.'
  },
  {
    title: 'Residential Proxy Resolution',
    description:
      'Route hard targets through residential IPs to get past Cloudflare, DataDome and Akamai without maintaining a proxy pool yourself.'
  },
  {
    title: 'Edge Cached Responses',
    description:
      'Configurable TTL from 1 minute to 31 days. Cache hits are free, return instantly, and never boot a browser.'
  },
  {
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready infrastructure with a 99.9% uptime SLA and guaranteed performance for business-critical content pipelines.'
  },
  {
    title: 'Generous Free Tier',
    description:
      'Start immediately with 25 requests/day. No setup fees, no credit card, and pay-as-you-grow pricing that scales with your usage.'
  }
]

const REPOS = ['html-get', 'metascraper', 'browserless']

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/text',
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

const TextPage = () => (
  <Layout>
    <ProductHero {...HERO} />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductCapabilities
      {...CAPABILITIES}
      accent={ACCENT}
      visual={<TextCapabilitiesVisual />}
    />
    <ProductPricing caption={PRICING_CAPTION} />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='The Microlink content pipeline is powered by battle-tested open source libraries used by thousands of developers worldwide. Our readable text API is built on an open source foundation: explore the code, contribute, or run it yourself.'
    />
    <Features
      css={theme({ px: 4, py: SECTION_VERTICAL_SPACING })}
      title={
        <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
          Every page, reduced to{' '}
          <span
            css={{
              display: 'block',
              color: ACCENT,
              width: '100%',
              textAlign: 'left'
            }}
          >
            the words that matter.
          </span>
        </Subhead>
      }
      caption={
        <>
          Stop paying model tokens to read navigation bars. Send a URL and get
          back clean prose, ready to embed or prompt with, via the{' '}
          <Link href='/docs/api/parameters/data'>data API</Link>.
        </>
      }
      features={FEATURES}
    />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
  </Layout>
)

export default TextPage
