import { describe, expect, test } from 'vitest'
import React from 'react'

import { renderMarkup } from '../../../../utils/render-markup'
import { NAVIGATION_SECTIONS } from '../../../../../src/components/patterns/Toolbar/ToolbarLinks'
import ToolbarDesktopResourcesPanel from '../../../../../src/components/patterns/Toolbar/ToolbarDesktopResourcesPanel'

const resources = () =>
  NAVIGATION_SECTIONS.find(({ label }) => label === 'Resources')

describe('toolbar resources panel', () => {
  test('shows the latest post beside the blog link', () => {
    const html = renderMarkup(
      <ToolbarDesktopResourcesPanel
        section={resources()}
        latestPosts={[{ title: 'Ship notes', slug: '/blog/ship-notes' }]}
        onItemClick={() => {}}
      />
    )

    expect(html).toContain('Latest:')
    expect(html).toContain('Ship notes')
    expect(html).toContain('href="/blog"')
  })

  test('keeps the blog link when there is no post', () => {
    const html = renderMarkup(
      <ToolbarDesktopResourcesPanel
        section={resources()}
        onItemClick={() => {}}
      />
    )

    expect(html).not.toContain('Latest:')
    expect(html).toContain('href="/blog"')
  })
})
