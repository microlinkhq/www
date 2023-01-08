import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'
import React, { useEffect, createElement } from 'react'
import { BreakpointProvider } from 'context/breakpoint'
import { Box, Flex, Hide } from 'components/elements'
import { ThemeProvider } from 'styled-components'
import { Location } from '@gatsbyjs/reach-router'
import { useBreakpoint } from 'components/hook'
import Head from 'components/Head'
import { noop } from 'helpers'

import themeSpec from 'theme'
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
        <Location>
          {({ location }) => {
            return (
              <Flex
                data-breakpoint={breakpoint}
                flexDirection='column'
                onClick={onClick}
                style={style}
                css={`
                  overflow-x: hidden;
                  min-height: 100vh;
                `}
              >
                <Head location={location} {...props} />
                <Toolbar as='header' theme={theme} style={style} />
                {createElement(
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
                )}
                <Hide breakpoints={[0]}>
                  <CookiesPolicy className='hidden-print' />
                </Hide>
                {footer && (
                  <Box as='footer' className='hidden-print'>
                    <Footer theme={theme} {...footer} />
                  </Box>
                )}
              </Flex>
            )
          }}
        </Location>
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
