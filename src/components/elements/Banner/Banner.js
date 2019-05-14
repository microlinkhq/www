import React from 'react'
import { Badge, Link, Text, Flex } from 'components/elements'

const Banner = ({ href, children }) => (
  <Flex
    pl='10px'
    pr={3}
    borderRadius={'15px'}
    justifyContent='center'
    alignItems='center'
    bg='pinkest'
  >
    <Link href={href}>
      <Text color='gray9' fontSize={1}>
        <Badge>new</Badge>
        <Text fontSize={[0, 1]} ml={2} as='span'>
          {children}
        </Text>
      </Text>
    </Link>
  </Flex>
)

export default Banner
