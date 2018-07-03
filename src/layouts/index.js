/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'rebass'
import { Box, Container, Main, Section, Metadata } from 'components/elements'
import { NavBar, Footer } from 'components/patterns'

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
    <Main>
      <Metadata {...metadata} />
      <Provider theme={theme}>
        <NavBar />
        <Box py='56px'>
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
        <Section bg='#10111B' color='gray1'>
          <Container py={[3, 4, 5]} px={0} maxWidth='900px'>
            <Footer />
          </Container>
        </Section>
      </Provider>
    </Main>
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
      }
    }
  }
`
