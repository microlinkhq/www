import { describe, expect, test } from 'vitest'
import {
  accountLayer,
  isLayerHidden,
  swapLayerState
} from '../../../../../src/components/patterns/Toolbar/account-swap'

describe('swapLayerState', () => {
  test('the first state shows without motion and the other layer stays hidden', () => {
    const swap = { current: 'sign-in', previous: null }
    expect(swapLayerState('sign-in', swap)).toBe('shown')
    expect(swapLayerState('dashboard', swap)).toBe('hidden')
  })

  test('a change slides the new layer in and the old one out', () => {
    const swap = { current: 'dashboard', previous: 'sign-in' }
    expect(swapLayerState('dashboard', swap)).toBe('in')
    expect(swapLayerState('sign-in', swap)).toBe('out')
  })

  test('a layer on its way out is hidden from pointers and assistive tech', () => {
    expect(isLayerHidden('out')).toBe(true)
    expect(isLayerHidden('hidden')).toBe(true)
    expect(isLayerHidden('in')).toBe(false)
    expect(isLayerHidden('shown')).toBe(false)
  })
})

describe('accountLayer', () => {
  test('pending keeps the Dashboard layer so a signed-in visit never flashes Sign In', () => {
    expect(accountLayer('sign-in')).toBe('sign-in')
    expect(accountLayer('pending')).toBe('dashboard')
    expect(accountLayer('account')).toBe('dashboard')
  })
})
