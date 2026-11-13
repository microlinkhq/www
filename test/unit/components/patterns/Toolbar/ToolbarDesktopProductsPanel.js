import { describe, expect, test } from 'vitest'
import React from 'react'

import { renderMarkup } from '../../../../utils/render-markup'
import { NAVIGATION_SECTIONS } from '../../../../../src/components/patterns/Toolbar/ToolbarLinks'
import ToolbarDesktopProductsPanel from '../../../../../src/components/patterns/Toolbar/ToolbarDesktopProductsPanel'

const products = () =>
  NAVIGATION_SECTIONS.find(({ label }) => label === 'Products')

describe('toolbar products panel', () => {
  test('shows the changelog entry when one exists', () => {
    const html = renderMarkup(
      <ToolbarDesktopProductsPanel
        section={products()}
        latestChangelogEntry={{
          product: 'screenshot',
          href: '/changelog/screenshot',
          description: 'Faster captures'
        }}
        onItemClick={() => {}}
      />
    )

    expect(html).toContain('New(screenshot):')
    expect(html).toContain('Faster captures')
    expect(html).toContain('Changelog')
  })

  test('omits the changelog row when there is no entry', () => {
    const html = renderMarkup(
      <ToolbarDesktopProductsPanel
        section={products()}
        onItemClick={() => {}}
      />
    )

    expect(html).not.toContain('Changelog')
  })
})
