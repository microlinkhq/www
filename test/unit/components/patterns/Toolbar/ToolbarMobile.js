import { describe, expect, test, vi } from 'vitest'
import React from 'react'

import { renderMarkup } from '../../../../utils/render-markup'
import { NAVIGATION_SECTIONS } from '../../../../../src/components/patterns/Toolbar/ToolbarLinks'
import { MobileSectionBody } from '../../../../../src/components/patterns/Toolbar/ToolbarMobile'

vi.mock('../../../../../src/components/patterns/Toolbar/NavLogo', () => ({
  NavMicrolinkLogo: () => null
}))

const Icon = () => null

describe('toolbar mobile section', () => {
  test('renders a heading for each group', () => {
    const tools = NAVIGATION_SECTIONS.find(({ label }) => label === 'Tools')
    const html = renderMarkup(
      <MobileSectionBody
        label='Tools'
        groups={tools.groups}
        items={tools.items}
        onItemClick={() => {}}
      />
    )

    expect(html).toContain('mobile-toolbar-section-tools-inspect')
    expect(html).toContain('Difftool')
  })

  test('renders a flat list when the section has no groups', () => {
    const html = renderMarkup(
      <MobileSectionBody
        label='Plain'
        items={[
          {
            label: 'Solo',
            href: '/solo',
            description: 'One item',
            icon: Icon
          }
        ]}
        onItemClick={() => {}}
      />
    )

    expect(html).toContain('Solo')
    expect(html).toContain('One item')
    expect(html).not.toContain('mobile-toolbar-section-')
  })
})
