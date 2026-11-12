import React from 'react'
import { describe, expect, test } from 'vitest'

import { Groups } from '../../../../../src/components/pages/alternatives/groups'
import { renderMarkup } from '../../../../utils/render-markup'

const cta = (html, href) => {
  const marker = `href="${href}"`
  const start = html.indexOf(marker)
  return html.slice(start, html.indexOf('</a>', start))
}

describe('alternative groups', () => {
  test('links each card to its comparison and uses the short name', () => {
    const html = renderMarkup(<Groups />)

    expect(cta(html, '/alternative/clearbit')).toContain('Microlink vs')
    expect(cta(html, '/alternative/clearbit')).toContain('Clearbit')
    expect(cta(html, '/alternative/clearbit')).not.toContain('Logo API')
    expect(cta(html, '/alternative/cloudflare')).not.toContain(
      'Browser Rendering'
    )
    expect(cta(html, '/alternative/puppeteer')).toContain('Puppeteer')
    expect(cta(html, '/alternative/puppeteer')).not.toContain('undefined')
    expect(html).not.toContain('href="/use-cases/')
  })
})
