import { describe, expect, test } from 'vitest'

import {
  CLOSING_LINKS,
  HERO,
  META,
  PRINCIPLES
} from '../../../../../src/components/pages/manifesto/shared'

const EM_DASH = '—'
const THREE_DOTS = '...'

const copyOf = ({ name, tagline, body }) => [name, tagline, body]

describe('manifesto principles', () => {
  test('keeps the six principles in their agreed order and wording', () => {
    expect(PRINCIPLES.map(({ name, tagline }) => [name, tagline])).toEqual([
      ['Zero-person work.', 'Once, never twice.'],
      ['Everyone ships.', 'Bring work, not ideas.'],
      ['Everyone profitable.', 'Every project pays for itself.'],
      ['Own outcomes.', 'Don’t wait for orders.'],
      ['No meetings.', 'Write it. Decide. Ship.'],
      ['Make fast faster.', 'Ask why great takes this long, then fix it.']
    ])
  })

  test('gives every principle a unique slug anchor derived from its name', () => {
    const ids = PRINCIPLES.map(({ id }) => id)
    expect(new Set(ids).size).toBe(ids.length)
    PRINCIPLES.forEach(({ id, name }) => {
      expect(id).toBe(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      )
    })
  })

  test('copy avoids em dashes and three-dot ellipses', () => {
    const copy = [
      META.title,
      META.description,
      HERO.title,
      HERO.description,
      ...PRINCIPLES.flatMap(copyOf)
    ]
    copy.forEach(text => {
      expect(text).not.toContain(EM_DASH)
      expect(text).not.toContain(THREE_DOTS)
    })
  })

  test('every principle carries a lazily loaded anatomy figure', () => {
    PRINCIPLES.forEach(({ id, figure }, index) => {
      expect(figure.fig, id).toBe(`Fig ${String(index + 1).padStart(2, '0')}`)
      expect(figure.label.length, id).toBeGreaterThan(40)
      expect(figure.readout, id).toBeTruthy()
      expect(typeof figure.load, id).toBe('function')
      expect(typeof figure.createPose, id).toBe('function')
      expect(figure.restShare, id).toBeGreaterThanOrEqual(0)
      expect(figure.restShare, id).toBeLessThan(1)
    })
  })

  test('closes with a link back to /about', () => {
    expect(CLOSING_LINKS.map(({ href }) => href)).toContain('/about')
  })
})

describe('manifesto internal links', () => {
  const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g
  const linksOf = body => [...body.matchAll(LINK)].map(([, , href]) => href)

  test('every principle body links once to a related page on the site', () => {
    PRINCIPLES.forEach(({ id, body }) => {
      const links = linksOf(body)
      expect(links, id).toHaveLength(1)
      expect(links[0], id).not.toMatch(/^\/manifesto/)
    })
  })
})
