import React from 'react'
import styled, { css } from 'styled-components'
import { External as ExternalIcon } from 'components/icons'

import PrefetchLinkBase from 'gatsby-link'

const linkStyle = css`
  text-decoration: inherit;
  color: inherit;
`

const isInternalLink = to => /^\/(?!\/)/.test(to)

const ExternalLink = styled('a')(linkStyle)

const PrefetchLink = styled(PrefetchLinkBase)(linkStyle)

export default ChildComponent => ({
  icon = false,
  prefetch = true,
  onClick,
  actively,
  href,
  children,
  ...props
}) => {
  const isInternal = isInternalLink(href)
  const rel = isInternal ? null : 'noopener noreferrer'
  const target = isInternal ? '_self' : '_blank'

  if (prefetch && isInternal) {
    return (
      <ChildComponent {...props}>
        <PrefetchLink to={href} children={children} activeClassName={actively && 'active'} />
      </ChildComponent>
    )
  } else {
    return (
      <ChildComponent {...props}>
        <ExternalLink href={href} target={target} rel={rel} onClick={onClick}>
          {children}
          {!isInternal && icon && (
            <ExternalIcon width='14px' style={{ position: 'relative', top: '2px' }} ml={1} />
          )}
        </ExternalLink>
      </ChildComponent>
    )
  }
}
