import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { FEATURES } from '../../src/components/patterns/FeatureStory/features'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const exists = file => fs.existsSync(path.join(process.cwd(), file))

const SLUGS = FEATURES.map(({ slug }) => slug)

const relatedSlugsOf = source => {
  const block = source.match(/relatedSlugs: \[([^\]]*)\]/)
  return block
    ? [...block[1].matchAll(/'([^']+)'/g)].map(([, slug]) => slug)
    : []
}

const panelIdsOf = source =>
  [...source.matchAll(/^ {6}id: '([^']+)'/gm)].map(([, id]) => id)

const hasExport = (source, name) =>
  new RegExp(`export const ${name}\\b`).test(source)

describe('feature landing data', () => {
  test('feature registry is non-empty', () => {
    expect(SLUGS.length).toBeGreaterThan(0)
  })

  test.each(SLUGS)('%s relatedSlugs all resolve to a feature', slug => {
    const related = relatedSlugsOf(
      read(`src/components/pages/${slug}/shared.js`)
    )
    expect(related.length).toBeGreaterThan(0)
    expect(related.filter(id => !SLUGS.includes(id))).toEqual([])
    expect(related).not.toContain(slug)
  })

  test.each(SLUGS)(
    '%s ships examples panels when EXAMPLES is defined',
    slug => {
      const source = read(`src/components/pages/${slug}/shared.js`)
      if (!hasExport(source, 'EXAMPLES')) return
      expect(panelIdsOf(source).length).toBeGreaterThan(0)
    }
  )

  test('every feature page has core section files', () => {
    for (const slug of SLUGS) {
      const source = read(`src/components/pages/${slug}/shared.js`)

      for (const file of ['shared', 'hero', 'related', 'faq']) {
        expect(
          exists(`src/components/pages/${slug}/${file}.js`),
          `${slug}/${file}.js`
        ).toBe(true)
      }

      if (hasExport(source, 'EXAMPLES')) {
        expect(
          exists(`src/components/pages/${slug}/examples.js`),
          `${slug}/examples.js`
        ).toBe(true)
      }

      if (hasExport(source, 'PARAMS')) {
        expect(
          exists(`src/components/pages/${slug}/parameters.js`),
          `${slug}/parameters.js`
        ).toBe(true)
      }
    }
  })
})
