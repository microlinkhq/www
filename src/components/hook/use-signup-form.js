import { useCallback } from 'react'
import { useLocation } from '@gatsbyjs/reach-router'

import { trackSignupClick, useSignupHref } from 'components/patterns/SignupLink'
import { withEmailHandoff } from 'helpers/dashboard-url'

export const useSignupForm = ({ cta } = {}) => {
  const { pathname } = useLocation()
  const href = useSignupHref({ cta })

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      const email = new FormData(event.currentTarget).get('email')
      trackSignupClick({ cta, pathname })
      window.location.assign(withEmailHandoff(href, String(email || '')))
    },
    [cta, href, pathname]
  )

  return { href, onSubmit }
}
