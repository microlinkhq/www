import { describe, expect, it } from 'vitest'

import {
  getErrorMeta,
  signupErrorFor,
  toForcedError
} from '../../../src/helpers/api-error.js'

describe('toForcedError', () => {
  it('turns a state value into the error code the panel renders', () => {
    const error = toForcedError('EPROXYNEEDED')
    expect(error.code).toBe('EPROXYNEEDED')
    expect(getErrorMeta(error.code).title).toBe('Antibot detected')
  })

  it('accepts lowercase and padded values', () => {
    expect(toForcedError(' erate ').code).toBe('ERATE')
  })

  it('falls back to the generic panel for unknown codes', () => {
    expect(getErrorMeta(toForcedError('whatever').code).title).toBe(
      'Request failed'
    )
  })

  it('forces nothing without a state value', () => {
    expect(toForcedError(undefined)).toBeNull()
    expect(toForcedError('')).toBeNull()
    expect(toForcedError('   ')).toBeNull()
    expect(toForcedError(['ERATE'])).toBeNull()
  })
})

describe('signupErrorFor', () => {
  const failed = (url, code) => ({ url, success: false, error: { code } })

  it('prefers the rate limit, which blocks every remaining url', () => {
    expect(
      signupErrorFor([
        failed('https://a.com', 'EPROXYNEEDED'),
        failed('https://b.com', 'ERATE')
      ])
    ).toEqual({ code: 'ERATE' })
  })

  it('treats an HTTP 429 as the rate limit', () => {
    expect(signupErrorFor([failed('https://a.com', 429)])).toEqual({
      code: 'ERATE'
    })
  })

  it('points the antibot prompt at the first blocked url', () => {
    expect(
      signupErrorFor([
        failed('https://a.com', 'ETIMEOUT'),
        failed('https://b.com', 'EPROXYNEEDED'),
        failed('https://c.com', 'EPROXYNEEDED')
      ])
    ).toEqual({ code: 'EPROXYNEEDED', url: 'https://b.com' })
  })

  it('stays quiet for errors a key does not fix', () => {
    expect(signupErrorFor([failed('https://a.com', 'ETIMEOUT')])).toBeNull()
    expect(signupErrorFor([])).toBeNull()
  })
})
