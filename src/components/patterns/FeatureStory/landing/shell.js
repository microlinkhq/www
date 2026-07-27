import { theme, SECTION_VERTICAL_SPACING } from 'theme'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { SECTION_PX } from 'components/patterns/CustomerStory/primitives'

import { FEATURE_TOC } from '../features'

const FEATURE_SHELL_MAX_WIDTH = '1200px'
const FEATURE_TOC_WIDTH = '200px'

const breadcrumbStyle = {
  fontFamily: 'mono',
  color: 'secondary',
  fontSize: 1,
  fontWeight: 'bold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase'
}

export const FeatureBreadcrumbs = ({ name }) => (
  <Flex
    as='nav'
    aria-label='Breadcrumb'
    css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}
  >
    <Link
      href='/features'
      css={theme({
        ...breadcrumbStyle,
        textDecoration: 'none'
      })}
    >
      Features
    </Link>
    <Text
      as='span'
      aria-hidden='true'
      css={theme({
        fontFamily: 'mono',
        color: 'gray5',
        letterSpacing: '0.12em'
      })}
    >
      /
    </Text>
    <Text as='span' css={theme(breadcrumbStyle)}>
      {name}
    </Text>
  </Flex>
)

const PlanTable = styled(Text)`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;

  ${theme({ mt: [4, 4, 4, 4] })}

  th,
  td {
    ${theme({ p: 2, textAlign: 'left', verticalAlign: 'top' })}
  }

  th:first-child,
  td:first-child {
    padding-left: 0;
    white-space: nowrap;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  thead th {
    ${theme({
      fontWeight: 'bold',
      color: 'black',
      borderBottom: 1,
      borderBottomColor: 'black10'
    })}
  }

  tbody tr {
    ${theme({ borderBottom: 1, borderBottomColor: 'black05' })}
  }

  tbody tr:last-child {
    border-bottom: none;
  }
`

export const PlanSupportBar = ({ plans }) => (
  <PlanTable as='table'>
    <thead>
      <tr>
        <Text as='th' css={theme({ fontFamily: 'sans', fontSize: 1 })}>
          Plan
        </Text>
        <Text as='th' css={theme({ fontFamily: 'sans', fontSize: 1 })}>
          Included
        </Text>
      </tr>
    </thead>
    <tbody>
      {plans.map(({ plan, description }) => (
        <tr key={plan}>
          <Text
            as='td'
            css={theme({
              fontFamily: 'sans',
              fontSize: 1,
              fontWeight: 'bold',
              color: 'black'
            })}
          >
            {plan}
          </Text>
          <Text
            as='td'
            css={theme({
              fontFamily: 'sans',
              fontSize: 1,
              color: 'black80',
              lineHeight: 2
            })}
          >
            {description}
          </Text>
        </tr>
      ))}
    </tbody>
  </PlanTable>
)

const TocLink = styled('a')`
  ${theme({
    display: 'block',
    fontFamily: 'sans',
    color: 'gray7',
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
    const observer = new window.IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    items.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

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
        pr: 4,
        borderRight: 1,
        borderRightColor: 'gray2'
      })}
    >
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
      maxWidth: FEATURE_SHELL_MAX_WIDTH,
      mx: 'auto',
      px: SECTION_PX,
      display: 'grid',
      gridTemplateColumns: [
        '1fr',
        '1fr',
        '1fr',
        `${FEATURE_TOC_WIDTH} minmax(0, 1fr)`
      ],
      columnGap: [0, 0, 0, 5],
      alignItems: 'start'
    })}
  >
    <FeatureToc items={toc} />
    <Box
      css={theme({
        minWidth: 0,
        width: '100%',
        maxWidth: '960px',
        fontFamily: 'sans'
      })}
    >
      {children}
    </Box>
  </Box>
)

export const FeatureSection = ({ id, children, ...props }) => (
  <Box
    as='section'
    id={id}
    css={theme({
      py: SECTION_VERTICAL_SPACING,
      width: '100%',
      scrollMarginTop: 5
    })}
    {...props}
  >
    {children}
  </Box>
)
