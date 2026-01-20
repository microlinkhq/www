'use strict'

const { URL } = require('url')
const path = require('path')

const log = (...args) => {
  if (process.env.DEBUG) {
    console.log(...args)
  }
}

const {
  STRIPE_KEY,
  PAYMENT_API_KEY,
  PAYMENT_ENDPOINT,
  SITE_URL,
  CANONICAL_URL,
  CDN_URL
} = require('./env')

module.exports = {
  trailingSlash: 'never',
  flags: {
    DEV_SSR: true, // better 1:1 production behavior
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true
  },
  siteMetadata: {
    // Basic
    name: 'Microlink',
    author: 'Microlink HQ',
    headline: 'Microlink | Headless Browser API: Screenshot, PDF & Previews',
    description:
      'Turn any URL into structured data. The all-in-one API for browser automation: screenshots, PDFs, scraping, and link previews. No infrastructure to manage.',
    siteUrl: SITE_URL,
    canonicalUrl: CANONICAL_URL,
    twitter: '@microlinkhq',
    image: new URL('logo/banner.jpeg', CDN_URL).toString(),
    logo: new URL('logo/logo.png', CDN_URL).toString(),
    // Slack previsualization
    dataLabel1: 'API',
    dataLabel2: 'Documentation',
    dataValue1: 'api.microlink.io',
    dataValue2: 'microlink.io/docs',

    // additional
    paymentApiKey: PAYMENT_API_KEY,
    paymentEndpoint: PAYMENT_ENDPOINT,
    stripeKey: STRIPE_KEY,
    cdnUrl: CDN_URL
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-javascript-frontmatter',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          precision: 8
        },
        postCssPlugins: require('./postcss.config').plugins
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'data')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src/pages'),
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src/content'),
        name: 'content'
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: CANONICAL_URL
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mdxOptions: {
          rehypePlugins: [require('rehype-slug')]
        }
      }
    },
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-sitemap',
      /* activate fields { slug, lastmod } once we find a workaround for Vercel git history */
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allMdx {
            edges {
              node {
                fields {
                  slug
                  lastmod
                }
                frontmatter {
                  date
                }
              }
            }
          }
          allFile(filter: { sourceInstanceName: { eq: "pages" } }) {
            nodes {
              absolutePath
              relativePath
              relativeDirectory
              name
              mtime
              fields {
                lastmod
              }
            }
          }
        }
      `,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMdx: { edges: mdxPages },
          allFile: { nodes: pageFiles }
        }) => {
          const mdxMap = {}
          if (mdxPages && Array.isArray(mdxPages)) {
            mdxPages.forEach(({ node }) => {
              const slug = node.fields?.slug
              const lastmod = node.fields?.lastmod || node.frontmatter?.date

              if (slug && lastmod) {
                const normalizedSlug =
                  slug.endsWith('/') && slug.length > 1
                    ? slug.slice(0, -1)
                    : slug
                mdxMap[normalizedSlug] = lastmod
              }
            })
          }

          const pagesMap = {}
          if (pageFiles && Array.isArray(pageFiles)) {
            pageFiles.forEach(file => {
              let pagePath = null
              if (file.relativeDirectory === '') {
                if (file.name === 'index') {
                  pagePath = '/'
                } else {
                  pagePath = `/${file.name}`
                }
              } else {
                const dirPath = file.relativeDirectory.replace(/\\/g, '/')
                if (file.name === 'index') {
                  pagePath = `/${dirPath}`
                } else {
                  pagePath = `/${dirPath}/${file.name}`
                }
              }

              if (pagePath) {
                const lastmod = file.fields?.lastmod || file.mtime
                if (lastmod) {
                  pagesMap[pagePath] = lastmod
                }
              }
            })
          }

          if (!allPages || !Array.isArray(allPages)) {
            return []
          }

          return allPages.map(page => {
            const lastmod = mdxMap[page.path] || pagesMap[page.path] || null
            return { ...page, lastmod }
          })
        },
        serialize: ({ path: url, lastmod }) => {
          if (!lastmod) {
            log('not lastmod found', { url, lastmod })
            if (!url.startsWith('/recipes')) {
              throw new Error(`not lastmod found for '${url}'`)
            }
          }
          return { url, lastmod }
        }
      }
    }
  ].filter(Boolean)
}
