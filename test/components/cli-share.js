import { expect, test } from 'vitest'

import {
  commandToShareLine,
  commandToTraceLine,
  parseSharedLine,
  sanitizeShareLine,
  shareHref,
  sharePath
} from '../../src/components/pages/cli/share'

const loc = href => ({ href })

test('parses q from the query string', () => {
  expect(parseSharedLine('?q=screenshot+stripe.com')).toBe(
    'screenshot stripe.com'
  )
  expect(parseSharedLine('')).toBe('')
  expect(parseSharedLine('?q=')).toBe('')
})

test('sharePath writes and clears q', () => {
  expect(
    sharePath('screenshot stripe.com', loc('https://microlink.io/terminal'))
  ).toBe('/terminal?q=screenshot+stripe.com')
  expect(
    sharePath('', loc('https://microlink.io/terminal?q=screenshot+stripe.com'))
  ).toBe('/terminal')
})

test('sharePath keeps other params and the hash', () => {
  expect(
    sharePath('help', loc('https://microlink.io/terminal?ref=cli#cli-terminal'))
  ).toBe('/terminal?ref=cli&q=help#cli-terminal')
})

test('commandToShareLine strips the prompt prefix', () => {
  expect(commandToShareLine('microlink kikobeats.com')).toBe('kikobeats.com')
  expect(commandToShareLine('microlink screenshot stripe.com')).toBe(
    'screenshot stripe.com'
  )
  expect(commandToShareLine('help')).toBe('help')
})

test('commandToTraceLine appends --trace once', () => {
  expect(commandToTraceLine('microlink screenshot stripe.com')).toBe(
    'microlink screenshot stripe.com --trace'
  )
  expect(commandToTraceLine('microlink screenshot stripe.com --trace')).toBe(
    'microlink screenshot stripe.com --trace'
  )
  expect(commandToTraceLine('microlink stripe.com --trace-full')).toBe(
    'microlink stripe.com --trace-full'
  )
  expect(
    commandToTraceLine('screenshot stripe.com --api-key sk_live_xxx')
  ).toBe('screenshot stripe.com --trace')
  expect(commandToTraceLine('')).toBe('')
})

test('shareHref builds an absolute permalink', () => {
  expect(
    shareHref('microlink kikobeats.com', loc('https://microlink.io/terminal'))
  ).toBe('https://microlink.io/terminal?q=kikobeats.com')
})

test('strips --api-key from shared lines', () => {
  expect(sanitizeShareLine('screenshot stripe.com --api-key sk_live_xxx')).toBe(
    'screenshot stripe.com'
  )
  expect(sanitizeShareLine('--api-key=sk_live_xxx screenshot stripe.com')).toBe(
    'screenshot stripe.com'
  )
  expect(
    parseSharedLine('?q=screenshot+stripe.com+--api-key+sk_live_xxx')
  ).toBe('screenshot stripe.com')
})
