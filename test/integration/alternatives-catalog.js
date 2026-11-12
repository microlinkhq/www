import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  ALTERNATIVE_GROUPS,
  ALTERNATIVES,
  footerAlternativeLinks
} from '../../src/helpers/alternatives'

const PAGES_DIR = path.join(process.cwd(), 'src', 'pages', 'alternative')
const INDEX_PAGE = 'index'

const pageSlugs = fs
  .readdirSync(PAGES_DIR)
  .filter(file => file.endsWith('.js'))
  .map(file => path.basename(file, '.js'))
  .filter(slug => slug !== INDEX_PAGE)
  .sort()

const catalogSlugs = ALTERNATIVES.map(({ slug }) => slug).sort()

describe('alternatives catalog', () => {
  test('every alternative page is listed in the catalog', () => {
    expect(pageSlugs.filter(slug => !catalogSlugs.includes(slug))).toEqual([])
  })

  test('every catalog entry has a page', () => {
    expect(catalogSlugs.filter(slug => !pageSlugs.includes(slug))).toEqual([])
  })

  test('no alternative is listed twice', () => {
    expect(new Set(catalogSlugs).size).toBe(catalogSlugs.length)
  })

  test('every group has alternatives and an accent', () => {
    expect(
      ALTERNATIVE_GROUPS.filter(
        ({ alternatives, accent }) => alternatives.length === 0 || !accent
      ).map(({ id }) => id)
    ).toEqual([])
  })

  test('the footer links the hub and every alternative', () => {
    const hrefs = footerAlternativeLinks().map(({ href }) => href)
    expect(hrefs).toEqual(
      expect.arrayContaining([
        '/alternative',
        ...catalogSlugs.map(slug => `/alternative/${slug}`)
      ])
    )
    expect(hrefs).toHaveLength(catalogSlugs.length + 1)
  })
})
