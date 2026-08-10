import { describe, expect, test } from 'vitest'

import {
  DOCS_CONTENT_SELECTOR,
  MAIN_CONTENT_SELECTOR,
  extractMarkdown,
  isMarkdownPage,
  toMarkdownPath,
  withTitle
} from '../../src/helpers/page-markdown.js'

const fetcherOf = responses => {
  const calls = []
  const fetchMarkdown = async selector => {
    calls.push(selector)
    return responses.shift()
  }
  return { calls, fetchMarkdown }
}

describe('isMarkdownPage', () => {
  test('covers the pages people and agents read', () => {
    for (const pathname of [
      '/',
      '/pricing',
      '/screenshot/php',
      '/docs/api/parameters/filename',
      '/blog/some-post',
      '/tools/embed-url'
    ]) {
      expect(isMarkdownPage(pathname), pathname).toBe(true)
    }
  })

  test('drops the embed-url provider pages and the recipes', () => {
    for (const pathname of [
      '/tools/embed-url/miro',
      '/tools/embed-url/icosa-gallery',
      '/recipes',
      '/recipes/take-a-screenshot'
    ]) {
      expect(isMarkdownPage(pathname), pathname).toBe(false)
    }
  })

  test('drops what Gatsby generates for itself', () => {
    expect(isMarkdownPage('/404')).toBe(false)
    expect(isMarkdownPage('/dev-404-page/')).toBe(false)
    expect(isMarkdownPage('/offline-plugin-app-shell-fallback/')).toBe(false)
  })
})

describe('toMarkdownPath', () => {
  test('mirrors the pathname', () => {
    expect(toMarkdownPath('/pricing')).toBe('pricing.md')
    expect(toMarkdownPath('/screenshot/php')).toBe('screenshot/php.md')
  })

  test('names the home page index', () => {
    expect(toMarkdownPath('/')).toBe('index.md')
  })
})

describe('withTitle', () => {
  test('prepends the title as an h1', () => {
    expect(withTitle('filename', 'Type: <string>')).toBe(
      '# filename\n\nType: <string>'
    )
  })

  test('leaves a titleless page untouched', () => {
    expect(withTitle(undefined, 'Type: <string>')).toBe('Type: <string>')
  })
})

describe('extractMarkdown', () => {
  test('takes the article out of a docs page', async () => {
    const { calls, fetchMarkdown } = fetcherOf([{ markdown: 'article' }])

    expect(await extractMarkdown(fetchMarkdown, '/docs/api/x')).toEqual({
      markdown: 'article',
      selector: DOCS_CONTENT_SELECTOR
    })
    expect(calls).toEqual([DOCS_CONTENT_SELECTOR])
  })

  test('takes the main landmark out of every other page', async () => {
    const { calls, fetchMarkdown } = fetcherOf([{ markdown: 'landing' }])

    expect(await extractMarkdown(fetchMarkdown, '/pricing')).toEqual({
      markdown: 'landing',
      selector: MAIN_CONTENT_SELECTOR
    })
    expect(calls).toEqual([MAIN_CONTENT_SELECTOR])
  })

  test('walks down to the whole page when no marker is deployed yet', async () => {
    const { calls, fetchMarkdown } = fetcherOf([
      { markdown: '' },
      { markdown: '' },
      { markdown: 'nav + article' }
    ])

    expect(await extractMarkdown(fetchMarkdown, '/docs/api/x')).toEqual({
      markdown: 'nav + article',
      selector: null
    })
    expect(calls).toEqual([
      DOCS_CONTENT_SELECTOR,
      MAIN_CONTENT_SELECTOR,
      undefined
    ])
  })

  test('reports no markdown when nothing returns content', async () => {
    const { fetchMarkdown } = fetcherOf([{ markdown: '' }, { markdown: '' }])

    expect((await extractMarkdown(fetchMarkdown, '/pricing')).markdown).toBe('')
  })
})
