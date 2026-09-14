import React from 'react'

import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import {
  ProductPricing,
  ProductCta,
  ProductFaq,
  productStructured,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { Hero } from 'components/pages/api/hero'
import { PageNav } from 'components/pages/api/page-nav'
import { Quickstart } from 'components/pages/api/quickstart'
import { Products } from 'components/pages/api/products'
import { Features } from 'components/pages/api/features'
import { Integrations } from 'components/pages/api/integrations'
import { Enterprise } from 'components/pages/api/enterprise'
import { Start } from 'components/pages/api/start'
import {
  ACCENT,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  HOW_TO,
  META,
  PRICING_CAPTION,
  PageRoot
} from 'components/pages/api/shared'

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/api',
      name: META.structuredName,
      description: META.structuredDescription,
      keywords: META.keywords,
      about: META.about,
      faqItems: FAQ_ITEMS,
      howTo: HOW_TO
    })}
  />
)

const ApiPage = () => (
  <Layout>
    <PageRoot>
      <Hero />
      <PageNav />
      <Quickstart />
      <Products />
      <Features />
      <Integrations />
      <ProductPricing caption={PRICING_CAPTION} />
      <Enterprise />
      <Start />
      <ProductFaq
        title='Frequently asked questions'
        caption={FAQ_CAPTION}
        questions={toFaqQuestions(FAQ_ITEMS)}
      />
      <ProductCta {...CTA} accent={ACCENT} />
    </PageRoot>
  </Layout>
)

export default ApiPage
