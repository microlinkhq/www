import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import {
  DashedGridOverlay,
  FeaturePageShell
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/headers/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/headers/faq'
import { Hero } from 'components/pages/headers/hero'
import { HowItWorks } from 'components/pages/headers/how-it-works'
import { Overview } from 'components/pages/headers/overview'
import { Parameters } from 'components/pages/headers/parameters'
import { QuickStart } from 'components/pages/headers/quick-start'
import { Related } from 'components/pages/headers/related'
import { META } from 'components/pages/headers/shared'
import { UseCases } from 'components/pages/headers/use-cases'

const HeadersFeaturePage = () => (
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

export default HeadersFeaturePage
