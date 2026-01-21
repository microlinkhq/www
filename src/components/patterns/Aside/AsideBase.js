import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Caps from 'components/elements/Caps'
import {
  TOOLBAR_PRIMARY_HEIGHT,
  DOCS_LAYOUT_OFFSET
} from 'components/elements/Toolbar'
import { transition, borders, colors, space, theme, fontSizes } from 'theme'
import React, { Fragment, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { navigate } from 'gatsby'
import { withLink } from 'helpers/hoc/with-link'
import { noop } from 'helpers/noop'
import { isNot } from 'styled-is'

import Select from 'components/elements/Select/Select'
import NavLink, {
  style as navLinkStyle,
  activeStyle as navLinkActiveStyle
} from './NavLink'

import {
  DEFAULT_ACTIVE_ROUTE_NAME,
  ASIDE_WIDTH,
  ROUTES,
  DOC_TABS
} from './constants'

const LINK_ICON_CLASSNAME = 'nav-link-icon'

const { isInternalLink } = withLink

const linkStyle = css`
  margin-bottom: ${space[2]};

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
  width: ${ASIDE_WIDTH};
  transition: transform ${transition.medium};
  overscroll-behavior: contain;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

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
        as='span'
        css={{
          ...(isInternalLink(href) ? titleStyle : titleExternalStyle),
          fontSize: fontSizes[1]
        }}
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
  // Prevent body scroll when drawer is open (mobile)
  useEffect(() => {
    if (isOpen && CloseButton) {
      // Only lock scroll on mobile (when CloseButton exists)
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, CloseButton])

  return (
    <AsideWrapper
      as='aside'
      data-aside
      role='navigation'
      aria-label='Navigation menu'
      aria-hidden={CloseButton && !isOpen}
      inert={CloseButton && !isOpen ? '' : undefined}
      css={theme({
        top: [TOOLBAR_PRIMARY_HEIGHT, DOCS_LAYOUT_OFFSET],
        pt: [0, 4],
        pr: [0, '14px']
      })}
      $isOpen={isOpen}
      {...props}
    >
      <Box
        data-aside-header
        as='header'
        css={theme({
          px: [3, 0],
          pb: [3, 0]
        })}
      >
        {CloseButton && isOpen && <Box>{CloseButton}</Box>}
        <Box css={theme({ mt: 3, ml: 3, mb: 3, display: ['block', 'none'] })}>
          <Select
            css={theme({ width: '100%' })}
            value={activeRouteName.toUpperCase()}
            onChange={event => {
              const selectedTab = DOC_TABS.find(
                tab => tab.name === event.target.value
              )
              if (selectedTab) {
                navigate(selectedTab.path)
              }
            }}
          >
            {DOC_TABS.map(tab => (
              <option key={tab.name} value={tab.name}>
                {tab.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box as='section' data-aside-tree css={theme({ pl: 3 })}>
          {ROUTES[activeRouteName].map(path => (
            <Box css={theme({ mb: 4 })} key={`${activeRouteName}_${path.name}`}>
              <Header>{path.name}</Header>
              {path.posts.map(post => {
                const hasSubEntries = Boolean(post.posts)
                if (!hasSubEntries) {
                  return (
                    <Title
                      key={`${activeRouteName}_title_${post.name}`}
                      href={post.href}
                      Icon={post.icon}
                    >
                      {post.name}
                    </Title>
                  )
                } else {
                  return (
                    <Fragment key={`${activeRouteName}_subheader_${post.name}`}>
                      <Title
                        key={`${activeRouteName}_title_${post.name}`}
                        href={post.href}
                      >
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
                            key={`${activeRouteName}_subtitle_${post.name}`}
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
      </Box>
    </AsideWrapper>
  )
}

export default Aside
