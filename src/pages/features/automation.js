import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import { FeaturePageShell } from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/automation/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/automation/faq'
import { Hero } from 'components/pages/automation/hero'
import { Overview } from 'components/pages/automation/overview'
import { Parameters } from 'components/pages/automation/parameters'
import { Related } from 'components/pages/automation/related'
import { META } from 'components/pages/automation/shared'

const AutomationFeaturePage = () => (
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

export default AutomationFeaturePage
