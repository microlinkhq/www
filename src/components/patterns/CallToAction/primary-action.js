import React from 'react'
import { Button } from 'components/elements/Button/Button'
import { DashboardLink, SignupLink } from 'components/patterns/SignupLink'
import { PLAYGROUND_PATH } from 'helpers/dashboard-account'
import { theme } from 'theme'
import { ACTION_LABEL } from './free-key'

const BUTTON_MIN_WIDTH = ['100%', '320px', '320px', '320px']

const actionCss = theme({
  mt: [4, 4, 5, 5],
  minWidth: BUTTON_MIN_WIDTH,
  px: [3, 3, 5, 5],
  py: 3,
  fontSize: [1, 1, 2, 2],
  borderRadius: 3,
  boxShadow: 2,
  whiteSpace: 'normal'
})

export const PLAYGROUND_LABEL = 'Open the playground'

const signedOutCaption = outcome =>
  `Sign up, add the key to your requests, and start ${outcome}.`

const signedInCaption = outcome =>
  `Your API key is ready. Open the playground, run your first request, and start ${outcome}.`

export const captionFor = ({ caption, outcome, signedIn }) =>
  caption || (signedIn ? signedInCaption(outcome) : signedOutCaption(outcome))

export const PrimaryAction = ({ action, cta, signedIn }) => {
  if (action) {
    return (
      <Button forwardedAs='a' href={action.href} css={actionCss}>
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
        css={actionCss}
      >
        {PLAYGROUND_LABEL}
      </DashboardLink>
    )
  }

  return (
    <SignupLink component={Button} forwardedAs='a' cta={cta} css={actionCss}>
      {ACTION_LABEL}
    </SignupLink>
  )
}
