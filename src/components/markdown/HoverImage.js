import React from 'react'

import Tooltip from 'components/patterns/Tooltip/Tooltip'

const DEFAULT_WIDTH = 320

export const HoverImage = ({
  src,
  alt = '',
  width = DEFAULT_WIDTH,
  children
}) => (
  <Tooltip
    as='span'
    type='zoom-in'
    style={{ display: 'inline' }}
    content={
      <img
        src={src}
        width={width}
        alt={alt}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      />
    }
  >
    {children}
  </Tooltip>
)
