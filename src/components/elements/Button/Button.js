import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { colors } from 'theme'

import ButtonBase from './ButtonBase'

export const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    background-color: ${({ color }) => colors[color]};
    color: ${({ bg }) => colors[bg]};
    box-shadow: 0 0 0 1px ${({ bg }) => colors[bg]};
  `
})

export const disabledStyle = createCssState({
  selector: '&:disabled',
  state: 'disabled',
  css: css`
    opacity: 0.8;
    cursor: not-allowed;
    background-color: ${colors.black05};
    color: ${colors.black50};
    cursor: not-allowed;
    box-shadow: 0 0 0 1px ${colors.black20};
  `
})

const Button = styled(ButtonBase)(hoverStyle, disabledStyle)

export default Button
