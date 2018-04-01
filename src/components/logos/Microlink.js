import React from 'react'
import { Image } from 'rebass'

export default props => (
  <Image
    src='/logo.svg'
    style={{
      display: 'inline',
      position: 'relative'
    }}
    {...props}
  />
)
