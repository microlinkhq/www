import React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Migration } from '../../../../../src/components/pages/clearbit/migration'
import { HIGHLIGHT_BG } from '../../../../../src/components/patterns/ProductStory/table'
import {
  renderWithStyles,
  rowBackground
} from '../../../../utils/highlight-row'

vi.mock('helpers/template', () => ({ template: value => value }))

describe('Clearbit migration table', () => {
  test('highlights brand colors and leaves the image row plain', () => {
    const { html, css } = renderWithStyles(<Migration />)
    const colors = rowBackground(html, css, 'Brand colors')
    const image = rowBackground(html, css, 'The logo as an image URL')

    expect(colors).toContain(HIGHLIGHT_BG)
    expect(image).toContain('transparent')
    expect(image).not.toContain(HIGHLIGHT_BG)
  })
})
