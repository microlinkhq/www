import {Flex, Fixed, Toolbar, NavLink} from 'rebass'
import React from 'react'

import Changelog from './Changelog'

const CustomNavLink = NavLink.extend`
  text-transform: uppercase;
  &:hover {
    background-color: rgba(0, 0, 0, 0.063);
  }
`

const CustomToolbar = Toolbar.extend`
  justify-content: center;
  box-shadow: rgb(206, 212, 218) 0 -5px 15px 0;
`

const NavBar = props => (
  <Fixed zIndex={2} top={0} left={0} right={0}>
    <CustomToolbar bg='transparent' {...props}>
      <CustomNavLink
        fontSize='12px'
        px={[2, 3]}
        href='#home'
        children='Home'
      />

      <CustomNavLink
        fontSize='12px'
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

      <CustomNavLink
        fontSize='12px'
        px={[2, 3]}
        href='#pricing'
        children='Pricing'
      />

      <CustomNavLink
        fontSize='12px'
        px={[2, 3]}
        href='https://medium.com/microlink'
        target='_blank'
        children='Blog'
      />

      <CustomNavLink
        fontSize='12px'
        px={[2, 3]}
        href='https://chat.microlink.io'
        target='_blank'
        children='Chat'
      />
    </CustomToolbar>
  </Fixed>
)

export default NavBar
