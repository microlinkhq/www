import { layout, space, theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { useActiveSection } from 'components/hook/use-active-section'
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

const FeatureToc = ({ items = FEATURE_TOC }) => {
  const activeId = useActiveSection(items.map(item => item.id))

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
        maxWidth: layout.large,
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
      scrollMarginTop: space[5]
    })}
    {...props}
  >
    {children}
  </Box>
)
