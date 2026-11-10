import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const read = path =>
  readFileSync(new URL(`../../../${path}`, import.meta.url), 'utf8')

describe('checkout buy event', () => {
  test('the prompt checks out the entry plan and tags the buy event', () => {
    const prompt = read('src/components/patterns/ApiError/UpgradePrompt.js')
    expect(prompt).toContain('planId={ENTRY_PLAN.id}')
    expect(prompt).toContain('cta={`' + '$' + '{source}:' + '$' + '{slug}`}')
  })

  test('a buy event includes cta only when the caller passed one', () => {
    const checkout = read('src/components/patterns/Checkout.js')
    expect(checkout).toContain(
      "trackEvent('buy', cta ? { location, cta } : { location })"
    )
  })

  test('the payment session is opened for the plan prop', () => {
    const checkout = read('src/components/patterns/Checkout.js')
    expect(checkout).toMatch(/JSON\.stringify\(\{\s*planId,/)
  })
})
