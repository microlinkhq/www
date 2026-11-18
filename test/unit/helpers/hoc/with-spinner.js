import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { describe, expect, test } from 'vitest'
import { withSpinner } from '../../../../src/helpers/hoc/with-spinner'

const Base = React.forwardRef((props, ref) => <button ref={ref} {...props} />)
const SpinnerButton = withSpinner(Base)

const render = props => {
  const sheet = new ServerStyleSheet()
  try {
    const markup = renderToStaticMarkup(
      sheet.collectStyles(
        <SpinnerButton {...props}>Generate PDF</SpinnerButton>
      )
    )
    return { markup, css: sheet.getStyleTags() }
  } finally {
    sheet.seal()
  }
}

const classOf = (markup, pattern) => markup.match(pattern)[1].split(' ')
const rulesFor = (css, className) =>
  [...css.matchAll(new RegExp(`\\.${className}\\{([^}]*)\\}`, 'g'))]
    .map(([, body]) => body)
    .join(';')

describe('withSpinner', () => {
  test('without loading it renders the label as is', () => {
    const { markup } = render({})
    expect(markup).toBe('<button>Generate PDF</button>')
  })

  test('while loading the button is busy and disabled', () => {
    const { markup } = render({ loading: true })
    expect(markup).toMatch(/^<button[^>]*\bdisabled=""/)
    expect(markup).toMatch(/^<button[^>]*\baria-busy="true"/)
    expect(markup).toContain('<svg')
  })

  test('while loading the label stays in place, invisible, stacked with the spinner so the size does not change', () => {
    const { markup, css } = render({ loading: true })
    const [labelLayer, spinnerLayer] = [
      ...markup.matchAll(/<span class="([^"]+)">/g)
    ]
      .slice(1)
      .map(([, classes]) => classes.split(' '))
    const stack = classOf(markup, /<button[^>]*><span class="([^"]+)">/)

    expect(markup).toContain('>Generate PDF</span>')
    expect(stack.map(c => rulesFor(css, c)).join(';')).toMatch(
      /display:inline-grid/
    )
    const labelRules = labelLayer.map(c => rulesFor(css, c)).join(';')
    const spinnerRules = spinnerLayer.map(c => rulesFor(css, c)).join(';')
    expect(labelRules).toMatch(/grid-area:1\s*\/\s*1/)
    expect(labelRules).toMatch(/opacity:0/)
    expect(spinnerRules).toMatch(/grid-area:1\s*\/\s*1/)
    expect(spinnerRules).not.toMatch(/opacity:0/)
  })
})
