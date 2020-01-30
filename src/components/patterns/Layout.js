import { ThemeProvider } from 'styled-components'
import React, { createElement, useEffect } from 'react'
import { Location } from '@reach/router'

import Head from 'components/Head'
import { Box, Flex, Hide } from 'components/elements'
import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'
import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'
import { isSSR } from 'helpers'
import noop from 'lodash/noop'

import themeSpec from 'theme'
import 'styles/main.scss'

if (!isSSR) {
  window.scroll = require('smooth-scroll')('a[href*="#"]', {
    speed: themeSpec.speed.slowly
  })
}

const scrollToHash = () =>
  window.scroll && window.scroll.animateScroll(window.location)

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
  useEffect(scrollToHash, [])

  return (
    <ThemeProvider theme={themeSpec}>
      <Location>
        {({ location }) => {
          return (
            <Flex
              flexDirection='column'
              onClick={onClick}
              style={style}
              className={theme}
              css={`
                min-height: 100vh;
              `}
            >
              <Head location={location} {...props} />
              <Toolbar theme={theme} style={style} />
              {createElement(component, {
                justifyContent,
                alignItems,
                display,
                flexDirection,
                pt: TOOLBAR_HEIGHT,
                children,
                style: { flex: 1 }
              })}
              <Hide breakpoints={[0]}>
                <CookiesPolicy />
              </Hide>
              {footer && (
                <Box>
                  <Footer theme={theme} />
                </Box>
              )}
            </Flex>
          )
        }}
      </Location>
    </ThemeProvider>
  )
}

Layout.defaultProps = {
  theme: 'light',
  footer: true,
  onClick: noop
}

export default Layout
