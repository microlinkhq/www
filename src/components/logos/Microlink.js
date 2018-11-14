import React from 'react'
import { Img } from 'components/elements'

export default props => (
  <Img
    src='/logo.svg'
    style={{
      display: 'inline',
      position: 'relative'
    }}
    {...props}
  />
)
