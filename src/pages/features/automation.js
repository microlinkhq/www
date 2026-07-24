import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import {
  DashedGridOverlay,
  FeaturePageShell
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/automation/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/automation/faq'
import { Hero } from 'components/pages/automation/hero'
import { HowItWorks } from 'components/pages/automation/how-it-works'
import { Overview } from 'components/pages/automation/overview'
import { Parameters } from 'components/pages/automation/parameters'
import { QuickStart } from 'components/pages/automation/quick-start'
import { Related } from 'components/pages/automation/related'
import { META } from 'components/pages/automation/shared'
import { UseCases } from 'components/pages/automation/use-cases'

const AutomationFeaturePage = () => (
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

export default AutomationFeaturePage
