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

import { Migration } from 'components/pages/clearbit/migration'
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
} from 'components/pages/clearbit/shared'

const ClearbitAlternativePage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <Migration />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductPricing caption={PRICING_CAPTION} />
    <ProductComparison {...COMPARISON} competitorKey='logodev' />
    <ProductStrengths
      id='logo-cdn-strengths'
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

export default ClearbitAlternativePage
