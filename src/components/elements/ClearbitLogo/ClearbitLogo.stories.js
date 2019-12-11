import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import ClearbitLogo from './ClearbitLogo'

const code = `
import { ClearbitLogo } from 'components/elements'

export default () => (
  <ClearbitLogo height='80px' width='80px' companyName='microlink.io' />
)
`

storiesOf('Elements', module).add('ClearbitLogo', () => (
  <Story name='ClearbitLogo' code={code}>
    <ClearbitLogo height='80px' width='80px' companyName='microlink.io' />
  </Story>
))
