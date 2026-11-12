import React from 'react'
import { describe, expect, test } from 'vitest'

import { UseCaseCard } from '../../../../../../src/components/patterns/UseCaseStory/hub/use-case-card'
import { renderWithStyles } from '../../../../../utils/highlight-row'

const entry = {
  slug: 'partner-recipe',
  name: 'Partner',
  blurb: 'A partner recipe',
  cta: 'View the recipe'
}

const verticalEntry = {
  ...entry,
  slug: 'mobile',
  vertical: 'website-screenshot'
}

describe('UseCaseCard', () => {
  test('links to the use case and uses its accent when neither is passed', () => {
    const partner = renderWithStyles(<UseCaseCard entry={entry} />)
    const vertical = renderWithStyles(<UseCaseCard entry={verticalEntry} />)

    expect(partner.html).toContain('href="/use-cases/partner-recipe"')
    expect(partner.css).toContain('#ae3ec9')
    expect(vertical.html).toContain('href="/use-cases/mobile"')
    expect(vertical.css).toContain('#f03e3e')
  })

  test('uses the href and accent it is given', () => {
    const { html, css } = renderWithStyles(
      <UseCaseCard
        entry={verticalEntry}
        href='/alternative/puppeteer'
        accent='teal8'
      />
    )

    expect(html).toContain('href="/alternative/puppeteer"')
    expect(html).not.toContain('href="/use-cases/mobile"')
    expect(css).toContain('#099268')
    expect(css).not.toContain('#f03e3e')
  })
})
