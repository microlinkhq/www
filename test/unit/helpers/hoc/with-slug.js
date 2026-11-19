import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { describe, expect, test } from 'vitest'

import { withSlug } from '../../../../src/helpers/hoc/with-slug'

const Heading = withSlug(props => <h3 {...props} />)

const render = element => {
  const sheet = new ServerStyleSheet()
  try {
    const html = renderToStaticMarkup(sheet.collectStyles(element))
    return { html, css: sheet.getStyleTags() }
  } finally {
    sheet.seal()
  }
}

describe('withSlug', () => {
  test('links the heading to its own slug', () => {
    const { html } = render(<Heading>Is there a free tier?</Heading>)
    expect(html).toContain('id="is-there-a-free-tier"')
    expect(html).toContain('href="#is-there-a-free-tier"')
  })

  test('keeps the permalink icon out of line wrapping', () => {
    const { html, css } = render(<Heading>Is there a free tier?</Heading>)
    const permalinkClass = html
      .match(/<span class="([^"]+)"/)[1]
      .split(' ')
      .pop()
    const rule = css.match(new RegExp(`\\.${permalinkClass}\\{([^}]*)\\}`))[1]
    expect(rule).toMatch(/position:absolute/)
    expect(rule).toMatch(/visibility:hidden/)
  })

  test('renders plain children when slug is disabled', () => {
    const { html } = render(<Heading slug={false}>Plain</Heading>)
    expect(html).toBe('<h3>Plain</h3>')
  })
})
