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

const onView = (node, fn) => {
  if (!node) return
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const isBeingIntersecting =
        entry.isIntersecting || entry.intersectionRatio > 0
      fn(isBeingIntersecting)
    })
  })
  observer.observe(node, { threshold: 0.25 })
}

let OBSERVER_ACTIVE = false

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
      onView(node, isBeingIntersecting => {
        OBSERVER_ACTIVE = href
        setIsIntersecting(isBeingIntersecting)
      })
    }, [])
  }

  const getProps = ({ isPartiallyCurrent, isCurrent }) => {
    const isActive = partiallyActive ? isPartiallyCurrent : isCurrent
    if (!isActive && !isIntersecting) return null
    if (isIntersecting && OBSERVER_ACTIVE !== href) return null
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
