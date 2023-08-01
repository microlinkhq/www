import test from 'ava'

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

values.forEach(([str, result]) => {
  test(`${str} → ${result}`, t => {
    t.deepEqual(getLines(str), result)
  })
})
