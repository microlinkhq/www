import React from 'react'
import { describe, expect, test } from 'vitest'
import ProPlanCard from '../../../../../src/components/patterns/Plans/ProPlanCard'
import { CurrencyProvider } from '../../../../../src/components/hook/use-currency'
import { renderMarkup } from '../../../../utils/render-markup'

describe('ProPlanCard', () => {
  test('the default plan buys without a volume', () => {
    const markup = renderMarkup(
      <CurrencyProvider>
        <ProPlanCard />
      </CurrencyProvider>,
      { url: '/pricing' }
    )
    expect(markup).toContain('redirect=/plans/create')
    expect(markup).not.toContain('requests=')
  })
})
