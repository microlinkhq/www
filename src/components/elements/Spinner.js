import React from 'react'
import styled from 'styled-components'
import { dash, rotate } from 'components/keyframes'

import { cx, colors } from 'theme'

import Svg from './Svg'

const Spinner = ({
  color = colors.primary,
  width = '64px',
  height = '32px',
  style = { padding: '4px' },
  ...props
}) => (
  <StyledSpinner
    viewBox='0 0 50 50'
    $color={color}
    css={{ width, height }}
    style={style}
    {...props}
  >
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

const StyledSpinner = styled(Svg)`
  animation: ${rotate} 2s linear infinite;
  will-change: stroke-dasharray, stroke-dashoffset;

  .path {
    stroke: ${props => cx(props.$color)};
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`

export default Spinner
