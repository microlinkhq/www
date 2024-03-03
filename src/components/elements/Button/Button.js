import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'
import { colors } from 'theme'

import ButtonBase, { getColorVariant } from './ButtonBase'

export const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    background: ${getColorVariant('color')};
    color: ${getColorVariant('background')};
    box-shadow: 0 0 0 1px ${getColorVariant('background')};
  `
})

export const disabledStyle = createCssState({
  selector: '&:disabled',
  state: 'disabled',
  css: css`
    &&& {
      opacity: 0.8;
      cursor: not-allowed;
      background-color: ${colors.black05};
      color: ${colors.black50};
      cursor: not-allowed;
      box-shadow: 0 0 0 1px ${colors.black20};
      .path {
        stroke: ${colors.black30};
      }
    }
  `
})

const Button = styled(ButtonBase)(hoverStyle, disabledStyle)

export default Button
