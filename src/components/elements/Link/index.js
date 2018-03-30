import React from 'react'
import styled from 'styled-components'
import { colors } from 'theme'

import dotted from './dotted'
import solid from './solid'

const base = styled.a`
  text-decoration: none;
  color: ${colors.link};
  font-size: inherit;
`

const determinteTarget = (href = '') =>
  href.startsWith('/') ? '_self' : '_blank'

const createLink = ChildComponent => ({
  href,
  external,
  children,
  ...props
}) => (
  <ChildComponent
    href={href}
    target={determinteTarget(href)}
    style={{ cursor: 'pointer' }}
    {...props}
  >
    {children}
  </ChildComponent>
)

export const LinkSolid = createLink(solid)
export const LinkDotted = createLink(dotted)
export const Link = createLink(base)
