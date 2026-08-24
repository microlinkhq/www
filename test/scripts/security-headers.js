import { describe, expect, test } from 'vitest'

import { mergeHeaders } from '../../scripts/security-headers.js'

const HELMET_DIFF = [
  { key: 'content-security-policy', value: "default-src 'self'" },
  { key: 'x-frame-options', value: 'SAMEORIGIN' }
]

describe('regenerating the global header rule', () => {
  test('keeps the agent headers helmet knows nothing about', () => {
    const merged = mergeHeaders(
      [
        { key: 'content-security-policy', value: 'stale' },
        { key: 'link', value: '</llms.txt>; rel="describedby"' },
        { key: 'vary', value: 'Accept, Accept-Encoding' }
      ],
      HELMET_DIFF
    )

    expect(merged).toContainEqual({
      key: 'vary',
      value: 'Accept, Accept-Encoding'
    })
    expect(merged).toContainEqual({
      key: 'link',
      value: '</llms.txt>; rel="describedby"'
    })
  })

  test('takes helmet as the authority on the headers it does emit', () => {
    const merged = mergeHeaders(
      [{ key: 'content-security-policy', value: 'stale' }],
      HELMET_DIFF
    )

    expect(merged).toEqual(HELMET_DIFF)
  })
})
