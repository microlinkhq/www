import React from 'react'
import {Image} from 'rebass'

export default props => (
  <Image
    src='/logo.png'
    style={{
      display: 'inline',
      position: 'relative'
    }}
    {...props}
  />
)
