import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Flex, Toggle, Box, Text, Caps } from 'components/elements'
import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'

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

const Aside = ({ children }) => {
  return (
    <AsideWrapper as='aside' pt={5} pr={'28px'} width={ASIDE_WIDTH}>
      <Flex justifyContent='center' mt={3} pb={3} mb={4}>
        <Toggle children={['SDK', 'MQL', 'API']} defaultValue={'SDK'} />
      </Flex>
      <Box pl={2}>
        {children.map(path => (
          <Box mb={4} key={path.name}>
            <Header>{path.name}</Header>
            {path.posts.map(post => {
              const hasSubEntries = Boolean(post.posts)
              if (!hasSubEntries) {
                return (
                  <Title
                    key={`title_${post.name}`}
                    href={post.href}
                    children={post.name}
                  />
                )
              } else {
                return (
                  <Fragment key={`subheader_${post.name}`}>
                    <Subheader>{post.name}</Subheader>
                    {post.posts.map(post => (
                      <Title
                        ml={2}
                        key={`subtitle_${post.name}`}
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

export default Aside
