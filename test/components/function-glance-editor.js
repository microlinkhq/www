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
  expect(hrefs).toEqual([
    'extract-css',
    'extract',
    'click-wait',
    'proxy',
    'inject',
    'cheerio',
    'sitemap'
  ])

  const ids = new Set(EXAMPLES.map(example => example.id))
  for (const id of hrefs) {
    expect(ids.has(id)).toBe(true)
    expect(exampleFromSearch(`?template=${id}`)?.id).toBe(id)
  }
})

test('extract and metadata templates open from the editor query', () => {
  const ids = ['metadata', 'extract-css', 'extract-list', 'extract-evaluate']
  for (const id of ids) {
    expect(exampleFromSearch(`?template=${id}`)?.id).toBe(id)
  }

  const files = id =>
    EXAMPLES.find(example => example.id === id).files['main.mjs']
  expect(files('metadata')).toContain('page.metadata()')
  expect(files('extract-css')).toContain("selector: 'h1'")
  expect(files('extract-list')).toContain('page.extract({')
  expect(files('extract-list')).toContain('selectorAll')
  expect(files('extract-evaluate')).toContain("evaluate: 'window.next.version'")
})

test('sitemap FAQ opens the sitemap editor template', () => {
  const sitemapPage = fs.readFileSync(
    path.join(process.cwd(), 'src/pages/tools/sitemap.js'),
    'utf8'
  )
  expect(sitemapPage).toMatch(/editorTemplateHref\('sitemap'\)/)
  expect(sitemapPage).toContain('FunctionExampleCard')
  expect(exampleFromSearch('?template=sitemap')?.id).toBe('sitemap')
  expect(EXAMPLES.find(example => example.id === 'sitemap').files).toEqual(
    expect.objectContaining({
      'main.mjs': expect.stringContaining("require('xml-urls')")
    })
  )
})
