'use strict'

const url = require('url')
const isProduction = process.env.NODE_ENV === 'production'

const API_ENDPOINT_PROD = 'https://api.microlink.io'
const API_ENDPOINT_DEV = 'http://localhost:3000'
const SITE_URL = 'https://microlink.io'

module.exports = {
  siteMetadata: {
    siteUrl: SITE_URL,
    title: 'microlink',
    description: 'Get relevant information from any website.',
    ogImage: url.resolve(SITE_URL, '/preview.png'),
    twitter: '@microlinkio',
    apiEndpoint: isProduction ? API_ENDPOINT_PROD : API_ENDPOINT_DEV
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [
          require('postcss-focus'),
          require('cssnano')({
            autoprefixer: true,
            mergeIdents: true,
            zindex: true,
            discardUnused: true
          })
        ],
        precision: 8
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-108549225-1`
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: SITE_URL
      }
    },
    `gatsby-plugin-netlify`
  ]
}
