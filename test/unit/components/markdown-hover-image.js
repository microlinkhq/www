import React from 'react'
import { existsSync, readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import { HoverImage } from '../../../src/components/markdown/HoverImage'
import themeSpec from '../../../src/theme'

const render = element => {
  const sheet = new ServerStyleSheet()
  try {
    return renderToStaticMarkup(
      sheet.collectStyles(
        <ThemeProvider theme={themeSpec}>{element}</ThemeProvider>
      )
    )
  } finally {
    sheet.seal()
  }
}

const markdownIndex = readFileSync(
  new URL('../../../src/components/markdown/index.js', import.meta.url),
  'utf8'
)

const hoverImageSources = () =>
  [
    ...readFileSync(
      new URL(
        '../../../src/content/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s.md',
        import.meta.url
      ),
      'utf8'
    ).matchAll(/<HoverImage src="([^"]+)"/g)
  ].map(([, src]) => src)

describe('HoverImage', () => {
  test('renders only its children until the tooltip loads', () => {
    const html = render(
      <HoverImage src='/images/example.png' alt='example'>
        node_modules
      </HoverImage>
    )
    expect(html).toBe('node_modules')
  })

  test('is available to every markdown page without an import', () => {
    expect(markdownIndex).toMatch(
      /import \{ HoverImage \} from '\.\/HoverImage'/
    )
    expect(markdownIndex).toMatch(/ScopedComponents = \{[^}]*\bHoverImage\b/)
  })

  test('every image a post hovers exists in static', () => {
    const sources = hoverImageSources()
    expect(sources.length).toBeGreaterThan(0)
    for (const src of sources) {
      expect(
        existsSync(new URL(`../../../static${src}`, import.meta.url))
      ).toBe(true)
    }
  })
})
