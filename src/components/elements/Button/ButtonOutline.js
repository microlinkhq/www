import styled, { css } from 'styled-components'
import { transition, colors } from 'theme'
import { themeGet } from 'styled-system'
import { createCssState } from 'helpers/style'

import Button from './ButtonSecondary'

const style = css`
  transition: color, background-color ${transition.short};
  box-shadow: inset 0 0 0 2px
    ${({ theme }) => props => theme.colors[props.color]};
`

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    opacity: 1;
    cursor: pointer;
    box-shadow: none;
    color: ${props => colors[props.bg]};
    background-color: ${props => colors[props.color]};
    box-shadow: inset 0 0 0 2px
      ${props => themeGet('colors.' + props.color, props.color)(props)};
  `
})

const disabledStyle = createCssState({
  selector: '&:disabled',
  state: 'disabled',
  css: css`
    box-shadow: inset 0 0 0 2px ${colors.black50};
  `
})

const ButtonOutline = styled(Button)`
  ${style};
  ${hoverStyle};
  ${disabledStyle};
`

ButtonOutline.defaultProps = {
  ...Button.defaultProps,
  bg: 'white',
  color: 'link'
}

export default ButtonOutline
