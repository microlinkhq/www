import React from 'react'
import { describe, expect, test } from 'vitest'

import { AlternativeSpeed } from '../../../../../src/components/patterns/ProductStory/alternative-speed'
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
    expect(note('2026-03', 7)).toContain('See the full benchmark')
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
