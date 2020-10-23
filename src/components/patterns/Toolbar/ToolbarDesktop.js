import { Toolbar, Box, Fixed } from 'components/elements'
import React from 'react'
import { rgba } from 'polished'

import NavContainer from './NavContainer'

import {
  NavBlog,
  NavChangelog,
  NavDocs,
  NavInsights,
  NavLogo,
  NavMeta,
  NavPdf,
  NavPricing,
  NavRecipes,
  NavScreenshot,
  NavSDK
} from './ToolbarLinks'

export default ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <Fixed
      zIndex={101}
      top={0}
      left={0}
      right={0}
      css={`
        backdrop-filter: blur(8px);
        background-color: ${rgba(isDark ? 'black' : 'white', 0.5)};
      `}
    >
      <Box px={3} ml='auto' mr='auto'>
        <Toolbar
          aria-label='Primary Navigation'
          ml='auto'
          mr='auto'
          justifyContent='space-between'
        >
          <NavContainer as='nav'>
            <NavLogo />
            <NavSDK isDark={isDark} />
            <NavMeta isDark={isDark} />
            <NavScreenshot isDark={isDark} />
            <NavPdf isDark={isDark} />
            <NavInsights isDark={isDark} />
            <NavRecipes isDark={isDark} />
          </NavContainer>
          <NavContainer as='nav'>
            <NavPricing isDark={isDark} />
            <NavChangelog isDark={isDark} />
            <NavDocs isDark={isDark} />
            <NavBlog isDark={isDark} />
          </NavContainer>
        </Toolbar>
      </Box>
    </Fixed>
  )
}
