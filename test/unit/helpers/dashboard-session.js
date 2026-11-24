import { describe, expect, test } from 'vitest'
import { signedInMarker } from '../../../src/helpers/dashboard-session'

describe('signedInMarker', () => {
  test('returns the sign-in timestamp from the Clerk client_uat cookie', () => {
    expect(signedInMarker('__client_uat=1760953560')).toBe('1760953560')
  })

  test('reads the suffixed client_uat cookie', () => {
    expect(
      signedInMarker('_ga=GA1.1.1; __client_uat_Y2xlcmsu=1760953560')
    ).toBe('1760953560')
  })

  test('signed out when Clerk resets client_uat to zero', () => {
    expect(signedInMarker('__client_uat=0; __client_uat_Y2xlcmsu=0')).toBe(null)
  })

  test('signed out without any client_uat cookie', () => {
    expect(signedInMarker('')).toBe(null)
    expect(signedInMarker()).toBe(null)
    expect(signedInMarker('_ga=GA1.1.1; theme=dark')).toBe(null)
  })

  test('ignores cookies that only share the prefix', () => {
    expect(signedInMarker('__client_uatx=1760953560')).toBe(null)
    expect(signedInMarker('__client_uat=garbage')).toBe(null)
  })

  test('signed out when the value is not a whole positive timestamp', () => {
    expect(signedInMarker('__client_uat=1760953560invalid')).toBe(null)
    expect(signedInMarker('__client_uat=+1760953560')).toBe(null)
    expect(signedInMarker('__client_uat=1e10')).toBe(null)
    expect(signedInMarker('__client_uat=1.5')).toBe(null)
    expect(signedInMarker('__client_uat= 1760953560')).toBe(null)
    expect(signedInMarker('__client_uat=-1')).toBe(null)
  })

  test('signed in when the two client_uat cookies disagree', () => {
    expect(
      signedInMarker('__client_uat=0; __client_uat_Y2xlcmsu=1760953560')
    ).toBe('1760953560')
  })

  test('a new sign-in yields a different marker', () => {
    expect(signedInMarker('__client_uat=1760953560')).not.toBe(
      signedInMarker('__client_uat=1760960000')
    )
  })

  test('uses the first signed-in client_uat when another one follows', () => {
    expect(signedInMarker('__client_uat=111; __client_uat_Y2xlcmsu=222')).toBe(
      '111'
    )
  })
})
