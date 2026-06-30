import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const root = process.cwd()
const sidebarPath = path.join(
  root,
  'src/components/patterns/Aside/constants.js'
)

const conversionGuides = [
  {
    href: '/docs/guides/content-conversion',
    title: 'Content conversion',
    mustContain: ["attr: 'markdown'", "attr: 'html'"]
  },
  {
    href: '/docs/guides/content-conversion/any-url-to-markdown',
    title: 'Convert any URL to Markdown',
    mustContain: ['data.markdown.attr=markdown', "embed: 'markdown'"]
  },
  {
    href: '/docs/guides/content-conversion/any-url-to-html',
    title: 'Convert any URL to HTML',
    mustContain: ['data.html.attr=html', "embed: 'html'"]
  },
  {
    href: '/docs/guides/content-conversion/pdf-url-to-markdown',
    title: 'Convert a PDF URL to Markdown',
    mustContain: ['sample.pdf', 'data.markdown.attr=markdown']
  },
  {
    href: '/docs/guides/content-conversion/pdf-url-to-html',
    title: 'Convert a PDF URL to HTML',
    mustContain: ['sample.pdf', 'data.html.attr=html']
  }
]

const hrefToDocPath = href => {
  const suffix = href.replace('/docs/', '')
  return path.join(root, 'src/content/docs', suffix, 'index.md')
}

const hrefToLeafPath = href => {
  const suffix = href.replace('/docs/', '')
  return path.join(root, 'src/content/docs', `${suffix}.md`)
}

const readGuide = href => {
  const indexPath = hrefToDocPath(href)
  const leafPath = hrefToLeafPath(href)
  const filePath = existsSync(indexPath) ? indexPath : leafPath
  return readFileSync(filePath, 'utf8')
}

describe('content conversion guides', () => {
  test('are linked from the guides sidebar', () => {
    const sidebar = readFileSync(sidebarPath, 'utf8')
    const hrefs = new Set(
      [...sidebar.matchAll(/href: '([^']+)'/g)].map(match => match[1])
    )

    for (const guide of conversionGuides) {
      expect(hrefs.has(guide.href), guide.href).toBe(true)
    }
  })

  test('exist with titles and runnable API patterns', () => {
    for (const guide of conversionGuides) {
      const content = readGuide(guide.href)

      expect(content).toContain(`title: '${guide.title}'`)
      for (const expected of guide.mustContain) {
        expect(content).toContain(expected)
      }
    }
  })
})
