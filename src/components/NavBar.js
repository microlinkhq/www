import { Flex, Fixed, Toolbar, NavLink } from 'rebass'
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
    <CustomToolbar bg='transparent' {...props} >
      <CustomNavLink
        f='12px'
        px={[2, 3]}
        href='#home'
        children='Home'
      />
      <CustomNavLink
        f='12px'
        px={[2, 3]}
        href='#features'
        children='Features'
        />

      <CustomNavLink
        f='12px'
        pl={0}
        pr={1}
        href='https://docs.microlink.io'
        target='_blank'
        children={
          <Flex px={[2, 3]}>
            <span>API</span>
            <Changelog />
          </Flex>
        }
        />

      <CustomNavLink
        f='12px'
        px={[2, 3]}
        href='https://microlink.js.org'
        target='_blank'
        children='Developer'
      />

      <CustomNavLink
        f='12px'
        px={[2, 3]}
        href='#pricing'
        children='Pricing'
        />
    </CustomToolbar>
  </Fixed>
)

export default NavBar
