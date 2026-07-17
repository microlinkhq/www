import styled, { ThemeProvider } from 'styled-components'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Toolbar from './Toolbar/Toolbar'
import Footer from './Footer/Footer'
import { noop } from 'helpers/noop'
import React from 'react'

import { useBreakpoint } from 'components/hook/use-breakpoint'

import themeSpec, { theme as themeProp } from 'theme'

import { TOOLBAR_PRIMARY_HEIGHTS } from 'components/elements/Toolbar'

import 'styles/main.scss'

const SkipLinkAnchor = styled.a`
  position: absolute;
  top: auto;
  left: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
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
    clip: auto;
    clip-path: none;
    white-space: normal;
    outline: 2px solid var(--link);
    outline-offset: 2px;
  }
`

const SkipLink = () => (
  <SkipLinkAnchor href='#main-content'>Skip to content</SkipLinkAnchor>
)

const Root = styled(Flex)`
  ${themeProp({
    flexDirection: 'column',
    'overflow-x': 'clip',
    'min-height': '100vh'
  })}
`

const Main = styled(Box)`
  ${themeProp({
    pt: TOOLBAR_PRIMARY_HEIGHTS,
    mt: [0, 0, 4],
    px: [3, 3, 0],
    flex: 1,
    overflow: 'visible',
    '&:focus': {
      outline: 'none'
    }
  })}
`

const Layout = ({
  footer = true,
  children,
  onClick = noop,
  style,
  ...props
}) => {
  const breakpoint = useBreakpoint()

  return (
    <ThemeProvider theme={themeSpec}>
      <SkipLink />
      <Root data-breakpoint={breakpoint} onClick={onClick} style={style}>
        <Toolbar as='header' style={style} />
        <Main as='main' id='main-content' tabIndex={-1} {...props}>
          {children}
        </Main>
        {footer && (
          <Box as='footer' className='hidden-print'>
            <Footer {...footer} />
          </Box>
        )}
      </Root>
    </ThemeProvider>
  )
}

export default Layout
