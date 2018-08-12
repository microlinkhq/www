/* global graphql */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'rebass'
import { Box, Metadata } from 'components/elements'
import { TOOLBAR_SIZE } from 'components/elements/Toolbar'
import { Toolbar, Footer } from 'components/patterns'

import theme from 'theme'
import 'styles/main.scss'

const IndexLayout = ({ children, data, ...props }) => {
  const {
    apiEndpoint,
    apiKey,
    paymentEndpoint,
    paymentApiKey,
    stripeKey,
    ...metadata
  } = data.site.siteMetadata

  return (
    <Fragment>
      <Metadata {...metadata} />
      <Provider is='main' theme={theme}>
        <Toolbar />
        <Box pt={TOOLBAR_SIZE}>
          {children({
            ...props,
            apiEndpoint,
            apiKey,
            paymentEndpoint,
            paymentApiKey,
            stripeKey,
            metadata
          })}
        </Box>
        <Footer />
      </Provider>
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
        apiEndpoint
        apiKey
        paymentEndpoint
        paymentApiKey
        stripeKey
        siteName
        logo
      }
    }
  }
`
