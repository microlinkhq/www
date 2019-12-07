import React from 'react'
import { Container, Flex, Box } from 'components/elements'

const Block = ({
  blockOne,
  blockTwo,
  children,
  flexDirection = 'row',
  pt = [0, 0, 0, 4],
  pb = [0, 0, 0, 4],
  ...props
}) => (
  <Container {...props}>
    <Flex
      pt={pt}
      pb={pb}
      as='section'
      justifyContent='center'
      flexDirection={['column', 'column', 'column', flexDirection]}
      alignItems='center'
      ml='auto'
      mr='auto'
    >
      {blockOne}
      <Box ml={4} mr={4} />
      {blockTwo}
    </Flex>
    {children}
  </Container>
)

export default Block
