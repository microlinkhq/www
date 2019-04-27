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
          <Toolbar
            aria-label='Primary Navigation'
            mx='auto'
            justifyContent='space-between'
            {...this.props}
          >
            <NavContainer as='nav'>
              <NavLink
                width={['32px', '48px']}
                display='flex'
                pr={[2, 3]}
                href='/#'
              >
                <Microlink size={'100%'} />
              </NavLink>
              <NavLink
                pr={[2, 3]}
                children='Features'
                href='/#features'
                actively='observer'
              />
              <NavLink
                pr={[2, 3]}
                children='Pricing'
                href='/#pricing'
                actively='observer'
              />
              <NavLink
                href='/docs/sdk/getting-started/overview/'
                children='Docs'
                actively='partial'
              />
              <NavLink href='/blog' children='Blog' actively='partial' />
            </NavContainer>
            <NavContainer as='nav'>
              <NavLink children='Chat' href='https://chat.microlink.io' />
            </NavContainer>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
