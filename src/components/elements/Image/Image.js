import styled from 'styled-components'
import { withLazy } from 'helpers/hoc/with-lazy'
import React from 'react'

import {
  space,
  color,
  layout,
  typography,
  border
} from '@techstack/styled-system'

const StyledImage = styled('img')(
  {
    display: 'block',
    maxWidth: '100%'
  },
  space,
  color,
  layout,
  typography,
  border
)

const Image = props => (
  <StyledImage decoding='async' loading='lazy' {...props} />
)

export default withLazy(Image)
