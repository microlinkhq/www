'use strict'

const webpack = require('webpack')
const path = require('path')

exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat([`markdown-in-js/babel`])
  }
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  // See https://github.com/FormidableLabs/react-live/issues/5
  config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/))

  return config.merge({
    resolve: {
      root: path.resolve(__dirname, './src')
    }
  })
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const blogIndexTemplate = path.resolve(`src/layouts/blog.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
          {
            allJavascriptFrontmatter {
              edges {
                node {
                  frontmatter {
                    title
                    date
                    page
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const posts = result.data.allJavascriptFrontmatter.edges
          .map((data, index) => ({ ...data.node.frontmatter }))
          .filter(({ page }) => page !== true)
          .sort((a, b) => new Date(b.date) - new Date(a.date))

        return Promise.resolve(
          createPage({
            path: '/blog',
            component: blogIndexTemplate,
            context: { posts }
          })
        )
      })
    )
  })
}
