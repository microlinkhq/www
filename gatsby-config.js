module.exports = {
  siteMetadata: {
    name: 'microlink',
    twitter: '@microlinkio',
    apiEndpoint: 'http://localhost:3000/1.0'
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-netlify`,
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
        trackingId: `UA-93349937-2`
      }
    },
    `gatsby-plugin-offline`
  ]
}
