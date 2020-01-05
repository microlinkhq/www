import React, { Component } from 'react'
import { Toolbar, Box, Fixed } from 'components/elements'

import NavContainer from './NavContainer'

import {
  NavChat,
  NavDocs,
  NavEmbed,
  NavLogo,
  NavPricing,
  NavScreenshot,
  NavPdf
} from './ToolbarLinks'

export default class extends Component {
  render () {
    return (
      <Fixed zIndex={101} top={0} left={0} right={0} bg='white'>
        <Box px={3} ml='auto' mr='auto'>
          <Toolbar
            aria-label='Primary Navigation'
            ml='auto'
            mr='auto'
            justifyContent='space-between'
            {...this.props}
          >
            <NavContainer as='nav'>
              <NavLogo />

              <NavEmbed />
              <NavScreenshot />
              <NavPdf />
            </NavContainer>
            <NavContainer as='nav'>
              <NavPricing />
              <NavDocs />
              <NavChat />
            </NavContainer>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
