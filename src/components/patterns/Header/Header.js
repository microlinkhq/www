import React from 'react'
import { Subhead, Flex, Heading } from 'components/elements'
import { Caption } from 'components/patterns'

export default ({ subtitle, title, caption, ...props }) => {
  const TitleComponnet = title ? Heading : Subhead

  return (
    <Flex
      as='header'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      pb={3}
      px={0}
      {...props}
    >
      <TitleComponnet px={0} children={title || subtitle} />
      {caption && <Caption>{caption}</Caption>}
    </Flex>
  )
}
