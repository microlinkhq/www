import React from 'react'
import { LinkBase } from './base'
import { LinkSolid } from './solid'

import InputIcon from '../Input/InputIcon'
import Flex from '../Flex'

const getDomain = url => {
  try {
    return new URL(url).hostname
  } catch (_) {
    return null
  }
}

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
        <Flex as='span' alignItems='center' css={{ display: 'inline-flex' }}>
          <InputIcon width='16px' height='16px' mr={1} query={domain} />
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
