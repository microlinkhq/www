'use strict'

const { getCurrentBranchName, getLastModifiedDate } = require('git-jiggy')
const { createFilePath } = require('gatsby-source-filesystem')
const recipes = require('@microlink/recipes')
const { kebabCase, map } = require('lodash')
const { getDomain } = require('tldts')
const { URL } = require('url')
const path = require('path')

const demoLinksData = require('./data/demo-links.json')

const RECIPES_BY_FEATURES_KEYS = Object.keys(
  require('@microlink/recipes/by-feature')
)

const { CDN_URL } = require('./env')

const getLastEdited = async filepath => {
  let date

  try {
    date = await getLastModifiedDate(filepath)
  } catch (err) {
    date = new Date().toISOString()
  }

  return date
}

const getBranchName = async () => {
  let result = 'master'
  try {
    result = await getCurrentBranchName()
  } catch (_) {}

  return result.replace('HEAD', 'master')
}

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
    createScreenshotDemoPages({ createPage, demoLinksData }),
    createRecipesPages({ createPage, recipes })
  ])
}

const createRecipesPages = async ({ createPage, recipes }) => {
  const pages = map(recipes, async (recipe, key) => {
    const slug = kebabCase(key)
    const route = `/recipes/${slug}`

    const isGeneric = RECIPES_BY_FEATURES_KEYS.includes(key)
    const url = isGeneric ? 'https://microlink.io' : recipe.info.examples[0]
    const domain = getDomain(url)

    const code = `const mql = require('@microlink/mql')

const ${key} = ${recipe.toString()}

const result = await ${key}('${recipe.info.examples[0]}')
console.log(result)`

    return createPage({
      path: route,
      component: path.resolve('./src/templates/recipe.js'),
      context: { slug, code, domain, isGeneric, url, key, ...recipe.info }
    })
  })
  return Promise.all(pages)
}

const createScreenshotDemoPages = async ({ createPage, demoLinksData }) => {
  const pages = map(demoLinksData, async demoLink => {
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
