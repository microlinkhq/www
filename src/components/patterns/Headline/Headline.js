import React from 'react'
import { Subhead, Flex, Heading } from 'components/elements'
import { Caption } from 'components/patterns'

import { withSlug } from 'helpers/hoc'

const TitleConstructor = TitleComponnet => ({
  fontSize,
  fontWeight,
  title,
  caption,
  captionExclude,
  slug = false,
  ...props
}) => {
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
      <TitleComponnet
        fontWeight={fontWeight}
        fontSize={fontSize}
        px={0}
        children={title}
        slug={slug}
      />
      {caption && <Caption titleExclude={captionExclude}>{caption}</Caption>}
    </Flex>
  )
}

export const Headline = TitleConstructor(withSlug(Heading))
export const SubHeadline = TitleConstructor(withSlug(Subhead))
