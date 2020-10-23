'use strict'

const { URL } = require('url')
const path = require('path')

const {
  STRIPE_KEY,
  PAYMENT_API_KEY,
  PAYMENT_ENDPOINT,
  GOOGLE_ANALYTICS_ID,
  SITE_URL,
  CANONICAL_URL,
  CDN_URL
} = require('./env')

module.exports = {
  siteMetadata: {
    // Basic
    name: 'Microlink',
    headline: 'Browser as API',
    siteUrl: SITE_URL,
    canonicalUrl: CANONICAL_URL,
    description:
      'Turns websites into data: Enter a URL, receive information. Make any URL embeddable. Capture any website as a snapshot. Generate PDF from any website. Automate web performance.',
    twitter: '@microlinkhq',
    image: new URL('www/home.jpeg', CDN_URL).toString(),
    logo: new URL('logo/trim.jpeg', CDN_URL).toString(),
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
          // require('postcss-focus'),
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
        path: path.join(__dirname, 'data')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src/pages'),
        name: 'pages'
      }
    },
    GOOGLE_ANALYTICS_ID && {
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
        siteUrl: CANONICAL_URL
      }
    },
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    'gatsby-plugin-zeit-now'
  ].filter(Boolean)
}
