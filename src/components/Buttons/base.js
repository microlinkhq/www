import { css } from 'styled-components'

import {
  borders,
  fontWeight,
  display,
  width,
  responsiveStyle
} from 'styled-system'

const height = responsiveStyle({
  prop: 'height',
  cssProperty: 'height'
})

export default css`
  ${display} ${width} ${height} ${fontWeight} ${borders} cursor: pointer;
`
