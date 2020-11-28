import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Toggle from './Toggle'

const code = `
import { Toggle } from 'components/elements'

export default () => (
  <Toggle
    children={['SDK', 'MQL', 'API']}>
    defaultValue={'MQL'}
  </Toggle>
)
`

const children = ['SDK', 'MQL', 'API']

storiesOf('Elements', module).add('Toggle', () => (
  <Story name='Toggle' code={code}>
    <Toggle defaultValue='MQL'>{children}</Toggle>
  </Story>
))
