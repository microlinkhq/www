'use strict'

const path = require('path')

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `markdown-in-js/babel`
  })
}

exports.onCreateWebpackConfig = ({ loaders, stage, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /^(xor|props)$/,
            use: loaders.null()
          },
          {
            test: /react-json-view/,
            use: loaders.null()
          }
        ]
      }
    })
  }

  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
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
        if (result.errors) return reject(result.errors)

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
