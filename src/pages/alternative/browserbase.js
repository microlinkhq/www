import React from 'react'

import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import {
  ProductComparison,
  ProductFaq,
  AlternativeHero,
  ProductPricing,
  ProductStrengths,
  productStructured,
  ProductTimings,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { CallToAction } from 'components/patterns/CallToAction'

import { Capabilities } from 'components/pages/browserbase/capabilities'
import { Paths } from 'components/pages/browserbase/paths'
import {
  COMPARISON,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  HERO,
  HONESTY,
  META,
  PRICING_CAPTION,
  TIMINGS
} from 'components/pages/browserbase/shared'

const REPOS = ['browserless', 'mcp', 'microlink']

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
    <AlternativeHero {...HERO} />
    <Capabilities />
    <Paths />
    <ProductTimings {...TIMINGS} />
    <ProductPricing caption={PRICING_CAPTION} />
    <ProductComparison {...COMPARISON} competitorKey='browserbase' />
    <ProductStrengths id='when-browserbase' {...HONESTY} />
    <OpenSource
      repos={REPOS}
      accent='gradient'
      caption='Microlink runs on open source. The rendering engine, the MCP server, and the function runtime are public. Read the code, contribute, or self-host instead of renting a browser.'
    />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
    <CallToAction id='cta' {...CTA} />
  </Layout>
)

export default BrowserbaseAlternativePage
