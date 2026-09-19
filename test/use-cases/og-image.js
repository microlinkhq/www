import fs from 'node:fs'
import path from 'node:path'
import { classify, imagePath, slug } from '@microlink/og'
import { describe, expect, test } from 'vitest'

import { CUSTOMERS } from '../../src/components/patterns/CustomerStory/customers.js'

const PAGES_DIR = path.join(process.cwd(), 'src', 'pages', 'use-cases')

const LOGO_CARD_SLUGS = [
  ...CUSTOMERS.map(({ slug }) => `customers/${slug}`),
  'upscale-extracted-images'
]

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

const routeOf = ({ slug }) => (slug === '' ? '/use-cases' : `/use-cases/${slug}`)

describe('use case Open Graph image', () => {
  test.each(pages)('$name has no hardcoded image', ({ head }) => {
    expect(head).not.toMatch(/\bimage[=:]/)
  })

  test.each(pages)('$name renders a generated card', page => {
    const route = routeOf(page)
    expect(imagePath(route)).toBe(`/og/${slug(route)}.png`)
  })

  test.each(pages.filter(page => LOGO_CARD_SLUGS.includes(page.slug)))(
    '$name card shows the customer logo',
    page => {
      const props = classify(routeOf(page))
      expect(props.variant).toBe('customer')
      expect(props.customer.logo).toMatch(/^https:\/\/microlink\.io\//)
    }
  )

  test.todo(
    'use-case landings classify as a use-case card once @microlink/og ships the variant'
  )
})
