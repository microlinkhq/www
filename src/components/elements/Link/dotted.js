import { color, style } from 'styled-system'
import styled from 'styled-components'

import { colors } from 'theme'

const borderColor = style({
  prop: 'borderColor',
  cssProperty: 'color'
})

const LinkDotted = styled.a`
  ${color} ${borderColor} text-decoration: none;
  border-bottom-width: 2px;
  border-bottom-style: dashed;
  opacity: 1;

  &:hover {
    opacity: 0.5;
    transition: opacity 0.15s ease-in;
  }
`

LinkDotted.defaultProps = {
  color: colors.blue6
}

export default LinkDotted
