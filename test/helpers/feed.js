import { test, expect } from 'vitest'

import { serializeBlogFeed } from '../../src/helpers/feed'

const siteUrl = 'https://microlink.io'

const node = ({ slug, title, description, excerpt, date }) => ({
  excerpt,
  fields: { slug },
  frontmatter: { title, description, date }
})

test('builds absolute url and stable guid from slug', () => {
  const [item] = serializeBlogFeed({
    siteUrl,
    nodes: [
      node({
        slug: '/blog/what-is-a-headless-browser/',
        title: 'What Is a Headless Browser?',
        description: 'A description.',
        date: '2026-01-15'
      })
    ]
  })

  expect(item.url).toBe('https://microlink.io/blog/what-is-a-headless-browser')
  expect(item.guid).toBe(item.url)
  expect(item.date).toBe('2026-01-15')
})

test('keeps the authored title casing', () => {
  const [item] = serializeBlogFeed({
    siteUrl,
    nodes: [
      node({
        slug: '/blog/example',
        title: 'What Is a Headless Browser? Puppeteer vs Playwright',
        description: 'A description.',
        date: '2026-01-15'
      })
    ]
  })

  expect(item.title).toBe('What Is a Headless Browser? Puppeteer vs Playwright')
})

test('falls back to excerpt when description is missing', () => {
  const [item] = serializeBlogFeed({
    siteUrl,
    nodes: [
      node({
        slug: '/blog/example',
        title: 'Example',
        excerpt: 'The pruned excerpt.',
        date: '2026-01-15'
      })
    ]
  })

  expect(item.description).toBe('The pruned excerpt.')
})

test('preserves the incoming node order', () => {
  const items = serializeBlogFeed({
    siteUrl,
    nodes: [
      node({ slug: '/blog/newest', title: 'Newest', date: '2026-02-01' }),
      node({ slug: '/blog/oldest', title: 'Oldest', date: '2020-01-01' })
    ]
  })

  expect(items.map(item => item.url)).toEqual([
    'https://microlink.io/blog/newest',
    'https://microlink.io/blog/oldest'
  ])
})
