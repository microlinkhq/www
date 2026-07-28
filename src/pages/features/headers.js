import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  FeaturePageShell,
  faqPageStructured
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/headers/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/headers/faq'
import { Hero } from 'components/pages/headers/hero'
import { Overview } from 'components/pages/headers/overview'
import { Parameters } from 'components/pages/headers/parameters'
import { Related } from 'components/pages/headers/related'
import { META } from 'components/pages/headers/shared'

const HeadersFeaturePage = () => (
  <Layout>
    <FeaturePageShell>
      <Hero />
      <Overview />
      <Parameters />
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

export default HeadersFeaturePage
