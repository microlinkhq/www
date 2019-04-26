import React from 'react'
import styled, { css } from 'styled-components'
import { External as ExternalIcon } from 'components/icons'
import Flex from '../../components/elements/Flex'
import { Link } from 'gatsby'

const linkStyle = css`
  text-decoration: inherit;
  color: inherit;
`

const isInternalLink = to => /^\/(?!\/)/.test(to)

const ExternalLink = styled('a')(linkStyle)

ExternalLink.defaultProps = {
  rel: 'noopener noreferrer',
  target: '_blank'
}

const GatsbyLink = styled(Link)(linkStyle)

const Children = ({ children, icon }) => {
  if (!icon) return children

  return (
    <Flex>
      {children}
      <ExternalIcon
        width='14px'
        css={`
          position: relative;
          top: 7px;
        `}
        ml={1}
      />
    </Flex>
  )
}

export default ChildComponent => ({
  icon = false,
  onClick,
  actively,
  href,
  children,
  target,
  rel,
  partiallyActive,
  ...props
}) => {
  const isInternal = isInternalLink(href)

  if (isInternal) {
    return (
      <ChildComponent {...props}>
        <GatsbyLink
          to={href}
          children={children}
          activeClassName={actively && 'active'}
          partiallyActive={partiallyActive}
        />
      </ChildComponent>
    )
  }

  return (
    <ChildComponent {...props}>
      <ExternalLink href={href} target={target} rel={rel} onClick={onClick}>
        <Children icon={icon} children={children} />
      </ExternalLink>
    </ChildComponent>
  )
}
