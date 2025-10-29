import Box from 'components/elements/Box'
import Toolbar from 'components/elements/Toolbar'
import styled from 'styled-components'
import { theme } from 'theme'
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

const ToolbarMobile = ({ isDark }) => {
  return (
    <Box
      as='header'
      css={theme({
        position: 'fixed',
        zIndex: 101,
        top: 0,
        left: 0,
        right: 0,
        background: isDark ? 'black' : 'white'
      })}
    >
      <Box>
        <Toolbar as='nav'>
          <NavMicrolinkLogo isMobile />
          <Nav as='ul'>
            <NavDocs isDark={isDark} css={theme({ pl: 0 })} />
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
