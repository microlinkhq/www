import React from 'react'
import { ServerLocation } from '@gatsbyjs/reach-router'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import { Shapes } from '../../../../../src/components/pages/jina-reader/shapes'
import { HIGHLIGHT_BG } from '../../../../../src/components/patterns/ProductStory/table'
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

const rowClass = (html, label) => {
  const row = html
    .split('<tr')
    .slice(1)
    .find(part => part.includes(label))
  const attrs = row.slice(0, row.indexOf('>'))
  return attrs
    .match(/class="([^"]+)"/)[1]
    .split(' ')
    .pop()
}

const backgroundRule = (css, className) => {
  const rule = css.match(
    new RegExp(`\\.${className}[^{]*\\{[^}]*background:[^}]*\\}`)
  )
  return rule[0]
}

describe('Jina Reader shapes', () => {
  test('highlights only the row that names the PDF gap', () => {
    const { html, css } = render()
    const pdf = backgroundRule(css, rowClass(html, 'A PDF of the page'))
    const markdown = backgroundRule(css, rowClass(html, 'Markdown of the page'))

    expect(pdf).toContain(HIGHLIGHT_BG)
    expect(markdown).toContain('transparent')
    expect(markdown).not.toContain(HIGHLIGHT_BG)
  })

  test('names the HTML parameter and the combined Reader header', () => {
    const { html } = render()

    expect(html).toContain('data.html.attr=html, same response')
    expect(html).toContain('markdown+html+screenshot')
    expect(html).not.toContain('a second call')
    expect(html).not.toContain('a third call')
    expect(html).not.toContain('3 or more')
  })
})
