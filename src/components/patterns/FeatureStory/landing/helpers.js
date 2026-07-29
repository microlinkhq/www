import React from 'react'

import { Link } from 'components/elements/Link'

export { sdkExample } from 'components/patterns/ExamplesSwitcher'

export const faqFromItems = items =>
  items.map(({ question, text, answer }) => ({
    question,
    text,
    answer: answer || text
  }))

export const faqPageStructured = items => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ question, text }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text
    }
  }))
})

export const ProxyHeadersTtlLinks = ({ ttlLabel = 'TTL' }) => (
  <>
    <Link href='/docs/api/parameters/proxy'>proxy</Link>
    {', '}
    <Link href='/docs/api/parameters/headers'>headers</Link>
    {' and '}
    <Link href='/docs/api/parameters/ttl'>{ttlLabel}</Link>
  </>
)
