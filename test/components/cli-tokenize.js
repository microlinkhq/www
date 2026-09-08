import { expect, test } from 'vitest'

import { parseCommand, toArgv } from '../../src/components/pages/cli/tokenize'

test('strips the microlink binary name', () => {
  expect(toArgv('microlink markdown https://example.com')).toEqual([
    'markdown',
    'https://example.com'
  ])
})

test('keeps quoted search queries as one argument', () => {
  expect(toArgv('search "best coffee" --limit 10')).toEqual([
    'search',
    'best coffee',
    '--limit',
    '10'
  ])
})

test('accepts a bare URL', () => {
  expect(toArgv('https://news.ycombinator.com/')).toEqual([
    'https://news.ycombinator.com/'
  ])
})

test('strips a trailing pipe to less', () => {
  expect(toArgv('metadata news.ycombinator.com/ | less')).toEqual([
    'metadata',
    'news.ycombinator.com/'
  ])
  expect(toArgv('microlink screenshot stripe.com | less')).toEqual([
    'screenshot',
    'stripe.com'
  ])
})

test('parseCommand records whether the line asked for a pager', () => {
  expect(parseCommand('help')).toEqual({ argv: ['help'], page: false })
  expect(parseCommand('microlink screenshot stripe.com | less')).toEqual({
    argv: ['screenshot', 'stripe.com'],
    page: true
  })
})
