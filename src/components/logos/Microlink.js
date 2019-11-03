import React from 'react'
import { Image } from 'components/elements'

export default props => (
  <Image lazy={false} src='https://cdn.microlink.io/logo/logo.svg' {...props} />
)
