'use strict'

const {
  STRIPE_KEY,
  PAYMENT_API_KEY,
  PAYMENT_ENDPOINT,
  GOOGLE_ANALYTICS_ID,
  SITE_URL
} = require('./env')

module.exports = {
  siteMetadata: {
    // Basic
    name: 'Microlink',
    headline: 'Turns any website into data',
    siteUrl: SITE_URL,
    description:
      'Extract structured data from any website. Enter an URL, receive information. Get relevant information from any link & easily create beautiful previews.',
    twitter: '@microlinkhq',
    image: 'https://cdn.microlink.io/page/home.png',
    logo: 'https://cdn.microlink.io/logo/trim.png',

    // Slack previsualization
    dataLabel1: 'API',
    dataLabel2: 'Documentation',
    dataValue1: 'api.microlink.io',
    dataValue2: 'microlink.io/docs',

    // additional
    paymentApiKey: PAYMENT_API_KEY,
    paymentEndpoint: PAYMENT_ENDPOINT,
    stripeKey: STRIPE_KEY
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-javascript-frontmatter`,
    {
      resolve: `gatsby-plugin-sass`,
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
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'pages'
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: GOOGLE_ANALYTICS_ID,
        head: false
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: SITE_URL
      }
    },
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-netlify`,
    `gatsby-redirect-from`,
    `gatsby-plugin-meta-redirect`
  ]
}
