import { describe, expect, test } from 'vitest'
import { hasDashboardSession } from '../../../src/helpers/dashboard-session'

describe('hasDashboardSession', () => {
  test('signed in when the Clerk client_uat cookie holds a timestamp', () => {
    expect(hasDashboardSession('__client_uat=1760953560')).toBe(true)
  })

  test('signed in when only the suffixed client_uat cookie is present', () => {
    expect(
      hasDashboardSession('_ga=GA1.1.1; __client_uat_Y2xlcmsu=1760953560')
    ).toBe(true)
  })

  test('signed out when Clerk resets client_uat to zero', () => {
    expect(hasDashboardSession('__client_uat=0; __client_uat_Y2xlcmsu=0')).toBe(
      false
    )
  })

  test('signed out without any client_uat cookie', () => {
    expect(hasDashboardSession('')).toBe(false)
    expect(hasDashboardSession()).toBe(false)
    expect(hasDashboardSession('_ga=GA1.1.1; theme=dark')).toBe(false)
  })

  test('ignores cookies that only share the prefix', () => {
    expect(hasDashboardSession('__client_uatx=1760953560')).toBe(false)
    expect(hasDashboardSession('__client_uat=garbage')).toBe(false)
  })
})
