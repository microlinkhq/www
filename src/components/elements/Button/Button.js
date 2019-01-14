import styled from 'styled-components'
import { transparentize } from 'polished'

import {
  themeGet,
  borders,
  borderColor,
  borderRadius,
  buttonStyle
} from 'styled-system'

import { transition } from 'theme'

import Text from '../Text'

export const Button = styled(Text)(
  {
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    transition: `opacity ${transition.short}`,
    appearance: 'none',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: 16 / 14,
    textDecoration: 'none',
    verticalAlign: 'middle',
    WebkitFontSmoothing: 'antialiased'
  },
  props => ({
    '&:hover:not([disabled])': {
      opacity: 0.8,
      cursor: 'pointer'
    }
  }),
  props => ({
    '&:disabled': { opacity: '0.8' }
  }),
  props => ({
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 .2em ${transparentize(
        0.6,
        themeGet('colors.' + props.bg, props.bg)(props)
      )}`
    }
  }),
  borders,
  borderColor,
  borderRadius,
  buttonStyle
)

Button.propTypes = {
  ...Text.propTypes,
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
  ...buttonStyle.propTypes
}

Button.defaultProps = {
  ...Text.defaultProps,
  as: 'button',
  fontFamily: 'sans',
  fontSize: '1',
  fontWeight: 'bold',
  m: 0,
  px: 3,
  py: 2,
  color: 'white',
  bg: 'primary',
  border: 0,
  borderRadius: 2
}

export default Button
