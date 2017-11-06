import React from 'react'
import { Flex, Fixed, Toolbar, NavLink } from 'rebass'
import Hide from 'hidden-styled'
import Changelog from './Changelog'

const CustomNavLink = NavLink.extend`
  text-transform: uppercase;
  opacity: .45;
`

const CustomToolbar = Toolbar.extend`
  justify-content: center;
  box-shadow: rgb(206, 212, 218) 0 -5px 15px 0;
`

const NavBar = props => (
  <Hide xs sm>
    <Fixed z={2} top left right>
      <CustomToolbar bg='transparent' {...props}>
        <CustomNavLink
          f={'12px'}
          px={3}
          href='#home'
          children='Home'
      />
        <CustomNavLink
          f={'12px'}
          px={3}
          href='#features'
          children='Features'
        />
        <CustomNavLink
          f={'12px'}
          px={3}
          href='#pricing'
          children='Pricing'
        />
        <CustomNavLink
          f={'12px'}
          pl={0}
          pr={1}
          href='https://docs.microlink.io'
          target='_blank'
          children={
            <Flex px={3}>
              <span>Documentation</span>
              <Changelog />
            </Flex>
          }
        />

        <CustomNavLink
          f={'12px'}
          px={3}
          href='mailto:hello@microlink.io'
          children='Contact'
          target='_blank'
        />
      </CustomToolbar>
    </Fixed>
  </Hide>
)

export default NavBar
