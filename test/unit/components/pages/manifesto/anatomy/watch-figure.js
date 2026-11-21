import { afterEach, describe, expect, test } from 'vitest'

import { watchFigure } from '../../../../../../src/components/pages/manifesto/anatomy/watch-figure'

const flush = () => Promise.resolve().then(() => Promise.resolve())

const installObserver = () => {
  let observer
  const previous = globalThis.window
  globalThis.window = {
    IntersectionObserver: class {
      constructor (callback, options) {
        observer = { callback, options, disconnected: false }
      }

      observe () {}

      disconnect () {
        observer.disconnected = true
      }
    }
  }
  return {
    get observer () {
      return observer
    },
    restore () {
      if (previous === undefined) delete globalThis.window
      else globalThis.window = previous
    }
  }
}

describe('watchFigure', () => {
  let installed

  afterEach(() => installed?.restore())

  test('does nothing without a node', () => {
    expect(
      watchFigure(
        null,
        () => {},
        () => {}
      )
    ).toBeUndefined()
  })

  test('loads once any entry in the batch is on screen', async () => {
    installed = installObserver()
    const seen = []
    const stop = watchFigure(
      {},
      () =>
        Promise.resolve({
          default: { html: 'from-default' },
          html: 'from-module'
        }),
      value => seen.push(value)
    )
    expect(installed.observer.options.rootMargin).toBe('600px 0px')
    installed.observer.callback([
      { isIntersecting: false },
      { isIntersecting: true }
    ])
    await flush()
    expect(seen).toEqual([{ html: 'from-default' }])
    expect(installed.observer.disconnected).toBe(true)
    stop()
  })

  test('uses the module itself when it has no default export', async () => {
    installed = installObserver()
    const seen = []
    watchFigure(
      {},
      () => Promise.resolve({ html: 'from-module' }),
      value => seen.push(value)
    )
    installed.observer.callback([{ isIntersecting: true }])
    await flush()
    expect(seen).toEqual([{ html: 'from-module' }])
  })

  test('stays on the placeholder when every entry is off screen', () => {
    installed = installObserver()
    let loaded = false
    watchFigure(
      {},
      () => {
        loaded = true
        return Promise.resolve({ html: 'nope' })
      },
      () => {}
    )
    installed.observer.callback([{ isIntersecting: false }])
    expect(loaded).toBe(false)
    expect(installed.observer.disconnected).toBe(false)
  })

  test('ignores a load that finishes after the figure unmounts', async () => {
    installed = installObserver()
    let finish
    const seen = []
    const stop = watchFigure(
      {},
      () =>
        new Promise(resolve => {
          finish = resolve
        }),
      value => seen.push(value)
    )
    installed.observer.callback([{ isIntersecting: true }])
    stop()
    finish({ default: { html: 'late' } })
    await flush()
    expect(seen).toEqual([])
  })

  test('keeps the placeholder when the figure chunk rejects', async () => {
    installed = installObserver()
    const seen = []
    watchFigure(
      {},
      () => Promise.reject(new Error('chunk failed')),
      value => seen.push(value)
    )
    installed.observer.callback([{ isIntersecting: true }])
    await flush()
    expect(seen).toEqual([])
  })
})
