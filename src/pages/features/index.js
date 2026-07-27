import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import {
  DashedGridOverlay,
  FeaturePageShell
} from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Definition } from 'components/pages/features/definition'
import { Hero } from 'components/pages/features/hero'
import { Introduction } from 'components/pages/features/introduction'
import { Ladder } from 'components/pages/features/ladder'
import { MentalModel } from 'components/pages/features/mental-model'
import { NextSteps } from 'components/pages/features/next-steps'
import { Primitives } from 'components/pages/features/primitives'
import { META, TOC } from 'components/pages/features/shared'
import { Why } from 'components/pages/features/why'

const FeaturesIndexPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <FeaturePageShell toc={TOC}>
        <Hero />
        <Introduction />
        <Definition />
        <MentalModel />
        <Ladder />
        <Primitives />
        <Why />
        <NextSteps />
      </FeaturePageShell>
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    schemaType='WebPage'
  />
)

export default FeaturesIndexPage
