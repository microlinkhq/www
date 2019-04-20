import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Flex, Toggle, Box, Text, Caps } from 'components/elements'
import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'
import { noop } from 'lodash'

import NavLink from './NavLink'

export const ASIDE_WIDTH = '280px'

const AsideWrapper = styled(Box)`
  position: fixed;
  overflow-y: scroll;
  bottom: 0;
  top: ${TOOLBAR_HEIGHT};
`

const Header = props => <Caps mb={2} color='gray5' {...props} />

const Title = ({ children, href }) => (
  <NavLink href={href} actively>
    <Text fontWeight='normal' mb={2} children={children} />
  </NavLink>
)

const Subheader = props => <Text mt={3} mb={2} color='gray4' {...props} />

const Aside = ({ routes, activeRouteName, onChange }) => {
  const routeNames = Object.keys(routes)
  const [tree, setTree] = useState(activeRouteName)

  return (
    <AsideWrapper as='aside' pt={5} pr={'28px'} width={ASIDE_WIDTH}>
      <Flex justifyContent='center' mt={3} pb={3} mb={4}>
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
