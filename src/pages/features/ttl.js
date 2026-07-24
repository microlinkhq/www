import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import {
  DashedGridOverlay,
  FeaturePageShell
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/ttl/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/ttl/faq'
import { Hero } from 'components/pages/ttl/hero'
import { HowItWorks } from 'components/pages/ttl/how-it-works'
import { Overview } from 'components/pages/ttl/overview'
import { Parameters } from 'components/pages/ttl/parameters'
import { QuickStart } from 'components/pages/ttl/quick-start'
import { Related } from 'components/pages/ttl/related'
import { META } from 'components/pages/ttl/shared'
import { UseCases } from 'components/pages/ttl/use-cases'

const TtlFeaturePage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <FeaturePageShell>
        <Hero />
        <Overview />
        <HowItWorks />
        <QuickStart />
        <Parameters />
        <Examples />
        <UseCases />
        <Related />
      </FeaturePageShell>
      <FaqSection />
    </Box>
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
