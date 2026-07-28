import { layout, theme } from 'theme'
import React from 'react'

import Annotation from 'components/elements/Annotation'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'

import CaptionBase from 'components/patterns/Caption/Caption'
import { withTitle } from 'helpers/hoc/with-title'

import { HERO } from './shared'

const Heading = withTitle(HeadingBase)
const Caption = withTitle(CaptionBase)

export const Hero = () => (
  <Flex
    as='section'
    id='hero'
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      pt: [1],
      pb: [1]
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
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large
      })}
    >
      Microlink empowers teams to extract, capture, and unblock the web with one
      API. Flexibility, performance, and security — so you can ship faster and
      focus on what matters.
    </Caption>
  </Flex>
)
