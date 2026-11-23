import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, test } from 'vitest'

import { FigureView } from '../../../../../../src/components/pages/manifesto/anatomy/figure'

const figure = { width: 600, height: 400, label: 'A stamping jig over a belt' }

describe('FigureView', () => {
  test('reserves the plate until the figure source arrives', () => {
    const html = renderToStaticMarkup(
      <FigureView source={null} figure={figure} />
    )
    expect(html).toContain('viewBox="0 0 600 400"')
    expect(html).toContain('aria-label="A stamping jig over a belt"')
    expect(html).toContain('data-theme="light"')
    expect(html).not.toContain('LIVE')
  })

  test('renders the generated plate once the source has loaded', () => {
    const html = renderToStaticMarkup(
      <FigureView
        source={{ html: '<figure class="iso-figure">LIVE</figure>' }}
        figure={figure}
      />
    )
    expect(html).toContain('LIVE')
    expect(html).toContain('data-theme="light"')
    expect(html).not.toContain('viewBox="0 0 600 400"')
  })
})
