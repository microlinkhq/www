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

const Image = ({ loading = 'lazy', alt = '', ...props }) => (
  <StyledImage decoding='async' loading={loading} alt={alt} {...props} />
)

export default withLazy(Image)
