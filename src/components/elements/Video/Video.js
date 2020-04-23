import Box from '../Box'
import LazyImage from '../Image/LazyImage'
import React from 'react'

export default props => (
  <Box
    as='video'
    controls
    autoPlay
    muted
    loop
    width={LazyImage.defaultProps.width}
    {...props}
  />
)
