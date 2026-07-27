import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Heading from 'components/elements/Heading'
import { Caption } from 'components/patterns/CustomerStory/primitives'
import { Eyebrow } from 'components/patterns/FeatureStory'

import { HERO } from './shared'

export const Hero = () => (
  <Box as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <Eyebrow css={theme({ pb: 3, display: 'block' })}>{HERO.eyebrow}</Eyebrow>
    <Heading variant={null} css={theme({ textAlign: 'left' })}>
      {HERO.title}
    </Heading>
    <Caption
      forwardedAs='p'
      titleize={false}
      css={theme({
        pt: [3, 3, 4, 4],
        textAlign: 'left',
        maxWidth: '36em',
        mx: 0,
        fontFamily: 'sans',
        color: 'black70'
      })}
    >
      {HERO.description}
    </Caption>
  </Box>
)
