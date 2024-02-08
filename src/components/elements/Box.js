import {
  border,
  color,
  compose,
  layout,
  position,
  space,
  variant
} from '@techstack/styled-system'

import styled from 'styled-components'

const Box = styled('div')(
  compose(border, color, layout, position, space, variant({ key: 'button' }))
)

export default Box
