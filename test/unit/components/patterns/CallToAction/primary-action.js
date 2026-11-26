import React from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { CallToAction } from '../../../../../src/components/patterns/CallToAction'
import { renderMarkup } from '../../../../utils/render-markup'

const accountState = vi.hoisted(() => ({ signedIn: false, account: null }))

vi.mock('../../../../../src/components/hook/use-dashboard-account', () => ({
  useDashboardAccount: () => accountState
}))

const render = props =>
  renderMarkup(<CallToAction cta='home:footer-cta' {...props} />, {
    url: '/screenshot'
  })

const signIn = () => {
  accountState.signedIn = true
}

describe('CallToAction for a signed-in visitor', () => {
  beforeEach(() => {
    accountState.signedIn = false
  })

  test('sends the visitor to the playground instead of signup', () => {
    signIn()
    const markup = render({ outcome: 'capturing screenshots' })
    expect(markup).toContain('Open the playground')
    expect(markup).toMatch(
      /href="https:\/\/dashboard\.microlink\.io\/playground\?[^"]*cta=home:footer-cta/
    )
    expect(markup).not.toContain('/signup')
    expect(markup).not.toContain('Get your free API key')
  })

  test('the outcome caption no longer asks to sign up', () => {
    signIn()
    const markup = render({ outcome: 'capturing screenshots' })
    expect(markup).toContain(
      'Your API key is ready. Open the playground, run your first request, and start capturing screenshots.'
    )
    expect(markup).not.toContain('Sign up')
  })

  test('an explicit caption is kept', () => {
    signIn()
    expect(render({ caption: 'Own caption.' })).toContain('Own caption.')
  })

  test('drops the free signup facts', () => {
    signIn()
    const markup = render({ outcome: 'x' })
    expect(markup).not.toContain('No credit card')
    expect(markup).not.toContain('requests/day')
  })

  test('keeps facts the page passes on purpose', () => {
    signIn()
    expect(render({ outcome: 'x', facts: ['Own fact'] })).toContain('Own fact')
  })

  test('a page action still wins over the playground', () => {
    signIn()
    const markup = render({
      caption: 'x',
      action: { href: '/docs/skill', label: 'Open the skill' }
    })
    expect(markup).toContain('href="/docs/skill"')
    expect(markup).not.toContain('Open the playground')
  })

  test('a signed-out visitor still gets the signup button and facts', () => {
    const markup = render({ outcome: 'x' })
    expect(markup).toContain('Get your free API key')
    expect(markup).toContain('No credit card')
    expect(markup).not.toContain('Open the playground')
  })
})
