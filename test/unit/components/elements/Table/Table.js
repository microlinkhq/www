import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import {
  CellValue,
  FeatureTable,
  ProseTable,
  labelCellsFromHeader
} from '../../../../../src/components/elements/Table/Table'
import themeSpec from '../../../../../src/theme'

const render = element => {
  const sheet = new ServerStyleSheet()
  try {
    const html = renderToStaticMarkup(
      sheet.collectStyles(
        <ThemeProvider theme={themeSpec}>{element}</ThemeProvider>
      )
    )
    return { html, css: sheet.getStyleTags() }
  } finally {
    sheet.seal()
  }
}

describe('Table', () => {
  test.each([
    ['FeatureTable', FeatureTable],
    ['ProseTable', ProseTable]
  ])('%s uses sans body type with a tinted header', (_, Component) => {
    const { css } = render(
      <Component>
        <thead>
          <tr>
            <th>Head</th>
          </tr>
        </thead>
      </Component>
    )
    expect(css).not.toMatch(/text-transform:uppercase/)
    expect(css).toMatch(/font-family:'Inter',\s?sans-serif/)
    expect(css).not.toMatch(/tabular-nums/)
    expect(css).toMatch(/min-width:640px/)
  })
})

describe('CellValue', () => {
  test('renders true as a check and false as a dash, each with a name', () => {
    expect(render(<CellValue value />).html).toContain('aria-label="Yes"')
    expect(render(<CellValue value={false} />).html).toContain(
      'aria-label="No"'
    )
  })

  test('renders any other value as text', () => {
    expect(render(<CellValue value='One parameter' />).html).toContain(
      'One parameter'
    )
  })

  test('centers the mark on the first line of the row', () => {
    const { css } = render(<CellValue value />)
    expect(css).toMatch(/align-items:center/)
    expect(css).toMatch(/min-height:1lh/)
  })
})

describe('labelCellsFromHeader', () => {
  test('labels a body cell from the header in its column', () => {
    const value = { tagName: 'TD', dataset: {} }
    labelCellsFromHeader({
      querySelectorAll: selector =>
        selector === 'thead th'
          ? [{ textContent: ' Feature ' }, { textContent: ' Credits ' }]
          : [{ children: [{ tagName: 'TH', dataset: {} }, value] }]
    })
    expect(value.dataset.label).toBe('Credits')
  })

  test('leaves a row header unlabeled', () => {
    const rowHeader = { tagName: 'TH', dataset: {} }
    labelCellsFromHeader({
      querySelectorAll: selector =>
        selector === 'thead th'
          ? [{ textContent: 'Feature' }]
          : [{ children: [rowHeader] }]
    })
    expect(rowHeader.dataset.label).toBeUndefined()
  })

  test('keeps a label the cell already has', () => {
    const value = { tagName: 'TD', dataset: { label: 'Kept' } }
    labelCellsFromHeader({
      querySelectorAll: selector =>
        selector === 'thead th'
          ? [{ textContent: 'Other' }]
          : [{ children: [value] }]
    })
    expect(value.dataset.label).toBe('Kept')
  })

  test('skips a column whose header is blank', () => {
    const value = { tagName: 'TD', dataset: {} }
    labelCellsFromHeader({
      querySelectorAll: selector =>
        selector === 'thead th'
          ? [{ textContent: '   ' }]
          : [{ children: [value] }]
    })
    expect(value.dataset.label).toBeUndefined()
  })
})
