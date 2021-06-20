import { Image, Unavatar } from 'components/elements'
import React from 'react'

export const Logo = ({ height, width, isGeneric, domain, logo }) => {
  const sizeProps = { height, width }

  if (!isGeneric || !logo) {
    return <Unavatar query={domain} {...sizeProps} />
  }

  return <Image alt={`${domain} logo`} src={logo} {...sizeProps} />
}
