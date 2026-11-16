import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'
import themeSpec, { colors } from '../../../../../src/theme'
import Select from '../../../../../src/components/elements/Select/Select'
import Input from '../../../../../src/components/elements/Input/Input'
import { focusRing } from '../../../../../src/components/elements/field-chrome'

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

describe('Select', () => {
  const css = cssOf(
    <Select>
      <option>A4</option>
    </Select>
  )

  test('shares the input field chrome: border, radius and the 3px link ring on focus', () => {
    const inputCss = cssOf(<Input label='URL' />)
    for (const declaration of [
      `border-color:${colors.black10}`,
      'border-radius:8px',
      `box-shadow:${focusRing(colors.link)}`
    ]) {
      expect(css).toContain(declaration)
      expect(inputCss).toContain(declaration)
    }
  })

  test('the focus ring shows for keyboard focus, and invalid turns it red', () => {
    expect(css).toMatch(/:focus-visible\{[^}]*border-color:#0473e4/)
    expect(css).toContain(`box-shadow:${focusRing(colors.red8)}`)
    expect(css).toContain("[aria-invalid='true']")
  })

  test('the selected text never runs under the arrow', () => {
    expect(css).toContain('padding-right:20px')
  })
})
