import styled, { css } from 'styled-components'
import { slide } from 'components/keyframes'
import Box from 'components/elements/Box'
import is from 'styled-is'
import React from 'react'

const lightStyle = css`
  background-image: radial-gradient(#d7d7d7 1px, transparent 0),
    radial-gradient(#d7d7d7 1px, transparent 0);
`

const animateStyle = css`
  animation: ${slide} 100s linear infinite;
  animation-direction: reverse;
`

const StyledDotsBackground = styled(Box).withConfig({
  shouldForwardProp: prop => !['animate'].includes(prop)
})`
  position: relative;
  min-height: 100vh;

  &:before {
    content: '';
    position: absolute;
    width: 400%;
    height: 100%;
    z-index: -1;

    ${lightStyle}
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;

    ${is('animate')`${animateStyle}`};
  }
`

const DotsBackground = props => <StyledDotsBackground animate {...props} />

export default DotsBackground
