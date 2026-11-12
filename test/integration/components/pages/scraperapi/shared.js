import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  DEFAULT_PLAN,
  pricePerThousand
} from '../../../../../src/helpers/pro-plans'

const ROOT = process.cwd()
const read = file => fs.readFileSync(path.join(ROOT, file), 'utf8')

const between = (source, start, end) => {
  const from = source.indexOf(start)
  const to = source.indexOf(end, from + start.length)
  return source.slice(from, to)
}

const flat = text => text.replace(/\s+/g, ' ')
const pagesOf = label => Number(label.replace(/,/g, '').match(/\d+/)[0])
const creditsOf = label => Number(label.match(/[\d.]+/)[0])

const plan = () => ({
  requests: DEFAULT_PLAN.reqsPerMonthTotal,
  price: DEFAULT_PLAN.monthlyPrice.USD,
  perThousand: pricePerThousand(DEFAULT_PLAN, 'USD')
})

const creditRows = source =>
  [
    ...between(
      source,
      'export const CREDITS',
      'export const COMPARISON'
    ).matchAll(
      /credits: '([^']+)',\s*pages: '([^']+)'(?:,\s*highlight: true)?/g
    )
  ].map(match => ({
    credits: match[1],
    pages: pagesOf(match[2]),
    highlight: match[0].includes('highlight: true')
  }))

describe('scraperapi comparison numbers', () => {
  const source = read('src/components/pages/scraperapi/shared.js')
  const credits = between(
    source,
    'export const CREDITS',
    'export const COMPARISON'
  )
  const comparison = between(
    source,
    'export const COMPARISON',
    'export const HONESTY'
  )
  const { requests, price, perThousand } = plan()
  const rows = creditRows(source)
  const hobbyCredits = rows.find(row => row.credits === '1 credit').pages

  test('prices the $49 column from the first Pro plan', () => {
    expect(credits).toContain(`${price.toLocaleString('en-US')}`)
    expect(credits).toContain(requests.toLocaleString('en-US'))
    expect(credits).toContain(`$${perThousand}`)
  })

  test('rounds ScraperAPI pages down from the 100,000-credit hobby plan', () => {
    expect(hobbyCredits).toBe(100000)
    const priced = rows.filter(
      row => row.credits.endsWith('credit') || row.credits.endsWith('credits')
    )
    expect(priced.length).toBeGreaterThan(1)
    for (const row of priced) {
      expect(row.pages).toBe(Math.floor(hobbyCredits / creditsOf(row.credits)))
    }
    const microlink = rows.find(row => row.highlight)
    expect(microlink.credits).toBe('1 request')
    expect(microlink.pages).toBe(requests)
  })

  test('states the crossover only where the arithmetic holds', () => {
    expect(hobbyCredits / 2.17).toBeGreaterThan(requests)
    expect(Math.floor(hobbyCredits / 5)).toBeLessThan(requests)
    for (const step of [10, 25, 30, 75]) {
      expect(Math.floor(hobbyCredits / step)).toBeLessThan(requests)
    }
    const prose = flat(source)
    expect(prose).toContain(
      'while a ScraperAPI request stays under 2.17 credits it buys more pages'
    )
    expect(prose).toContain(
      'At 5 credits, and at every published step above that, Microlink buys more'
    )
    expect(prose).not.toContain('above that Microlink buys more')
  })

  test('gives every comparison row a scraperapi value', () => {
    const features = comparison.match(/feature: '/g)
    const values = comparison.match(/scraperapi: (?:true|false|'[^']*')/g)
    expect(values).toHaveLength(features.length)
  })
})

describe('scraperapi credit table', () => {
  const source = read('src/components/pages/scraperapi/credits.js')

  test('keeps the first column left and highlights the Microlink row', () => {
    expect(source).toContain(
      "index === 0 ? null : theme({ textAlign: 'right' })"
    )
    expect(source).toContain("highlight ? HIGHLIGHT_BG : 'transparent'")
    expect(source).toContain("fontWeight: highlight ? 'bold' : 'regular'")
  })
})
