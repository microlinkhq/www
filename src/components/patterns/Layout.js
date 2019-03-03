import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'

import Head from 'components/Head'
import { Box } from 'components/elements'
import { TOOLBAR_SIZE } from 'components/elements/Toolbar'
import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'

import theme from 'theme'
import 'styles/main.scss'

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Head />
      <Toolbar />
      <Box pt={TOOLBAR_SIZE}>{children}</Box>
      <CookiesPolicy />
      <Footer />
    </Fragment>
  </ThemeProvider>
)
