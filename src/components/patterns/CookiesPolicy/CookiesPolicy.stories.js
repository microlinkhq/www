import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import CookiesPolicy from './CookiesPolicy'

const code = `
import { CookiesPolicy } from 'components/patterns'

export default () => (
  <CookiesPolicy />
)
`

storiesOf('Patterns', module).add('CookiesPolicy', () => (
  <Story name='CookiesPolicy' code={code}>
    <CookiesPolicy />
  </Story>
))
