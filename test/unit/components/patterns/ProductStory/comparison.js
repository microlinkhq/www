import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerLocation } from '@gatsbyjs/reach-router'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'

import { ComparisonTable } from '../../../../../src/components/patterns/ProductStory/comparison'
import themeSpec, { colors } from '../../../../../src/theme'

const ROWS = [
  { feature: 'Screenshots', microlink: true, acme: true },
  { feature: 'Proxy', microlink: true, acme: false, note: 'Rotating pool.' },
  { feature: 'Free tier', microlink: '25/day', acme: 'On demand' }
]

const render = () => {
  const sheet = new ServerStyleSheet()
  try {
    const html = renderToStaticMarkup(
      sheet.collectStyles(
        <ServerLocation url='/alternative/acme'>
          <ThemeProvider theme={themeSpec}>
            <ComparisonTable
              columns={['Microlink', 'Acme']}
              rows={ROWS}
              competitorKey='acme'
              featureLabel='Feature'
            />
          </ThemeProvider>
        </ServerLocation>
      )
    )
    return { html, css: sheet.getStyleTags() }
  } finally {
    sheet.seal()
  }
}

describe('ComparisonTable', () => {
  test('labels the header with the feature label and both columns', () => {
    const { html } = render()
    const headers = [...html.matchAll(/<th scope="col"[^>]*>([^<]*)<\/th>/g)]
    expect(headers.map(([, label]) => label)).toEqual([
      'Feature',
      'Microlink',
      'Acme'
    ])
  })

  test('renders booleans as accessible yes/no marks and strings as text', () => {
    const { html } = render()
    expect(html.match(/aria-label="Yes"/g)).toHaveLength(3)
    expect(html.match(/aria-label="No"/g)).toHaveLength(1)
    expect(html).toContain('25/day')
    expect(html).toContain('On demand')
    expect(html).toContain('Rotating pool.')
  })

  test('uses the site table type, not the mono uppercase style', () => {
    const { css } = render()
    expect(css).not.toMatch(/text-transform:uppercase/)
    expect(css).not.toMatch(/font-family:[^;]*Operator Mono[^;]*;[^}]*th/)
    expect(css).toContain(colors.pink0)
  })
})
