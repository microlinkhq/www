import { space, theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'

import Faq from 'components/patterns/Faq/Faq'

import { ExamplesSwitcher } from './examples-switcher'
import { FeatureCard } from './feature-card'

import {
  SECTION_MAX_WIDTH,
  SECTION_PX
} from 'components/patterns/CustomerStory/primitives'

import { ACCENT, getFeature } from '../features'
import { Eyebrow } from '../primitives'
import { FeatureSection } from './shell'

export const ExamplesSection = ({ eyebrow = 'Examples', title, panels }) => {
  if (!panels?.length) return null

  return (
    <FeatureSection id='examples'>
      <Box css={theme({ pb: [3, 3, 4, 4] })}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Subhead css={theme({ textAlign: 'left' })}>{title}</Subhead>
      </Box>
      <ExamplesSwitcher panels={panels} />
    </FeatureSection>
  )
}

export const RelatedFeaturesSection = ({
  relatedSlugs,
  eyebrow = 'Related features',
  title = 'Compose with these next.'
}) => (
  <FeatureSection id='related'>
    <Eyebrow>{eyebrow}</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      {title}
    </Subhead>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: [
          'minmax(0, 1fr)',
          'minmax(0, 1fr)',
          'repeat(2, minmax(0, 1fr))',
          'repeat(2, minmax(0, 1fr))'
        ],
        gap: [3, 3, 3, 3]
      })}
    >
      {relatedSlugs.map(slug => {
        const feature = getFeature(slug)
        if (!feature) return null
        return <FeatureCard key={slug} feature={feature} />
      })}
    </Box>
  </FeatureSection>
)

export const FeatureFaqSection = ({ questions }) => (
  <Box
    css={theme({
      bg: ACCENT.bgSoft,
      borderTop: 1,
      borderTopColor: ACCENT.bgEdge,
      width: '100%'
    })}
  >
    <Box css={theme({ maxWidth: SECTION_MAX_WIDTH, mx: 'auto' })}>
      <Faq
        css={theme({
          py: SECTION_VERTICAL_SPACING,
          px: SECTION_PX,
          scrollMarginTop: space[5]
        })}
        title='FAQ'
        questions={questions}
      />
    </Box>
  </Box>
)
