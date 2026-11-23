import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { describe, expect, test } from 'vitest'

const ROOT = new URL('../../../', import.meta.url)

const read = path => readFileSync(new URL(path, ROOT), 'utf8')

const grep = pattern => {
  try {
    return execFileSync('git', ['grep', '-l', '-E', pattern, '--', 'src'], {
      cwd: ROOT,
      encoding: 'utf8'
    })
      .split('\n')
      .filter(Boolean)
  } catch (error) {
    if (error.status === 1) return []
    throw error
  }
}

describe('checkout buy event', () => {
  test('the prompt tags the buy event with its source', () => {
    const prompt = read('src/components/patterns/ApiError/UpgradePrompt.js')
    expect(prompt).toContain('cta={`' + '$' + '{source}:' + '$' + '{slug}`}')
  })

  test('buy goes through dashboard signup into the buy dialog', () => {
    const checkout = read('src/components/patterns/Checkout.js')
    expect(checkout).toContain("BUY_REDIRECT = '/plans/create'")
    expect(checkout).toContain('redirect={BUY_REDIRECT}')
    expect(checkout).toContain('requests={requests}')
    expect(checkout).toContain('<SignupLink')
    expect(checkout).not.toContain('payment/session')
  })

  test('the buy event survives the navigation', () => {
    const checkout = read('src/components/patterns/Checkout.js')
    expect(checkout).toMatch(
      /trackEvent\('buy',[\s\S]*transport_type: 'beacon'/
    )
  })

  test('only a plan above the default passes its volume', () => {
    expect(read('src/components/patterns/Plans/ProPlanCard.js')).toContain(
      'requests={plan === DEFAULT_PLAN ? undefined : reqsPerMonthTotal}'
    )
    expect(
      read('src/components/patterns/ApiError/UpgradePrompt.js')
    ).not.toContain('requests=')
  })

  test('no caller still threads Stripe checkout props', () => {
    expect(grep('stripeKey=\\{|canonicalUrl=\\{')).toEqual([])
  })
})
