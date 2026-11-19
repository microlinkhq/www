import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerLocation } from '@gatsbyjs/reach-router'
import { ServerStyleSheet } from 'styled-components'
import { describe, expect, test, vi } from 'vitest'

import * as browserbase from '../../../../../src/components/pages/browserbase/shared'
import * as clearbit from '../../../../../src/components/pages/clearbit/shared'
import * as jina from '../../../../../src/components/pages/jina-reader/shared'
import * as playwright from '../../../../../src/components/pages/playwright/shared'
import * as puppeteer from '../../../../../src/components/pages/puppeteer/shared'
import * as scraperapi from '../../../../../src/components/pages/scraperapi/shared'
import * as scrapingbee from '../../../../../src/components/pages/scrapingbee/shared'
import * as serpapi from '../../../../../src/components/pages/serpapi/shared'
import { AlternativeHero } from '../../../../../src/components/patterns/ProductStory/alternative-hero'
import { HeroActions } from '../../../../../src/components/patterns/ProductStory/hero-parts'
import { renderMarkup } from '../../../../utils/render-markup'

vi.mock('helpers/template', () => ({ template: value => value }))

const MAX_TAGLINE_LENGTH = 32
const MAX_DESCRIPTION_LENGTH = 180

const PAGES = [
  ['browserbase', browserbase],
  ['clearbit', clearbit],
  ['jina-reader', jina],
  ['playwright', playwright],
  ['puppeteer', puppeteer],
  ['scraperapi', scraperapi],
  ['scrapingbee', scrapingbee],
  ['serpapi', serpapi]
]

const textOf = node =>
  typeof node === 'string'
    ? node
    : renderToStaticMarkup(node).replace(/<[^>]+>/g, '')

describe('alternative hero copy', () => {
  test.each(PAGES)('%s names the competitor and a short tagline', (_, page) => {
    expect(typeof page.HERO.competitor).toBe('string')
    expect(page.HERO.competitor.length).toBeGreaterThan(0)
    expect(typeof page.HERO.tagline).toBe('string')
    expect(page.HERO.tagline.length).toBeLessThanOrEqual(MAX_TAGLINE_LENGTH)
  })

  test.each(PAGES)('%s description fits a hero lead', (_, page) => {
    const text = textOf(page.HERO.description)
    expect(text.length).toBeGreaterThan(0)
    expect(text.length).toBeLessThanOrEqual(MAX_DESCRIPTION_LENGTH)
    expect(text).not.toContain('—')
  })

  test.each(PAGES)('%s carries no per-competitor color', (_, page) => {
    expect(page.ACCENT).toBeUndefined()
    expect(page.ACCENT_NAME).toBeUndefined()
    expect(page.TIMINGS_ACCENT).toBeUndefined()
  })
})

describe('AlternativeHero', () => {
  test('renders "The <competitor> alternative" then the tagline', () => {
    const html = renderMarkup(
      <AlternativeHero
        competitor='Acme'
        tagline='with no servers'
        description='Lead copy.'
        cta='alternative-acme:hero'
        secondaryHref='/docs'
        secondaryLabel='Read the docs'
      >
        <div>demo</div>
      </AlternativeHero>
    )
    const heading = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]

    expect(heading.replace(/<[^>]+>/g, '')).toBe(
      'The Acme alternativewith no servers'
    )
    expect(heading).toMatch(/<span[^>]*>Acme<\/span> alternative<br\/>/)
    expect(html).toContain('Lead copy.')
    expect(html).toContain('Read the docs')
    expect(html).toContain('<div>demo</div>')
  })

  test('primary action is a signup button that navigates, secondary is a link', () => {
    const html = renderMarkup(
      <AlternativeHero
        competitor='Acme'
        tagline='with no servers'
        description='Lead copy.'
        cta='alternative-acme:hero'
        secondaryHref='/docs'
        secondaryLabel='Read the docs'
      />
    )

    expect(html).toMatch(
      /<a[^>]*href="[^"]*signup[^"]*cta=alternative-acme:hero[^"]*"[^>]*>[\s\S]*?Get your free API key[\s\S]*?<\/a>/
    )
    expect(html).not.toMatch(/<button/)
    expect(html).toMatch(/<a[^>]*href="\/docs"[^>]*>[\s\S]*?Read the docs/)
  })
})

describe('HeroActions', () => {
  test('keeps each link on one line and wraps the row instead', () => {
    const sheet = new ServerStyleSheet()
    try {
      renderToStaticMarkup(
        sheet.collectStyles(
          <ServerLocation url='/'>
            <HeroActions
              ctaHref='/pricing'
              secondaryHref='/docs'
              secondaryLabel='Read the docs'
              justifyContent='center'
            />
          </ServerLocation>
        )
      )
      const css = sheet.getStyleTags()
      expect(css).toMatch(/white-space:nowrap/)
      expect(css).toMatch(/flex-wrap:wrap/)
    } finally {
      sheet.seal()
    }
  })
})
