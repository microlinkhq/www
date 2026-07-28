import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  FeaturePageShell,
  faqPageStructured
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/proxy/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/proxy/faq'
import { Hero } from 'components/pages/proxy/hero'
import { Overview } from 'components/pages/proxy/overview'
import { Parameters } from 'components/pages/proxy/parameters'
import { Related } from 'components/pages/proxy/related'
import { META } from 'components/pages/proxy/shared'

const ProxyFeaturePage = () => (
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

export default ProxyFeaturePage
