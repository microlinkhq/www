/* global graphql */

import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Provider } from 'rebass'
import React from 'react'

import theme from '../theme'
import '../styles/main.scss'

const TemplateWrapper = ({ children, data, ...props }) => {
  const {apiEndpoint, name} = data.site.siteMetadata

  return (
    <div>
      <Helmet defaultTitle={name} titleTemplate={`%s | ${name}`}>
        <meta name='twitter:site' content={name} />
        <meta name='og:type' content='website' />
        <meta name='og:site_name' content={name} />
      </Helmet>

      <Provider theme={theme}>
        {children({...props, apiEndpoint})}
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
        name,
        twitter,
        apiEndpoint
      }
    }
  }
`
