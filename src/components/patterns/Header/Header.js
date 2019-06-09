import React from 'react'
import { Flex, Heading, Subhead } from 'components/elements'

export default ({ title, caption }) => {
  return (
    <Flex
      as='header'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      py={[2, 3]}
      px={0}
    >
      <Heading px={0} children={title} />
      <Subhead
        pt={[2, 0]}
        px={5}
        color='gray'
        textAlign='center'
        children={caption}
      />
    </Flex>
  )
}
