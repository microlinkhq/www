import React from 'react'
import { Button } from 'components/elements/Button/Button'
import { DashboardLink, SignupLink } from 'components/patterns/SignupLink'
import { PLAYGROUND_PATH } from 'helpers/dashboard-account'
import { ACTION_LABEL } from './free-key'

export const PLAYGROUND_LABEL = 'Open the playground'

const signedOutCaption = outcome =>
  `Sign up, add the key to your requests, and start ${outcome}.`

const signedInCaption = outcome =>
  `Your API key is ready. Open the playground, run your first request, and start ${outcome}.`

export const captionFor = ({ caption, outcome, signedIn }) =>
  caption || (signedIn ? signedInCaption(outcome) : signedOutCaption(outcome))

export const PrimaryAction = ({ action, cta, signedIn, css }) => {
  if (action) {
    return (
      <Button forwardedAs='a' href={action.href} css={css}>
        {action.label}
      </Button>
    )
  }

  if (signedIn) {
    return (
      <DashboardLink
        component={Button}
        forwardedAs='a'
        dashboardPath={PLAYGROUND_PATH}
        cta={cta}
        css={css}
      >
        {PLAYGROUND_LABEL}
      </DashboardLink>
    )
  }

  return (
    <SignupLink component={Button} forwardedAs='a' cta={cta} css={css}>
      {ACTION_LABEL}
    </SignupLink>
  )
}
