import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'
import {
  ProductComparison,
  ProductFaq,
  AlternativeHero,
  ProductPricing,
  ProductStrengths,
  ProductTimings,
  ProductTrademarks,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { CallToAction } from 'components/patterns/CallToAction'

import { Ownership } from 'components/pages/puppeteer/ownership'
import {
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
  TRADEMARKS
} from 'components/pages/puppeteer/shared'

const PuppeteerAlternativePage = () => (
  <Layout>
    <AlternativeHero {...HERO} />
    <Ownership />
    <ProductTimings {...TIMINGS} />
    <ProductPricing caption={PRICING_CAPTION} />
    <ProductComparison {...COMPARISON} competitorKey='puppeteer' />
    <ProductStrengths id='puppeteer-strengths' {...HONESTY} />
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

export default PuppeteerAlternativePage
