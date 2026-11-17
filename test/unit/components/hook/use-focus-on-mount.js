import { describe, expect, test } from 'vitest'
import {
  assignRef,
  focusOnMount
} from '../../../../src/components/hook/use-focus-on-mount'

const focused = () => {
  const calls = []
  return {
    calls,
    element: {
      focus: options => calls.push(options)
    }
  }
}

describe('focusOnMount', () => {
  test('omitting the flag focuses without scrolling', () => {
    const { element, calls } = focused()
    focusOnMount(element)
    expect(calls).toEqual([{ preventScroll: true }])
  })

  test('an explicit focus flag focuses without scrolling', () => {
    const { element, calls } = focused()
    focusOnMount(element, true)
    expect(calls).toEqual([{ preventScroll: true }])
  })

  test('declining focus leaves the element alone', () => {
    const { element, calls } = focused()
    focusOnMount(element, false)
    expect(calls).toEqual([])
  })

  test('a missing element does not throw', () => {
    expect(() => focusOnMount(null, true)).not.toThrow()
  })
})

describe('assignRef', () => {
  test('a function ref is called with the node', () => {
    const seen = []
    assignRef(node => seen.push(node), 'field')
    expect(seen).toEqual(['field'])
  })

  test('an object ref receives the node', () => {
    const ref = { current: null }
    assignRef(ref, 'field')
    expect(ref.current).toBe('field')
  })

  test('a missing ref is ignored', () => {
    expect(() => assignRef(null, 'field')).not.toThrow()
  })
})
