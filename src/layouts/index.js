import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Provider } from 'rebass'
import Link from 'gatsby-link'
import React from 'react'

import theme from '../theme'
import "../styles/main.scss"

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet defaultTitle={data.site.siteMetadata.name} titleTemplate={`%s | ${data.site.siteMetadata.name}`}>
      <meta name="twitter:site" content={data.site.siteMetadata.name} />
      <meta name="og:type" content="website" />
      <meta name="og:site_name" content={data.site.siteMetadata.name} />
    </Helmet>
    
    <Provider theme={theme}>
      {children()}
    </Provider>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        name,
        twitter
      }
    }
  }
`