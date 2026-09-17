import React from 'react'
import styled from 'styled-components'
import { breakpoints, theme } from 'theme'

import Box from 'components/elements/Box'
import { FeatureCard, FEATURES } from 'components/patterns/FeatureStory'

import { FEATURE_CTAS, SectionBlock } from './shared'

const Cards = styled(Box)`
  ${theme({
    display: 'grid',
    gap: 3,
    width: '100%'
  })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const Features = () => (
  <SectionBlock
    id='features'
    title='How every request actually runs'
    caption='Isolation, adblock, automation, and the edge cache run on every plan. Cards marked PRO need an API key. Open a primitive to see when to use it.'
  >
    <Cards>
      {FEATURES.map(feature => (
        <FeatureCard
          key={feature.slug}
          feature={feature}
          cta={FEATURE_CTAS[feature.slug]}
        />
      ))}
    </Cards>
  </SectionBlock>
)
