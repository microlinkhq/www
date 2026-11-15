import React from 'react'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
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

const SRC_ATTR =
  /\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)\s*\})/

export const hoverImageSources = markdown => {
  const sources = []
  const open = /<HoverImage\b/g
  let match
  while ((match = open.exec(markdown))) {
    let quote = null
    let seenBrace = false
    let attrs = ''
    let i = match.index + match[0].length
    for (; i < markdown.length; i++) {
      const ch = markdown[i]
      if (quote) {
        attrs += ch
        if (ch === quote) quote = null
        continue
      }
      if (ch === '"' || ch === "'") {
        quote = ch
        attrs += ch
        continue
      }
      if (ch === '{') seenBrace = true
      if (ch === '>' && !seenBrace) break
      attrs += ch
    }
    const src = attrs.match(SRC_ATTR)
    if (src) sources.push(src.slice(1).find(value => value !== undefined))
  }
  return sources
}

const markdownFiles = dir =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map(entry => join(entry.parentPath, entry.name))

const contentDir = new URL('../../../src/content/', import.meta.url)

const markdownIndex = readFileSync(
  new URL('../../../src/components/markdown/index.js', import.meta.url),
  'utf8'
)

describe('HoverImage', () => {
  test('renders only its children until the tooltip loads', () => {
    const html = render(
      <HoverImage src='/images/example.png' alt='example'>
        node_modules
      </HoverImage>
    )
    expect(html).toBe('node_modules')
  })

  test('gives the tooltip the image, and defaults alt and width when omitted', () => {
    const given = HoverImage({
      src: '/images/example.png',
      alt: 'example',
      width: 180,
      children: 'node_modules'
    })
    expect(given.props.as).toBe('span')
    expect(given.props.type).toBe('zoom-in')
    expect(given.props.display).toBe('inline')
    expect(given.props.children).toBe('node_modules')
    expect(given.props.content.props).toMatchObject({
      src: '/images/example.png',
      alt: 'example',
      width: 180
    })

    const omitted = HoverImage({
      src: '/images/example.png',
      children: 'node_modules'
    })
    expect(omitted.props.content.props.alt).toBe('')
    expect(omitted.props.content.props.width).toBe(320)
  })

  test('is available to every markdown page without an import', () => {
    expect(markdownIndex).toMatch(
      /import \{ HoverImage \} from '\.\/HoverImage'/
    )
    expect(markdownIndex).toMatch(/ScopedComponents = \{[^}]*\bHoverImage\b/)
  })

  test('reads every src spelling a markdown page can write', () => {
    const cases = [
      ['<HoverImage src="/images/a.png">', '/images/a.png'],
      ['<HoverImage src = "/images/a.png">', '/images/a.png'],
      ["<HoverImage src='/images/a.png'>", '/images/a.png'],
      ['<HoverImage alt="a>b" src="/images/a.png">', '/images/a.png'],
      ['<HoverImage alt=\'a>b\' src="/images/a.png">', '/images/a.png'],
      ['<HoverImage\n  src="/images/a.png">', '/images/a.png'],
      ['<HoverImage src={"/images/a.png"}>', '/images/a.png'],
      ['<HoverImage src={"/images/a>b.png"}>', '/images/a>b.png'],
      ['<HoverImage src={"/images/a}.png"}>', '/images/a}.png'],
      ["<HoverImage src={'/images/a.png'}>", '/images/a.png'],
      ["<HoverImage src={'/images/a>b.png'}>", '/images/a>b.png'],
      ['<HoverImage src={`/images/a.png`}>', '/images/a.png'],
      ['<HoverImage src={`/images/a>b.png`}>', '/images/a>b.png'],
      ['<HoverImage src={ "/images/a.png" }>', '/images/a.png'],
      ['<HoverImage src="/images/a.png" />', '/images/a.png']
    ]
    for (const [markdown, src] of cases) {
      expect(hoverImageSources(markdown)).toEqual([src])
    }
    expect(
      hoverImageSources(
        '<HoverImage src="/images/a.png"><HoverImage src="/images/b.png">'
      )
    ).toEqual(['/images/a.png', '/images/b.png'])
  })

  test('includes a hovered image from every content file', () => {
    const dir = mkdtempSync(join(tmpdir(), 'hover-image-'))
    try {
      writeFileSync(join(dir, 'a.md'), '<HoverImage src="/images/a.png">')
      mkdirSync(join(dir, 'nested'))
      writeFileSync(
        join(dir, 'nested', 'b.md'),
        "<HoverImage src='/images/b.png'>"
      )
      const sources = markdownFiles(dir).flatMap(file =>
        hoverImageSources(readFileSync(file, 'utf8'))
      )
      expect(sources.sort()).toEqual(['/images/a.png', '/images/b.png'])
    } finally {
      rmSync(dir, { recursive: true })
    }
  })

  test('every image a post hovers exists in static', () => {
    const sources = markdownFiles(contentDir).flatMap(file =>
      hoverImageSources(readFileSync(file, 'utf8'))
    )
    expect(sources).toContain('/images/node-modules-heaviest-objects.png')
    for (const src of sources) {
      expect(src.startsWith('/')).toBe(true)
      expect(src.includes('..')).toBe(false)
      expect(
        existsSync(new URL(`../../../static${src}`, import.meta.url)),
        src
      ).toBe(true)
    }
  })
})
