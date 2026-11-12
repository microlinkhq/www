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
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { CallToAction } from 'components/patterns/CallToAction'

import { Billing } from 'components/pages/scrapingbee/billing'
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
  TIMINGS_ACCENT
} from 'components/pages/scrapingbee/shared'

const ScrapingBeeAlternativePage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <Billing />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductPricing caption={PRICING_CAPTION} />
    <ProductComparison {...COMPARISON} competitorKey='scrapingbee' />
    <ProductStrengths
      id='scrapingbee-strengths'
      accent={ACCENT_NAME}
      {...HONESTY}
    />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
    <CallToAction id='cta' {...CTA} />
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
