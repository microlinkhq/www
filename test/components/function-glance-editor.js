import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from 'vitest'

import { EXAMPLES } from '../../src/components/pages/editor/examples'
import { exampleFromSearch } from '../../src/components/pages/editor/use-share'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/function/product-shared.js'),
  'utf8'
)

const glance = source.slice(
  source.indexOf('export const GLANCE'),
  source.indexOf('export const PRIMER')
)

test('function glance examples open matching editor templates', () => {
  const hrefs = [
    ...glance.matchAll(/href: editorTemplateHref\('([^']+)'\)/g)
  ].map(([, id]) => id)
  expect(hrefs).toEqual(['extract', 'click-wait', 'proxy', 'inject', 'cheerio'])

  const ids = new Set(EXAMPLES.map(example => example.id))
  for (const id of hrefs) {
    expect(ids.has(id)).toBe(true)
    expect(exampleFromSearch(`?template=${id}`)?.id).toBe(id)
  }
})
