import { Box, Toolbar } from 'components/elements'
import styled from 'styled-components'
import { themeCss } from 'theme'
import React from 'react'

import NavContainer from './NavContainer'

import {
  NavDocs,
  NavInsights,
  NavLogo,
  NavMeta,
  NavMicrolinkLogo,
  NavPdf,
  NavPricing,
  NavScreenshot,
  NavSDK
} from './ToolbarLinks'

const Nav = styled(NavContainer)`
  mask-image: linear-gradient(
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
    <Box
      as='header'
      css={themeCss({
        position: 'fixed',
        zIndex: 101,
        top: 0,
        left: 0,
        right: 0,
        bg: isDark ? 'black' : 'white'
      })}
    >
      <Box>
        <Toolbar>
          <NavMicrolinkLogo isMobile />
          <Nav>
            <NavDocs isDark={isDark} />
            <NavInsights isDark={isDark} />
            <NavLogo isDark={isDark} isMobile />
            <NavMeta isDark={isDark} isMobile />
            <NavPdf isDark={isDark} isMobile />
            <NavPricing isDark={isDark} />
            <NavScreenshot isDark={isDark} isMobile />
            <NavSDK isDark={isDark} isMobile pr={4} />
          </Nav>
        </Toolbar>
      </Box>
    </Box>
  )
}

export default ToolbarMobile
