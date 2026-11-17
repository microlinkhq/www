import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'
import themeSpec from '../../../../../src/theme'
import { SegmentedControl } from '../../../../../src/components/pages/screenshot'

const cssOf = element => {
  const sheet = new ServerStyleSheet()
  try {
    renderToStaticMarkup(
      sheet.collectStyles(
        <ThemeProvider theme={themeSpec}>{element}</ThemeProvider>
      )
    )
    return sheet.getStyleTags()
  } finally {
    sheet.seal()
  }
}

describe('SegmentedControl', () => {
  test('keyboard focus stays visible when forced colors hide the shadow', () => {
    const css = cssOf(
      <SegmentedControl
        name='Format'
        value='png'
        onChange={() => {}}
        options={[
          { value: 'png', label: 'PNG' },
          { value: 'jpeg', label: 'JPEG' }
        ]}
      />
    )
    expect(css).toMatch(
      /@media \(forced-colors: active\)\{[^}]*:focus-visible\{[^}]*outline:2px solid CanvasText/
    )
  })
})
