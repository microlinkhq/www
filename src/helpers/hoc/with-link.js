/* global IntersectionObserver */

import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { External as ExternalIcon } from 'components/icons'
import Flex from '../../components/elements/Flex'
import { Link } from 'gatsby'

const linkStyle = css`
  text-decoration: inherit;
  color: inherit;
`

const isInternalLink = to => /^\/(?!\/)/.test(to)

const getHash = href => href.replace('/#', '#')

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

const onView = (node, fn, opts) => {
  if (!window.IntersectionObserver || !node) return

  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => fn(entry.isIntersecting)),
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
      ...opts
    }
  )
  observer.observe(node)
}

export default ChildComponent => ({
  icon = false,
  onClick,
  actively,
  href,
  children,
  target,
  rel,
  ...props
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const isInternal = isInternalLink(href)
  const partiallyActive = actively === 'partial'

  if (actively === 'observer') {
    useEffect(() => {
      const node = document.querySelector(getHash(href))
      onView(node, isBeingIntersecting =>
        setIsIntersecting(isBeingIntersecting)
      )
    }, [])
  }

  const getProps = ({ isPartiallyCurrent, isCurrent }) => {
    const isActive = partiallyActive ? isPartiallyCurrent : isCurrent
    if (!isActive && !isIntersecting) return null
    return { className: 'active' }
  }

  if (isInternal) {
    return (
      <ChildComponent {...props}>
        <GatsbyLink to={href} children={children} getProps={getProps} />
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
