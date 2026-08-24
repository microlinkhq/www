import React from 'react'

import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import {
  ProductHero,
  ProductPricing,
  ProductCta,
  ProductFaq,
  productStructured,
  toFaqQuestions
} from 'components/patterns/ProductStory'

import { Capabilities } from 'components/pages/browserbase/capabilities'
import { Comparison } from 'components/pages/browserbase/comparison'
import { Honesty } from 'components/pages/browserbase/honesty'
import {
  ACCENT,
  HERO,
  PRICING_CAPTION,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  META
} from 'components/pages/browserbase/shared'

const REPOS = ['browserless', 'mcp', 'function']

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/alternative/browserbase',
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

const BrowserbaseAlternativePage = () => (
  <Layout>
    <ProductHero {...HERO} />
    <Capabilities />
    <Comparison />
    <Honesty />
    <ProductPricing caption={PRICING_CAPTION} />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='Microlink runs on open source. The rendering engine, the MCP server, and the function runtime are public — read the code, contribute, or self-host instead of renting a browser.'
    />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
  </Layout>
)

export default BrowserbaseAlternativePage
