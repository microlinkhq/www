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
const {
  DOCS_CONTENT_SELECTOR,
  extractMarkdown,
  isNotDeployedYet,
  isMarkdownPage,
  retryStaleNotFound,
  toMarkdownPath,
  prependTitle,
  notFoundMarkdown
} = require('./src/helpers/page-markdown')
const { buildLlmsTxt } = require('./src/helpers/llms-txt')
const {
  parseLatestChangelogEntry
} = require('./src/helpers/parse-latest-changelog-entry')
const { generate: generateOgCards, slug, imagePath } = require('@microlink/og')
const {
  authorsByPathname,
  cardMetadata,
  inlineAvatars,
  pageMetadata,
  withoutTrailingSlash
} = require('./src/helpers/og-card-metadata')

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

const requestMarkdown = (url, selector, force) =>
  mql(url, {
    apiKey: process.env.MICROLINK_API_KEY,
    data: {
      markdown: selector ? { selector, attr: 'markdown' } : { attr: 'markdown' }
    },
    meta: false,
    force
  }).then(({ data: { markdown }, statusCode, response }) => ({
    markdown,
    statusCode,
    duration: response.headers.get('x-response-time')
  }))

const markdownFetcher = url => async selector =>
  retryStaleNotFound(force => requestMarkdown(url, selector, force))

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
    type ChangelogLatestEntry {
      product: String
      description: String
      href: String
    }
    type MdxFields {
      latestEntry: ChangelogLatestEntry
    }
  `)
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        'microlink.io/cli': require.resolve('microlink.io/cli')
      },
      fallback: {
        path: require.resolve('path-browserify'),
        fs: false,
        os: false,
        http: false,
        https: false,
        crypto: false,
        child_process: false,
        zlib: false,
        util: false,
        assert: false,
        stream: false,
        constants: false,
        'node:fs': false,
        'node:os': false,
        'node:http': false,
        'node:crypto': false,
        'node:util': false,
        'node:zlib': false,
        'node:path': false,
        'node:child_process': false
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
  await createPageMarkdownFiles({ graphql, reporter })
  await generateOgImages({ graphql, reporter })
}

const readPageHtml = pathname => {
  const relativePath = pathname.replace(/^\//, '')
  const file = path.join(process.cwd(), 'public', relativePath, 'index.html')
  try {
    return readFileSync(file, 'utf8')
  } catch {
    return undefined
  }
}

const OG_CARD_HOST = 'microlink.io'

const OG_CARD_QUERY = `{
  allSitePage { nodes { path } }
  allMdx { nodes { fields { slug } frontmatter { authors } } }
  allAuthorsYaml { nodes { key name avatar } }
}`

// Render an OG card for every page into `public/images/og/<slug>.png` so the
// images ship as plain static files (served at /images/og/<slug>.png, like any
// other /images asset); `Meta.js` points `og:image` at them.
//
// The build fails only on a total failure (the page query fails, generation
// crashes, or every card fails). A single failed card just warns rather than
// blocking the deploy — render failures are rare and isolated.
const generateOgImages = async ({ graphql, reporter }) => {
  const result = await graphql(OG_CARD_QUERY)
  if (result.errors) {
    return reporter.panicOnBuild(
      'OG images: failed to query pages',
      result.errors
    )
  }

  const postAuthors = authorsByPathname({
    posts: result.data.allMdx.nodes.map(node => ({
      slug: node.fields?.slug,
      authorKeys: node.frontmatter?.authors
    })),
    authors: await inlineAvatars(result.data.allAuthorsYaml.nodes, {
      onError: (author, error) =>
        reporter.warn(
          `OG avatar for ${author.name} dropped: ${author.avatar} ${error.message}`
        )
    })
  })

  const ogCardMetadata = pathname => {
    const html = readPageHtml(pathname)
    return html === undefined
      ? undefined
      : cardMetadata({
        html,
        authors: postAuthors.get(withoutTrailingSlash(pathname))
      })
  }

  const pathnames = result.data.allSitePage.nodes.flatMap(
    node => (imagePath(node.path) ? node.path : []) // drop Gatsby internals (/404, app shell, …)
  )

  let cards
  try {
    cards = await generateOgCards({
      pathnames,
      outDir: path.join(process.cwd(), 'public', 'images', 'og'),
      host: OG_CARD_HOST,
      metadata: ogCardMetadata,
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

      if (slug === '/fragments/changelog/') {
        const latestEntry = parseLatestChangelogEntry(
          readFileSync(contentFilePath, 'utf8')
        )
        if (latestEntry) {
          createNodeField({
            node,
            name: 'latestEntry',
            value: latestEntry
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

const toSdkSource = source =>
  source
    .replace(
      /const \{ data \} = await mql\(/g,
      'const data = await microlink.metadata('
    )
    .replace(
      /const result = await mql\(/g,
      'const result = await microlink.metadata('
    )
    .replace(/\bmql\(/g, 'microlink.metadata(')

const SDK_PREAMBLE = `import createClient from 'microlink.io'

const microlink = createClient()`

const getDataCode = (recipe, { name }) => `${SDK_PREAMBLE}

const ${name} = ${toSdkSource(recipe.toString())}

const result = await ${name}('${recipe.meta.examples[0]}')

console.log(result)`

const getFunctionCode = (recipe, { name }) => `${SDK_PREAMBLE}

const code = ${recipe.code}

const ${name} = (url, props) => microlink.function(url, code, props)

const { value } = await ${name}('${recipe.meta.examples[0]}')

console.log(value)`

const getCode = (recipe, { name }) =>
  (recipe.code ? getFunctionCode : getDataCode)(recipe, { name })

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
    const isSkillPage = node.fields.slug.startsWith('/skills/')
    const skillSlug = isSkillPage
      ? node.fields.slug.split('/').filter(Boolean).pop()
      : null
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
        frontmatter: node.frontmatter,
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

const isProductionBuild = () => process.env.VERCEL_ENV === 'production'

const markdownPathnames = nodes =>
  nodes.flatMap(node => {
    const pathname = node.path.replace(/\/+$/, '') || '/'
    return isMarkdownPage(pathname) ? pathname : []
  })

const createPageMarkdownFiles = async ({ graphql, reporter }) => {
  writeFileSync(path.join(process.cwd(), 'public', '404.md'), notFoundMarkdown)

  if (!isProductionBuild()) {
    reporter.info('Skipping markdown generation outside a production build')
    return
  }

  const query = `
  {
    allSitePage {
      nodes {
        path
      }
    }
    allMdx(filter: { fields: { slug: { regex: "//docs//" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
  `

  const result = await graphql(query)

  if (result.errors) {
    reporter.panicOnBuild(
      'Error while generating page markdown files',
      result.errors
    )
    return
  }

  const docsTitles = new Map(
    result.data.allMdx.edges.map(({ node }) => [
      node.fields.slug.replace(/\/+$/, ''),
      node.frontmatter?.title
    ])
  )

  const baseUrl =
    process.env.MICROLINK_MARKDOWN_BASE_URL || 'https://microlink.io'

  const pathnames = markdownPathnames(result.data.allSitePage.nodes)

  const undeployedPathnames = new Set()
  const startTime = Date.now()
  await pMap(
    pathnames,
    async pathname => {
      const url = new URL(pathname, baseUrl).toString()
      const { markdown, duration, selector, statusCode } =
        await extractMarkdown(markdownFetcher(url), pathname)

      if (isNotDeployedYet(statusCode)) {
        undeployedPathnames.add(pathname)
        return reporter.warn(
          `${url} is not deployed yet, so its markdown was skipped. ` +
            'It resolves on the next deploy.'
        )
      }

      if (!markdown) {
        return reporter.panicOnBuild(`No content extracted from ${url}`)
      }

      if (selector === null) {
        reporter.warn(
          `No content marker on the deployed HTML for ${url} yet, so the ` +
            'whole page was converted. It resolves on the next deploy.'
        )
      }

      reporter.info(`Generating markdown for ${url} in ${duration}`)
      const outputPath = path.join(
        process.cwd(),
        'public',
        toMarkdownPath(pathname)
      )
      const title =
        selector === DOCS_CONTENT_SELECTOR
          ? docsTitles.get(pathname)
          : undefined
      mkdirSync(path.dirname(outputPath), { recursive: true })
      writeFileSync(outputPath, prependTitle(title, markdown))
    },
    { concurrency: 8 }
  )
  const duration = Date.now() - startTime

  const writtenPathnames = pathnames.filter(
    pathname => !undeployedPathnames.has(pathname)
  )
  reporter.info(
    `Generated ${writtenPathnames.length} page markdown files in ${duration}ms`
  )

  const pages = writtenPathnames.map(pathname => ({
    pathname,
    ...pageMetadata(readPageHtml(pathname) || '')
  }))
  writeFileSync(
    path.join(process.cwd(), 'public', 'llms.txt'),
    buildLlmsTxt(pages)
  )
  reporter.info(`Generated llms.txt with ${pages.length} pages`)
}
