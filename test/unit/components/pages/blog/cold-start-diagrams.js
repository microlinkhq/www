import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import {
  COLD_START_ROWS,
  ColdStartDiagram
} from '../../../../../src/components/pages/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s/ColdStartDiagram'
import { LayerCopyDiagram } from '../../../../../src/components/pages/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s/LayerCopyDiagram'
import {
  PULL_TIME_ROWS,
  PullTimeDiagram
} from '../../../../../src/components/pages/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s/PullTimeDiagram'
import {
  SCALE_DOWN_ROWS,
  ScaleDownWindowDiagram
} from '../../../../../src/components/pages/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s/ScaleDownWindowDiagram'
import {
  THREADPOOL_TASKS,
  ThreadpoolDiagram
} from '../../../../../src/components/pages/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s/ThreadpoolDiagram'
import {
  COLD_START_STEPS,
  COLD_START_TOTAL_SECONDS,
  ColdStartStepsDiagram
} from '../../../../../src/components/pages/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s/ColdStartStepsDiagram'
import {
  NODE_POOLS,
  SecondPoolDiagram
} from '../../../../../src/components/pages/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s/SecondPoolDiagram'
import {
  UNNEEDED_ROWS,
  UnneededTimeDiagram
} from '../../../../../src/components/pages/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s/UnneededTimeDiagram'
import themeSpec from '../../../../../src/theme'

const render = () => {
  const sheet = new ServerStyleSheet()
  try {
    return renderToStaticMarkup(
      sheet.collectStyles(
        <ThemeProvider theme={themeSpec}>
          <ColdStartDiagram />
        </ThemeProvider>
      )
    )
  } finally {
    sheet.seal()
  }
}

describe('ColdStartDiagram', () => {
  test('labels every step with its measured seconds', () => {
    const html = render()
    for (const row of COLD_START_ROWS) {
      expect(html).toContain(row.label)
      expect(html).toContain(row.total)
      for (const step of row.steps) expect(html).toContain(`${step.seconds}s`)
    }
  })

  test('keeps every bar inside the 960 wide canvas', () => {
    const html = render()
    const rects = [
      ...html.matchAll(/<rect x="([\d.]+)" y="[\d.]+" width="([\d.]+)"/g)
    ]
    expect(rects.length).toBeGreaterThan(0)
    for (const [, x, width] of rects) {
      expect(Number(x) + Number(width)).toBeLessThanOrEqual(920)
    }
  })
})

const renderComponent = Component => {
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

describe('PullTimeDiagram', () => {
  test('shows the download next to each codec pull', () => {
    const html = renderComponent(PullTimeDiagram)
    for (const row of PULL_TIME_ROWS) {
      expect(html).toContain(row.total)
      expect(html).toContain(row.codec)
    }
    expect(html).toContain('~12s')
  })
})

describe('LayerCopyDiagram', () => {
  test('names every layer and the sizes it held', () => {
    const html = renderComponent(LayerCopyDiagram)
    for (const text of [
      'RUN PNPM INSTALL',
      'RUN MV + CHOWN -R',
      '399MB of copies',
      '422MB, kept',
      '175MB, kept'
    ]) {
      expect(html).toContain(text)
    }
  })
})

describe('ScaleDownWindowDiagram', () => {
  test('labels both windows and what happens to the pod', () => {
    const html = renderComponent(ScaleDownWindowDiagram)
    for (const row of SCALE_DOWN_ROWS) {
      expect(html).toContain(row.label)
      expect(html).toContain(row.note)
    }
    expect(html).toContain('deleted at 120s, not Ready')
  })
})

describe('ThreadpoolDiagram', () => {
  test('shows every kind of work that shares the 4 threads', () => {
    const html = renderComponent(ThreadpoolDiagram)
    expect(THREADPOOL_TASKS).toHaveLength(4)
    THREADPOOL_TASKS.forEach((task, index) => {
      expect(html).toContain(`Thread ${index + 1}: ${task.name}`)
    })
    expect(html).not.toContain('quality 11')
  })
})

describe('ColdStartStepsDiagram', () => {
  test('adds up the six measured steps to 122s', () => {
    expect(COLD_START_STEPS.map(step => step.seconds)).toEqual([
      16, 41, 28, 7, 25, 5
    ])
    expect(COLD_START_TOTAL_SECONDS).toBe(122)
  })

  test('labels every step and its seconds', () => {
    const html = renderComponent(ColdStartStepsDiagram)
    for (const step of COLD_START_STEPS) {
      expect(html).toContain(step.name)
      expect(html).toContain(`${step.seconds}s`)
    }
  })
})

describe('UnneededTimeDiagram', () => {
  test('shows the memory request against the threshold and both wait times', () => {
    const html = renderComponent(UnneededTimeDiagram)
    expect(html).toContain('42% of memory requested')
    expect(html).toContain('UNNEEDED BELOW 0.5')
    for (const row of UNNEEDED_ROWS) { expect(html).toContain(`${row.minutes} min`) }
  })
})

describe('SecondPoolDiagram', () => {
  test('orders the pools by priority', () => {
    const html = renderComponent(SecondPoolDiagram)
    expect(NODE_POOLS.map(pool => pool.priority)).toEqual([
      'PRIORITY 100',
      'PRIORITY 10'
    ])
    for (const pool of NODE_POOLS) expect(html).toContain(pool.label)
    expect(html).toContain('INSUFFICIENT CAPACITY')
  })
})
