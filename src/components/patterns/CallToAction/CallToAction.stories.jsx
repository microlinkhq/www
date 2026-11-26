import React from 'react'
import { Story } from 'story'
import { theme } from 'theme'
import { CallToAction } from '.'

const SIGNED_OUT_MARKER = '0'

const setSessionMarker = value => {
  document.cookie = `__client_uat=${value}; path=/`
}

const signedOut = async () => setSessionMarker(SIGNED_OUT_MARKER)

const signedIn = async () =>
  setSessionMarker(String(Math.floor(Date.now() / 1000)))

const code = `
import { CallToAction } from 'components/patterns/CallToAction'

export default () => (
  <CallToAction
    outcome='capturing screenshots'
    cta='screenshot:footer-cta'
  />
)
`

const Section = ({ name }) => (
  <Story name={name} code={code} css={theme({ width: '100%' })}>
    <CallToAction outcome='capturing screenshots' cta='screenshot:footer-cta' />
  </Story>
)

export default {
  title: 'Patterns/CallToAction',
  parameters: { layout: 'fullscreen' }
}

export const SignedOut = {
  loaders: [signedOut],
  render: () => <Section name='CallToAction (signed out)' />
}

export const SignedIn = {
  loaders: [signedIn],
  render: () => <Section name='CallToAction (signed in)' />
}
