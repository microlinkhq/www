import React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Ownership } from '../../../../../src/components/pages/puppeteer/ownership'
import { HIGHLIGHT_BG } from '../../../../../src/components/patterns/ProductStory/table'
import {
  renderWithStyles,
  rowBackground
} from '../../../../utils/highlight-row'

vi.mock('helpers/template', () => ({ template: value => value }))

describe('Puppeteer ownership table', () => {
  test('highlights serverless packaging and leaves the binary row plain', () => {
    const { html, css } = renderWithStyles(<Ownership />)
    const serverless = rowBackground(html, css, 'Serverless packaging')
    const binary = rowBackground(html, css, 'The browser binary')

    expect(serverless).toContain(HIGHLIGHT_BG)
    expect(binary).toContain('transparent')
    expect(binary).not.toContain(HIGHLIGHT_BG)
  })
})
