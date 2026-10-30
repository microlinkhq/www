import { describe, expect, test } from 'vitest'

import { toLeadRef } from '../../../../src/components/hook/use-lead-ref'

describe('toLeadRef', () => {
  test('reads the ref query parameter', () => {
    expect(toLeadRef('?ref=dpa')).toBe('dpa')
    expect(toLeadRef('?utm_source=x&ref=business')).toBe('business')
  })

  test('normalizes case and whitespace', () => {
    expect(toLeadRef('?ref=%20DPA%20')).toBe('dpa')
  })

  test('ignores missing or malformed refs', () => {
    expect(toLeadRef('')).toBeUndefined()
    expect(toLeadRef('?ref=')).toBeUndefined()
    expect(toLeadRef('?ref=%3Cscript%3E')).toBeUndefined()
    expect(toLeadRef(`?ref=${'a'.repeat(33)}`)).toBeUndefined()
  })
})
