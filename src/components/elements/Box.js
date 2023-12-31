import {
  color,
  space,
  variant,
  border,
  position,
  layout
} from '@techstack/styled-system'

import styled from 'styled-components'

const Box = styled('div')(
  border,
  color,
  layout,
  position,
  space,
  variant({ key: 'button' })
)

export default Box
