import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  FeaturePageShell,
  faqPageStructured
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/isolation/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/isolation/faq'
import { Hero } from 'components/pages/isolation/hero'
import { Overview } from 'components/pages/isolation/overview'
import { Related } from 'components/pages/isolation/related'
import { META, TOC } from 'components/pages/isolation/shared'

const IsolationFeaturePage = () => (
  <Layout>
    <FeaturePageShell toc={TOC}>
      <Hero />
      <Overview />
      <Examples />
      <Related />
    </FeaturePageShell>
    <FaqSection />
  </Layout>
)

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    schemaType='WebPage'
    structured={[faqPageStructured(FAQ_ITEMS)]}
  />
)

export default IsolationFeaturePage
