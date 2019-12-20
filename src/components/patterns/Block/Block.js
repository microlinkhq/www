import React from 'react'
import { Container, Flex, Box } from 'components/elements'

const Block = ({
  blockOne,
  blockTwo,
  bottom = null,
  top = null,
  flexDirection = 'row',
  children = <Box ml={4} mr={4} />,
  pt = [0, 0, 0, 4],
  pb = [0, 0, 0, 4],
  ...props
}) => (
  <Container {...props}>
    {top}
    <Flex
      as='section'
      pt={pt}
      pb={pb}
      justifyContent='center'
      flexDirection={['column', 'column', 'column', flexDirection]}
      alignItems='center'
      ml='auto'
      mr='auto'
    >
      {blockOne}
      {children}
      {blockTwo}
    </Flex>
    {bottom}
  </Container>
)

export default Block
