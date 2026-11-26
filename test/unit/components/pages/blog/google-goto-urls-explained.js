import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import {
  EDGES,
  GotoDiagram,
  NODES
} from '../../../../../src/components/pages/blog/google-goto-urls-explained/GotoDiagram'
import {
  ACTORS,
  MESSAGES,
  RetryDiagram,
  WAIT
} from '../../../../../src/components/pages/blog/google-goto-urls-explained/RetryDiagram'
import themeSpec from '../../../../../src/theme'

const CANVAS_WIDTH = 960

const render = (Component = GotoDiagram) => {
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

const decode = html => html.replace(/&amp;/g, '&').replace(/&quot;/g, '"')

describe('GotoDiagram', () => {
  test('labels every answer Google gives and every path to it', () => {
    const html = decode(render())
    Object.values(NODES).forEach(({ name, note }) => {
      expect(html).toContain(`>${name}<`)
      expect(html).toContain(`>${note}<`)
    })
    EDGES.forEach(({ label }) => expect(html).toContain(`>${label}<`))
  })

  test('connects every edge between two drawn nodes', () => {
    EDGES.forEach(({ from, to }) => {
      expect(NODES[from]).toBeDefined()
      expect(NODES[to]).toBeDefined()
    })
  })

  test('keeps every shape inside the canvas', () => {
    const html = render()
    const height = Number(html.match(/viewBox="0 0 \d+ (\d+)"/)[1])
    const shapes = [
      ...html.matchAll(
        /<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g
      )
    ]
    expect(shapes.length).toBeGreaterThan(0)
    shapes.forEach(([, x, y, width, h]) => {
      expect(Number(x) + Number(width)).toBeLessThanOrEqual(CANVAS_WIDTH)
      expect(Number(y) + Number(h)).toBeLessThanOrEqual(height)
    })
  })
})

describe('RetryDiagram', () => {
  test('names every actor, every message and the wait', () => {
    const html = decode(render(RetryDiagram))
    Object.values(ACTORS).forEach(({ name }) =>
      expect(html).toContain(`>${name}<`)
    )
    MESSAGES.forEach(({ label }) => expect(html).toContain(`>${label}<`))
    expect(html).toContain(`>${WAIT.name}<`)
  })

  test('sends every message between two actors, in order down the page', () => {
    MESSAGES.forEach(({ from, to }) => {
      expect(ACTORS[from]).toBeDefined()
      expect(ACTORS[to]).toBeDefined()
    })
    const ys = MESSAGES.map(({ y }) => y)
    expect(ys).toEqual([...ys].sort((a, b) => a - b))
  })

  test('answers the first request with a 503 and the retry with the destination', () => {
    const answers = MESSAGES.filter(({ to }) => to === 'you')
    expect(answers.map(({ label }) => label)).toEqual([
      '503 RETRY-AFTER: N',
      '200 DESTINATION'
    ])
    expect(answers[0].y).toBeLessThan(WAIT.y)
    expect(answers[1].y).toBeGreaterThan(WAIT.y)
  })
})
