import { describe, it, expect } from 'vitest'

import getLines from '../../src/helpers/get-lines.js'

const values = [
  ['', null],
  [null, null],
  [undefined, null],
  ['language-json{3}', [3]],
  ['language-json{33}', [33]],
  ['language-json{3,5}', [3, 5]],
  ['language-json{33,55}', [33, 55]]
]

describe('getLines', () => {
  values.forEach(([str, result]) => {
    it(`${str} → ${result}`, () => {
      expect(getLines(str)).toEqual(result)
    })
  })
})
