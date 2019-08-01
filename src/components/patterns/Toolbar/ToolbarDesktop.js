import React, { Component } from 'react'
import { Toolbar, Box, Fixed } from 'components/elements'

import NavContainer from './NavContainer'

import {
  NavBlog,
  NavChat,
  NavDocs,
  NavEmbed,
  NavLogo,
  NavPricing,
  NavPrinciples,
  NavScreenshot
} from './ToolbarLinks'

export default class extends Component {
  render () {
    return (
      <Fixed zIndex={101} top={0} left={0} right={0}>
        <Box px={3} boxShadow={0} mx='auto' bg='white'>
          <Toolbar
            aria-label='Primary Navigation'
            mx='auto'
            justifyContent='space-between'
            {...this.props}
          >
            <NavContainer as='nav'>
              <NavLogo />
              <NavPrinciples />
              <NavPricing />
              <NavEmbed />
              <NavScreenshot />
            </NavContainer>
            <NavContainer as='nav'>
              <NavDocs />
              <NavBlog />
              <NavChat />
            </NavContainer>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
