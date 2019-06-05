/* global IntersectionObserver */

import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { noop } from 'lodash'
import { Link } from 'gatsby'

import { External as ExternalIcon } from 'components/icons'
import Flex from '../../components/elements/Flex'
import { transition, colors } from 'theme'

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
  transition: stroke ${transition.medium};
  &:hover {
    > svg {
      stroke: ${colors.link};
    }
  }
`

const externalIconStyle = `
position: relative;
top: 7px;
`

const createOnClick = ({
  eventAction,
  eventCategory,
  onClick = noop,
  href
}) => {
  if (!(eventAction && eventCategory)) return onClick

  return event => {
    if (window.ga) {
      window.ga(`send`, `event`, {
        eventAction,
        eventCategory,
        eventLabel: href,
        transport: 'beacon'
      })
    }
    onClick(event)
    return false
  }
}

const Children = ({ children, icon }) => {
  if (!icon) return children

  return (
    <Flex css={linkIconWrapper}>
      {children}
      <ExternalIcon width='14px' css={externalIconStyle} ml={1} />
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

const withlink = ChildComponent => ({
  icon = false,
  actively,
  href,
  children,
  target,
  rel,
  'data-event-action': eventAction,
  'data-event-category': eventCategory,
  ...props
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const isInternal = isInternalLink(href)
  const partiallyActive = actively === 'partial'
  const onClick = createOnClick({ eventAction, eventCategory, ...props })

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
      <ChildComponent {...props} onClick={onClick}>
        <GatsbyLink to={href} children={children} getProps={getProps} />
      </ChildComponent>
    )
  }

  return (
    <ChildComponent {...props} onClick={onClick}>
      <ExternalLink href={href} target={target} rel={rel} onClick={onClick}>
        <Children icon={icon} children={children} />
      </ExternalLink>
    </ChildComponent>
  )
}

withlink.isInternalLink = isInternalLink

export default withlink
