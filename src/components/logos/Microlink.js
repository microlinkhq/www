import React from 'react'
import { Image } from 'components/elements'
import { cdnUrl } from 'helpers'

export default props => (
  <Image
    width='inherit'
    height='inherit'
    lazy={false}
    src={cdnUrl('logo/logo.svg')}
    {...props}
  />
)
