import { createRequire } from 'module'
import { pathToFileURL } from 'url'
import { expect, it } from 'vitest'

import mdxOptions from '../../../src/plugins/mdx-options'

const require = createRequire(import.meta.url)

const GFM_MARKDOWN = `| a | b |
| - | - |
| 1 | 2 |

~~strike~~

- [x] done
`

const loadGatsbyMdxCompiler = () => {
  const requireFromPlugin = createRequire(require.resolve('gatsby-plugin-mdx'))
  return import(pathToFileURL(requireFromPlugin.resolve('@mdx-js/mdx')).href)
}

it('compiles GFM with the MDX version gatsby-plugin-mdx ships', async () => {
  const { compile } = await loadGatsbyMdxCompiler()
  const output = String(await compile(GFM_MARKDOWN, mdxOptions))

  expect(output).toContain('_components.table')
  expect(output).toContain('_components.del')
  expect(output).toContain('checked: true')
})
