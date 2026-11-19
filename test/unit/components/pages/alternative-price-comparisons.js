import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerLocation } from '@gatsbyjs/reach-router'
import { describe, expect, test, vi } from 'vitest'

vi.mock('helpers/template', () => ({ template: value => value }))

const MIGRATED_PAGES = [
  'apiflash',
  'cloudflare',
  'context-dev',
  'embedly',
  'firecrawl',
  'iframely',
  'screenshotapi',
  'screenshotlayer',
  'screenshotmachine',
  'screenshotone',
  'thumio',
  'url2png',
  'urlbox'
]

const modules = import.meta.glob(
  '../../../../src/components/pages/{apiflash,cloudflare,context-dev,embedly,firecrawl,iframely,screenshotapi,screenshotlayer,screenshotmachine,screenshotone,thumio,url2png,urlbox}/shared.js',
  { eager: true }
)

const slugOf = path => path.split('/').at(-2)

const PAGES = Object.entries(modules)
  .filter(([, page]) => page.PRICE_COMPARISON)
  .map(([path, page]) => [slugOf(path), page])

const textOf = node => {
  if (node?.missing) return node.text
  return typeof node === 'string' || node === undefined
    ? node || ''
    : renderToStaticMarkup(
      <ServerLocation url='/'>{node}</ServerLocation>
    ).replace(/<[^>]+>/g, '')
}

const TODAY = new Date()

describe('alternative price comparisons', () => {
  test('every older alternative page uses the shared price comparison', () => {
    expect(PAGES.map(([slug]) => slug).sort()).toEqual(MIGRATED_PAGES)
  })

  test.each(PAGES)('%s cites a dated public competitor price', (_, page) => {
    const { competitor } = page.PRICE_COMPARISON
    expect(typeof competitor.name).toBe('string')
    expect(typeof competitor.price).toBe('number')
    expect(competitor.price).toBeGreaterThanOrEqual(0)
    if (competitor.quota) {
      expect(Number.isInteger(competitor.quota)).toBe(true)
      expect(competitor.unit.length).toBeGreaterThan(0)
    } else {
      expect(textOf(competitor.volume).length).toBeGreaterThan(0)
    }
    expect(new URL(competitor.source).protocol).toBe('https:')
    expect(competitor.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(new Date(competitor.checkedAt).getTime()).toBeLessThanOrEqual(
      TODAY.getTime()
    )
  })

  test.each(PAGES)('%s tracks its own signup CTAs', (slug, page) => {
    expect(page.PRICE_COMPARISON.microlink.cta).toBe(
      `alternative-${slug}:pricing`
    )
    expect(page.CTA.cta).toBe(`alternative-${slug}:footer-cta`)
  })

  test.each(PAGES)('%s copy has no em dash', (_, page) => {
    const { title, caption, note, microlink, competitor } =
      page.PRICE_COMPARISON
    const copy = [
      title,
      caption,
      note,
      ...(microlink.items || []),
      ...(competitor.items || []),
      competitor.volume,
      page.CTA.caption,
      ...page.FAQ_ITEMS.flatMap(({ question, text, answer }) => [
        question,
        text,
        answer
      ])
    ].map(textOf)

    copy.forEach(text => expect(text).not.toContain('—'))
  })

  test.each(PAGES)(
    '%s FAQ feeds both the page and the structured data',
    (_, page) => {
      expect(page.FAQ_ITEMS.length).toBeGreaterThan(0)
      page.FAQ_ITEMS.forEach(({ question, text }) => {
        expect(question.length).toBeGreaterThan(0)
        expect(typeof text).toBe('string')
        expect(text.length).toBeGreaterThan(0)
      })
      expect(page.FAQ_STRUCTURED['@type']).toBe('FAQPage')
      expect(page.FAQ_STRUCTURED.mainEntity.map(({ name }) => name)).toEqual(
        page.FAQ_ITEMS.map(({ question }) =>
          question.replace(/\u00a0/g, ' ').replace(/\u2011/g, '-')
        )
      )
      expect(JSON.stringify(page.FAQ_STRUCTURED)).not.toMatch(
        /[\u00a0\u2011]|\\u00a0|\\u2011/
      )
    }
  )
})
