import React from 'react'
import styled from 'styled-components'

import { theme } from 'theme'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

const DEFAULT_WIDTH = 320

const Preview = styled('img')(
  theme({
    display: 'block',
    maxWidth: '100%',
    height: 'auto'
  })
)

export const HoverImage = ({
  src,
  alt = '',
  width = DEFAULT_WIDTH,
  children
}) => (
  <Tooltip
    as='span'
    type='zoom-in'
    display='inline'
    content={<Preview src={src} width={width} alt={alt} />}
  >
    {children}
  </Tooltip>
)
