import { Toolbar, Footer } from 'components/patterns'
import React, { useEffect, createElement } from 'react'
import { BreakpointProvider } from 'context/breakpoint'
import { ThemeProvider } from 'styled-components'
import { Box, Flex } from 'components/elements'
import { useBreakpoint } from 'components/hook'
import { noop } from 'helpers'

import themeSpec, { themeCss } from 'theme'

import 'styles/main.scss'

import {
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_SECONDARY_HEIGHT
} from 'components/elements/Toolbar'

const TOOLBAR_HEIGHTS = [
  TOOLBAR_PRIMARY_HEIGHT,
  `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${TOOLBAR_SECONDARY_HEIGHT})`,
  `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${TOOLBAR_SECONDARY_HEIGHT})`,
  `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${TOOLBAR_SECONDARY_HEIGHT})`
]

const Layout = ({
  footer,
  children,
  onClick,
  style,
  theme,
  display,
  justifyContent,
  alignItems,
  flexDirection,
  component = Box,
  ...props
}) => {
  const breakpoint = useBreakpoint([0, 1, 2, 3])
  const toolbarHeight = TOOLBAR_HEIGHTS[breakpoint]

  useEffect(() => {
    const slug = window.location.hash
    if (slug) {
      const el = document.querySelector(slug)
      if (el) el.scrollIntoView()
    }
  }, [])

  return (
    <BreakpointProvider value={breakpoint}>
      <ThemeProvider theme={themeSpec}>
        <Flex
          data-breakpoint={breakpoint}
          onClick={onClick}
          style={style}
          css={themeCss({
            flexDirection: 'column',
            'overflow-x': 'hidden',
            'min-height': '100vh'
          })}
        >
          <Toolbar as='header' theme={theme} style={style} />
          {/* {createElement(
            component,
            {
              as: 'main',
              justifyContent,
              alignItems,
              display,
              flexDirection,
              pt: toolbarHeight,
              style: { flex: 1 }
            },
            children
          )} */}
          {/* {footer && (
            <Box as='footer' className='hidden-print'>
              <Footer theme={theme} {...footer} />
            </Box>
          )} */}
        </Flex>
      </ThemeProvider>
    </BreakpointProvider>
  )
}

Layout.defaultProps = {
  theme: 'light',
  footer: true,
  onClick: noop
}

export default Layout
