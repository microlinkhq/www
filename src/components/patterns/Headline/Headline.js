import React from 'react'
import { Subhead, Flex, Heading } from 'components/elements'
import { Caption } from 'components/patterns'

const constructor = TitleComponnet => ({ title, caption, ...props }) => {
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
      <TitleComponnet px={0} children={title} />
      {caption && <Caption>{caption}</Caption>}
    </Flex>
  )
}

export const Headline = constructor(Heading)
export const SubHeadline = constructor(Subhead)
