import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import { FeaturePageShell } from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/security/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/security/faq'
import { Hero } from 'components/pages/security/hero'
import { Overview } from 'components/pages/security/overview'
import { Parameters } from 'components/pages/security/parameters'
import { Related } from 'components/pages/security/related'
import { META, TOC } from 'components/pages/security/shared'

const SecurityFeaturePage = () => (
  <Layout>
    <FeaturePageShell toc={TOC}>
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

export default SecurityFeaturePage
