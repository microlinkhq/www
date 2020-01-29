import { Flex, Toggle, Box, Text, Caps } from 'components/elements'
import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'
import React, { useState, Fragment } from 'react'
import { shadows, borders, colors } from 'theme'
import styled, { css } from 'styled-components'
import { withLink } from 'helpers/hoc'
import { isNot } from 'styled-is'
import noop from 'lodash/noop'

import { ASIDE_WIDTH } from './constants'

import NavLink, {
  style as navLinkStyle,
  activeStyle as navLinkActiveStyle
} from './NavLink'

const LINK_ICON_CLASSNAME = 'nav-link-icon'

const { isInternalLink } = withLink

const linkStyle = css`
  > a {
    display: flex;
    align-items: center;

    &:hover, &.active {
      .${LINK_ICON_CLASSNAME} {
        opacity: 1;
      }
    }
  }

  .${LINK_ICON_CLASSNAME} {
    width: 16px;
    opacity: 0.6;
    margin-right: 10px;
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
  overflow-y: scroll;
  bottom: 0;
  top: ${TOOLBAR_HEIGHT};
  width: ${ASIDE_WIDTH};
  transition: color ${({ theme }) => theme.transition.medium};

  ${isNot('isOpen')`
    transform: translateX(-100%);
  `};

  @media only screen and (max-width: 576px) {
    box-shadow: ${shadows[0]};
  }
`

const Header = props => <Caps mb={2} color='gray5' {...props} />

const Title = ({ children, href, Icon, ...props }) => {
  return (
    <NavLink mb={2} href={href} actively icon css={linkStyle}>
      {Icon && <Icon className={LINK_ICON_CLASSNAME} />}
      <Text
        fontWeight='normal'
        children={children}
        css={isInternalLink(href) ? titleStyle : titleExternalStyle}
        {...props}
      />
    </NavLink>
  )
}

const Aside = ({
  CloseButton,
  isOpen,
  routes,
  activeRouteName,
  onChange,
  ...props
}) => {
  const routeNames = Object.keys(routes)
  const [tree, setTree] = useState(activeRouteName)

  return (
    <AsideWrapper
      as='aside'
      pl={3}
      pt={[0, 0, 0, 5]}
      pr={[0, 0, 0, '28px']}
      isOpen={isOpen}
      {...props}
    >
      {CloseButton && (
        <Box mt={3} mr={3}>
          <CloseButton />
        </Box>
      )}

      <Flex mt={3} pb={3} mb={4}>
        <Toggle
          children={routeNames}
          defaultValue={activeRouteName}
          onChange={value => {
            onChange(value)
            setTree(value)
          }}
        />
      </Flex>
      <Box pl={2}>
        {routes[tree].map(path => (
          <Box mb={4} key={`${tree}_${path.name}`}>
            <Header>{path.name}</Header>
            {path.posts.map(post => {
              const hasSubEntries = Boolean(post.posts)
              if (!hasSubEntries) {
                return (
                  <Title
                    key={`${tree}_title_${post.name}`}
                    href={post.href}
                    children={post.name}
                    Icon={post.icon}
                  />
                )
              } else {
                return (
                  <Fragment key={`${tree}_subheader_${post.name}`}>
                    <Title
                      key={`${tree}_title_${post.name}`}
                      href={post.href}
                      children={post.name}
                    />
                    <Box ml={2} borderLeft={`${borders[1]} ${colors.black10}`}>
                      {post.posts.map(post => (
                        <Title
                          ml={2}
                          key={`${tree}_subtitle_${post.name}`}
                          href={post.href}
                        >
                          <Text px='4px' color='black10' as='span'>
                            {' '}
                          </Text>
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

Aside.defaultProps = {
  onChange: noop
}

export default Aside
