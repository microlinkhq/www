import fs from 'node:fs'
import path from 'node:path'
import { classify, imagePath, slug } from '@microlink/og'
import { describe, expect, test } from 'vitest'

const PAGES_DIR = path.join(process.cwd(), 'src', 'pages', 'use-cases')

const pages = fs
  .readdirSync(PAGES_DIR)
  .filter(name => name.endsWith('.js'))
  .map(name => ({
    name,
    slug: name.replace(/\.js$/, ''),
    head: (() => {
      const source = fs.readFileSync(path.join(PAGES_DIR, name), 'utf8')
      return source.slice(source.indexOf('export const Head'))
    })()
  }))

const routeOf = ({ slug }) =>
  slug === 'index' ? '/use-cases' : `/use-cases/${slug}`

describe('use case Open Graph image', () => {
  test.each(pages)('$name has no hardcoded image', ({ head }) => {
    expect(head).not.toMatch(/\bimage[=:]/)
  })

  test.each(pages)('$name renders a generated card', page => {
    const route = routeOf(page)
    expect(imagePath(route)).toBe(`/og/${slug(route)}.png`)
  })

  test.each(pages.filter(page => page.slug !== 'index'))(
    '$name card shows the customer logo',
    page => {
      const props = classify(routeOf(page))
      expect(props.variant).toBe('customer')
      expect(props.customer.logo).toMatch(/^https:\/\/microlink\.io\//)
    }
  )
})
