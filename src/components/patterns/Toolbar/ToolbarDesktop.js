import React, { Component } from 'react'
import { Toolbar, Box, Fixed } from 'components/elements'
import { Microlink } from 'components/logos'
import { smoothScroll } from 'helpers'

import NavContainer from './NavContainer'
import NavLink from './NavLink'

export default class extends Component {
  render () {
    return (
      <Fixed zIndex={2} top={0} left={0} right={0}>
        <Box px={3} boxShadow={0} mx='auto' bg='white'>
          <Toolbar mx='auto' justifyContent='space-between' {...this.props}>
            <NavContainer as='nav'>
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
                prefetch={false}
                fontWeight='normal'
                fontSize={0}
                pr={[2, 3]}
                children='Features'
                href='/#features'
                onClick={smoothScroll('features')}
              />
              <NavLink
                prefetch={false}
                fontWeight='normal'
                fontSize={0}
                pr={[2, 3]}
                children='Pricing'
                href='/#pricing'
                onClick={smoothScroll('pricing')}
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                href='/blog'
                children='Blog'
                actively
              />
            </NavContainer>
            <NavContainer as='nav'>
              <NavLink
                fontWeight='normal'
                fontSize={0}
                pr={[2, 3]}
                children='Docs'
                href='https://docs.microlink.io'
              />
              <NavLink
                fontWeight='normal'
                fontSize={0}
                children='Chat'
                href='https://chat.microlink.io'
              />
            </NavContainer>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
