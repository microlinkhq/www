import React from 'react'
import styled from 'styled-components'
import { breakpoints, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import ArrowLink from 'components/patterns/ArrowLink'
import { FeatureCard, FEATURES } from 'components/patterns/FeatureStory'

import { SectionBlock } from './shared'

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
    caption='Isolation, caching, proxy, and automation are not add-ons. They ship with the endpoint. Open a primitive to see when to use it.'
  >
    <Cards>
      {FEATURES.map(feature => (
        <FeatureCard key={feature.slug} feature={feature} />
      ))}
    </Cards>
    <Flex css={theme({ pt: [4, 4, 5, 5] })}>
      <ArrowLink href='/features'>See all features</ArrowLink>
    </Flex>
  </SectionBlock>
)
