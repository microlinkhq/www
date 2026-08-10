import { describe, expect, test } from 'vitest'

import {
  DOCS_CONTENT_SELECTOR,
  extractMarkdown,
  withTitle
} from '../../src/helpers/docs-markdown.js'

const fetcherOf = responses => {
  const calls = []
  const fetchMarkdown = async selector => {
    calls.push(selector)
    return responses.shift()
  }
  return { calls, fetchMarkdown }
}

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
  test('asks for the scoped content first', async () => {
    const { calls, fetchMarkdown } = fetcherOf([{ markdown: 'article' }])

    expect(await extractMarkdown(fetchMarkdown)).toEqual({
      markdown: 'article',
      isScoped: true
    })
    expect(calls).toEqual([DOCS_CONTENT_SELECTOR])
  })

  test('falls back to the whole page when the marker is not deployed yet', async () => {
    const { calls, fetchMarkdown } = fetcherOf([
      { markdown: '' },
      { markdown: 'nav + article' }
    ])

    expect(await extractMarkdown(fetchMarkdown)).toEqual({
      markdown: 'nav + article',
      isScoped: false
    })
    expect(calls).toEqual([DOCS_CONTENT_SELECTOR, undefined])
  })

  test('reports no markdown when neither attempt returns content', async () => {
    const { fetchMarkdown } = fetcherOf([{ markdown: '' }, { markdown: '' }])

    expect((await extractMarkdown(fetchMarkdown)).markdown).toBe('')
  })
})
