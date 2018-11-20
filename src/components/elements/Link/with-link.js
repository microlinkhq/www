import React from 'react'
import styled from 'styled-components'

const isInternalLink = to => /^\/(?!\/)/.test(to)

const Link = styled.a`
  text-decoration: inherit;
  color: inherit;
`

// TODO: Add prefetching at gatsby v2
// reference: https://github.com/microlinkhq/www/blob/6cef133982a1307cfc123e48dae5d5114e757ee0/src/components/elements/Link/with-link.js#L22
export default ChildComponent => ({
  actively,
  href,
  children,
  onClick,
  ...props
}) => {
  const isInternal = isInternalLink(href)
  const target = isInternal ? '_self' : '_blank'
  const rel = isInternal ? null : 'noopener noreferrer'
  return (
    <ChildComponent {...props}>
      <Link
        href={href}
        children={children}
        onClick={onClick}
        target={target}
        rel={rel}
      />
    </ChildComponent>
  )
}
