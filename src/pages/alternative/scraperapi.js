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

import { Credits } from 'components/pages/scraperapi/credits'
import { Honesty } from 'components/pages/scraperapi/honesty'
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
} from 'components/pages/scraperapi/shared'

const ScraperApiAlternativePage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <Credits />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductPricing caption={PRICING_CAPTION} />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductComparison {...COMPARISON} competitorKey='scraperapi' />
    <Honesty />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
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

export default ScraperApiAlternativePage
