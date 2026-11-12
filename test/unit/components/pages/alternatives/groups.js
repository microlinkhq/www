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

    const clearbit = cta(html, '/alternative/clearbit')
    const cloudflare = cta(html, '/alternative/cloudflare')

    expect(clearbit).toContain('Microlink vs')
    expect(clearbit).toContain('Clearbit')
    expect(clearbit).not.toContain('Logo')
    expect(cloudflare).toContain('Cloudflare')
    expect(cloudflare).not.toContain('Browser')
    expect(cta(html, '/alternative/puppeteer')).toContain('Puppeteer')
    expect(cta(html, '/alternative/puppeteer')).not.toContain('undefined')
    expect(html).not.toContain('href="/use-cases/')
  })
})
