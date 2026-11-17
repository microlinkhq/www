import { describe, expect, test } from 'vitest'
import {
  exampleHint,
  fillInput,
  shouldFillExample
} from '../../../../../src/components/elements/Input/example'

const keyEvent = (overrides = {}, value = '') => ({
  key: 'Tab',
  shiftKey: false,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  currentTarget: { value },
  ...overrides
})

describe('exampleHint', () => {
  test('reads like the dashboard placeholder', () => {
    expect(exampleHint('example.com')).toBe('e.g., example.com')
  })
})

describe('shouldFillExample', () => {
  test('Tab on an empty field fills the example', () => {
    expect(shouldFillExample(keyEvent(), 'example.com')).toBe(true)
  })

  test('a field with a value keeps Tab as focus navigation', () => {
    expect(shouldFillExample(keyEvent({}, 'stripe.com'), 'example.com')).toBe(
      false
    )
  })

  test('Shift+Tab and modified Tab move focus instead', () => {
    for (const modifier of ['shiftKey', 'altKey', 'ctrlKey', 'metaKey']) {
      expect(
        shouldFillExample(keyEvent({ [modifier]: true }), 'example.com')
      ).toBe(false)
    }
  })

  test('other keys never fill', () => {
    expect(shouldFillExample(keyEvent({ key: 'Enter' }), 'example.com')).toBe(
      false
    )
  })

  test('without an example Tab is untouched', () => {
    expect(shouldFillExample(keyEvent(), undefined)).toBe(false)
    expect(shouldFillExample(keyEvent(), '')).toBe(false)
  })
})

describe('fillInput', () => {
  test('sets the value through the prototype setter and emits a bubbling input event', () => {
    const events = []
    const proto = {}
    let stored = ''
    Object.defineProperty(proto, 'value', {
      get: () => stored,
      set: next => {
        stored = next
      }
    })
    const input = Object.create(proto)
    input.dispatchEvent = event => events.push(event)
    fillInput(input, 'example.com')
    expect(input.value).toBe('example.com')
    expect(events).toHaveLength(1)
    expect(events[0].type).toBe('input')
    expect(events[0].bubbles).toBe(true)
  })
})
