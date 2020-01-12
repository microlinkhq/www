import { Toolbar, Box, Fixed } from 'components/elements'
import React from 'react'

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

export default ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <Fixed zIndex={101} top={0} left={0} right={0}>
      <Box px={3} ml='auto' mr='auto'>
        <Toolbar
          aria-label='Primary Navigation'
          ml='auto'
          mr='auto'
          justifyContent='space-between'
        >
          <NavContainer as='nav'>
            <NavLogo />

            <NavEmbed isDark={isDark} />
            <NavScreenshot isDark={isDark} />
            <NavPdf isDark={isDark} />
          </NavContainer>
          <NavContainer as='nav'>
            <NavPricing isDark={isDark} />
            <NavDocs isDark={isDark} />
            <NavChat isDark={isDark} />
          </NavContainer>
        </Toolbar>
      </Box>
    </Fixed>
  )
}
