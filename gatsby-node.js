'use strict'

const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

const { getLastModifiedDate } = require('git-jiggy')

const getLastEdited = async filepath => {
  let date

  try {
    date = await getLastModifiedDate(filepath)
  } catch (err) {
    date = new Date().toISOString()
  }

  return date
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

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  fileAbsolutePath
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create markdown pages
        return Promise.all(
          result.data.allMarkdownRemark.edges.map(async ({ node }) => {
            return createPage({
              path: node.fields.slug,
              component: path.resolve(`./src/templates/index.js`),
              context: {
                githubUrl:
                  `https://github.com/microlinkhq/www/blob/master` +
                  node.fileAbsolutePath.replace(process.cwd(), ''),
                lastEdited: await getLastEdited(node.fileAbsolutePath),
                isBlogPage: node.fields.slug.startsWith('/blog/'),
                isDocPage: node.fields.slug.startsWith('/docs/'),
                slug: node.fields.slug
              }
            })
          })
        )
      })
    )
  })
}
