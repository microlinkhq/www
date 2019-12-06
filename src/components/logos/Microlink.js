import React from 'react'
import { Image } from 'components/elements'

export default props => (
  <Image
    width='inherit'
    height='inherit'
    lazy={false}
    src='https://cdn.microlink.io/logo/logo.svg'
    {...props}
  />
)
