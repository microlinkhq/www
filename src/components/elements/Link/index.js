import React from 'react'
import { LinkBase } from './base'
import { LinkSolid } from './solid'

import { UNAVATAR_FALLBACK, UNAVATAR_TOKEN } from 'helpers/unavatar'
import { radii, space } from 'theme'
import Flex from '../Flex'

const getDomain = url => {
  try {
    return new URL(url).hostname
  } catch (_) {
    return null
  }
}

const LogoIcon = ({ domain }) => (
  <img
    alt=''
    width={16}
    height={16}
    decoding='async'
    src={`https://unavatar.io/domain/${domain}?token=${UNAVATAR_TOKEN}&fallback=${UNAVATAR_FALLBACK}`}
    style={{
      display: 'inline-block',
      width: 16,
      height: 16,
      marginRight: space[1],
      borderRadius: radii[2],
      verticalAlign: 'middle'
    }}
  />
)

export const Link = ({
  variant,
  logoIcon,
  externalIcon,
  href,
  children,
  ...props
}) => {
  const isSolid = variant === 'solid'
  const Component = isSolid ? LinkSolid : LinkBase

  if (logoIcon && href && typeof children === 'string') {
    const domain = getDomain(href)
    if (domain) {
      children = (
        <Flex as='span' css={{ display: 'inline-flex', alignItems: 'center' }}>
          <LogoIcon domain={domain} />
          {children}
        </Flex>
      )
    }
  }

  return (
    <Component externalIcon={externalIcon} href={href} {...props}>
      {children}
    </Component>
  )
}
