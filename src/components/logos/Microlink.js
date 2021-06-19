import React from 'react'
import { Image } from 'components/elements'
import { cdnUrl } from 'helpers'

const Microlink = props => (
  <Image
    alt='microlink logo'
    width='inherit'
    height='inherit'
    lazy={false}
    src={cdnUrl('logo/logo.svg')}
    {...props}
  />
)

export default Microlink
