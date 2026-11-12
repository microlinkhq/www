import React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Operations } from '../../../../../src/components/pages/playwright/operations'
import { renderMarkup } from '../../../../utils/render-markup'

vi.mock('helpers/template', () => ({ template: value => value }))

describe('Playwright operations', () => {
  test('shows the browser-build card from its body copy', () => {
    const html = renderMarkup(<Operations />)

    expect(html).toContain('Browser builds per release')
    expect(html).toContain('npx playwright install')
  })
})
