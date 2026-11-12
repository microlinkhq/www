import React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { HONESTY as browserbase } from '../../../../../src/components/pages/browserbase/shared'
import { HONESTY as clearbit } from '../../../../../src/components/pages/clearbit/shared'
import { HONESTY as jina } from '../../../../../src/components/pages/jina-reader/shared'
import { HONESTY as playwright } from '../../../../../src/components/pages/playwright/shared'
import { HONESTY as puppeteer } from '../../../../../src/components/pages/puppeteer/shared'
import { HONESTY as scraperapi } from '../../../../../src/components/pages/scraperapi/shared'
import { HONESTY as scrapingbee } from '../../../../../src/components/pages/scrapingbee/shared'
import { HONESTY as serpapi } from '../../../../../src/components/pages/serpapi/shared'
import { ProductStrengths } from '../../../../../src/components/patterns/ProductStory/strengths'
import { renderMarkup } from '../../../../utils/render-markup'

vi.mock('helpers/template', () => ({ template: value => value }))

const SETS = [
  ['browserbase', browserbase],
  ['clearbit', clearbit],
  ['jina', jina],
  ['playwright', playwright],
  ['puppeteer', puppeteer],
  ['scraperapi', scraperapi],
  ['scrapingbee', scrapingbee],
  ['serpapi', serpapi]
]

describe('ProductStrengths', () => {
  test('renders the description it is given', () => {
    const html = renderMarkup(
      <ProductStrengths
        id='sample'
        accent='blue'
        title='When the other tool wins'
        caption='The cases named on the page.'
        items={[{ title: 'Alpha', description: 'Visible description' }]}
      />
    )

    expect(html).toContain('Alpha')
    expect(html).toContain('Visible description')
  })

  test.each(SETS)('%s strengths cards have a description', (_name, honesty) => {
    for (const item of honesty.items) {
      expect(typeof item.description).toBe('string')
      expect(item.description.length).toBeGreaterThan(0)
    }
  })
})
