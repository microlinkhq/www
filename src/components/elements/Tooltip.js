import { themeGet } from 'styled-system'
import styled, { css, keyframes } from 'styled-components'

import Box from './Box'

import {
  space as spaceTheme,
  lineHeights,
  fontWeights,
  fontSizes,
  transition
} from 'theme'

const fadeIn = keyframes`
from {
  opacity:0;
} to {
  opacity:1;
}
`

const style = css`
  &::after {
    animation: ${fadeIn} ${transition.medium};
  }
  &::before {
    animation: ${fadeIn} ${transition.medium};
    width: 300px;
    padding: ${spaceTheme[3]}px;
    line-height: ${lineHeights[3]};
    letter-spacing: normal;
    text-align: center;
    font-size: ${fontSizes[0]}px;
    white-space: inherit;
    font-weight: ${fontWeights.normal};
  }
`

const Tooltip = styled(Box)(
  props => ({
    display: 'inline-block',
    position: 'relative',
    color: 'inherit',
    backgroundColor: 'transparent',
    '&::before': {
      display: 'none',
      content: `"${props.text}"`,
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%, -4px)',
      whiteSpace: 'nowrap',
      fontSize: themeGet('fontSizes.0', '10px')(props),
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingLeft: '8px',
      paddingRight: '8px',
      color: themeGet('colors.' + props.color)(props),
      backgroundColor: themeGet('colors.' + props.bg)(props),
      borderRadius: themeGet('radii.1')(props) + 'px'
    },
    '&::after': {
      display: 'none',
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%, 8px)',
      content: '" "',
      borderWidth: '6px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderTopColor: themeGet('colors.' + props.bg)(props)
    },
    '&:hover': {
      '&::before, &::after': {
        display: 'block'
      }
    }
  }),
  style
)

Tooltip.defaultProps = {
  ...Box.defaultProps,
  color: 'white',
  bg: 'black'
}

export default Tooltip
