import React from 'react'
import {
  Fixed,
  Toolbar,
  NavLink
} from 'rebass'

const CustomNavLink = NavLink.extend`
  text-transform: uppercase;
  font-size: 12px;
  line-height: 12px;
  opacity: .45;
`

const CustomToolbar = Toolbar.extend`
  justify-content: center;
  box-shadow: rgb(206, 212, 218) 0 -5px 15px 0;
`

const NavBar = props => (
  <Fixed z={2} top left right>
    <CustomToolbar bg='transparent' {...props}>
      <CustomNavLink
        px={3}
        href='/'
        children='Home'
      />
      <CustomNavLink
        px={3}
        href='#features'
        children='Features'
        />
      <CustomNavLink
        px={3}
        href='#pricing'
        children='Pricing'
        />
      <CustomNavLink
        px={3}
        href='https://docs.microlink.io'
        children='Documentation'
        />
      <CustomNavLink
        px={3}
        href='mailto:hello@apex.sh'
        children='Contact'
        />
    </CustomToolbar>
  </Fixed>
)

export default NavBar
