import React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Mapping } from '../../../../../src/components/pages/playwright/mapping'
import { HIGHLIGHT_BG } from '../../../../../src/components/patterns/ProductStory/table'
import {
  renderWithStyles,
  rowBackground
} from '../../../../utils/highlight-row'

vi.mock('helpers/template', () => ({ template: value => value }))

describe('Playwright call mapping', () => {
  test('highlights the full-page row and leaves the element row plain', () => {
    const { html, css } = renderWithStyles(<Mapping />)
    const fullPage = rowBackground(html, css, 'Full-page screenshot')
    const element = rowBackground(html, css, 'Screenshot one element')

    expect(fullPage).toContain(HIGHLIGHT_BG)
    expect(element).toContain('transparent')
    expect(element).not.toContain(HIGHLIGHT_BG)
  })
})
