import fs from 'node:fs'
import path from 'node:path'
import { classify, imagePath, slug } from '@microlink/og'
import { describe, expect, test } from 'vitest'

import {
  CARD_CUSTOMERS,
  customerByPathname
} from '../../../src/helpers/og-card-metadata.js'

const PAGES_DIR = path.join(process.cwd(), 'src', 'pages', 'use-cases')
const STATIC_DIR = path.join(process.cwd(), 'static')

const customers = customerByPathname({
  readImage: icon => fs.readFileSync(path.join(STATIC_DIR, icon))
})

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(file)
    return entry.name.endsWith('.js') ? [file] : []
  })

const pages = walk(PAGES_DIR).map(file => {
  const name = path.relative(PAGES_DIR, file).split(path.sep).join('/')
  const source = fs.readFileSync(file, 'utf8')
  return {
    name,
    slug: name.replace(/\.js$/, '').replace(/\/?index$/, ''),
    head: source.slice(source.indexOf('export const Head'))
  }
})

const routeOf = ({ slug }) =>
  slug === '' ? '/use-cases' : `/use-cases/${slug}`

describe('use case Open Graph image', () => {
  test.each(pages)('$name has no hardcoded image', ({ head }) => {
    expect(head).not.toMatch(/\bimage[=:]/)
  })

  test.each(pages)('$name renders a generated card', page => {
    const route = routeOf(page)
    expect(imagePath(route)).toBe(`/og/${slug(route)}.png`)
  })

  test.each(CARD_CUSTOMERS)(
    '$pathname has a customer story page',
    ({ pathname }) => {
      expect(pages.map(routeOf)).toContain(pathname)
    }
  )

  test.each(CARD_CUSTOMERS)(
    '$pathname card shows the customer logo',
    ({ pathname, name }) => {
      expect(classify(pathname).variant).toBe('customer')
      expect(customers.get(pathname)).toEqual({
        name,
        logo: expect.stringMatching(/^data:image\/(png|svg\+xml);base64,/)
      })
    }
  )

  test.todo(
    'use-case landings classify as a use-case card once @microlink/og ships the variant'
  )
})
