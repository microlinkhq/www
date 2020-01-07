import styled, { ThemeProvider } from 'styled-components'
import React, { useEffect } from 'react'
import { Location } from '@reach/router'

import Head from 'components/Head'
import { Box } from 'components/elements'
import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'
import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'
import { isSSR } from 'helpers'

import theme from 'theme'
import 'styles/main.scss'

if (!isSSR) {
  window.scroll = require('smooth-scroll')('a[href*="#"]', {
    speed: theme.speed.slowly
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

const Layout = ({ footer, children, className, ...props }) => {
  useEffect(scrollToHash, [])

  return (
    <ThemeProvider theme={theme}>
      <Location>
        {({ location }) => {
          return (
            <Site>
              <Head location={location} {...props} />
              <Toolbar />
              <SiteContent pt={TOOLBAR_HEIGHT} className={className}>
                {children}
              </SiteContent>
              <CookiesPolicy />
              {footer && (
                <Box>
                  <Footer />
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
  footer: true
}

export default Layout
