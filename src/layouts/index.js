/* global graphql */

import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Provider } from 'rebass'
import React from 'react'

import theme from '../theme'
import '../styles/main.scss'

const TemplateWrapper = ({ children, data, ...props }) => {
  const {
    siteUrl,
    title,
    ogImage,
    description,
    twitter,
    ...metadata
  } = data.site.siteMetadata

  return (
    <div>
      <Helmet
        defaultTitle={`${title} | ${description}`} titleTemplate={`%s | ${title}`}
        meta={[
          {itemProp: 'name', content: title},
          {itemProp: 'description', content: description},
          {itemProp: 'image', content: ogImage},
          {name: 'twitter:card', content: 'summary_large_image'},
          {name: 'twitter:title', content: title},
          {name: 'twitter:description', content: description},
          {name: 'twitter:site', content: twitter},
          {name: 'twitter:image', content: ogImage},
          {name: 'twitter:creator', content: twitter},
          {property: 'og:url', content: siteUrl},
          {name: 'og:title', content: title},
          {name: 'og:description', content: description},
          {name: 'og:image', content: ogImage},
          {name: 'og:site_name', content: title},
          {name: 'og:type', content: 'website'}
        ]} />

      <Provider theme={theme}>
        {children({...props, ...metadata})}
      </Provider>
    </div>
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
        twitter
        apiEndpoint
        paymentEndpoint
        paymentApiKey
        stripeKey
      }
    }
  }
`
