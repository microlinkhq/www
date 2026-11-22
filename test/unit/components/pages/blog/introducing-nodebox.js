import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import {
  HOPS,
  RunDiagram,
  STAGES
} from '../../../../../src/components/pages/blog/introducing-nodebox/RunDiagram'
import {
  CUBE_FRAMES,
  CUBE_LIT_COLOR,
  CUBE_QUARTER_TURN_MS,
  CUBE_SHADE_COLOR
} from '../../../../../src/components/pages/blog/introducing-nodebox/cube-frames'
import { SpinningCube } from '../../../../../src/components/pages/blog/introducing-nodebox/SpinningCube'
import {
  REDUCED_MOTION_QUERY,
  bindCubeMotion,
  followReducedMotion,
  watchViewport
} from '../../../../../src/components/pages/blog/introducing-nodebox/use-cube-motion'
import themeSpec from '../../../../../src/theme'

const CANVAS_WIDTH = 960

const render = Component => {
  const sheet = new ServerStyleSheet()
  try {
    return renderToStaticMarkup(
      sheet.collectStyles(
        <ThemeProvider theme={themeSpec}>
          <Component />
        </ThemeProvider>
      )
    )
  } finally {
    sheet.seal()
  }
}

const viewBoxHeight = html => Number(html.match(/viewBox="0 0 \d+ (\d+)"/)[1])

const boxes = html =>
  [
    ...html.matchAll(
      /<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g
    )
  ].map(([, x, y, width, height]) => ({
    right: Number(x) + Number(width),
    bottom: Number(y) + Number(height)
  }))

const expectInsideCanvas = html => {
  const height = viewBoxHeight(html)
  const shapes = boxes(html)
  expect(shapes.length).toBeGreaterThan(0)
  shapes.forEach(({ right, bottom }) => {
    expect(right).toBeLessThanOrEqual(CANVAS_WIDTH)
    expect(bottom).toBeLessThanOrEqual(height)
  })
}

describe('RunDiagram', () => {
  test('labels every stage and both directions of every hop', () => {
    const html = render(RunDiagram)
    STAGES.forEach(({ label, node }) => {
      expect(html).toContain(label)
      expect(html).toContain(node.name)
    })
    HOPS.forEach(({ request, reply }) => {
      expect(html).toContain(`>${request}<`)
      expect(html).toContain(`>${reply}<`)
    })
  })

  test('keeps every shape inside the canvas', () => {
    expectInsideCanvas(render(RunDiagram))
  })
})

describe('SpinningCube', () => {
  test('draws every face from the resting frame and turns it every quarter turn', () => {
    const html = render(SpinningCube)
    expect(html).toContain('aria-label="Play the Nodebox cube"')
    expect(html).not.toContain('aria-pressed')
    expect(html).toContain('begin="indefinite"')
    expect(html).toContain('fill="#ea6195"')
    expect(html).toContain('fill="#e11d68"')
    expect(html).toContain('fill="#b41753"')
    const sideCount = CUBE_FRAMES[0].sides.length
    expect(html.match(/<path /g)).toHaveLength(sideCount + 1)
    expect(
      html.match(new RegExp(`dur="${CUBE_QUARTER_TURN_MS}ms"`, 'g'))
    ).toHaveLength(sideCount * 2 + 1)
  })

  test('ends each turn where the next one starts, so the loop has no jump', () => {
    const first = CUBE_FRAMES[0]
    const last = CUBE_FRAMES[CUBE_FRAMES.length - 1]
    const visibleShape = frame =>
      frame.sides
        .filter(side => side.visible)
        .map(side => side.d)
        .sort()
    expect(visibleShape(last)).toEqual(visibleShape(first))
    expect(samePolygon(last.top, first.top)).toBe(true)
    expect(first.top).toBe('M12 2L21 7L12 12L3 7Z')
  })

  test('shows the two faces turned toward the reader and collapses the two facing away', () => {
    const [resting] = CUBE_FRAMES
    const visible = resting.sides.filter(side => side.visible)
    const hidden = resting.sides.filter(side => !side.visible)
    expect(visible.map(side => side.d).sort()).toEqual([
      'M12 12L21 7L21 17L12 22Z',
      'M3 7L12 12L12 22L3 17Z'
    ])
    expect(hidden).toHaveLength(2)
    hidden.forEach(side => expect(spanOf(side.d)).toBe(0))
  })

  test('keeps every side color between the lit face and the shaded face', () => {
    for (const frame of CUBE_FRAMES) {
      for (const side of frame.sides) {
        for (const index of [0, 1, 2]) {
          const value = channel(side.fill, index)
          const lit = channel(CUBE_LIT_COLOR, index)
          const shade = channel(CUBE_SHADE_COLOR, index)
          const low = Math.min(lit, shade)
          const high = Math.max(lit, shade)
          expect(value).toBeGreaterThanOrEqual(low)
          expect(value).toBeLessThanOrEqual(high)
        }
      }
    }
  })
})

const numbersOf = d =>
  [...d.matchAll(/-?\d+(?:\.\d+)?/g)].map(match => Number(match[0]))

const spanOf = d => {
  const xs = numbersOf(d).filter((_, index) => index % 2 === 0)
  return Math.max(...xs) - Math.min(...xs)
}

const samePolygon = (a, b) => {
  const left = a.slice(1, -1).split('L')
  const right = b.slice(1, -1).split('L')
  return (
    left.length === right.length &&
    left.concat(left).join('|').includes(right.join('|'))
  )
}

const channel = (hex, index) =>
  parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16)

const fakeSvg = () => ({
  calls: [],
  pauseAnimations () {
    this.calls.push('pause')
  },
  unpauseAnimations () {
    this.calls.push('play')
  },
  setCurrentTime (time) {
    this.calls.push(`time:${time}`)
  },
  querySelectorAll () {
    return [{ beginElement: () => this.calls.push('begin') }]
  }
})

const fakeMedia = matches => {
  const listeners = new Set()
  return {
    matches,
    addEventListener: (_, listener) => listeners.add(listener),
    removeEventListener: (_, listener) => listeners.delete(listener),
    change (next) {
      this.matches = next
      listeners.forEach(listener => listener())
    },
    listeners
  }
}

describe('bindCubeMotion', () => {
  const bind = (svg, { playing = true } = {}) => {
    let report
    let disconnected = false
    const state = { playing }
    const stop = bindCubeMotion(
      svg,
      (_, onScreen) => {
        report = onScreen
        return () => {
          disconnected = true
        }
      },
      () => state.playing
    )
    return {
      stop,
      set (next) {
        state.playing = next
        stop.update()
      },
      scroll: visible => report(visible),
      isDisconnected: () => disconnected
    }
  }

  test('starts spinning on mount, and pauses only while off screen', () => {
    const svg = fakeSvg()
    const { scroll } = bind(svg)
    scroll(false)
    scroll(true)
    expect(svg.calls).toEqual(['begin', 'play', 'pause', 'play'])
  })

  test('holds the resting frame until it should play, then begins once', () => {
    const svg = fakeSvg()
    const { set } = bind(svg, { playing: false })
    set(true)
    set(false)
    set(true)
    expect(svg.calls).toEqual(['pause', 'begin', 'play', 'pause', 'play'])
  })

  test('a pause freezes the cube where it is instead of snapping back', () => {
    const svg = fakeSvg()
    bind(svg).set(false)
    expect(svg.calls.some(call => call.startsWith('time:'))).toBe(false)
  })

  test('stops watching on unmount', () => {
    const { stop, isDisconnected } = bind(fakeSvg())
    stop()
    expect(isDisconnected()).toBe(true)
  })

  test('does nothing before the svg mounts', () => {
    const stop = bindCubeMotion(
      null,
      () => {},
      () => true
    )
    expect(() => {
      stop()
      stop.update()
    }).not.toThrow()
  })
})

describe('followReducedMotion', () => {
  test('plays by default and holds still when the reader asks for reduced motion', () => {
    const seen = []
    followReducedMotion(fakeMedia(false), next => seen.push(next))
    followReducedMotion(fakeMedia(true), next => seen.push(next))
    expect(seen).toEqual([true, false])
  })

  test('follows the setting when it changes, until unsubscribed', () => {
    const seen = []
    const media = fakeMedia(false)
    const unfollow = followReducedMotion(media, next => seen.push(next))
    media.change(true)
    unfollow()
    media.change(false)
    expect(seen).toEqual([true, false])
    expect(media.listeners.size).toBe(0)
  })

  test('asks the browser to honor reduced motion', () => {
    expect(REDUCED_MOTION_QUERY).toBe('(prefers-reduced-motion: reduce)')
  })
})

describe('watchViewport', () => {
  test('passes through whether the svg is on screen, and disconnects', () => {
    const seen = []
    let observer
    const IntersectionObserver = class {
      constructor (callback) {
        observer = this
        this.callback = callback
      }

      observe (element) {
        this.element = element
      }

      disconnect () {
        this.disconnected = true
      }
    }
    const previous = globalThis.IntersectionObserver
    globalThis.IntersectionObserver = IntersectionObserver
    try {
      const svg = { id: 'cube' }
      const disconnect = watchViewport(svg, visible => seen.push(visible))
      expect(observer.element).toBe(svg)
      observer.callback([{ isIntersecting: false }])
      observer.callback([{ isIntersecting: true }])
      observer.callback([{ isIntersecting: true }, { isIntersecting: false }])
      disconnect()
      expect(seen).toEqual([false, true, false])
      expect(observer.disconnected).toBe(true)
    } finally {
      if (previous === undefined) delete globalThis.IntersectionObserver
      else globalThis.IntersectionObserver = previous
    }
  })
})
