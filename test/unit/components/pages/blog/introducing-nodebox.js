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
  CUBE_QUARTER_TURN_MS
} from '../../../../../src/components/pages/blog/introducing-nodebox/cube-frames'
import { SpinningCube } from '../../../../../src/components/pages/blog/introducing-nodebox/SpinningCube'
import { bindCubeMotion } from '../../../../../src/components/pages/blog/introducing-nodebox/use-cube-motion'
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
    expect(html).toContain('role="img"')
    expect(html).toContain('aria-label="The Nodebox logo, a pink cube turning"')
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
  })
})

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
  const bind = (svg, media) => {
    let report
    let disconnected = false
    const unbind = bindCubeMotion(svg, media, (_, onScreen) => {
      report = onScreen
      return () => {
        disconnected = true
      }
    })
    return {
      unbind,
      scroll: visible => report(visible),
      isDisconnected: () => disconnected
    }
  }

  test('plays on screen and pauses off screen', () => {
    const svg = fakeSvg()
    const { scroll } = bind(svg, fakeMedia(false))
    scroll(false)
    scroll(true)
    expect(svg.calls).toEqual(['play', 'pause', 'play'])
  })

  test('holds the resting frame under reduced motion, and resumes when it is lifted', () => {
    const svg = fakeSvg()
    const media = fakeMedia(true)
    bind(svg, media)
    media.change(false)
    expect(svg.calls).toEqual(['pause', 'time:0', 'play'])
  })

  test('stops watching on unmount', () => {
    const media = fakeMedia(false)
    const { unbind, isDisconnected } = bind(fakeSvg(), media)
    unbind()
    expect(isDisconnected()).toBe(true)
    expect(media.listeners.size).toBe(0)
  })

  test('does nothing before the svg mounts', () => {
    expect(() =>
      bindCubeMotion(null, fakeMedia(false), () => {})()
    ).not.toThrow()
  })
})
