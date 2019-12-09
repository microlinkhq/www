'use strict'

const { URL } = require('url')

const {
  STRIPE_KEY,
  PAYMENT_API_KEY,
  PAYMENT_ENDPOINT,
  GOOGLE_ANALYTICS_ID,
  SITE_URL,
  CDN_URL
} = require('./env')

const cdnUrl = dist => new URL(dist, CDN_URL).toString()

module.exports = {
  siteMetadata: {
    // Basic
    name: 'microlink.io',
    headline: 'Browser as API',
    siteUrl: SITE_URL,
    description:
      'Extract structured data from any website. Enter an URL, receive information. Get relevant information from any link & easily create beautiful previews.',
    twitter: '@microlinkhq',
    image: cdnUrl('page/home.png'),
    logo: cdnUrl('logo/trim.png'),

    // Slack previsualization
    dataLabel1: 'API',
    dataLabel2: 'Documentation',
    dataValue1: 'api.microlink.io',
    dataValue2: 'microlink.io/docs',

    // additional
    paymentApiKey: PAYMENT_API_KEY,
    paymentEndpoint: PAYMENT_ENDPOINT,
    stripeKey: STRIPE_KEY,
    cdnUrl: CDN_URL
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-javascript-frontmatter',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          require('postcss-focus'),
          require('cssnano')({
            preset: require('cssnano-preset-advanced')
          })
        ],
        precision: 8
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: GOOGLE_ANALYTICS_ID,
        head: false
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap'
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: SITE_URL
      }
    },
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    'gatsby-plugin-netlify',
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect'
  ]
}
