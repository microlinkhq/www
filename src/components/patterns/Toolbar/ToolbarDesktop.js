import React, { Component } from 'react'
import { Toolbar, Box, Fixed } from 'components/elements'
import { Microlink } from 'components/logos'

import NavContainer from './NavContainer'
import NavLink from './NavLink'

export default class extends Component {
  render () {
    return (
      <Fixed zIndex={2} top={0} left={0} right={0}>
        <Box px={3} boxShadow={0} mx='auto' bg='white'>
          <Toolbar mx='auto' justifyContent='space-between' {...this.props}>
            <NavContainer is='nav'>
              <NavLink
                width={['32px', '48px']}
                display='flex'
                fontWeight='normal'
                fontSize={0}
                pr={[2, 3]}
                href='/'
              >
                <Microlink />
              </NavLink>
              <NavLink
                fontWeight='normal'
                fontSize={0}
                pr={[2, 3]}
                children='About'
                href='/'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                pr={[2, 3]}
                children='Features'
                href='/'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                pr={[2, 3]}
                children='Pricing'
                href='/'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                children='Blog'
                href='/'
              />
            </NavContainer>
            <NavContainer is='nav'>
              <NavLink
                fontWeight='normal'
                fontSize={0}
                pr={[2, 3]}
                children='Docs'
                href='/'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                children='Chat'
                href='/'
              />
            </NavContainer>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
