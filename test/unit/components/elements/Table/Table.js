import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import Text from '../../../../../src/components/elements/Text'
import {
  CellValue,
  FeatureTable,
  TableScroll,
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
  test('FeatureTable matches the minimal blog table', () => {
    const { css } = render(
      <FeatureTable>
        <thead>
          <tr>
            <th>Head</th>
          </tr>
        </thead>
      </FeatureTable>
    )
    expect(css).not.toMatch(/text-transform:uppercase/)
    expect(css).toMatch(/font-family:'Inter',\s?sans-serif/)
    expect(css).not.toMatch(/tabular-nums/)
    expect(css).toMatch(/min-width:640px/)
    expect(css).toMatch(/border-collapse:collapse/)
    expect(css).not.toMatch(/background(-color)?:rgba\(0,0,0,0\.05\)/)
    expect(css).toMatch(/thead th\{[^}]*border-bottom-color:rgba\(0,0,0,0\.1\)/)
    expect(css).toMatch(
      /tbody tr\{[^}]*border-bottom-color:rgba\(0,0,0,0\.05\)/
    )
    expect(css).toMatch(
      /:where\(th:first-child, ?td:first-child\)\{padding-left:0/
    )
    expect(css).toMatch(
      /:where\(th:last-child, ?td:last-child\)\{padding-right:0/
    )
  })

  test('interactive highlights the hovered row with an inset rounded fill', () => {
    const table = (
      <FeatureTable interactive>
        <tbody>
          <tr>
            <th>Row</th>
            <td>Value</td>
          </tr>
        </tbody>
      </FeatureTable>
    )
    const { html, css } = render(table)
    expect(html).not.toMatch(/interactive/)
    expect(css).toMatch(
      /@media \(hover: ?hover\) and \(pointer: ?fine\)\{[^@]*tbody tr:hover>\*\{background-color:rgba\(0,0,0,0\.05\)/
    )
    expect(css).toMatch(/border-collapse:separate/)
    expect(css).toMatch(
      /:where\(th:first-child, ?td:first-child\)\{padding-left:16px/
    )
    expect(css).toMatch(/tbody tr>:first-child\{border-top-left-radius:8px/)
  })

  test('without interactive, rows never react to hover', () => {
    const { css } = render(
      <FeatureTable>
        <tbody>
          <tr>
            <td>Value</td>
          </tr>
        </tbody>
      </FeatureTable>
    )
    expect(css).not.toMatch(/:hover/)
    expect(css).not.toMatch(/border-collapse:separate/)
  })

  test('base cell rules yield to call-site alignment and weight', () => {
    const { css } = render(
      <FeatureTable>
        <tbody>
          <tr>
            <th>Row</th>
            <td>Cell</td>
          </tr>
        </tbody>
      </FeatureTable>
    )
    expect(css).toMatch(/:where\(th, ?td\)\{[^}]*text-align:left/)
    expect(css).toMatch(/:where\(thead th\)\{[^}]*font-weight:700/)
    expect(css).not.toMatch(/:where\(th\)\{/)
    expect(css).toMatch(/:where\(th, ?td\)\{[^}]*font-weight:400/)
    expect(css).not.toMatch(/\.[\w-]+ th,\.[\w-]+ td\{[^}]*text-align/)
    expect(css).not.toMatch(/\.[\w-]+ th\{[^}]*font-weight/)
  })
})

describe('CellValue', () => {
  test('renders true as a check and false as a dash, each with a name', () => {
    expect(render(<CellValue value />).html).toContain('aria-label="Yes"')
    expect(render(<CellValue value={false} />).html).toContain(
      'aria-label="No"'
    )
  })

  test('draws false as a plain hyphen, never an em dash', () => {
    const { html } = render(<CellValue value={false} />)
    expect(html).toMatch(/aria-label="No"[^>]*>-</)
    expect(html).not.toContain('—')
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

  test('labels body cells during render from a Text header and a custom row', () => {
    const Row = ({ children }) => <tr>{children}</tr>
    const { html } = render(
      <TableScroll>
        <FeatureTable>
          <thead>
            <tr>
              <Text as='th'>Job</Text>
              <Text as='th'>Microlink</Text>
            </tr>
          </thead>
          <tbody>
            <Row>
              <Text as='th'>Packaging</Text>
              <td>None</td>
            </Row>
          </tbody>
        </FeatureTable>
      </TableScroll>
    )
    expect(html).toContain('data-label="Microlink"')
    expect(html).not.toContain('data-label="Job"')
    expect(html).not.toContain('data-label="Packaging"')
  })

  test('keeps a markup label and leaves a blank header unlabeled', () => {
    const { html } = render(
      <TableScroll>
        <FeatureTable>
          <thead>
            <tr>
              <th> </th>
              <th>Credits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Blank</td>
              <td data-label='Kept'>Value</td>
            </tr>
          </tbody>
        </FeatureTable>
      </TableScroll>
    )
    expect(html).toContain('<td>Blank</td>')
    expect(html).toContain('data-label="Kept"')
    expect(html).not.toContain('data-label="Credits"')
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
