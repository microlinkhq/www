import React from 'react'
import { Flex, Heading, Subhead } from 'components/elements'

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
      <Subhead
        pt={[2, 0]}
        px={5}
        lineHeight={[2, 4]}
        color='gray'
        textAlign='center'
        fontWeight='normal'
        fontSize={[2, 4]}
        children={caption}
      />
    </Flex>
  )
}
