import { describe, expect, test } from 'vitest'
import React from 'react'

import toParagraphs from '../../src/components/patterns/Faq/to-paragraphs'

const div = children => React.createElement('div', null, children)

describe('faq answer paragraphs', () => {
  test('fragment answers yield one paragraph per child', () => {
    const answer = React.createElement(
      React.Fragment,
      null,
      div('first'),
      div('second'),
      div('third')
    )
    const paragraphs = toParagraphs(answer)
    expect(paragraphs).toHaveLength(3)
    expect(paragraphs.map(p => p.props.children)).toEqual([
      'first',
      'second',
      'third'
    ])
  })

  test('a bare element answer is a single paragraph, not one per inline node', () => {
    const link = React.createElement('a', { href: '/status' }, 'status')
    const answer = React.createElement(
      'div',
      null,
      'Our SLA is 99.9%. ',
      'You can see the live ',
      link,
      ' of the service.'
    )
    const paragraphs = toParagraphs(answer)
    expect(paragraphs).toHaveLength(1)
    expect(paragraphs[0]).toBe(answer)
  })

  test('a plain string answer is a single paragraph', () => {
    expect(toParagraphs('Yes — 25 requests per day.')).toEqual([
      'Yes — 25 requests per day.'
    ])
  })

  test('fragment answers drop empty children', () => {
    const answer = React.createElement(
      React.Fragment,
      null,
      div('only'),
      null,
      false
    )
    expect(toParagraphs(answer)).toHaveLength(1)
  })
})
