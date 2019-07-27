import React, { Component } from 'react'
import { Toolbar, Box, Fixed } from 'components/elements'

import NavContainer from './NavContainer'

import {
  NavBlog,
  NavChat,
  NavDocs,
  NavEmbed,
  NavGraphql,
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
              <NavGraphql />
              <NavEmbed />
              <NavScreenshot />
              <NavDocs />
              <NavBlog />
            </NavContainer>
            <NavContainer as='nav'>
              <NavChat />
            </NavContainer>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
