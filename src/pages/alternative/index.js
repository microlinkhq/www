import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'
import { CallToAction } from 'components/patterns/CallToAction'
import { ProductFaq, toFaqQuestions } from 'components/patterns/ProductStory'

import { Groups } from 'components/pages/alternatives/groups'
import { Hero } from 'components/pages/alternatives/hero'
import {
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  META,
  STRUCTURED
} from 'components/pages/alternatives/shared'

const AlternativesIndexPage = () => (
  <Layout>
    <Hero />
    <Groups />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
    <CallToAction id='cta' {...CTA} />
  </Layout>
)

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    schemaType='CollectionPage'
    structured={STRUCTURED}
  />
)

export default AlternativesIndexPage
