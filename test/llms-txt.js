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

const sections = content
  .split(/^## /m)
  .slice(1)
  .map(section => {
    const [title, ...rest] = section.split('\n')
    return { title, links: rest.filter(line => line.startsWith('- [')) }
  })

const pageLinks = sections
  .filter(({ title }) => title !== 'Developer resources')
  .flatMap(({ links }) => links)

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
    expect(pageLinks).toHaveLength(PAGES.length)
  })

  test('links every page to an absolute .md URL', () => {
    for (const line of pageLinks) {
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
      '## Developer resources',
      '## API',
      '## Blog',
      '## Pages'
    ])
  })

  test('omits a section with no pages', () => {
    expect(content).not.toContain('## SDK')
  })
})

describe('developer resources', () => {
  const [resources] = sections

  test('leads the file, before the page listing', () => {
    expect(resources.title).toBe('Developer resources')
  })

  test('names the machine-readable entry points', () => {
    const urls = resources.links.map(line => line.match(/\((.+?)\)/)[1])
    expect(urls).toContain('https://microlink.io/openapi.json')
    expect(urls).toContain('https://microlink.io/.well-known/api-catalog')
    expect(urls).toContain('https://microlink.io/sitemap-index.xml')
    expect(urls).toContain(
      'https://microlink.io/docs/api/getting-started/mcp.md'
    )
  })

  test('describes every entry, so an agent can pick one without fetching it', () => {
    for (const line of resources.links) {
      expect(line).toMatch(/^- \[[^\]]+\]\([^)]+\): .{20,}$/)
    }
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
    const body = bodyOf('createPageMarkdownFiles')
    expect(body).toContain('markdownPathnames(')
    expect(body).toContain('buildLlmsTxt(')
  })

  test('writes both only on a production build', () => {
    expect(bodyOf('createPageMarkdownFiles')).toContain('isProductionBuild()')
  })
})
