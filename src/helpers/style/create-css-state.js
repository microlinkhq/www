import { css } from 'styled-components'

export default ({ selector, state, css: cssStyle }) => props => css`
  ${props => props.state === state && cssStyle}
  ${selector} {
    ${cssStyle};
  }
`
