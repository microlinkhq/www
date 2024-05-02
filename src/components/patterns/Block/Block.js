import React from 'react'

import { Container, Flex, Box } from 'components/elements'
import { theme } from 'theme'

const Block = ({
  blockOne,
  blockTwo,
  bottom = null,
  top = null,
  flexDirection = 'row',
  children = <Box ml={4} mr={4} />,
  width,
  ...props
}) => (
  <Container {...props}>
    {top}
    <Flex
      css={theme({
        justifyContent: 'center',
        flexDirection: ['column', 'column', 'column', flexDirection],
        alignItems: 'center',
        ml: 'auto',
        mr: 'auto',
        width
      })}
    >
      {blockOne}
      {children}
      {blockTwo}
    </Flex>
    {bottom}
  </Container>
)

export default Block
