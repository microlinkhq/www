import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'
import {
  ProductHero,
  ProductTimings,
  ProductPricing,
  ProductCta,
  ProductFaq,
  toFaqQuestions
} from 'components/patterns/ProductStory'

import { Billing } from 'components/pages/scrapingbee/billing'
import { Comparison } from 'components/pages/scrapingbee/comparison'
import { Honesty } from 'components/pages/scrapingbee/honesty'
import {
  ACCENT,
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
    <Comparison />
    <Billing />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <Honesty />
    <ProductPricing caption={PRICING_CAPTION} />
    <ProductCta {...CTA} accent={ACCENT} />
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
