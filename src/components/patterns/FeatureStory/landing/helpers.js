import React from 'react'

import { Link } from 'components/elements/Link'

export const sdkExample = body => `import createClient from 'microlink.io'

const microlink = createClient({
  apiKey: process.env.MICROLINK_API_KEY
})

${body}`

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

const DocLink = ({ href, fallback, children, ...props }) => (
  <Link href={href} {...props}>
    {children || fallback}
  </Link>
)

export const ProxyHeadersTtlLinks = ({
  conjunction = 'and',
  ttlLabel = 'TTL'
}) => (
  <>
    <DocLink href='/docs/api/parameters/proxy' fallback='proxy' />
    {', '}
    <DocLink href='/docs/api/parameters/headers' fallback='headers' />
    {` ${conjunction} `}
    <DocLink href='/docs/api/parameters/ttl' fallback='TTL'>
      {ttlLabel}
    </DocLink>
  </>
)
