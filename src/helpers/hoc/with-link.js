/* global IntersectionObserver */

import { ExternalLink as ExternalIcon } from 'react-feather'
import { useLocation } from '@gatsbyjs/reach-router'
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

import Flex from '../../components/elements/Flex'
import { transition, colors } from 'theme'

const isInternalLink = to => to === undefined || /^\/(?!\/)/.test(to)

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

  svg {
    transition: stroke ${transition.medium};
  }

  &:hover {
    svg {
      stroke: ${colors.hoverLink};
    }
  }
`

const Children = ({ children, icon }) => {
  if (!icon) return children

  return (
    <Flex alignItems='center' css={linkIconWrapper}>
      {children}
      <Flex ml={1}>
        <ExternalIcon size={14} color={colors.black20} />
      </Flex>
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
    href,
    icon = true,
    isInternal = isInternalLink(href),
    children,
    title,
    ...props
  }) => {
    const rel = isInternal ? undefined : 'noopener noreferrer'
    const target = isInternal ? undefined : '_blank'

    return (
      <Component {...props}>
        <LinkBase title={title} href={href} rel={rel} target={target}>
          <Children icon={icon}>{children}</Children>
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
    href,
    title,
    prefetch = true,
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
      <BaseLink isInternal={isInternal} href={href} title={title} {...props}>
        {children}
      </BaseLink>
    )
  }

  LinkWrapper.Base = BaseLink

  return LinkWrapper
}

withLink.isInternalLink = isInternalLink
withLink.External = withBaseLink
