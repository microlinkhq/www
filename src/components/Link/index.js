import React from 'react'

import dotted from './dotted'
import solid from './solid'

const createLink = ChildComponent => ({to, external, children, ...props}) => (
  <ChildComponent
    href={to}
    target={external ? '_blank' : '_self'}
    style={{cursor: 'pointer'}}
    {...props}
  >
    {children}
  </ChildComponent>
)

export const LinkSolid = createLink(solid)
export const LinkDotted = createLink(dotted)
