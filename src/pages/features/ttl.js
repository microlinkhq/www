import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import { FeaturePageShell } from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/ttl/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/ttl/faq'
import { Hero } from 'components/pages/ttl/hero'
import { Overview } from 'components/pages/ttl/overview'
import { Parameters } from 'components/pages/ttl/parameters'
import { Related } from 'components/pages/ttl/related'
import { META } from 'components/pages/ttl/shared'

const TtlFeaturePage = () => (
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
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text
          }
        }))
      }
    ]}
  />
)

export default TtlFeaturePage
