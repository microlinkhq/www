/* global IntersectionObserver */

import { ArrowUpRight as ExternalIcon } from 'react-feather'
import React, { useRef, useState, useEffect } from 'react'
import { useLocation } from '@gatsbyjs/reach-router'
import { toRaw, transition, colors } from 'theme'
import styled, { css } from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

import Flex from '../../components/elements/Flex'

const isInternalLink = (to = '/') => /^\/(?!\/)/.test(to)

const getHash = href => href.replace('/#', '#')

const linkStyle = css`
  text-decoration: inherit;
  color: inherit;
`

const LinkBase = styled('a')`
  ${linkStyle}
`

const PrefetchLink = styled(GatsbyLink)`
  ${linkStyle}
`

const linkIconWrapper = css`
  display: inline-flex;
  align-items: center;

  svg {
    transition: stroke ${transition.medium};
  }

  &:hover {
    svg {
      stroke: ${colors.hoverLink};
    }
  }
`

const Icon = ({ children }) => {
  const [size, setSize] = useState(12)
  const ref = useRef(null)

  useEffect(() => {
    const computedStyle = window.getComputedStyle(ref.current)
    const size = toRaw(computedStyle['font-size']) * 0.8
    setSize(size)
  }, [])

  return (
    <Flex css={linkIconWrapper}>
      {children}
      <ExternalIcon ref={ref} size={size} />
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

const withBaseLink = Component => {
  const BaseLinkWrapper = ({
    children,
    href,
    icon = true,
    isInternal = isInternalLink(href),
    title,
    ...props
  }) => {
    const rel = isInternal ? undefined : 'noopener noreferrer'
    const target = isInternal ? undefined : '_blank'

    return (
      <Component {...props}>
        <LinkBase title={title} href={href} rel={rel} target={target}>
          {icon ? <Icon>{children}</Icon> : children}
        </LinkBase>
      </Component>
    )
  }

  return BaseLinkWrapper
}

export const withLink = Component => {
  const BaseLink = withBaseLink(Component)

  const LinkWrapper = ({
    actively,
    children,
    href = '/',
    title,
    prefetch = true,
    icon,
    ...props
  }) => {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const location = useLocation()
    const isInternal = isInternalLink(href)
    const partiallyActive = actively === 'partial'

    useEffect(() => {
      if (actively === 'observer') {
        const node = document.querySelector(getHash(href))
        onView(node, isBeingIntersecting =>
          setIsIntersecting(isBeingIntersecting)
        )
      }
    }, [actively, href])

    const getProps = ({ isPartiallyCurrent, isCurrent, location }) => {
      if (typeof actively === 'function') {
        const result = actively({ location })
        return result ? { className: 'active' } : null
      }
      const isActive = partiallyActive ? isPartiallyCurrent : isCurrent
      if (!isActive && !isIntersecting) return null
      return { className: 'active' }
    }

    if (prefetch && (!href || isInternal)) {
      return (
        <Component {...props}>
          <PrefetchLink
            to={href || location.pathname}
            getProps={getProps}
            title={title}
          >
            {children}
          </PrefetchLink>
        </Component>
      )
    }

    return (
      <BaseLink
        href={href}
        icon={icon}
        isInternal={isInternal}
        title={title}
        {...props}
      >
        {children}
      </BaseLink>
    )
  }

  LinkWrapper.Base = BaseLink

  return LinkWrapper
}

withLink.isInternalLink = isInternalLink
withLink.External = withBaseLink
