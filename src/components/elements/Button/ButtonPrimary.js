import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { lighten } from 'polished'

import ButtonBase, { BOX_SHADOW } from './ButtonBase'

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    background-color: ${({ theme }) => theme.colors.link};
    box-shadow: ${BOX_SHADOW} ${({ theme }) => lighten(0.15, theme.colors.link)};
    opacity: 0.8;
    color: ${({ theme }) => theme.colors.white};
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

const Button = styled(ButtonBase)(hoverStyle, disabledStyle)

export default Button
