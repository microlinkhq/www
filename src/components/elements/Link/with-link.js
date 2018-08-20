import React from 'react'
import styled, { css } from 'styled-components'

import PrefetchLinkBase from 'gatsby-link'

const linkStyle = css`
  text-decoration: inherit;
  color: inherit;
`

const isInternalLink = to => /^\/(?!\/)/.test(to)

const ExternalLink = styled.a`
  ${linkStyle};
`

const PrefetchLink = styled(PrefetchLinkBase)`
  ${linkStyle};
`

export default ChildComponent => ({ actively, href, children, ...props }) => {
  if (isInternalLink(href)) {
    return (
      <ChildComponent {...props}>
        <PrefetchLink
          to={href}
          children={children}
          activeClassName={actively ? 'active' : null}
        />
      </ChildComponent>
    )
  } else {
    return (
      <ChildComponent {...props}>
        <ExternalLink
          href={href}
          children={children}
          target='_blank'
          rel='noopener noreferrer'
        />
      </ChildComponent>
    )
  }
}
