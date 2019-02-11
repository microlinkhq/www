import styled, { css } from 'styled-components'
import { borders, borderColor, borderRadius, buttonStyle } from 'styled-system'
import { createCssState } from 'helpers/style'
import { transition, colors } from 'theme'

import Text from '../Text'

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    background-color: ${colors.primary};
    color: ${colors.white};
    opacity: 0.8;
    cursor: pointer;
  `
})

const disabledStyle = createCssState({
  selector: '&:disabled',
  state: 'disabled',
  css: css`
    background-color: ${colors.white90};
    color: ${colors.black50};
    cursor: not-allowed;
  `
})

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
    transition: `opacity ${transition.short}`,
    appearance: 'none',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: 16 / 14,
    textDecoration: 'none',
    verticalAlign: 'middle',
    WebkitFontSmoothing: 'antialiased'
  },
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  hoverStyle,
  disabledStyle,
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
