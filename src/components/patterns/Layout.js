import { ThemeProvider } from 'styled-components'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Toolbar from './Toolbar/Toolbar'
import Footer from './Footer/Footer'
import { noop } from 'helpers/noop'
import React from 'react'

import { useBreakpoint } from 'components/hook/use-breakpoint'

import themeSpec, { theme as themeProp } from 'theme'

import { TOOLBAR_PRIMARY_HEIGHT } from 'components/elements/Toolbar'

import 'styles/main.scss'

const TOOLBAR_HEIGHTS = [
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_PRIMARY_HEIGHT,
  TOOLBAR_PRIMARY_HEIGHT
]

const SkipLink = () => (
  <a
    href='#main-content'
    css={{
      position: 'absolute',
      left: '-9999px',
      top: 'auto',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      zIndex: 9999,
      padding: '16px 24px',
      background: 'var(--link)',
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
      borderRadius: '0 0 4px 0',
      '&:focus': {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        outline: '2px solid var(--link)',
        outlineOffset: '2px'
      }
    }}
  >
    Skip to content
  </a>
)

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
      <SkipLink />
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
          id='main-content'
          tabIndex={-1}
          css={themeProp({
            pt: TOOLBAR_HEIGHTS,
            px: [3, 3, 0],
            flex: 1,
            overflow: 'visible',
            '&:focus': {
              outline: 'none'
            }
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
