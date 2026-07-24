import { theme, shadows } from 'theme'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import {
  SECTION_MAX_WIDTH,
  SECTION_PX,
  SECTION_PY
} from 'components/patterns/CustomerStory/primitives'

import { FEATURE_TOC } from '../features'
import { PlanTag } from '../primitives'

export const FeatureBreadcrumbs = ({ name }) => (
  <Flex
    as='nav'
    aria-label='Breadcrumb'
    css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}
  >
    <Link
      href='/features'
      css={theme({
        color: 'secondary',
        fontSize: 1,
        fontWeight: 'bold',
        textDecoration: 'none'
      })}
    >
      Features
    </Link>
    <Text as='span' aria-hidden='true' css={theme({ color: 'black30' })}>
      /
    </Text>
    <Text
      as='span'
      css={theme({ color: 'secondary', fontSize: 1, fontWeight: 'bold' })}
    >
      {name}
    </Text>
  </Flex>
)

export const PlanSupportBar = ({ plans }) => (
  <Flex
    css={theme({
      mt: [3, 3, 4, 4],
      p: [3, 3, 3, 3],
      bg: 'white',
      border: 1,
      borderColor: 'black10',
      borderRadius: 3,
      alignItems: ['flex-start', 'flex-start', 'center', 'center'],
      flexDirection: ['column', 'column', 'row', 'row'],
      gap: [3, 3, 4, 4],
      flexWrap: 'wrap'
    })}
    style={{ boxShadow: shadows[0] }}
  >
    <Text
      css={theme({
        fontFamily: 'mono',
        fontSize: 0,
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        flexShrink: 0
      })}
    >
      Supported in
    </Text>
    <Flex
      css={theme({
        gap: [3, 3, 4, 4],
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      })}
    >
      {plans.map(({ plan, description }) => (
        <Flex key={plan} css={theme({ gap: 2, alignItems: 'flex-start' })}>
          <PlanTag>{plan}</PlanTag>
          <Text css={theme({ fontSize: 1, color: 'black70', lineHeight: 2 })}>
            {description}
          </Text>
        </Flex>
      ))}
    </Flex>
  </Flex>
)

const TocLink = styled('a')`
  ${theme({
    display: 'block',
    color: 'black60',
    fontSize: 1,
    lineHeight: 2,
    textDecoration: 'none',
    py: 1,
    borderLeft: 2,
    borderLeftColor: 'transparent',
    pl: 3
  })}
  transition: color 150ms ease, border-color 150ms ease;

  &[data-active='true'] {
    ${theme({
      color: 'secondary',
      borderLeftColor: 'secondary',
      fontWeight: 'bold'
    })}
  }

  &:hover {
    ${theme({ color: 'secondary' })}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const FeatureToc = ({ items = FEATURE_TOC }) => {
  const [activeId, setActiveId] = useState(items[0]?.id)

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return undefined

    const Observer = window.IntersectionObserver
    if (!Observer) return undefined

    const observer = new Observer(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  return (
    <Box
      as='nav'
      aria-label='On this page'
      css={theme({
        display: ['none', 'none', 'none', 'block'],
        position: 'sticky',
        top: 5,
        alignSelf: 'flex-start',
        width: '100%',
        maxWidth: '200px'
      })}
    >
      <Text
        css={theme({
          fontFamily: 'mono',
          fontSize: 0,
          fontWeight: 'bold',
          color: 'black50',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          pb: 3
        })}
      >
        On this page
      </Text>
      {items.map(({ id, label }) => (
        <TocLink
          key={id}
          href={`#${id}`}
          data-active={activeId === id ? 'true' : 'false'}
        >
          {label}
        </TocLink>
      ))}
    </Box>
  )
}

export const FeaturePageShell = ({ toc = FEATURE_TOC, children }) => (
  <Box
    css={theme({
      width: '100%',
      maxWidth: SECTION_MAX_WIDTH,
      mx: 'auto',
      px: SECTION_PX,
      display: 'grid',
      gridTemplateColumns: ['1fr', '1fr', '1fr', 'minmax(0, 1fr) 200px'],
      gap: [0, 0, 0, 5],
      alignItems: 'start'
    })}
  >
    <Box css={theme({ minWidth: 0, width: '100%' })}>{children}</Box>
    <FeatureToc items={toc} />
  </Box>
)

export const FeatureSection = ({ id, children, ...props }) => (
  <Box
    as='section'
    id={id}
    css={theme({
      py: SECTION_PY,
      width: '100%',
      scrollMarginTop: 5
    })}
    {...props}
  >
    {children}
  </Box>
)
