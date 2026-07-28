import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { FEATURES } from '../../src/components/patterns/FeatureStory/features'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const SLUGS = FEATURES.map(({ slug }) => slug)

const relatedSlugsOf = source => {
  const block = source.match(/relatedSlugs: \[([^\]]*)\]/)
  return block
    ? [...block[1].matchAll(/'([^']+)'/g)].map(([, slug]) => slug)
    : []
}

const panelIdsOf = source =>
  [...source.matchAll(/^ {6}id: '([^']+)'/gm)].map(([, id]) => id)

describe('feature landing data', () => {
  test.each(SLUGS)('%s relatedSlugs all resolve to a feature', slug => {
    const related = relatedSlugsOf(
      read(`src/components/pages/${slug}/shared.js`)
    )
    expect(related.length).toBeGreaterThan(0)
    expect(related.filter(id => !SLUGS.includes(id))).toEqual([])
    expect(related).not.toContain(slug)
  })

  test.each(SLUGS)('%s ships at least one examples panel', slug => {
    expect(
      panelIdsOf(read(`src/components/pages/${slug}/shared.js`)).length
    ).toBeGreaterThan(0)
  })

  test('every feature page has a data module and section files', () => {
    for (const slug of SLUGS) {
      for (const file of [
        'shared',
        'hero',
        'overview',
        'parameters',
        'examples',
        'related',
        'faq'
      ]) {
        expect(
          fs.existsSync(
            path.join(process.cwd(), `src/components/pages/${slug}/${file}.js`)
          ),
          `${slug}/${file}.js`
        ).toBe(true)
      }
    }
  })
})
