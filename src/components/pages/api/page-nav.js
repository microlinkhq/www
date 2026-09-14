import React from 'react'
import styled from 'styled-components'
import { colors, theme, transition } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { useActiveSection } from 'components/hook/use-active-section'
import { TOOLBAR_PRIMARY_HEIGHTS } from 'components/elements/Toolbar'
import { hideScrollbar } from 'helpers/style'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'

import { PAGE_NAV_HEIGHT, TOC } from './shared'

const NavLink = styled('a')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'sans',
    color: 'gray7',
    fontSize: 1,
    lineHeight: 2,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    px: [2, 2, 3, 3],
    py: 2,
    minHeight: '44px',
    minWidth: '44px'
  })}
  transition: color ${transition.medium};

  &[data-active='true'] {
    ${theme({
      color: 'black',
      fontWeight: 'bold'
    })}
  }

  &:hover {
    ${theme({ color: 'black' })}
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const PageNav = () => {
  const activeId = useActiveSection(TOC.map(item => item.id))

  return (
    <Box
      as='nav'
      aria-label='On this page'
      css={theme({
        position: 'sticky',
        top: TOOLBAR_PRIMARY_HEIGHTS,
        zIndex: 10,
        bg: 'white',
        borderBottom: 1,
        borderBottomColor: 'black05',
        minHeight: PAGE_NAV_HEIGHT
      })}
    >
      <Flex
        css={[
          theme({
            width: '100%',
            maxWidth: HOME_CONTENT_WIDTH,
            mx: 'auto',
            px: [3, 3, 4, 4],
            alignItems: 'center',
            gap: [2, 2, 3, 3],
            overflowX: 'auto'
          }),
          hideScrollbar
        ]}
      >
        <Text
          as='span'
          css={theme({
            display: ['none', 'none', 'inline', 'inline'],
            color: 'black40',
            fontSize: 1,
            whiteSpace: 'nowrap',
            pr: 2,
            flexShrink: 0
          })}
        >
          On this page
        </Text>
        {TOC.map(({ id, label }) => (
          <NavLink
            key={id}
            href={`#${id}`}
            data-active={activeId === id ? 'true' : 'false'}
          >
            {label}
          </NavLink>
        ))}
      </Flex>
    </Box>
  )
}
