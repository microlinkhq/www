import React from 'react'

import solid from './solid'
import base from './base'

const determinteTarget = (href = '') =>
  href.startsWith('/') ? '_self' : '_blank'

const createLink = ChildComponent => ({
  href,
  external,
  children,
  ...props
}) => (
  <ChildComponent href={href} target={determinteTarget(href)} {...props}>
    {children}
  </ChildComponent>
)

export const LinkSolid = createLink(solid)
export const Link = createLink(base)
