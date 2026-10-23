import React from 'react'
import { Link } from 'components/elements/Link'
import { getErrorMeta } from 'helpers/api-error'

const PricingLink = ({ children, ...props }) => (
  <Link href='/pricing' {...props}>
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
      Microlink detected anti-bot protection on this URL.
      <br />
      Bypassing this restriction requires Microlink's{' '}
      <LinkComponent>PRO plan</LinkComponent>.
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

const TOOL_FRAGMENTS = {
  ERATE: () =>
    'You\u2019ve used all 25 free requests for today. The limit resets tomorrow.',
  ETIMEOUT: () => 'The page took too long to respond. Try again in a moment.',
  EFATAL: FRAGMENTS.EFATAL,
  EPROXYNEEDED: () =>
    'This site blocks automated access, so the free tool can\u2019t reach it.',
  EMPTY_MARKDOWN: () =>
    'The page may not exist, return empty content, or block automated access.'
}

export const ApiErrorTitle = ({ code }) => {
  const { title } = getErrorMeta(code)
  return <>{title}</>
}

export const ApiErrorBody = ({ code, fallback, variant }) => {
  const fragment = (variant === 'tool' ? TOOL_FRAGMENTS : FRAGMENTS)[code]
  if (!fragment) return <>{fallback || 'Something went wrong.'}</>

  return <>{fragment(PricingLink)}</>
}
