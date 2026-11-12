import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'
import {
  ProductComparison,
  ProductFaq,
  ProductHero,
  ProductPricing,
  ProductStrengths,
  ProductTimings,
  ProductTrademarks,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { CallToAction } from 'components/patterns/CallToAction'

import { Shapes } from 'components/pages/jina-reader/shapes'
import {
  ACCENT,
  ACCENT_NAME,
  COMPARISON,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  HERO,
  HONESTY,
  META,
  PRICING_CAPTION,
  STRUCTURED,
  TIMINGS,
  TIMINGS_ACCENT,
  TRADEMARKS
} from 'components/pages/jina-reader/shared'

const JinaReaderAlternativePage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <Shapes />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductPricing caption={PRICING_CAPTION} />
    <ProductComparison {...COMPARISON} competitorKey='jina' />
    <ProductStrengths
      id='jina-reader-strengths'
      accent={ACCENT_NAME}
      {...HONESTY}
    />
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

export default JinaReaderAlternativePage
