import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  FeaturePageShell,
  faqPageStructured
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/adblock/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/adblock/faq'
import { Hero } from 'components/pages/adblock/hero'
import { How } from 'components/pages/adblock/how'
import { Overview } from 'components/pages/adblock/overview'
import { Parameters } from 'components/pages/adblock/parameters'
import { Related } from 'components/pages/adblock/related'
import { META, TOC } from 'components/pages/adblock/shared'

const AdblockFeaturePage = () => (
  <Layout>
    <FeaturePageShell toc={TOC}>
      <Hero />
      <Overview />
      <How />
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

export default AdblockFeaturePage
