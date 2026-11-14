import { describe, expect, it } from 'vitest'

import { storedApiKey } from '../../../src/helpers/stored-api-key.js'

describe('storedApiKey', () => {
  it('reads the string saved from the editor and code snippets', () => {
    expect(storedApiKey('ml_live')).toBe('ml_live')
    expect(storedApiKey('  ml_live  ')).toBe('ml_live')
  })

  it('reads the object the bulk PDF field used to save', () => {
    expect(storedApiKey({ apiKey: 'ml_live' })).toBe('ml_live')
    expect(storedApiKey({ apiKey: '  ml_live  ' })).toBe('ml_live')
  })

  it('returns nothing when no key was saved', () => {
    expect(storedApiKey(undefined)).toBeUndefined()
    expect(storedApiKey(null)).toBeUndefined()
    expect(storedApiKey('')).toBeUndefined()
    expect(storedApiKey('   ')).toBeUndefined()
    expect(storedApiKey({ apiKey: '' })).toBeUndefined()
    expect(storedApiKey({ apiKey: 1 })).toBeUndefined()
    expect(storedApiKey(1)).toBeUndefined()
  })
})
