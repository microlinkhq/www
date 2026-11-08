import { describe, expect, it } from 'vitest'

import { getErrorMeta, toForcedError } from '../../../src/helpers/api-error.js'

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
