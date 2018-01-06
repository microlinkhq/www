'use strict'

const url = require('url')

const { NODE_ENV, STRIPE_KEY, PAYMENT_API_KEY } = process.env

if (!STRIPE_KEY) throw new TypeError('Need to declare a `STRIPE_KEY` env.')
if (!PAYMENT_API_KEY) throw new TypeError('Need to declare a `PAYMENT_API_KEY` env.')

const isProduction = NODE_ENV === 'production'

const API_ENDPOINT = isProduction
  ? 'https://api.microlink.io'
  : 'http://localhost:3000'

const PAYMENT_ENDPOINT = isProduction
  ? 'https://int.microlink.io'
  : 'http://localhost:1337'

const SITE_URL = 'https://microlink.io'

module.exports = {
  siteMetadata: {
    siteUrl: SITE_URL,
    title: 'microlink',
    description: 'Get relevant information from any website.',
    ogImage: url.resolve(SITE_URL, '/preview.png'),
    twitter: '@microlinkio',
    apiEndpoint: API_ENDPOINT,
    paymentEndpoint: PAYMENT_ENDPOINT,
    paymentApiKey: process.env.PAYMENT_API_KEY,
    stripeKey: process.env.STRIPE_KEY
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
