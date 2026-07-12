import { test, expect } from 'vitest'

import {
  extractHeader,
  extractMarkdownUrls,
  orderPages,
  buildLlmsFullTxt
} from '../../src/helpers/llms-full'

const llmsTxt = `# Microlink.io API Context for LLMs

Project: Microlink
Description: Turn any website into data.

## API Documentation
https://microlink.io/docs/api/getting-started/overview.md
https://microlink.io/docs/api/basics/authentication.md
`

test('extractHeader keeps everything before the first section', () => {
  expect(extractHeader(llmsTxt)).toBe(
    '# Microlink.io API Context for LLMs\n\nProject: Microlink\nDescription: Turn any website into data.'
  )
})

test('extractHeader returns the whole document when there is no section', () => {
  expect(extractHeader('# Title\n\nIntro.\n')).toBe('# Title\n\nIntro.')
})

test('extractMarkdownUrls returns the listed .md urls in order', () => {
  expect(extractMarkdownUrls(llmsTxt)).toEqual([
    'https://microlink.io/docs/api/getting-started/overview.md',
    'https://microlink.io/docs/api/basics/authentication.md'
  ])
})

test('orderPages follows the index, unlisted pages go last by url', () => {
  const index = ['https://example.com/b.md', 'https://example.com/a.md']
  const pages = [
    { url: 'https://example.com/a.md', markdown: 'A' },
    { url: 'https://example.com/z.md', markdown: 'Z' },
    { url: 'https://example.com/c.md', markdown: 'C' },
    { url: 'https://example.com/b.md', markdown: 'B' }
  ]

  expect(orderPages({ index, pages }).map(page => page.markdown)).toEqual([
    'B',
    'A',
    'C',
    'Z'
  ])
})

test('buildLlmsFullTxt concatenates pages under the header', () => {
  const output = buildLlmsFullTxt({
    header: '# Header\n\nIntro.',
    pages: [
      { url: 'https://example.com/a.md', markdown: 'Content A.' },
      { url: 'https://example.com/b.md', markdown: '  ' },
      { url: 'https://example.com/c.md', markdown: 'Content C.\n' }
    ]
  })

  expect(output).toBe(
    '# Header\n\nIntro.\n\n' +
      '---\nurl: https://example.com/a.md\n---\n\nContent A.\n\n' +
      '---\nurl: https://example.com/c.md\n---\n\nContent C.\n'
  )
})
