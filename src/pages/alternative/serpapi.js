import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'
import {
  ProductComparison,
  ProductFaq,
  ProductPricing,
  ProductStrengths,
  ProductTrademarks,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { CallToAction } from 'components/patterns/CallToAction'

import { Hero } from 'components/pages/serpapi/hero'
import { Migration } from 'components/pages/serpapi/migration'
import { Throughput } from 'components/pages/serpapi/throughput'
import {
  ACCENT_NAME,
  COMPARISON,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  HONESTY,
  META,
  PRICING_CAPTION,
  PRICING_TITLE,
  STRUCTURED,
  TRADEMARKS
} from 'components/pages/serpapi/shared'

const SerpApiAlternativePage = () => (
  <Layout>
    <Hero />
    <Throughput />
    <ProductPricing title={PRICING_TITLE} caption={PRICING_CAPTION} />
    <ProductComparison {...COMPARISON} competitorKey='serpapi' />
    <ProductStrengths
      id='serpapi-strengths'
      accent={ACCENT_NAME}
      {...HONESTY}
    />
    <Migration />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
    <CallToAction id='cta' {...CTA} />
    <ProductTrademarks>{TRADEMARKS}</ProductTrademarks>
  </Layout>
)

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    schemaType='WebPage'
    structured={STRUCTURED}
  />
)

export default SerpApiAlternativePage
