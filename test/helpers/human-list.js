import { expect, test } from 'vitest'
import { humanList } from '../../src/helpers/human-list'

test('append & before the last item in an array', () => {
  expect(humanList(['apple', 'banana', 'cherry'])).toBe(
    'apple, banana & cherry'
  )
  expect(humanList(['apple', 'banana'])).toBe('apple & banana')
  expect(humanList(['apple'])).toBe('apple')
})
