import { describe, expect, test } from 'vitest'
import React from 'react'

import { renderMarkup } from '../../../../utils/render-markup'
import { NAVIGATION_SECTIONS } from '../../../../../src/components/patterns/Toolbar/ToolbarLinks'
import ToolbarDesktopToolsPanel from '../../../../../src/components/patterns/Toolbar/ToolbarDesktopToolsPanel'

const tools = () => NAVIGATION_SECTIONS.find(({ label }) => label === 'Tools')

describe('toolbar tools panel', () => {
  test('announces the latest tool next to the tools index', () => {
    const html = renderMarkup(
      <ToolbarDesktopToolsPanel section={tools()} onItemClick={() => {}} />
    )

    expect(html).toContain('New:')
    expect(html).toContain('Difftool. Compare two URLs visually.')
    expect(html).toContain('See all tools')
  })

  test('omits the latest-tool entry when the footer names nothing in the menu', () => {
    const section = tools()
    const html = renderMarkup(
      <ToolbarDesktopToolsPanel
        section={{
          ...section,
          footer: { ...section.footer, latest: 'Not a tool' }
        }}
        onItemClick={() => {}}
      />
    )

    expect(html).not.toContain('New:')
    expect(html).toContain('See all tools')
  })
})
