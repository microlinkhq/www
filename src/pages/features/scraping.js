import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  FeaturePageShell,
  faqPageStructured
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/scraping/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/scraping/faq'
import { Hero } from 'components/pages/scraping/hero'
import { Overview } from 'components/pages/scraping/overview'
import { Parameters } from 'components/pages/scraping/parameters'
import { Related } from 'components/pages/scraping/related'
import { META } from 'components/pages/scraping/shared'

const ScrapingFeaturePage = () => (
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

export default ScrapingFeaturePage
