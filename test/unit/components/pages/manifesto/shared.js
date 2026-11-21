import { describe, expect, test } from 'vitest'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import {
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

  test('every principle renders one accessible diagram with a unique id', () => {
    const diagramIds = PRINCIPLES.map(({ Visual }) => {
      const markup = renderToStaticMarkup(<Visual />)
      expect(markup.match(/<svg/g)).toHaveLength(1)
      expect(markup).toContain('role="img"')
      const [, diagramId] = markup.match(/aria-labelledby="([^"]+)-title /)
      expect(markup).toContain(`<title id="${diagramId}-title">`)
      expect(markup).toContain(`<desc id="${diagramId}-desc">`)
      return diagramId
    })
    expect(new Set(diagramIds).size).toBe(PRINCIPLES.length)
  })
})
