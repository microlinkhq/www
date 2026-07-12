import { expect, describe, it } from 'vitest'

import { fullTitle } from '../../src/helpers/full-title.js'

describe('fullTitle', () => {
  it('appends the ` — name` brand suffix', () => {
    expect(fullTitle({ title: 'Pricing', name: 'Microlink' })).toBe(
      'Pricing — Microlink'
    )
  })

  it('omits the suffix when noSuffix is set', () => {
    expect(
      fullTitle({ title: 'Pricing', name: 'Microlink', noSuffix: true })
    ).toBe('Pricing')
  })

  it('changes when the site name changes', () => {
    expect(fullTitle({ title: 'Pricing', name: 'Microlink' })).not.toBe(
      fullTitle({ title: 'Pricing', name: 'Microlink API' })
    )
  })

  it('changes when the suffix is toggled off', () => {
    expect(fullTitle({ title: 'Pricing', name: 'Microlink' })).not.toBe(
      fullTitle({ title: 'Pricing', name: 'Microlink', noSuffix: true })
    )
  })
})
