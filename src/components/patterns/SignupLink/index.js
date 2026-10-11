import React, { useEffect, useState } from 'react'
import { useLocation } from '@gatsbyjs/reach-router'

import { Link } from 'components/elements/Link'
import ArrowLink from 'components/patterns/ArrowLink'
import { getAttribution } from 'helpers/attribution'
import { SIGNUP_PATH, dashboardUrl, eventLocation } from 'helpers/dashboard-url'
import { trackEvent } from 'helpers/gtag'

export const useDashboardHref = ({
  dashboardPath = SIGNUP_PATH,
  cta,
  product,
  redirect
} = {}) => {
  const { pathname } = useLocation()
  const [href, setHref] = useState(() =>
    dashboardUrl(dashboardPath, { cta, product, redirect, pathname })
  )

  useEffect(() => {
    setHref(
      dashboardUrl(dashboardPath, {
        cta,
        product,
        redirect,
        pathname,
        attribution: getAttribution(),
        search: window.location.search
      })
    )
  }, [dashboardPath, cta, product, redirect, pathname])

  return href
}

export const useSignupHref = options =>
  useDashboardHref({ ...options, dashboardPath: SIGNUP_PATH })

export const trackSignupClick = ({ cta, pathname }) =>
  trackEvent('signup_click', {
    location: eventLocation(pathname),
    cta,
    transport_type: 'beacon'
  })

export const SignupLink = ({
  cta,
  product,
  redirect,
  onClick,
  component: Component = ArrowLink,
  children,
  ...props
}) => {
  const { pathname } = useLocation()
  const href = useSignupHref({ cta, product, redirect })

  const handleClick = event => {
    trackSignupClick({ cta, pathname })
    if (onClick) onClick(event)
  }

  return (
    <Component href={href} onClick={handleClick} {...props}>
      {children}
    </Component>
  )
}

export const DashboardLink = ({
  cta,
  product,
  component: Component = Link,
  children,
  ...props
}) => {
  const href = useDashboardHref({ dashboardPath: '/', cta, product })

  return (
    <Component href={href} {...props}>
      {children}
    </Component>
  )
}

export default SignupLink
