import React, { Component } from 'react'
import { Box, Fixed, Toolbar } from 'components/elements'
import { Microlink } from 'components/logos'
import { smoothScroll } from 'helpers'
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
        <Box boxShadow={0} mx='auto' bg='white'>
          <Toolbar mx={3} justifyContent='center' {...this.props}>
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
            <Nav as='nav'>
              <NavLink
                prefetch={false}
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Features'
                href='/#features'
                onClick={smoothScroll('features')}
              />
              <NavLink
                prefetch={false}
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Pricing'
                href='/#pricing'
                onClick={smoothScroll('pricing')}
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Blog'
                actively
                href='/blog'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Docs'
                href='https://docs.microlink.io'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                px={2}
                children='Chat'
                href='https://chat.microlink.io'
              />
            </Nav>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
