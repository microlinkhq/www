import { describe, expect, test } from 'vitest'

import {
  NAVIGATION_SECTIONS,
  getToolbarSectionFromPathname
} from '../../../../../src/components/patterns/Toolbar/ToolbarLinks'

const sectionOf = name =>
  NAVIGATION_SECTIONS.find(({ label }) => label === name)
const labelsOf = items => items.map(({ label }) => label)
const groupOf = (section, name) =>
  sectionOf(section).groups.find(({ label }) => label === name)

describe('toolbar grouped sections', () => {
  test('products are grouped into four columns', () => {
    expect(labelsOf(sectionOf('Products').groups)).toEqual([
      'Capture',
      'Extract',
      'Preview',
      'Build'
    ])
  })

  test('tools are grouped by what they do, integrations last and compact', () => {
    const { groups } = sectionOf('Tools')
    expect(labelsOf(groups)).toEqual([
      'Capture',
      'Convert',
      'Debug',
      'Integrations'
    ])
    expect(groups.filter(({ compact }) => compact)).toEqual([
      groups[groups.length - 1]
    ])
  })

  test('lists Difftool as an external tool under Debug', () => {
    expect(
      groupOf('Tools', 'Debug').items.find(({ label }) => label === 'Difftool')
    ).toMatchObject({
      href: 'https://difftool.microlink.io',
      externalIcon: false
    })
  })

  test('tools footer links to the tools index', () => {
    expect(sectionOf('Tools').footer).toEqual({
      label: 'See all tools',
      href: '/tools'
    })
  })

  test.each(['Products', 'Tools'])(
    '%s items are every group item, each listed once',
    name => {
      const section = sectionOf(name)
      expect(section.items).toEqual(
        section.groups.flatMap(({ items }) => items)
      )
      const hrefs = section.items.map(({ href }) => href)
      expect(new Set(hrefs).size).toBe(hrefs.length)
    }
  )

  test.each(['Products', 'Tools'])(
    'every non-compact %s item has a description',
    name => {
      sectionOf(name)
        .groups.filter(({ compact }) => !compact)
        .forEach(({ items }) =>
          items.forEach(item =>
            expect(item.description, item.label).toBeTruthy()
          )
        )
    }
  )

  test('ungrouped sections keep their flat items', () => {
    const resources = sectionOf('Resources')
    expect(resources.groups).toBeUndefined()
    expect(resources.items.length).toBeGreaterThan(0)
  })

  test.each([
    ['/tools/website-screenshot/bulk', 'Tools'],
    ['/editor', 'Tools'],
    ['/integrations/mcp', 'Tools'],
    ['/extensions', 'Tools'],
    ['/screenshot', 'Products'],
    ['/file-conversion', 'Products'],
    ['/blog', 'Resources'],
    ['/nowhere', '']
  ])('maps %s to the %s section', (pathname, section) => {
    expect(getToolbarSectionFromPathname(pathname)).toBe(section)
  })
})
