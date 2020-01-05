import React, { Component } from 'react'
import { Box, Fixed, Toolbar } from 'components/elements'
import styled from 'styled-components'

import NavContainer from './NavContainer'

import {
  NavChat,
  NavDocs,
  NavEmbed,
  NavLogo,
  NavPdf,
  NavPricing,
  NavScreenshot
} from './ToolbarLinks'

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
      <Fixed zIndex={101} top={0} left={0} right={0}>
        <Box ml='auto' mr='auto' bg='white'>
          <Toolbar ml={3} mr={3} justifyContent='center' {...this.props}>
            <NavLogo mobile />
            <Nav as='nav' width={300}>
              <NavEmbed mobile />
              <NavScreenshot mobile />
              <NavPdf mobile />
              <NavPricing mobile />
              <NavDocs mobile />
              <NavChat mobile />
            </Nav>
          </Toolbar>
        </Box>
      </Fixed>
    )
  }
}
