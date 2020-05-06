import { css } from 'styled-components'

export const createCssState = ({
  selector,
  state,
  css: cssStyle
}) => props => css`
  ${props => props.state === state && cssStyle}
  ${selector} {
    ${cssStyle};
  }
`
