import React from 'react'
import { Badge, Link, Text, Flex } from 'components/elements'

const Banner = ({ href, children }) => (
  <Flex
    as='section'
    px={'12px'}
    borderRadius={5}
    justifyContent='center'
    alignItems='center'
    bg='pinkest'
  >
    <Link href={href}>
      <Badge>new</Badge>
      <Text
        fontWeight='normal'
        as='span'
        color='gray8'
        fontSize={[0, 1]}
        ml={2}
        children={`${children}  »`}
      />
    </Link>
  </Flex>
)

export default Banner
