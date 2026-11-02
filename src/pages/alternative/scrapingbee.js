import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'
import {
  ProductHero,
  ProductTimings,
  ProductPricing,
  ProductComparison,
  ProductFaq,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { CallToAction } from 'components/patterns/CallToAction'

import { Billing } from 'components/pages/scrapingbee/billing'
import { Honesty } from 'components/pages/scrapingbee/honesty'
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
} from 'components/pages/scrapingbee/shared'

const ScrapingBeeAlternativePage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <Billing />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductPricing caption={PRICING_CAPTION} />
    <CallToAction id='cta' {...CTA} />
    <ProductComparison {...COMPARISON} competitorKey='scrapingbee' />
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

export default ScrapingBeeAlternativePage
