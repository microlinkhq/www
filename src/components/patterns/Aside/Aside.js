import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Flex, Toggle, Box, Text, Caps } from 'components/elements'
import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'
import { isNot } from 'styled-is'
import { noop } from 'lodash'
import { transition } from 'theme'

import { ASIDE_WIDTH } from './constants'
import NavLink from './NavLink'

const AsideWrapper = styled(Box)`
  position: fixed;
  overflow-y: scroll;
  bottom: 0;
  top: ${TOOLBAR_HEIGHT};
  width: ${ASIDE_WIDTH};
  transition: transform ${transition.medium};

  ${isNot('isOpen')`
    transform: translateX(-100%);
  `};
`

const Header = props => <Caps mb={2} color='gray5' {...props} />

const Title = ({ children, href }) => (
  <NavLink href={href} actively>
    <Text fontWeight='normal' mb={2} children={children} />
  </NavLink>
)

const Subheader = props => <Text mt={3} mb={2} color='gray4' {...props} />

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
      <Flex
        alignItems='center'
        justifyContent={['flex-start', 'center']}
        mt={3}
        pb={3}
        mb={4}
      >
        {CloseButton && (
          <Box mt={1} mr={3}>
            <CloseButton />
          </Box>
        )}
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
                  />
                )
              } else {
                return (
                  <Fragment key={`${tree}_subheader_${post.name}`}>
                    <Subheader>{post.name}</Subheader>
                    {post.posts.map(post => (
                      <Title
                        ml={2}
                        key={`${tree}_subtitle_${post.name}`}
                        href={post.href}
                      >
                        - {post.name}
                      </Title>
                    ))}
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
