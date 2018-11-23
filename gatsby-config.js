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
  polyfill: false,
  siteMetadata: {
    siteName: 'Microlink',
    siteUrl: SITE_URL,
    title: 'Turns any website into data',
    description:
      'Extract structured data from any website. Enter an URL, receive information. Get relevant information from any link & easily create beautiful previews.',
    image: url.resolve(SITE_URL, '/preview.jpg'),
    video: url.resolve(SITE_URL, '/preview.mp4'),
    gif: url.resolve(SITE_URL, '/preview.gif'),
    logo: url.resolve(SITE_URL, '/logo-trim.png'),
    twitter: '@microlinkio',
    paymentEndpoint: PAYMENT_ENDPOINT,
    paymentApiKey: PAYMENT_API_KEY,
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
