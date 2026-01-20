import { ThemeProvider } from 'styled-components'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Toolbar from './Toolbar/Toolbar'
import Footer from './Footer/Footer'
import { noop } from 'helpers/noop'
import React from 'react'

import { useBreakpoint } from 'components/hook/use-breakpoint'

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
  ...props
}) => {
  const breakpoint = useBreakpoint()

  return (
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
        <Box
          as='main'
          css={themeProp({
            pt: TOOLBAR_HEIGHTS,
            px: [3, 0],
            flex: 1,
            overflow: 'visible'
          })}
          {...props}
        >
          {children}
        </Box>
        {footer && (
          <Box as='footer' className='hidden-print'>
            <Footer isDark={isDark} {...footer} />
          </Box>
        )}
      </Flex>
    </ThemeProvider>
  )
}

export default Layout
