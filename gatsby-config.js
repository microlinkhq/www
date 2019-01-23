'use strict'

const url = require('url')

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
    url: SITE_URL,
    description:
      'Extract structured data from any website. Enter an URL, receive information. Get relevant information from any link & easily create beautiful previews.',
    twitter: '@microlinkio',
    image: url.resolve(SITE_URL, '/preview.jpg'),
    logo: url.resolve(SITE_URL, '/logo-trim.png'),
    video: url.resolve(SITE_URL, '/preview.mp4'),
    gif: url.resolve(SITE_URL, '/preview.gif'),

    // Slack previsualization
    dataLabel1: 'API',
    dataLabel2: 'Documentation',
    dataValue1: 'api.microlink.io',
    dataValue2: 'docs.microlink.io',

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
        path: `${__dirname}/src/pages/blog/`,
        name: 'posts'
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: GOOGLE_ANALYTICS_ID
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
    `gatsby-plugin-netlify`
  ]
}
