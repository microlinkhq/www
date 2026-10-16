import { expect, test } from 'vitest'

import {
  VALIDATOR_STATUS_OK,
  buildFixSnippet,
  validate
} from '../../../../../../../src/components/pages/sharing-debugger/metatags/validators'

const EXAMPLE_COM_METADATA = {
  publisher: 'example.com',
  title: 'Example Domain',
  lang: 'en',
  url: 'https://example.com/',
  image: null,
  date: null,
  author: null,
  description:
    'This domain is for use in documentation examples without needing permission. This is not a service; avoid relying on it for testing and monitoring purposes.',
  logo: null
}

const getIssues = metadata =>
  validate(metadata).filter(({ status }) => status !== VALIDATOR_STATUS_OK)

const getTwitterCards = snippet =>
  snippet.split('\n').filter(line => line.includes('twitter:card'))

test('suggests a single large card when the snippet also adds an image', () => {
  const snippet = buildFixSnippet({
    issues: getIssues(EXAMPLE_COM_METADATA),
    metadata: EXAMPLE_COM_METADATA
  })

  expect(getTwitterCards(snippet)).toEqual([
    '<meta name="twitter:card" content="summary_large_image">'
  ])
  expect(snippet).toContain('<meta name="twitter:image"')
})

test('suggests a large card when the page already has an image', () => {
  const metadata = {
    ...EXAMPLE_COM_METADATA,
    title: null,
    image: { url: 'https://example.com/og.png' }
  }

  const snippet = buildFixSnippet({
    issues: [{ name: 'title', value: null, isNullable: true }],
    metadata
  })

  expect(getTwitterCards(snippet)).toEqual([
    '<meta name="twitter:card" content="summary_large_image">'
  ])
})

test('suggests a summary card when no image exists or is suggested', () => {
  const snippet = buildFixSnippet({
    issues: [
      { name: 'title', value: null, isNullable: true },
      { name: 'description', value: null, isNullable: true }
    ],
    metadata: { url: 'https://example.com/' }
  })

  expect(getTwitterCards(snippet)).toEqual([
    '<meta name="twitter:card" content="summary">'
  ])
})

test('honors an explicit card value', () => {
  const snippet = buildFixSnippet({
    issues: [{ name: 'description', value: null, isNullable: true }],
    metadata: { url: 'https://example.com/' },
    twitterCardValue: 'summary_large_image'
  })

  expect(getTwitterCards(snippet)).toEqual([
    '<meta name="twitter:card" content="summary_large_image">'
  ])
})
