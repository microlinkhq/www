/* global graphql */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { Box, Metadata } from 'components/elements'
import { TOOLBAR_SIZE } from 'components/elements/Toolbar'
import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'

import theme from 'theme'
import 'styles/main.scss'

const IndexLayout = ({ children, data, ...props }) => {
  const {
    paymentEndpoint,
    paymentApiKey,
    stripeKey,
    ...metadata
  } = data.site.siteMetadata

  return (
    <Fragment>
      <Metadata {...metadata} />
      <ThemeProvider theme={theme}>
        <main>
          <Toolbar />
          <Box pt={TOOLBAR_SIZE}>
            {children({
              ...props,
              paymentEndpoint,
              paymentApiKey,
              stripeKey,
              metadata
            })}
          </Box>
          <CookiesPolicy />
          <Footer />
        </main>
      </ThemeProvider>
    </Fragment>
  )
}

IndexLayout.propTypes = {
  children: PropTypes.func
}

export default IndexLayout
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
        image
        video
        twitter
        paymentEndpoint
        paymentApiKey
        stripeKey
        siteName
        logo
      }
    }
  }
`
