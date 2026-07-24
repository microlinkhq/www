import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import {
  DashedGridOverlay,
  FeaturePageShell
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Examples } from 'components/pages/scraping/examples'
import { FAQ_ITEMS, FaqSection } from 'components/pages/scraping/faq'
import { Hero } from 'components/pages/scraping/hero'
import { HowItWorks } from 'components/pages/scraping/how-it-works'
import { Overview } from 'components/pages/scraping/overview'
import { Parameters } from 'components/pages/scraping/parameters'
import { QuickStart } from 'components/pages/scraping/quick-start'
import { Related } from 'components/pages/scraping/related'
import { META } from 'components/pages/scraping/shared'
import { UseCases } from 'components/pages/scraping/use-cases'

const ScrapingFeaturePage = () => (
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

export default ScrapingFeaturePage
