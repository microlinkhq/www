import { breakpoints, layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import { FeatureCard, FEATURES } from 'components/patterns/FeatureStory'

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: [3, 3, 3, 3] })}
  width: 100%;

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const Showcase = () => (
  <Container
    as='section'
    aria-label='Feature pages'
    css={theme({
      alignItems: 'stretch',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pt: [3, 3, 4, 5],
      pb: [4, 4, 5, 5]
    })}
  >
    <Grid>
      {FEATURES.map(feature => (
        <FeatureCard key={feature.slug} feature={feature} showTeachLine />
      ))}
    </Grid>
  </Container>
)
