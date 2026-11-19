import React from 'react'
import Layout from 'components/patterns/Layout'
import {
  ProductPriceComparison,
  ProductFaq,
  toFaqQuestions,
  AlternativeWhySwitch,
  AlternativeComparison,
  ProductStrengths
} from 'components/patterns/ProductStory'
import { CallToAction } from 'components/patterns/CallToAction'
import Meta from 'components/elements/Meta/Meta'
import { Hero } from 'components/pages/firecrawl/hero'
import {
  COMPARISON,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  HONESTY,
  META,
  PRICE_COMPARISON,
  STRUCTURED,
  WHY_SWITCH
} from 'components/pages/firecrawl/shared'

const FirecrawlPage = () => (
  <Layout>
    <Hero />
    <AlternativeWhySwitch {...WHY_SWITCH} />
    <ProductPriceComparison {...PRICE_COMPARISON} />
    <AlternativeComparison {...COMPARISON} />
    <ProductStrengths id='firecrawl-strengths' {...HONESTY} />
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

export default FirecrawlPage
