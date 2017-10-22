import React from 'react'
import {Flex, NavLink} from 'rebass'
import { Twitter } from 'react-feather'

export default props => (
  <Flex is='footer' {...props}>
    <NavLink href='http://jxnblk.com/rebass' children='Documentation' />
    <NavLink href='https://github.com/jxnblk/rebass' children='Contact' />

    <NavLink
      ml='auto'
      href='http://twitter.com/microlinkio'
      children={<Twitter />}
      />
  </Flex>
)
