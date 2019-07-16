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
        <Box boxShadow={0} mx='auto' bg='white'>
          <Toolbar mx={3} justifyContent='center' {...this.props}>
            <NavLink
              data-event-category='Toolbar'
              data-event-action='Logo'
              width={'32px'}
              display='flex'
              px={2}
              href='/'
              style={{ flex: '0 0 auto' }}
            >
              <Microlink />
            </NavLink>
            <Nav as='nav' width='240px'>
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Principles'
                px={2}
                children='Principles'
                href='/#principles'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Pricing'
                px={2}
                children='Pricing'
                href='/#pricing'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Blog'
                px={2}
                children='Blog'
                href='/blog'
                actively='partial'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Embed'
                px={2}
                children='Embed'
                href='/embed'
                actively='partial'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Screenshot'
                px={2}
                children='Screenshot'
                href='/screenshot'
                actively='partial'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Docs'
                px={2}
                children='Docs'
                href='/docs/sdk/getting-started/overview/'
                actively='partial'
              />
              <NavLink
                data-event-category='Toolbar'
                data-event-action='Chat'
                px={2}
                children='Chat'
                href='/chat'
                actively
              />
            </Nav>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
