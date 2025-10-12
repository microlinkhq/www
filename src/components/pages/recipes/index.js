import Image from 'components/elements/Image/Image'
import Unavatar from 'components/elements/Unavatar/Unavatar'
import { Microlink } from 'components/logos'

import React from 'react'

export const Logo = ({ height = '24px', width = height, domain, logo }) => {
  const sizeProps = { height, width }

  if (domain === 'microlink.io' || logo) {
    return (
      <Image
        alt={`${domain} logo`}
        src={logo || Microlink.logoUri}
        style={{ objectFit: 'contain' }}
        {...sizeProps}
      />
    )
  }

  return <Unavatar query={domain} {...sizeProps} />
}
