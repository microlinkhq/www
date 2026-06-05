import React from 'react'

export const graphql = () => {}
export const useStaticQuery = () => ({})
export const navigate = () => {}

export const Link = React.forwardRef(
  ({ to, getProps, activeClassName, activeStyle, innerRef, ...rest }, ref) => (
    <a href={to} ref={ref || innerRef} {...rest} />
  )
)

Link.displayName = 'GatsbyLink'
