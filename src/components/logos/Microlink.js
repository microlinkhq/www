import { Image } from 'components/elements'
import React from 'react'

import logoUri from '../../../static/logo.svg'

const Microlink = props => {
  return (
    <Image.Component
      alt='microlink logo'
      width='inherit'
      height='inherit'
      src={logoUri}
      {...props}
    />
  )
}

Microlink.logoUri = logoUri

export default Microlink
