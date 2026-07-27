import { breakpoints, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import {
  Eyebrow,
  FeatureCard,
  FEATURES,
  FeatureSection
} from 'components/patterns/FeatureStory'

import { SectionTitle } from './section-title'
import { PRIMITIVES } from './shared'

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: [3, 3, 3, 3] })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const Primitives = () => (
  <FeatureSection id='primitives'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>
      {PRIMITIVES.eyebrow}
    </Eyebrow>
    <SectionTitle>{PRIMITIVES.title}</SectionTitle>
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: [1, 1, 2, 2],
        color: 'black70',
        lineHeight: 2,
        pb: [3, 3, 4, 4],
        maxWidth: '36em'
      })}
    >
      {PRIMITIVES.description}
    </Text>
    <Grid>
      {FEATURES.map(feature => (
        <FeatureCard key={feature.slug} feature={feature} showTeachLine />
      ))}
    </Grid>
  </FeatureSection>
)
