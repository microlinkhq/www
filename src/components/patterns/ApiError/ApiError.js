import React from 'react'
import { Link } from 'components/elements/Link'
import { getErrorMeta } from 'helpers/api-error'

const PricingLink = ({ children, ...props }) => (
  <Link href='/#pricing' css={{ textDecoration: 'underline' }} {...props}>
    {children}
  </Link>
)

const FRAGMENTS = {
  ERATE: LinkComponent => (
    <>
      You&#8217;ve reached your daily request limit. Wait for the quota to reset
      or <LinkComponent>upgrade your plan</LinkComponent> for higher limits.
    </>
  ),
  ETIMEOUT: LinkComponent => (
    <>
      The page took too long to respond. Try again, and if the issue persists{' '}
      <LinkComponent>upgrade</LinkComponent> for extended timeouts.
    </>
  ),
  EFATAL: () =>
    'We couldn\u2019t process this URL. Make sure it points to a valid, publicly accessible page with HTML content. If the issue persists, try a different URL.',
  EPROXYNEEDED: LinkComponent => (
    <>
      This website uses anti-bot protection that blocks automated requests.{' '}
      <LinkComponent>Pro plans</LinkComponent> include built-in proxy rotation
      to bypass most protections.
    </>
  ),
  EMPTY_MARKDOWN: LinkComponent => (
    <>
      The page may not exist, return empty content, or be behind anti-bot /
      anti-scraping protection. <LinkComponent>Pro plans</LinkComponent> can
      bypass most protections.
    </>
  )
}

export const ApiErrorTitle = ({ code }) => {
  const { title } = getErrorMeta(code)
  return <>{title}</>
}

export const ApiErrorBody = ({ code, fallback, linkProps }) => {
  const fragment = FRAGMENTS[code]
  if (!fragment) return <>{fallback || 'Something went wrong.'}</>

  const LinkComponent = linkProps
    ? props => <PricingLink {...linkProps} {...props} />
    : PricingLink

  return <>{fragment(LinkComponent)}</>
}
