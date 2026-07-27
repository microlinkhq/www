import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { Eyebrow, FeatureSection } from 'components/patterns/FeatureStory'

import { SectionTitle } from './section-title'
import { INTRODUCTION } from './shared'

export const Introduction = () => (
  <FeatureSection id='introduction'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>
      {INTRODUCTION.eyebrow}
    </Eyebrow>
    <SectionTitle>{INTRODUCTION.title}</SectionTitle>
    <Box css={theme({ maxWidth: layout.large })}>
      <Text
        css={theme({
          fontFamily: 'sans',
          fontSize: [1, 1, 2, 2],
          color: 'black80',
          lineHeight: 2
        })}
      >
        {INTRODUCTION.body}
      </Text>
    </Box>
  </FeatureSection>
)
