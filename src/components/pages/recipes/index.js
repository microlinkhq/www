import { Image, Unavatar } from 'components/elements'
import { Microlink } from 'components/logos'

import React from 'react'

export const Logo = ({ height, width, domain, logo }) => {
  const sizeProps = { height, width }

  if (domain === 'microlink.io' || logo) {
    return (
      <Image.Component
        alt={`${domain} logo`}
        src={logo || Microlink.logoUri}
        {...sizeProps}
      />
    )
  }

  return <Unavatar query={`microlink/${domain}`} {...sizeProps} />
}
