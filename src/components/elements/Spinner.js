import React from 'react'
import styled, { keyframes } from 'styled-components'

import { colors } from 'theme'

import Svg from './Svg'

const Spinner = props => (
  <StyledSpinner viewBox='0 0 50 50' {...props}>
    <circle
      className='path'
      cx='25'
      cy='25'
      r='20'
      fill='none'
      strokeWidth='4'
    />
  </StyledSpinner>
)

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`

const StyledSpinner = styled(Svg)`
  animation: ${rotate} 2s linear infinite;

  .path {
    stroke: ${colors.primary};
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`

StyledSpinner.defaultProps = {
  width: '64px',
  height: '16px'
}

export default Spinner
