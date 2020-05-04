import React from 'react'
import { Box, Fixed, Toolbar } from 'components/elements'
import styled from 'styled-components'

import NavContainer from './NavContainer'

import {
  NavBlog,
  NavDocs,
  NavInsights,
  NavLogo,
  NavMeta,
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

export default ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <Fixed
      zIndex={101}
      top={0}
      left={0}
      right={0}
      bg={isDark ? 'black' : 'white'}
    >
      <Box ml='auto' mr='auto'>
        <Toolbar ml={3} mr={3} justifyContent='center'>
          <NavLogo mobile />
          <Nav as='nav' width={300}>
            <NavMeta isDark={isDark} mobile />
            <NavScreenshot isDark={isDark} mobile />
            <NavPdf isDark={isDark} mobile />
            <NavInsights isDark={isDark} />
            <NavPricing isDark={isDark} />
            <NavDocs isDark={isDark} />
            <NavBlog isDark={isDark} />
          </Nav>
        </Toolbar>
      </Box>
    </Fixed>
  )
}
