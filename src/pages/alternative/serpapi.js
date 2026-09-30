import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'
import {
  ProductComparison,
  ProductCta,
  ProductFaq,
  ProductPricing,
  toFaqQuestions
} from 'components/patterns/ProductStory'

import { Hero } from 'components/pages/serpapi/hero'
import { Honesty } from 'components/pages/serpapi/honesty'
import { Migration } from 'components/pages/serpapi/migration'
import { Throughput } from 'components/pages/serpapi/throughput'
import { Trademarks } from 'components/pages/serpapi/trademarks'
import {
  ACCENT,
  COMPARISON,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  META,
  PRICING_CAPTION,
  STRUCTURED
} from 'components/pages/serpapi/shared'

const SerpApiAlternativePage = () => (
  <Layout>
    <Hero />
    <Throughput />
    <ProductPricing caption={PRICING_CAPTION} />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductComparison {...COMPARISON} competitorKey='serpapi' />
    <Honesty />
    <Migration />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
    <Trademarks />
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
