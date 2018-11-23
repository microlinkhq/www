import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Provider } from 'rebass'
import { Box, Metadata } from 'components/elements'
import { TOOLBAR_SIZE } from 'components/elements/Toolbar'
import { Toolbar, Footer, CookiesPolicy } from 'components/patterns'

import theme from 'theme'
import 'styles/main.scss'

const IndexLayout = ({ children, data, ...props }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            siteUrl
            title
            description
            image
            video
            twitter
            siteName
            logo
          }
        }
      }
    `}
    render={data => {
      return (
        <Fragment>
          <Metadata {...data.site.siteMetadata} />
          <Provider is='main' theme={theme}>
            <Toolbar />
            <Box pt={TOOLBAR_SIZE}>{children}</Box>
            <CookiesPolicy />
            <Footer />
          </Provider>
        </Fragment>
      )
    }}
  />
)

IndexLayout.propTypes = {
  children: PropTypes.node
}

export default IndexLayout
