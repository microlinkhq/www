import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

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

const Layout = ({ footer, children, ...props }) => {
  useEffect(scrollToHash, [])

  return (
    <ThemeProvider theme={theme}>
      <>
        <Head {...props} />
        <Toolbar />
        <Box pt={TOOLBAR_HEIGHT}>{children}</Box>
        <CookiesPolicy />
        {footer && <Footer />}
      </>
    </ThemeProvider>
  )
}

Layout.defaultProps = {
  footer: true
}

export default Layout
