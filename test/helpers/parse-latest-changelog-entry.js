import { expect, test } from 'vitest'
import { parseLatestChangelogEntry } from '../../src/helpers/parse-latest-changelog-entry'

test('returns the first changelog bullet with its entry href', () => {
  const markdown = `### July 2026

- [Microlink](/): Redesigned [features](/features) with a unified showcase.
- [Browserless v13.6](https://browserless.js.org): Fixed screenshots.
`

  expect(parseLatestChangelogEntry(markdown)).toEqual({
    product: 'Microlink',
    description: 'Redesigned features with a unified showcase.',
    href: '/features'
  })
})

test('falls back to the product href when the description has no link', () => {
  const markdown = '- [Browserless v13.6](https://browserless.js.org): Fixed screenshots.'

  expect(parseLatestChangelogEntry(markdown)).toEqual({
    product: 'Browserless v13.6',
    description: 'Fixed screenshots.',
    href: 'https://browserless.js.org'
  })
})

test('returns null when no entry is present', () => {
  expect(parseLatestChangelogEntry('### July 2026\n\n')).toBeNull()
  expect(parseLatestChangelogEntry('')).toBeNull()
  expect(parseLatestChangelogEntry(null)).toBeNull()
})
