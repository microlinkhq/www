import Heading from 'components/elements/Heading'
import LineBreak from 'components/elements/LineBreak'
import { gradient, theme } from 'theme'
import React from 'react'
import styled, { keyframes } from 'styled-components'

import { reduceMotion } from './primitives'

const GLINT_DURATION = '4s'
const GLINT_DELAY = '0.6s'
const GLINT_WIDTH = '300% 100%'
const ITALIC_OVERHANG = '0.12em'

const glint = `linear-gradient(
  100deg,
  rgb(255 255 255 / 0) 38%,
  rgb(255 255 255 / 0.55) 50%,
  rgb(255 255 255 / 0) 62%
)`

const sweep = keyframes`
  0% { background-position: 100% 0, 0 0 }
  40%, 100% { background-position: 0 0, 0 0 }
`

const GlintHeading = styled(Heading)`
  ${theme({
    fontSize: 'inherit',
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    mx: `-${ITALIC_OVERHANG}`,
    px: ITALIC_OVERHANG
  })};
  background-image: ${glint}, ${gradient};
  background-size: ${GLINT_WIDTH}, 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 0, 0 0;
  animation: ${sweep} ${GLINT_DURATION} ease-in-out ${GLINT_DELAY} infinite;

  ${reduceMotion} {
    animation: none;
  }
`

export const HeroHeadline = () => (
  <Heading variant={null}>
    The web, <LineBreak breakpoints={[0]} />
    <GlintHeading forwardedAs='span'>ready for AI</GlintHeading>
  </Heading>
)
