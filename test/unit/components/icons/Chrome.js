import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, test } from 'vitest'

import { Chrome } from '../../../../src/components/icons/Chrome'

const SHAPE = /<(circle|line)\b/g

describe('Chrome icon', () => {
  test('renders the Chrome mark as a lucide icon', () => {
    const html = renderToStaticMarkup(<Chrome />)
    expect(html).toContain('class="lucide lucide-chrome"')
    expect(html).toContain('viewBox="0 0 24 24"')
    expect(html.match(SHAPE)).toEqual([
      '<circle',
      '<circle',
      '<line',
      '<line',
      '<line'
    ])
  })

  test('accepts the same props as lucide-react icons', () => {
    const html = renderToStaticMarkup(
      <Chrome size={14} color='#123456' strokeWidth={1.5} />
    )
    expect(html).toContain('width="14"')
    expect(html).toContain('height="14"')
    expect(html).toContain('stroke="#123456"')
    expect(html).toContain('stroke-width="1.5"')
  })

  test('is decorative unless labelled', () => {
    expect(renderToStaticMarkup(<Chrome />)).toContain('aria-hidden="true"')
    expect(renderToStaticMarkup(<Chrome aria-label='Chrome' />)).not.toContain(
      'aria-hidden'
    )
  })
})
