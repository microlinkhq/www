import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'
import themeSpec, { colors } from '../../../../../src/theme'
import { Button } from '../../../../../src/components/elements/Button/Button'

const render = props => {
  const sheet = new ServerStyleSheet()
  try {
    renderToStaticMarkup(
      sheet.collectStyles(
        <ThemeProvider theme={themeSpec}>
          <Button {...props}>Buy</Button>
        </ThemeProvider>
      )
    )
    return sheet.getStyleTags()
  } finally {
    sheet.seal()
  }
}

const focusOutline = css =>
  css.match(/:focus-visible\{outline:2px solid ([^;]+);/)?.[1]

describe('Button', () => {
  test('the focus ring takes the color of the variant', () => {
    expect(focusOutline(render({}))).toBe(colors.link)
    expect(focusOutline(render({ variant: 'default' }))).toBe(colors.link)
    expect(focusOutline(render({ variant: 'featured' }))).toBe(colors.secondary)
    expect(focusOutline(render({ variant: 'nope' }))).toBe(colors.link)
  })

  test('only the featured variant shimmers', () => {
    expect(render({ variant: 'featured' })).toContain(
      'repeating-linear-gradient'
    )
    expect(render({})).not.toContain('repeating-linear-gradient')
    expect(render({ variant: 'default' })).not.toContain(
      'repeating-linear-gradient'
    )
  })

  test('a loading button keeps the wait cursor over the disabled cursor', () => {
    const css = render({ loading: true })
    expect(css.lastIndexOf('cursor:wait')).toBeGreaterThan(
      css.lastIndexOf('cursor:not-allowed')
    )
  })
})
