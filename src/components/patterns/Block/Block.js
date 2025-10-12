import React from 'react'

import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import { theme } from 'theme'

const Block = ({
  blockOne,
  blockTwo,
  bottom = null,
  top = null,
  flexDirection = 'row',
  children = <Box css={theme({ mx: 4 })} />,
  width,
  ...props
}) => (
  <Container {...props}>
    {top}
    <Flex
      css={theme({
        justifyContent: 'center',
        flexDirection: ['column', null, null, flexDirection],
        alignItems: 'center',
        mx: 'auto',
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
