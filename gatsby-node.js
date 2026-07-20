'use strict'

const {
  existsSync,
  readFileSync,
  mkdirSync,
  writeFileSync
} = require('node:fs')
const { createFilePath } = require('gatsby-source-filesystem')
const recipes = require('@microlink/recipes')
const { kebabCase, map } = require('lodash')
const { default: pMap } = require('p-map')
const { getDomain } = require('tldts')
const mql = require('@microlink/mql')
const path = require('node:path')

const { getLastModifiedDate, branchName } = require('./src/helpers/git')
const { title: formatTitle } = require('./src/helpers/title')
const { generate: generateOgCards, slug, imagePath } = require('@microlink/og')

const RECIPES_BY_FEATURES_KEYS = Object.keys(
  require('@microlink/recipes/by-feature')
)

const GIT_TIMESTAMPS = JSON.parse(
  readFileSync(
    path.join(process.cwd(), 'data', 'git-timestamps-modified.json'),
    'utf8'
  )
)

const getTimestampForFile = fileNode => {
  const relativePath = path
    .relative(process.cwd(), fileNode.absolutePath)
    .replace(/\\/g, '/')

  return GIT_TIMESTAMPS[relativePath]
}

const githubUrl = (() => {
  let cachedBranch
  return async filepath => {
    if (!cachedBranch) cachedBranch = branchName()
    const base = `https://github.com/microlinkhq/www/blob/${await cachedBranch}`
    const relative = filepath.replace(process.cwd(), '')
    return base + relative
  }
})()

const toMarkdown = async url => {
  const {
    data: { markdown },
    response
  } = await mql(url, {
    apiKey: process.env.MICROLINK_API_KEY,
    data: {
      markdown: {
        attr: 'markdown'
      }
    },
    meta: false,
    force: true
  })

  return { markdown, duration: response.headers.get('x-response-time') }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MdxFrontmatter {
      description: String
      authors: [String]
      website: String
      githubUrl: String
      skillUrl: String
    }
  `)
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      fallback: {
        path: require.resolve('path-browserify')
      }
    }
  })

  if (stage === 'develop' || stage === 'develop-html') {
    const config = getConfig()
    config.devtool = 'eval'
    if (config.cache && config.cache.type === 'filesystem') {
      config.cache.maxMemoryGenerations = 1
      config.cache.compression = 'gzip'
      config.cache.allowCollectingMemory = true
    }
    actions.replaceWebpackConfig(config)
  }
}

exports.onPostBuild = async ({ graphql, reporter }) => {
  await createDocsMarkdownFiles({ graphql, reporter })
  await generateOgImages({ graphql, reporter })
}

// Each page's built HTML already carries its real og:title/og:description (set
// by Meta). Read them back so the card renders from the page's actual metadata
// — e.g. "Model Context Protocol (MCP)" instead of the slug-derived "Mcp" — the
// way the URL-mode service does. @microlink/og cleans and merges them over the
// slug-derived base; a page whose HTML can't be read falls back to the slug.
// `fromCodePoint` (not `fromCharCode`) so astral entities like `&#x1F680;`
// (🚀) round-trip; out-of-range values decode to nothing rather than throwing.
const entityChar = (code, radix) => {
  const cp = parseInt(code, radix)
  return cp <= 0x10ffff ? String.fromCodePoint(cp) : ''
}

const decodeEntities = value =>
  value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => entityChar(code, 10))
    .replace(/&#x([\da-f]+);/gi, (_, code) => entityChar(code, 16))
    .replace(/&amp;/g, '&')

const ogContent = (html, name) => {
  const match = html.match(
    new RegExp(`<meta property="og:${name}" content="([^"]*)"`)
  )
  return match ? decodeEntities(match[1]) : undefined
}

const pageMetadata = pathname => {
  // `pathname` is a route ("/integrations/mcp", "/"); strip the leading slash
  // so it joins as a relative segment under public/.
  const relativePath = pathname.replace(/^\//, '')
  const file = path.join(process.cwd(), 'public', relativePath, 'index.html')
  let html
  try {
    html = readFileSync(file, 'utf8')
  } catch {
    return undefined
  }
  return {
    title: ogContent(html, 'title'),
    description: ogContent(html, 'description')
  }
}

// Render an OG card for every page into `public/images/og/<slug>.png` so the
// images ship as plain static files (served at /images/og/<slug>.png, like any
// other /images asset); `Meta.js` points `og:image` at them.
//
// The build fails only on a total failure (the page query fails, generation
// crashes, or every card fails). A single failed card just warns rather than
// blocking the deploy — render failures are rare and isolated.
const generateOgImages = async ({ graphql, reporter }) => {
  const result = await graphql('{ allSitePage { nodes { path } } }')
  if (result.errors) {
    return reporter.panicOnBuild(
      'OG images: failed to query pages',
      result.errors
    )
  }

  const pathnames = result.data.allSitePage.nodes.flatMap(
    node => (imagePath(node.path) ? node.path : []) // drop Gatsby internals (/404, app shell, …)
  )

  let cards
  try {
    cards = await generateOgCards({
      pathnames,
      outDir: path.join(process.cwd(), 'public', 'images', 'og'),
      metadata: pageMetadata,
      onError: (pathname, error) =>
        reporter.warn(`OG ${pathname}: ${error.message}`)
    })
  } catch (error) {
    return reporter.panicOnBuild(
      `OG images: generation failed — ${error.message}`
    )
  }

  // `generate` dedupes by slug and returns one entry per card it wrote, so its
  // count vs the unique expected count tells us what failed. Each failure was
  // already logged via `onError`; only a *total* failure fails the build.
  const expected = new Set(pathnames.map(slug)).size

  if (cards.length === 0 && expected > 0) {
    return reporter.panicOnBuild('OG images: every card failed to generate')
  }

  if (cards.length < expected) {
    reporter.warn(
      `OG images: ${expected - cards.length}/${expected} cards did not ` +
        'generate (see the warnings above).'
    )
  }

  reporter.info(`Generated ${cards.length} OG images`)
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
    const fileNode = getNode(node.parent)
    const isSkillContent = fileNode?.sourceInstanceName === 'skills-content'
    const slug = isSkillContent
      ? `/skills/${fileNode.name}/`
      : createFilePath({ node, getNode, basePath: 'src/content' })

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

// In development, the ~300 provider subtool pages under
// /tools/embed-url/<provider>/ blow up the dev bundle. Build only the tool
// index plus the providers below locally; all of them still ship in production.
const DEV_PROVIDER_ALLOWLIST = new Set([
  'youtube',
  'instagram',
  'spotify',
  'vimeo',
  'figma',
  'twitter-or-x',
  'tiktok',
  'facebook',
  'canva'
])
const EMBED_PROVIDER_PATH = /^\/tools\/embed-url\/([^/]+)\/?$/

exports.onCreatePage = ({ page, actions }) => {
  if (process.env.NODE_ENV !== 'development') return

  const match = page.path.match(EMBED_PROVIDER_PATH)
  if (!match) return // not a provider subtool page (keeps the tool index)
  if (DEV_PROVIDER_ALLOWLIST.has(match[1])) return

  actions.deletePage(page)
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
  const PAGE_SOURCES = new Set(['content', 'skills-content'])
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
          parent {
            ... on File {
              sourceInstanceName
            }
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
            website
            githubUrl
            skillUrl
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

  const createMdxPage = async node => {
    const slug = node.fields.slug.replace(/\/+$/, '')
    const contentFilePath = node.internal.contentFilePath
    const lastEdited = await getLastModifiedDate(contentFilePath)
    const isBlogPage = node.fields.slug.startsWith('/blog/')
    const isSkillPage = node.fields.slug.startsWith('/skills/')
    const skillSlug = isSkillPage
      ? node.fields.slug.split('/').filter(Boolean).pop()
      : null
    const frontmatter = isBlogPage
      ? { ...node.frontmatter, title: formatTitle(node.frontmatter.title) }
      : node.frontmatter
    const templatePath = isSkillPage
      ? path.resolve('./src/templates/skill.js')
      : path.resolve('./src/templates/index.js')
    const skillSourcePath =
      skillSlug &&
      path.resolve(process.cwd(), 'data', 'skills-repo', skillSlug, 'SKILL.md')
    const rawContent = isSkillPage
      ? existsSync(skillSourcePath)
        ? readFileSync(skillSourcePath, 'utf8')
        : readFileSync(contentFilePath, 'utf8')
      : undefined

    const component = isSkillPage
      ? templatePath
      : `${templatePath}?__contentFilePath=${contentFilePath}`

    return createPage({
      path: slug,
      component,
      context: {
        id: node.id,
        description: node.frontmatter.description || node.description,
        frontmatter,
        githubUrl: await githubUrl(contentFilePath),
        lastEdited,
        isBlogPage: node.fields.slug.startsWith('/blog/'),
        isDocPage: node.fields.slug.startsWith('/docs/'),
        isSkillPage,
        skillSlug,
        rawContent,
        slug: node.fields.slug
      }
    })
  }

  const pages = result.data.allMdx.edges.flatMap(({ node }) => {
    const source = node.parent?.sourceInstanceName
    const slug = node.fields?.slug || ''
    return PAGE_SOURCES.has(source) && !slug.startsWith('/fragments/')
      ? createMdxPage(node)
      : []
  })

  return Promise.all(pages)
}

const createDocsMarkdownFiles = async ({ graphql, reporter }) => {
  const isPreviewDeployment = process.env.VERCEL_ENV === 'preview'

  if (isPreviewDeployment) {
    reporter.info('Skipping markdown generation on preview deployment')
    return
  }

  const query = `
  {
    allMdx(filter: { fields: { slug: { regex: "//docs//" } } }) {
      edges {
        node {
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
    reporter.panicOnBuild(
      'Error while generating docs markdown files',
      result.errors
    )
    return
  }

  const baseUrl =
    process.env.MICROLINK_MARKDOWN_BASE_URL || 'https://microlink.io'

  const pages = result.data.allMdx.edges

  const startTime = Date.now()
  await pMap(
    pages,
    async ({ node }) => {
      const slug = node.fields.slug.replace(/\/+$/, '')
      const url = new URL(slug, baseUrl).toString()
      const { markdown, duration } = await toMarkdown(url)
      reporter.info(`Generating markdown for ${url} in ${duration}`)
      const relative = `${slug.replace(/^\/+/, '')}.md`
      const outputPath = path.join(process.cwd(), 'public', relative)
      mkdirSync(path.dirname(outputPath), { recursive: true })
      writeFileSync(outputPath, markdown || '')
    },
    { concurrency: 8 }
  )
  const duration = Date.now() - startTime

  reporter.info(
    `Generated ${pages.length} docs markdown files in ${duration}ms`
  )
}
