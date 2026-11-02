import React from 'react'

import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import {
  ProductFaq,
  productStructured,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { CallToAction } from 'components/patterns/CallToAction'
import { Hero } from 'components/pages/ai/hero'
import { How } from 'components/pages/ai/how'
import {
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  HOW_TO,
  META
} from 'components/pages/ai/shared'

export const Head = () => (
  <Meta
    title={META.title}
    noSuffix
    description={META.description}
    structured={productStructured({
      path: '/ai',
      name: META.structuredName,
      description: META.structuredDescription,
      keywords: META.keywords,
      about: META.about,
      faqItems: FAQ_ITEMS,
      howTo: HOW_TO
    })}
  />
)

const AiPage = () => (
  <Layout>
    <Hero />
    <How />
    <ProductFaq
      title='Frequently asked questions'
      caption={FAQ_CAPTION}
      questions={toFaqQuestions(FAQ_ITEMS)}
    />
    <CallToAction id='cta' {...CTA} />
  </Layout>
)

export default AiPage
