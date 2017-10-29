import React from 'react'
import {Image} from 'rebass'

export default props => (
  <Image
    src='/logo_trim.png'
    style={{
      display: 'inline',
      position: 'relative'
    }}
    {...props}
  />
)
