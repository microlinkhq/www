import { createRequire } from 'node:module'
import { describe, expect, test } from 'vitest'

const require = createRequire(import.meta.url)
const { default: gatsbyMDXLoader } = require('gatsby-plugin-mdx/dist/gatsby-mdx-loader')

const RESOURCE_PATH = '/site/src/content/blog/post.md'
const MDX_NODE_ID = 'mdx-node'

const runLoader = ({ source, staleBody }) =>
  gatsbyMDXLoader.call(
    {
      resourcePath: RESOURCE_PATH,
      getOptions: () => ({
        options: {},
        getNode: id => (id === MDX_NODE_ID ? { id, body: staleBody } : undefined),
        cache: { get: async () => MDX_NODE_ID },
        reporter: { panicOnBuild: error => { throw error } }
      })
    },
    source
  )

describe('gatsby-mdx-loader', () => {
  test('compiles the file webpack read, not the stale Mdx node body', async () => {
    const output = await runLoader({
      source: "---\ntitle: 'Post'\n---\n\nFresh paragraph saved a moment ago.\n",
      staleBody: '\nStale paragraph from before the save.\n'
    })
    expect(output).toContain('Fresh paragraph saved a moment ago.')
    expect(output).not.toContain('Stale paragraph')
  })

  test('drops the frontmatter before compiling', async () => {
    const output = await runLoader({
      source: "---\ntitle: 'Only in frontmatter'\n---\n\nBody text.\n",
      staleBody: '\nBody text.\n'
    })
    expect(output).toContain('Body text.')
    expect(output).not.toContain('Only in frontmatter')
  })
})
