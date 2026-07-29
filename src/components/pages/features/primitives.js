import { breakpoints, layout, SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import { FeatureCard, FEATURES } from 'components/patterns/FeatureStory'

const Cards = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: [3, 3, 3, 3] })}
  width: 100%;

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const Primitives = () => (
  <Box
    as='section'
    id='primitives'
    aria-label='Request primitives'
    css={theme({
      width: '100%',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      mx: 'auto',
      px: [3, 3, 0, 0],
      pt: 0,
      pb: SECTION_VERTICAL_SPACING
    })}
  >
    <Cards>
      {FEATURES.map(feature => (
        <FeatureCard key={feature.slug} feature={feature} showTeachLine />
      ))}
    </Cards>
  </Box>
)
