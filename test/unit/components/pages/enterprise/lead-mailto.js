import { describe, expect, test } from 'vitest'

import {
  DPA_LEAD_REF,
  DPA_MAILTO,
  toLeadMailto
} from '../../../../../src/components/pages/enterprise/lead-mailto'

const FALLBACK = 'mailto:hello@microlink.io?subject=Fallback'

describe('toLeadMailto', () => {
  test('maps the dpa lead ref to the signed DPA mailto', () => {
    expect(toLeadMailto(DPA_LEAD_REF, FALLBACK)).toBe(DPA_MAILTO)
  })

  test('falls back for a missing or unmapped lead ref', () => {
    expect(toLeadMailto(undefined, FALLBACK)).toBe(FALLBACK)
    expect(toLeadMailto('business', FALLBACK)).toBe(FALLBACK)
  })

  test('never resolves an inherited object key', () => {
    for (const key of Object.getOwnPropertyNames(Object.prototype)) {
      expect(toLeadMailto(key, FALLBACK)).toBe(FALLBACK)
    }
  })
})
