import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const page = readFileSync(
  new URL('../../../../src/pages/payment/update.js', import.meta.url),
  'utf8'
)

describe('payment update page', () => {
  test('confirms the card as soon as Stripe redirects back', () => {
    expect(page).toMatch(
      /if \(paymentState === PAYMENT_STATE\.redirected\) \{\s*fetchOnce\(`\$\{apiEndpoint\}\/payment\/update`/
    )
  })

  test('sends only the customer and the setup intent', () => {
    expect(page).toMatch(
      /body: JSON\.stringify\(\{\s*customerId: query\.id,\s*setupIntentId: query\.setup_intent\s*\}\)/
    )
  })

  test('never looks up the visitor IP', () => {
    expect(page).not.toContain('ipAddress')
    expect(page).not.toContain('geolocation.microlink.io')
  })
})
