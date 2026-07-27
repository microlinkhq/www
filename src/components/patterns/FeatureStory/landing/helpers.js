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

const ProxyDocLink = props => (
  <Link href='/docs/api/parameters/proxy' {...props}>
    {props.children || 'proxy'}
  </Link>
)

const HeadersDocLink = props => (
  <Link href='/docs/api/parameters/headers' {...props}>
    {props.children || 'headers'}
  </Link>
)

const TtlDocLink = props => (
  <Link href='/docs/api/parameters/ttl' {...props}>
    {props.children || 'TTL'}
  </Link>
)

export const ProxyHeadersTtlLinks = ({
  conjunction = 'and',
  ttlLabel = 'TTL'
}) => (
  <>
    <ProxyDocLink />
    {', '}
    <HeadersDocLink />
    {` ${conjunction} `}
    <TtlDocLink>{ttlLabel}</TtlDocLink>
  </>
)
