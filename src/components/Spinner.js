import React from 'react'
import styled from 'styled-components'
import { width } from 'styled-system'

import { height, colors } from 'theme'

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

const StyledSpinner = styled.svg`
  ${width} ${height} animation: rotate 2s linear infinite;

  .path {
    stroke: ${colors.primary};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
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
  }
`

StyledSpinner.defaultProps = {
  width: 64,
  height: 16
}

export default Spinner
