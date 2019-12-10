'use strict'

const { getCurrentBranchName, getLastModifiedDate } = require('git-jiggy')
const { createFilePath } = require('gatsby-source-filesystem')
const { URL } = require('url')
const path = require('path')

const { CDN_URL } = require('./env')

const demoLinksData = require('./data/demo-links.json')

const getLastEdited = async filepath => {
  let date

  try {
    date = await getLastModifiedDate(filepath)
  } catch (err) {
    date = new Date().toISOString()
  }

  return date
}

const getBranchName = async () =>
  (await getCurrentBranchName()).replace('HEAD', 'master')

const githubUrl = (() => {
  let branchName
  return async filepath => {
    const branch = branchName || (branchName = await getBranchName())
    const base = `https://github.com/microlinkhq/www/blob/${branch}`
    const relative = filepath.replace(process.cwd(), '')
    return base + relative
  }
})()

exports.onCreateWebpackConfig = ({ getConfig, loaders, stage, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /.js.flow$/,
          use: loaders.null()
        }
      ]
    }
  })

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
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  return Promise.all([
    createMarkdownPages({ graphql, createPage }),
    createEmbedDemoPages({ createPage, demoLinksData }),
    createScreenshotDemoPages({ createPage, demoLinksData })
  ])
}

const createEmbedDemoPages = async ({ createPage, demoLinksData }) => {
  const pages = demoLinksData.map(async demoLink => {
    const { id, data } = demoLink
    const slug = `/embed/${id}`

    return createPage({
      path: slug,
      component: path.resolve('./src/templates/embed.js'),
      context: { id, data, slug }
    })
  })

  return Promise.all(pages)
}

const createScreenshotDemoPages = async ({ createPage, demoLinksData }) => {
  const pages = demoLinksData.map(async demoLink => {
    const { id, data } = demoLink
    const slug = `/screenshot/${id}`

    data.screenshot = {
      url: new URL(`screenshot/${id}.png`, CDN_URL).toString()
    }

    return createPage({
      path: slug,
      component: path.resolve('./src/templates/screenshot.js'),
      context: { id, data, slug }
    })
  })

  return Promise.all(pages)
}

const createMarkdownPages = async ({ graphql, createPage }) => {
  const query = `
  {
    allMarkdownRemark {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            isPro
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
  `
  const result = await graphql(query)

  if (result.errors) {
    console.log(result.errors)
    throw result.errors
  }

  const pages = result.data.allMarkdownRemark.edges.map(async ({ node }) => {
    const slug = node.fields.slug.replace(/\/$/, '')

    return createPage({
      path: slug,
      component: path.resolve('./src/templates/index.js'),
      context: {
        githubUrl: await githubUrl(node.fileAbsolutePath),
        lastEdited: await getLastEdited(node.fileAbsolutePath),
        isBlogPage: node.fields.slug.startsWith('/blog/'),
        isDocPage: node.fields.slug.startsWith('/docs/'),
        slug: node.fields.slug
      }
    })
  })

  return Promise.all(pages)
}
