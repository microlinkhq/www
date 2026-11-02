import React from 'react'
import { describe, expect, test } from 'vitest'
import { CallToAction } from '../../../../../src/components/patterns/CallToAction'
import {
  CUSTOMERS,
  customerPath
} from '../../../../../src/components/patterns/CustomerStory/customers'
import { renderMarkup } from '../../../../utils/render-markup'

const SEPARATOR = ' · '
const EMPTY_ELEMENT = /<(div|ul)\b[^>]*><\/\1>/

const render = props =>
  renderMarkup(<CallToAction cta='home:footer-cta' {...props} />, {
    url: '/screenshot'
  })

const count = (markup, text) => markup.split(text).length - 1

describe('CallToAction', () => {
  test('builds the caption from the outcome', () => {
    expect(render({ outcome: 'capturing screenshots' })).toContain(
      'Sign up, add the key to your requests, and start capturing screenshots.'
    )
  })

  test('an explicit caption replaces the outcome sentence', () => {
    const markup = render({ outcome: 'ignored', caption: 'Own caption.' })
    expect(markup).toContain('Own caption.')
    expect(markup).not.toContain('ignored')
  })

  test('links the button to signup, tracked under the cta id', () => {
    const markup = render({ outcome: 'x' })
    expect(markup).toContain('Get your free API key')
    expect(markup).toMatch(
      /href="https:\/\/dashboard\.microlink\.io\/signup\?[^"]*cta=home:footer-cta/
    )
  })

  test('an action replaces signup with its own link and label', () => {
    const markup = render({
      caption: 'x',
      action: { href: '/docs/skill', label: 'Open the skill' }
    })
    expect(markup).toContain('href="/docs/skill"')
    expect(markup).toContain('Open the skill')
    expect(markup).not.toContain('/signup')
    expect(markup).not.toContain('Get your free API key')
  })

  test('states the free plan facts once, separated between items only', () => {
    const markup = render({ outcome: 'x' })
    for (const fact of [
      '25 requests/day',
      'Every Pro feature',
      'No credit card'
    ]) {
      expect(count(markup, fact)).toBe(1)
    }
    expect(count(markup, SEPARATOR)).toBe(2)
  })

  test('custom facts replace the free plan facts', () => {
    const markup = render({ outcome: 'x', facts: ['One', 'Two'] })
    expect(markup).toContain('One')
    expect(markup).not.toContain('Every Pro feature')
    expect(count(markup, SEPARATOR)).toBe(1)
  })

  test('a single fact renders without a separator', () => {
    expect(count(render({ outcome: 'x', facts: ['Only'] }), SEPARATOR)).toBe(0)
  })

  test('no facts leaves no empty facts line', () => {
    const markup = render({ outcome: 'x', facts: [] })
    expect(markup).not.toContain('No credit card')
    expect(markup).not.toMatch(EMPTY_ELEMENT)
  })

  test('links every customer avatar to its customer story', () => {
    const markup = render({ outcome: 'x' })
    const anchors = markup.match(/<a [^>]*>/g)
    expect(count(markup, '<img ')).toBe(CUSTOMERS.length)
    for (const { slug, name, author } of CUSTOMERS) {
      const anchor = anchors.find(tag =>
        tag.includes(`href="${customerPath(slug)}"`)
      )
      expect(anchor, slug).toBeDefined()
      expect(anchor).toContain(
        `aria-label="${name} customer story, with ${author}"`
      )
    }
    expect(markup).toContain('100M+')
  })

  test('renders next step links when given', () => {
    const markup = render({
      outcome: 'x',
      links: [{ href: '/pricing', label: 'See pricing' }]
    })
    expect(markup).toContain('aria-label="Other ways to start"')
    expect(markup).toMatch(/<a [^>]*href="\/pricing"[^>]*>See pricing<\/a>/)
  })

  test('renders children below the panel content', () => {
    expect(render({ outcome: 'x', children: <nav>Guides</nav> })).toContain(
      '<nav>Guides</nav>'
    )
  })

  test('leaves no empty list or wrapper without links or children', () => {
    const markup = render({ outcome: 'x' })
    expect(markup).not.toContain('Other ways to start')
    expect(markup).not.toMatch(EMPTY_ELEMENT)
  })

  test('anchors the section under its id', () => {
    expect(render({ id: 'get-started', outcome: 'x' })).toMatch(
      /<section[^>]*id="get-started"/
    )
  })
})
