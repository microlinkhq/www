import { describe, expect, test } from 'vitest'

import { errorCopy } from '../../../../src/components/patterns/FetchProvider'

describe('FetchProvider error copy', () => {
  test('shows the API description with a link to learn more', () => {
    expect(
      errorCopy({
        code: 'ERATE',
        description: 'Your daily rate limit has been reached.',
        more: 'https://microlink.io/erate'
      })
    ).toEqual({
      text: 'Your daily rate limit has been reached.',
      more: 'https://microlink.io/erate',
      linkText: 'Learn more.'
    })
  })

  test('an error without a description asks to report the URL', () => {
    expect(errorCopy({ more: 'https://microlink.io/report' })).toEqual({
      text: 'The URL has something weird.',
      more: 'https://microlink.io/report',
      linkText: 'Report it.'
    })
    expect(errorCopy().text).toBe('The URL has something weird.')
  })
})
