import { describe, expect, test } from 'vitest'

import {
  researcherAvatarUrl,
  websiteLabel
} from '../../../src/helpers/researcher'
import { UNAVATAR_TOKEN } from '../../../src/helpers/unavatar'

describe('researcher', () => {
  test('avatar resolves by email and keeps unavatar default fallback', () => {
    const url = new URL(researcherAvatarUrl('peter@severadao.ai'))
    expect(url.origin).toBe('https://unavatar.io')
    expect(decodeURIComponent(url.pathname)).toBe('/peter@severadao.ai')
    expect(url.searchParams.get('token')).toBe(UNAVATAR_TOKEN)
    expect(url.searchParams.has('fallback')).toBe(false)
  })

  test('website label is the bare hostname', () => {
    expect(websiteLabel('https://www.severadao.ai')).toBe('severadao.ai')
    expect(websiteLabel('https://danielwang.dev/about')).toBe('danielwang.dev')
  })
})
