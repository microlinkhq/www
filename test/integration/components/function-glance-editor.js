import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from 'vitest'

import { EXAMPLES } from '../../../src/components/pages/editor/examples'
import { exampleFromSearch } from '../../../src/components/pages/editor/use-share'
import { glanceItems } from '../../../src/components/pages/function/glance-items'

test('function page shows every editor template', () => {
  expect(glanceItems.map(item => item.id)).toEqual(
    EXAMPLES.map(example => example.id)
  )

  for (const item of glanceItems) {
    const example = EXAMPLES.find(entry => entry.id === item.id)
    expect(item.title).toBe(example.label)
    expect(item.href).toBe(`/editor?template=${item.id}`)
    expect(item.code.length).toBeGreaterThan(0)
    expect(exampleFromSearch(`?template=${item.id}`)?.id).toBe(item.id)
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
