import React from 'react'
import { useLocation } from '@gatsbyjs/reach-router'

import { Button } from 'components/elements/Button/Button'
import { SignupLink } from 'components/patterns/SignupLink'
import { eventLocation } from 'helpers/dashboard-url'
import { trackEvent } from 'helpers/gtag'

export const BUY_REDIRECT = '/plans/create'

export const buyCta = pathname => `${eventLocation(pathname)}:buy`

const Checkout = ({ cta, onClick, children, ...props }) => {
  const { pathname } = useLocation()
  const resolvedCta = cta ?? buyCta(pathname)

  const handleClick = event => {
    trackEvent('buy', {
      location: eventLocation(pathname),
      cta: resolvedCta,
      transport_type: 'beacon'
    })
    if (onClick) onClick(event)
  }

  return (
    <SignupLink
      component={Button}
      as='a'
      cta={resolvedCta}
      redirect={BUY_REDIRECT}
      onClick={handleClick}
      data-event-location='Checkout'
      data-event-name='Buy'
      {...props}
    >
      {children ?? 'Buy'}
    </SignupLink>
  )
}

export default Checkout
