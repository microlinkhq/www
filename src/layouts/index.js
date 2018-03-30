/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Provider } from 'rebass'
import { Box, Container, Main, Section } from 'components/elements'
import { NavBar, Footer } from 'components/patterns'

import theme from 'theme'
import 'styles/main.scss'

const TemplateWrapper = ({ children, data, ...props }) => {
  const {
    siteUrl,
    title,
    ogImage,
    ogVideo,
    description,
    twitter,
    ...metadata
  } = data.site.siteMetadata

  return (
    <Main>
      <Helmet
        defaultTitle={`${title} | ${description}`}
        titleTemplate={`%s | ${title}`}
        meta={[
          { itemProp: 'name', content: title },
          { itemProp: 'description', content: description },
          { itemProp: 'image', content: ogImage },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:site', content: twitter },
          { name: 'twitter:image', content: ogImage },
          { name: 'twitter:creator', content: twitter },
          { name: 'twitter:label1', value: 'API' },
          { name: 'twitter:data1', value: 'api.microlink.io' },
          { name: 'twitter:label2', value: 'Documentation' },
          { name: 'twitter:data2', value: 'docs.microlink.io' },
          { name: 'twitter:creator', content: twitter },
          { property: 'og:url', content: siteUrl },
          { property: 'og:video:secure_url', content: ogVideo },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:image', content: ogImage },
          { property: 'og:site_name', content: title },
          { property: 'og:type', content: 'website' }
        ]}
      />

      <Provider theme={theme}>
        <NavBar />
        <Box py='56px'>{children({ ...props, ...metadata })}</Box>
        <Section bg='#10111B' color='gray1'>
          <Container py={[3, 4, 5]} px={[0, 0, 5]}>
            <Footer />
          </Container>
        </Section>
      </Provider>
    </Main>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
        ogImage
        ogVideo
        twitter
        apiEndpoint
        paymentEndpoint
        paymentApiKey
        stripeKey
      }
    }
  }
`
