import React, { Component } from 'react'
import { Box, Fixed, Toolbar } from 'components/elements'
import { Microlink } from 'components/logos'
import styled from 'styled-components'

import NavContainer from './NavContainer'
import NavLink from './NavLink'

const Nav = styled(NavContainer)`
  mask-image: -webkit-linear-gradient(
    to right,
    transparent,
    black 20px,
    black 90%,
    transparent
  );
  mask-image: -moz-linear-gradient(
    to right,
    transparent,
    black 20px,
    black 90%,
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    black 20px,
    black 90%,
    transparent
  );
  -webkit-mask-image: -webkit-linear-gradient(
    to right,
    transparent,
    black 20px,
    black 90%,
    transparent
  );
  -webkit-mask-image: -moz-linear-gradient(
    to right,
    transparent,
    black 20px,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 20px,
    black 90%,
    transparent
  );
`

export default class extends Component {
  render () {
    return (
      <Fixed zIndex={2} top={0} left={0} right={0}>
        <Box boxShadow={3} mx='auto'>
          <Toolbar
            is='header'
            px={0}
            mx={3}
            justifyContent={'center'}
            bg='white'
            color='black50'
            display={'flex'}
            {...this.props}
          >
            <NavLink
              width={'32px'}
              display='flex'
              fontWeight='normal'
              fontSize={0}
              px={2}
              href='/'
              style={{ flex: '0 0 auto' }}
            >
              <Microlink />
            </NavLink>
            <Nav is='nav'>
              <NavLink
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='About'
                href='/'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Features'
                href='/'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Pricing'
                href='/'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Blog'
                href='/'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Docs'
                href='/'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Chat'
                href='/'
              />
            </Nav>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
