import { Box, Fixed, Toolbar } from 'components/elements'
import styled from 'styled-components'
import React from 'react'

import NavContainer from './NavContainer'

import {
  NavDocs,
  NavInsights,
  NavLogo,
  NavMeta,
  NavPdf,
  NavPricing,
  NavScreenshot,
  NavSDK
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

const ToolbarMobile = ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <Fixed
      as='header'
      zIndex={101}
      top={0}
      left={0}
      right={0}
      bg={isDark ? 'black' : 'white'}
    >
      <Box ml='auto' mr='auto'>
        <Toolbar ml={3} mr={3} justifyContent='center'>
          <NavLogo mobile />
          <Nav>
            <NavSDK isDark={isDark} mobile />
            <NavMeta isDark={isDark} mobile />
            <NavScreenshot isDark={isDark} mobile />
            <NavPdf isDark={isDark} mobile />
            <NavInsights isDark={isDark} />
            <NavPricing isDark={isDark} />
            <NavDocs isDark={isDark} />
          </Nav>
        </Toolbar>
      </Box>
    </Fixed>
  )
}

export default ToolbarMobile
