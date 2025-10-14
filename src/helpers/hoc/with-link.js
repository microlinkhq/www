/* global IntersectionObserver */

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import FeatherIcon from 'components/icons/Feather'
import { useLocation } from '@gatsbyjs/reach-router'
import styled, { css } from 'styled-components'
import { toRaw, transition, colors } from 'theme'
import { Link as GatsbyLink } from 'gatsby'

import Flex from '../../components/elements/Flex'

const addActiveClass = isActive => (isActive ? { className: 'active' } : null)

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

  useLayoutEffect(() => {
    if (ref.current) {
      const computedStyle = window.getComputedStyle(ref.current)
      const size = toRaw(computedStyle['font-size']) * 0.8
      setSize(size)
    }
  }, [])

  return (
    <Flex ref={ref} css={linkIconWrapper}>
      {children}
      <FeatherIcon icon='arrow-up-right' size={size} />
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
    const isInternal = !href || isInternalLink(href)
    const partiallyActive = actively === 'partial'

    useEffect(() => {
      if (isInternal && actively === 'observer') {
        const node = document.querySelector(getHash(href))
        onView(node, isBeingIntersecting =>
          setIsIntersecting(isBeingIntersecting)
        )
      }
    }, [isInternal, actively, href])

    const getProps = ({ isPartiallyCurrent, isCurrent, location }) =>
      typeof actively === 'function'
        ? addActiveClass(actively({ location }))
        : addActiveClass(
          isIntersecting || partiallyActive ? isPartiallyCurrent : isCurrent
        )

    if (prefetch && isInternal) {
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
