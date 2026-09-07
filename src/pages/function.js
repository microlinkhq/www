import React from 'react'

import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import {
  ProductPricing,
  ProductCta,
  ProductFaq,
  productStructured,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { FunctionProductHero } from 'components/pages/function/product-hero'
import { FunctionPrimer } from 'components/pages/function/primer'
import { FunctionShowcase } from 'components/pages/function/showcase'
import { FunctionFeaturesGrid } from 'components/pages/function/features-grid'
import {
  ACCENT,
  PRICING_CAPTION,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  HOW_TO,
  META
} from 'components/pages/function/product-shared'

const REPOS = ['microlink', 'browserless', 'mcp']

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/function',
      name: META.structuredName,
      description: META.structuredDescription,
      keywords: META.keywords,
      about: META.about,
      stars: getRepoStars(REPOS[0]),
      starsRepo: REPOS[0],
      faqItems: FAQ_ITEMS,
      howTo: HOW_TO
    })}
  />
)

const FunctionPage = () => (
  <Layout>
    <FunctionProductHero />
    <FunctionPrimer />
    <FunctionShowcase />
    <ProductPricing caption={PRICING_CAPTION} />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='The function runtime is open source. Read the code, open an issue, or run it yourself.'
    />
    <FunctionFeaturesGrid />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
  </Layout>
)

export default FunctionPage
