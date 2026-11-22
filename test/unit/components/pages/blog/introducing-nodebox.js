import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import {
  HOPS,
  RunDiagram,
  STAGES
} from '../../../../../src/components/pages/blog/introducing-nodebox/RunDiagram'
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
