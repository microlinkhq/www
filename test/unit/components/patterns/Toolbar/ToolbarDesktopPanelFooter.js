import { describe, expect, test } from 'vitest'
import React from 'react'

import { renderMarkup } from '../../../../utils/render-markup'
import ToolbarDesktopPanelFooter from '../../../../../src/components/patterns/Toolbar/ToolbarDesktopPanelFooter'

const page = { label: 'See all tools', href: '/tools' }

describe('toolbar panel footer', () => {
  test('renders the entry and the page link', () => {
    const html = renderMarkup(
      <ToolbarDesktopPanelFooter
        entry={{
          label: 'New:',
          description: 'Difftool. Compare two URLs visually.',
          href: 'https://difftool.microlink.io',
          eventName: 'New tool: Difftool'
        }}
        page={page}
        onItemClick={() => {}}
      />
    )

    expect(html).toContain('New:')
    expect(html).toContain('Difftool. Compare two URLs visually.')
    expect(html).toContain('See all tools')
  })

  test('renders only the page link when there is no entry', () => {
    const html = renderMarkup(
      <ToolbarDesktopPanelFooter page={page} onItemClick={() => {}} />
    )

    expect(html).not.toContain('New:')
    expect(html).toContain('See all tools')
  })
})
