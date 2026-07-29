import { layout, SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Annotation from 'components/elements/Annotation'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'

import CaptionBase from 'components/patterns/Caption/Caption'
import { withTitle } from 'helpers/hoc/with-title'

import { HERO } from './shared'

const Caption = withTitle(CaptionBase)

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
    <Heading
      variant={null}
      css={theme({
        px: [3, 3],
        maxWidth: layout.large
      })}
    >
      {HERO.lead}{' '}
      <Annotation variant='underline' css={theme({ fontSize: 'inherit' })}>
        {HERO.unlock}
      </Annotation>
    </Heading>
    <Caption
      forwardedAs='h2'
      titleize={false}
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
