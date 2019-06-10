import React from 'react'
import { Banner, Flex } from 'components/elements'

export default ({ href, children, ...props }) => (
  <Flex justifyContent='center' {...props}>
    <Banner href={href}>{children}</Banner>
  </Flex>
)
