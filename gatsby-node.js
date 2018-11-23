'use strict'

const webpack = require('webpack')
const crypto = require('crypto')
const path = require('path')

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'markdown-in-js/babel'
  })
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, './src')]
    },
    plugins: [() => new webpack.IgnorePlugin(/^(xor|props)$/)]
  })

  if (stage === 'build-html') {
    actions.setWebpackConfig({
      rules: {
        test: /react-json-view/,
        loader: 'null-loader'
      }
    })
  }
}

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators
  // const links = await pAll(actions, { concurrency: 1 })

  const toNode = data => {
    const node = {
      data,
      id: 'demolinks',
      parent: '__SOURCE__',
      children: [],
      internal: { type: `DemoLink` }
    }

    node.internal.contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(node))
      .digest(`hex`)

    return node
  }

  createNode(toNode(require('./data/urls')))
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
                    static
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
          .filter(({ static: isStatic }) => isStatic !== true)
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
