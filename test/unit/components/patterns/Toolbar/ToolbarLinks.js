import { describe, expect, test } from 'vitest'

import {
  NAVIGATION_SECTIONS,
  TOOLS_GROUPS,
  getToolbarSectionFromPathname
} from '../../../../../src/components/patterns/Toolbar/ToolbarLinks'

const toolsSection = NAVIGATION_SECTIONS.find(({ label }) => label === 'Tools')
const labelsOf = items => items.map(({ label }) => label)

describe('toolbar tools menu', () => {
  test('groups tools by what they do, integrations last', () => {
    expect(labelsOf(TOOLS_GROUPS)).toEqual([
      'Capture',
      'Convert',
      'Debug',
      'Integrations'
    ])
    expect(TOOLS_GROUPS.filter(({ compact }) => compact)).toEqual([
      TOOLS_GROUPS[TOOLS_GROUPS.length - 1]
    ])
  })

  test('lists Difftool as an external tool under Debug', () => {
    const debug = TOOLS_GROUPS.find(({ label }) => label === 'Debug')
    expect(debug.items.find(({ label }) => label === 'Difftool')).toMatchObject(
      { href: 'https://difftool.microlink.io', externalIcon: false }
    )
  })

  test('section items are every group item, each listed once', () => {
    const groupItems = TOOLS_GROUPS.flatMap(({ items }) => items)
    expect(toolsSection.items).toEqual(groupItems)
    const hrefs = toolsSection.items.map(({ href }) => href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  test('every tool has an icon and a description', () => {
    TOOLS_GROUPS.filter(({ compact }) => !compact).forEach(({ items }) =>
      items.forEach(item => {
        expect(item.icon, item.label).toBeTruthy()
        expect(item.description, item.label).toBeTruthy()
      })
    )
  })

  test.each([
    ['/tools/website-screenshot/bulk', 'Tools'],
    ['/editor', 'Tools'],
    ['/integrations/mcp', 'Tools'],
    ['/extensions', 'Tools'],
    ['/screenshot', 'Products'],
    ['/blog', 'Resources'],
    ['/nowhere', '']
  ])('maps %s to the %s section', (pathname, section) => {
    expect(getToolbarSectionFromPathname(pathname)).toBe(section)
  })
})
