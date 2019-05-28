'use strict'

const { getCurrentBranchName, getLastModifiedDate } = require('git-jiggy')
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

const getLastEdited = async filepath => {
  let date

  try {
    date = await getLastModifiedDate(filepath)
  } catch (err) {
    date = new Date().toISOString()
  }

  return date
}

const githubUrl = (() => {
  let branchName
  return async filepath => {
    const branch = branchName || (branchName = await getCurrentBranchName())
    const base = `https://github.com/microlinkhq/www/blob/${branch}`
    const relative = filepath.replace(process.cwd(), '')
    return base + relative
  }
})()

exports.onCreateWebpackConfig = ({ getConfig, loaders, stage, actions }) => {
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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
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
  )

  if (result.errors) {
    console.log(result.errors)
    throw result.errors
  }

  return Promise.all(
    result.data.allMarkdownRemark.edges.map(async ({ node }) => {
      console.log(await githubUrl(node.fileAbsolutePath))
      return createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/index.js`),
        context: {
          githubUrl: await githubUrl(node.fileAbsolutePath),
          lastEdited: await getLastEdited(node.fileAbsolutePath),
          isBlogPage: node.fields.slug.startsWith('/blog/'),
          isDocPage: node.fields.slug.startsWith('/docs/'),
          slug: node.fields.slug
        }
      })
    })
  )
}
