import { layout, SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'

import Caption from 'components/patterns/Caption/Caption'

import { HERO } from './shared'

export const Hero = () => (
  <Flex
    as='section'
    id='hero'
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      pt: [1],
      pb: SECTION_VERTICAL_SPACING
    })}
  >
    <Heading css={theme({ px: 3, maxWidth: layout.large })}>
      {HERO.title}
    </Heading>
    <Caption
      forwardedAs='p'
      css={theme({
        pt: [3, 3, 4, 4],
        px: 3,
        maxWidth: layout.large
      })}
    >
      {HERO.caption}
    </Caption>
  </Flex>
)
