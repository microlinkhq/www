import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'
import {
  ProductComparison,
  ProductCta,
  ProductFaq,
  ProductHero,
  ProductPricing,
  ProductTimings,
  toFaqQuestions
} from 'components/patterns/ProductStory'

import { Honesty } from 'components/pages/jina-reader/honesty'
import { Shapes } from 'components/pages/jina-reader/shapes'
import { Trademarks } from 'components/pages/jina-reader/trademarks'
import {
  ACCENT,
  COMPARISON,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  HERO,
  META,
  PRICING_CAPTION,
  STRUCTURED,
  TIMINGS,
  TIMINGS_ACCENT
} from 'components/pages/jina-reader/shared'

const JinaReaderAlternativePage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <Shapes />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductPricing caption={PRICING_CAPTION} />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductComparison {...COMPARISON} competitorKey='jina' />
    <Honesty />
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

export default JinaReaderAlternativePage
