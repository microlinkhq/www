import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  buildLlmsTxt,
  cleanTitle,
  sectionFor,
  titleFromPathname,
  toMarkdownUrl
} from '../src/helpers/llms-txt.js'

const PAGES = [
  {
    pathname: '/docs/api/basics/cache',
    title: 'Microlink API: cache — Microlink Docs',
    description: 'Optimize API performance.'
  },
  {
    pathname: '/pricing',
    title: 'Pricing — Microlink',
    description: 'Simple, predictable pricing.'
  },
  { pathname: '/', title: 'Microlink | The web, transformed' },
  {
    pathname: '/blog/some-post',
    title: 'Some post — Microlink',
    description: 'A post.'
  }
]

const content = buildLlmsTxt(PAGES)

describe('cleanTitle', () => {
  test('drops the site name', () => {
    expect(cleanTitle('Pricing — Microlink')).toBe('Pricing')
    expect(cleanTitle('Microlink API: cache — Microlink Docs')).toBe(
      'Microlink API: cache'
    )
    expect(cleanTitle('What is a headless browser? — Microlink Blog')).toBe(
      'What is a headless browser?'
    )
  })

  test('leaves a title that does not carry it', () => {
    expect(cleanTitle('Microlink | The web, transformed')).toBe(
      'Microlink | The web, transformed'
    )
  })
})

describe('titleFromPathname', () => {
  test('names a page with no metadata', () => {
    expect(titleFromPathname('/use-cases/link-preview')).toBe('Link preview')
    expect(titleFromPathname('/')).toBe('Home')
  })
})

describe('sectionFor', () => {
  test('splits the docs by product', () => {
    expect(sectionFor('/docs/api/basics/cache')).toBe('API')
    expect(sectionFor('/docs/mql/getting-started/overview')).toBe('MQL')
    expect(sectionFor('/docs/guides')).toBe('Guides')
  })

  test('groups the rest of the site by its first segment', () => {
    expect(sectionFor('/features/screenshot')).toBe('Features')
    expect(sectionFor('/blog/some-post')).toBe('Blog')
  })

  test('falls back to a single section for standalone pages', () => {
    expect(sectionFor('/pricing')).toBe('Pages')
    expect(sectionFor('/')).toBe('Pages')
  })
})

describe('toMarkdownUrl', () => {
  test('points at the markdown file', () => {
    expect(toMarkdownUrl('/pricing')).toBe('https://microlink.io/pricing.md')
  })

  test('names the home page index', () => {
    expect(toMarkdownUrl('/')).toBe('https://microlink.io/index.md')
  })
})

describe('buildLlmsTxt', () => {
  test('starts with an H1 and a summary', () => {
    expect(content.startsWith('# Microlink\n\n> ')).toBe(true)
  })

  test('writes one link per page', () => {
    const links = content.split('\n').filter(line => line.startsWith('- ['))
    expect(links).toHaveLength(PAGES.length)
  })

  test('links every page to an absolute .md URL', () => {
    for (const line of content.split('\n').filter(l => l.startsWith('- ['))) {
      expect(line).toMatch(/^- \[[^\]]+\]\(https:\/\/microlink\.io\/.+\.md\)/)
    }
  })

  test('appends the description when there is one', () => {
    expect(content).toContain(
      '- [Pricing](https://microlink.io/pricing.md): Simple, predictable pricing.'
    )
    expect(content).toContain(
      '- [Microlink | The web, transformed](https://microlink.io/index.md)\n'
    )
  })

  test('groups the links under H2 sections', () => {
    expect(content.match(/^## .+$/gm)).toEqual([
      '## API',
      '## Blog',
      '## Pages'
    ])
  })

  test('omits a section with no pages', () => {
    expect(content).not.toContain('## SDK')
  })
})

describe('the build', () => {
  const gatsbyNode = fs.readFileSync(
    path.join(process.cwd(), 'gatsby-node.js'),
    'utf8'
  )

  const bodyOf = name =>
    gatsbyNode.slice(gatsbyNode.indexOf(`const ${name} = `)).split('\n}\n')[0]

  test('indexes the same pages it writes markdown for', () => {
    expect(bodyOf('createLlmsTxt')).toContain('markdownPathnames(')
    expect(bodyOf('createPageMarkdownFiles')).toContain('markdownPathnames(')
  })
})
