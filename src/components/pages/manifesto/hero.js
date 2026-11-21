import { layout, SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Heading from 'components/elements/Heading'

import Caption from 'components/patterns/Caption/Caption'
import { Eyebrow } from 'components/patterns/FeatureStory'

import { HERO } from './shared'

export const Hero = () => (
  <Box
    as='header'
    css={theme({ pt: [3, 3, 4, 4], pb: SECTION_VERTICAL_SPACING })}
  >
    <Eyebrow forwardedAs='p'>{HERO.eyebrow}</Eyebrow>
    <Heading css={theme({ textAlign: 'left' })}>{HERO.title}</Heading>
    <Caption
      forwardedAs='p'
      css={theme({
        pt: [3, 3, 4, 4],
        textAlign: 'left',
        maxWidth: layout.normal
      })}
    >
      {HERO.description}
    </Caption>
  </Box>
)
