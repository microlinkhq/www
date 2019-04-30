import { borders, borderColor, borderRadius, buttonStyle } from 'styled-system'
import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { transition } from 'theme'

import Text from '../Typography/Text'

const focusStyle = createCssState({
  selector: '&:focus',
  state: 'focus',
  css: css`
    outline: none;
  `
})

const Button = styled(Text)(
  {
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    transition: `all ${transition.medium}`,
    appearance: 'none',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: 16 / 14,
    textDecoration: 'none',
    verticalAlign: 'middle',
    WebkitFontSmoothing: 'antialiased',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  focusStyle
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
  color: 'primary',
  bg: 'white',
  border: 0,
  borderRadius: 2
}

export default Button
