import { describe, expect, test } from 'vitest'
import {
  applyExampleKey,
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

const shadowedInput = (own = '') => {
  const proto = {}
  const state = { proto: '', own, events: [] }
  Object.defineProperty(proto, 'value', {
    configurable: true,
    get: () => state.proto,
    set: next => {
      state.proto = next
    }
  })
  const input = Object.create(proto)
  Object.defineProperty(input, 'value', {
    configurable: true,
    get: () => state.own,
    set: next => {
      state.own = next
    }
  })
  input.dispatchEvent = event => state.events.push(event)
  return { input, state }
}

describe('fillInput', () => {
  test('sets the value through the prototype setter and emits a bubbling input event', () => {
    const { input, state } = shadowedInput()
    fillInput(input, 'example.com')
    expect(state.proto).toBe('example.com')
    expect(state.own).toBe('')
    expect(state.events).toHaveLength(1)
    expect(state.events[0].type).toBe('input')
    expect(state.events[0].bubbles).toBe(true)
  })
})

describe('applyExampleKey', () => {
  test('Tab on an empty field fills the example and still notifies the caller', () => {
    const { input, state } = shadowedInput()
    const seen = []
    const event = {
      ...keyEvent(),
      currentTarget: input,
      preventDefault: () => {
        event.defaultPrevented = true
      }
    }
    applyExampleKey(event, 'example.com', seen.push.bind(seen))
    expect(event.defaultPrevented).toBe(true)
    expect(state.proto).toBe('example.com')
    expect(state.own).toBe('')
    expect(seen).toEqual([event])
  })

  test('a field with a value keeps Tab and still notifies the caller', () => {
    const seen = []
    const event = {
      ...keyEvent({}, 'stripe.com'),
      preventDefault: () => {
        event.defaultPrevented = true
      }
    }
    applyExampleKey(event, 'example.com', seen.push.bind(seen))
    expect(event.defaultPrevented).toBeUndefined()
    expect(seen).toEqual([event])
  })

  test('without a caller handler, Tab still fills', () => {
    const { input, state } = shadowedInput()
    const event = {
      ...keyEvent(),
      currentTarget: input,
      preventDefault: () => {
        event.defaultPrevented = true
      }
    }
    applyExampleKey(event, 'example.com')
    expect(event.defaultPrevented).toBe(true)
    expect(state.proto).toBe('example.com')
  })
})
