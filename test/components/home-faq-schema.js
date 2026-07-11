import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import React from 'react'

import toPlainText from '../../src/components/patterns/Faq/to-plain-text'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const h = React.createElement

describe('faq answer plain text', () => {
  test('inline nodes join without extra separators', () => {
    const answer = h(
      'div',
      null,
      'Our SLA is 99.9%. See the live ',
      h('a', { href: '/status' }, 'status'),
      ' of the service.'
    )
    expect(toPlainText(answer)).toBe(
      'Our SLA is 99.9%. See the live status of the service.'
    )
  })

  test('fragment paragraphs join with a space', () => {
    const answer = h(
      React.Fragment,
      null,
      h('div', null, 'First paragraph.'),
      h('div', null, 'Second paragraph.')
    )
    expect(toPlainText(answer)).toBe('First paragraph. Second paragraph.')
  })

  test('list items separate even via the as prop', () => {
    const Box = props => h('div', props)
    const answer = h(
      'div',
      null,
      'Attach it:',
      h(
        Box,
        { as: 'ul' },
        h(Box, { as: 'li' }, 'In the SDK, as apiKey.'),
        h(Box, { as: 'li' }, 'In the API, as a header.')
      )
    )
    expect(toPlainText(answer)).toBe(
      'Attach it: In the SDK, as apiKey. In the API, as a header.'
    )
  })

  test('empty and boolean nodes produce empty text', () => {
    expect(toPlainText(null)).toBe('')
    expect(toPlainText(false)).toBe('')
    expect(toPlainText(h('div', null))).toBe('')
  })
})

describe('home faq structured data wiring', () => {
  const indexSource = read('src/pages/index.js')
  const faqsSource = read('src/components/pages/home/faqs.js')

  test('faqs module exposes the questions the component renders', () => {
    expect(faqsSource).toContain('export const getFaqQuestions = () => {')
    expect(faqsSource).toContain('questions={getFaqQuestions()}')
  })

  test('homepage head builds FAQPage schema from the rendered questions', () => {
    expect(indexSource).toContain("'@type': 'FAQPage'")
    expect(indexSource).toContain('getFaqQuestions().map')
    expect(indexSource).toContain('toPlainText(answer)')
  })

  test('questions stay lazy so module-level JSX never races imports', () => {
    const arrayStart = faqsSource.indexOf('questions = [')
    const fnStart = faqsSource.indexOf('export const getFaqQuestions')
    expect(fnStart).toBeGreaterThan(-1)
    expect(arrayStart).toBeGreaterThan(fnStart)
  })
})

describe('meta cleanup', () => {
  const metaSource = read('src/components/elements/Meta/Meta.js')
  const htmlSource = read('src/html.js')

  test('video metas render only when a video exists', () => {
    expect(metaSource).toContain(
      "{video && <meta name='twitter:player:stream' content={video} />}"
    )
    expect(metaSource).toContain(
      "{video && <meta property='og:video:secure_url' content={video} />}"
    )
  })

  test('theme-color matches the page background', () => {
    expect(htmlSource).toContain("<meta name='theme-color' content='#fff' />")
  })
})
