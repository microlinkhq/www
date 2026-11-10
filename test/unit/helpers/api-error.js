import { describe, expect, it } from 'vitest'

import {
  getErrorMeta,
  normalizeApiError,
  upgradeErrorFor,
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

describe('upgradeErrorFor', () => {
  const failed = (url, code) => ({ url, success: false, error: { code } })

  it('prefers the rate limit, which blocks every remaining url', () => {
    expect(
      upgradeErrorFor([
        failed('https://a.com', 'EPROXYNEEDED'),
        failed('https://b.com', 'ERATE')
      ])
    ).toEqual({ code: 'ERATE' })
  })

  it('treats an HTTP 429 as the rate limit', () => {
    expect(upgradeErrorFor([failed('https://a.com', 429)])).toEqual({
      code: 'ERATE'
    })
  })

  it('returns the antibot code when a result was blocked', () => {
    expect(
      upgradeErrorFor([
        failed('https://a.com', 'ETIMEOUT'),
        failed('https://b.com', 'EPROXYNEEDED'),
        failed('https://c.com', 'EPROXYNEEDED')
      ])
    ).toEqual({ code: 'EPROXYNEEDED' })
  })

  it('stays quiet for errors an upgrade does not fix', () => {
    expect(upgradeErrorFor([failed('https://a.com', 'ETIMEOUT')])).toBeNull()
    expect(upgradeErrorFor([])).toBeNull()
  })

  it('leaves a keyed rate limit on the error, not the anonymous upgrade', () => {
    const keyed = (url, code) => ({
      ...failed(url, code),
      error: { code, keyed: true }
    })
    expect(
      upgradeErrorFor([
        keyed('https://a.com', 'ERATE'),
        failed('https://b.com', 'ERATE')
      ])
    ).toBeNull()
    expect(upgradeErrorFor([keyed('https://a.com', 429)])).toBeNull()
    expect(
      upgradeErrorFor([
        keyed('https://a.com', 'ERATE'),
        failed('https://b.com', 'EPROXYNEEDED')
      ])
    ).toEqual({ code: 'EPROXYNEEDED' })
  })

  it('copies the keyed flag from the request error', () => {
    expect(
      normalizeApiError.fromMql({ code: 'ERATE', keyed: true }, 'fallback')
    ).toEqual({ code: 'ERATE', message: 'fallback', keyed: true })
    expect(
      normalizeApiError.fromMql({ statusCode: 429, keyed: true }, 'fallback')
    ).toMatchObject({ code: 'ERATE', keyed: true })
    expect(normalizeApiError.fromMql({ code: 'ERATE' }, 'fallback')).toEqual({
      code: 'ERATE',
      message: 'fallback'
    })
  })
})
