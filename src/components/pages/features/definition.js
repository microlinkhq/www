import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { Eyebrow, FeatureSection } from 'components/patterns/FeatureStory'

import { SectionTitle } from './section-title'
import { DEFINITION } from './shared'

export const Definition = () => (
  <FeatureSection id='definition'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>
      {DEFINITION.eyebrow}
    </Eyebrow>
    <SectionTitle>{DEFINITION.title}</SectionTitle>
    <Text
      as='p'
      css={theme({
        fontFamily: 'sans',
        fontSize: [2, 2, 2, 2],
        color: 'black',
        lineHeight: 2,
        pb: [3, 3, 4, 4],
        maxWidth: layout.large
      })}
    >
      {DEFINITION.definition}
    </Text>
    <Box css={theme({ maxWidth: layout.large })}>
      <Text
        css={theme({
          fontFamily: 'sans',
          fontSize: [1, 1, 2, 2],
          color: 'black80',
          lineHeight: 2
        })}
      >
        {DEFINITION.body}
      </Text>
    </Box>
  </FeatureSection>
)
