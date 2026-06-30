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
    mustContain: [
      'direct PDF file URLs',
      'JSON endpoints',
      "attr: 'text'",
      "attr: 'markdown'",
      "attr: 'html'",
      "attr: 'json'"
    ]
  },
  {
    href: '/docs/guides/content-conversion/url-to-text',
    title: 'Web page to Text',
    mustContain: ['data.text.attr=text', "embed: 'text'"]
  },
  {
    href: '/docs/guides/content-conversion/url-to-markdown',
    title: 'Web page to Markdown',
    mustContain: ['data.markdown.attr=markdown', "embed: 'markdown'"]
  },
  {
    href: '/docs/guides/content-conversion/url-to-html',
    title: 'Web page to HTML',
    mustContain: ['data.html.attr=html', "embed: 'html'"]
  },
  {
    href: '/docs/guides/content-conversion/pdf-url-to-markdown',
    title: 'PDF file to Markdown',
    mustContain: [
      'direct PDF file URL',
      'sample.pdf',
      'data.markdown.attr=markdown'
    ]
  },
  {
    href: '/docs/guides/content-conversion/pdf-url-to-html',
    title: 'PDF file to HTML',
    mustContain: ['direct PDF file URL', 'sample.pdf', 'data.html.attr=html']
  },
  {
    href: '/docs/guides/content-conversion/json-endpoint-to-json',
    title: 'JSON endpoint to JSON',
    mustContain: [
      'JSON endpoint',
      "attr: 'json'",
      'data.json.attr=json',
      "embed: 'json'"
    ]
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
