import { theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'

import ArrowLink from 'components/patterns/ArrowLink'
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

export const ExamplesSection = ({ eyebrow = 'Examples', title, panels }) => (
  <FeatureSection id='examples'>
    <Box css={theme({ pb: [3, 3, 4, 4] })}>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
      <Subhead css={theme({ textAlign: 'left' })}>{title}</Subhead>
    </Box>
    <ExamplesSwitcher panels={panels} />
  </FeatureSection>
)

export const RelatedFeaturesSection = ({
  relatedSlugs,
  eyebrow = 'Related features',
  title = 'Compose with these next.'
}) => (
  <FeatureSection id='related'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
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
      {relatedSlugs.map(slug => (
        <FeatureCard key={slug} feature={getFeature(slug)} />
      ))}
    </Box>
  </FeatureSection>
)

export const FeatureFaqSection = ({ questions, moreHref }) => (
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
          px: SECTION_PX
        })}
        title='FAQ'
        questions={questions}
      />
      {moreHref && (
        <Box
          css={theme({
            px: SECTION_PX,
            pb: SECTION_VERTICAL_SPACING,
            textAlign: 'center'
          })}
        >
          <ArrowLink
            href={moreHref}
            css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
          >
            View all FAQs
          </ArrowLink>
        </Box>
      )}
    </Box>
  </Box>
)
