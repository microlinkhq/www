import React from 'react'
import Layout from 'components/patterns/Layout'
import {
  ProductPriceComparison,
  ProductFaq,
  AlternativeWhySwitch,
  AlternativeComparison,
  ProductStrengths
} from 'components/patterns/ProductStory'
import { AlternativeSpeed } from 'components/patterns/ProductStory/alternative-speed'
import { CallToAction } from 'components/patterns/CallToAction'
import Meta from 'components/elements/Meta/Meta'
import { Hero } from 'components/pages/screenshotapi/hero'
import {
  BENCHMARK_DATA,
  COMPARISON,
  CTA,
  FAQ_CAPTION,
  FAQ_QUESTIONS,
  HONESTY,
  META,
  PRICE_COMPARISON,
  SPEED,
  STRUCTURED,
  WHY_SWITCH
} from 'components/pages/screenshotapi/shared'

const ScreenshotAPIPage = () => (
  <Layout>
    <Hero />
    <AlternativeSpeed benchmark={BENCHMARK_DATA} speed={SPEED} />
    <AlternativeWhySwitch {...WHY_SWITCH} />
    <ProductPriceComparison {...PRICE_COMPARISON} />
    <AlternativeComparison {...COMPARISON} />
    <ProductStrengths id='screenshotapi-strengths' {...HONESTY} />
    <ProductFaq caption={FAQ_CAPTION} questions={FAQ_QUESTIONS} />
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

export default ScreenshotAPIPage
