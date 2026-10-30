import { describe, expect, test, vi } from 'vitest'

import { bookCallUrl } from '../../../src/helpers/book-call'

vi.mock('helpers/gtag', () => ({ trackEvent: vi.fn() }))

const BASE =
  'https://cal.com/microlink/15min?utm_source=microlink&utm_medium=enterprise&utm_campaign=book_call'

describe('bookCallUrl', () => {
  test('omits utm_content without a lead ref', () => {
    expect(bookCallUrl('enterprise')).toBe(BASE)
    expect(bookCallUrl('enterprise', '')).toBe(BASE)
  })

  test('appends the lead ref as utm_content', () => {
    expect(bookCallUrl('enterprise', 'dpa')).toBe(`${BASE}&utm_content=dpa`)
  })

  test('encodes utm_content', () => {
    expect(bookCallUrl('enterprise', 'a&b=c')).toBe(
      `${BASE}&utm_content=a%26b%3Dc`
    )
  })
})
