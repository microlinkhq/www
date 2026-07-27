import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import { FeaturePageShell } from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/function/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/function/faq'
import { Hero } from 'components/pages/function/hero'
import { Overview } from 'components/pages/function/overview'
import { Parameters } from 'components/pages/function/parameters'
import { Related } from 'components/pages/function/related'
import { META } from 'components/pages/function/shared'

const FunctionFeaturePage = () => (
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

export default FunctionFeaturePage
