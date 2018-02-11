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
    ogVideo,
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
          {property: 'og:video:secure_url', content: ogVideo},
          {property: 'og:title', content: title},
          {property: 'og:description', content: description},
          {property: 'og:image', content: ogImage},
          {property: 'og:site_name', content: title},
          {property: 'og:type', content: 'website'}
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
