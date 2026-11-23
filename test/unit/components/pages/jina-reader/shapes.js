import React from 'react'
import { ServerLocation } from '@gatsbyjs/reach-router'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import { Shapes } from '../../../../../src/components/pages/jina-reader/shapes'
import themeSpec from '../../../../../src/theme'

const render = () => {
  const sheet = new ServerStyleSheet()
  try {
    const html = renderToStaticMarkup(
      sheet.collectStyles(
        <ServerLocation url='/alternative/jina-reader'>
          <ThemeProvider theme={themeSpec}>
            <Shapes />
          </ThemeProvider>
        </ServerLocation>
      )
    )
    return { html, css: sheet.getStyleTags() }
  } finally {
    sheet.seal()
  }
}

describe('Jina Reader shapes', () => {
  test('names the HTML parameter and the combined Reader header', () => {
    const { html } = render()

    expect(html).toContain('data.html.attr=html, same response')
    expect(html).toContain('markdown+html+screenshot')
    expect(html).not.toContain('a second call')
    expect(html).not.toContain('a third call')
    expect(html).not.toContain('3 or more')
  })
})
