import React from 'react'
import { Container, Flex, Box } from 'components/elements'

const Block = ({
  blockOne,
  blockTwo,
  bottom = null,
  top = null,
  flexDirection = 'row',
  ...props
}) => (
  <Container {...props}>
    {top}
    <Flex
      as='section'
      pt={[0, 0, 0, 4]}
      pb={[0, 0, 0, 4]}
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
    {bottom}
  </Container>
)

export default Block
