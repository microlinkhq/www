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
import { How } from 'components/pages/antibot/how'
import { Overview } from 'components/pages/antibot/overview'
import { Providers } from 'components/pages/antibot/providers'
import { Related } from 'components/pages/antibot/related'
import { META, TOC } from 'components/pages/antibot/shared'

const AntibotFeaturePage = () => (
  <Layout>
    <FeaturePageShell toc={TOC}>
      <Hero />
      <Overview />
      <How />
      <Providers />
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
