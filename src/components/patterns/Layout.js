import styled, { ThemeProvider } from 'styled-components'
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

const SkipLinkAnchor = styled.a`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 9999;
  padding: 16px 24px;
  background: var(--link);
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 0 0 4px 0;

  &:focus {
    position: fixed;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    overflow: visible;
    outline: 2px solid var(--link);
    outline-offset: 2px;
  }
`

const SkipLink = () => (
  <SkipLinkAnchor href='#main-content'>Skip to content</SkipLinkAnchor>
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
            mt: 4,
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
