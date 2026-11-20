import React from 'react'
import { describe, expect, test } from 'vitest'

import { AlternativeSpeed } from '../../../../../src/components/patterns/ProductStory/alternative-speed'
import SpeedSection from '../../../../../src/components/patterns/SpeedSection'
import { renderMarkup } from '../../../../utils/render-markup'

const benchmark = (timestamp, urls) => ({
  timestamp,
  testUrls: Array.from({ length: urls }, (_, index) => ({
    url: `https://example.com/${index}`
  })),
  results: {
    microlink: {
      name: 'Microlink',
      summary: { avgColdDuration: 1000 },
      perUrl: Array.from({ length: urls }, (_, index) => ({
        url: `https://example.com/${index}`,
        coldDuration: 1000
      }))
    },
    acme: {
      name: 'Acme',
      summary: { avgColdDuration: 2000 },
      perUrl: Array.from({ length: urls }, (_, index) => ({
        url: `https://example.com/${index}`,
        coldDuration: 2000
      }))
    }
  }
})

const speed = urls => ({
  averageRatio: '2.0',
  widestGap: { ratio: '2.0', host: 'example.com' },
  urls,
  run: 'March 2026'
})

const note = (timestamp, urls) =>
  renderMarkup(
    <AlternativeSpeed
      benchmark={benchmark(timestamp, urls)}
      speed={speed(urls)}
    />
  )

describe('AlternativeSpeed', () => {
  test('points at the benchmark page when the run is that page', () => {
    const html = note('2026-03', 7)
    expect(html).toContain('See the full benchmark')
    expect(html.match(/screenshot-benchmark/g)).toHaveLength(1)
  })

  test('puts the footnote in the note only when asked', () => {
    const html = renderMarkup(
      <SpeedSection
        title='Faster'
        subtitle='Same request.'
        description='Cold starts.'
        benchmark={benchmark('2026-03', 2)}
        note='See the full benchmark'
        footnote={
          <a href='https://github.com/microlinkhq/screenshot-benchmark'>repo</a>
        }
        footnoteInsideNote
      />
    )
    expect(html.match(/screenshot-benchmark/g)).toHaveLength(1)
  })

  test('omits the footnote when none is passed', () => {
    const html = renderMarkup(
      <SpeedSection
        title='Faster'
        subtitle='Same request.'
        description='Cold starts.'
        benchmark={benchmark('2026-03', 2)}
        note='See the full benchmark'
      />
    )
    expect(html).not.toContain('screenshot-benchmark')
    expect(html).not.toMatch(/See the full benchmark<\/div><\/div><div/)
  })

  test('shows the speed change only on the Microlink time', () => {
    const html = renderMarkup(
      <SpeedSection
        title='Faster'
        subtitle='Same request.'
        description='Cold starts.'
        benchmark={benchmark('2026-03', 1)}
      />
    )
    expect(html.match(/\(-50%\)/g)).toHaveLength(4)
    expect(html).not.toMatch(/2,000 \(-50%\)/)
  })

  test('omits an inside footnote when none is passed', () => {
    const html = renderMarkup(
      <SpeedSection
        title='Faster'
        subtitle='Same request.'
        description='Cold starts.'
        benchmark={benchmark('2026-03', 2)}
        note='See the full benchmark'
        footnoteInsideNote
      />
    )
    expect(html).not.toMatch(/See the full benchmark<\/div><div/)
  })

  test('says the run is separate when the month differs', () => {
    expect(note('2026-04-15T18:19:27.744Z', 7)).toContain(
      'This comparison is a separate'
    )
  })

  test('says the run is separate when the URL count differs', () => {
    expect(note('2026-03', 6)).toContain('This comparison is a separate')
  })
})
