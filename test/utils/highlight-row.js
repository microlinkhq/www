import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerLocation } from '@gatsbyjs/reach-router'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'

import themeSpec from '../../src/theme'

export const renderWithStyles = element => {
  const sheet = new ServerStyleSheet()
  try {
    const html = renderToStaticMarkup(
      sheet.collectStyles(
        <ServerLocation url='/'>
          <ThemeProvider theme={themeSpec}>{element}</ThemeProvider>
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

export const rowBackground = (html, css, label) =>
  backgroundRule(css, rowClass(html, label))
