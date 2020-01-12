import styled, { ThemeProvider } from 'styled-components'
import React, { useEffect } from 'react'
import { Location } from '@reach/router'

import Head from 'components/Head'
import { Box, Hide } from 'components/elements'
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

const scrollToHash = () => window.scroll.animateScroll(window.location)

const Site = styled(Box)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const SiteContent = styled(Box)`
  flex: 1;
`

const Layout = ({
  footer,
  children,
  className,
  onClick,
  style,
  theme,
  ...props
}) => {
  useEffect(scrollToHash, [])

  return (
    <ThemeProvider theme={themeSpec}>
      <Location>
        {({ location }) => {
          return (
            <Site onClick={onClick} style={style} className={theme}>
              <Head location={location} {...props} />
              <Toolbar theme={theme} style={style} />
              <SiteContent pt={TOOLBAR_HEIGHT} className={className}>
                {children}
              </SiteContent>
              <Hide breakpoints={[0]}>
                <CookiesPolicy />
              </Hide>
              {footer && (
                <Box>
                  <Footer theme={theme} />
                </Box>
              )}
            </Site>
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
