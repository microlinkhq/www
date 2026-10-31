import { describe, expect, test } from 'vitest'

import { metaTitleProps } from '../../../src/helpers/meta-title'

describe('metaTitleProps', () => {
  test('replaces the title and drops the site suffix', () => {
    expect(metaTitleProps('Microlink DPA')).toEqual({
      title: 'Microlink DPA',
      noSuffix: true
    })
  })

  test('keeps the page title when there is no metaTitle', () => {
    expect(metaTitleProps(undefined)).toEqual({})
    expect(metaTitleProps(null)).toEqual({})
    expect(metaTitleProps('')).toEqual({})
  })
})
