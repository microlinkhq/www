import React, { useEffect, Fragment } from 'react'
import { ThemeProvider } from 'styled-components'

import Head from 'components/Head'
import { Box } from 'components/elements'
import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'
import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'

import theme from 'theme'
import 'styles/main.scss'

if (global.window) {
  window.scroll = require('smooth-scroll')('a[href*="#"]')
}

const Layout = ({ footer, children, ...props }) => {
  useEffect(() => {
    const { hash } = window.location
    if (hash) {
      const node = document.querySelector(hash)
      if (node) {
        setTimeout(() => window.scroll.animateScroll(node), 450)
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head {...props} />
        <Toolbar />
        <Box pt={TOOLBAR_HEIGHT}>{children}</Box>
        <CookiesPolicy />
        {footer && <Footer />}
        <script
          crossOrigin='anonymous'
          src='https://polyfill.io/v3/polyfill.min.js?features=fetch-polyfill'
        />
      </Fragment>
    </ThemeProvider>
  )
}

Layout.defaultProps = {
  footer: true
}

export default Layout
