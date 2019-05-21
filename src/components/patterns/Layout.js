import React, { useEffect, Fragment } from 'react'
import { ThemeProvider } from 'styled-components'

import Head from 'components/Head'
import { Box } from 'components/elements'
import { TOOLBAR_HEIGHT } from 'components/elements/Toolbar'
import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'

import theme from 'theme'
import 'styles/main.scss'

if (global.window) {
  window.scroll = require('smooth-scroll')('a[href*="#"]', {
    speed: theme.speed.slowly
  })
  window.$crisp = []
  window.CRISP_WEBSITE_ID = '1ad5d211-8699-43f6-add3-578b9e47b922'
  window.CRISP_INITIALIZED = false
}

const addCrisp = () => {
  if (!window.CRISP_INITIALIZED) {
    const script = document.createElement('script')
    script.src = 'https://client.crisp.chat/l.js'
    script.async = 1
    document.getElementsByTagName('head')[0].appendChild(script)
    window.CRISP_INITIALIZED = true
  }
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
  useEffect(() => {
    addCrisp()
    scrollToHash()
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
          src='https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2Cfetch'
        />
      </Fragment>
    </ThemeProvider>
  )
}

Layout.defaultProps = {
  footer: true
}

export default Layout
