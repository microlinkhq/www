import React from 'react'

import { Container, Flex, Box } from 'components/elements'

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
      justifyContent='center'
      flexDirection={['column', 'column', 'column', flexDirection]}
      alignItems='center'
      ml='auto'
      mr='auto'
      width={width}
    >
      {blockOne}
      {children}
      {blockTwo}
    </Flex>
    {bottom}
  </Container>
)

export default Block
