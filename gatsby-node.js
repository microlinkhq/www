'use strict'

const { getLastModifiedDate, branchName } = require('./src/helpers/git')
const { createFilePath } = require('gatsby-source-filesystem')
const { title: formatTitle } = require('./src/helpers/title')
const recipes = require('@microlink/recipes')
const { kebabCase, map } = require('lodash')
const {
  readFileSync,
  mkdirSync,
  writeFileSync,
  existsSync
} = require('node:fs')
const { getDomain } = require('tldts')
const path = require('node:path')

const RECIPES_BY_FEATURES_KEYS = Object.keys(
  require('@microlink/recipes/by-feature')
)

const GIT_TIMESTAMPS = JSON.parse(
  readFileSync(path.join(process.cwd(), 'data', 'git-timestamps.json'), 'utf8')
)

const getTimestampForFile = fileNode => {
  const relativePath = path
    .relative(process.cwd(), fileNode.absolutePath)
    .replace(/\\/g, '/')

  return GIT_TIMESTAMPS[relativePath]
}

const githubUrl = (() => {
  return async filepath => {
    const base = `https://github.com/microlinkhq/www/blob/${await branchName()}`
    const relative = filepath.replace(process.cwd(), '')
    return base + relative
  }
})()

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MdxFrontmatter {
      description: String
      authors: [String]
    }
  `)
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      fallback: {
        path: require.resolve('path-browserify')
      }
    }
  })
}

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'File') {
    const lastmod = getTimestampForFile(node) || node.mtime

    if (lastmod) {
      createNodeField({
        node,
        name: 'lastmod',
        value: lastmod
      })
    }
  }

  if (node.internal.type === 'Mdx') {
    // MDX files are now in src/content/ directory
    const slug = createFilePath({ node, getNode, basePath: 'src/content' })
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    const contentFilePath = node.internal.contentFilePath
    if (contentFilePath) {
      try {
        const lastmod = await getLastModifiedDate(contentFilePath)
        createNodeField({
          node,
          name: 'lastmod',
          value: lastmod
        })
      } catch (_) {
        const fileNode = getNode(node.parent)
        if (fileNode && fileNode.mtime) {
          createNodeField({
            node,
            name: 'lastmod',
            value: fileNode.mtime
          })
        }
      }
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return Promise.all([
    createMarkdownPages({ graphql, createPage }),
    createRecipesPages({ createPage, recipes })
  ])
}

exports.onPostBuild = async ({ graphql, reporter }) => {
  await createDocsMarkdownFiles({ graphql, reporter })
}

exports.onCreateDevServer = ({ app }) => {
  const resolveDocsMarkdown = requestPath => {
    const slug = requestPath.replace(/\/+$/, '').replace(/\.md$/, '')
    const basePath = path.join(process.cwd(), 'src', 'content', slug)
    const mdPath = `${basePath}.md`
    const mdxPath = `${basePath}.mdx`

    if (existsSync(mdPath)) return mdPath
    if (existsSync(mdxPath)) return mdxPath
    return null
  }

  const shouldServeMarkdown = req =>
    req.path.endsWith('.md') || req.headers.accept?.includes('text/markdown')

  app.get(/^\/docs\/.*$/, (req, res, next) => {
    if (!shouldServeMarkdown(req)) return next()

    const filePath = resolveDocsMarkdown(req.path)
    if (!filePath) {
      return req.path.endsWith('.md')
        ? res.status(404).send('Not Found')
        : next()
    }

    const content = readFileSync(filePath, 'utf8')
    res.set('Content-Type', 'text/markdown; charset=utf-8')
    return res.send(content)
  })
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
    allMdx {
      edges {
        node {
          id
          internal {
            contentFilePath
          }
          fields {
            slug
          }
          description: excerpt(pruneLength: 240)
          frontmatter {
            title
            subtitle
            description
            date
            lastEdited
            isPro
            authors
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

  const pages = result.data.allMdx.edges
    .filter(({ node }) => !node.fields.slug.startsWith('/fragments/'))
    .map(async ({ node }) => {
      const slug = node.fields.slug.replace(/\/+$/, '')
      const contentFilePath = node.internal.contentFilePath
      const lastEdited = await getLastModifiedDate(contentFilePath)
      const isBlogPage = node.fields.slug.startsWith('/blog/')
      const frontmatter = isBlogPage
        ? {
          ...node.frontmatter,
          title: formatTitle(node.frontmatter.title)
        }
        : node.frontmatter

      return createPage({
        path: slug,
        component: `${path.resolve(
          './src/templates/index.js'
        )}?__contentFilePath=${contentFilePath}`,
        context: {
          id: node.id,
          description: node.frontmatter.description || node.description,
          frontmatter,
          githubUrl: await githubUrl(contentFilePath),
          lastEdited,
          isBlogPage: node.fields.slug.startsWith('/blog/'),
          isDocPage: node.fields.slug.startsWith('/docs/'),
          slug: node.fields.slug
        }
      })
    })

  return Promise.all(pages)
}

const createDocsMarkdownFiles = async ({ graphql, reporter }) => {
  const query = `
  {
    allMdx(filter: { fields: { slug: { regex: "//docs//" } } }) {
      edges {
        node {
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  }
  `

  const result = await graphql(query)

  if (result.errors) {
    reporter.panicOnBuild(
      'Error while generating docs markdown files',
      result.errors
    )
    return
  }

  const pages = result.data.allMdx.edges

  pages.forEach(({ node }) => {
    const slug = node.fields.slug.replace(/\/+$/, '')
    const relative = `${slug.replace(/^\/+/, '')}.md`
    const outputPath = path.join(process.cwd(), 'public', relative)

    mkdirSync(path.dirname(outputPath), { recursive: true })
    const content = readFileSync(node.internal.contentFilePath, 'utf8')
    writeFileSync(outputPath, content)
  })

  reporter.info(`Generated ${pages.length} docs markdown files`)
}
