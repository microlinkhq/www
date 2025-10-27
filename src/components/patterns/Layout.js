import React, { useEffect, createElement } from 'react'
import { BreakpointProvider } from 'context/breakpoint'
import Toolbar from './Toolbar/Toolbar'
import Footer from './Footer/Footer'
import { ThemeProvider } from 'styled-components'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { useBreakpoint } from 'components/hook/use-breakpoint'
import { noop } from 'helpers/noop'

import themeSpec, { theme as themeProp } from 'theme'

import 'styles/main.scss'

const Layout = ({
  footer = true,
  children,
  onClick = noop,
  style,
  isDark = false,
  component = Box,
  ...props
}) => {
  const breakpoint = useBreakpoint([0, 1, 2, 3])

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
                overflow: 'visible'
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
