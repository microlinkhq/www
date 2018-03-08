import {Flex, Fixed, Toolbar, NavLink} from 'rebass'
import React from 'react'

import Changelog from './Changelog'

const CustomNavLink = NavLink.extend`
  text-transform: uppercase;
`

const CustomToolbar = Toolbar.extend`
  justify-content: center;
  box-shadow: rgb(206, 212, 218) 0 -5px 15px 0;
`

const NavBar = props => (
  <Fixed z={2} top left right>
    <CustomToolbar bg='transparent' {...props}>
      <CustomNavLink f='12px' px={[2, 3]} href='#home' children='Home' />

      <CustomNavLink
        f='12px'
        pl={0}
        pr={1}
        href='https://docs.microlink.io'
        target='_blank'
        children={
          <Flex px={[2, 3]}>
            <span>Docs</span>
            <Changelog />
          </Flex>
        }
      />

      <CustomNavLink f='12px' px={[2, 3]} href='#pricing' children='Pricing' />

      <CustomNavLink
        f='12px'
        px={[2, 3]}
        href='https://medium.com/microlink'
        target='_blank'
        children='Blog'
      />

      <CustomNavLink
        f='12px'
        px={[2, 3]}
        href='https://chat.microlink.io'
        target='_blank'
        children='Chat'
      />
    </CustomToolbar>
  </Fixed>
)

export default NavBar
