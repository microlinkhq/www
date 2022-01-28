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
  flags: {
    FAST_DEV: true
  },
  siteMetadata: {
    // Basic
    name: 'Microlink',
    author: 'Microlink HQ',
    headline: 'Turns websites into data',
    description:
      'Enter a URL, receive information. Normalize metadata. Get HTML markup. Take a screenshot. Identify tech stack. Generate a PDF. Automate web scraping. Run Lighthouse.',
    siteUrl: SITE_URL,
    canonicalUrl: CANONICAL_URL,
    twitter: '@microlinkhq',
    image: new URL('logo/banner.jpeg', CDN_URL).toString(),
    logo: new URL('logo/trim.png', CDN_URL).toString(),
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
        sassOptions: {
          precision: 8
        },
        postCssPlugins: require('./postcss.config').plugins
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
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: CANONICAL_URL
      }
    },
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    'gatsby-plugin-advanced-sitemap',
    'gatsby-plugin-vercel'
  ].filter(Boolean)
}
