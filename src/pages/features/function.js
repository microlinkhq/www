import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import {
  DashedGridOverlay,
  FeaturePageShell
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/function/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/function/faq'
import { Hero } from 'components/pages/function/hero'
import { HowItWorks } from 'components/pages/function/how-it-works'
import { Overview } from 'components/pages/function/overview'
import { Parameters } from 'components/pages/function/parameters'
import { QuickStart } from 'components/pages/function/quick-start'
import { Related } from 'components/pages/function/related'
import { META } from 'components/pages/function/shared'
import { UseCases } from 'components/pages/function/use-cases'

const FunctionFeaturePage = () => (
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

export default FunctionFeaturePage
