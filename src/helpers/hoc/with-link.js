/* global IntersectionObserver */

import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Flex from '../../components/elements/Flex'
import { External as ExternalIcon } from 'components/icons'
import { transition, colors } from 'theme'
import { lighten } from 'polished'

const isInternalLink = to => /^\/(?!\/)/.test(to)

const getHash = href => href.replace('/#', '#')

const linkStyle = css`
  text-decoration: inherit;
  color: inherit;
`

const ExternalLink = styled('a')`
  ${linkStyle}
`

ExternalLink.defaultProps = {
  rel: 'noopener noreferrer',
  target: '_blank'
}

const GatsbyLink = styled(Link)`
  ${linkStyle}
`

const linkIconWrapper = css`
  display: inline-flex;
  transition: stroke ${transition.medium};
  &:hover {
    > svg {
      stroke: ${lighten(0.15, colors.link)};
    }
  }
`

const Children = ({ children, icon }) => {
  if (!icon) return children

  return (
    <Flex alignItems='center' css={linkIconWrapper}>
      {children}
      <ExternalIcon width='14px' ml={1} />
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

const External = Component => ({
  href,
  icon = false,
  target,
  rel,
  children,
  ...props
}) => {
  return (
    <Component {...props}>
      <ExternalLink href={href} target={target} rel={rel}>
        <Children icon={icon} children={children} />
      </ExternalLink>
    </Component>
  )
}

export const withLink = Component => {
  const ExternalLink = External(Component)

  return ({ actively, href, children, ...props }) => {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const isInternal = isInternalLink(href)
    const partiallyActive = actively === 'partial'

    useEffect(() => {
      if (actively === 'observer') {
        const node = document.querySelector(getHash(href))
        onView(node, isBeingIntersecting =>
          setIsIntersecting(isBeingIntersecting)
        )
      }
    }, [])

    const getProps = ({ isPartiallyCurrent, isCurrent }) => {
      const isActive = partiallyActive ? isPartiallyCurrent : isCurrent
      if (!isActive && !isIntersecting) return null
      return { className: 'active' }
    }

    if (isInternal) {
      return (
        <Component {...props}>
          <GatsbyLink to={href} children={children} getProps={getProps} />
        </Component>
      )
    }

    return <ExternalLink href={href} children={children} {...props} />
  }
}

withLink.isInternalLink = isInternalLink
withLink.External = External
