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
    caption='Isolation, adblock, automation, and the edge cache run on every plan. Cards marked PRO need an API key. Open a primitive to see when to use it.'
  >
    <Cards>
      {FEATURES.map(feature => (
        <FeatureCard key={feature.slug} feature={feature} />
      ))}
    </Cards>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        gap: [3, 3, 4, 4],
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: ['center', 'center', 'flex-start', 'flex-start']
      })}
    >
      <ArrowLink href='/features'>See all features</ArrowLink>
      <ArrowLink href='/docs/guides/common/production-patterns'>
        Production patterns guide
      </ArrowLink>
    </Flex>
  </SectionBlock>
)
