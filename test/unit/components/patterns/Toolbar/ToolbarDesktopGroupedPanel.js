import { describe, expect, test } from 'vitest'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

import { renderMarkup } from '../../../../utils/render-markup'
import { NAVIGATION_SECTIONS } from '../../../../../src/components/patterns/Toolbar/ToolbarLinks'
import ToolbarDesktopGroupedPanel from '../../../../../src/components/patterns/Toolbar/ToolbarDesktopGroupedPanel'

const Icon = () => null

const sectionOf = name =>
  NAVIGATION_SECTIONS.find(({ label }) => label === name)

const between = (html, start, end) => {
  const from = html.indexOf(start)
  const to = html.indexOf(end, from)
  return html.slice(from, to)
}

const renderStyled = element => {
  const sheet = new ServerStyleSheet()
  try {
    const html = renderMarkup(sheet.collectStyles(element))
    return { html, css: sheet.getStyleTags() }
  } finally {
    sheet.seal()
  }
}

const marginTop = (css, tag) => {
  const names = tag.match(/class="([^"]+)"/)[1].split(/\s+/)
  for (const name of names) {
    const rule = css.match(new RegExp(`\\.${name}\\{([^}]*)\\}`))
    if (rule && rule[1].includes('margin-top')) return rule[1]
  }
  return ''
}

const groupTag = (html, id) => {
  const at = html.indexOf(`id="${id}"`)
  const start = html.lastIndexOf('<div', at)
  return html.slice(start, html.indexOf('>', start) + 1)
}

describe('toolbar grouped panel', () => {
  test('a stacked group shares its column with the group above', () => {
    const html = renderMarkup(
      <ToolbarDesktopGroupedPanel
        section={sectionOf('Tools')}
        onItemClick={() => {}}
      />
    )

    expect(
      between(
        html,
        'toolbar-mega-menu-tools-capture',
        'toolbar-mega-menu-tools-build'
      )
    ).not.toContain('</div></div><div')
    expect(
      between(
        html,
        'toolbar-mega-menu-tools-build',
        'toolbar-mega-menu-tools-convert'
      )
    ).toContain('</div></div><div')
  })

  test('a stacked group with nothing above it still renders', () => {
    const html = renderMarkup(
      <ToolbarDesktopGroupedPanel
        section={{
          label: 'Tools',
          groups: [
            {
              label: 'Build',
              stacked: true,
              items: [
                {
                  label: 'Editor',
                  href: '/editor',
                  description: 'Write code',
                  icon: Icon
                }
              ]
            }
          ]
        }}
        onItemClick={() => {}}
      />
    )

    expect(html).toContain('toolbar-mega-menu-tools-build')
    expect(html).toContain('Editor')
  })

  test('stacked groups sit below the group above them', () => {
    const { html, css } = renderStyled(
      <ToolbarDesktopGroupedPanel
        section={sectionOf('Tools')}
        onItemClick={() => {}}
      />
    )

    expect(
      marginTop(css, groupTag(html, 'toolbar-mega-menu-tools-build'))
    ).toContain('margin-top:32px')
    expect(
      marginTop(css, groupTag(html, 'toolbar-mega-menu-tools-capture'))
    ).not.toContain('margin-top:32px')
  })

  test('an item without a description does not render an empty line', () => {
    const html = renderMarkup(
      <ToolbarDesktopGroupedPanel
        section={{
          label: 'Tools',
          groups: [
            {
              label: 'Inspect',
              items: [
                {
                  label: 'Difftool',
                  href: 'https://difftool.microlink.io',
                  description: 'Compare two URLs visually',
                  icon: Icon
                },
                { label: 'Plain', href: '/plain', icon: Icon }
              ]
            }
          ]
        }}
        onItemClick={() => {}}
      />
    )

    const plain = between(html, 'href="/plain"', '</a>')
    expect(html).toContain('Compare two URLs visually')
    expect(plain).toContain('href="/plain"')
    expect(plain).not.toContain('menu-item-description')
  })

  test('external links open in a new tab without a second icon', () => {
    const html = NAVIGATION_SECTIONS.map(section =>
      renderMarkup(
        <ToolbarDesktopGroupedPanel section={section} onItemClick={() => {}} />
      )
    ).join('')
    const external = NAVIGATION_SECTIONS.flatMap(({ items }) => items).filter(
      ({ href }) => !href.startsWith('/')
    )

    expect(external.length).toBeGreaterThan(0)
    for (const item of external) {
      const at = html.indexOf(`href="${item.href}"`)
      expect(at, item.href).toBeGreaterThan(-1)
      const anchor = html.slice(at, html.indexOf('</a>', at))
      expect(anchor, item.label).toContain('target="_blank"')
      expect(anchor.match(/<svg/g)?.length ?? 0, item.label).toBe(
        item.logo ? 0 : 1
      )
    }

    const internal = between(html, 'href="/screenshot"', '</a>')
    expect(internal).toContain('href="/screenshot"')
    expect(internal).not.toContain('target=')
  })
})
