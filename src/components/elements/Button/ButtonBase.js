import styled, { css } from 'styled-components'
import { borders, borderColor, borderRadius, buttonStyle } from 'styled-system'
import { createCssState } from 'helpers/style'
import { transition } from 'theme'
import { lighten } from 'polished'

import Text from '../Typography/Text'

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    background-color: ${({ theme }) => theme.colors.link};
    box-shadow: 0 2px 15px ${({ theme }) => lighten(0.15, theme.colors.link)};
    opacity: 0.8;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  `
})

const disabledStyle = createCssState({
  selector: '&:disabled',
  state: 'disabled',
  css: css`
    background-color: ${({ theme }) => theme.colors.white90};
    color: ${({ theme }) => theme.colors.black50};
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
    transition: `all ${transition.medium}`,
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
  // style,
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
