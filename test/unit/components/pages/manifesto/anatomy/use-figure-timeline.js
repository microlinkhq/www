import { afterEach, describe, expect, test } from 'vitest'

import { bindFigureTimeline } from '../../../../../../src/components/pages/manifesto/anatomy/use-figure-timeline'

const PERIOD = 4
const REST_SHARE = 0.5

const installWindow = ({ reduced }) => {
  const frames = new Map()
  const timeouts = []
  const motionListeners = new Set()
  let nextFrame = 1
  let matches = reduced
  let observer
  const media = {
    get matches () {
      return matches
    },
    addEventListener (type, fn) {
      if (type === 'change') motionListeners.add(fn)
    },
    removeEventListener (type, fn) {
      if (type === 'change') motionListeners.delete(fn)
    }
  }
  const previous = globalThis.window
  globalThis.window = {
    matchMedia: () => media,
    IntersectionObserver: class {
      constructor (callback, options) {
        observer = { callback, options, disconnected: false }
      }

      observe () {}

      disconnect () {
        observer.disconnected = true
      }
    },
    requestAnimationFrame (fn) {
      const id = nextFrame++
      frames.set(id, fn)
      return id
    },
    cancelAnimationFrame (id) {
      frames.delete(id)
    },
    setTimeout (fn, delay) {
      timeouts.push({ fn, delay, cleared: false })
      return timeouts.length
    },
    clearTimeout (id) {
      if (timeouts[id - 1]) timeouts[id - 1].cleared = true
    }
  }
  return {
    frames,
    timeouts,
    motionListeners,
    get observer () {
      return observer
    },
    setReduced (value) {
      matches = value
    },
    restore () {
      if (previous === undefined) delete globalThis.window
      else globalThis.window = previous
    }
  }
}

const harness = ({
  reduced = false,
  restShare = REST_SHARE,
  width = 100
} = {}) => {
  const poses = []
  const listeners = {}
  const stage = {
    rect: { left: 0, width, top: 0, height: 40 },
    getBoundingClientRect () {
      return this.rect
    },
    addEventListener (type, fn) {
      listeners[type] = fn
    },
    removeEventListener (type) {
      delete listeners[type]
    }
  }
  const root = {
    querySelector (selector) {
      return selector === '.iso-stage' ? stage : null
    }
  }
  const installed = installWindow({ reduced })
  const stop = bindFigureTimeline(root, {
    source: { motion: { period: PERIOD } },
    restShare,
    createPose: () => () => time => poses.push(time)
  })
  const key = name => {
    let prevented = false
    listeners.keydown({
      key: name,
      preventDefault () {
        prevented = true
      }
    })
    return prevented
  }
  const pointer = (pointerType, clientX) => {
    listeners.pointermove({ pointerType, clientX })
  }
  return { poses, listeners, key, pointer, stop, ...installed }
}

describe('bindFigureTimeline', () => {
  let env

  afterEach(() => env?.restore())

  test('returns without touching the page when there is no root or source', () => {
    const pose = () => {}
    expect(
      bindFigureTimeline(null, {
        source: { motion: { period: PERIOD } },
        restShare: 0,
        createPose: () => () => pose
      })
    ).toBeUndefined()
    expect(
      bindFigureTimeline(
        {},
        {
          source: null,
          restShare: 0,
          createPose: () => () => pose
        }
      )
    ).toBeUndefined()
  })

  test.each([
    ['ArrowRight', 1],
    ['ArrowUp', 1],
    ['ArrowLeft', -1],
    ['ArrowDown', -1]
  ])('%s steps the still pose by a quarter period', (keyName, direction) => {
    env = harness({ reduced: true })
    expect(env.poses).toEqual([PERIOD * REST_SHARE])
    expect(env.key(keyName)).toBe(true)
    expect(env.poses.at(-1)).toBe(PERIOD * REST_SHARE + direction)
  })

  test('a key that is not a step leaves the still pose alone', () => {
    env = harness({ reduced: true })
    expect(env.key('Enter')).toBe(false)
    expect(env.poses).toEqual([PERIOD * REST_SHARE])
  })

  test('does not step before the start of the loop', () => {
    env = harness({ reduced: true, restShare: 0 })
    env.key('ArrowLeft')
    expect(env.poses).toEqual([0, 0])
  })

  test.each(['mouse', 'pen'])(
    '%s pointer scrubs within the current cycle',
    pointerType => {
      env = harness({ reduced: true })
      env.pointer(pointerType, 100)
      expect(env.poses.at(-1)).toBeCloseTo(PERIOD * 0.999, 5)
      expect(env.poses.at(-1)).toBeLessThan(PERIOD)
    }
  )

  test('a touch move does not scrub, so scrolling the page keeps the pose', () => {
    env = harness({ reduced: true })
    env.pointer('touch', 100)
    expect(env.poses).toEqual([PERIOD * REST_SHARE])
  })

  test('plays only while the latest intersection says it is on screen', () => {
    env = harness({ reduced: false })
    expect(env.observer.options.rootMargin).toBe('120px 0px')
    expect(env.frames.size).toBe(0)
    env.observer.callback([{ isIntersecting: true }, { isIntersecting: false }])
    expect(env.frames.size).toBe(0)
    env.observer.callback([{ isIntersecting: true }])
    expect(env.frames.size).toBe(1)
  })

  test('reduced motion jumps back to the rest pose when the preference changes', () => {
    env = harness({ reduced: false })
    env.observer.callback([{ isIntersecting: true }])
    expect(env.frames.size).toBe(1)
    env.setReduced(true)
    env.motionListeners.forEach(fn => fn())
    expect(env.poses.at(-1)).toBe(PERIOD * REST_SHARE)
    expect(env.frames.size).toBe(0)
  })

  test('turning motion back on resumes the tour while the figure is on screen', () => {
    env = harness({ reduced: true })
    env.observer.callback([{ isIntersecting: true }])
    expect(env.frames.size).toBe(0)
    env.setReduced(false)
    env.motionListeners.forEach(fn => fn())
    expect(env.frames.size).toBe(1)
  })

  test('after a scrub, the idle timer hands the figure back to the tour', () => {
    env = harness({ reduced: false })
    env.key('ArrowRight')
    expect(env.frames.size).toBe(0)
    expect(env.timeouts[0].delay).toBe(3600)
    env.timeouts[0].fn()
    env.observer.callback([{ isIntersecting: true }])
    const frame = [...env.frames.values()][0]
    frame(16)
    expect(env.poses.at(-1)).toBeLessThan(0.03)
  })

  test('cleanup drops the stage listeners and the motion preference listener', () => {
    env = harness({ reduced: true })
    env.stop()
    expect(env.listeners.keydown).toBeUndefined()
    expect(env.listeners.pointermove).toBeUndefined()
    expect(env.motionListeners.size).toBe(0)
    expect(env.observer.disconnected).toBe(true)
  })
})
