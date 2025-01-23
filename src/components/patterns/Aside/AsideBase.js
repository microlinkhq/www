import { Flex, Toggle, Box, Text, Caps } from 'components/elements'
import { TOOLBAR_PRIMARY_HEIGHT } from 'components/elements/Toolbar'
import { transition, borders, colors, space, theme } from 'theme'
import React, { useState, Fragment } from 'react'
import styled, { css } from 'styled-components'
import { withLink } from 'helpers/hoc'
import { noop } from 'helpers/noop'
import { isNot } from 'styled-is'

import NavLink, {
  style as navLinkStyle,
  activeStyle as navLinkActiveStyle
} from './NavLink'

import {
  DEFAULT_ACTIVE_ROUTE_NAME,
  ALL_ROUTES_NAMES,
  ASIDE_WIDTH,
  ROUTES
} from './constants'

const LINK_ICON_CLASSNAME = 'nav-link-icon'

const { isInternalLink } = withLink

const linkStyle = css`
  margin-bottom: ${space[2]};

  > a {
    display: flex;
    align-items: center;

    &:hover,
    &.active {
      .${LINK_ICON_CLASSNAME} {
        opacity: 1;
      }
    }
  }

  .${LINK_ICON_CLASSNAME} {
    width: 16px;
    opacity: 0.6;
    margin-right: ${space[2]};
    transition: opacity ${({ theme }) => theme.transition.medium};
  }
`

const titleStyle = css`
  ${navLinkStyle};

  &:hover {
    ${navLinkActiveStyle};
  }
`

const titleExternalStyle = css`
  ${navLinkStyle};

  &:hover {
    ${navLinkActiveStyle};
    font-weight: normal;
  }
`

const AsideWrapper = styled(Box)`
  position: fixed;
  overflow-y: auto;
  bottom: 0;
  top: ${TOOLBAR_PRIMARY_HEIGHT};
  width: ${ASIDE_WIDTH};
  transition: transform ${transition.medium};

  ${isNot('$isOpen')`
    transform: translateX(-100%);
  `};
  }
`

const Header = props => (
  <Caps css={theme({ mb: 2, color: 'black50' })} {...props} />
)

const Title = ({ children, href, Icon, ...props }) => {
  return (
    <NavLink href={href} actively css={linkStyle}>
      {Icon && <Icon className={LINK_ICON_CLASSNAME} />}
      <Text
        fontWeight='normal'
        css={isInternalLink(href) ? titleStyle : titleExternalStyle}
        {...props}
      >
        {children}
      </Text>
    </NavLink>
  )
}

const Aside = ({
  activeRouteName = DEFAULT_ACTIVE_ROUTE_NAME,
  CloseButton,
  isOpen,
  onChange = noop,
  ...props
}) => {
  const [tree, setTree] = useState(activeRouteName)

  return (
    <AsideWrapper
      as='aside'
      data-aside
      aria-hidden={!isOpen}
      css={theme({
        pt: [0, 0, 0, 5],
        pr: [0, 0, 0, '14px']
      })}
      $isOpen={isOpen}
      {...props}
    >
      <Flex
        data-aside-header
        as='header'
        css={theme({
          justifyContent: 'end',
          alignItems: 'center',
          flexDirection: ['column', 'column', 'column', 'row'],
          mt: [0, 0, 0, 3],
          pb: 3,
          mb: 4,
          ml: [3, 3, 3, 0],
          pl: [2, 2, 2, 0]
        })}
      >
        {CloseButton && (
          <Box css={theme({ mb: 4, width: '100%' })}>{CloseButton}</Box>
        )}
        <Toggle
          defaultValue={activeRouteName}
          onChange={value => {
            onChange(value)
            setTree(value)
          }}
        >
          {ALL_ROUTES_NAMES}
        </Toggle>
      </Flex>
      <Box as='section' data-aside-tree css={theme({ pl: 4 })}>
        {ROUTES[tree].map(path => (
          <Box css={theme({ mb: 4 })} key={`${tree}_${path.name}`}>
            <Header>{path.name}</Header>
            {path.posts.map(post => {
              const hasSubEntries = Boolean(post.posts)
              if (!hasSubEntries) {
                return (
                  <Title
                    key={`${tree}_title_${post.name}`}
                    href={post.href}
                    Icon={post.icon}
                  >
                    {post.name}
                  </Title>
                )
              } else {
                return (
                  <Fragment key={`${tree}_subheader_${post.name}`}>
                    <Title key={`${tree}_title_${post.name}`} href={post.href}>
                      {post.name}
                    </Title>
                    <Box
                      data-subtree
                      css={theme({
                        ml: 2,
                        borderLeft: `${borders[1]} ${colors.black05}`
                      })}
                    >
                      {post.posts.map(post => (
                        <Title
                          css={theme({ ml: 3 })}
                          key={`${tree}_subtitle_${post.name}`}
                          href={post.href}
                        >
                          {post.name}
                        </Title>
                      ))}
                    </Box>
                  </Fragment>
                )
              }
            })}
          </Box>
        ))}
      </Box>
    </AsideWrapper>
  )
}

export default Aside
