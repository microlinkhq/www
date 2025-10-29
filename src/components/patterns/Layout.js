import React, { useEffect, createElement } from 'react'
import { ThemeProvider } from 'styled-components'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Toolbar from './Toolbar/Toolbar'
import Footer from './Footer/Footer'
import { noop } from 'helpers/noop'

import {
  BreakpointProvider,
  useBreakpoint
} from 'components/hook/use-breakpoint'

import themeSpec, { theme as themeProp } from 'theme'

import {
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_SECONDARY_HEIGHT
} from 'components/elements/Toolbar'

import 'styles/main.scss'

const TOOLBAR_HEIGHTS = [
  TOOLBAR_PRIMARY_HEIGHT,
  `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${TOOLBAR_SECONDARY_HEIGHT})`,
  `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${TOOLBAR_SECONDARY_HEIGHT})`,
  `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${TOOLBAR_SECONDARY_HEIGHT})`
]

const Layout = ({
  footer = true,
  children,
  onClick = noop,
  style,
  isDark = false,
  component = Box,
  ...props
}) => {
  const breakpoint = useBreakpoint()
  const toolbarHeight = TOOLBAR_HEIGHTS[breakpoint]

  useEffect(() => {
    const slug = window.location.hash
    if (slug) {
      const el = document.querySelector(slug)
      if (el) el.scrollIntoView()
    }
  }, [])

  return (
    <BreakpointProvider>
      <ThemeProvider theme={themeSpec}>
        <Flex
          data-breakpoint={breakpoint}
          onClick={onClick}
          style={style}
          css={themeProp({
            flexDirection: 'column',
            'overflow-x': 'hidden',
            'min-height': '100vh'
          })}
        >
          <Toolbar as='header' isDark={isDark} style={style} />
          {createElement(
            component,
            {
              as: 'main',
              style: {
                flex: 1,
                overflow: 'visible',
                paddingTop: toolbarHeight
              },
              ...props
            },
            children
          )}
          {footer && (
            <Box as='footer' className='hidden-print'>
              <Footer isDark={isDark} {...footer} />
            </Box>
          )}
        </Flex>
      </ThemeProvider>
    </BreakpointProvider>
  )
}

export default Layout
