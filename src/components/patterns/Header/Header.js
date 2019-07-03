import React from 'react'
import { Flex, Heading } from 'components/elements'
import { Caption } from 'components/patterns'

export default ({ title, caption }) => {
  return (
    <Flex
      as='header'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      pb={[2, 3]}
      px={0}
    >
      <Heading px={0} children={title} />
      <Caption>{caption}</Caption>
    </Flex>
  )
}
