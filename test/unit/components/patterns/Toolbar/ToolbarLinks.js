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

  test('tools are grouped by what you do with a URL, integrations last', () => {
    const { groups } = sectionOf('Tools')
    expect(labelsOf(groups)).toEqual([
      'Capture',
      'Build',
      'Convert',
      'Inspect',
      'Integrations'
    ])
  })

  test('Build stacks under Capture, every other group starts a column', () => {
    const stacked = sectionOf('Tools').groups.filter(({ stacked }) => stacked)
    expect(labelsOf(stacked)).toEqual(['Build'])
  })

  test('Inspect holds the tools that look into a URL', () => {
    expect(labelsOf(groupOf('Tools', 'Inspect').items)).toEqual([
      'Sharing Debugger',
      'Difftool',
      'Geolocation',
      'Sitemap URLs'
    ])
    expect(
      groupOf('Tools', 'Inspect').items.find(
        ({ label }) => label === 'Difftool'
      )
    ).toMatchObject({
      href: 'https://difftool.microlink.io',
      externalIcon: false
    })
  })

  test('Build holds the browser tools that write Microlink code', () => {
    expect(labelsOf(groupOf('Tools', 'Build').items)).toEqual([
      'Editor',
      'Component Builder'
    ])
  })

  test('integrations are things you add to your own stack, by audience', () => {
    expect(labelsOf(groupOf('Tools', 'Integrations').items)).toEqual([
      'AI',
      'MCP',
      'SDK',
      'CLI',
      'n8n',
      'Extensions'
    ])
  })

  test('Embed Providers is a reference page under Resources', () => {
    expect(labelsOf(sectionOf('Resources').items)).toContain('Embed Providers')
    expect(labelsOf(sectionOf('Tools').items)).not.toContain('Embed Providers')
  })

  test('tools footer links to the tools index', () => {
    expect(sectionOf('Tools').footer).toMatchObject({
      label: 'See all tools',
      href: '/tools'
    })
  })

  test('tools footer names the latest tool, which exists in the menu', () => {
    const { footer, items } = sectionOf('Tools')
    expect(footer.latest).toBe('Difftool')
    expect(labelsOf(items)).toContain(footer.latest)
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

  test.each(['Products', 'Tools'])('every %s item has a description', name => {
    sectionOf(name).groups.forEach(({ items }) =>
      items.forEach(item => expect(item.description, item.label).toBeTruthy())
    )
  })

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
