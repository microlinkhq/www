'use strict'

const { createFilePath } = require('gatsby-source-filesystem')
const recipes = require('@microlink/recipes')
const { kebabCase, map } = require('lodash')
const { getDomain } = require('tldts')
const { promisify } = require('util')
const path = require('path')

const exec = promisify(require('child_process').exec)
exec.stdout = (...args) => exec(...args).then(({ stdout }) => stdout.trim())

const RECIPES_BY_FEATURES_KEYS = Object.keys(
  require('@microlink/recipes/by-feature')
)

const getLastModifiedDate = filepath =>
  exec.stdout(`git log --max-count=1 --format="%cI" -- ${filepath}`)

const branchName = () => exec.stdout('git rev-parse --abbrev-ref HEAD')

const githubUrl = (() => {
  return async filepath => {
    const base = `https://github.com/microlinkhq/www/blob/${await branchName()}`
    const relative = filepath.replace(process.cwd(), '')
    return base + relative
  }
})()

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      fallback: {
        path: require.resolve('path-browserify')
      }
    },
    // Target modern browsers for smaller bundle size
    target: ['web', 'es2019'],
    optimization: {
      // Only for production builds
      ...(stage === 'build-javascript' && {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Separate vendor bundle for better caching
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true
            },
            // Separate common components
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
              enforce: true
            }
          }
        }
      })
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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return Promise.all([
    createMarkdownPages({ graphql, createPage }),
    createRecipesPages({ createPage, recipes })
  ])
}

const getMqlCode = (recipe, { name }) => `const mql = require('@microlink/mql')

const ${name} = ${recipe.toString()}

const result = await ${name}('${recipe.meta.examples[0]}')

mql.render(result)`

const getFunctionCode = (
  recipe,
  { name }
) => `const mql = require('@microlink/mql')

const code = ${recipe.code}

const ${name} = (url, props) =>
  mql(url, { function: code.toString(), meta: false, ...props })
  .then(({ data }) => data.function)

const result = await ${name}('${recipe.meta.examples[0]}')

mql.render(result)
`

const getCode = (recipe, { name }) =>
  (recipe.code ? getFunctionCode : getMqlCode)(recipe, { name })

const createRecipesPages = async ({ createPage, recipes }) => {
  const pages = map(recipes, async (recipe, recipeName) => {
    const slug = kebabCase(recipeName)
    const route = `/recipes/${slug}`

    const isProvider = !RECIPES_BY_FEATURES_KEYS.includes(recipeName)
    const url = isProvider && recipe.meta.examples[0]
    const domain = url ? getDomain(url) : 'microlink.io'
    const description = isProvider
      ? `Interact with ${domain}`
      : recipe.meta.description

    const code = getCode(recipe, { name: recipeName })

    return createPage({
      path: route,
      component: path.resolve('./src/templates/recipe.js'),
      context: {
        ...recipe.meta,
        slug,
        code,
        domain,
        isProvider,
        url,
        key: recipeName,
        description
      }
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
    const slug = node.fields.slug.replace(/\/+$/, '')

    return createPage({
      path: slug,
      component: path.resolve('./src/templates/index.js'),
      context: {
        githubUrl: await githubUrl(node.fileAbsolutePath),
        lastEdited: await getLastModifiedDate(node.fileAbsolutePath),
        isBlogPage: node.fields.slug.startsWith('/blog/'),
        isDocPage: node.fields.slug.startsWith('/docs/'),
        slug: node.fields.slug
      }
    })
  })

  return Promise.all(pages)
}
