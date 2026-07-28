import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  FeaturePageShell,
  faqPageStructured
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/antibot/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/antibot/faq'
import { Hero } from 'components/pages/antibot/hero'
import { Overview } from 'components/pages/antibot/overview'
import { Parameters } from 'components/pages/antibot/parameters'
import { Related } from 'components/pages/antibot/related'
import { META } from 'components/pages/antibot/shared'

const AntibotFeaturePage = () => (
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

export default AntibotFeaturePage
