import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import { DashedGridOverlay } from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { FeaturesGrid } from 'components/pages/features/grid'

const FeaturesIndexPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <FeaturesGrid />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Features: Microlink engineering principles'
    description='The cross-product engineering capabilities behind Microlink — web scraping, browser functions, automation, proxy resolution, antibot detection, configurable caching, custom headers, and request security — shared uniformly across every API.'
    schemaType='WebPage'
  />
)

export default FeaturesIndexPage
