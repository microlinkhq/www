import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import {
  DashedGridOverlay,
  FeaturePageShell
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/security/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/security/faq'
import { Hero } from 'components/pages/security/hero'
import { HowItWorks } from 'components/pages/security/how-it-works'
import { Overview } from 'components/pages/security/overview'
import { Parameters } from 'components/pages/security/parameters'
import { QuickStart } from 'components/pages/security/quick-start'
import { Related } from 'components/pages/security/related'
import { META } from 'components/pages/security/shared'
import { UseCases } from 'components/pages/security/use-cases'

const SecurityFeaturePage = () => (
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

export default SecurityFeaturePage
