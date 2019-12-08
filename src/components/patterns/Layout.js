import React, { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'

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

const scrollToHash = () => {
  const { hash } = window.location
  if (hash) {
    const node = document.querySelector(hash)
    if (node) {
      setTimeout(() => window.scroll.animateScroll(node))
    }
  }
}

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
      <Site>
        <Head {...props} />
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
    </ThemeProvider>
  )
}

Layout.defaultProps = {
  footer: true
}

export default Layout
