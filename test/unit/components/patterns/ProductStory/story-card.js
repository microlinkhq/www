import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import { StoryCard } from '../../../../../src/components/patterns/ProductStory/story-card'
import themeSpec, { colors } from '../../../../../src/theme'

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

describe('StoryCard', () => {
  test('renders the description in black', () => {
    const { html, css } = render(
      <StoryCard title='Proxy' description='Rotated per request.' />
    )
    expect(html).toContain('Rotated per request.')
    expect(css).toContain(colors.black)
    expect(css).not.toContain(colors.black70)
  })
})
