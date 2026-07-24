import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import {
  DashedGridOverlay,
  FeaturePageShell
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/proxy/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/proxy/faq'
import { Hero } from 'components/pages/proxy/hero'
import { HowItWorks } from 'components/pages/proxy/how-it-works'
import { Overview } from 'components/pages/proxy/overview'
import { Parameters } from 'components/pages/proxy/parameters'
import { QuickStart } from 'components/pages/proxy/quick-start'
import { Related } from 'components/pages/proxy/related'
import { META } from 'components/pages/proxy/shared'
import { UseCases } from 'components/pages/proxy/use-cases'

const ProxyFeaturePage = () => (
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

export default ProxyFeaturePage
